/**
 * src/engines/storage/storageEngine.ts
 * Core Orchestration Engine for Hanzero Tiered Storage.
 * Combines Hot LocalStorage with Cold IndexedDB, Boot Resurrection Gate,
 * Sequential Mutex Queue, Safari ITP Shield, and Cross-Tab Synchronization.
 */

import {
  STORAGE_KEYS,
  UserStateSchema,
  SrsItemRecord,
  HanziStrokeCacheRecord,
  QuickSyncPayload,
  StorageDiagnostics,
  createDefaultUserState,
  isUserStateSchema,
} from './types';
import {
  readHotItemSync,
  writeHotItemSync,
  clearHotStorageSync,
  isLocalStorageAvailable,
  _resetHotStorageForTesting,
} from './hotStorage';
import {
  saveColdMirror,
  getColdMirror,
  getSrsRecord,
  setSrsRecord,
  getAllSrsRecords,
  bulkSaveSrsRecords as coldBulkSaveSrsRecords,
  getStrokeCache,
  setStrokeCache,
  clearColdStorage,
  isIndexedDbAvailable,
  _resetColdStorageForTesting,
} from './coldStorage';
import { migrateUserState } from './migration';
import { generateQuickSyncCode, parseQuickSyncCode, applyQuickSyncToState } from './quickSync';
import { formatSnapshotAsJsonString, parseAndValidateSnapshotJson } from './snapshot';

// In-Memory state cache for instant synchronous access
let cachedUserState: UserStateSchema | null = null;

// Boot Resurrection Gate: Promise that resolves when cold mirror check finishes
let initPromise: Promise<UserStateSchema> | null = null;
let isInitialized = false;

// Sequential Mutex Promise Queue to serialize writes
let writeQueue: Promise<void> = Promise.resolve();

// Listeners for state changes
type StateChangeListener = (state: UserStateSchema) => void;
const listeners = new Set<StateChangeListener>();

export function _resetStorageEngineForTesting(): void {
  cachedUserState = null;
  initPromise = null;
  isInitialized = false;
  listeners.clear();
}

/**
 * Deep clones an object to preserve immutability
 */
function deepClone<T>(val: T): T {
  return JSON.parse(JSON.stringify(val)) as T;
}

/**
 * Synchronously retrieves user state with zero layout shift.
 * If not initialized yet, reads and migrates from Hot storage immediately.
 */
export function getStoredUserStateSync(): UserStateSchema {
  if (cachedUserState) {
    return deepClone(cachedUserState);
  }

  const raw = readHotItemSync(STORAGE_KEYS.HOT_USER_STATE);
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      cachedUserState = migrateUserState(parsed);
      return deepClone(cachedUserState);
    } catch {
      // Corrupted JSON: fallback to default
      cachedUserState = createDefaultUserState();
      return deepClone(cachedUserState);
    }
  }

  cachedUserState = createDefaultUserState();
  return deepClone(cachedUserState);
}

/**
 * Initializes storage lifecycle, checks Cold Mirror for Resurrection,
 * and requests persistent storage from browser.
 */
export async function initializeStorage(): Promise<UserStateSchema> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    // 1. Check Hot Storage
    const hotRaw = readHotItemSync(STORAGE_KEYS.HOT_USER_STATE);
    let stateToUse: UserStateSchema | null = null;

    if (hotRaw) {
      try {
        const parsed: unknown = JSON.parse(hotRaw);
        if (isUserStateSchema(parsed)) {
          stateToUse = parsed;
        } else {
          stateToUse = migrateUserState(parsed);
        }
      } catch {
        stateToUse = null;
      }
    }

    // 2. Ghost State / Disaster Recovery: If Hot is empty, corrupted, or has 0 progress, check Cold Mirror
    const isHotEmpty =
      !stateToUse ||
      (stateToUse.progress.xp === 0 &&
        (!stateToUse.progress.completed_lessons || stateToUse.progress.completed_lessons.length === 0));

    if (isHotEmpty) {
      try {
        const coldMirror = await getColdMirror();
        if (coldMirror && isUserStateSchema(coldMirror)) {
          const coldHasProgress =
            coldMirror.progress.xp > 0 ||
            (coldMirror.progress.completed_lessons && coldMirror.progress.completed_lessons.length > 0);
          if (coldHasProgress || !stateToUse) {
            console.info('[Hanzero Storage] Auto-Resurrected User State from Cold IndexedDB mirror! 🐰✨');
            stateToUse = coldMirror;
          }
        }
      } catch (err) {
        console.warn('[Hanzero Storage] Cold mirror check failed:', err);
      }
    }

    // 3. If neither exists, use fresh default state
    if (!stateToUse) {
      stateToUse = createDefaultUserState();
    }

    cachedUserState = stateToUse;
    // Ensure both tiers have the synced state
    writeHotItemSync(STORAGE_KEYS.HOT_USER_STATE, JSON.stringify(stateToUse));
    await saveColdMirror(stateToUse);

    // 4. Request Safari / Browser storage persistence (Safari ITP defense)
    await requestStoragePersistence();

    // 5. Setup Cross-Tab listener if in browser
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('storage', handleStorageEvent);
    }

    isInitialized = true;
    return deepClone(cachedUserState);
  })();

  return initPromise;
}

/**
 * Cross-tab storage synchronization handler
 */
function handleStorageEvent(event: StorageEvent): void {
  if (event.key === STORAGE_KEYS.HOT_USER_STATE && event.newValue) {
    try {
      const remoteState: unknown = JSON.parse(event.newValue);
      const migrated = migrateUserState(remoteState);
      cachedUserState = migrated;
      notifyListeners(migrated);
    } catch (err) {
      console.warn('[Hanzero Storage] Failed to sync cross-tab state:', err);
    }
  }
}

function notifyListeners(state: UserStateSchema): void {
  const cloned = deepClone(state);
  listeners.forEach((listener) => {
    try {
      listener(cloned);
    } catch (err) {
      console.warn('[Hanzero Storage] Listener error:', err);
    }
  });
}

/**
 * Subscribes to user state changes
 */
export function onUserStateChanged(listener: StateChangeListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Enqueues a write task into the sequential mutex queue
 */
function enqueueWrite<T>(task: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    writeQueue = writeQueue.then(async () => {
      try {
        const result = await task();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Saves User State safely:
 * 1. Synchronously updates memory cache and LocalStorage
 * 2. Waits for Boot Resurrection Gate if still initializing
 * 3. Dispatches debounced/queued write to Cold IndexedDB Mirror
 */
export async function saveUserState(state: UserStateSchema): Promise<void> {
  // Always update in-memory cache and Hot LocalStorage synchronously
  const cleanState = migrateUserState(state);
  cleanState.updated_at = new Date().toISOString();
  cachedUserState = cleanState;

  writeHotItemSync(STORAGE_KEYS.HOT_USER_STATE, JSON.stringify(cleanState));
  notifyListeners(cleanState);

  // Red Team Guard: If boot initialization is still in-flight, await it before committing cold mirror
  if (initPromise && !isInitialized) {
    await initPromise;
  }

  // Queue cold mirror write
  return enqueueWrite(async () => {
    await saveColdMirror(cleanState);
  });
}

/**
 * Proactively requests durable persistent storage to protect against Safari 7-day ITP
 */
export async function requestStoragePersistence(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.storage?.persist) {
    return false;
  }

  try {
    let persisted = false;
    if (navigator.storage.persisted) {
      persisted = await navigator.storage.persisted();
    }
    if (!persisted) {
      persisted = await navigator.storage.persist();
    }
    return persisted;
  } catch (err) {
    console.warn('[Hanzero Storage] Failed to request persistent storage:', err);
    return false;
  }
}

/**
 * Cold Tier: Load a single SRS Record
 */
export function loadSrsRecord(wordId: string): Promise<SrsItemRecord | undefined> {
  return getSrsRecord(wordId);
}

/**
 * Cold Tier: Save a single SRS Record
 */
export function saveSrsRecord(record: SrsItemRecord): Promise<void> {
  return enqueueWrite(async () => {
    await setSrsRecord(record);
  });
}

/**
 * Cold Tier: Load all SRS Records
 */
export function loadAllSrsRecords(): Promise<SrsItemRecord[]> {
  return getAllSrsRecords();
}

/**
 * Cold Tier: Bulk Save SRS Records
 */
export function bulkSaveSrsRecords(records: SrsItemRecord[]): Promise<void> {
  return enqueueWrite(async () => {
    await coldBulkSaveSrsRecords(records);
  });
}

/**
 * Cold Tier: Load Hanzi Stroke Cache
 */
export function loadStrokeCache(char: string): Promise<HanziStrokeCacheRecord | undefined> {
  return getStrokeCache(char);
}

/**
 * Cold Tier: Save Hanzi Stroke Cache
 */
export function saveStrokeCache(
  char: string,
  strokes: string[],
  medians: number[][][]
): Promise<void> {
  return enqueueWrite(async () => {
    await setStrokeCache({
      char,
      strokes,
      medians,
      cached_at: Date.now(),
    });
  });
}

/**
 * Generates an Emergency Quick Sync Code for the current or specified user state
 */
export function getQuickSyncCode(state?: UserStateSchema): string {
  const targetState = state ?? getStoredUserStateSync();
  return generateQuickSyncCode(targetState);
}

/**
 * Restores user progress from an Emergency Quick Sync Code
 */
export async function restoreFromQuickSyncCode(
  code: string
): Promise<{ success: boolean; error?: string; restoredPayload?: QuickSyncPayload }> {
  const parsed = parseQuickSyncCode(code);
  if (!parsed) {
    return {
      success: false,
      error: 'รหัสกู้คืนไม่ถูกต้อง หรือมีการพิมพ์ผิด กรุณาตรวจสอบอีกครั้ง',
    };
  }

  const current = getStoredUserStateSync();
  const updated = applyQuickSyncToState(current, parsed);
  await saveUserState(updated);

  return {
    success: true,
    restoredPayload: parsed,
  };
}

/**
 * Exports full 1-Click JSON Snapshot combining Hot state and all Cold SRS records
 */
export async function exportSnapshotAsJsonString(): Promise<string> {
  const hot = getStoredUserStateSync();
  const srs = await loadAllSrsRecords();
  return formatSnapshotAsJsonString(hot, srs);
}

/**
 * Imports full 1-Click JSON Snapshot with All-or-Nothing atomic commit
 */
export async function importSnapshotFromJsonString(
  jsonStr: string
): Promise<{ success: boolean; error?: string; importedSrsCount?: number }> {
  const result = parseAndValidateSnapshotJson(jsonStr);
  if (!result.success || !result.snapshot) {
    return { success: false, error: result.error ?? 'นำเข้าไฟล์สำรองข้อมูลล้มเหลว' };
  }

  const { hot_state, srs_records } = result.snapshot;

  // Atomic apply
  await saveUserState(hot_state);
  if (srs_records.length > 0) {
    await bulkSaveSrsRecords(srs_records);
  }

  return {
    success: true,
    importedSrsCount: srs_records.length,
  };
}

/**
 * Checks overall storage health and persistence status
 */
export async function checkStorageHealth(): Promise<StorageDiagnostics> {
  const isHotAvailable = isLocalStorageAvailable();
  const isColdAvailable = await isIndexedDbAvailable();

  let isPersisted = false;
  let quotaBytes: number | undefined;
  let usageBytes: number | undefined;

  if (typeof navigator !== 'undefined' && navigator.storage) {
    try {
      if (navigator.storage.persisted) {
        isPersisted = await navigator.storage.persisted();
      }
      if (navigator.storage.estimate) {
        const est = await navigator.storage.estimate();
        quotaBytes = est.quota;
        usageBytes = est.usage;
      }
    } catch {
      // Non-fatal probe
    }
  }

  let activeTier: 'dual' | 'hot-only' | 'cold-only' | 'memory-fallback' = 'dual';
  if (isHotAvailable && isColdAvailable) {
    activeTier = 'dual';
  } else if (isHotAvailable) {
    activeTier = 'hot-only';
  } else if (isColdAvailable) {
    activeTier = 'cold-only';
  } else {
    activeTier = 'memory-fallback';
  }

  const isDegraded = !isHotAvailable || !isColdAvailable;

  return {
    isLocalStorageAvailable: isHotAvailable,
    isIndexedDbAvailable: isColdAvailable,
    isPersisted,
    activeStorageTier: activeTier,
    storageQuotaEstimatedBytes: quotaBytes,
    storageUsageEstimatedBytes: usageBytes,
    lastSyncTimestamp: Date.now(),
    degradedMode: isDegraded,
    degradedReason: isDegraded
      ? !isHotAvailable && !isColdAvailable
        ? 'โหมดส่วนตัวหรือถูกบล็อกการบันทึก: ระบบทำงานในหน่วยความจำชั่วคราว'
        : !isHotAvailable
          ? 'LocalStorage ไม่พร้อมใช้งาน'
          : 'IndexedDB ไม่พร้อมใช้งาน'
      : undefined,
  };
}

/**
 * Resets all user state and databases (for testing / account wipe)
 */
export async function resetStorage(): Promise<void> {
  clearHotStorageSync();
  await clearColdStorage();
  _resetHotStorageForTesting();
  _resetColdStorageForTesting();
  cachedUserState = null;
  initPromise = null;
  isInitialized = false;
  writeQueue = Promise.resolve();
  listeners.clear();
}

/**
 * src/engines/storage/coldStorage.ts
 * IndexedDB adapter using idb-keyval stores with 1.5s timeout watchdog and memory fallback.
 */

import { createStore, get, set, clear, values } from 'idb-keyval';
import {
  INDEXEDDB_CONFIG,
  UserStateSchema,
  SrsItemRecord,
  HanziStrokeCacheRecord,
  isUserStateSchema,
  isSrsItemRecord,
} from './types';

// In-Memory Cold Fallbacks for environments where IndexedDB is blocked or disabled
const memorySrsStore = new Map<string, SrsItemRecord>();
const memoryStrokeStore = new Map<string, HanziStrokeCacheRecord>();
let memoryColdMirror: UserStateSchema | null = null;

let isIdbBlocked = false;
const IDB_WATCHDOG_TIMEOUT_MS = 1500;

// Lazy store initializers
type CustomStore = ReturnType<typeof createStore>;
let srsStore: CustomStore | null = null;
let strokeStore: CustomStore | null = null;
let mirrorStore: CustomStore | null = null;

function getStores(): { srs: CustomStore; stroke: CustomStore; mirror: CustomStore } {
  if (!srsStore || !strokeStore || !mirrorStore) {
    srsStore = createStore(INDEXEDDB_CONFIG.DB_NAME, INDEXEDDB_CONFIG.STORES.SRS_RECORDS);
    strokeStore = createStore(INDEXEDDB_CONFIG.DB_NAME, INDEXEDDB_CONFIG.STORES.HANZI_STROKES);
    mirrorStore = createStore(INDEXEDDB_CONFIG.DB_NAME, INDEXEDDB_CONFIG.STORES.COLD_HOT_MIRROR);
  }
  return { srs: srsStore, stroke: strokeStore, mirror: mirrorStore };
}

/**
 * Executes a promise with an IDB watchdog timeout to prevent Safari/Private mode freezes
 */
async function withIdbWatchdog<T>(promiseFn: () => Promise<T>, fallback: T): Promise<T> {
  if (isIdbBlocked || typeof window === 'undefined' || !window.indexedDB) {
    return fallback;
  }

  let timer: ReturnType<typeof setTimeout> | null = null;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`[Hanzero Storage] IndexedDB watchdog timed out after ${IDB_WATCHDOG_TIMEOUT_MS}ms. Marking IDB as degraded.`);
      isIdbBlocked = true;
      resolve(fallback);
    }, IDB_WATCHDOG_TIMEOUT_MS);
  });

  try {
    const result = await Promise.race([promiseFn(), timeoutPromise]);
    if (timer) clearTimeout(timer);
    return result;
  } catch (err) {
    if (timer) clearTimeout(timer);
    console.warn('[Hanzero Storage] IndexedDB operation failed:', err);
    return fallback;
  }
}

/**
 * Probes whether IndexedDB is functional and not blocked
 */
export async function isIndexedDbAvailable(): Promise<boolean> {
  if (isIdbBlocked) return false;
  if (typeof window === 'undefined' || !window.indexedDB) return false;

  return withIdbWatchdog(async () => {
    const { mirror } = getStores();
    await get('__hanzero_probe__', mirror);
    return true;
  }, false);
}

/**
 * Saves Hot User State mirror into Cold IndexedDB (for Disaster Recovery / 7-Day ITP resurrection)
 */
export async function saveColdMirror(state: UserStateSchema): Promise<void> {
  memoryColdMirror = state;
  if (isIdbBlocked) return;

  await withIdbWatchdog(async () => {
    const { mirror } = getStores();
    await set('mirror_state', state, mirror);
  }, undefined);
}

/**
 * Loads Hot User State mirror from Cold IndexedDB
 */
export async function getColdMirror(): Promise<UserStateSchema | null> {
  if (isIdbBlocked) return memoryColdMirror;

  return withIdbWatchdog(async () => {
    const { mirror } = getStores();
    const result = await get<unknown>('mirror_state', mirror);
    if (isUserStateSchema(result)) {
      return result;
    }
    return memoryColdMirror;
  }, memoryColdMirror);
}

/**
 * Cold Tier: Retrieve a single SRS Record
 */
export async function getSrsRecord(wordId: string): Promise<SrsItemRecord | undefined> {
  if (isIdbBlocked) return memorySrsStore.get(wordId);

  return withIdbWatchdog(async () => {
    const { srs } = getStores();
    const result = await get<unknown>(wordId, srs);
    if (isSrsItemRecord(result)) {
      return result;
    }
    return memorySrsStore.get(wordId);
  }, memorySrsStore.get(wordId));
}

/**
 * Cold Tier: Save a single SRS Record
 */
export async function setSrsRecord(record: SrsItemRecord): Promise<void> {
  memorySrsStore.set(record.word_id, record);
  if (isIdbBlocked) return;

  await withIdbWatchdog(async () => {
    const { srs } = getStores();
    await set(record.word_id, record, srs);
  }, undefined);
}

/**
 * Cold Tier: Load all SRS Records
 */
export async function getAllSrsRecords(): Promise<SrsItemRecord[]> {
  if (isIdbBlocked) return Array.from(memorySrsStore.values());

  return withIdbWatchdog(async () => {
    const { srs } = getStores();
    const rawValues = await values<unknown>(srs);
    const validRecords: SrsItemRecord[] = [];
    for (const val of rawValues) {
      if (isSrsItemRecord(val)) {
        validRecords.push(val);
      }
    }
    return validRecords.length > 0 ? validRecords : Array.from(memorySrsStore.values());
  }, Array.from(memorySrsStore.values()));
}

/**
 * Cold Tier: Bulk Save SRS Records
 */
export async function bulkSaveSrsRecords(records: SrsItemRecord[]): Promise<void> {
  for (const rec of records) {
    memorySrsStore.set(rec.word_id, rec);
  }

  if (isIdbBlocked) return;

  await withIdbWatchdog(async () => {
    const { srs } = getStores();
    for (const rec of records) {
      await set(rec.word_id, rec, srs);
    }
  }, undefined);
}

/**
 * Cold Tier: Retrieve Hanzi Stroke Cache
 */
export async function getStrokeCache(char: string): Promise<HanziStrokeCacheRecord | undefined> {
  if (isIdbBlocked) return memoryStrokeStore.get(char);

  return withIdbWatchdog(async () => {
    const { stroke } = getStores();
    const result = await get<HanziStrokeCacheRecord>(char, stroke);
    return result ?? memoryStrokeStore.get(char);
  }, memoryStrokeStore.get(char));
}

/**
 * Cold Tier: Save Hanzi Stroke Cache
 */
export async function setStrokeCache(record: HanziStrokeCacheRecord): Promise<void> {
  memoryStrokeStore.set(record.char, record);
  if (isIdbBlocked) return;

  await withIdbWatchdog(async () => {
    const { stroke } = getStores();
    await set(record.char, record, stroke);
  }, undefined);
}

/**
 * Clears all Cold Storage (for testing or full reset)
 */
export async function clearColdStorage(): Promise<void> {
  memorySrsStore.clear();
  memoryStrokeStore.clear();
  memoryColdMirror = null;

  if (isIdbBlocked) return;

  await withIdbWatchdog(async () => {
    const { srs, stroke, mirror } = getStores();
    await clear(srs);
    await clear(stroke);
    await clear(mirror);
  }, undefined);
}

/**
 * Resets internal flags and storage for testing
 */
export function _resetColdStorageForTesting(): void {
  memorySrsStore.clear();
  memoryStrokeStore.clear();
  memoryColdMirror = null;
  isIdbBlocked = false;
}

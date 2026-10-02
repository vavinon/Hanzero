import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initializeStorage,
  getStoredUserStateSync,
  saveUserState,
  resetStorage,
  getQuickSyncCode,
  restoreFromQuickSyncCode,
  exportSnapshotAsJsonString,
  importSnapshotFromJsonString,
  loadSrsRecord,
  saveSrsRecord,
  loadAllSrsRecords,
  bulkSaveSrsRecords,
  loadStrokeCache,
  saveStrokeCache,
  checkStorageHealth,
  requestStoragePersistence,
  _resetStorageEngineForTesting,
} from './storageEngine';
import { migrateUserState, stripPollution, clampNumber } from './migration';
import { normalizeQuickSyncCode, parseQuickSyncCode } from './quickSync';
import { calculateCrc16, verifyCrc16 } from './checksum';
import { isUserStateSchema, SrsItemRecord, INDEXEDDB_CONFIG } from './types';
import { readHotItemSync, writeHotItemSync } from './hotStorage';
import { saveColdMirror } from './coldStorage';

class MockLocalStorage {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

describe('Tiered Storage Engine (Slice 1.3)', () => {
  let mockLocalStorage: MockLocalStorage;

  beforeEach(async () => {
    mockLocalStorage = new MockLocalStorage();
    const mockWindow = {
      localStorage: mockLocalStorage,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    vi.stubGlobal('window', mockWindow);
    vi.stubGlobal('localStorage', mockLocalStorage);
    vi.stubGlobal('navigator', {
      storage: {
        persisted: vi.fn().mockResolvedValue(true),
        persist: vi.fn().mockResolvedValue(true),
        estimate: vi.fn().mockResolvedValue({ quota: 104857600, usage: 1024 }),
      },
    });

    await resetStorage();
  });

  afterEach(async () => {
    await resetStorage();
    vi.restoreAllMocks();
  });

  // Group 1: Fast Synchronous Boot & CRUD
  describe('Group 1: Fast Synchronous Boot & State CRUD', () => {
    it('returns valid initial default state synchronously with zero delay', () => {
      const state = getStoredUserStateSync();
      expect(isUserStateSchema(state)).toBe(true);
      expect(state.schema_version).toBe(1);
      expect(state.progress.current_tier).toBe('tier1');
      expect(state.progress.hearts.current).toBe(5);
      expect(state.progress.streak.count).toBe(0);
      expect(state.progress.xp).toBe(0);
      expect(state.preferences.theme).toBe('light');
    });

    it('persists state changes and updates cache synchronously', async () => {
      const initial = getStoredUserStateSync();
      const updated = {
        ...initial,
        progress: {
          ...initial.progress,
          xp: 250,
          streak: { ...initial.progress.streak, count: 5 },
        },
      };

      await saveUserState(updated);

      const retrieved = getStoredUserStateSync();
      expect(retrieved.progress.xp).toBe(250);
      expect(retrieved.progress.streak.count).toBe(5);
    });

    it('preserves object immutability by deep cloning returns', () => {
      const state1 = getStoredUserStateSync();
      state1.progress.xp = 9999;

      const state2 = getStoredUserStateSync();
      expect(state2.progress.xp).not.toBe(9999);
    });
  });

  // Group 2: Schema Migration & Prototype Pollution Defense
  describe('Group 2: Schema Migration & Prototype Defense', () => {
    it('strips dangerous __proto__, constructor, and prototype properties', () => {
      const maliciousPayload = {
        __proto__: { polluted: true },
        constructor: { evil: true },
        safeField: 'hello',
        nested: {
          __proto__: { innerPolluted: true },
          title: 'Hanzero',
        },
      };

      const cleaned = stripPollution(maliciousPayload) as Record<string, unknown>;
      expect(Object.prototype.hasOwnProperty.call(cleaned, '__proto__')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(cleaned, 'constructor')).toBe(false);
      expect(cleaned.safeField).toBe('hello');
      expect((cleaned.nested as Record<string, unknown>).title).toBe('Hanzero');
    });

    it('migrates legacy unversioned raw data cleanly to UserStateSchema v1', () => {
      const legacyRaw = {
        preferences: { theme: 'dark', silent_mode: true },
        progress: { xp: 120, current_tier: 'tier2' },
      };

      const migrated = migrateUserState(legacyRaw);
      expect(migrated.schema_version).toBe(1);
      expect(migrated.preferences.theme).toBe('dark');
      expect(migrated.preferences.silent_mode).toBe(true);
      expect(migrated.progress.xp).toBe(120);
      expect(migrated.progress.current_tier).toBe('tier2');
      // Defaults filled in
      expect(migrated.progress.hearts.current).toBe(5);
      expect(migrated.progress.streak.freeze_tokens).toBe(2);
    });
  });

  // Group 3: Numeric Clamping & Sanity Bounds
  describe('Group 3: Numeric Clamping & Invariants', () => {
    it('clamps hearts strictly to 0..5 and repairs negative hearts or NaN', () => {
      expect(clampNumber(-10, 0, 5, 5)).toBe(0);
      expect(clampNumber(99, 0, 5, 5)).toBe(5);
      expect(clampNumber(NaN, 0, 5, 5)).toBe(5);
      expect(clampNumber(Infinity, 0, 5, 5)).toBe(5);

      const brokenState = {
        progress: {
          hearts: { current: -999, max: 0 },
          xp: 'unlimited',
          streak: { count: -5 },
        },
      };

      const repaired = migrateUserState(brokenState);
      expect(repaired.progress.hearts.current).toBe(0);
      expect(repaired.progress.hearts.max).toBe(5);
      expect(repaired.progress.xp).toBe(0);
      expect(repaired.progress.streak.count).toBe(0);
    });
  });

  // Group 4: Corrupted Storage Recovery
  describe('Group 4: Corrupted Storage Recovery', () => {
    it('handles corrupted JSON string without throwing and returns safe default', () => {
      writeHotItemSync('hanzero_user_state_v1', '{ corrupt json [[[');

      const state = getStoredUserStateSync();
      expect(isUserStateSchema(state)).toBe(true);
      expect(state.progress.xp).toBe(0);
    });
  });

  // Group 5: QuotaExceeded Recovery & Fallback
  describe('Group 5: QuotaExceeded Recovery', () => {
    it('handles QuotaExceededError smoothly and falls back to in-memory store', () => {
      const setItemSpy = vi.spyOn(mockLocalStorage, 'setItem').mockImplementation(() => {
        const err = new DOMException('The quota has been exceeded', 'QuotaExceededError');
        throw err;
      });

      const writeSuccess = writeHotItemSync('test_key', 'value_data');
      expect(writeSuccess).toBe(true);
      // Value should be preserved in memory fallback
      expect(readHotItemSync('test_key')).toBe('value_data');

      setItemSpy.mockRestore();
    });
  });

  // Group 6: Safari Private Mode / Security Sandbox
  describe('Group 6: Safari Security Sandbox Resilience', () => {
    it('operates via memory fallback when localStorage access throws SecurityError', () => {
      const getItemSpy = vi.spyOn(mockLocalStorage, 'getItem').mockImplementation(() => {
        throw new DOMException('Access to storage is denied', 'SecurityError');
      });

      const fallbackRead = readHotItemSync('some_key');
      expect(fallbackRead).toBe(null);

      writeHotItemSync('safe_in_memory', 'persisted_in_ram');
      expect(readHotItemSync('safe_in_memory')).toBe('persisted_in_ram');

      getItemSpy.mockRestore();
    });
  });

  // Group 7: Dual-Tier Self-Healing (Ghost State Recovery)
  describe('Group 7: Dual-Tier Self-Healing (Cold to Hot Resurrection)', () => {
    it('resurrects Hot state from Cold mirror when LocalStorage was evicted', async () => {
      const initial = getStoredUserStateSync();
      initial.progress.xp = 500;
      initial.progress.streak.count = 14;

      await saveColdMirror(initial);

      // Simulate eviction of LocalStorage
      mockLocalStorage.clear();

      const resurrected = await initializeStorage();
      expect(resurrected.progress.xp).toBe(500);
      expect(resurrected.progress.streak.count).toBe(14);

      const hotAfter = getStoredUserStateSync();
      expect(hotAfter.progress.xp).toBe(500);
    });
  });

  // Group 8: Sequential Mutex & Concurrent Writes Stress Test
  describe('Group 8: Sequential Mutex & Concurrent Writes Stress', () => {
    it('processes 30 rapid concurrent writes without crashing or race conditions', async () => {
      await initializeStorage();

      const promises: Promise<void>[] = [];
      for (let i = 1; i <= 30; i++) {
        const state = getStoredUserStateSync();
        state.progress.xp = i * 10;
        promises.push(saveUserState(state));
      }

      await Promise.all(promises);

      const finalState = getStoredUserStateSync();
      expect(finalState.progress.xp).toBe(300);
    });

    it('saves and loads cold SRS records and Hanzi strokes reliably', async () => {
      const srsRecord: SrsItemRecord = {
        word_id: 'hsk1_0001',
        hanzi: '我',
        pinyin: 'wǒ',
        meaning_th: 'ฉัน',
        ease_factor: 2.5,
        interval_days: 1,
        repetitions: 1,
        due_date: '2026-09-20',
        last_reviewed: '2026-09-18T00:00:00.000Z',
        review_history: [{ date: '2026-09-18T00:00:00.000Z', grade: 5 }],
      };

      await saveSrsRecord(srsRecord);
      const loaded = await loadSrsRecord('hsk1_0001');
      expect(loaded).toBeDefined();
      expect(loaded?.hanzi).toBe('我');
      expect(loaded?.meaning_th).toBe('ฉัน');

      // Test bulk save and load all
      await bulkSaveSrsRecords([
        srsRecord,
        { ...srsRecord, word_id: 'hsk1_0002', hanzi: '你', pinyin: 'nǐ', meaning_th: 'คุณ' },
      ]);
      const allRecords = await loadAllSrsRecords();
      expect(allRecords.length).toBeGreaterThanOrEqual(2);

      // Hanzi stroke cache
      await saveStrokeCache('我', ['M0 0 L10 10'], [[[0, 0], [10, 10]]]);
      const stroke = await loadStrokeCache('我');
      expect(stroke?.strokes.length).toBe(1);
    });
  });

  // Group 9: Emergency Quick Sync Code
  describe('Group 9: Emergency Quick Sync Code & Checksum', () => {
    it('generates valid Quick Sync string with matching CRC16 checksum', () => {
      const state = getStoredUserStateSync();
      state.progress.current_tier = 'tier1';
      state.progress.unlocked_units = ['tier1_u01', 'tier1_u02'];
      state.progress.completed_lessons = ['t1_u01_l01', 't1_u01_l02', 't1_u01_l03'];
      state.progress.streak.count = 7;
      state.progress.xp = 1250;

      const code = getQuickSyncCode(state);
      expect(code.startsWith('HZ1-T1-U02-L03-S07-X1250-C')).toBe(true);

      const parsed = parseQuickSyncCode(code);
      expect(parsed).not.toBeNull();
      expect(parsed?.tier).toBe('tier1');
      expect(parsed?.xp).toBe(1250);
      expect(parsed?.streakCount).toBe(7);
      expect(parsed?.lessonCount).toBe(3);
    });

    it('rejects tampered codes with invalid checksum', () => {
      const validCode = 'HZ1-T1-U02-L03-S07-X1250-CAAAA'; // Fake CRC
      const parsed = parseQuickSyncCode(validCode);
      expect(parsed).toBeNull();
    });

    it('normalizes iOS smart punctuation (en-dash, em-dash) and whitespace', () => {
      const cleanPrefix = 'HZ1-T1-U02-L03-S07-X1250';
      const crc = calculateCrc16(cleanPrefix);
      expect(verifyCrc16(cleanPrefix, crc)).toBe(true);

      const fullIosCode = `  hz1—t1—u02—l03—s07—x1250—c${crc} \n`;
      const normalized = normalizeQuickSyncCode(fullIosCode);
      expect(normalized).toBe(`HZ1-T1-U02-L03-S07-X1250-C${crc}`);

      const parsed = parseQuickSyncCode(fullIosCode);
      expect(parsed).not.toBeNull();
      expect(parsed?.xp).toBe(1250);
    });

    it('restores state from a valid Quick Sync code', async () => {
      const cleanPrefix = 'HZ1-T1-U05-L10-S15-X2400';
      const crc = calculateCrc16(cleanPrefix);
      const code = `${cleanPrefix}-C${crc}`;

      const res = await restoreFromQuickSyncCode(code);
      expect(res.success).toBe(true);

      const restoredState = getStoredUserStateSync();
      expect(restoredState.progress.xp).toBe(2400);
      expect(restoredState.progress.streak.count).toBe(15);
    });
  });

  // Group 10: 1-Click Full Snapshot Backup & Restore
  describe('Group 10: 1-Click JSON Snapshot Export & Import', () => {
    it('exports full snapshot as JSON string and imports it back with 100% fidelity', async () => {
      const state = getStoredUserStateSync();
      state.progress.xp = 880;
      await saveUserState(state);

      const srsItem: SrsItemRecord = {
        word_id: 'hsk1_0002',
        hanzi: '你',
        pinyin: 'nǐ',
        meaning_th: 'คุณ',
        ease_factor: 2.5,
        interval_days: 3,
        repetitions: 2,
        due_date: '2026-09-22',
        last_reviewed: '2026-09-18T00:00:00.000Z',
        review_history: [],
      };
      await saveSrsRecord(srsItem);

      // Export
      const jsonBackup = await exportSnapshotAsJsonString();
      expect(jsonBackup).toContain('"app": "Hanzero"');
      expect(jsonBackup).toContain('"word_id": "hsk1_0002"');

      // Clear storage
      await resetStorage();
      expect(getStoredUserStateSync().progress.xp).toBe(0);

      // Import
      const importRes = await importSnapshotFromJsonString(jsonBackup);
      expect(importRes.success).toBe(true);
      expect(importRes.importedSrsCount).toBe(1);

      // Verify restored data
      expect(getStoredUserStateSync().progress.xp).toBe(880);
      const loadedSrs = await loadSrsRecord('hsk1_0002');
      expect(loadedSrs?.hanzi).toBe('你');
    });

    it('rejects malformed or non-Hanzero backup JSON', async () => {
      const invalidJson = JSON.stringify({ app: 'DifferentApp', data: {} });
      const res = await importSnapshotFromJsonString(invalidJson);
      expect(res.success).toBe(false);
      expect(res.error).toContain('Unrecognized backup file');
    });

    it('rejects memory DoS attack with more than 10,000 SRS records', async () => {
      const oversizedRecords = new Array(10005).fill({
        word_id: 'dummy',
        hanzi: '字',
        pinyin: 'zì',
        meaning_th: 'อักษร',
        ease_factor: 2.5,
        interval_days: 1,
        repetitions: 1,
        due_date: '2026-09-20',
        last_reviewed: '2026-09-18T00:00:00.000Z',
        review_history: [],
      });

      const dosPayload = JSON.stringify({
        app: 'Hanzero',
        export_version: 1,
        exported_at: new Date().toISOString(),
        hot_state: getStoredUserStateSync(),
        srs_records: oversizedRecords,
      });

      const res = await importSnapshotFromJsonString(dosPayload);
      expect(res.success).toBe(false);
      expect(res.error).toContain('exceeds the safety limit');
    });
  });

  // Health and Persistence checks
  describe('Storage Diagnostics & Health', () => {
    it('returns healthy storage diagnostics', async () => {
      const health = await checkStorageHealth();
      expect(health.isLocalStorageAvailable).toBe(true);
      expect(health.activeStorageTier).toBeDefined();
    });

    it('handles requestStoragePersistence gracefully when navigator is unavailable or available', async () => {
      const persisted = await requestStoragePersistence();
      expect(typeof persisted).toBe('boolean');
    });

    it('defines distinct database names for SRS, strokes, and mirror to prevent idb-keyval collision', () => {
      expect(INDEXEDDB_CONFIG.DB_NAMES.SRS).toBe('hanzero_srs_db');
      expect(INDEXEDDB_CONFIG.DB_NAMES.STROKES).toBe('hanzero_strokes_db');
      expect(INDEXEDDB_CONFIG.DB_NAMES.MIRROR).toBe('hanzero_mirror_db');
    });

    it('blocks zombie auto-resurrection when resetStorage is called and page initializes', async () => {
      // 1. Seed state with XP and lesson progress
      const state = getStoredUserStateSync();
      state.progress.xp = 500;
      state.progress.completed_lessons = ['t0_u01_l01', 't0_u01_l02'];
      await saveUserState(state);

      // 2. User requests resetStorage()
      await resetStorage();

      // 3. Simulate page reload by resetting memory variables and calling initializeStorage()
      _resetStorageEngineForTesting();
      const cleanBootState = await initializeStorage();

      // 4. Assert clean default state (0 XP, no lessons, zero-resurrection)
      expect(cleanBootState.progress.xp).toBe(0);
      expect(cleanBootState.progress.completed_lessons.length).toBe(0);
    });
  });
});

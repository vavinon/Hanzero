/**
 * src/engines/storage/types.ts
 * Type definitions, schemas, and guards for Hanzero Tiered Storage Engine.
 * Strict TypeScript: Zero 'any'
 */

export const STORAGE_KEYS = {
  HOT_USER_STATE: 'hanzero_user_state_v1',
  DIAGNOSTICS: 'hanzero_diagnostics_v1',
} as const;

export const INDEXEDDB_CONFIG = {
  DB_NAME: 'hanzero_db',
  STORES: {
    SRS_RECORDS: 'srs_records',
    HANZI_STROKES: 'hanzi_strokes',
    COLD_HOT_MIRROR: 'cold_hot_mirror',
  },
} as const;

export const CURRENT_SCHEMA_VERSION = 1;

export type ThemePreference = 'light' | 'dark';
export type HanziFontStyle = 'wenkai' | 'sans';

export interface PreferencesState {
  theme: ThemePreference;
  silent_mode: boolean;
  speech_rate: number;
  audio_sfx_volume: number;
  hanzi_font_style: HanziFontStyle;
}

export interface ProgressStreak {
  count: number;
  last_active_date: string; // "YYYY-MM-DD"
  freeze_tokens: number;
}

export interface ProgressHearts {
  current: number; // 0 - 5
  max: number; // 5
  last_regen_timestamp: number; // Epoch ms
}

export interface ProgressState {
  current_tier: string;
  unlocked_tiers: string[];
  unlocked_units: string[];
  completed_lessons: string[];
  streak: ProgressStreak;
  hearts: ProgressHearts;
  xp: number;
  level: number;
}

export interface SrsSummaryState {
  total_learned_count: number;
  due_today_count: number;
  last_review_date: string;
}

export interface DiagnosticsState {
  confused_pinyin_tones: Record<string, number>;
  total_practice_count: number;
}

export interface UserStateSchema {
  schema_version: typeof CURRENT_SCHEMA_VERSION;
  updated_at: string; // ISO 8601
  preferences: PreferencesState;
  progress: ProgressState;
  srs_summary: SrsSummaryState;
  diagnostics: DiagnosticsState;
}

// Cold Tier: SRS Card Item (IndexedDB object store: "srs_records")
export interface SrsReviewHistoryEntry {
  date: string; // ISO 8601
  grade: number; // 0..5 (SM-2)
}

export interface SrsItemRecord {
  word_id: string; // Primary key: e.g. "hsk1_0001"
  hanzi: string;
  pinyin: string;
  meaning_th: string;
  ease_factor: number; // Default 2.5
  interval_days: number;
  repetitions: number;
  due_date: string; // "YYYY-MM-DD"
  last_reviewed: string; // ISO 8601
  review_history: SrsReviewHistoryEntry[];
}

// Cold Tier: Hanzi Stroke Cache (IndexedDB object store: "hanzi_strokes")
export interface HanziStrokeCacheRecord {
  char: string; // Primary key: e.g. "我"
  strokes: string[];
  medians: number[][][];
  cached_at: number; // Epoch ms
}

// Full Snapshot for 1-Click Backup / Restore
export interface HanzeroBackupSnapshot {
  app: 'Hanzero';
  export_version: typeof CURRENT_SCHEMA_VERSION;
  exported_at: string; // ISO 8601
  hot_state: UserStateSchema;
  srs_records: SrsItemRecord[];
}

// Emergency Quick Sync Payload
export interface QuickSyncPayload {
  tier: string; // e.g. "T0", "T1"
  unit: string; // e.g. "U01"
  lessonCount: number;
  streakCount: number;
  xp: number;
}

// Storage Diagnostics and Resilience State
export interface StorageDiagnostics {
  isLocalStorageAvailable: boolean;
  isIndexedDbAvailable: boolean;
  isPersisted: boolean;
  activeStorageTier: 'dual' | 'hot-only' | 'cold-only' | 'memory-fallback';
  storageQuotaEstimatedBytes?: number;
  storageUsageEstimatedBytes?: number;
  lastSyncTimestamp: number | null;
  degradedMode: boolean;
  degradedReason?: string;
}

/**
 * Creates a brand-new, valid UserStateSchema with initial values
 */
export function createDefaultUserState(): UserStateSchema {
  return {
    schema_version: 1,
    updated_at: new Date().toISOString(),
    preferences: {
      theme: 'light',
      silent_mode: false,
      speech_rate: 0.85,
      audio_sfx_volume: 0.8,
      hanzi_font_style: 'wenkai',
    },
    progress: {
      current_tier: 'tier1',
      unlocked_tiers: ['tier0', 'tier1'],
      unlocked_units: ['tier1_u01'],
      completed_lessons: [],
      streak: {
        count: 0,
        last_active_date: '',
        freeze_tokens: 2,
      },
      hearts: {
        current: 5,
        max: 5,
        last_regen_timestamp: Date.now(),
      },
      xp: 0,
      level: 1,
    },
    srs_summary: {
      total_learned_count: 0,
      due_today_count: 0,
      last_review_date: '',
    },
    diagnostics: {
      confused_pinyin_tones: {},
      total_practice_count: 0,
    },
  };
}

/**
 * Strict Type Guard for UserStateSchema
 */
export function isUserStateSchema(value: unknown): value is UserStateSchema {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;

  if (v.schema_version !== 1 || typeof v.updated_at !== 'string') return false;
  if (typeof v.preferences !== 'object' || v.preferences === null) return false;
  if (typeof v.progress !== 'object' || v.progress === null) return false;
  if (typeof v.srs_summary !== 'object' || v.srs_summary === null) return false;
  if (typeof v.diagnostics !== 'object' || v.diagnostics === null) return false;

  const pref = v.preferences as Record<string, unknown>;
  if (pref.theme !== 'light' && pref.theme !== 'dark') return false;

  const prog = v.progress as Record<string, unknown>;
  if (typeof prog.current_tier !== 'string') return false;
  if (!Array.isArray(prog.unlocked_tiers) || !Array.isArray(prog.unlocked_units) || !Array.isArray(prog.completed_lessons)) return false;
  if (typeof prog.streak !== 'object' || prog.streak === null) return false;
  if (typeof prog.hearts !== 'object' || prog.hearts === null) return false;
  if (typeof prog.xp !== 'number' || !Number.isFinite(prog.xp)) return false;

  return true;
}

/**
 * Strict Type Guard for SrsItemRecord
 */
export function isSrsItemRecord(value: unknown): value is SrsItemRecord {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.word_id === 'string' &&
    typeof v.hanzi === 'string' &&
    typeof v.pinyin === 'string' &&
    typeof v.meaning_th === 'string' &&
    typeof v.ease_factor === 'number' &&
    typeof v.interval_days === 'number' &&
    typeof v.repetitions === 'number' &&
    typeof v.due_date === 'string' &&
    Array.isArray(v.review_history)
  );
}

/**
 * Strict Type Guard for HanzeroBackupSnapshot
 */
export function isHanzeroBackupSnapshot(value: unknown): value is HanzeroBackupSnapshot {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    v.app === 'Hanzero' &&
    v.export_version === 1 &&
    typeof v.exported_at === 'string' &&
    isUserStateSchema(v.hot_state) &&
    Array.isArray(v.srs_records) &&
    v.srs_records.every(isSrsItemRecord)
  );
}

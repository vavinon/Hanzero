/**
 * src/engines/storage/migration.ts
 * Schema migration pipeline with Prototype Pollution defense and Numeric Clamping invariants.
 */

import { UserStateSchema, createDefaultUserState } from './types';

/**
 * Strips dangerous prototype keys (__proto__, constructor, prototype)
 */
export function stripPollution<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(stripPollution) as unknown as T;
  }

  const clean: Record<string, unknown> = {};
  const record = obj as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    const val = record[key];
    clean[key] = typeof val === 'object' && val !== null ? stripPollution(val) : val;
  }

  return clean as T;
}

/**
 * Clamps numeric values strictly, falling back to a safe default if NaN or infinite
 */
export function clampNumber(val: unknown, min: number, max: number, fallback: number): number {
  if (typeof val !== 'number' || !Number.isFinite(val) || Number.isNaN(val)) {
    return fallback;
  }
  return Math.min(Math.max(val, min), max);
}

/**
 * Safely parses and migrates any raw input into a valid UserStateSchema v1
 */
export function migrateUserState(raw: unknown): UserStateSchema {
  const defaultState = createDefaultUserState();

  if (typeof raw !== 'object' || raw === null) {
    return defaultState;
  }

  // 1. Defend against Prototype Pollution
  const cleanRaw = stripPollution(raw) as Record<string, unknown>;

  // 2. Extract nested sections
  const pref = (typeof cleanRaw.preferences === 'object' && cleanRaw.preferences !== null
    ? cleanRaw.preferences
    : {}) as Record<string, unknown>;

  const prog = (typeof cleanRaw.progress === 'object' && cleanRaw.progress !== null
    ? cleanRaw.progress
    : {}) as Record<string, unknown>;

  const streak = (typeof prog.streak === 'object' && prog.streak !== null
    ? prog.streak
    : {}) as Record<string, unknown>;

  const hearts = (typeof prog.hearts === 'object' && prog.hearts !== null
    ? prog.hearts
    : {}) as Record<string, unknown>;

  const srs = (typeof cleanRaw.srs_summary === 'object' && cleanRaw.srs_summary !== null
    ? cleanRaw.srs_summary
    : {}) as Record<string, unknown>;

  const diag = (typeof cleanRaw.diagnostics === 'object' && cleanRaw.diagnostics !== null
    ? cleanRaw.diagnostics
    : {}) as Record<string, unknown>;

  // 3. Assemble and clamp values
  const theme: 'light' | 'dark' = pref.theme === 'dark' ? 'dark' : 'light';
  const hanziStyle: 'wenkai' | 'sans' = pref.hanzi_font_style === 'sans' ? 'sans' : 'wenkai';

  const migrated: UserStateSchema = {
    schema_version: 1,
    updated_at:
      typeof cleanRaw.updated_at === 'string' && cleanRaw.updated_at.length > 0
        ? cleanRaw.updated_at
        : new Date().toISOString(),

    preferences: {
      theme,
      silent_mode: Boolean(pref.silent_mode),
      speech_rate: clampNumber(pref.speech_rate, 0.5, 1.5, 0.85),
      audio_sfx_volume: clampNumber(pref.audio_sfx_volume, 0, 1, 0.8),
      hanzi_font_style: hanziStyle,
    },

    progress: {
      current_tier: typeof prog.current_tier === 'string' ? prog.current_tier : defaultState.progress.current_tier,
      unlocked_tiers: Array.isArray(prog.unlocked_tiers)
        ? prog.unlocked_tiers.filter((t): t is string => typeof t === 'string')
        : defaultState.progress.unlocked_tiers,
      unlocked_units: Array.isArray(prog.unlocked_units)
        ? prog.unlocked_units.filter((u): u is string => typeof u === 'string')
        : defaultState.progress.unlocked_units,
      completed_lessons: Array.isArray(prog.completed_lessons)
        ? prog.completed_lessons.filter((l): l is string => typeof l === 'string')
        : [],
      streak: {
        count: Math.floor(clampNumber(streak.count, 0, 100000, 0)),
        last_active_date: typeof streak.last_active_date === 'string' ? streak.last_active_date : '',
        freeze_tokens: Math.floor(clampNumber(streak.freeze_tokens, 0, 10, 2)),
      },
      hearts: {
        current: Math.floor(clampNumber(hearts.current, 0, 5, 5)),
        max: 5,
        last_regen_timestamp:
          typeof hearts.last_regen_timestamp === 'number' && Number.isFinite(hearts.last_regen_timestamp)
            ? hearts.last_regen_timestamp
            : Date.now(),
      },
      xp: Math.floor(clampNumber(prog.xp, 0, 10000000, 0)),
      level: Math.floor(clampNumber(prog.level, 1, 1000, 1)),
      onboarding_completed: Boolean(prog.onboarding_completed),
      selected_track: prog.selected_track === 'tier1' ? 'tier1' : 'tier0',
    },

    srs_summary: {
      total_learned_count: Math.floor(clampNumber(srs.total_learned_count, 0, 100000, 0)),
      due_today_count: Math.floor(clampNumber(srs.due_today_count, 0, 100000, 0)),
      last_review_date: typeof srs.last_review_date === 'string' ? srs.last_review_date : '',
    },

    diagnostics: {
      confused_pinyin_tones:
        typeof diag.confused_pinyin_tones === 'object' && diag.confused_pinyin_tones !== null
          ? (diag.confused_pinyin_tones as Record<string, number>)
          : {},
      total_practice_count: Math.floor(clampNumber(diag.total_practice_count, 0, 1000000, 0)),
    },
  };

  return migrated;
}

/**
 * src/engines/storage/quickSync.ts
 * Emergency Quick Sync Code encoder, normalizer, and decoder with CRC16 integrity validation.
 */

import { UserStateSchema, QuickSyncPayload } from './types';
import { calculateCrc16, verifyCrc16 } from './checksum';

/**
 * Normalizes input string by replacing iOS smart punctuation, removing whitespace, and uppercasing.
 */
export function normalizeQuickSyncCode(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, '-') // Normalize en-dash, em-dash, minus
    .replace(/\s+/g, '') // Remove all whitespace
    .toUpperCase();
}

/**
 * Encodes UserStateSchema into a compact, human-copyable sync code with CRC16 checksum.
 * Example: "HZ1-T1-U01-L03-S05-X150-C9A2"
 */
export function generateQuickSyncCode(state: UserStateSchema): string {
  const tierMatch = state.progress.current_tier.match(/\d+/);
  const tierNum = tierMatch ? tierMatch[0] : '1';

  const unitCount = state.progress.unlocked_units.length;
  const lessonCount = state.progress.completed_lessons.length;
  const streak = state.progress.streak.count;
  const xp = state.progress.xp;

  const body = `T${tierNum}-U${unitCount.toString().padStart(2, '0')}-L${lessonCount.toString().padStart(2, '0')}-S${streak.toString().padStart(2, '0')}-X${xp}`;
  const payloadToSign = `HZ1-${body}`;
  const checksum = calculateCrc16(payloadToSign);

  return `${payloadToSign}-C${checksum}`;
}

/**
 * Parses and verifies an Emergency Quick Sync Code.
 * Returns null if format is invalid, truncated, or checksum fails (tampered).
 */
export function parseQuickSyncCode(rawInput: string): QuickSyncPayload | null {
  const normalized = normalizeQuickSyncCode(rawInput);
  if (!normalized) return null;

  // Regex pattern for HZ1-T{tier}-U{units}-L{lessons}-S{streak}-X{xp}-C{crc4}
  const match = normalized.match(/^HZ1-T(\d+)-U(\d+)-L(\d+)-S(\d+)-X(\d+)-C([0-9A-F]{4})$/);
  if (!match) return null;

  const [, tierStr, unitStr, lessonStr, streakStr, xpStr, expectedCrc] = match;

  // Verify CRC16 against the body
  const payloadToVerify = `HZ1-T${tierStr}-U${unitStr}-L${lessonStr}-S${streakStr}-X${xpStr}`;
  if (!verifyCrc16(payloadToVerify, expectedCrc)) {
    console.warn('[Hanzero QuickSync] Checksum mismatch! Code may be corrupted or tampered.');
    return null;
  }

  return {
    tier: `tier${tierStr}`,
    unit: `tier${tierStr}_u${unitStr}`,
    lessonCount: parseInt(lessonStr, 10),
    streakCount: parseInt(streakStr, 10),
    xp: parseInt(xpStr, 10),
  };
}

/**
 * Safely applies recovered QuickSyncPayload into an existing UserStateSchema
 */
export function applyQuickSyncToState(
  currentState: UserStateSchema,
  payload: QuickSyncPayload
): UserStateSchema {
  return {
    ...currentState,
    updated_at: new Date().toISOString(),
    progress: {
      ...currentState.progress,
      current_tier: payload.tier,
      streak: {
        ...currentState.progress.streak,
        count: Math.max(currentState.progress.streak.count, payload.streakCount),
        last_active_date: new Date().toISOString().slice(0, 10),
      },
      xp: Math.max(currentState.progress.xp, payload.xp),
    },
  };
}

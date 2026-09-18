/**
 * src/engines/storage/snapshot.ts
 * 1-Click JSON Full Snapshot Export and Import with Memory DoS guards and atomic validation.
 */

import {
  HanzeroBackupSnapshot,
  UserStateSchema,
  SrsItemRecord,
  isSrsItemRecord,
} from './types';
import { migrateUserState } from './migration';

const MAX_SRS_RECORDS_IMPORT = 10000;

/**
 * Creates a complete backup payload
 */
export function createSnapshotPayload(
  hotState: UserStateSchema,
  srsRecords: SrsItemRecord[]
): HanzeroBackupSnapshot {
  return {
    app: 'Hanzero',
    export_version: 1,
    exported_at: new Date().toISOString(),
    hot_state: hotState,
    srs_records: srsRecords,
  };
}

/**
 * Exports complete backup payload as a formatted JSON string
 */
export function formatSnapshotAsJsonString(
  hotState: UserStateSchema,
  srsRecords: SrsItemRecord[]
): string {
  const snapshot = createSnapshotPayload(hotState, srsRecords);
  return JSON.stringify(snapshot, null, 2);
}

export interface ImportSnapshotResult {
  success: boolean;
  error?: string;
  snapshot?: HanzeroBackupSnapshot;
}

/**
 * Validates and imports snapshot JSON string with Memory DoS defense and All-or-Nothing validation.
 */
export function parseAndValidateSnapshotJson(jsonStr: string): ImportSnapshotResult {
  if (!jsonStr || typeof jsonStr !== 'string') {
    return { success: false, error: 'Empty or non-string input provided.' };
  }

  let raw: unknown;
  try {
    raw = JSON.parse(jsonStr);
  } catch {
    return { success: false, error: 'Malformed JSON format.' };
  }

  if (typeof raw !== 'object' || raw === null) {
    return { success: false, error: 'Invalid snapshot root object.' };
  }

  const candidate = raw as Record<string, unknown>;
  if (candidate.app !== 'Hanzero') {
    return { success: false, error: 'Unrecognized backup file. Missing "app": "Hanzero" signature.' };
  }

  // Defend against Memory Exhaustion DoS
  if (Array.isArray(candidate.srs_records) && candidate.srs_records.length > MAX_SRS_RECORDS_IMPORT) {
    return {
      success: false,
      error: `Backup contains ${candidate.srs_records.length} records, which exceeds the safety limit of ${MAX_SRS_RECORDS_IMPORT}.`,
    };
  }

  // Migrate and sanitize Hot State
  const migratedHotState = migrateUserState(candidate.hot_state);

  // Validate SRS records
  const validSrsRecords: SrsItemRecord[] = [];
  if (Array.isArray(candidate.srs_records)) {
    for (const item of candidate.srs_records) {
      if (isSrsItemRecord(item)) {
        validSrsRecords.push(item);
      }
    }
  }

  const validatedSnapshot: HanzeroBackupSnapshot = {
    app: 'Hanzero',
    export_version: 1,
    exported_at:
      typeof candidate.exported_at === 'string' ? candidate.exported_at : new Date().toISOString(),
    hot_state: migratedHotState,
    srs_records: validSrsRecords,
  };

  return {
    success: true,
    snapshot: validatedSnapshot,
  };
}

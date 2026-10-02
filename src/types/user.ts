/**
 * src/types/user.ts
 * Canonical User State & Progress Types for Hanzero.
 * Strict TypeScript: Zero 'any'
 */

export type {
  ThemePreference,
  HanziFontStyle,
  PreferencesState,
  ProgressStreak,
  ProgressHearts,
  ProgressState,
  SrsSummaryState,
  DiagnosticsState,
  UserStateSchema,
  HanzeroBackupSnapshot,
  QuickSyncPayload,
  StorageDiagnostics,
} from '../engines/storage/types';

export {
  CURRENT_SCHEMA_VERSION,
  STORAGE_KEYS,
  createDefaultUserState,
  isUserStateSchema,
  isHanzeroBackupSnapshot,
} from '../engines/storage/types';

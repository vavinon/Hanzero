/**
 * src/types/srs.ts
 * Canonical Spaced Repetition System (SRS) Interfaces for Hanzero.
 * Strict TypeScript: Zero 'any'
 */

export type {
  SrsReviewHistoryEntry,
  SrsItemRecord,
  HanziStrokeCacheRecord,
} from '../engines/storage/types';

export {
  INDEXEDDB_CONFIG,
  isSrsItemRecord,
} from '../engines/storage/types';

/**
 * SuperMemo SM-2 Evaluation Grades
 * 0 = Again (Complete blackout)
 * 1 = Hard (Difficult recall)
 * 2 = Good (Successful recall with slight effort)
 * 3 = Easy (Instant effortless recall)
 */
export type SrsRatingGrade = 0 | 1 | 2 | 3;

export interface SrsNextReviewCalculation {
  intervalDays: number;
  repetitions: number;
  easeFactor: number;
  dueDate: string; // "YYYY-MM-DD"
}

export interface SrsQueueStatus {
  dueCards: import('../engines/storage/types').SrsItemRecord[];
  totalDueToday: number;
  isDailyCapActive: boolean;
  isTriageActive: boolean;
  remainingBacklogCount: number;
}

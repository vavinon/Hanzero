/**
 * src/types/srs.ts
 * Type definitions for SuperMemo SM-2 Spaced Repetition System in Hanzero.
 */

export type SRSGrade = 0 | 1 | 2 | 3; // 0 = Again, 1 = Hard, 2 = Good, 3 = Easy

export interface SRSHistoryEntry {
  date: string; // ISO 8601
  grade: SRSGrade;
}

export interface SRSCardRecord {
  card_id: string; // word_id, e.g. "u01_w01_nihao"
  hanzi: string;
  pinyin: string;
  display_pinyin?: string;
  meaning_th: string;
  meaning_en: string;
  mnemonic?: string;
  ease_factor: number; // Initial 2.5, clamped between 1.3 and 2.5
  interval_days: number;
  repetitions: number;
  due_date: string; // "YYYY-MM-DD"
  last_reviewed: string; // ISO 8601
  review_history: SRSHistoryEntry[];
}

export interface SRSReviewResult {
  card: SRSCardRecord;
  next_interval_days: number;
  next_ease_factor: number;
  next_due_date: string;
  repetitions: number;
}

export interface SRSQueueStatus {
  total_due_count: number;
  queue: SRSCardRecord[];
  is_triage_active: boolean;
  triage_remaining_backlog: number;
  daily_cap: number;
}

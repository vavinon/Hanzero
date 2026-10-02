/**
 * src/engines/srs/srsEngine.ts
 * Pure TypeScript SuperMemo SM-2 Spaced Repetition Engine for Hanzero.
 * Zero-UI, zero external dependencies, 100% testable.
 *
 * Implements:
 * - SM-2 with 4-grade scale (Again=0, Hard=1, Good=2, Easy=3)
 * - Ease Factor clamping [1.3, 2.5]
 * - Daily Review Cap (MAX_DAILY_REVIEWS = 20)
 * - Anti-Cognitive Overload Backlog Triage (TRIAGE_BATCH_SIZE = 10)
 */

import { SRSCardRecord, SRSGrade, SRSQueueStatus, SRSReviewResult } from '../../types/srs';

export const SRS_CONSTANTS = {
  INITIAL_EASE_FACTOR: 2.5,
  MIN_EASE_FACTOR: 1.3,
  MAX_EASE_FACTOR: 2.5,
  MAX_DAILY_REVIEWS: 20,
  TRIAGE_THRESHOLD_COUNT: 30,
  TRIAGE_THRESHOLD_DAYS_ABSENT: 7,
  TRIAGE_BATCH_SIZE: 10,
} as const;

/**
 * Formats a Date object to "YYYY-MM-DD" string.
 */
export function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Adds specified number of days to a Date and returns a new Date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Calculates days between two date strings (YYYY-MM-DD).
 */
export function calculateDaysBetween(startDateStr: string, endDateStr: string): number {
  const start = new Date(startDateStr + 'T00:00:00Z');
  const end = new Date(endDateStr + 'T00:00:00Z');
  const diffMs = end.getTime() - start.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Factory to create a fresh SRS card record.
 */
export function createNewCard(
  params: {
    card_id: string;
    hanzi: string;
    pinyin: string;
    display_pinyin?: string;
    meaning_th: string;
    meaning_en: string;
    mnemonic?: string;
  },
  initialDueDate?: string
): SRSCardRecord {
  const todayStr = initialDueDate || formatDateString(new Date());
  return {
    card_id: params.card_id,
    hanzi: params.hanzi,
    pinyin: params.pinyin,
    display_pinyin: params.display_pinyin,
    meaning_th: params.meaning_th,
    meaning_en: params.meaning_en,
    mnemonic: params.mnemonic,
    ease_factor: SRS_CONSTANTS.INITIAL_EASE_FACTOR,
    interval_days: 0,
    repetitions: 0,
    due_date: todayStr,
    last_reviewed: '',
    review_history: [],
  };
}

/**
 * Calculates updated Ease Factor based on SM-2 formula.
 * Clamps result to [MIN_EASE_FACTOR, MAX_EASE_FACTOR].
 */
export function calculateNewEaseFactor(currentEF: number, grade: SRSGrade): number {
  // EF' = EF + (0.1 - (3 - grade) * (0.08 + (3 - grade) * 0.02))
  const diff = 3 - grade;
  const delta = 0.1 - diff * (0.08 + diff * 0.02);
  const updatedEF = currentEF + delta;

  return Math.min(
    SRS_CONSTANTS.MAX_EASE_FACTOR,
    Math.max(SRS_CONSTANTS.MIN_EASE_FACTOR, Math.round(updatedEF * 100) / 100)
  );
}

/**
 * Computes next review schedule for an SRS card upon receiving learner's grade.
 */
export function calculateNextReview(
  card: SRSCardRecord,
  grade: SRSGrade,
  reviewDate: Date = new Date()
): SRSReviewResult {
  const reviewTimestamp = reviewDate.toISOString();
  const newEF = calculateNewEaseFactor(card.ease_factor, grade);

  let nextInterval: number;
  let nextRepetitions: number;

  if (grade === 0) {
    // Again: reset repetitions to 0 and schedule next review for tomorrow (1 day)
    nextRepetitions = 0;
    nextInterval = 1;
  } else {
    // Successful recall (1 = Hard, 2 = Good, 3 = Easy)
    if (card.repetitions === 0) {
      nextInterval = 1;
    } else if (card.repetitions === 1) {
      nextInterval = grade === 3 ? 6 : 3;
    } else {
      nextInterval = Math.max(1, Math.ceil(card.interval_days * newEF));
    }
    nextRepetitions = card.repetitions + 1;
  }

  const nextDueDate = formatDateString(addDays(reviewDate, nextInterval));

  const updatedCard: SRSCardRecord = {
    ...card,
    ease_factor: newEF,
    interval_days: nextInterval,
    repetitions: nextRepetitions,
    due_date: nextDueDate,
    last_reviewed: reviewTimestamp,
    review_history: [
      ...card.review_history,
      {
        date: reviewTimestamp,
        grade,
      },
    ],
  };

  return {
    card: updatedCard,
    next_interval_days: nextInterval,
    next_ease_factor: newEF,
    next_due_date: nextDueDate,
    repetitions: nextRepetitions,
  };
}

/**
 * Builds the SRS review queue for the current day.
 * Applies Daily Cap (20) and Backlog Triage (10) to protect against learner cognitive burnout.
 */
export function buildReviewQueue(
  allCards: SRSCardRecord[],
  todayDateStr: string = formatDateString(new Date()),
  daysAbsent: number = 0
): SRSQueueStatus {
  // 1. Filter all cards where due_date <= today
  const dueCards = allCards.filter((card) => card.due_date <= todayDateStr);

  // 2. Sort due cards: prioritize cards overdue longest, then hardest cards (lowest EF)
  dueCards.sort((a, b) => {
    if (a.due_date !== b.due_date) {
      return a.due_date.localeCompare(b.due_date);
    }
    return a.ease_factor - b.ease_factor;
  });

  const totalDueCount = dueCards.length;

  // 3. Evaluate Backlog Triage conditions:
  // - Absent for > 7 days OR
  // - Accumulated backlog > 30 cards
  const isTriageActive =
    totalDueCount > SRS_CONSTANTS.TRIAGE_THRESHOLD_COUNT ||
    daysAbsent >= SRS_CONSTANTS.TRIAGE_THRESHOLD_DAYS_ABSENT;

  if (isTriageActive) {
    const queue = dueCards.slice(0, SRS_CONSTANTS.TRIAGE_BATCH_SIZE);
    return {
      total_due_count: totalDueCount,
      queue,
      is_triage_active: true,
      triage_remaining_backlog: Math.max(0, totalDueCount - SRS_CONSTANTS.TRIAGE_BATCH_SIZE),
      daily_cap: SRS_CONSTANTS.TRIAGE_BATCH_SIZE,
    };
  }

  // 4. Normal Daily Cap (MAX_DAILY_REVIEWS = 20)
  const queue = dueCards.slice(0, SRS_CONSTANTS.MAX_DAILY_REVIEWS);
  return {
    total_due_count: totalDueCount,
    queue,
    is_triage_active: false,
    triage_remaining_backlog: 0,
    daily_cap: SRS_CONSTANTS.MAX_DAILY_REVIEWS,
  };
}

/**
 * src/engines/srs/srsEngine.test.ts
 * Vitest automated unit tests for SuperMemo SM-2 SRS Engine.
 */

import { describe, it, expect } from 'vitest';
import {
  SRS_CONSTANTS,
  calculateNewEaseFactor,
  calculateNextReview,
  createNewCard,
  buildReviewQueue,
  formatDateString,
  addDays,
  calculateDaysBetween,
} from './srsEngine';
import { SRSCardRecord } from '../../types/srs';

describe('SRS Engine (SuperMemo SM-2 & Anti-Overload)', () => {
  describe('Ease Factor Calculations', () => {
    it('keeps EF unchanged on Good (grade = 2)', () => {
      const newEF = calculateNewEaseFactor(2.5, 2);
      expect(newEF).toBe(2.5);
    });

    it('increases EF by 0.1 on Easy (grade = 3) when below maximum', () => {
      const newEF = calculateNewEaseFactor(2.3, 3);
      expect(newEF).toBe(2.4);
    });

    it('clamps EF to MAX_EASE_FACTOR (2.5) on Easy', () => {
      const newEF = calculateNewEaseFactor(2.5, 3);
      expect(newEF).toBe(2.5);
    });

    it('decreases EF by 0.14 on Hard (grade = 1)', () => {
      const newEF = calculateNewEaseFactor(2.5, 1);
      expect(newEF).toBe(2.36);
    });

    it('decreases EF by 0.32 on Again (grade = 0)', () => {
      const newEF = calculateNewEaseFactor(2.5, 0);
      expect(newEF).toBe(2.18);
    });

    it('clamps EF to MIN_EASE_FACTOR (1.3) when repeated failures occur', () => {
      let ef = 1.4;
      ef = calculateNewEaseFactor(ef, 0); // 1.4 - 0.32 = 1.08 -> clamped to 1.3
      expect(ef).toBe(1.3);

      const efMin = calculateNewEaseFactor(1.3, 0);
      expect(efMin).toBe(1.3);
    });
  });

  describe('Interval Progression & SM-2 Scheduling', () => {
    const baseCard: SRSCardRecord = {
      card_id: 'u01_w01_nihao',
      hanzi: '你好',
      pinyin: 'nǐ hǎo',
      meaning_th: 'สวัสดี',
      meaning_en: 'Hello',
      ease_factor: 2.5,
      interval_days: 0,
      repetitions: 0,
      due_date: '2026-09-19',
      last_reviewed: '',
      review_history: [],
    };

    it('schedules 1 day for initial review (Rep 0 -> Rep 1)', () => {
      const refDate = new Date('2026-09-19T08:00:00Z');
      const result = calculateNextReview(baseCard, 2, refDate);

      expect(result.next_interval_days).toBe(1);
      expect(result.repetitions).toBe(1);
      expect(result.next_due_date).toBe('2026-09-20');
      expect(result.card.review_history).toHaveLength(1);
      expect(result.card.review_history[0].grade).toBe(2);
    });

    it('schedules 3 days for Rep 1 -> Rep 2 on Good', () => {
      const cardRep1: SRSCardRecord = {
        ...baseCard,
        repetitions: 1,
        interval_days: 1,
      };

      const refDate = new Date('2026-09-20T08:00:00Z');
      const result = calculateNextReview(cardRep1, 2, refDate);

      expect(result.next_interval_days).toBe(3);
      expect(result.repetitions).toBe(2);
      expect(result.next_due_date).toBe('2026-09-23');
    });

    it('schedules 6 days for Rep 1 -> Rep 2 on Easy', () => {
      const cardRep1: SRSCardRecord = {
        ...baseCard,
        repetitions: 1,
        interval_days: 1,
      };

      const refDate = new Date('2026-09-20T08:00:00Z');
      const result = calculateNextReview(cardRep1, 3, refDate);

      expect(result.next_interval_days).toBe(6);
      expect(result.repetitions).toBe(2);
      expect(result.next_due_date).toBe('2026-09-26');
    });

    it('schedules Math.ceil(interval * EF) for Rep >= 2', () => {
      const cardRep2: SRSCardRecord = {
        ...baseCard,
        repetitions: 2,
        interval_days: 6,
        ease_factor: 2.5,
      };

      const refDate = new Date('2026-09-26T08:00:00Z');
      const result = calculateNextReview(cardRep2, 2, refDate);

      // 6 * 2.5 = 15 days
      expect(result.next_interval_days).toBe(15);
      expect(result.repetitions).toBe(3);
      expect(result.next_due_date).toBe('2026-10-11');
    });

    it('resets repetitions to 0 and interval to 1 on Again (grade = 0)', () => {
      const matureCard: SRSCardRecord = {
        ...baseCard,
        repetitions: 5,
        interval_days: 45,
        ease_factor: 2.4,
      };

      const refDate = new Date('2026-09-19T08:00:00Z');
      const result = calculateNextReview(matureCard, 0, refDate);

      expect(result.repetitions).toBe(0);
      expect(result.next_interval_days).toBe(1);
      expect(result.next_due_date).toBe('2026-09-20');
      // EF is updated to 2.4 - 0.32 = 2.08
      expect(result.next_ease_factor).toBe(2.08);
    });
  });

  describe('Daily Review Cap & Backlog Triage', () => {
    function generateMockCards(count: number, dueDate: string = '2026-09-19'): SRSCardRecord[] {
      return Array.from({ length: count }, (_, i) => ({
        card_id: `word_${i + 1}`,
        hanzi: `字${i + 1}`,
        pinyin: `zì${i + 1}`,
        meaning_th: `ความหมาย ${i + 1}`,
        meaning_en: `Meaning ${i + 1}`,
        ease_factor: 2.5 - (i % 5) * 0.1,
        interval_days: 1,
        repetitions: 1,
        due_date: dueDate,
        last_reviewed: '2026-09-18T00:00:00Z',
        review_history: [],
      }));
    }

    it('returns empty queue when no cards are due', () => {
      const futureCards = generateMockCards(5, '2026-09-25');
      const result = buildReviewQueue(futureCards, '2026-09-19');

      expect(result.total_due_count).toBe(0);
      expect(result.queue).toHaveLength(0);
      expect(result.is_triage_active).toBe(false);
    });

    it('returns all due cards when count is within Daily Cap (<= 20)', () => {
      const cards = generateMockCards(12, '2026-09-19');
      const result = buildReviewQueue(cards, '2026-09-19');

      expect(result.total_due_count).toBe(12);
      expect(result.queue).toHaveLength(12);
      expect(result.is_triage_active).toBe(false);
    });

    it('caps queue at MAX_DAILY_REVIEWS (20) when due count is 21-30', () => {
      const cards = generateMockCards(25, '2026-09-19');
      const result = buildReviewQueue(cards, '2026-09-19');

      expect(result.total_due_count).toBe(25);
      expect(result.queue).toHaveLength(20);
      expect(result.is_triage_active).toBe(false);
    });

    it('activates Backlog Triage when due count exceeds 30 cards', () => {
      const cards = generateMockCards(50, '2026-09-19');
      const result = buildReviewQueue(cards, '2026-09-19');

      expect(result.total_due_count).toBe(50);
      expect(result.is_triage_active).toBe(true);
      expect(result.queue).toHaveLength(SRS_CONSTANTS.TRIAGE_BATCH_SIZE); // 10
      expect(result.triage_remaining_backlog).toBe(40);
    });

    it('activates Backlog Triage when learner was absent for >= 7 days', () => {
      const cards = generateMockCards(15, '2026-09-12');
      const result = buildReviewQueue(cards, '2026-09-19', 8); // 8 days absent

      expect(result.total_due_count).toBe(15);
      expect(result.is_triage_active).toBe(true);
      expect(result.queue).toHaveLength(10);
      expect(result.triage_remaining_backlog).toBe(5);
    });

    it('prioritizes older overdue dates and lower ease factors in review queue', () => {
      const cards: SRSCardRecord[] = [
        { ...createNewCard({ card_id: 'c1', hanzi: '一', pinyin: 'yī', meaning_th: '1', meaning_en: '1' }, '2026-09-19'), ease_factor: 2.5 },
        { ...createNewCard({ card_id: 'c2', hanzi: '二', pinyin: 'èr', meaning_th: '2', meaning_en: '2' }, '2026-09-17'), ease_factor: 2.5 }, // older
        { ...createNewCard({ card_id: 'c3', hanzi: '三', pinyin: 'sān', meaning_th: '3', meaning_en: '3' }, '2026-09-17'), ease_factor: 1.8 }, // older & harder
      ];

      const result = buildReviewQueue(cards, '2026-09-19');
      expect(result.queue[0].card_id).toBe('c3'); // Oldest & lowest EF first
      expect(result.queue[1].card_id).toBe('c2');
      expect(result.queue[2].card_id).toBe('c1');
    });
  });

  describe('Date Helpers', () => {
    it('formats date to YYYY-MM-DD correctly', () => {
      const date = new Date(2026, 8, 19); // September is month 8 in 0-indexed
      expect(formatDateString(date)).toBe('2026-09-19');
    });

    it('adds days correctly across month boundary', () => {
      const date = new Date('2026-09-28T00:00:00Z');
      const nextDate = addDays(date, 5);
      expect(formatDateString(nextDate)).toBe('2026-10-03');
    });

    it('calculates days between two dates', () => {
      expect(calculateDaysBetween('2026-09-10', '2026-09-19')).toBe(9);
      expect(calculateDaysBetween('2026-09-19', '2026-09-19')).toBe(0);
    });
  });
});

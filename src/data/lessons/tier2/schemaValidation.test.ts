/**
 * src/data/lessons/tier2/schemaValidation.test.ts
 * Comprehensive Pedagogical & Schema Verification Test Suite for Tier 2 Batch A (Units 11–15).
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any', 100% Automated Quality Gates.
 */

import { describe, it, expect } from 'vitest';
import unit11Data from './unit11_scan_pay.json';
import unit12Data from './unit12_delivery_courier.json';
import unit13Data from './unit13_hsr_travel.json';
import unit14Data from './unit14_renting_utilities.json';
import unit15Data from './unit15_advanced_dining.json';
import { UnitLessonData, Lesson, VocabularyItem, QuizQuestion } from '../../../types/lesson';

const allTier2BatchAUnits = [
  unit11Data,
  unit12Data,
  unit13Data,
  unit14Data,
  unit15Data,
] as unknown as UnitLessonData[];

const [unit11, unit12, unit13, unit14, unit15] = allTier2BatchAUnits;

describe('Tier 2 Batch A (Units 11-15) Curriculum Data & Pedagogical Schema Verification', () => {
  // ==========================================================================
  // Universal Invariants across all Units 11–15
  // ==========================================================================
  describe.each(allTier2BatchAUnits)('Universal Schema & Quality Invariants: $unit_id ($title.th)', (unit) => {
    describe('Unit Metadata & Structure', () => {
      it('has valid top-level unit metadata matching Tier 2 Manifest', () => {
        expect(unit.unit_id).toMatch(/^tier2_u(1[1-5])$/);
        expect(unit.tier).toBe(2);
        expect(unit.unit_number).toBeGreaterThanOrEqual(11);
        expect(unit.unit_number).toBeLessThanOrEqual(15);
        expect(unit.title.zh).toBeTruthy();
        expect(unit.title.th).toBeTruthy();
        expect(unit.title.en).toBeTruthy();
        expect(typeof unit.description).toBe('string');
        expect(unit.description.length).toBeGreaterThan(10);
      });

      it('contains all 4 complete bite-sized lessons in sequential order', () => {
        expect(Array.isArray(unit.lessons)).toBe(true);
        expect(unit.lessons.length).toBe(4);

        unit.lessons.forEach((lesson: Lesson, idx: number) => {
          expect(lesson.lesson_number).toBe(idx + 1);
          expect(lesson.lesson_id).toBe(`t2_u${unit.unit_number}_l0${idx + 1}`);
          expect(lesson.title.zh).toBeTruthy();
          expect(lesson.title.th).toBeTruthy();
          expect(lesson.title.en).toBeTruthy();
          expect(lesson.can_do.th).toBeTruthy();
          expect(lesson.can_do.en).toBeTruthy();
          expect(lesson.baby_step_goal).toBeTruthy();
        });
      });
    });

    describe('Vocabulary Quality & Pedagogical Standards', () => {
      const allVocab: VocabularyItem[] = unit.lessons.flatMap((l) => l.vocabulary);

      it('contains at least 18 high-frequency vocabulary entries per unit', () => {
        expect(allVocab.length).toBeGreaterThanOrEqual(18);
      });

      it('adheres to Simplified Chinese characters without traditional variants', () => {
        const traditionalDisallowed = [
          '國', '謝', '歡', '見', '們', '門', '個', '樣', '東', '點',
          '這', '買', '賣', '錢', '車', '飯', '時', '後', '條', '幾', '兩', '塊', '貴',
          '壞', '預', '訂', '護', '碼', '員', '線'
        ];
        allVocab.forEach((vocab) => {
          expect(vocab.hanzi).toBeTruthy();
          for (const char of traditionalDisallowed) {
            expect(vocab.hanzi).not.toContain(char);
          }
        });
      });

      it('includes complete mnemonics, gestures, and radical explanations for each word', () => {
        allVocab.forEach((vocab) => {
          expect(vocab.id).toMatch(/^hsk2_1[1-5]\d{2}$/);
          expect(vocab.pinyin).toBeTruthy();
          expect(vocab.pinyin_tone).toBeTruthy();
          expect(vocab.meaning_th).toBeTruthy();
          expect(vocab.meaning_en).toBeTruthy();
          expect(vocab.radical).toBeTruthy();
          expect(vocab.radical_name_th).toBeTruthy();
          expect(vocab.stroke_count).toBeGreaterThan(0);
          expect(vocab.mnemonic).toBeTruthy();
          expect(vocab.kid_mnemonic).toBeTruthy();
          expect(vocab.body_gesture).toBeTruthy();
        });
      });
    });

    describe('Grammar Bites & Lego Sentence Frames', () => {
      it('provides trilingual sentence frames for every lesson', () => {
        unit.lessons.forEach((lesson) => {
          expect(lesson.grammar_bite).toBeDefined();
          expect(lesson.grammar_bite.title).toBeTruthy();
          expect(lesson.grammar_bite.explanation_th).toBeTruthy();
          expect(lesson.grammar_bite.patterns.length).toBeGreaterThanOrEqual(2);

          lesson.grammar_bite.patterns.forEach((pattern) => {
            expect(pattern.formula).toBeTruthy();
            expect(pattern.zh).toBeTruthy();
            expect(pattern.pinyin).toBeTruthy();
            expect(pattern.th).toBeTruthy();
            expect(pattern.en).toBeTruthy();
          });
        });
      });
    });

    describe('Interactive Dialogue Conversations', () => {
      it('contains realistic multi-turn dialogues with alternating speakers', () => {
        unit.lessons.forEach((lesson) => {
          expect(lesson.dialogue.length).toBeGreaterThanOrEqual(4);
          lesson.dialogue.forEach((line) => {
            expect(['A', 'B', 'C']).toContain(line.speaker);
            expect(line.speaker_name).toBeTruthy();
            expect(line.zh).toBeTruthy();
            expect(line.pinyin).toBeTruthy();
            expect(line.th).toBeTruthy();
            expect(line.en).toBeTruthy();
          });
        });
      });
    });

    describe('Quizzes & Mini-Games Verification', () => {
      it('provides at least 4 quizzes in every lesson covering all core modes', () => {
        unit.lessons.forEach((lesson) => {
          expect(lesson.quizzes.length).toBeGreaterThanOrEqual(4);

          const types = lesson.quizzes.map((q) => q.type);
          expect(types).toContain('sentence_scramble');
          expect(types).toContain('flash_recall');
        });
      });

      it('ensures all multiple-choice and scramble quizzes have valid structures and bounds', () => {
        unit.lessons.forEach((lesson) => {
          lesson.quizzes.forEach((quiz: QuizQuestion) => {
            expect(quiz.question_th).toBeTruthy();
            expect(quiz.explanation_th).toBeTruthy();
            expect(quiz.encouragement).toBeTruthy();

            if (quiz.type === 'sentence_scramble') {
              expect(Array.isArray(quiz.tokens)).toBe(true);
              expect(Array.isArray(quiz.correct_sequence)).toBe(true);
              expect(quiz.tokens.length).toBe(quiz.correct_sequence.length);
              expect([...quiz.tokens].sort()).toEqual([...quiz.correct_sequence].sort());
              expect(quiz.pinyin).toBeTruthy();
              expect(quiz.meaning_th).toBeTruthy();
            } else {
              expect(Array.isArray(quiz.options)).toBe(true);
              expect(quiz.options.length).toBeGreaterThanOrEqual(3);
              expect(quiz.correct_index).toBeGreaterThanOrEqual(0);
              expect(quiz.correct_index).toBeLessThan(quiz.options.length);
            }
          });
        });
      });
    });

    describe('Boss Challenge & Milestone Cheer Trophy', () => {
      it('features contextual Boss Challenges and rewarding XP for every lesson', () => {
        unit.lessons.forEach((lesson) => {
          expect(lesson.boss_challenge).toBeDefined();
          expect(lesson.boss_challenge.scenario_th).toBeTruthy();
          expect(lesson.boss_challenge.options.length).toBeGreaterThanOrEqual(3);
          expect(lesson.boss_challenge.correct_index).toBeGreaterThanOrEqual(0);
          expect(lesson.boss_challenge.correct_index).toBeLessThan(lesson.boss_challenge.options.length);

          expect(lesson.cheer_trophy).toBeDefined();
          expect(lesson.cheer_trophy.badge_id).toBeTruthy();
          expect(lesson.cheer_trophy.badge_name).toBeTruthy();
          expect(lesson.cheer_trophy.xp_reward).toBeGreaterThan(0);
        });
      });

      it('awards unit master trophy for completing Lesson 4', () => {
        const bossLesson = unit.lessons.find((l) => l.lesson_number === 4);
        expect(bossLesson?.cheer_trophy.xp_reward).toBe(200);
        expect(bossLesson?.cheer_trophy.badge_id).toBe(`badge_t2_u${unit.unit_number}_master`);
      });
    });
  });

  // ==========================================================================
  // Unit-Specific Pedagogical Checks
  // ==========================================================================
  describe('Specific Pedagogical Invariants per Unit', () => {
    it('Unit 11 (Scan & Pay): covers WeChat, Alipay, 把 construction, and 扫我还是我扫你', () => {
      const vocab11 = unit11.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab11).toContain('微信');
      expect(vocab11).toContain('支付宝');
      expect(vocab11).toContain('二维码');
      expect(vocab11).toContain('收款码');
      expect(vocab11).toContain('付款码');
      expect(vocab11).toContain('现金');

      const l2 = unit11.lessons.find((l: Lesson) => l.lesson_number === 2);
      const l2Grammar = l2?.grammar_bite.patterns.map((p) => p.zh) || [];
      expect(l2Grammar.some((p) => p.includes('扫我还是我扫你'))).toBe(true);
    });

    it('Unit 12 (Delivery & Courier): covers takeaway, directional complements, and locker pickup', () => {
      const vocab12 = unit12.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab12).toContain('外卖');
      expect(vocab12).toContain('骑手');
      expect(vocab12).toContain('菜鸟驿站');
      expect(vocab12).toContain('快递柜');
      expect(vocab12).toContain('取件码');
      expect(vocab12).toContain('密码');

      const l2 = unit12.lessons.find((l: Lesson) => l.lesson_number === 2);
      expect(l2?.grammar_bite.title).toContain('送过来');
    });

    it('Unit 13 (High-Speed Rail): covers HSR seats, 12306, 不但...而且..., and ticket changes', () => {
      const vocab13 = unit13.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab13).toContain('高铁');
      expect(vocab13).toContain('动车');
      expect(vocab13).toContain('一等座');
      expect(vocab13).toContain('二等座');
      expect(vocab13).toContain('改签');
      expect(vocab13).toContain('退票');

      const l1 = unit13.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('不但...而且...');
    });

    it('Unit 14 (Renting & Utilities): covers 押一付三, utilities, and 把/被 appliance repair', () => {
      const vocab14 = unit14.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab14).toContain('房东');
      expect(vocab14).toContain('中介');
      expect(vocab14).toContain('房租');
      expect(vocab14).toContain('水电费');
      expect(vocab14).toContain('空调');
      expect(vocab14).toContain('漏水');

      const l1 = unit14.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('押一付三');
    });

    it('Unit 15 (Advanced Dining): covers regional cuisines, 越...越..., dietary restrictions, and fapiao', () => {
      const vocab15 = unit15.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab15).toContain('川菜');
      expect(vocab15).toContain('粤菜');
      expect(vocab15).toContain('招牌菜');
      expect(vocab15).toContain('微辣');
      expect(vocab15).toContain('过敏');
      expect(vocab15).toContain('发票');
      expect(vocab15).toContain('干杯');

      const l1 = unit15.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('越...越...');
    });
  });

  // ==========================================================================
  // CurriculumEngine Validation on Tier 2 Units
  // ==========================================================================
  describe('CurriculumEngine Automated Validator Suite on Tier 2', () => {
    it('passes full curriculum validation on Tier 2 units with strict mode', async () => {
      const { CurriculumEngine } = await import('../../../../scripts/lib/curriculumEngine');
      const engine = new CurriculumEngine();
      const summary = await engine.validate({ tier: '2', strict: true });

      expect(summary.totalUnitsChecked).toBe(5);
      expect(summary.totalLessonsChecked).toBe(20);
      expect(summary.totalVocabChecked).toBeGreaterThanOrEqual(90);
      expect(summary.errors.length).toBe(0);
      expect(summary.warnings.length).toBe(0);
      expect(summary.success).toBe(true);
    });
  });
});

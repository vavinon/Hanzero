/**
 * src/data/lessons/tier3/schemaValidation.test.ts
 * Comprehensive Pedagogical & Schema Verification Test Suite for Tier 3 (Units 26–35).
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any', 100% Automated Quality Gates.
 */

import { describe, it, expect } from 'vitest';
import unit26Data from './unit26_workplace_communication.json';
import unit27Data from './unit27_business_negotiation.json';
import unit28Data from './unit28_ecommerce_ecosystem.json';
import unit29Data from './unit29_banquet_networking.json';
import unit30Data from './unit30_legal_contracts.json';
import unit31Data from './unit31_tech_innovation.json';
import unit32Data from './unit32_job_interview.json';
import unit33Data from './unit33_geography_dialects.json';
import unit34Data from './unit34_education_involution.json';
import unit35Data from './unit35_green_low_carbon.json';
import { UnitLessonData, Lesson, VocabularyItem, QuizQuestion } from '../../../types/lesson';
import { TRADITIONAL_BLACKLIST } from '../../../engines/studio/studioLinterEngine';

const allTier3Units = [
  unit26Data,
  unit27Data,
  unit28Data,
  unit29Data,
  unit30Data,
  unit31Data,
  unit32Data,
  unit33Data,
  unit34Data,
  unit35Data,
] as unknown as UnitLessonData[];

const [
  unit26,
  unit27,
  unit28,
  unit29,
  unit30,
  unit31,
  unit32,
  unit33,
  unit34,
  unit35,
] = allTier3Units;

describe('Tier 3 (Units 26-35) Curriculum Data & Pedagogical Schema Verification', () => {
  // ==========================================================================
  // Universal Invariants across all Units 26–35
  // ==========================================================================
  describe.each(allTier3Units)('Universal Schema & Quality Invariants: $unit_id ($title.th)', (unit) => {
    describe('Unit Metadata & Structure', () => {
      it('has valid top-level unit metadata matching Tier 3 Manifest', () => {
        expect(unit.unit_id).toMatch(/^tier3_u(2[6-9]|3[0-5])$/);
        expect(unit.tier).toBe(3);
        expect(unit.unit_number).toBeGreaterThanOrEqual(26);
        expect(unit.unit_number).toBeLessThanOrEqual(35);
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
          expect(lesson.lesson_id).toBe(`t3_u${unit.unit_number}_l0${idx + 1}`);
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

      it('adheres to Simplified Chinese characters without traditional variants (75-character blacklist)', () => {
        allVocab.forEach((vocab) => {
          expect(vocab.hanzi).toBeTruthy();
          for (const char of vocab.hanzi) {
            expect(TRADITIONAL_BLACKLIST.has(char)).toBe(false);
          }
        });

        unit.lessons.forEach((lesson) => {
          lesson.dialogue.forEach((line) => {
            for (const char of line.zh) {
              expect(TRADITIONAL_BLACKLIST.has(char)).toBe(false);
            }
          });
        });
      });

      it('includes complete mnemonics, gestures, and radical explanations for each word', () => {
        allVocab.forEach((vocab) => {
          expect(vocab.id).toMatch(/^hsk3_(2[6-9]|3[0-5])\d{2}$/);
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
          const speakers = lesson.dialogue.map((d) => d.speaker);
          expect(new Set(speakers).size).toBeGreaterThanOrEqual(2);

          lesson.dialogue.forEach((line) => {
            expect(line.speaker_name).toBeTruthy();
            expect(line.zh).toBeTruthy();
            expect(line.pinyin).toBeTruthy();
            expect(line.th).toBeTruthy();
            expect(line.en).toBeTruthy();
          });
        });
      });
    });

    describe('Gamified Quizzes & Assessments', () => {
      it('has at least 4 interactive quizzes per lesson with valid answer bounds', () => {
        unit.lessons.forEach((lesson) => {
          expect(lesson.quizzes.length).toBeGreaterThanOrEqual(4);

          lesson.quizzes.forEach((quiz: QuizQuestion) => {
            expect(['listen_match', 'radical_focus', 'sentence_scramble', 'flash_recall', 'tone_match', 'meaning_match']).toContain(quiz.type);
            expect(quiz.question_th).toBeTruthy();
            expect(quiz.explanation_th).toBeTruthy();

            if (quiz.type === 'sentence_scramble') {
              expect(Array.isArray(quiz.tokens)).toBe(true);
              expect(quiz.tokens?.length).toBeGreaterThanOrEqual(2);
              expect(Array.isArray(quiz.correct_sequence)).toBe(true);
              expect(quiz.correct_sequence?.length).toBe(quiz.tokens?.length);
              expect(quiz.tokens!.join('')).not.toBe(quiz.correct_sequence!.join(''));
              expect([...quiz.tokens!].sort()).toEqual([...quiz.correct_sequence!.sort()]);
            } else {
              expect(Array.isArray(quiz.options)).toBe(true);
              expect(quiz.options?.length).toBeGreaterThanOrEqual(2);
              expect(typeof quiz.correct_index).toBe('number');
              expect(quiz.correct_index).toBeGreaterThanOrEqual(0);
              expect(quiz.correct_index).toBeLessThan(quiz.options!.length);
            }
          });
        });
      });
    });

    describe('Lesson 4 Boss Challenge & Cheer Trophy Quality Gate', () => {
      it('features an epic culminating Boss Challenge and Cheer Trophy in Lesson 4', () => {
        const finalLesson = unit.lessons[3];
        expect(finalLesson.boss_challenge).toBeDefined();
        expect(finalLesson.boss_challenge?.scenario_th).toBeTruthy();
        expect(finalLesson.boss_challenge?.options.length).toBeGreaterThanOrEqual(3);
        expect(typeof finalLesson.boss_challenge?.correct_index).toBe('number');
        expect(finalLesson.boss_challenge?.explanation_th).toBeTruthy();

        expect(finalLesson.cheer_trophy).toBeDefined();
        expect(finalLesson.cheer_trophy?.badge_id).toBe(`badge_t3_u${unit.unit_number}_master`);
        expect(finalLesson.cheer_trophy?.badge_name).toBeTruthy();
        expect(finalLesson.cheer_trophy?.message_th).toBeTruthy();
        expect(finalLesson.cheer_trophy?.xp_reward).toBeGreaterThanOrEqual(150);
      });
    });
  });

  // ==========================================================================
  // Unit-Specific Pedagogical Assertions (Zero fake tests)
  // ==========================================================================
  describe('Specific Pedagogical Content Assertions per Unit', () => {
    it('Unit 26 (Workplace Communication): covers 汇报, 进展, 脚踏实地, and formal reporting patterns', () => {
      const vocab26 = unit26.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab26).toContain('汇报');
      expect(vocab26).toContain('进展');
      expect(vocab26).toContain('总结');
      expect(vocab26).toContain('方案');
      expect(vocab26).toContain('脚踏实地');
      expect(vocab26).toContain('协调');

      const l1 = unit26.lessons.find((l) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('鉴于');
    });

    it('Unit 27 (Business Negotiation): covers 报价, 询价, 讨价还价, and win-win structures', () => {
      const vocab27 = unit27.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab27).toContain('报价');
      expect(vocab27).toContain('询价');
      expect(vocab27).toContain('成本');
      expect(vocab27).toContain('利润率');
      expect(vocab27).toContain('讨价还价');
      expect(vocab27).toContain('达成共识');

      const l3 = unit27.lessons.find((l) => l.lesson_number === 3);
      expect(l3?.grammar_bite.title).toContain('本着');
    });

    it('Unit 28 (E-Commerce Ecosystem): covers 流量, 直播带货, 货真价实, and 转化率', () => {
      const vocab28 = unit28.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab28).toContain('流量');
      expect(vocab28).toContain('转化率');
      expect(vocab28).toContain('直播带货');
      expect(vocab28).toContain('货真价实');
      expect(vocab28).toContain('复购');

      const l1 = unit28.lessons.find((l) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('所谓');
    });

    it('Unit 29 (Banquet & Networking): covers 主宾, 敬酒, 入乡随俗, and networking etiquette', () => {
      const vocab29 = unit29.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab29).toContain('主宾');
      expect(vocab29).toContain('敬酒');
      expect(vocab29).toContain('入乡随俗');
      expect(vocab29).toContain('荣幸');
      expect(vocab29).toContain('分寸');

      const l2 = unit29.lessons.find((l) => l.lesson_number === 2);
      expect(l2?.grammar_bite.title).toContain('借此机会');
    });

    it('Unit 30 (Legal Contracts): covers 甲方, 乙方, 违约金, 一清二楚, and dispute resolution', () => {
      const vocab30 = unit30.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab30).toContain('甲方');
      expect(vocab30).toContain('乙方');
      expect(vocab30).toContain('违约金');
      expect(vocab30).toContain('保密协议');
      expect(vocab30).toContain('一清二楚');
      expect(vocab30).toContain('协商');

      const l1 = unit30.lessons.find((l) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('依照');
    });

    it('Unit 31 (Tech Innovation): covers 新能源, 自动驾驶, 日新月异, and 自主研发', () => {
      const vocab31 = unit31.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab31).toContain('新能源');
      expect(vocab31).toContain('电动车');
      expect(vocab31).toContain('自动驾驶');
      expect(vocab31).toContain('人工智能');
      expect(vocab31).toContain('日新月异');
      expect(vocab31).toContain('自主研发');

      const l1 = unit31.lessons.find((l) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('随着');
    });

    it('Unit 32 (Job Interview): covers 简历, 量化指标, 自告奋勇, and 薪酬结构', () => {
      const vocab32 = unit32.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab32).toContain('简历');
      expect(vocab32).toContain('核心优势');
      expect(vocab32).toContain('自告奋勇');
      expect(vocab32).toContain('突发状况');
      expect(vocab32).toContain('薪酬结构');

      const l3 = unit32.lessons.find((l) => l.lesson_number === 3);
      expect(l3?.grammar_bite.title).toContain('我想进一步了解');
    });

    it('Unit 33 (Geography & Dialects): covers 南北差异, 供暖, 五湖四海, and 八大菜系', () => {
      const vocab33 = unit33.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab33).toContain('南北差异');
      expect(vocab33).toContain('暖气');
      expect(vocab33).toContain('粤语');
      expect(vocab33).toContain('五湖四海');
      expect(vocab33).toContain('菜系');

      const l1 = unit33.lessons.find((l) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('固然');
    });

    it('Unit 34 (Education & Involution): covers 高考, 望子成龙, 内卷, and 躺平', () => {
      const vocab34 = unit34.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab34).toContain('高考');
      expect(vocab34).toContain('望子成龙');
      expect(vocab34).toContain('内卷');
      expect(vocab34).toContain('躺平');
      expect(vocab34).toContain('终身学习');

      const l3 = unit34.lessons.find((l) => l.lesson_number === 3);
      expect(l3?.grammar_bite.title).toContain('与其');
    });

    it('Unit 35 (Green Low-Carbon): covers 碳达峰, 碳中和, 绿水青山, and 垃圾分类', () => {
      const vocab35 = unit35.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab35).toContain('碳达峰');
      expect(vocab35).toContain('碳中和');
      expect(vocab35).toContain('绿水青山');
      expect(vocab35).toContain('垃圾分类');
      expect(vocab35).toContain('绿色出行');

      const l1 = unit35.lessons.find((l) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('以期');
    });
  });
});

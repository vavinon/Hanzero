/**
 * src/data/lessons/tier4/schemaValidation.test.ts
 * Comprehensive Pedagogical & Schema Verification Test Suite for Tier 4 Legend (Units 46–49).
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any', 100% Automated Quality Gates.
 */

import { describe, it, expect } from 'vitest';
import unit46Data from './unit46_classical_particles.json';
import unit47Data from './unit47_sun_tzu_business.json';
import unit48Data from './unit48_ancient_philosophy.json';
import unit49Data from './unit49_diplomatic_rhetoric.json';
import unit50Data from './unit50_macroeconomics.json';
import unit51Data from './unit51_intellectual_property.json';
import unit52Data from './unit52_tang_song_poetry.json';
import unit53Data from './unit53_modern_literature.json';
import { TRADITIONAL_BLACKLIST } from '../../../engines/studio/studioLinterEngine';

interface LessonVocab {
  id: string;
  hanzi: string;
  pinyin: string;
  pinyin_tone: string;
  meaning_th: string;
  meaning_en: string;
  radical: string;
  radical_name_th: string;
  stroke_count: number;
  mnemonic: string;
  kid_mnemonic: string;
  body_gesture: string;
}

interface LessonPattern {
  formula: string;
  zh: string;
  pinyin: string;
  th: string;
  en: string;
}

interface LessonDialogueLine {
  speaker: string;
  zh: string;
  pinyin: string;
  th: string;
  en: string;
  audio_trigger?: string;
}

interface QuizItem {
  type: string;
  question_th: string;
  options?: string[];
  correct_index?: number;
  tokens?: string[];
  correct_sequence?: string[];
  explanation_th: string;
  encouragement: string;
}

interface BossChallenge {
  question?: string;
  options: string[];
  correct_index: number;
  explanation_th: string;
}

interface CheerTrophy {
  badge_name: string;
  message_th: string;
  xp_reward: number;
}

interface LessonItem {
  lesson_id: string;
  lesson_number: number;
  title: { zh: string; th: string; en: string };
  can_do: { th: string; en: string };
  baby_step_goal: string;
  vocabulary: LessonVocab[];
  grammar_bite: {
    title: string;
    explanation_th: string;
    patterns: LessonPattern[];
  };
  dialogue: LessonDialogueLine[];
  quizzes: QuizItem[];
  boss_challenge: BossChallenge;
  cheer_trophy: CheerTrophy;
}

interface UnitData {
  unit_id: string;
  tier: number;
  unit_number: number;
  title: { zh: string; th: string; en: string };
  description: string;
  lessons: LessonItem[];
}

const allTier4Units = [
  unit46Data,
  unit47Data,
  unit48Data,
  unit49Data,
  unit50Data,
  unit51Data,
  unit52Data,
  unit53Data,
] as unknown as UnitData[];

const [unit46, unit47, unit48, unit49, unit50, unit51, unit52, unit53] = allTier4Units;

describe('Tier 4 Legend (Units 46-53) Curriculum Data & Pedagogical Schema Verification', () => {
  // ==========================================================================
  // Universal Invariants across all Units 46–53
  // ==========================================================================
  describe.each(allTier4Units)('Universal Schema & Quality Invariants: $unit_id ($title.th)', (unit) => {
    describe('Unit Metadata & Structure', () => {
      it('has valid top-level unit metadata matching Tier 4 Manifest', () => {
        expect(unit.unit_id).toMatch(/^tier4_u(4[6-9]|5[0-7])$/);
        expect(unit.tier).toBe(4);
        expect(unit.unit_number).toBeGreaterThanOrEqual(46);
        expect(unit.unit_number).toBeLessThanOrEqual(57);
        expect(unit.title.zh).toBeTruthy();
        expect(unit.title.th).toBeTruthy();
        expect(unit.title.en).toBeTruthy();
        expect(typeof unit.description).toBe('string');
        expect(unit.description.length).toBeGreaterThan(10);
      });

      it('contains all 4 complete bite-sized lessons in sequential order', () => {
        expect(Array.isArray(unit.lessons)).toBe(true);
        expect(unit.lessons.length).toBe(4);

        unit.lessons.forEach((lesson, idx) => {
          expect(lesson.lesson_number).toBe(idx + 1);
          expect(lesson.lesson_id).toBe(`t4_u${unit.unit_number}_l0${idx + 1}`);
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
      const allVocab = unit.lessons.flatMap((l) => l.vocabulary);

      it('contains at least 20 high-level vocabulary entries per unit', () => {
        expect(allVocab.length).toBeGreaterThanOrEqual(20);
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
          expect(vocab.id).toMatch(/^hsk4_(4[6-9]|5[0-7])\d{2,3}$/);
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
            expect(line.speaker).toBeTruthy();
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

          lesson.quizzes.forEach((quiz) => {
            expect(['multiple_choice', 'sentence_scramble', 'radical_focus']).toContain(quiz.type);
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

    describe('Boss Challenge & Cheer Trophy Quality Gate', () => {
      it('features an epic Boss Challenge and Cheer Trophy in every lesson', () => {
        unit.lessons.forEach((lesson) => {
          expect(lesson.boss_challenge).toBeDefined();
          expect(lesson.boss_challenge.options.length).toBeGreaterThanOrEqual(3);
          expect(typeof lesson.boss_challenge.correct_index).toBe('number');
          expect(lesson.boss_challenge.correct_index).toBeGreaterThanOrEqual(0);
          expect(lesson.boss_challenge.correct_index).toBeLessThan(lesson.boss_challenge.options.length);
          expect(lesson.boss_challenge.explanation_th).toBeTruthy();

          expect(lesson.cheer_trophy).toBeDefined();
          expect(lesson.cheer_trophy.badge_name).toBeTruthy();
          expect(lesson.cheer_trophy.message_th).toBeTruthy();
          expect(lesson.cheer_trophy.xp_reward).toBeGreaterThanOrEqual(100);
        });
      });
    });
  });

  // ==========================================================================
  // Unit-Specific Pedagogical Assertions (Zero fake tests)
  // ==========================================================================
  describe('Specific Pedagogical Content Assertions per Unit', () => {
    it('Unit 46 (Classical Particles): covers 之, 乎, 者, 也, 以, 于, 而, 其 and 温故知新', () => {
      const vocab46 = unit46.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab46).toContain('之');
      expect(vocab46).toContain('乎');
      expect(vocab46).toContain('之所以');
      expect(vocab46).toContain('者');
      expect(vocab46).toContain('也');
      expect(vocab46).toContain('以');
      expect(vocab46).toContain('于');
      expect(vocab46).toContain('鉴于');
      expect(vocab46).toContain('而');
      expect(vocab46).toContain('其');
      expect(vocab46).toContain('温故知新');
      expect(vocab46).toContain('实事求是');
    });

    it('Unit 47 (Sun Tzu & Business Strategy): covers 知己知彼, 百战不殆, 兵贵神速, 运筹帷幄', () => {
      const vocab47 = unit47.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab47).toContain('谋略');
      expect(vocab47).toContain('知己知彼');
      expect(vocab47).toContain('百战不殆');
      expect(vocab47).toContain('兵贵神速');
      expect(vocab47).toContain('出其不意');
      expect(vocab47).toContain('运筹帷幄');
      expect(vocab47).toContain('不战而胜');
    });

    it('Unit 48 (Ancient Philosophy): covers 和而不同, 上善若水, 仁爱, 中庸, 赏罚分明', () => {
      const vocab48 = unit48.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab48).toContain('仁爱');
      expect(vocab48).toContain('中庸');
      expect(vocab48).toContain('修身');
      expect(vocab48).toContain('和而不同');
      expect(vocab48).toContain('无为而治');
      expect(vocab48).toContain('上善若水');
      expect(vocab48).toContain('赏罚分明');
      expect(vocab48).toContain('博大精深');
    });

    it('Unit 49 (Diplomatic Rhetoric): covers 和平共处, 睦邻, 战略伙伴, 多边, 求同存异, 共同体', () => {
      const vocab49 = unit49.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab49).toContain('外交');
      expect(vocab49).toContain('和平共处');
      expect(vocab49).toContain('睦邻');
      expect(vocab49).toContain('主权');
      expect(vocab49).toContain('战略伙伴');
      expect(vocab49).toContain('多边');
      expect(vocab49).toContain('互利');
      expect(vocab49).toContain('共识');
      expect(vocab49).toContain('严正');
      expect(vocab49).toContain('交涉');
      expect(vocab49).toContain('底线');
      expect(vocab49).toContain('求同存异');
      expect(vocab49).toContain('共同体');
    });

    it('Unit 50 (Macroeconomics): covers 宏观, 调控, 通胀, 稳中求进, 货币, 流动性, 升级, 白皮书', () => {
      const vocab50 = unit50.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab50).toContain('宏观');
      expect(vocab50).toContain('调控');
      expect(vocab50).toContain('通胀');
      expect(vocab50).toContain('稳中求进');
      expect(vocab50).toContain('货币');
      expect(vocab50).toContain('财政');
      expect(vocab50).toContain('流动性');
      expect(vocab50).toContain('逆周期');
      expect(vocab50).toContain('升级');
      expect(vocab50).toContain('供给侧');
      expect(vocab50).toContain('实体经济');
      expect(vocab50).toContain('白皮书');
      expect(vocab50).toContain('稳中向好');
    });

    it('Unit 51 (Intellectual Property & Litigation): covers 知识产权, 专利, 商标, 侵权, 诉讼, 管辖权, 仲裁, 合规', () => {
      const vocab51 = unit51.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab51).toContain('知识产权');
      expect(vocab51).toContain('专利');
      expect(vocab51).toContain('商标');
      expect(vocab51).toContain('侵权');
      expect(vocab51).toContain('确权');
      expect(vocab51).toContain('诉讼');
      expect(vocab51).toContain('管辖权');
      expect(vocab51).toContain('质证');
      expect(vocab51).toContain('仲裁');
      expect(vocab51).toContain('裁决');
      expect(vocab51).toContain('和解');
      expect(vocab51).toContain('合规');
      expect(vocab51).toContain('防患未然');
    });

    it('Unit 52 (Tang & Song Poetry): covers 诗仙, 豪迈, 乘风破浪, 诗圣, 沉郁, 豁达, 千里共婵娟, 登高', () => {
      const vocab52 = unit52.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab52).toContain('诗仙');
      expect(vocab52).toContain('豪迈');
      expect(vocab52).toContain('乘风破浪');
      expect(vocab52).toContain('诗圣');
      expect(vocab52).toContain('沉郁');
      expect(vocab52).toContain('会当凌绝顶');
      expect(vocab52).toContain('润物细无声');
      expect(vocab52).toContain('忧国忧民');
      expect(vocab52).toContain('豁达');
      expect(vocab52).toContain('婵娟');
      expect(vocab52).toContain('千里共婵娟');
      expect(vocab52).toContain('登高');
      expect(vocab52).toContain('不畏浮云');
    });

    it('Unit 53 (Modern Chinese Literature): covers 觉醒, 呐喊, 批判, 针砭时弊, 骨气, 京味, 巨澜, 历久弥新', () => {
      const vocab53 = unit53.lessons.flatMap((l) => l.vocabulary.map((v) => v.hanzi));
      expect(vocab53).toContain('觉醒');
      expect(vocab53).toContain('呐喊');
      expect(vocab53).toContain('批判');
      expect(vocab53).toContain('针砭时弊');
      expect(vocab53).toContain('骨气');
      expect(vocab53).toContain('京味');
      expect(vocab53).toContain('市井');
      expect(vocab53).toContain('幽默');
      expect(vocab53).toContain('巨澜');
      expect(vocab53).toContain('激流');
      expect(vocab53).toContain('时代缩影');
      expect(vocab53).toContain('脊梁');
      expect(vocab53).toContain('历久弥新');
    });
  });
});

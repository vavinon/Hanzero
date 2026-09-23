/**
 * src/data/lessons/tier2/schemaValidation.test.ts
 * Comprehensive Pedagogical & Schema Verification Test Suite for Tier 2 (Units 11–20).
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any', 100% Automated Quality Gates.
 */

import { describe, it, expect } from 'vitest';
import unit11Data from './unit11_scan_pay.json';
import unit12Data from './unit12_delivery_courier.json';
import unit13Data from './unit13_hsr_travel.json';
import unit14Data from './unit14_renting_utilities.json';
import unit15Data from './unit15_advanced_dining.json';
import unit16Data from './unit16_shopping_returns.json';
import unit17Data from './unit17_advanced_clinic.json';
import unit18Data from './unit18_bank_telecom.json';
import unit19Data from './unit19_festivals_visits.json';
import unit20Data from './unit20_emergencies.json';
import unit21Data from './unit21_entertainment.json';
import unit22Data from './unit22_fitness.json';
import unit23Data from './unit23_workplace.json';
import unit24Data from './unit24_opinions.json';
import unit25Data from './unit25_grand_boss_odyssey.json';
import { UnitLessonData, Lesson, VocabularyItem, QuizQuestion } from '../../../types/lesson';
import { TRADITIONAL_BLACKLIST } from '../../../engines/studio/studioLinterEngine';

const allTier2Units = [
  unit11Data,
  unit12Data,
  unit13Data,
  unit14Data,
  unit15Data,
  unit16Data,
  unit17Data,
  unit18Data,
  unit19Data,
  unit20Data,
  unit21Data,
  unit22Data,
  unit23Data,
  unit24Data,
  unit25Data,
] as unknown as UnitLessonData[];

const [
  unit11,
  unit12,
  unit13,
  unit14,
  unit15,
  unit16,
  unit17,
  unit18,
  unit19,
  unit20,
  unit21,
  unit22,
  unit23,
  unit24,
  unit25,
] = allTier2Units;

describe('Tier 2 (Units 11-25) Curriculum Data & Pedagogical Schema Verification', () => {
  // ==========================================================================
  // Universal Invariants across all Units 11–25
  // ==========================================================================
  describe.each(allTier2Units)('Universal Schema & Quality Invariants: $unit_id ($title.th)', (unit) => {
    describe('Unit Metadata & Structure', () => {
      it('has valid top-level unit metadata matching Tier 2 Manifest', () => {
        expect(unit.unit_id).toMatch(/^tier2_u(1[1-9]|2[0-5])$/);
        expect(unit.tier).toBe(2);
        expect(unit.unit_number).toBeGreaterThanOrEqual(11);
        expect(unit.unit_number).toBeLessThanOrEqual(25);
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
          expect(vocab.id).toMatch(/^hsk2_(1[1-9]|2[0-5])\d{2}$/);
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
              expect([...quiz.tokens!].sort()).toEqual([...quiz.correct_sequence!].sort());
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
        expect(finalLesson.cheer_trophy?.badge_id).toBe(`badge_t2_u${unit.unit_number}_master`);
        expect(finalLesson.cheer_trophy?.badge_name).toBeTruthy();
        expect(finalLesson.cheer_trophy?.message_th).toBeTruthy();
        expect(finalLesson.cheer_trophy?.xp_reward).toBeGreaterThanOrEqual(150);
      });
    });
  });

  // ==========================================================================
  // Unit-Specific Pedagogical Assertions
  // ==========================================================================
  describe('Specific Pedagogical Content Assertions per Unit', () => {
    it('Unit 11 (Scan & Pay): covers WeChat/Alipay, QR code, 把 structure, and change', () => {
      const vocab11 = unit11.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab11).toContain('微信');
      expect(vocab11).toContain('支付宝');
      expect(vocab11).toContain('二维码');
      expect(vocab11).toContain('扫一扫');
      expect(vocab11).toContain('零钱');
      expect(vocab11).toContain('转账');

      const l1 = unit11.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('把');
    });

    it('Unit 12 (Delivery & Courier): covers Meituan, delivery instructions, lockers, and 送过来', () => {
      const vocab12 = unit12.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab12).toContain('外卖');
      expect(vocab12).toContain('骑手');
      expect(vocab12).toContain('快递');
      expect(vocab12).toContain('快递柜');
      expect(vocab12).toContain('取件码');

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

    it('Unit 16 (Shopping Returns): covers 比...更..., 被 passive voice, and 只要...就...', () => {
      const vocab16 = unit16.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab16).toContain('尺码');
      expect(vocab16).toContain('试穿');
      expect(vocab16).toContain('合身');
      expect(vocab16).toContain('退货');
      expect(vocab16).toContain('换货');
      expect(vocab16).toContain('质量');
      expect(vocab16).toContain('打折');
      expect(vocab16).toContain('质保');
      expect(vocab16).toContain('折扣');

      const l2 = unit16.lessons.find((l: Lesson) => l.lesson_number === 2);
      expect(l2?.grammar_bite.title).toContain('被');
    });

    it('Unit 17 (Advanced Clinic): covers triage, potential complements (吃不下/吃得下/好不了), and prescriptions', () => {
      const vocab17 = unit17.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab17).toContain('挂号');
      expect(vocab17).toContain('门诊');
      expect(vocab17).toContain('内科');
      expect(vocab17).toContain('拉肚子');
      expect(vocab17).toContain('吃不下');
      expect(vocab17).toContain('受不了');
      expect(vocab17).toContain('药房');
      expect(vocab17).toContain('取药');
      expect(vocab17).toContain('处方');

      const l2 = unit17.lessons.find((l: Lesson) => l.lesson_number === 2);
      expect(l2?.grammar_bite.title).toContain('Potential Complements');
    });

    it('Unit 18 (Banking & Telecom): covers 只有...才..., SIM data packages, and Alipay binding', () => {
      const vocab18 = unit18.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab18).toContain('开户');
      expect(vocab18).toContain('银行卡');
      expect(vocab18).toContain('套餐');
      expect(vocab18).toContain('流量');
      expect(vocab18).toContain('汇率');
      expect(vocab18).toContain('泰铢');
      expect(vocab18).toContain('账户');
      expect(vocab18).toContain('绑定');
      expect(vocab18).toContain('取款');

      const l1 = unit18.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('只有...才...');
    });

    it('Unit 19 (Festivals & Social Visits): covers Spring Festival, mooncakes, 买礼物 3+3 Sandhi, and guest etiquette', () => {
      const vocab19 = unit19.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab19).toContain('春节');
      expect(vocab19).toContain('拜年');
      expect(vocab19).toContain('红包');
      expect(vocab19).toContain('中秋节');
      expect(vocab19).toContain('月饼');
      expect(vocab19).toContain('买礼物');
      expect(vocab19).toContain('做客');
      expect(vocab19).toContain('礼仪');
      expect(vocab19).toContain('四合院');

      const buyGift = unit19.lessons.flatMap((l: Lesson) => l.vocabulary).find((v) => v.hanzi === '买礼物');
      expect(buyGift?.display_pinyin).toBe('mái lǐwù');
      expect(buyGift?.sandhi_rule).toBe('3+3');
    });

    it('Unit 20 (Emergencies & Police): covers 110 police report, 连...都..., 竟然/果然, and embassy travel docs', () => {
      const vocab20 = unit20.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab20).toContain('报警');
      expect(vocab20).toContain('警察');
      expect(vocab20).toContain('遗失');
      expect(vocab20).toContain('竟然');
      expect(vocab20).toContain('果然');
      expect(vocab20).toContain('意外');
      expect(vocab20).toContain('救护车');
      expect(vocab20).toContain('大使馆');
      expect(vocab20).toContain('旅行证');

      const l1 = unit20.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('连...都...');
    });

    it('Unit 21 (Entertainment & Cinema): covers 电影院, 爆米花, A 没有 B 那么..., and 故宫预约', () => {
      const vocab21 = unit21.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab21).toContain('电影院');
      expect(vocab21).toContain('选座');
      expect(vocab21).toContain('爆米花');
      expect(vocab21).toContain('屏幕');
      expect(vocab21).toContain('博物馆');
      expect(vocab21).toContain('展览');
      expect(vocab21).toContain('门票');
      expect(vocab21).toContain('讲解器');
      expect(vocab21).toContain('精彩');
      expect(vocab21).toContain('故宫');
      expect(vocab21).toContain('实名制');

      const l1 = unit21.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('A + 没有 + B + 那么');
    });

    it('Unit 22 (Fitness & Outdoors): covers 健身房, 跑步机, 一边...一边..., 羽毛球, 徒步, and 着 aspect', () => {
      const vocab22 = unit22.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab22).toContain('健身房');
      expect(vocab22).toContain('锻炼');
      expect(vocab22).toContain('跑步机');
      expect(vocab22).toContain('哑铃');
      expect(vocab22).toContain('羽毛球');
      expect(vocab22).toContain('乒乓球');
      expect(vocab22).toContain('场地');
      expect(vocab22).toContain('徒步');
      expect(vocab22).toContain('露营');
      expect(vocab22).toContain('帐篷');
      expect(vocab22).toContain('背包');
      expect(vocab22).toContain('会员卡');

      const l1 = unit22.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('一边');
    });

    it('Unit 23 (Workplace Orientation): covers 办公室, 打印机, 复印, 扫描, 首先...然后...最后..., and 请假', () => {
      const vocab23 = unit23.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab23).toContain('办公室');
      expect(vocab23).toContain('打印机');
      expect(vocab23).toContain('复印');
      expect(vocab23).toContain('扫描');
      expect(vocab23).toContain('发送');
      expect(vocab23).toContain('抄送');
      expect(vocab23).toContain('附件');
      expect(vocab23).toContain('请假');
      expect(vocab23).toContain('病假');
      expect(vocab23).toContain('按时');
      expect(vocab23).toContain('交付');
      expect(vocab23).toContain('交接');

      const l1 = unit23.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('首先');
    });

    it('Unit 24 (Opinions & Discussion): covers 观点, 赞同, 反对, 尽管...但是..., 不妨, and 一方面...另一方面...', () => {
      const vocab24 = unit24.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab24).toContain('观点');
      expect(vocab24).toContain('赞同');
      expect(vocab24).toContain('反对');
      expect(vocab24).toContain('实际上');
      expect(vocab24).toContain('建议');
      expect(vocab24).toContain('不妨');
      expect(vocab24).toContain('方案');
      expect(vocab24).toContain('生活节奏');
      expect(vocab24).toContain('平衡');
      expect(vocab24).toContain('灵活性');
      expect(vocab24).toContain('总结');
      expect(vocab24).toContain('达成');
      expect(vocab24).toContain('共识');

      const l1 = unit24.lessons.find((l: Lesson) => l.lesson_number === 1);
      expect(l1?.grammar_bite.title).toContain('尽管...但是...');
    });

    it('Unit 25 (Grand Boss: 7-Day China Odyssey): covers 启程, 行程, 卧铺, 攻略, 延误, 改签, 民宿, 穿越, and 克服', () => {
      const vocab25 = unit25.lessons.flatMap((l: Lesson) => l.vocabulary.map((v: VocabularyItem) => v.hanzi));
      expect(vocab25).toContain('启程');
      expect(vocab25).toContain('行程');
      expect(vocab25).toContain('卧铺');
      expect(vocab25).toContain('攻略');
      expect(vocab25).toContain('甚至');
      expect(vocab25).toContain('延误');
      expect(vocab25).toContain('暴雨');
      expect(vocab25).toContain('改签');
      expect(vocab25).toContain('民宿');
      expect(vocab25).toContain('穿越');
      expect(vocab25).toContain('挑战');
      expect(vocab25).toContain('克服');
      expect(vocab25).toContain('独立');
      expect(vocab25).toContain('奇迹');

      const l4 = unit25.lessons.find((l: Lesson) => l.lesson_number === 4);
      expect(l4?.boss_challenge?.scenario_th).toContain('Grand Capstone');
      expect(l4?.cheer_trophy?.badge_id).toBe('badge_t2_u25_master');
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

      expect(summary.totalUnitsChecked).toBe(15);
      expect(summary.totalLessonsChecked).toBe(60);
      expect(summary.totalVocabChecked).toBeGreaterThanOrEqual(300);
      expect(summary.errors.length).toBe(0);
      expect(summary.warnings.length).toBe(0);
      expect(summary.success).toBe(true);
    });
  });
});

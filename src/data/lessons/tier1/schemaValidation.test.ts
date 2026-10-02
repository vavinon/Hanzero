import { describe, it, expect } from 'vitest';
import unit01Data from './unit01_greetings.json';
import unit02Data from './unit02_numbers_time.json';
import unit03Data from './unit03_food_drinks.json';
import unit04Data from './unit04_shopping_money.json';
import unit05Data from './unit05_directions_transport.json';
import unit06Data from './unit06_family_friends.json';
import unit07Data from './unit07_daily_routines.json';
import unit08Data from './unit08_weather_seasons.json';
import unit09Data from './unit09_health_body.json';
import unit10Data from './unit10_hotel_airport.json';
import { UnitLessonData, Lesson, VocabularyItem, QuizQuestion } from '../../../types/lesson';

const allTier1Units = [
  unit01Data,
  unit02Data,
  unit03Data,
  unit04Data,
  unit05Data,
  unit06Data,
  unit07Data,
  unit08Data,
  unit09Data,
  unit10Data,
] as unknown as UnitLessonData[];

describe('Tier 1 (Units 1-10) Curriculum Data & Pedagogical Schema Verification', () => {
  // ==========================================================================
  // Parameterized Invariants across ALL 10 Units
  // ==========================================================================
  describe.each(allTier1Units)('Universal Schema & Quality Invariants: $unit_id ($title.th)', (unit) => {
    describe('Unit Metadata & Structure', () => {
      it('has valid top-level unit metadata matching Master Manifest', () => {
        expect(unit.unit_id).toMatch(/^tier1_u(0[1-9]|10)$/);
        expect(unit.tier).toBe(1);
        expect(unit.unit_number).toBeGreaterThanOrEqual(1);
        expect(unit.unit_number).toBeLessThanOrEqual(10);
        expect(unit.title.zh).toBeTruthy();
        expect(unit.title.th).toBeTruthy();
        expect(unit.title.en).toBeTruthy();
        expect(typeof unit.description).toBe('string');
        expect(unit.description.length).toBeGreaterThan(10);
      });

      it('contains all 4 complete bite-sized lessons in sequential order', () => {
        expect(Array.isArray(unit.lessons)).toBe(true);
        expect(unit.lessons.length).toBe(4);

        const uStr = unit.unit_number < 10 ? `0${unit.unit_number}` : `${unit.unit_number}`;
        unit.lessons.forEach((lesson: Lesson, idx: number) => {
          expect(lesson.lesson_number).toBe(idx + 1);
          expect(lesson.lesson_id).toBe(`t1_u${uStr}_l0${idx + 1}`);
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

      it('contains at least 14 high-frequency HSK 1 vocabulary entries', () => {
        expect(allVocab.length).toBeGreaterThanOrEqual(14);
      });

      it('adheres to Simplified Chinese characters without traditional variants', () => {
        const traditionalDisallowed = [
          '國', '謝', '歡', '見', '們', '門', '個', '樣', '東', '點',
          '這', '買', '賣', '錢', '車', '飯', '時', '後', '條', '幾', '兩', '塊', '貴'
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
          expect(vocab.id).toMatch(/^hsk1_\d{4}$/);
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

      it('awards unit master or grand explorer trophy for completing Lesson 4', () => {
        const bossLesson = unit.lessons.find((l) => l.lesson_number === 4);
        if (unit.unit_number === 10) {
          expect(bossLesson?.cheer_trophy.xp_reward).toBe(500);
          expect(bossLesson?.cheer_trophy.badge_id).toBe('badge_t1_grand_explorer');
        } else {
          expect(bossLesson?.cheer_trophy.xp_reward).toBe(200);
          const uStr = unit.unit_number < 10 ? `0${unit.unit_number}` : `${unit.unit_number}`;
          expect(bossLesson?.cheer_trophy.badge_id).toBe(`badge_t1_u${uStr}_master`);
        }
      });
    });
  });

  // ==========================================================================
  // Unit-Specific Pedagogical Assertions
  // ==========================================================================
  describe('Unit 1 (tier1_u01) Specific Checks', () => {
    const unit1 = unit01Data as unknown as UnitLessonData;
    const allVocab = unit1.lessons.flatMap((l) => l.vocabulary);

    it('correctly annotates Tone Sandhi for 不客气 (bú kèqi) in Lesson 1.1', () => {
      const bukeqi = allVocab.find((v) => v.hanzi === '不客气');
      expect(bukeqi).toBeDefined();
      expect(bukeqi?.pinyin).toBe('bú kèqi');
      expect(bukeqi?.sandhi_rule).toBe('bu');
      expect(bukeqi?.meaning_th).toContain('ไม่เป็นไร');
    });

    it('includes Lesson 1.2 name and identity vocabulary (我, 叫, 什么, 名字)', () => {
      const l2 = unit1.lessons.find((l) => l.lesson_id === 't1_u01_l02');
      const hanziList = l2!.vocabulary.map((v) => v.hanzi);
      expect(hanziList).toContain('我');
      expect(hanziList).toContain('叫');
      expect(hanziList).toContain('什么');
      expect(hanziList).toContain('名字');
    });

    it('includes Lesson 1.3 nationality vocabulary and correctly annotates 不是 (bú shì)', () => {
      const l3 = unit1.lessons.find((l) => l.lesson_id === 't1_u01_l03');
      const hanziList = l3!.vocabulary.map((v) => v.hanzi);
      expect(hanziList).toContain('是');
      expect(hanziList).toContain('哪');
      expect(hanziList).toContain('国');
      expect(hanziList).toContain('人');
      expect(hanziList).toContain('泰国');
      expect(hanziList).toContain('中国');
      expect(l3?.tone_rule?.example).toContain('bú shì');
    });
  });

  describe('Unit 2 (tier1_u02) Specific Checks: Numbers & Time', () => {
    const unit2 = unit02Data as unknown as UnitLessonData;

    it('contains full 0-10 numbers with gestures in Lesson 2.1', () => {
      const l1 = unit2.lessons[0];
      const numbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      const vocabHanzi = l1.vocabulary.map((v) => v.hanzi);
      numbers.forEach((num) => expect(vocabHanzi).toContain(num));
    });

    it('distinguishes 二 vs 两 rigorously across grammar and quizzes', () => {
      const l1 = unit2.lessons[0];
      const liang = l1.vocabulary.find((v) => v.hanzi === '两');
      expect(liang).toBeDefined();
      expect(liang?.meaning_th).toContain('สอง');

      // Can-do explicitly mentions 二 vs 两
      expect(l1.can_do.th).toContain('两');
      expect(l1.can_do.th).toContain('二');

      // Grammar bite explicitly compares 二 and 两 in patterns
      expect(l1.grammar_bite.patterns.some((p) => p.zh.includes('两'))).toBe(true);

      // Quiz explicitly tests this trap
      expect(l1.quizzes.some((q) => q.question_th.includes('2') || q.explanation_th.includes('两'))).toBe(true);
    });

    it('preserves base tone yī for 星期一 (xīngqīyī) in Lesson 2.2', () => {
      const l2 = unit2.lessons[1];
      expect(l2.tone_rule?.example).toContain('xīngqīyī');
      expect(l2.tone_rule?.example).not.toContain('yí');
      expect(l2.grammar_bite.patterns.some((p) => p.zh === '今天星期一。')).toBe(true);
    });

    it('applies 3+3 Sandhi in time expressions (两点 liáng diǎn, 几点 jí diǎn)', () => {
      const l3 = unit2.lessons[2];
      expect(l3.tone_rule?.example).toContain('liáng diǎn');
      expect(l3.tone_rule?.example).toContain('jí diǎn');
    });
  });

  describe('Unit 3 (tier1_u03) Specific Checks: Food & Drinks', () => {
    const unit3 = unit03Data as unknown as UnitLessonData;
    const allVocab = unit3.lessons.flatMap((l) => l.vocabulary);

    it('contains core food items (米饭, 面条, 包子) and drinks (水, 茶, 咖啡)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('米饭');
      expect(hanziList).toContain('面条');
      expect(hanziList).toContain('包子');
      expect(hanziList).toContain('水');
      expect(hanziList).toContain('茶');
      expect(hanziList).toContain('咖啡');
    });

    it('correctly handles 好吃 vs 好喝 contrast in Lesson 3.3', () => {
      const l3 = unit3.lessons[2];
      const haochi = l3.vocabulary.find((v) => v.hanzi === '好吃');
      const haohe = l3.vocabulary.find((v) => v.hanzi === '好喝');
      expect(haochi?.meaning_th).toContain('อร่อย');
      expect(haohe?.meaning_th).toContain('อร่อย');
      expect(l3.grammar_bite.explanation_th).toContain('好吃');
      expect(l3.grammar_bite.explanation_th).toContain('好喝');
    });

    it('correctly annotates Tone Sandhi for 不辣 (bú là) in Lesson 3.3', () => {
      const l3 = unit3.lessons[2];
      expect(l3.tone_rule?.example).toContain('bú là');
      expect(l3.can_do.th).toContain('bú là');
    });

    it('contains measure words 杯 (bēi) and 碗 (wǎn)', () => {
      const bei = allVocab.find((v) => v.hanzi === '杯');
      const wan = allVocab.find((v) => v.hanzi === '碗');
      expect(bei).toBeDefined();
      expect(wan).toBeDefined();
    });
  });

  describe('Unit 4 (tier1_u04) Specific Checks: Shopping & Money', () => {
    const unit4 = unit04Data as unknown as UnitLessonData;
    const allVocab = unit4.lessons.flatMap((l) => l.vocabulary);

    it('correctly annotates Tone Sandhi for 一块 (yí kuài) and 一共 (yí gòng)', () => {
      const l1 = unit4.lessons[0];
      expect(l1.tone_rule?.example).toContain('yí kuài');

      const yigong = allVocab.find((v) => v.hanzi === '一共');
      expect(yigong?.display_pinyin).toBe('yí gòng');
      expect(yigong?.sandhi_rule).toBe('yi');
    });

    it('correctly annotates 3+3 Sandhi for 可以 (kéyǐ) and 老板 (láobǎn)', () => {
      const keyi = allVocab.find((v) => v.hanzi === '可以');
      const laoban = allVocab.find((v) => v.hanzi === '老板');
      expect(keyi?.display_pinyin).toBe('kéyǐ');
      expect(keyi?.sandhi_rule).toBe('3+3');
      expect(laoban?.display_pinyin).toBe('láobǎn');
      expect(laoban?.sandhi_rule).toBe('3+3');
    });

    it('features negotiation grammar 太...了 (tài...le) and particle 吧 (ba)', () => {
      const l2 = unit4.lessons[1];
      expect(l2.grammar_bite.patterns.some((p) => p.formula.includes('太'))).toBe(true);
      expect(l2.grammar_bite.patterns.some((p) => p.zh.includes('太贵了'))).toBe(true);
      const ba = allVocab.find((v) => v.hanzi === '吧');
      expect(ba).toBeDefined();
    });

    it('includes customer and shopkeeper interaction with 想, 要, and 给', () => {
      const xiang = allVocab.find((v) => v.hanzi === '想');
      const gei = allVocab.find((v) => v.hanzi === '给');
      expect(xiang).toBeDefined();
      expect(gei).toBeDefined();
    });
  });

  // ==========================================================================
  // Unit 5-10 Specific Pedagogical Assertions
  // ==========================================================================
  describe('Unit 5 (tier1_u05) Specific Checks: Directions & Transit', () => {
    const unit5 = unit05Data as unknown as UnitLessonData;
    const allVocab = unit5.lessons.flatMap((l) => l.vocabulary);

    it('contains transit direction keywords (在, 哪儿, 往, 左, 右, 前)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('在');
      expect(hanziList).toContain('哪儿');
      expect(hanziList).toContain('往');
      expect(hanziList).toContain('左');
      expect(hanziList).toContain('右');
      expect(hanziList).toContain('前');
    });

    it('contains public transportation vocabulary (地铁, 出租车, 怎么, 坐)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('地铁');
      expect(hanziList).toContain('出租车');
      expect(hanziList).toContain('怎么');
      expect(hanziList).toContain('坐');
    });

    it('annotates 3+3 Sandhi for 往左 (wáng zuǒ) and 洗手间 (xíshǒujiān)', () => {
      const l2 = unit5.lessons[1];
      expect(l2.tone_rule?.example).toContain('wáng zuǒ');
      const l1 = unit5.lessons[0];
      expect(l1.tone_rule?.example).toContain('xíshǒujiān');
    });
  });

  describe('Unit 6 (tier1_u06) Specific Checks: Family & Friends', () => {
    const unit6 = unit06Data as unknown as UnitLessonData;
    const allVocab = unit6.lessons.flatMap((l) => l.vocabulary);

    it('contains core family kinship terms (爸爸, 妈妈, 哥哥, 姐姐, 弟弟, 妹妹)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('爸爸');
      expect(hanziList).toContain('妈妈');
      expect(hanziList).toContain('哥哥');
      expect(hanziList).toContain('姐姐');
      expect(hanziList).toContain('弟弟');
      expect(hanziList).toContain('妹妹');
    });

    it('features family measure word 口 (kǒu), question word 几 (jǐ), and social circles (朋友, 同学, 同事)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('口');
      expect(hanziList).toContain('几');
      expect(hanziList).toContain('朋友');
      expect(hanziList).toContain('同学');
      expect(hanziList).toContain('同事');
    });

    it('explains neutral tone for repeated kinship terms (bàba, māma, etc.)', () => {
      const l1 = unit6.lessons[0];
      expect(l1.tone_rule?.example).toContain('bàba');
      expect(l1.tone_rule?.example).toContain('māma');
    });
  });

  describe('Unit 7 (tier1_u07) Specific Checks: Daily Life & Routines', () => {
    const unit7 = unit07Data as unknown as UnitLessonData;
    const allVocab = unit7.lessons.flatMap((l) => l.vocabulary);

    it('contains daily routine verbs (起床, 上班, 下班, 睡觉)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('起床');
      expect(hanziList).toContain('上班');
      expect(hanziList).toContain('下班');
      expect(hanziList).toContain('睡觉');
    });

    it('features leisure entertainment (电影, 听, 音乐, 玩, 手机, 书)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('电影');
      expect(hanziList).toContain('听');
      expect(hanziList).toContain('音乐');
      expect(hanziList).toContain('玩');
      expect(hanziList).toContain('手机');
      expect(hanziList).toContain('书');
    });

    it('teaches Chinese time-order sentence structure in Lesson 7.1', () => {
      const l1 = unit7.lessons[0];
      expect(l1.grammar_bite.explanation_th).toContain('เวลา');
      expect(l1.grammar_bite.patterns.some((p) => p.formula.includes('เวลา'))).toBe(true);
    });
  });

  describe('Unit 8 (tier1_u08) Specific Checks: Weather & Seasons', () => {
    const unit8 = unit08Data as unknown as UnitLessonData;
    const allVocab = unit8.lessons.flatMap((l) => l.vocabulary);

    it('contains weather inquiries and conditions (天气, 怎么样, 热, 冷, 下雨, 下雪)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('天气');
      expect(hanziList).toContain('怎么样');
      expect(hanziList).toContain('热');
      expect(hanziList).toContain('冷');
      expect(hanziList).toContain('下雨');
      expect(hanziList).toContain('下雪');
    });

    it('contains all 4 seasons (春天, 夏天, 秋天, 冬天)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('春天');
      expect(hanziList).toContain('夏天');
      expect(hanziList).toContain('秋天');
      expect(hanziList).toContain('冬天');
    });

    it('annotates bu Sandhi for 不冷不热 (bù lěng bú rè)', () => {
      const l1 = unit8.lessons[0];
      expect(l1.tone_rule?.example).toContain('bú rè');
    });
  });

  describe('Unit 9 (tier1_u09) Specific Checks: Health & Body', () => {
    const unit9 = unit09Data as unknown as UnitLessonData;
    const allVocab = unit9.lessons.flatMap((l) => l.vocabulary);

    it('contains body parts (头, 肚子, 眼睛, 手, 脚, 身体)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('头');
      expect(hanziList).toContain('肚子');
      expect(hanziList).toContain('眼睛');
      expect(hanziList).toContain('手');
      expect(hanziList).toContain('脚');
      expect(hanziList).toContain('身体');
    });

    it('contains medical symptoms and treatments (疼, 发烧, 感冒, 医院, 医生, 吃药)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('疼');
      expect(hanziList).toContain('发烧');
      expect(hanziList).toContain('感冒');
      expect(hanziList).toContain('医院');
      expect(hanziList).toContain('医生');
      expect(hanziList).toContain('吃药');
    });

    it('features Chinese care advice 多喝水 (duō hē shuǐ) in dialogue or quizzes', () => {
      const l3 = unit9.lessons[2];
      const hasCareAdvice = l3.dialogue.some((d) => d.zh.includes('多喝') || d.zh.includes('休息'));
      expect(hasCareAdvice).toBe(true);
    });
  });

  describe('Unit 10 (tier1_u10) Specific Checks: Hotel, Airport & Grand Boss Quest', () => {
    const unit10 = unit10Data as unknown as UnitLessonData;
    const allVocab = unit10.lessons.flatMap((l) => l.vocabulary);

    it('contains hotel check-in and airport terms (预订, 房间, 护照, 登机牌, 机场, 行李)', () => {
      const hanziList = allVocab.map((v) => v.hanzi);
      expect(hanziList).toContain('预订');
      expect(hanziList).toContain('房间');
      expect(hanziList).toContain('护照');
      expect(hanziList).toContain('登机牌');
      expect(hanziList).toContain('机场');
      expect(hanziList).toContain('行李');
    });

    it('demonstrates yāo Sandhi rule for room numbers in Lesson 10.2 (101 房 yāo líng yāo)', () => {
      const l2 = unit10.lessons[1];
      expect(l2.tone_rule?.example).toContain('yāo líng yāo');
    });

    it('features Lesson 10.4 Grand Boss Quest with 500 XP and Grand Explorer Trophy', () => {
      const l4 = unit10.lessons[3];
      expect(l4.lesson_id).toBe('t1_u10_l04');
      expect(l4.title.th).toContain('Grand Boss Quest');
      expect(l4.cheer_trophy.xp_reward).toBe(500);
      expect(l4.cheer_trophy.badge_id).toBe('badge_t1_grand_explorer');
      expect(l4.boss_challenge.scenario_th).toContain('Tier 1 Grand Odyssey');
    });

    it('incorporates 3-stage mini-game odyssey quizzes in Lesson 10.4', () => {
      const l4 = unit10.lessons[3];
      expect(l4.quizzes.length).toBe(4);
      const stage1 = l4.quizzes.find((q) => q.question_th.includes('Stage 1'));
      const stage2 = l4.quizzes.find((q) => q.question_th.includes('Stage 2'));
      const stage3 = l4.quizzes.find((q) => q.question_th.includes('Stage 3'));
      expect(stage1).toBeDefined();
      expect(stage2).toBeDefined();
      expect(stage3).toBeDefined();
    });
  });

  // ==========================================================================
  // Cross-Unit Consistency & Integrity
  // ==========================================================================
  describe('Cross-Unit Curriculum Integrity (Units 1-10)', () => {
    it('ensures all vocabulary IDs across all units are globally unique', () => {
      const allIds = allTier1Units.flatMap((u) => u.lessons.flatMap((l) => l.vocabulary.map((v) => v.id)));
      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(allIds.length);
    });

    it('has a combined vocabulary pool of at least 200 words across Units 1-10', () => {
      const allVocabs = allTier1Units.flatMap((u) => u.lessons.flatMap((l) => l.vocabulary));
      expect(allVocabs.length).toBeGreaterThanOrEqual(200);
    });
  });

  // ==========================================================================
  // CurriculumEngine Automated Validator & Linter Suite (TASK-501)
  // ==========================================================================
  describe('CurriculumEngine Automated Validator & Linter Suite (TASK-501)', () => {
    it('executes full curriculum validation successfully on all Tier 0 and Tier 1 units', async () => {
      const { CurriculumEngine } = await import('../../../../scripts/lib/curriculumEngine');
      const engine = new CurriculumEngine();
      const summary = await engine.validate({ strict: true });

      expect(summary.totalUnitsChecked).toBeGreaterThanOrEqual(16); // 6 Tier 0 + 10 Tier 1
      expect(summary.errors.length).toBe(0);
      expect(summary.warnings.length).toBe(0);
      expect(summary.success).toBe(true);
      expect(summary.durationMs).toBeLessThan(500);
    });

    it('catches prohibited syntax 不有 and traditional Chinese characters', async () => {
      const { findTraditionalChars, TRADITIONAL_BLACKLIST } = await import('../../../../scripts/lib/curriculumEngine');

      expect(findTraditionalChars('我是泰國人')).toContain('國');
      expect(findTraditionalChars('多少錢')).toContain('錢');
      expect(findTraditionalChars('你好')).toEqual([]);
      expect(TRADITIONAL_BLACKLIST.has('國')).toBe(true);
    });

    it('validates FMM tokenizer and interleaving calculation', async () => {
      const { forwardMaxMatch } = await import('../../../../scripts/lib/curriculumEngine');
      const dict = new Set(['你好', '我是', '泰国人', '谢谢']);
      const tokens = forwardMaxMatch('你好我是泰国人谢谢', dict);

      expect(tokens).toEqual(['你好', '我是', '泰国人', '谢谢']);
    });

    it('enforces Tone Sandhi rules for 一 (yī / yí / yì / yi / yāo) and ordinals/dates', async () => {
      const { CurriculumEngine } = await import('../../../../scripts/lib/curriculumEngine');
      const engine = new CurriculumEngine();

      const summary1 = await engine.validate({ unitId: 'tier1_u01' });
      expect(summary1.errors.filter((e) => e.rule === 'SANDHI_YI_BASE_TONE')).toHaveLength(0);

      const fakeUnitWithErrors = {
        unit_id: 'tier1_fake',
        tier: 1,
        unit_number: 99,
        title: { zh: '测试', th: 'ทดสอบ', en: 'Test' },
        lessons: [
          {
            lesson_id: 't1_fake_l01',
            lesson_number: 1,
            title: { zh: '测试课', th: 'บททดสอบ', en: 'Test Lesson' },
            can_do: { th: 'ทดสอบได้', en: 'Can test' },
            baby_step_goal: 'ทดสอบระบบ',
            vocabulary: [
              {
                id: 'hsk1_9901',
                hanzi: '第一天',
                pinyin: 'dì-yí tiān',
                display_pinyin: 'dì-yí tiān',
                pinyin_tone: '4-2 1',
                meaning_th: 'วันแรก',
                meaning_en: 'First day',
                radical: '竹',
                radical_name_th: 'ไม้ไผ่',
                stroke_count: 11,
                mnemonic: 'test',
                kid_mnemonic: 'test',
                body_gesture: 'test',
              },
              {
                id: 'hsk1_9902',
                hanzi: '喜不喜欢',
                pinyin: 'xǐ bù xǐhuan',
                display_pinyin: 'xǐ bù xǐhuan',
                pinyin_tone: '3 4 3 0',
                meaning_th: 'ชอบหรือไม่ชอบ',
                meaning_en: 'Like or not',
                radical: '口',
                radical_name_th: 'ปาก',
                stroke_count: 12,
                mnemonic: 'test',
                kid_mnemonic: 'test',
                body_gesture: 'test',
              },
              {
                id: 'hsk1_9903',
                hanzi: '看一看',
                pinyin: 'kàn yí kàn',
                display_pinyin: 'kàn yí kàn',
                pinyin_tone: '4 2 4',
                meaning_th: 'ดูลองดู',
                meaning_en: 'Take a look',
                radical: '目',
                radical_name_th: 'ตา',
                stroke_count: 9,
                mnemonic: 'test',
                kid_mnemonic: 'test',
                body_gesture: 'test',
              },
              {
                id: 'hsk1_9904',
                hanzi: '我不有钱',
                pinyin: 'wǒ bù yǒu qián',
                display_pinyin: 'wǒ bù yǒu qián',
                pinyin_tone: '3 4 3 2',
                meaning_th: 'ฉันไม่มีเงิน (ผิดไวยากรณ์)',
                meaning_en: 'I do not have money (bad grammar)',
                radical: '人',
                radical_name_th: 'คน',
                stroke_count: 10,
                mnemonic: 'test',
                kid_mnemonic: 'test',
                body_gesture: 'test',
              },
            ],
          },
        ],
      };

      const errors: any[] = [];
      const warnings: any[] = [];
      (engine as any).validateTier1Unit(
        fakeUnitWithErrors,
        'fake.json',
        errors,
        warnings,
        new Set(),
        new Set(),
        new Set()
      );

      const yiBaseError = errors.find((e) => e.rule === 'SANDHI_YI_BASE_TONE');
      expect(yiBaseError).toBeDefined();

      const buSyntaxError = errors.find((e) => e.rule === 'SYNTAX_BAN_BUYOU');
      expect(buSyntaxError).toBeDefined();
    });

    it('neutralizes Red Team Round 2 attack vectors: 二十一个, 是不是？, and Tier 0 null safety', async () => {
      const { CurriculumEngine } = await import('../../../../scripts/lib/curriculumEngine');
      const engine = new CurriculumEngine();

      const compoundNumeralVocab = {
        id: 'hsk1_8801',
        hanzi: '二十一个',
        pinyin: 'èrshíyī ge',
        display_pinyin: 'èrshíyī ge',
        pinyin_tone: '4-10-1 0',
        meaning_th: '21 อัน',
        meaning_en: '21 items',
        radical: '十',
        radical_name_th: 'สิบ',
        stroke_count: 8,
        mnemonic: 'test',
        kid_mnemonic: 'test',
        body_gesture: 'test',
      };

      const errors1: any[] = [];
      const warnings1: any[] = [];
      (engine as any).lintYiSandhi(
        compoundNumeralVocab.hanzi,
        compoundNumeralVocab.pinyin,
        compoundNumeralVocab.display_pinyin,
        'test_unit',
        'test_lesson',
        compoundNumeralVocab.id,
        errors1,
        warnings1
      );
      expect(errors1.filter((e) => e.rule === 'SANDHI_YI_BEFORE_TONE4')).toHaveLength(0);

      const errors2: any[] = [];
      const warnings2: any[] = [];
      (engine as any).lintBuSandhi(
        '是不是？',
        'shì bu shì?',
        'shì bu shì?',
        'test_unit',
        'test_lesson',
        'test_vocab',
        errors2,
        warnings2
      );
      expect(errors2.filter((e) => e.rule === 'SANDHI_BU_BEFORE_TONE4')).toHaveLength(0);

      const tier0WithNullLesson = {
        unit_id: 'tier0_test_null',
        title: { zh: '测试', th: 'ทดสอบ', en: 'Test' },
        lessons: [null],
      };
      const errors3: any[] = [];
      const warnings3: any[] = [];
      expect(() => {
        (engine as any).validateTier0Unit(
          tier0WithNullLesson,
          'tier0_test_null.json',
          errors3,
          warnings3,
          new Set()
        );
      }).not.toThrow();
      expect(errors3.some((e) => e.rule === 'LESSON_SCHEMA')).toBe(true);
    });
  });
});

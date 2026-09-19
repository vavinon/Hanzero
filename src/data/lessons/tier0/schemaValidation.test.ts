import { describe, it, expect } from 'vitest';
import { tier0Units, getAllTier0Units, getTier0Unit } from './index';
import { Tier0Lesson, VocabularyItem, QuizQuestion } from '../../../types/lesson';

describe('Tier 0 Curriculum Data & Pedagogical Schema Verification', () => {
  describe('Group 1: Unit Metadata & Structure (All 6 Units)', () => {
    it('contains exactly 6 units covering Units 0.1 through 0.6', () => {
      const units = getAllTier0Units();
      expect(units.length).toBe(6);
      const expectedIds = [
        'tier0_u01',
        'tier0_u02',
        'tier0_u03',
        'tier0_u04',
        'tier0_u05',
        'tier0_u06',
      ];
      units.forEach((unit, idx) => {
        expect(unit.unit_id).toBe(expectedIds[idx]);
        expect(unit.tier).toBe(0);
        expect(unit.unit_number).toBe(idx + 1);
        expect(unit.title.zh).toBeTruthy();
        expect(unit.title.th).toBeTruthy();
        expect(unit.title.en).toBeTruthy();
        expect(unit.description).toBeTruthy();
        expect(unit.lessons.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('can retrieve individual units by unit_id via getTier0Unit', () => {
      expect(getTier0Unit('tier0_u01')?.title.th).toContain('ริมฝีปาก');
      expect(getTier0Unit('tier0_u03')?.title.th).toContain('4 วรรณยุกต์');
      expect(getTier0Unit('tier0_u06')?.title.th).toContain('ลำดับขีด');
      expect(getTier0Unit('tier0_u99')).toBeUndefined();
    });

    it('ensures all Tier 0 lessons are marked as Safe Practice Zone (Zero Heart Deduction)', () => {
      tier0Units.forEach((unit) => {
        unit.lessons.forEach((lesson: Tier0Lesson) => {
          expect(lesson.is_safe_practice_zone).toBe(true);
          expect(lesson.lesson_id).toMatch(/^t0_u0\d_l01$/);
          expect(lesson.title.zh).toBeTruthy();
          expect(lesson.title.th).toBeTruthy();
          expect(lesson.title.en).toBeTruthy();
          expect(lesson.can_do.th).toBeTruthy();
          expect(lesson.can_do.en).toBeTruthy();
          expect(lesson.baby_step_goal).toBeTruthy();
        });
      });
    });
  });

  describe('Group 2: Sound Cards & Phonics Pedagogical Standards', () => {
    it('covers all initials and finals across Units 0.1, 0.2, 0.4, 0.5', () => {
      const u1 = getTier0Unit('tier0_u01')!.lessons[0];
      const u2 = getTier0Unit('tier0_u02')!.lessons[0];
      const u4 = getTier0Unit('tier0_u04')!.lessons[0];
      const u5 = getTier0Unit('tier0_u05')!.lessons[0];

      // Unit 0.1: b, p, m, f, d, t, n, l, a, o, e
      const u1Pinyins = u1.sound_cards?.map((s) => s.pinyin);
      ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'a', 'o', 'e'].forEach((p) => {
        expect(u1Pinyins).toContain(p);
      });

      // Unit 0.2: g, k, h, j, q, x, i, u, ü
      const u2Pinyins = u2.sound_cards?.map((s) => s.pinyin);
      ['g', 'k', 'h', 'j', 'q', 'x', 'i', 'u', 'ü'].forEach((p) => {
        expect(u2Pinyins).toContain(p);
      });

      // Unit 0.4: zh, ch, sh, r, z, c, s
      const u4Pinyins = u4.sound_cards?.map((s) => s.pinyin);
      ['zh', 'ch', 'sh', 'r', 'z', 'c', 's'].forEach((p) => {
        expect(u4Pinyins).toContain(p);
      });

      // Unit 0.5: an, en, ang, eng, ong, iu, ui, un
      const u5Pinyins = u5.sound_cards?.map((s) => s.pinyin);
      ['an', 'en', 'ang', 'eng', 'ong', 'iu', 'ui', 'un'].forEach((p) => {
        expect(u5Pinyins).toContain(p);
      });
    });

    it('provides mouth shape explanations and fun hints for every sound card', () => {
      tier0Units.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          lesson.sound_cards?.forEach((card) => {
            expect(card.pinyin).toBeTruthy();
            expect(card.mouth_shape_th).toBeTruthy();
            expect(card.mouth_shape_th.length).toBeGreaterThan(10);
            expect(card.fun_hint).toBeTruthy();
            expect(Array.isArray(card.example_words)).toBe(true);
            expect(card.example_words!.length).toBeGreaterThanOrEqual(1);
          });
        });
      });
    });
  });

  describe('Group 3: Stroke Cards & Basic Chinese Strokes', () => {
    it('covers the 8 fundamental Chinese strokes (永字八法) across Tier 0', () => {
      const allStrokes = tier0Units
        .flatMap((u) => u.lessons)
        .flatMap((l) => l.stroke_cards || []);

      const strokeCodes = allStrokes.map((s) => s.stroke_code);
      const expectedCodes = ['heng', 'shu', 'pie', 'na', 'ti', 'dian', 'zhe', 'gou'];
      expectedCodes.forEach((code) => {
        expect(strokeCodes).toContain(code);
      });

      // Unit 0.6 summarizes all 8 basic strokes
      const u6 = getTier0Unit('tier0_u06')!.lessons[0];
      expect(u6.stroke_cards?.length).toBe(8);
    });

    it('ensures all stroke cards have symbols, names in zh/th, and directions', () => {
      tier0Units.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          lesson.stroke_cards?.forEach((card) => {
            expect(card.stroke_code).toBeTruthy();
            expect(card.stroke_symbol).toBeTruthy();
            expect(card.stroke_name_zh).toBeTruthy();
            expect(card.stroke_name_th).toBeTruthy();
            expect(card.direction_description_th).toBeTruthy();
            expect(card.example_char).toBeTruthy();
            expect(card.mnemonic).toBeTruthy();
          });
        });
      });
    });
  });

  describe('Group 4: Radicals & Lego Character Construction', () => {
    it('covers the 6 essential seed radicals in Tier 0 (亻, 女, 子, 口, 氵, 木)', () => {
      const allRadicals = tier0Units
        .flatMap((u) => u.lessons)
        .flatMap((l) => l.radical_cards || []);

      const radSymbols = allRadicals.map((r) => r.radical);
      ['亻', '女', '子', '口', '氵', '木'].forEach((rad) => {
        expect(radSymbols).toContain(rad);
      });
    });

    it('provides clear mnemonics and example characters for all radicals', () => {
      tier0Units.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          lesson.radical_cards?.forEach((rad) => {
            expect(rad.radical).toBeTruthy();
            expect(rad.radical_name_zh).toBeTruthy();
            expect(rad.radical_name_th).toBeTruthy();
            expect(rad.meaning_th).toBeTruthy();
            expect(rad.meaning_en).toBeTruthy();
            expect(rad.mnemonic).toBeTruthy();
            expect(Array.isArray(rad.example_chars)).toBe(true);
            expect(rad.example_chars.length).toBeGreaterThanOrEqual(2);
          });
        });
      });
    });
  });

  describe('Group 5: Dual-Track Real-Life Vocabulary & Pedagogical Quality', () => {
    const allVocab: VocabularyItem[] = tier0Units
      .flatMap((u) => u.lessons)
      .flatMap((l) => l.vocabulary);

    it('contains at least 20 core vocabulary entries across all 6 units', () => {
      expect(allVocab.length).toBeGreaterThanOrEqual(20);
    });

    it('adheres strictly to Simplified Chinese characters without traditional variants', () => {
      const traditionalDisallowed = ['國', '謝', '歡', '見', '們', '門', '個', '樣', '東', '點', '媽媽'];
      allVocab.forEach((v) => {
        expect(v.hanzi).toBeTruthy();
        for (const char of traditionalDisallowed) {
          if (char === '媽媽') {
            expect(v.hanzi).not.toBe('媽媽');
          } else {
            expect(v.hanzi).not.toContain(char);
          }
        }
      });
    });

    it('verifies that every vocabulary word has complete kid mnemonics, gestures, and radical data', () => {
      allVocab.forEach((v) => {
        expect(v.id).toMatch(/^t0_\d{4}$/);
        expect(v.hanzi).toBeTruthy();
        expect(v.pinyin).toBeTruthy();
        expect(v.pinyin_tone).toBeTruthy();
        expect(v.meaning_th).toBeTruthy();
        expect(v.meaning_en).toBeTruthy();
        expect(v.radical).toBeTruthy();
        expect(v.radical_name_th).toBeTruthy();
        expect(v.stroke_count).toBeGreaterThan(0);
        expect(v.mnemonic).toBeTruthy();
        expect(v.kid_mnemonic).toBeTruthy();
        expect(v.kid_mnemonic.length).toBeGreaterThan(10);
        expect(v.body_gesture).toBeTruthy();
      });
    });

    it('contains life words for each respective unit', () => {
      const u1Vocab = getTier0Unit('tier0_u01')!.lessons[0].vocabulary.map((v) => v.hanzi);
      expect(u1Vocab).toEqual(expect.arrayContaining(['爸爸', '妈妈', '大', '十']));

      const u2Vocab = getTier0Unit('tier0_u02')!.lessons[0].vocabulary.map((v) => v.hanzi);
      expect(u2Vocab).toEqual(expect.arrayContaining(['你', '好', '喝', '七']));

      const u3Vocab = getTier0Unit('tier0_u03')!.lessons[0].vocabulary.map((v) => v.hanzi);
      expect(u3Vocab).toEqual(expect.arrayContaining(['你好', '吗', '字']));

      const u4Vocab = getTier0Unit('tier0_u04')!.lessons[0].vocabulary.map((v) => v.hanzi);
      expect(u4Vocab).toEqual(expect.arrayContaining(['是', '人', '吃', '在', '水']));

      const u5Vocab = getTier0Unit('tier0_u05')!.lessons[0].vocabulary.map((v) => v.hanzi);
      expect(u5Vocab).toEqual(expect.arrayContaining(['饭', '这', '家', '问']));

      const u6Vocab = getTier0Unit('tier0_u06')!.lessons[0].vocabulary.map((v) => v.hanzi);
      expect(u6Vocab).toEqual(expect.arrayContaining(['好', '大', '水', '门', '字']));
    });
  });

  describe('Group 6: Tone Coaster & Tone Sandhi Rules (Unit 0.3)', () => {
    const u3 = getTier0Unit('tier0_u03')!.lessons[0];

    it('has tone_practice_enabled and 5 tone cards (4 tones + neutral)', () => {
      expect(u3.tone_practice_enabled).toBe(true);
      expect(Array.isArray(u3.tone_cards)).toBe(true);
      expect(u3.tone_cards?.length).toBe(5);

      const toneNums = u3.tone_cards?.map((t) => t.tone_number);
      expect(toneNums).toEqual(expect.arrayContaining([1, 2, 3, 4, 0]));
    });

    it('correctly documents 3+3 Tone Sandhi for 你好 and Half-Third Tone', () => {
      expect(u3.sandhi_rules).toBeDefined();
      expect(u3.sandhi_rules?.length).toBeGreaterThanOrEqual(2);

      const rule33 = u3.sandhi_rules?.find((r) => r.formula.includes('3 + 3'));
      expect(rule33).toBeDefined();
      expect(rule33?.example).toContain('ní hǎo');

      const nihao = u3.vocabulary.find((v) => v.hanzi === '你好');
      expect(nihao).toBeDefined();
      expect(nihao?.pinyin).toBe('nǐ hǎo');
      expect(nihao?.display_pinyin).toBe('ní hǎo');
      expect(nihao?.sandhi_rule).toBe('3+3');

      const half3 = u3.sandhi_rules?.find((r) => r.rule_name.includes('ครึ่งเสียง'));
      expect(half3).toBeDefined();
    });
  });

  describe('Group 7: Safe Practice Quizzes Verification', () => {
    it('provides at least 4 interactive quizzes in every Tier 0 unit', () => {
      tier0Units.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          expect(lesson.quizzes.length).toBeGreaterThanOrEqual(4);
          lesson.quizzes.forEach((quiz: QuizQuestion) => {
            expect(quiz.question_th).toBeTruthy();
            expect(quiz.explanation_th).toBeTruthy();
            expect(quiz.encouragement).toBeTruthy();

            if (quiz.type !== 'sentence_scramble') {
              expect(Array.isArray(quiz.options)).toBe(true);
              expect(quiz.options.length).toBeGreaterThanOrEqual(3);
              expect(quiz.correct_index).toBeGreaterThanOrEqual(0);
              expect(quiz.correct_index).toBeLessThan(quiz.options.length);
            }
          });
        });
      });
    });
  });

  describe('Group 8: Grand Boss Challenge & Tier 0 Milestone Trophy (Unit 0.6)', () => {
    const u6 = getTier0Unit('tier0_u06')!.lessons[0];

    it('includes Tutu Bunny Grand Boss Quest with valid options and explanation', () => {
      expect(u6.boss_challenge).toBeDefined();
      expect(u6.boss_challenge?.scenario_th).toContain('Grand Boss Quest');
      expect(u6.boss_challenge?.options.length).toBeGreaterThanOrEqual(3);
      expect(u6.boss_challenge?.correct_index).toBe(0);
      expect(u6.boss_challenge?.explanation_th).toBeTruthy();
    });

    it('awards 150 XP and badge_t0_seed_master for completing Tier 0', () => {
      expect(u6.cheer_trophy).toBeDefined();
      expect(u6.cheer_trophy?.badge_id).toBe('badge_t0_seed_master');
      expect(u6.cheer_trophy?.badge_name).toContain('Tier 0');
      expect(u6.cheer_trophy?.xp_reward).toBe(150);
    });
  });
});

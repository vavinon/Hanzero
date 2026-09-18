import { describe, it, expect } from 'vitest';
import unit01Data from './unit01_greetings.json';
import { UnitLessonData, Lesson, VocabularyItem, QuizQuestion } from '../../../types/lesson';

describe('Unit 1 Curriculum Data & Pedagogical Schema Verification', () => {
  const unit = unit01Data as unknown as UnitLessonData;

  describe('Unit Metadata & Structure', () => {
    it('has valid top-level unit metadata matching Master Manifest', () => {
      expect(unit.unit_id).toBe('tier1_u01');
      expect(unit.tier).toBe(1);
      expect(unit.unit_number).toBe(1);
      expect(unit.title.zh).toBe('初次见面与道谢');
      expect(unit.title.th).toBe('ทักทาย & รู้จักกัน');
      expect(unit.title.en).toBe('First Greetings & Identity');
      expect(typeof unit.description).toBe('string');
      expect(unit.description.length).toBeGreaterThan(10);
    });

    it('contains all 4 complete bite-sized lessons', () => {
      expect(Array.isArray(unit.lessons)).toBe(true);
      expect(unit.lessons.length).toBe(4);

      const expectedIds = ['t1_u01_l01', 't1_u01_l02', 't1_u01_l03', 't1_u01_l04'];
      unit.lessons.forEach((lesson: Lesson, idx: number) => {
        expect(lesson.lesson_number).toBe(idx + 1);
        expect(lesson.lesson_id).toBe(expectedIds[idx]);
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
      // Known traditional characters that should NOT appear
      const traditionalDisallowed = ['國', '謝', '歡', '見', '們', '門', '個', '樣', '東', '點'];
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

    it('correctly annotates Tone Sandhi for 不客气 (bú kèqi) in Lesson 1.1', () => {
      const bukeqi = allVocab.find((v) => v.hanzi === '不客气');
      expect(bukeqi).toBeDefined();
      expect(bukeqi?.pinyin).toBe('bú kèqi');
      expect(bukeqi?.sandhi_rule).toBe('bu');
      expect(bukeqi?.meaning_th).toContain('ไม่เป็นไร');
    });

    it('includes Lesson 1.2 name and identity vocabulary (我, 叫, 什么, 名字)', () => {
      const l2 = unit.lessons.find((l) => l.lesson_id === 't1_u01_l02');
      expect(l2).toBeDefined();
      const hanziList = l2!.vocabulary.map((v) => v.hanzi);
      expect(hanziList).toContain('我');
      expect(hanziList).toContain('叫');
      expect(hanziList).toContain('什么');
      expect(hanziList).toContain('名字');
    });

    it('includes Lesson 1.3 nationality vocabulary and correctly annotates 不是 (bú shì)', () => {
      const l3 = unit.lessons.find((l) => l.lesson_id === 't1_u01_l03');
      expect(l3).toBeDefined();
      const hanziList = l3!.vocabulary.map((v) => v.hanzi);
      expect(hanziList).toContain('是');
      expect(hanziList).toContain('哪');
      expect(hanziList).toContain('国');
      expect(hanziList).toContain('人');
      expect(hanziList).toContain('泰国');
      expect(hanziList).toContain('中国');

      // Check tone rule
      expect(l3?.tone_rule?.example).toContain('bú shì');
      expect(l3?.tone_rule?.rule_name).toContain('不');
    });

    it('includes Lesson 1.4 professional networking vocabulary (您, 高兴, 认识)', () => {
      const l4 = unit.lessons.find((l) => l.lesson_id === 't1_u01_l04');
      expect(l4).toBeDefined();
      const hanziList = l4!.vocabulary.map((v) => v.hanzi);
      expect(hanziList).toContain('您');
      expect(hanziList).toContain('高兴');
      expect(hanziList).toContain('认识');
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
    it('provides exactly 4 quizzes in every lesson covering all 4 core modes', () => {
      unit.lessons.forEach((lesson) => {
        expect(lesson.quizzes.length).toBe(4);

        const types = lesson.quizzes.map((q) => q.type);
        // Each lesson must test radical focus and sentence scramble
        expect(types).toContain('radical_focus');
        expect(types).toContain('sentence_scramble');
        expect(types).toContain('flash_recall');
        expect(types.some((t) => t === 'listen_match' || t === 'tone_match')).toBe(true);
      });
    });

    it('ensures all multiple-choice quizzes have valid option counts and in-bounds correct_index', () => {
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

    it('awards Grand Boss XP reward of 200 for completing Lesson 1.4', () => {
      const bossLesson = unit.lessons.find((l) => l.lesson_id === 't1_u01_l04');
      expect(bossLesson?.cheer_trophy.xp_reward).toBe(200);
      expect(bossLesson?.cheer_trophy.badge_id).toBe('badge_t1_u01_master');
    });
  });
});

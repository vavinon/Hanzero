/**
 * src/data/lessons/lessonLoader.ts
 * Unified, safe lesson loader across all 5 tiers (Tier 0 to Tier 4).
 * Fixes the bug where Tier 1 units 2-10 defaulted back to unit 1.
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any'.
 */

import { tier0Units } from './tier0';
import { tier1Units } from './tier1';
import { tier2Units } from './tier2';
import { tier3Units } from './tier3';
import { tier4Units } from './tier4';
import {
  VocabularyItem,
  DialogueLine,
  GrammarBite,
  ToneRule,
  QuizQuestion,
  BossChallenge,
  CheerTrophy,
  TrilingualText,
  BilingualText,
} from '../../types/lesson';

export interface FullLessonData {
  lesson_id: string;
  unit_id: string;
  tier: number;
  title: TrilingualText;
  can_do: BilingualText;
  baby_step_goal?: string;
  vocabulary: VocabularyItem[];
  dialogue: DialogueLine[];
  grammar_bite: GrammarBite;
  tone_rule: ToneRule | null;
  quizzes: QuizQuestion[];
  boss_challenge?: BossChallenge;
  cheer_trophy?: CheerTrophy;
}

/**
 * Retrieves a full lesson by its lesson ID across all 63 units.
 * Supports:
 * - Tier 0: t0_u01_l01 ... t0_u06_l01
 * - Tier 1: t1_u01_l01 ... t1_u10_l04
 * - Tier 2: t2_u11_l01 ... t2_u25_l04
 * - Tier 3: t3_u26_l01 ... t3_u45_l04
 * - Tier 4: t4_u46_l01 ... t4_u57_l04
 */
export function getFullLessonData(lessonId: string): FullLessonData | null {
  // 1. Check Tier 0
  for (const u of tier0Units) {
    const l = u.lessons.find((item) => item.lesson_id === lessonId);
    if (l) {
      return {
        lesson_id: l.lesson_id,
        unit_id: u.unit_id,
        tier: 0,
        title: l.title,
        can_do: l.can_do,
        baby_step_goal: l.baby_step_goal,
        vocabulary: (l.vocabulary || []) as unknown as VocabularyItem[],
        dialogue: [],
        grammar_bite: {
          title: l.baby_step_goal || 'พื้นฐานเสียงพินอิน',
          explanation_th: l.can_do.th,
          patterns: [],
        },
        tone_rule: null,
        quizzes: (l.quizzes || []) as QuizQuestion[],
        boss_challenge: l.boss_challenge as BossChallenge | undefined,
        cheer_trophy: l.cheer_trophy as CheerTrophy | undefined,
      };
    }
  }

  // 2. Check Tier 1
  for (const u of tier1Units) {
    const l = u.lessons.find((item) => item.lesson_id === lessonId);
    if (l) {
      return {
        lesson_id: l.lesson_id,
        unit_id: u.unit_id,
        tier: 1,
        title: l.title,
        can_do: l.can_do,
        baby_step_goal: l.baby_step_goal,
        vocabulary: (l.vocabulary || []) as unknown as VocabularyItem[],
        dialogue: (l.dialogue || []) as DialogueLine[],
        grammar_bite: (l.grammar_bite || {
          title: 'ไวยากรณ์พื้นฐาน',
          explanation_th: l.can_do.th,
          patterns: [],
        }) as GrammarBite,
        tone_rule: (l.tone_rule || null) as ToneRule | null,
        quizzes: (l.quizzes || []) as QuizQuestion[],
        boss_challenge: l.boss_challenge as BossChallenge | undefined,
        cheer_trophy: l.cheer_trophy as CheerTrophy | undefined,
      };
    }
  }

  // 3. Check Tier 2
  for (const u of tier2Units) {
    const l = u.lessons.find((item) => item.lesson_id === lessonId);
    if (l) {
      return {
        lesson_id: l.lesson_id,
        unit_id: u.unit_id,
        tier: 2,
        title: l.title,
        can_do: l.can_do,
        baby_step_goal: l.baby_step_goal,
        vocabulary: (l.vocabulary || []) as unknown as VocabularyItem[],
        dialogue: (l.dialogue || []) as DialogueLine[],
        grammar_bite: (l.grammar_bite || {
          title: l.baby_step_goal || 'ไวยากรณ์ขั้นกลาง',
          explanation_th: l.can_do.th,
          patterns: [],
        }) as GrammarBite,
        tone_rule: (l.tone_rule || null) as ToneRule | null,
        quizzes: (l.quizzes || []) as QuizQuestion[],
        boss_challenge: l.boss_challenge as BossChallenge | undefined,
        cheer_trophy: l.cheer_trophy as CheerTrophy | undefined,
      };
    }
  }

  // 4. Check Tier 3
  for (const u of tier3Units) {
    const l = u.lessons.find((item) => item.lesson_id === lessonId);
    if (l) {
      return {
        lesson_id: l.lesson_id,
        unit_id: u.unit_id,
        tier: 3,
        title: l.title,
        can_do: l.can_do,
        baby_step_goal: l.baby_step_goal,
        vocabulary: (l.vocabulary || []) as unknown as VocabularyItem[],
        dialogue: (l.dialogue || []) as DialogueLine[],
        grammar_bite: (l.grammar_bite || {
          title: l.baby_step_goal || 'ไวยากรณ์เชิงวิชาชีพ',
          explanation_th: l.can_do.th,
          patterns: [],
        }) as GrammarBite,
        tone_rule: (l.tone_rule || null) as ToneRule | null,
        quizzes: (l.quizzes || []) as QuizQuestion[],
        boss_challenge: l.boss_challenge as BossChallenge | undefined,
        cheer_trophy: l.cheer_trophy as CheerTrophy | undefined,
      };
    }
  }

  // 5. Check Tier 4
  for (const u of tier4Units) {
    const l = u.lessons.find((item) => item.lesson_id === lessonId);
    if (l) {
      return {
        lesson_id: l.lesson_id,
        unit_id: u.unit_id,
        tier: 4,
        title: l.title,
        can_do: l.can_do,
        baby_step_goal: l.baby_step_goal,
        vocabulary: (l.vocabulary || []) as unknown as VocabularyItem[],
        dialogue: (l.dialogue || []) as DialogueLine[],
        grammar_bite: (l.grammar_bite || {
          title: l.baby_step_goal || 'วรรณกรรมและวาทศิลป์',
          explanation_th: l.can_do.th,
          patterns: [],
        }) as GrammarBite,
        tone_rule: (l.tone_rule || null) as ToneRule | null,
        quizzes: (l.quizzes || []) as QuizQuestion[],
        boss_challenge: l.boss_challenge as BossChallenge | undefined,
        cheer_trophy: l.cheer_trophy as CheerTrophy | undefined,
      };
    }
  }

  return null;
}

/**
 * Returns previous and next lesson IDs for sequential navigation.
 */
export function getAdjacentLessons(lessonId: string): {
  prevLessonId: string | null;
  nextLessonId: string | null;
} {
  const allLessonIds: string[] = [
    ...tier0Units.flatMap((u) => u.lessons.map((l) => l.lesson_id)),
    ...tier1Units.flatMap((u) => u.lessons.map((l) => l.lesson_id)),
    ...tier2Units.flatMap((u) => u.lessons.map((l) => l.lesson_id)),
    ...tier3Units.flatMap((u) => u.lessons.map((l) => l.lesson_id)),
    ...tier4Units.flatMap((u) => u.lessons.map((l) => l.lesson_id)),
  ];

  const currentIndex = allLessonIds.indexOf(lessonId);
  if (currentIndex === -1) {
    return { prevLessonId: null, nextLessonId: null };
  }

  return {
    prevLessonId: currentIndex > 0 ? allLessonIds[currentIndex - 1] : null,
    nextLessonId: currentIndex < allLessonIds.length - 1 ? allLessonIds[currentIndex + 1] : null,
  };
}

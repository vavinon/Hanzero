/**
 * src/types/lesson.ts
 * Strict TypeScript types for Hanzero Curriculum & Lesson Data (Phase 2).
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any'.
 */

export interface TrilingualText {
  zh: string;
  th: string;
  en: string;
}

export interface BilingualText {
  th: string;
  en: string;
}

export type ToneSandhiRule = '3+3' | 'half3' | 'bu' | 'yi' | null;

export interface ExampleSentence {
  zh: string;
  pinyin: string;
  th: string;
  en: string;
}

export interface VocabularyItem {
  id: string; // e.g. "hsk1_0012"
  hanzi: string;
  pinyin: string;
  pinyin_tone: string; // e.g. "ni3"
  meaning_th: string;
  meaning_en: string;
  radical: string;
  radical_name_th: string;
  stroke_count: number;
  mnemonic: string;
  kid_mnemonic: string;
  body_gesture: string;
  display_pinyin?: string;
  sandhi_rule?: ToneSandhiRule;
  writing_note?: string;
  example_sentence?: ExampleSentence;
}

export interface ToneRule {
  rule_name: string;
  description_th: string;
  example: string;
  fun_metaphor: string;
  reassurance: string;
}

export interface GrammarPattern {
  formula: string;
  zh: string;
  pinyin: string;
  th: string;
  en: string;
}

export interface GrammarBite {
  title: string;
  explanation_th: string;
  patterns: GrammarPattern[];
}

export interface DialogueLine {
  speaker: 'A' | 'B' | 'C';
  speaker_name: string;
  zh: string;
  pinyin: string;
  th: string;
  en: string;
  audio_key?: string;
}

export type QuizQuestionType =
  | 'listen_match'
  | 'radical_focus'
  | 'sentence_scramble'
  | 'flash_recall'
  | 'tone_match'
  | 'meaning_match';

export interface BaseQuiz {
  question_th: string;
  explanation_th: string;
  encouragement: string;
}

export interface MultipleChoiceQuiz extends BaseQuiz {
  type: 'listen_match' | 'radical_focus' | 'flash_recall' | 'tone_match' | 'meaning_match';
  options: string[];
  correct_index: number;
  target_audio?: string;
}

export interface SentenceScrambleQuiz extends BaseQuiz {
  type: 'sentence_scramble';
  tokens: string[];
  correct_sequence: string[];
  pinyin: string;
  meaning_th: string;
}

export type QuizQuestion = MultipleChoiceQuiz | SentenceScrambleQuiz;

export interface BossChallenge {
  scenario_th: string;
  options: string[];
  correct_index: number;
  explanation_th: string;
  encouragement: string;
  dialogue_context?: DialogueLine[];
}

export interface CheerTrophy {
  badge_id: string;
  badge_name: string;
  message_th: string;
  xp_reward: number;
}

export interface Lesson {
  lesson_id: string; // e.g. "t1_u01_l01"
  lesson_number: number;
  title: TrilingualText;
  can_do: BilingualText;
  baby_step_goal: string;
  vocabulary: VocabularyItem[];
  tone_rule?: ToneRule | null;
  grammar_bite: GrammarBite;
  dialogue: DialogueLine[];
  quizzes: QuizQuestion[];
  boss_challenge: BossChallenge;
  cheer_trophy: CheerTrophy;
}

export interface UnitLessonData {
  unit_id: string; // e.g. "tier1_u01"
  tier: number;
  unit_number: number;
  title: TrilingualText;
  description: string;
  lessons: Lesson[];
}

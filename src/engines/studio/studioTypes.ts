/**
 * src/engines/studio/studioTypes.ts
 * Strict TypeScript types for Hanzero Content Authoring Studio (Phase 6).
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any'.
 */

import type {
  TrilingualText,
  BilingualText,
  ToneSandhiRule,
  ExampleSentence,
  QuizQuestionType,
  ToneRule,
  DialogueLine,
} from '../../types/lesson';

export interface StudioValidationError {
  path: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
  lessonIndex?: number;
  vocabIndex?: number;
  actualValue?: unknown;
}

export interface StudioValidationResult {
  isValid: boolean;
  errors: StudioValidationError[];
  warnings: StudioValidationError[];
}

export type StorageStatus =
  | 'idle'
  | 'saving'
  | 'saved'
  | 'quota_exceeded'
  | 'blocked'
  | 'error';

/**
 * Form-tolerant vocabulary draft item with stable transient client key
 */
export interface StudioVocabDraft {
  _clientId: string;
  id: string; // e.g. "hsk1_0012"
  hanzi: string;
  pinyin: string; // e.g. "nǐ hǎo"
  pinyin_tone: string; // e.g. "ni3 hao3"
  meaning_th: string;
  meaning_en: string;
  radical: string;
  radical_name_th: string;
  stroke_count: number | ''; // Tolerant while typing in form
  mnemonic: string;
  kid_mnemonic: string;
  body_gesture: string;
  display_pinyin?: string;
  sandhi_rule?: ToneSandhiRule;
  writing_note?: string;
  example_sentence?: ExampleSentence;
}

/**
 * Dialogue line in draft state
 */
export interface StudioDialogueDraft {
  _clientId: string;
  speaker: 'A' | 'B' | 'C';
  speaker_name: string;
  zh: string;
  pinyin: string;
  th: string;
  en: string;
  audio_key?: string;
}

/**
 * Form-tolerant quiz question covering both MultipleChoice and SentenceScramble
 */
export interface StudioQuizDraft {
  _clientId: string;
  type: QuizQuestionType;
  question_th: string;
  explanation_th: string;
  encouragement: string;
  // Multiple Choice fields
  options: string[];
  correct_index: number;
  target_audio?: string;
  // Sentence Scramble fields
  tokens: string[];
  correct_sequence: string[];
  pinyin?: string;
  meaning_th?: string;
}

/**
 * Grammar pattern draft
 */
export interface StudioGrammarPatternDraft {
  _clientId: string;
  formula: string;
  zh: string;
  pinyin: string;
  th: string;
  en: string;
}

/**
 * Grammar bite draft
 */
export interface StudioGrammarDraft {
  title: string;
  explanation_th: string;
  patterns: StudioGrammarPatternDraft[];
}

/**
 * Boss challenge draft
 */
export interface StudioBossChallengeDraft {
  scenario_th: string;
  options: string[];
  correct_index: number;
  explanation_th: string;
  encouragement: string;
  dialogue_context?: DialogueLine[];
}

/**
 * Cheer trophy draft
 */
export interface StudioTrophyDraft {
  badge_id: string;
  badge_name: string;
  message_th: string;
  xp_reward: number;
}

/**
 * Studio Lesson Draft (1 lesson within a unit)
 */
export interface StudioLessonDraft {
  _clientId: string;
  lesson_id: string;
  lesson_number: number;
  title: TrilingualText;
  can_do: BilingualText;
  baby_step_goal: string;
  vocabulary: StudioVocabDraft[];
  tone_rule?: ToneRule | null;
  grammar_bite: StudioGrammarDraft;
  dialogue: StudioDialogueDraft[];
  quizzes: StudioQuizDraft[];
  boss_challenge: StudioBossChallengeDraft;
  cheer_trophy: StudioTrophyDraft;
}

/**
 * Unit metadata fields
 */
export interface StudioDraftMetadata {
  unit_id: string;
  tier: number;
  unit_number: number;
  title: TrilingualText;
  description: string;
}

/**
 * Root Studio Draft State
 */
export interface StudioDraftState {
  version: 1;
  unit_id: string;
  tier: number;
  unit_number: number;
  title: TrilingualText;
  description: string;
  lessons: StudioLessonDraft[];
  activeLessonIndex: number;
  lastSavedAt: number | null;
}

/**
 * Storage envelope for persisted draft
 */
export interface StudioStorageEnvelope {
  version: 1;
  savedAt: number;
  draft: StudioDraftState;
}

/**
 * Import parsing result
 */
export interface StudioImportResult {
  success: boolean;
  draft?: StudioDraftState;
  errors: StudioValidationError[];
  warnings: StudioValidationError[];
  syntaxError?: {
    line: number;
    column: number;
    message: string;
  };
}

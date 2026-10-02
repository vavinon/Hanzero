/**
 * src/types/reader.ts
 * Strict TypeScript types for Hanzero Smart Immersion Reader & Tap-to-Inspect Engine.
 * Adheres strictly to AGENTS.md §4.2: Zero 'any', pure types, 100% testable.
 */

export type HSKCategory = 'hsk1_2' | 'hsk3_4' | 'hsk5_6' | 'hsk7_9' | 'domain' | 'other';

export interface ExampleSentence {
  zh: string;
  pinyin: string;
  th: string;
  en: string;
}

export interface WordDefinition {
  word: string;
  pinyin: string;
  meaning_th: string;
  meaning_en: string;
  hsk_level: number; // 1..6, 7 for HSK 7-9, 0 for unknown
  is_domain_term?: boolean;
  radical?: string;
  radical_name_th?: string;
  example_sentence?: ExampleSentence;
}

export interface SegmentedToken {
  text: string;
  isWord: boolean;
  pinyin: string;
  hsk_level: number; // 0 if punctuation/whitespace/unknown, 1..6, 7 for 7-9
  is_domain_term?: boolean;
  definition?: WordDefinition;
}

export interface HSKDistribution {
  totalWords: number;
  uniqueWords: number;
  counts: {
    hsk1_2: number;
    hsk3_4: number;
    hsk5_6: number;
    hsk7_9: number;
    domain: number;
    other: number;
  };
  percentages: {
    hsk1_2: number;
    hsk3_4: number;
    hsk5_6: number;
    hsk7_9: number;
    domain: number;
    other: number;
  };
  readabilityScore: number; // 0 to 100, where higher is more advanced
  dominantLevel: string; // e.g. "HSK 5-6 (中高级)"
}

export type PinyinMode = 'pure' | 'ruby' | 'tap';

export type QuizCategory = 'fact' | 'inference' | 'main_idea';

export interface ComprehensionQuizQuestion {
  id: string;
  question_th: string;
  category: QuizCategory;
  options: string[];
  correct_index: number;
  explanation_th: string;
}

export type ArticleCategory = 'business' | 'ecommerce' | 'tech' | 'society' | 'culture' | 'legal';

export interface ImmersionArticle {
  id: string;
  title: string;
  title_pinyin: string;
  title_th: string;
  tier: number; // 3 or 4
  hskLevel: string; // e.g. "HSK 5", "HSK 6"
  category: ArticleCategory;
  readTimeMinutes: number;
  content: string;
  summary_th: string;
  pinyinOverrides?: Record<string, string>;
  quizzes: ComprehensionQuizQuestion[];
}

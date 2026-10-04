/**
 * src/data/hsk/index.ts
 * Master HSK 3.0 Vocabulary Repository & Query Engine.
 * Supports filtering by HSK Level (1-9), Category, and instant multi-field search.
 */

import { HSKWord, HSKFilterOptions } from './types';
import { hsk1Words } from './hsk1';
import { hsk2Words } from './hsk2';
import { hsk3Words } from './hsk3';
import { hsk4Words } from './hsk4';
import { hsk5Words } from './hsk5';
import { hsk6To9SeedWords } from './hsk3_9';

// Master repository containing all levels
export const allHskWords: HSKWord[] = [
  ...hsk1Words,
  ...hsk2Words,
  ...hsk3Words,
  ...hsk4Words,
  ...hsk5Words,
  ...hsk6To9SeedWords,
];

export * from './types';

/**
 * Filter words by level, category, and real-time query string.
 * Query matches against Hanzi, Pinyin (case-insensitive), and Thai meaning.
 */
export function queryHskWords(options: HSKFilterOptions): HSKWord[] {
  const { level = 'all', category = 'all', searchQuery = '' } = options;
  const cleanQuery = searchQuery.trim().toLowerCase();

  return allHskWords.filter((word) => {
    // Level Filter
    if (level !== 'all' && word.level !== level) {
      return false;
    }

    // Category Filter
    if (category !== 'all' && word.category !== category) {
      return false;
    }

    // Search Query (Hanzi / Pinyin / Thai Meaning)
    if (cleanQuery) {
      const matchHanzi = word.hanzi.includes(cleanQuery);
      const matchPinyin = word.pinyin.toLowerCase().includes(cleanQuery);
      const matchMeaningTh = word.meaning_th.toLowerCase().includes(cleanQuery);
      const matchMeaningEn = word.meaning_en.toLowerCase().includes(cleanQuery);
      if (!matchHanzi && !matchPinyin && !matchMeaningTh && !matchMeaningEn) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Get word statistics grouped by HSK Level (1-9).
 */
export function getHskLevelCounts(): Record<number, number> {
  const counts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) {
    counts[i] = 0;
  }
  for (const word of allHskWords) {
    counts[word.level] = (counts[word.level] || 0) + 1;
  }
  return counts;
}

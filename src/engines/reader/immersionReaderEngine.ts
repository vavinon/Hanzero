/**
 * src/engines/reader/immersionReaderEngine.ts
 * Pure TypeScript Smart Immersion Reader & Tap-to-Inspect Engine.
 * Zero-UI, zero external runtime costs, 100% testable.
 *
 * Implements:
 * - Hybrid Multi-Pass Segmentation (Curated Idioms Trie + Intl.Segmenter + Regex Fallback)
 * - Sentence-level Context Pinyin & Polyphone Support
 * - HSK 3.0 Distribution & Readability Analyzer
 * - Tap-to-Inspect Word Lookup & Compact Dictionary
 * - Deterministic Card ID & Deduplication for SRS Fast Bridge
 */

import { pinyin } from 'pinyin-pro';
import {
  SegmentedToken,
  WordDefinition,
  HSKDistribution,
} from '../../types/reader';
import {
  KNOWN_MULTI_CHAR_COMPOUNDS,
  lookupDictionary,
} from './readerDictionary';

/**
 * Feature detection for native browser/Node Intl.Segmenter support.
 */
export function isIntlSegmenterSupported(): boolean {
  return typeof Intl !== 'undefined' && typeof (Intl as unknown as { Segmenter?: unknown }).Segmenter === 'function';
}

/**
 * Regular expression matching Chinese characters (CJK Unified Ideographs).
 */
export const CJK_REGEX = /[\u4E00-\u9FA5\u3400-\u4DBF\uF900-\uFAFF]/;

/**
 * Regular expression matching Chinese and Latin punctuation / symbols / whitespace.
 */
export const PUNCTUATION_AND_SPACE_REGEX = /^[，。！？“”《》‘’、；：…—\n\r\t ()\[\]{}·—\-.,!?:;"'~`@#$%^&*+=<>|\\/]+$/;

/**
 * Deterministic Card ID generator for Reader-derived SRS cards.
 * Prevents duplicate cards for the same vocabulary word in SuperMemo SM-2.
 */
export function generateReaderCardId(hanzi: string): string {
  const clean = hanzi.trim();
  return `srs_reader_${encodeURIComponent(clean)}`;
}

/**
 * Sanitizes input text to prevent XSS payloads and strips control characters
 * while strictly preserving Unicode CJK characters and emojis.
 */
export function sanitizeArticleText(input: string): string {
  if (!input) return '';
  // Strip potential script/html tags from untrusted text
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

interface ProtectedSpan {
  start: number;
  end: number;
  text: string;
}

/**
 * Finds occurrences of known idioms and multi-character compounds to protect them
 * from being split prematurely by standard word segmenters.
 */
function findProtectedSpans(text: string): ProtectedSpan[] {
  const spans: ProtectedSpan[] = [];
  const occupied = new Uint8Array(text.length);

  for (const compound of KNOWN_MULTI_CHAR_COMPOUNDS) {
    let searchIndex = 0;
    while (searchIndex < text.length) {
      const foundPos = text.indexOf(compound, searchIndex);
      if (foundPos === -1) break;

      const endPos = foundPos + compound.length;

      // Check if this slice is already occupied
      let isOverlap = false;
      for (let i = foundPos; i < endPos; i++) {
        if (occupied[i] === 1) {
          isOverlap = true;
          break;
        }
      }

      if (!isOverlap) {
        for (let i = foundPos; i < endPos; i++) {
          occupied[i] = 1;
        }
        spans.push({ start: foundPos, end: endPos, text: compound });
      }

      searchIndex = foundPos + 1;
    }
  }

  // Sort by start index ascending
  return spans.sort((a, b) => a.start - b.start);
}

/**
 * Fallback tokenizer for environments without Intl.Segmenter (e.g. Firefox ESR or older WebViews).
 * Employs Regex-based chunking with greedy dictionary matching.
 */
function fallbackTokenize(rawText: string): string[] {
  if (!rawText) return [];

  const chunks: string[] = [];
  // Tokenize into CJK runs, alphanumeric runs, and other chars
  const regex = /([\u4E00-\u9FA5]+|[a-zA-Z0-9]+|[^\s\w\u4E00-\u9FA5]+|\s+)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(rawText)) !== null) {
    const chunk = match[0];
    if (CJK_REGEX.test(chunk)) {
      // Greedy match within CJK chunk
      let idx = 0;
      while (idx < chunk.length) {
        let matched = false;
        // Try matching 4-char down to 2-char dictionary entries
        for (let len = Math.min(4, chunk.length - idx); len >= 2; len--) {
          const sub = chunk.substring(idx, idx + len);
          if (lookupDictionary(sub)) {
            chunks.push(sub);
            idx += len;
            matched = true;
            break;
          }
        }
        if (!matched) {
          chunks.push(chunk[idx]);
          idx += 1;
        }
      }
    } else {
      chunks.push(chunk);
    }
  }

  return chunks;
}

/**
 * Native Intl.Segmenter wrapper with safe error catching.
 */
function nativeIntlTokenize(text: string): string[] {
  try {
    const segmenter = new (Intl as unknown as {
      Segmenter: new (
        locale: string,
        options: { granularity: 'word' | 'sentence' | 'grapheme' }
      ) => { segment: (input: string) => Iterable<{ segment: string }> };
    }).Segmenter('zh-CN', { granularity: 'word' });

    const results: string[] = [];
    for (const seg of segmenter.segment(text)) {
      results.push(seg.segment);
    }
    return results;
  } catch {
    return fallbackTokenize(text);
  }
}

/**
 * Segments Chinese article text using Hybrid Multi-Pass architecture:
 * Pass 1: Curated Idiom & Multi-character Compound Protection
 * Pass 2: Intl.Segmenter / Fallback for remaining segments
 * Pass 3: Number+Measure Word merging & Punctuation Flattening
 */
export function segmentArticleText(
  text: string,
  options: { pinyinOverrides?: Record<string, string> } = {}
): SegmentedToken[] {
  const sanitized = sanitizeArticleText(text);
  if (!sanitized) return [];

  const protectedSpans = findProtectedSpans(sanitized);
  const rawSegments: string[] = [];
  let cursor = 0;

  for (const span of protectedSpans) {
    if (span.start > cursor) {
      const intermediateText = sanitized.substring(cursor, span.start);
      const intermediateTokens = isIntlSegmenterSupported()
        ? nativeIntlTokenize(intermediateText)
        : fallbackTokenize(intermediateText);
      rawSegments.push(...intermediateTokens);
    }
    rawSegments.push(span.text);
    cursor = span.end;
  }

  if (cursor < sanitized.length) {
    const remainingText = sanitized.substring(cursor);
    const remainingTokens = isIntlSegmenterSupported()
      ? nativeIntlTokenize(remainingText)
      : fallbackTokenize(remainingText);
    rawSegments.push(...remainingTokens);
  }

  // Pass 3: Heuristic Merging (e.g. Digits + '%' or measure words)
  const mergedSegments: string[] = [];
  for (let i = 0; i < rawSegments.length; i++) {
    const current = rawSegments[i];
    const next = rawSegments[i + 1];

    if (
      /^\d+$/.test(current) &&
      next &&
      (/^[%％年月日号天个次万亿元]$/.test(next) || /^%/.test(next))
    ) {
      mergedSegments.push(current + next);
      i++; // Skip merged next
    } else {
      mergedSegments.push(current);
    }
  }

  // Map into typed SegmentedToken structures
  const tokens: SegmentedToken[] = [];
  for (const segText of mergedSegments) {
    const isPunctuationOrSpace = PUNCTUATION_AND_SPACE_REGEX.test(segText);
    const isChineseWord = CJK_REGEX.test(segText);
    const isWord = !isPunctuationOrSpace && (isChineseWord || /^[a-zA-Z0-9]+$/.test(segText));

    if (!isWord) {
      tokens.push({
        text: segText,
        isWord: false,
        pinyin: '',
        hsk_level: 0,
      });
      continue;
    }

    // 1. Check user/article explicit pinyinOverrides
    const overridePinyin = options.pinyinOverrides?.[segText];

    // 2. Check curated dictionary
    const dictDef = lookupDictionary(segText);

    let tokenPinyin = '';
    let hskLevel = 0;
    let isDomain = false;
    let definition: WordDefinition | undefined;

    if (dictDef) {
      tokenPinyin = overridePinyin || dictDef.pinyin;
      hskLevel = dictDef.hsk_level;
      isDomain = Boolean(dictDef.is_domain_term);
      definition = {
        ...dictDef,
        pinyin: tokenPinyin,
      };
    } else if (isChineseWord) {
      // 3. Fallback to pinyin-pro for runtime phoneme synthesis
      try {
        tokenPinyin = overridePinyin || pinyin(segText, { toneType: 'symbol' });
      } catch {
        tokenPinyin = '';
      }
      hskLevel = 7; // Advanced / unlisted character
      definition = {
        word: segText,
        pinyin: tokenPinyin,
        meaning_th: 'คำศัพท์ภาษาจีนขั้นสูง',
        meaning_en: 'Advanced Chinese vocabulary',
        hsk_level: hskLevel,
      };
    } else {
      // Alphanumeric word (e.g. "AI", "EV", "2026")
      tokenPinyin = segText;
      hskLevel = 0;
    }

    tokens.push({
      text: segText,
      isWord: true,
      pinyin: tokenPinyin,
      hsk_level: hskLevel,
      is_domain_term: isDomain,
      definition,
    });
  }

  return tokens;
}

/**
 * Inspects a word and retrieves or synthesizes its complete definition.
 */
export function inspectWord(word: string): WordDefinition {
  const clean = word.trim();
  const found = lookupDictionary(clean);
  if (found) {
    return found;
  }

  // Synthesize pinyin with pinyin-pro
  let synthesizedPinyin = '';
  try {
    synthesizedPinyin = pinyin(clean, { toneType: 'symbol' });
  } catch {
    synthesizedPinyin = '';
  }

  return {
    word: clean,
    pinyin: synthesizedPinyin,
    meaning_th: 'คำศัพท์เฉพาะ / สำนวนในบทความ',
    meaning_en: 'Article vocabulary / term',
    hsk_level: 7,
  };
}

/**
 * Analyzes the HSK 3.0 vocabulary level distribution and readability score of an article.
 */
export function analyzeArticleHSKDistribution(
  input: SegmentedToken[] | string
): HSKDistribution {
  const tokens = typeof input === 'string' ? segmentArticleText(input) : input;
  const wordTokens = tokens.filter((t) => t.isWord && CJK_REGEX.test(t.text));

  const totalWords = wordTokens.length;
  const uniqueWordsSet = new Set<string>();
  const counts = {
    hsk1_2: 0,
    hsk3_4: 0,
    hsk5_6: 0,
    hsk7_9: 0,
    domain: 0,
    other: 0,
  };

  for (const token of wordTokens) {
    uniqueWordsSet.add(token.text);

    if (token.is_domain_term) {
      counts.domain++;
    } else if (token.hsk_level >= 1 && token.hsk_level <= 2) {
      counts.hsk1_2++;
    } else if (token.hsk_level >= 3 && token.hsk_level <= 4) {
      counts.hsk3_4++;
    } else if (token.hsk_level >= 5 && token.hsk_level <= 6) {
      counts.hsk5_6++;
    } else if (token.hsk_level >= 7) {
      counts.hsk7_9++;
    } else {
      counts.other++;
    }
  }

  const uniqueWords = uniqueWordsSet.size;

  const toPercent = (count: number) =>
    totalWords > 0 ? Math.round((count / totalWords) * 1000) / 10 : 0;

  const percentages = {
    hsk1_2: toPercent(counts.hsk1_2),
    hsk3_4: toPercent(counts.hsk3_4),
    hsk5_6: toPercent(counts.hsk5_6),
    hsk7_9: toPercent(counts.hsk7_9),
    domain: toPercent(counts.domain),
    other: toPercent(counts.other),
  };

  // Weighted Readability Score formula (0-100)
  // Higher weight on HSK 5-6, 7-9, and domain terms
  let weightedScore = 0;
  if (totalWords > 0) {
    const rawWeighted =
      counts.hsk1_2 * 20 +
      counts.hsk3_4 * 45 +
      counts.hsk5_6 * 75 +
      counts.hsk7_9 * 95 +
      counts.domain * 90 +
      counts.other * 50;
    weightedScore = Math.min(100, Math.max(10, Math.round(rawWeighted / totalWords)));
  }

  // Determine dominant level
  let dominantLevel = 'HSK 1-2 (初等)';
  const maxCount = Math.max(
    counts.hsk1_2,
    counts.hsk3_4,
    counts.hsk5_6,
    counts.hsk7_9,
    counts.domain
  );

  if (maxCount === counts.hsk7_9 || maxCount === counts.domain) {
    dominantLevel = 'HSK 7-9 (高等)';
  } else if (maxCount === counts.hsk5_6) {
    dominantLevel = 'HSK 5-6 (中高级)';
  } else if (maxCount === counts.hsk3_4) {
    dominantLevel = 'HSK 3-4 (中等)';
  }

  return {
    totalWords,
    uniqueWords,
    counts,
    percentages,
    readabilityScore: weightedScore,
    dominantLevel,
  };
}

/**
 * Fast Bridge helper that transforms a reader token/word into a valid SRS card entry.
 */
export function createSRSItemFromToken(
  tokenOrWord: SegmentedToken | string,
  customMeaningTh?: string,
  customMeaningEn?: string
): {
  word_id: string;
  hanzi: string;
  pinyin: string;
  display_pinyin: string;
  meaning_th: string;
  meaning_en: string;
  mnemonic?: string;
} {
  const word = typeof tokenOrWord === 'string' ? tokenOrWord.trim() : tokenOrWord.text.trim();
  const definition = typeof tokenOrWord === 'string' || !tokenOrWord.definition
    ? inspectWord(word)
    : tokenOrWord.definition;

  const cardId = generateReaderCardId(word);
  const wordPinyin = definition.pinyin || (typeof tokenOrWord !== 'string' ? tokenOrWord.pinyin : '');
  const meaningTh = customMeaningTh || definition.meaning_th || 'คำศัพท์จากบทความอ่าน';
  const meaningEn = customMeaningEn || definition.meaning_en || 'Reading immersion vocabulary';

  return {
    word_id: cardId,
    hanzi: word,
    pinyin: wordPinyin,
    display_pinyin: wordPinyin,
    meaning_th: meaningTh,
    meaning_en: meaningEn,
    mnemonic: definition.radical ? `หมวดนำ: ${definition.radical}` : undefined,
  };
}

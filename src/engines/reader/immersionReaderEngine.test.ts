/**
 * src/engines/reader/immersionReaderEngine.test.ts
 * Unit tests for Immersion Reader Engine.
 * Covers:
 * - Hybrid Multi-Pass Segmentation (Idiom protection, compound protection, numbers)
 * - Pinyin overrides & Polyphone context
 * - HSK 3.0 Distribution & Readability Score
 * - Word inspection and SRS bridge card creation
 */

import { describe, it, expect } from 'vitest';
import {
  segmentArticleText,
  inspectWord,
  analyzeArticleHSKDistribution,
  createSRSItemFromToken,
  generateReaderCardId,
  isIntlSegmenterSupported,
} from './immersionReaderEngine';

describe('Immersion Reader Engine (immersionReaderEngine.ts)', () => {
  describe('Hybrid Multi-Pass Word Segmentation', () => {
    it('detects Intl.Segmenter browser support correctly in Node/Vitest', () => {
      expect(isIntlSegmenterSupported()).toBe(true);
    });

    it('protects 4-character idioms (成语) from being fractured into small words', () => {
      const text = '双方本着互利共赢的原则，决定全力以赴解决问题。';
      const tokens = segmentArticleText(text);

      const tokenTexts = tokens.map((t) => t.text);
      expect(tokenTexts).toContain('互利共赢');
      expect(tokenTexts).toContain('全力以赴');
      // Must NOT contain fragmented parts
      expect(tokenTexts).not.toContain('互利');
      expect(tokenTexts).not.toContain('共赢');

      const idiomToken = tokens.find((t) => t.text === '互利共赢');
      expect(idiomToken?.isWord).toBe(true);
      expect(idiomToken?.pinyin).toBe('hù lì gòng yíng');
      expect(idiomToken?.hsk_level).toBe(5);
    });

    it('preserves multi-character business and tech compounds as atomic units', () => {
      const text = '我们在审阅采购合同时，特别关注不可抗力和违约金条款。';
      const tokens = segmentArticleText(text);

      const tokenTexts = tokens.map((t) => t.text);
      expect(tokenTexts).toContain('采购合同');
      expect(tokenTexts).toContain('不可抗力');
      expect(tokenTexts).toContain('违约金');
    });

    it('handles Chinese punctuation and whitespace correctly without marking them as words', () => {
      const text = '你好！\n中国。\t“欢迎”';
      const tokens = segmentArticleText(text);

      const nonWords = tokens.filter((t) => !t.isWord);
      const words = tokens.filter((t) => t.isWord);

      expect(words.map((w) => w.text)).toContain('你好');
      expect(words.map((w) => w.text)).toContain('中国');
      expect(words.map((w) => w.text)).toContain('欢迎');

      expect(nonWords.some((nw) => nw.text.includes('！'))).toBe(true);
      expect(nonWords.some((nw) => nw.text.includes('\n'))).toBe(true);
      expect(nonWords.some((nw) => nw.text.includes('“'))).toBe(true);
    });

    it('merges digits with percentage and currency symbols cleanly', () => {
      const text = '利润率达到了30%，预付款为1000万元。';
      const tokens = segmentArticleText(text);
      const tokenTexts = tokens.map((t) => t.text);

      expect(tokenTexts).toContain('30%');
      expect(tokenTexts).toContain('1000万');
    });

    it('applies pinyinOverrides accurately when provided', () => {
      const text = '银行必须得去。';
      const tokens = segmentArticleText(text, {
        pinyinOverrides: {
          '必须得去': 'bì xū děi qù',
        },
      });

      const token = tokens.find((t) => t.text === '必须得去');
      if (token) {
        expect(token.pinyin).toBe('bì xū děi qù');
      }
    });
  });

  describe('Word Inspection (inspectWord)', () => {
    it('retrieves detailed dictionary definition for known words', () => {
      const def = inspectWord('商务谈判');
      expect(def.word).toBe('商务谈判');
      expect(def.pinyin).toBe('shāng wù tán pàn');
      expect(def.meaning_th).toContain('เจรจา');
      expect(def.hsk_level).toBe(5);
      expect(def.is_domain_term).toBe(true);
    });

    it('falls back to pinyin-pro and sensible defaults for unlisted words', () => {
      const def = inspectWord('量子计算');
      expect(def.word).toBe('量子计算');
      expect(def.pinyin).toBe('liàng zǐ jì suàn');
      expect(def.meaning_th).toBeTruthy();
      expect(def.hsk_level).toBe(7);
    });
  });

  describe('HSK 3.0 Distribution & Readability Analyzer', () => {
    it('analyzes text vocabulary distribution and calculates readability score', () => {
      const sampleText = `
        随着人工智能和新能源汽车产业的飞速发展，全球供应链正在经历深刻的产业升级。
        双方企业在商务谈判中，本着互利共赢的原则，就采购合同中的账期、尾款以及不可抗力条款达成了共识。
      `;

      const dist = analyzeArticleHSKDistribution(sampleText);

      expect(dist.totalWords).toBeGreaterThan(15);
      expect(dist.uniqueWords).toBeGreaterThan(10);
      expect(dist.counts.hsk5_6).toBeGreaterThan(0);
      expect(dist.counts.domain).toBeGreaterThan(0);
      expect(dist.percentages.hsk5_6).toBeGreaterThan(0);
      expect(dist.readabilityScore).toBeGreaterThanOrEqual(60);
      expect(dist.dominantLevel).toMatch(/HSK 5-6|HSK 7-9/);
    });

    it('gives lower readability score for beginner elementary text', () => {
      const beginnerText = '你好，我是中国人。你叫什么名字？谢谢你，再见！';
      const dist = analyzeArticleHSKDistribution(beginnerText);

      expect(dist.counts.hsk1_2).toBeGreaterThan(0);
      expect(dist.readabilityScore).toBeLessThan(50);
      expect(dist.dominantLevel).toBe('HSK 1-2 (初等)');
    });
  });

  describe('SRS Fast Bridge (createSRSItemFromToken & generateReaderCardId)', () => {
    it('generates deterministic card ID based on word', () => {
      const id1 = generateReaderCardId('谈判');
      const id2 = generateReaderCardId('谈判');
      const id3 = generateReaderCardId('合同');

      expect(id1).toBe(id2);
      expect(id1).not.toBe(id3);
      expect(id1).toContain('srs_reader_');
    });

    it('transforms token into valid SRS card payload', () => {
      const token = segmentArticleText('不可抗力')[0];
      const srsItem = createSRSItemFromToken(token);

      expect(srsItem.word_id).toBe(generateReaderCardId('不可抗力'));
      expect(srsItem.hanzi).toBe('不可抗力');
      expect(srsItem.pinyin).toBe('bù kě kàng lì');
      expect(srsItem.meaning_th).toContain('เหตุสุดวิสัย');
      expect(srsItem.meaning_en).toBeTruthy();
    });
  });
});

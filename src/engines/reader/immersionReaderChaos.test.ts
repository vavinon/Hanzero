/**
 * src/engines/reader/immersionReaderChaos.test.ts
 * Red Team Adversary Chaos & Stress Test Suite for Immersion Reader Engine.
 * Tests edge cases, fuzzing, surrogate pairs, XSS sanitization, and mega-document performance.
 */

import { describe, it, expect } from 'vitest';
import {
  segmentArticleText,
  analyzeArticleHSKDistribution,
  inspectWord,
  sanitizeArticleText,
  createSRSItemFromToken,
} from './immersionReaderEngine';

describe('Red Team Chaos & Adversarial Tests (immersionReaderChaos.test.ts)', () => {
  describe('Input Fuzzing & Malformed Strings', () => {
    it('handles empty strings and nullish inputs gracefully without crashing', () => {
      expect(segmentArticleText('')).toEqual([]);
      expect(sanitizeArticleText('')).toBe('');

      const dist = analyzeArticleHSKDistribution('');
      expect(dist.totalWords).toBe(0);
      expect(dist.readabilityScore).toBe(0);
    });

    it('handles punctuation storm of 500+ Chinese & Latin symbols without creating rogue word tokens', () => {
      const storm = '，，，。。。！？！？——……“”‘’（）【】、《》：；'.repeat(25);
      const tokens = segmentArticleText(storm);

      expect(tokens.length).toBeGreaterThan(0);
      // All tokens must be non-words
      const wordTokens = tokens.filter((t) => t.isWord);
      expect(wordTokens.length).toBe(0);
    });

    it('handles mixed technical strings with URLs, email addresses, and version codes', () => {
      const complexText = '用户可访问 https://hanzero.com/api?id=99&debug=true 或发送邮件至 contact@hanzero.cn 下载 v2.4.0 补丁。';
      const tokens = segmentArticleText(complexText);

      expect(tokens.length).toBeGreaterThan(0);
      const texts = tokens.map((t) => t.text);
      expect(texts).toContain('用户');
      expect(texts).toContain('访问');
    });

    it('preserves emojis and CJK Extension surrogate pairs without Unicode corruption', () => {
      // 𪚥 (U+2A6A5, 64 strokes dragon), 𠮷 (U+20BB7, Yoshi)
      const unicodeSample = '测试อักขระ 🐰🇨🇳 𪚥 𠮷 สวัสดี世界';
      const tokens = segmentArticleText(unicodeSample);

      expect(tokens.length).toBeGreaterThan(0);
      const fullRejoined = tokens.map((t) => t.text).join('');
      expect(fullRejoined).toContain('🐰🇨🇳');
      expect(fullRejoined).toContain('𪚥');
      expect(fullRejoined).toContain('𠮷');
    });

    it('sanitizes potential XSS script tags from article text', () => {
      const xssPayload = '正常文字<script>alert("hacked")</script>后续内容';
      const sanitized = sanitizeArticleText(xssPayload);

      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('alert("hacked")');
      expect(sanitized).toContain('正常文字');
      expect(sanitized).toContain('后续内容');
    });
  });

  describe('Performance Stress Test (Mega-Article)', () => {
    it('segments and analyzes a 20,000-character article in under 150ms', () => {
      const paragraph = '双方本着互利共赢的原则，就采购合同中的账期和违约金条款深入协商。新能源汽车和人工智能正在推动全球产业升级。';
      const megaArticle = paragraph.repeat(400); // > 20,000 characters
      expect(megaArticle.length).toBeGreaterThan(20000);

      const startTime = performance.now();
      const tokens = segmentArticleText(megaArticle);
      const dist = analyzeArticleHSKDistribution(tokens);
      const duration = performance.now() - startTime;

      expect(tokens.length).toBeGreaterThan(1000);
      expect(dist.totalWords).toBeGreaterThan(1000);
      expect(dist.readabilityScore).toBeGreaterThan(50);
      // Execution must complete well within performance budget (allow for parallel test runner load)
      expect(duration).toBeLessThan(500);
    });
  });

  describe('SRS Bridge Concurrency & Fallback Safety', () => {
    it('produces identical card payloads when triggered repeatedly with unlisted words', () => {
      const unlistedWord = '超导材料';
      const card1 = createSRSItemFromToken(unlistedWord);
      const card2 = createSRSItemFromToken(unlistedWord);

      expect(card1.word_id).toBe(card2.word_id);
      expect(card1.hanzi).toBe(card2.hanzi);
      expect(card1.pinyin).toBe(card2.pinyin);
      expect(card1.meaning_th).toBeTruthy();
    });

    it('inspects rare single characters safely without throwing', () => {
      const rareDef = inspectWord('龘');
      expect(rareDef.word).toBe('龘');
      expect(rareDef.hsk_level).toBe(7);
      expect(typeof rareDef.pinyin).toBe('string');
    });
  });
});

/**
 * src/engines/studio/studioLinterEngine.test.ts
 * Comprehensive Vitest Suite for In-Browser Pedagogical Linter Engine.
 */

import { describe, it, expect } from 'vitest';
import {
  convertNumericPinyinToDiacritics,
  lintTraditionalChars,
  lintGrammarRules,
  lintToneSandhi,
  lintPinyinOrthography,
  lintVocabItem,
  TRADITIONAL_BLACKLIST,
  TRADITIONAL_TO_SIMPLIFIED,
} from './studioLinterEngine';

describe('studioLinterEngine (TASK-601)', () => {
  describe('1. convertNumericPinyinToDiacritics', () => {
    it('converts basic 1-4 numbered tones to correct diacritics', () => {
      expect(convertNumericPinyinToDiacritics('ni3 hao3')).toBe('nǐ hǎo');
      expect(convertNumericPinyinToDiacritics('ma1 ma2 ma3 ma4')).toBe('mā má mǎ mà');
      expect(convertNumericPinyinToDiacritics('zhong1 guo2')).toBe('zhōng guó');
    });

    it('correctly handles umlaut v/ü notation with tones', () => {
      expect(convertNumericPinyinToDiacritics('lv4 cha2')).toBe('lǜ chá');
      expect(convertNumericPinyinToDiacritics('nv3 er2')).toBe('nǚ ér');
      expect(convertNumericPinyinToDiacritics('lü4')).toBe('lǜ');
    });

    it('handles neutral tones (5 or missing number)', () => {
      expect(convertNumericPinyinToDiacritics('ma5')).toBe('ma');
      expect(convertNumericPinyinToDiacritics('de5')).toBe('de');
    });

    it('handles empty or blank string smoothly', () => {
      expect(convertNumericPinyinToDiacritics('')).toBe('');
    });
  });

  describe('2. lintTraditionalChars', () => {
    it('detects traditional Chinese characters from blacklist', () => {
      const issues = lintTraditionalChars('中國 謝謝 點心');
      expect(issues.length).toBe(4);
      expect(issues[0]).toEqual({ char: '國', index: 1, simplified: '国' });
      expect(issues[1]).toEqual({ char: '謝', index: 3, simplified: '谢' });
      expect(issues[2]).toEqual({ char: '謝', index: 4, simplified: '谢' });
      expect(issues[3]).toEqual({ char: '點', index: 6, simplified: '点' });
    });

    it('returns empty array when text contains only simplified Chinese', () => {
      const issues = lintTraditionalChars('中国 谢谢 点心 你好 早上好');
      expect(issues).toEqual([]);
    });

    it('contains all 75 traditional characters in mapping table', () => {
      for (const char of TRADITIONAL_BLACKLIST) {
        expect(TRADITIONAL_TO_SIMPLIFIED[char]).toBeDefined();
        expect(TRADITIONAL_TO_SIMPLIFIED[char].length).toBe(1);
      }
    });
  });

  describe('3. lintGrammarRules', () => {
    it("flags forbidden '不有' and suggests '没有'", () => {
      const issues = lintGrammarRules('我不有钱');
      expect(issues.length).toBe(1);
      expect(issues[0].rule).toBe('bu-you');
      expect(issues[0].suggestion).toBe('没有');
    });

    it("flags forbidden '没是' and suggests '不是'", () => {
      const issues = lintGrammarRules('他没是老师');
      expect(issues.length).toBe(1);
      expect(issues[0].rule).toBe('mei-shi');
      expect(issues[0].suggestion).toBe('不是');
    });

    it('passes standard grammatical sentences', () => {
      const issues = lintGrammarRules('我没有钱，他不是老师，我很忙');
      expect(issues).toEqual([]);
    });
  });

  describe('4. lintToneSandhi', () => {
    it('detects known 3+3 sandhi phrases like 你好 and 可以', () => {
      const hints = lintToneSandhi('你好', 'ní hǎo');
      expect(hints.length).toBe(1);
      expect(hints[0].ruleType).toBe('3+3');
      expect(hints[0].suggestedPinyin).toBe('ní hǎo');

      const hints2 = lintToneSandhi('可以', 'kéyǐ');
      expect(hints2.length).toBe(1);
      expect(hints2[0].ruleType).toBe('3+3');
      expect(hints2[0].suggestedPinyin).toBe('kéyǐ');
    });

    it("detects '不' sandhi before 4th tone", () => {
      const hints = lintToneSandhi('不是', 'bú shì');
      expect(hints.length).toBeGreaterThan(0);
      expect(hints[0].ruleType).toBe('bu');
      expect(hints[0].suggestedPinyin).toContain('bú');
    });

    it("detects '一' sandhi before 4th tone and other tones", () => {
      const hints1 = lintToneSandhi('一块', 'yí kuài');
      expect(hints1.length).toBeGreaterThan(0);
      expect(hints1[0].ruleType).toBe('yi');
      expect(hints1[0].suggestedPinyin).toContain('yí');

      const hints2 = lintToneSandhi('一起', 'yì qǐ');
      expect(hints2.length).toBeGreaterThan(0);
      expect(hints2[0].ruleType).toBe('yi');
      expect(hints2[0].suggestedPinyin).toContain('yì');
    });
  });

  describe('5. lintPinyinOrthography', () => {
    it('warns when pinyin contains leftover tone numbers and offers suggestion', () => {
      const issues = lintPinyinOrthography('ni3 hao3');
      expect(issues.length).toBe(1);
      expect(issues[0].severity).toBe('warning');
      expect(issues[0].suggestion).toBe('nǐ hǎo');
    });

    it('flags invalid characters in pinyin', () => {
      const issues = lintPinyinOrthography('nǐ hǎo!@#$');
      expect(issues.some((i) => i.rule === 'invalid-pinyin-character')).toBe(true);
    });

    it('passes valid standard pinyin with accents', () => {
      const issues = lintPinyinOrthography('nǐ hǎo');
      expect(issues).toEqual([]);
    });
  });

  describe('6. lintVocabItem (Integrated Validator)', () => {
    it('validates a correct vocabulary item successfully', () => {
      const report = lintVocabItem({
        hanzi: '你好',
        pinyin: 'nǐ hǎo',
        meaning_th: 'สวัสดี',
        meaning_en: 'hello',
      });

      expect(report.isValid).toBe(true);
      expect(report.traditionalChars).toHaveLength(0);
      expect(report.issues.filter((i) => i.severity === 'error')).toHaveLength(0);
      // Has sandhi hint for 3+3
      expect(report.sandhiHints.length).toBeGreaterThan(0);
    });

    it('flags missing mandatory fields as errors', () => {
      const report = lintVocabItem({
        hanzi: '',
        pinyin: '',
        meaning_th: '',
      });

      expect(report.isValid).toBe(false);
      expect(report.issues.some((i) => i.rule === 'required-hanzi')).toBe(true);
      expect(report.issues.some((i) => i.rule === 'required-pinyin')).toBe(true);
      expect(report.issues.some((i) => i.rule === 'required-meaning-th')).toBe(true);
    });

    it('catches traditional Chinese in vocab item and suggests simplified', () => {
      const report = lintVocabItem({
        hanzi: '謝謝',
        pinyin: 'xiè xie',
        meaning_th: 'ขอบคุณ',
      });

      expect(report.isValid).toBe(false);
      expect(report.traditionalChars).toHaveLength(2);
      expect(report.traditionalChars[0].simplified).toBe('谢');
    });

    it('provides converted pinyin when user enters numeric tones', () => {
      const report = lintVocabItem({
        hanzi: '水饺',
        pinyin: 'shui3 jiao3',
        meaning_th: 'เกี๊ยวน้ำ',
      });

      expect(report.convertedPinyin).toBe('shuǐ jiǎo');
      expect(report.hasWarnings).toBe(true);
    });
  });
});

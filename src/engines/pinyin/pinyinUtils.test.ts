import { describe, it, expect } from 'vitest';
import {
  toneNumberToMark,
  stripToneMarks,
  getSyllableTone,
  applyToneSandhi,
} from './pinyinUtils';

describe('Pinyin Engine Utilities (src/engines/pinyin/pinyinUtils.ts)', () => {
  describe('toneNumberToMark()', () => {
    it('converts basic 4 tones for single vowels correctly', () => {
      expect(toneNumberToMark('ma1')).toBe('mā');
      expect(toneNumberToMark('ma2')).toBe('má');
      expect(toneNumberToMark('ma3')).toBe('mǎ');
      expect(toneNumberToMark('ma4')).toBe('mà');
      expect(toneNumberToMark('ma5')).toBe('ma');
    });

    it('places tone mark on a or e according to pinyin rules', () => {
      expect(toneNumberToMark('hao3')).toBe('hǎo');
      expect(toneNumberToMark('xie4')).toBe('xiè');
      expect(toneNumberToMark('tian1')).toBe('tiān');
    });

    it('places tone mark on o in ou diphthong', () => {
      expect(toneNumberToMark('dou1')).toBe('dōu');
      expect(toneNumberToMark('kou3')).toBe('kǒu');
    });

    it('places tone mark on last vowel for iu and ui', () => {
      expect(toneNumberToMark('liu2')).toBe('liú');
      expect(toneNumberToMark('jiu3')).toBe('jiǔ');
      expect(toneNumberToMark('gui3')).toBe('guǐ');
      expect(toneNumberToMark('dui4')).toBe('duì');
    });

    it('handles umlaut ü (v notation)', () => {
      expect(toneNumberToMark('nv3')).toBe('nǚ');
      expect(toneNumberToMark('lv4')).toBe('lǜ');
    });

    it('converts full sentences with numbers', () => {
      expect(toneNumberToMark('ni3 hao3')).toBe('nǐ hǎo');
      expect(toneNumberToMark('wo3 hen3 hao3')).toBe('wǒ hěn hǎo');
    });
  });

  describe('stripToneMarks()', () => {
    it('strips all tone diacritics into plain Latin characters', () => {
      expect(stripToneMarks('nǐ hǎo')).toBe('ni hao');
      expect(stripToneMarks('Xièxie!')).toBe('Xiexie!');
      expect(stripToneMarks('lǜ sè')).toBe('lü se');
    });
  });

  describe('getSyllableTone()', () => {
    it('identifies tone from diacritics', () => {
      expect(getSyllableTone('mā')).toBe(1);
      expect(getSyllableTone('má')).toBe(2);
      expect(getSyllableTone('mǎ')).toBe(3);
      expect(getSyllableTone('mà')).toBe(4);
      expect(getSyllableTone('ma')).toBe(5);
    });

    it('identifies tone from numeric suffix', () => {
      expect(getSyllableTone('hao3')).toBe(3);
      expect(getSyllableTone('shi4')).toBe(4);
    });
  });

  describe('applyToneSandhi()', () => {
    it('applies 3+3 -> 2+3 Sandhi to known pairs', () => {
      const res1 = applyToneSandhi('你好', 'nǐ hǎo');
      expect(res1.displayPinyin).toBe('ní hǎo');
      expect(res1.ruleApplied).toBe('3+3');

      const res2 = applyToneSandhi('可以', 'kěyǐ');
      expect(res2.displayPinyin).toBe('kéyǐ');
      expect(res2.ruleApplied).toBe('3+3');
    });

    it('applies 不 (bù) Sandhi before 4th tone -> bú', () => {
      const res1 = applyToneSandhi('不是', 'bù shì');
      expect(res1.displayPinyin).toBe('bú shì');
      expect(res1.ruleApplied).toBe('bu_before_4');

      const res2 = applyToneSandhi('不客气', 'bù kèqi');
      expect(res2.displayPinyin).toBe('bú kèqi');
      expect(res2.ruleApplied).toBe('bu_before_4');
    });

    it('keeps 不 as bù before non-4th tones', () => {
      const res = applyToneSandhi('不好', 'bù hǎo');
      expect(res.displayPinyin).toBe('bù hǎo');
      expect(res.ruleApplied).toBeUndefined();
    });

    it('applies A-不-A neutral tone sandhi', () => {
      const res = applyToneSandhi('好不好', 'hǎo bù hǎo');
      expect(res.displayPinyin).toBe('hǎo bu hǎo');
      expect(res.ruleApplied).toBe('bu_neutral');
    });

    it('applies 一 (yī) Sandhi before 4th tone -> yí', () => {
      const res = applyToneSandhi('一块', 'yī kuài');
      expect(res.displayPinyin).toBe('yí kuài');
      expect(res.ruleApplied).toBe('yi_before_4');
    });

    it('applies 一 (yī) Sandhi before 1/2/3 tones -> yì', () => {
      const res1 = applyToneSandhi('一天', 'yī tiān');
      expect(res1.displayPinyin).toBe('yì tiān');
      expect(res1.ruleApplied).toBe('yi_before_123');

      const res2 = applyToneSandhi('一年', 'yī nián');
      expect(res2.displayPinyin).toBe('yì nián');
      expect(res2.ruleApplied).toBe('yi_before_123');
    });

    it('keeps 一 as yī for standalone numbers, dates, and ordinals', () => {
      const resOrdinal = applyToneSandhi('第一', 'dì-yī');
      expect(resOrdinal.displayPinyin).toBe('dì-yī');

      const resDate = applyToneSandhi('星期一', 'xīngqīyī');
      expect(resDate.displayPinyin).toBe('xīngqīyī');
    });
  });
});

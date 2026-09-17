import { describe, it, expect } from 'vitest';
import curriculumManifest from '../../data/lessons/curriculum_manifest.json';
import unit01Greetings from '../../data/lessons/tier1/unit01_greetings.json';

describe('🐰 Hanzero Sanity & Curriculum Verification Suite', () => {
  it('should load curriculum manifest with correct version and tier structure', () => {
    expect(curriculumManifest).toBeDefined();
    expect(curriculumManifest.project).toBe('Hanzero');
    expect(curriculumManifest.version).toBe('1.0.0');
    expect(curriculumManifest.total_tiers).toBe(5);

    const tier0 = curriculumManifest.tiers.find((t) => t.tier_id === 'tier0');
    const tier1 = curriculumManifest.tiers.find((t) => t.tier_id === 'tier1');

    expect(tier0).toBeDefined();
    expect(tier0?.total_units).toBe(10);
    expect(tier1).toBeDefined();
    expect(tier1?.total_units).toBe(10);
  });

  it('should accurately verify Tone Sandhi rule logic: 3+3 becomes 2+3 for 你好 and 不 before 4th tone', () => {
    // 1. Third tone sandhi: 3 + 3 -> 2 + 3
    function applyThirdToneSandhi(tone1: number, tone2: number): number {
      return tone1 === 3 && tone2 === 3 ? 2 : tone1;
    }

    expect(applyThirdToneSandhi(3, 3)).toBe(2);
    expect(applyThirdToneSandhi(1, 3)).toBe(1);
    expect(applyThirdToneSandhi(4, 3)).toBe(4);

    // 2. Bu sandhi: bù (4) becomes bú (2) when followed by 4th tone (e.g. 不是 bú shì, 不客气 bú kèqi)
    function applyBuSandhi(nextTone: number): number {
      return nextTone === 4 ? 2 : 4;
    }

    expect(applyBuSandhi(4)).toBe(2); // bú kèqi
    expect(applyBuSandhi(1)).toBe(4); // bù gāo
    expect(applyBuSandhi(2)).toBe(4); // bù lái
    expect(applyBuSandhi(3)).toBe(4); // bù hǎo
  });

  it('should verify Unit 1 Greetings vocabulary has complete pedagogical fields without nulls', () => {
    expect(unit01Greetings).toBeDefined();
    expect(unit01Greetings.unit_id).toBe('tier1_u01');
    expect(unit01Greetings.lessons.length).toBeGreaterThan(0);

    const firstLesson = unit01Greetings.lessons[0];
    expect(firstLesson.vocabulary.length).toBeGreaterThanOrEqual(3);

    for (const vocab of firstLesson.vocabulary) {
      expect(vocab.hanzi).toBeTruthy();
      expect(vocab.pinyin).toBeTruthy();
      expect(vocab.pinyin_tone).toBeTruthy();
      expect(vocab.meaning_th).toBeTruthy();
      expect(vocab.meaning_en).toBeTruthy();
      expect(vocab.radical).toBeTruthy();
      expect(typeof vocab.stroke_count).toBe('number');
      expect(vocab.stroke_count).toBeGreaterThan(0);
    }
  });
});

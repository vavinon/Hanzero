import { describe, it, expect } from 'vitest';
import {
  getAllIdioms,
  searchIdioms,
  getAllDilemmas,
  evaluateDilemmaChoice,
  compareIdiomNuance,
  createSRSItemFromIdiom,
} from './idiomLoreEngine';

describe('Red Team Chaos & Adversarial Fuzzing - Idiom Lore & Dilemma Engine', () => {
  it('fuzzes evaluateDilemmaChoice with malformed, empty, and malicious inputs without crashing', () => {
    const all = getAllDilemmas();
    expect(all.length).toBeGreaterThan(0);
    const validDilemmaId = all[0].dilemma.id;

    const weirdInputs = [
      '',
      '   ',
      '!@#$%^&*()_+',
      '<script>alert(1)</script>',
      "'; DROP TABLE idioms; --",
      '🔥🐰📜',
      'a'.repeat(5000),
      '\n\r\t',
      'non_existent_idiom_xyz',
    ];

    for (const input of weirdInputs) {
      const result = evaluateDilemmaChoice(validDilemmaId, input);
      expect(result).toBeDefined();
      expect(result.isOptimal).toBe(false);
      expect(result.scoreAwarded).toBe(0);
      expect(result.chosenChoice).toBeDefined();
      expect(typeof result.feedbackTh).toBe('string');
      expect(typeof result.pedagogicalAnalysisTh).toBe('string');
    }
  });

  it('fuzzes searchIdioms with edge-case characters and large payloads', () => {
    const weirdSearches = [
      '',
      '   ',
      '??***',
      '\\',
      '[a-z]+',
      '破釜',
      '12345',
      '中文',
      'ฉิน',
      'สู้ตาย',
      'a'.repeat(2000),
      '🚀💥🔥',
    ];

    for (const q of weirdSearches) {
      expect(() => searchIdioms(q)).not.toThrow();
      const res = searchIdioms(q);
      expect(Array.isArray(res)).toBe(true);
    }
  });

  it('guarantees each dilemma has EXACTLY one optimal choice (no dilemma is unwinnable or multi-optimal)', () => {
    const all = getAllDilemmas();
    for (const item of all) {
      const optimalChoices = item.dilemma.choices.filter((c) => c.isOptimal);
      expect(
        optimalChoices.length,
        `Dilemma '${item.dilemma.id}' must have exactly 1 optimal choice, but found ${optimalChoices.length}`
      ).toBe(1);

      // Score deltas must be valid
      for (const choice of item.dilemma.choices) {
        if (choice.isOptimal) {
          expect(choice.scoreDelta).toBeGreaterThanOrEqual(25);
          expect(choice.outcomeType).toBe('optimal');
        } else if (choice.nuanceTrap) {
          expect(choice.scoreDelta).toBeGreaterThan(0);
          expect(choice.scoreDelta).toBeLessThan(30); // Partial score less than optimal 30
          expect(choice.outcomeType).toBe('suboptimal');
        } else {
          expect(choice.scoreDelta).toBe(0);
          expect(choice.outcomeType).toBe('misguided');
        }
      }
    }
  });

  it('stress tests compareIdiomNuance against symmetric pairs and non-existent IDs', () => {
    const pfc = 'idiom-pofuchenzhou';
    const bsyz = 'idiom-beishuiyizhan';

    // A to B
    const ab = compareIdiomNuance(pfc, bsyz);
    expect(ab).not.toBeNull();
    expect(ab?.distinctionTh).toBeTruthy();
    // B to A (symmetric check)
    const ba = compareIdiomNuance(bsyz, pfc);
    expect(ba).not.toBeNull();
    expect(ba?.distinctionTh).toBeTruthy();

    // Non-existent vs existent
    expect(compareIdiomNuance('fake_id_1', 'fake_id_2')).toBeNull();
    expect(compareIdiomNuance('', pfc)).toBeNull();
  });

  it('benchmarks search performance across 1,000 queries under 150ms', () => {
    const queries = ['破', 'pò', 'ทุบหม้อ', 'กลยุทธ์', 'ฉิน', 'ม้า', 'กบ', 'สู้', 'hsk6', 'nonexistent'];
    const startTime = performance.now();

    for (let i = 0; i < 1000; i++) {
      const q = queries[i % queries.length];
      searchIdioms(q);
    }

    const elapsed = performance.now() - startTime;
    expect(elapsed).toBeLessThan(150); // Must be sub-150ms for 1000 searches
  });

  it('verifies memory stability and deterministic SRS generation across all 20 idioms', () => {
    const all = getAllIdioms();
    for (const idiom of all) {
      const srs1 = createSRSItemFromIdiom(idiom);
      const srs2 = createSRSItemFromIdiom(idiom);
      expect(srs1).toEqual(srs2);
      expect(srs1.word_id.startsWith('idiom_')).toBe(true);
      expect(srs1.hanzi).toBe(idiom.idiom);
      expect(srs1.pinyin).toBe(idiom.pinyin);
      expect(srs1.mnemonic).toContain(idiom.historicalOrigin.sourceBook);
    }
  });
});

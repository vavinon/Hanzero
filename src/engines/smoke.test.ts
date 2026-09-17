import { describe, it, expect } from 'vitest';
import curriculumManifest from '../../data/lessons/curriculum_manifest.json';

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

  it('should accurately verify Tone Sandhi rule logic: 3+3 becomes 2+3 for 你好', () => {
    // Pure logic simulation of tone sandhi
    function applyToneSandhi(firstTone: number, secondTone: number): number {
      if (firstTone === 3 && secondTone === 3) {
        return 2; // First 3rd tone changes to 2nd tone
      }
      return firstTone;
    }

    expect(applyToneSandhi(3, 3)).toBe(2);
    expect(applyToneSandhi(1, 3)).toBe(1);
    expect(applyToneSandhi(4, 3)).toBe(4);
  });
});

import { describe, it, expect } from 'vitest';
import {
  calculateRelativeLuminance,
  calculateContrastRatio,
  getWcagCompliance,
  RICE_PAPER_HEX,
  HANZERO_PALETTE_TOKENS,
  DUAL_ENCODED_TONES,
  TONE_SANDHI_RULES,
} from './diagnostics';

describe('🔬 Hanzero Diagnostics & Accessibility Suite (Slice 1.5)', () => {
  describe('Mathematical WCAG 2.1 Contrast Ratio Verification', () => {
    it('should correctly calculate relative luminance for pure black and white', () => {
      const lumBlack = calculateRelativeLuminance('#000000');
      const lumWhite = calculateRelativeLuminance('#FFFFFF');

      expect(lumBlack).toBe(0);
      expect(lumWhite).toBeCloseTo(1.0, 4);

      const ratio = calculateContrastRatio('#000000', '#FFFFFF');
      expect(ratio).toBe(21); // Maximum possible contrast ratio
    });

    it('should confirm Pine Soot Ink (#1C1E21) on Rice Paper (#FBF9F5) meets WCAG AAA (>= 7:1)', () => {
      const ratio = calculateContrastRatio('#1C1E21', RICE_PAPER_HEX);
      expect(ratio).toBeGreaterThanOrEqual(13.0); // Extremely crisp and readable

      const compliance = getWcagCompliance(ratio);
      expect(compliance.aaa).toBe(true);
      expect(compliance.aa).toBe(true);
      expect(compliance.level).toBe('AAA');
    });

    it('should confirm Text-Safe Dark Jade (#047857) on Rice Paper meets WCAG AA (>= 4.5:1)', () => {
      const ratio = calculateContrastRatio('#047857', RICE_PAPER_HEX);
      expect(ratio).toBeGreaterThanOrEqual(4.5);

      const compliance = getWcagCompliance(ratio);
      expect(compliance.aa).toBe(true);
      expect(compliance.level).toMatch(/AA/);
    });

    it('should confirm Text-Safe Dark Ochre (#B45309) on Rice Paper meets WCAG AA (>= 4.5:1)', () => {
      const ratio = calculateContrastRatio('#B45309', RICE_PAPER_HEX);
      expect(ratio).toBeGreaterThanOrEqual(4.5);

      const compliance = getWcagCompliance(ratio);
      expect(compliance.aa).toBe(true);
      expect(compliance.level).toMatch(/AA/);
    });

    it('should accurately categorize AAA, AA, AA Large, and FAIL levels', () => {
      expect(getWcagCompliance(8.5).level).toBe('AAA');
      expect(getWcagCompliance(5.2).level).toBe('AA');
      expect(getWcagCompliance(3.8).level).toBe('AA Large');
      expect(getWcagCompliance(2.1).level).toBe('FAIL');
    });

    it('should verify all main palette tokens have valid hex codes and names', () => {
      for (const token of HANZERO_PALETTE_TOKENS) {
        expect(token.name).toBeTruthy();
        expect(token.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
        const ratio = calculateContrastRatio(token.hex, RICE_PAPER_HEX);
        expect(ratio).toBeGreaterThan(1.0);
      }
    });
  });

  describe('Accessible Dual-Encoded Tones Verification', () => {
    it('should define all 4 standard Mandarin tones + neutral tone with distinct shapes and colors', () => {
      expect(DUAL_ENCODED_TONES).toHaveLength(5);

      const tones = DUAL_ENCODED_TONES.map((t) => t.tone);
      expect(tones).toEqual([1, 2, 3, 4, 0]);

      // Verify each tone has a distinct geometric symbol (accessible for color blindness)
      const symbols = new Set(DUAL_ENCODED_TONES.map((t) => t.symbol));
      expect(symbols.size).toBe(5);

      // Verify Chao 5-scale naming
      expect(DUAL_ENCODED_TONES[0].nameZh).toContain('55');
      expect(DUAL_ENCODED_TONES[1].nameZh).toContain('35');
      expect(DUAL_ENCODED_TONES[2].nameZh).toContain('214');
      expect(DUAL_ENCODED_TONES[3].nameZh).toContain('51');

      // Verify example characters
      expect(DUAL_ENCODED_TONES[0].exampleChar).toBe('八');
      expect(DUAL_ENCODED_TONES[1].exampleChar).toBe('拔');
      expect(DUAL_ENCODED_TONES[2].exampleChar).toBe('把');
      expect(DUAL_ENCODED_TONES[3].exampleChar).toBe('爸');
    });
  });

  describe('Tone Sandhi Rules Catalog Verification', () => {
    it('should contain all three foundational Tone Sandhi rules (3+3, Bu, Yi)', () => {
      expect(TONE_SANDHI_RULES).toHaveLength(3);

      const ids = TONE_SANDHI_RULES.map((r) => r.id);
      expect(ids).toContain('sandhi-3-3');
      expect(ids).toContain('sandhi-bu');
      expect(ids).toContain('sandhi-yi');

      const rule33 = TONE_SANDHI_RULES.find((r) => r.id === 'sandhi-3-3');
      expect(rule33?.exampleSpoken).toBe('ní hǎo');

      const ruleBu = TONE_SANDHI_RULES.find((r) => r.id === 'sandhi-bu');
      expect(ruleBu?.exampleSpoken).toContain('bú');

      const ruleYi = TONE_SANDHI_RULES.find((r) => r.id === 'sandhi-yi');
      expect(ruleYi?.exampleSpoken).toContain('yí');
      expect(ruleYi?.exampleSpoken).toContain('yì');
    });
  });
});

/**
 * src/engines/studio/gitHandoff.test.ts
 * ---------------------------------------------------------------------------
 * Vitest Unit Tests for Zero-Token Git Hand-off Engine.
 * Adheres strictly to AGENTS.md §5.1: 100% Deterministic, Zero DOM, Strict Types.
 */

import { describe, it, expect } from 'vitest';
import {
  generateSuggestedFilename,
  slugifyTitle,
  calculateCurriculumStats,
  escapeMarkdownTableCell,
  sanitizeHtmlInMarkdown,
  formatVocabMarkdownTable,
  generateGitCommandSnippet,
  generatePullRequestTemplate,
} from './gitHandoff';
import { createBlankDraft } from './studioSerializer';

describe('Zero-Token Git Hand-off Engine (gitHandoff.ts)', () => {
  describe('Filename & Slug Generation', () => {
    it('slugifies English titles into clean filenames', () => {
      expect(slugifyTitle('First Greetings & Identity')).toBe('first_greetings_identity');
      expect(slugifyTitle('Numbers & Time (Part 1)')).toBe('numbers_time_part_1');
      expect(slugifyTitle('')).toBe('lesson');
      expect(slugifyTitle('!@#$%^')).toBe('lesson');
    });

    it('generates standard filename using unit number padding and slugified English title', () => {
      const draft = createBlankDraft(1, 1);
      draft.title.en = 'First Greetings';
      expect(generateSuggestedFilename(draft)).toBe('unit01_first_greetings.json');

      draft.unit_number = 12;
      draft.title.en = 'Hotel & Airport Transit';
      expect(generateSuggestedFilename(draft)).toBe('unit12_hotel_airport_transit.json');
    });

    it('falls back to tier and unit ID when title is empty or default', () => {
      const draft = createBlankDraft(2, 5);
      draft.title.en = '';
      expect(generateSuggestedFilename(draft)).toBe('tier2_u05.json');
    });
  });

  describe('Markdown Escaping & XSS Sanitization', () => {
    it('escapes pipe symbols to prevent markdown table breakage', () => {
      expect(escapeMarkdownTableCell('สวัสดี | ขอบคุณ')).toBe('สวัสดี \\| ขอบคุณ');
      expect(escapeMarkdownTableCell('Line 1\nLine 2')).toBe('Line 1 Line 2');
      expect(escapeMarkdownTableCell(null)).toBe('-');
    });

    it('sanitizes malicious HTML tags from markdown strings', () => {
      const malicious = '<script>alert("xss")</script>';
      expect(sanitizeHtmlInMarkdown(malicious)).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
      expect(sanitizeHtmlInMarkdown('Normal text')).toBe('Normal text');
      expect(sanitizeHtmlInMarkdown(undefined)).toBe('');
    });
  });

  describe('Curriculum Stats & Vocab Table', () => {
    it('calculates accurate aggregate statistics from the draft', () => {
      const draft = createBlankDraft(1, 3);
      const stats = calculateCurriculumStats(draft);

      expect(stats.tier).toBe(1);
      expect(stats.unitNumber).toBe(3);
      expect(stats.totalLessons).toBe(1);
      expect(stats.totalVocab).toBe(1);
      expect(stats.totalDialogueLines).toBe(2);
      expect(stats.totalQuizzes).toBe(1);
    });

    it('formats vocabulary into a complete markdown table with escaped characters', () => {
      const draft = createBlankDraft(1, 1);
      draft.lessons[0].vocabulary = [
        {
          _clientId: 'v1',
          id: 'hsk1_0101_01',
          hanzi: '你好',
          pinyin: 'nǐ hǎo',
          pinyin_tone: 'ni3 hao3',
          stroke_count: 7,
          mnemonic: '',
          kid_mnemonic: '',
          body_gesture: '',
          meaning_th: 'สวัสดี | ทักทาย',
          meaning_en: 'hello',
          radical: '亻',
          radical_name_th: 'คนยืน',
          sandhi_rule: '3+3',
          display_pinyin: 'ní hǎo',
        },
      ];

      const table = formatVocabMarkdownTable(draft.lessons[0].vocabulary);
      expect(table).toContain('| # | ตัวอักษร (Hanzi) |');
      expect(table).toContain('**你好**');
      expect(table).toContain('`ní hǎo`');
      expect(table).toContain('สวัสดี \\| ทักทาย'); // Escaped pipe
      expect(table).toContain('3+3');
    });

    it('handles empty vocabulary lists gracefully', () => {
      const table = formatVocabMarkdownTable([]);
      expect(table).toBe('_ยังไม่มีคำศัพท์ในบทเรียนนี้_');
    });
  });

  describe('Git Terminal Snippet & Pull Request Template', () => {
    it('generates working git terminal commands', () => {
      const draft = createBlankDraft(1, 1);
      draft.title.en = 'Greetings';
      const snippet = generateGitCommandSnippet(draft, 'unit01_greetings.json');

      expect(snippet).toContain('git checkout -b content/tier1-u01');
      expect(snippet).toContain('src/data/lessons/tier1/unit01_greetings.json');
      expect(snippet).toContain('npm run validate:curriculum -- --strict');
      expect(snippet).toContain('git push -u origin content/tier1-u01');
    });

    it('generates comprehensive Pull Request template containing metadata, tables, and JSON details block', () => {
      const draft = createBlankDraft(1, 1);
      draft.title.zh = '初次见面';
      draft.title.th = 'ทักทาย & รู้จักกัน';
      draft.title.en = 'First Greetings';

      const jsonStr = JSON.stringify({ unit_id: 'tier1_u01' }, null, 2);
      const prTemplate = generatePullRequestTemplate(draft, jsonStr);

      expect(prTemplate).toContain('## 🐰 Hanzero Curriculum Content: [Tier 1 Unit 1] 初次见面');
      expect(prTemplate).toContain('**Unit ID:** `tier1_u01`');
      expect(prTemplate).toContain('src/data/lessons/tier1/unit01_first_greetings.json');
      expect(prTemplate).toContain('สรุปคำศัพท์ประจำหน่วยการเรียนรู้');
      expect(prTemplate).toContain('Quality Gate Checklist');
      expect(prTemplate).toContain('<details>');
      expect(prTemplate).toContain('```json');
      expect(prTemplate).toContain('"unit_id": "tier1_u01"');
      expect(prTemplate).toContain('Zero-Token Safe Hand-off Architecture');
    });
  });
});

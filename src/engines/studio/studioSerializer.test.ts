/**
 * src/engines/studio/studioSerializer.test.ts
 * ---------------------------------------------------------------------------
 * Unit & Integration tests for Studio Serializer, Parser, Sanitizer & Invariants.
 * Adheres strictly to AGENTS.md §5.1: 100% Deterministic, Zero DOM, Strict Typing.
 */

import { describe, it, expect } from 'vitest';
import unit01Data from '../../data/lessons/tier1/unit01_greetings.json';
import unit02Data from '../../data/lessons/tier1/unit02_numbers_time.json';
import type { UnitLessonData } from '../../types/lesson';
import {
  serializeDraftToLessonUnit,
  parseLessonUnitToDraft,
  validateStudioDraft,
  sanitizeChineseTypography,
  createBlankDraft,
  generateClientId,
} from './studioSerializer';

describe('Studio Serializer & Parser Engine (TASK-602)', () => {
  describe('Group 1: 100% Round-Trip Fidelity with Real Curriculum Data', () => {
    it('preserves 100% structural and data fidelity on round-trip with unit01_greetings.json', () => {
      const rawJson = JSON.stringify(unit01Data);
      const parseResult = parseLessonUnitToDraft(rawJson);

      expect(parseResult.success).toBe(true);
      expect(parseResult.errors).toHaveLength(0);
      expect(parseResult.draft).toBeDefined();

      const draft = parseResult.draft!;
      expect(draft.unit_id).toBe('tier1_u01');
      expect(draft.lessons).toHaveLength(unit01Data.lessons.length);

      // Serialize back without altering original IDs
      const serialized = serializeDraftToLessonUnit(draft, { autoSequenceIds: false, sanitize: false });

      // Deep equality with original source
      expect(serialized).toEqual(unit01Data);
    });

    it('preserves 100% fidelity with unit02_numbers_time.json (including Tone Sandhi rules)', () => {
      const parseResult = parseLessonUnitToDraft(unit02Data as UnitLessonData);
      expect(parseResult.success).toBe(true);
      expect(parseResult.errors).toHaveLength(0);

      const draft = parseResult.draft!;
      const serialized = serializeDraftToLessonUnit(draft, { autoSequenceIds: false, sanitize: false });

      expect(serialized).toEqual(unit02Data);
    });

    it('guarantees round-trip idempotency: Draft -> Serialized -> Draft -> Serialized', () => {
      const initialParse = parseLessonUnitToDraft(unit01Data as UnitLessonData);
      const firstSerialized = serializeDraftToLessonUnit(initialParse.draft!, { autoSequenceIds: false, sanitize: false });

      const secondParse = parseLessonUnitToDraft(firstSerialized);
      const secondSerialized = serializeDraftToLessonUnit(secondParse.draft!, { autoSequenceIds: false, sanitize: false });

      expect(secondSerialized).toEqual(firstSerialized);
    });
  });

  describe('Group 2: Malformed, Corrupted & Toxic JSON Ingestion Defense', () => {
    it('catches JSON syntax error and returns line and column without crashing', () => {
      const brokenJson = '{\n  "unit_id": "tier1_u01",\n  "tier": 1,\n  "bad_token": [,\n}';
      const result = parseLessonUnitToDraft(brokenJson);

      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.syntaxError).toBeDefined();
      expect(result.syntaxError!.line).toBeGreaterThanOrEqual(1);
      expect(result.syntaxError!.column).toBeGreaterThanOrEqual(1);
    });

    it('rejects top-level primitives and arrays that are not JSON objects', () => {
      const stringInput = parseLessonUnitToDraft('"not an object"');
      expect(stringInput.success).toBe(false);
      expect(stringInput.errors[0].field).toBe('type');

      const arrayInput = parseLessonUnitToDraft('["item1", "item2"]');
      expect(arrayInput.success).toBe(false);
      expect(arrayInput.errors[0].field).toBe('type');
    });

    it('rejects JSON payloads exceeding 2 MB DoS threshold', () => {
      const massivePayload = '{"unit_id": "tier1_u01", "pad": "' + 'A'.repeat(2 * 1024 * 1024 + 10) + '"}';
      const result = parseLessonUnitToDraft(massivePayload);

      expect(result.success).toBe(false);
      expect(result.errors[0].field).toBe('payload');
      expect(result.errors[0].message).toContain('ใหญ่เกินขีดจำกัด');
    });

    it('strips toxic prototype pollution keys (__proto__, constructor) from input payload', () => {
      const toxicPayload = JSON.stringify({
        unit_id: 'tier1_u01',
        title: { zh: '测试', th: 'ทดสอบ', en: 'Test' },
        __proto__: { polluted: true },
        constructor: { prototype: { admin: true } },
        lessons: [],
      });

      const result = parseLessonUnitToDraft(toxicPayload);
      expect(result.draft).toBeDefined();
      expect((result.draft as unknown as Record<string, unknown>).__proto__).not.toHaveProperty('polluted');
      expect(({} as unknown as Record<string, unknown>).polluted).toBeUndefined();
    });
  });

  describe('Group 3: Chinese Typography & Dual-Pinyin Sanitization', () => {
    it('normalizes western punctuation to full-width Chinese punctuation and removes spaces', () => {
      const input = '你好 ！ 我是李明 ， 很高兴认识你 ！';
      const output = sanitizeChineseTypography(input);
      expect(output).toBe('你好！我是李明，很高兴认识你！');
    });

    it('auto-converts numeric pinyin to diacritics when pinyin mark is missing', () => {
      const draft = createBlankDraft(1, 1);
      draft.lessons[0].vocabulary[0].pinyin = '';
      draft.lessons[0].vocabulary[0].pinyin_tone = 'lv4 cha2';

      const unit = serializeDraftToLessonUnit(draft);
      expect(unit.lessons[0].vocabulary[0].pinyin).toBe('lǜ chá');
    });

    it('auto-applies Tone Sandhi 3+3 rule for known dual 3rd-tone words like 你好', () => {
      const draft = createBlankDraft(1, 1);
      draft.lessons[0].vocabulary[0].hanzi = '你好';
      draft.lessons[0].vocabulary[0].sandhi_rule = undefined;
      draft.lessons[0].vocabulary[0].display_pinyin = undefined;

      const unit = serializeDraftToLessonUnit(draft);
      expect(unit.lessons[0].vocabulary[0].sandhi_rule).toBe('3+3');
      expect(unit.lessons[0].vocabulary[0].display_pinyin).toBe('ní hǎo');
    });
  });

  describe('Group 4: Quality Gate Invariants & Validation', () => {
    it('detects and flags traditional Chinese characters as errors', () => {
      const draft = createBlankDraft(1, 1);
      draft.lessons[0].vocabulary[0].hanzi = '謝國'; // Contains traditional characters 謝 and 國

      const val = validateStudioDraft(draft);
      expect(val.isValid).toBe(false);
      expect(val.errors.some((e) => e.message.includes('อักษรจีนตัวเต็ม'))).toBe(true);
    });

    it('flags missing required unit and lesson fields', () => {
      const draft = createBlankDraft(1, 1);
      draft.title.zh = '';
      draft.title.th = '';
      draft.lessons[0].can_do.th = '';

      const val = validateStudioDraft(draft);
      expect(val.isValid).toBe(false);
      expect(val.errors.some((e) => e.field === 'title.zh')).toBe(true);
      expect(val.errors.some((e) => e.field === 'title.th')).toBe(true);
      expect(val.errors.some((e) => e.field === 'can_do.th')).toBe(true);
    });

    it('validates Quiz invariants for MultipleChoice and SentenceScramble', () => {
      const draft = createBlankDraft(1, 1);
      // Multiple Choice with out of bounds correct_index
      draft.lessons[0].quizzes = [
        {
          _clientId: generateClientId(),
          type: 'meaning_match',
          question_th: 'ข้อสอบ',
          explanation_th: 'คำอธิบาย',
          encouragement: 'สู้ๆ',
          options: ['A', 'B'],
          correct_index: 5, // Out of bounds
          tokens: [],
          correct_sequence: [],
        },
        {
          _clientId: generateClientId(),
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค',
          explanation_th: 'คำอธิบาย',
          encouragement: 'สู้ๆ',
          options: [],
          correct_index: 0,
          tokens: ['我', '是'],
          correct_sequence: ['我'], // Length mismatch (2 vs 1)
        },
      ];

      const val = validateStudioDraft(draft);
      expect(val.isValid).toBe(false);
      expect(val.errors.some((e) => e.field === 'correct_index')).toBe(true);
      expect(val.errors.some((e) => e.field === 'correct_sequence')).toBe(true);
    });
  });
});

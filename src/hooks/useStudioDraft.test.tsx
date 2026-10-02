/**
 * @vitest-environment jsdom
 */

import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useStudioDraft, UseStudioDraftReturn, STUDIO_STORAGE_KEY, AUTO_SAVE_DEBOUNCE_MS } from './useStudioDraft';
import unit01Data from '../data/lessons/tier1/unit01_greetings.json';
import type { UnitLessonData } from '../types/lesson';

// Configure React 18 act environment for JSDOM
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('useStudioDraft Hook (TASK-602)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  let hookResult: UseStudioDraftReturn | null = null;

  const TestComponent: React.FC<{ initialUnit?: UnitLessonData }> = ({ initialUnit }) => {
    hookResult = useStudioDraft(initialUnit);
    return <div id="test-ready">ready</div>;
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    vi.clearAllMocks();

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root?.unmount();
      });
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
    root = null;
    hookResult = null;
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  async function mountTestHook(initialUnit?: UnitLessonData): Promise<void> {
    await act(async () => {
      root?.render(<TestComponent initialUnit={initialUnit} />);
    });
  }

  function getHook(): UseStudioDraftReturn {
    if (!hookResult) {
      throw new Error('Test hook is not mounted');
    }
    return hookResult;
  }

  describe('Group 1: Initialization & Storage Recovery', () => {
    it('initializes with clean default draft when localStorage is empty', async () => {
      await mountTestHook();
      const hook = getHook();

      expect(hook.draft).toBeDefined();
      expect(hook.draft.unit_id).toBe('tier1_u01');
      expect(hook.draft.lessons).toHaveLength(1);
      expect(hook.isRecovered).toBe(false);
      expect(hook.isDirty).toBe(false);
    });

    it('recovers draft from localStorage key hanzero_studio_draft_v1', async () => {
      const savedPayload = {
        version: 1,
        savedAt: 1726910000000,
        draft: {
          version: 1,
          unit_id: 'tier1_u99',
          tier: 1,
          unit_number: 99,
          title: { zh: '恢复单元', th: 'หมวดที่กู้คืน', en: 'Recovered Unit' },
          description: 'กู้คืนสำเร็จ',
          lessons: [
            {
              _clientId: 'rec_1',
              lesson_id: 't1_u99_l01',
              lesson_number: 1,
              title: { zh: '第一课', th: 'บทที่ 1', en: 'Lesson 1' },
              can_do: { th: 'เข้าใจ', en: 'understand' },
              baby_step_goal: 'เป้าหมาย',
              vocabulary: [],
              grammar_bite: { title: '', explanation_th: '', patterns: [] },
              dialogue: [],
              quizzes: [],
              boss_challenge: { scenario_th: '', options: [], correct_index: 0, explanation_th: '', encouragement: '' },
              cheer_trophy: { badge_id: 'b1', badge_name: 'เหรียญ', message_th: '', xp_reward: 50 },
            },
          ],
          activeLessonIndex: 0,
          lastSavedAt: 1726910000000,
        },
      };

      window.localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(savedPayload));

      await mountTestHook();
      const hook = getHook();

      expect(hook.isRecovered).toBe(true);
      expect(hook.draft.unit_id).toBe('tier1_u99');
      expect(hook.draft.title.th).toBe('หมวดที่กู้คืน');
    });

    it('safely ignores corrupted JSON in storage without crashing and loads fresh default', async () => {
      window.localStorage.setItem(STUDIO_STORAGE_KEY, 'invalid_corrupted_json{{{');

      await mountTestHook();
      const hook = getHook();

      expect(hook.draft).toBeDefined();
      expect(hook.draft.unit_id).toBe('tier1_u01');
      expect(hook.isRecovered).toBe(false);
    });
  });

  describe('Group 2: Debounced Auto-Save & Timers', () => {
    it('debounces rapid edits and saves to localStorage only once after timeout', async () => {
      vi.useFakeTimers();
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

      await mountTestHook();
      setItemSpy.mockClear();

      // Rapidly update unit title 5 times
      for (let i = 1; i <= 5; i++) {
        act(() => {
          getHook().updateUnitTitle('th', `ชื่อบทที่แก้รอบ ${i}`);
        });
        vi.advanceTimersByTime(200); // 200ms interval (< 1000ms debounce)
      }

      // Should not have persisted to localStorage yet during active typing
      expect(setItemSpy).not.toHaveBeenCalled();

      // Advance past the 1,000ms debounce threshold
      act(() => {
        vi.advanceTimersByTime(AUTO_SAVE_DEBOUNCE_MS);
      });

      expect(setItemSpy).toHaveBeenCalledTimes(1);

      const stored = JSON.parse(window.localStorage.getItem(STUDIO_STORAGE_KEY)!);
      expect(stored.draft.title.th).toBe('ชื่อบทที่แก้รอบ 5');
    });
  });

  describe('Group 3: Zombie Resurrection Prevention (CHAOS-01)', () => {
    it('cancels pending debounce when resetDraft is called, preventing old draft write-over', async () => {
      vi.useFakeTimers();
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

      await mountTestHook();
      setItemSpy.mockClear();

      // 1. User starts typing dirty data
      act(() => {
        getHook().updateUnitTitle('th', 'ข้อมูลขยะที่จะพิมพ์ทิ้ง');
      });

      // Advance 300ms (timer is active and pending)
      vi.advanceTimersByTime(300);

      // 2. User presses "Reset Draft" at 300ms
      act(() => {
        getHook().resetDraft();
      });

      // resetDraft performs immediate write of blank state
      const stateImmediatelyAfterReset = JSON.parse(window.localStorage.getItem(STUDIO_STORAGE_KEY)!);
      expect(stateImmediatelyAfterReset.draft.title.th).toBe('หมวดบทเรียนใหม่');

      // 3. Now advance past the old debounce timer (1000ms)
      act(() => {
        vi.advanceTimersByTime(AUTO_SAVE_DEBOUNCE_MS + 500);
      });

      // The old dirty state "ข้อมูลขยะที่จะพิมพ์ทิ้ง" MUST NOT resurrect!
      const finalStored = JSON.parse(window.localStorage.getItem(STUDIO_STORAGE_KEY)!);
      expect(finalStored.draft.title.th).toBe('หมวดบทเรียนใหม่');
    });
  });

  describe('Group 4: Storage Quota & Security Shield (CHAOS-03)', () => {
    it('handles QuotaExceededError without crashing and preserves draft in memory', async () => {
      vi.useFakeTimers();

      await mountTestHook();

      // Mock setItem to throw QuotaExceededError
      const quotaError = new DOMException('QuotaExceededError', 'QuotaExceededError');
      const quotaSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw quotaError;
      });

      act(() => {
        getHook().updateUnitTitle('th', 'บทเรียนขนาดใหญ่เกินโควต้า');
      });

      act(() => {
        vi.advanceTimersByTime(AUTO_SAVE_DEBOUNCE_MS);
      });

      // Hook must report quota_exceeded and not throw
      expect(getHook().storageStatus).toBe('quota_exceeded');
      expect(getHook().storageError).toBe('QUOTA_EXCEEDED');

      // Draft in memory must remain completely intact
      expect(getHook().draft.title.th).toBe('บทเรียนขนาดใหญ่เกินโควต้า');

      // Clean up spy
      quotaSpy.mockRestore();
    });
  });

  describe('Group 5: Page Lifecycle Synchronous Flush (CHAOS-08)', () => {
    it('synchronously flushes pending changes on visibilitychange to hidden', async () => {
      vi.useFakeTimers();
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

      await mountTestHook();
      setItemSpy.mockClear();

      // User types changes
      act(() => {
        getHook().updateUnitTitle('th', 'พิมพ์ค้างไว้ก่อนปิดจอ');
      });

      // Only 100ms passed, debounce timer has NOT fired yet
      vi.advanceTimersByTime(100);
      expect(setItemSpy).not.toHaveBeenCalled();

      // Simulate tab sleep / switch to background
      Object.defineProperty(document, 'visibilityState', {
        value: 'hidden',
        configurable: true,
      });

      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });

      // Synchronous flush should have written immediately!
      expect(setItemSpy).toHaveBeenCalledTimes(1);
      const stored = JSON.parse(window.localStorage.getItem(STUDIO_STORAGE_KEY)!);
      expect(stored.draft.title.th).toBe('พิมพ์ค้างไว้ก่อนปิดจอ');
    });
  });

  describe('Group 6: Vocab & Quiz CRUD Operations', () => {
    it('supports addVocab, updateVocab, and removeVocab', async () => {
      await mountTestHook();

      // Add Vocab
      act(() => {
        getHook().addVocab({
          hanzi: '谢谢',
          pinyin: 'xièxie',
          pinyin_tone: 'xie4 xie5',
          meaning_th: 'ขอบคุณ',
        });
      });

      const initialCount = getHook().activeLesson!.vocabulary.length;
      expect(initialCount).toBe(2); // 1 default + 1 added
      expect(getHook().activeLesson!.vocabulary[1].hanzi).toBe('谢谢');

      // Update Vocab
      act(() => {
        getHook().updateVocab(1, { meaning_th: 'ขอบใจนะ' });
      });
      expect(getHook().activeLesson!.vocabulary[1].meaning_th).toBe('ขอบใจนะ');

      // Remove Vocab
      act(() => {
        getHook().removeVocab(0);
      });
      expect(getHook().activeLesson!.vocabulary).toHaveLength(1);
      expect(getHook().activeLesson!.vocabulary[0].hanzi).toBe('谢谢');
    });

    it('supports addQuiz, updateQuiz, and removeQuiz', async () => {
      await mountTestHook();

      // Add Sentence Scramble Quiz
      act(() => {
        getHook().addQuiz('sentence_scramble');
      });

      const quizzes = getHook().activeLesson!.quizzes;
      expect(quizzes).toHaveLength(2); // 1 default + 1 added
      expect(quizzes[1].type).toBe('sentence_scramble');

      // Update Quiz
      act(() => {
        getHook().updateQuiz(1, { question_th: 'เรียงประโยคทักทาย' });
      });
      expect(getHook().activeLesson!.quizzes[1].question_th).toBe('เรียงประโยคทักทาย');

      // Remove Quiz
      act(() => {
        getHook().removeQuiz(0);
      });
      expect(getHook().activeLesson!.quizzes).toHaveLength(1);
      expect(getHook().activeLesson!.quizzes[0].type).toBe('sentence_scramble');
    });
  });

  describe('Group 7: Import & Export Operations', () => {
    it('exports clean formatted JSON and imports Unit 01 Greetings successfully', async () => {
      await mountTestHook(unit01Data as UnitLessonData);

      const exportResult = getHook().exportJson();
      expect(exportResult.jsonString).toBeDefined();
      expect(exportResult.isValid).toBe(true);
      expect(exportResult.errors).toHaveLength(0);

      const parsedExport = JSON.parse(exportResult.jsonString);
      expect(parsedExport.unit_id).toBe('tier1_u01');
      expect(parsedExport.lessons).toHaveLength(unit01Data.lessons.length);

      // Now import another JSON
      const customUnitJson = JSON.stringify({
        unit_id: 'tier1_u02',
        tier: 1,
        unit_number: 2,
        title: { zh: '数字', th: 'ตัวเลข', en: 'Numbers' },
        description: 'บทเรียนตัวเลข',
        lessons: [
          {
            lesson_id: 't1_u02_l01',
            lesson_number: 1,
            title: { zh: '数字一', th: 'เลข 1', en: 'Number 1' },
            can_do: { th: 'นับเลข', en: 'count' },
            baby_step_goal: 'นับ 1-10',
            vocabulary: [
              {
                id: 'hsk1_0001',
                hanzi: '一',
                pinyin: 'yī',
                pinyin_tone: 'yi1',
                meaning_th: 'หนึ่ง',
                meaning_en: 'one',
                radical: '一',
                radical_name_th: 'หมวดขีดเดี่ยว',
                stroke_count: 1,
                mnemonic: 'ขีดเดียว',
                kid_mnemonic: 'ไม้เรียว',
                body_gesture: 'ชูหนึ่งนิ้ว',
              },
            ],
            grammar_bite: { title: '', explanation_th: '', patterns: [] },
            dialogue: [],
            quizzes: [],
            boss_challenge: { scenario_th: '', options: ['A'], correct_index: 0, explanation_th: '', encouragement: '' },
            cheer_trophy: { badge_id: 'b1', badge_name: 'แตร', message_th: '', xp_reward: 50 },
          },
        ],
      });

      act(() => {
        const importRes = getHook().importJson(customUnitJson);
        expect(importRes.success).toBe(true);
      });

      expect(getHook().draft.unit_id).toBe('tier1_u02');
      expect(getHook().draft.title.th).toBe('ตัวเลข');
      expect(getHook().activeLesson!.vocabulary[0].hanzi).toBe('一');
    });
  });
});

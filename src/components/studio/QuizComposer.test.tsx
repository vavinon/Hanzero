/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QuizComposer } from './QuizComposer';
import type { StudioQuizDraft } from '../../engines/studio/studioTypes';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('QuizComposer Component (TASK-603)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  const mockQuizzes: StudioQuizDraft[] = [
    {
      _clientId: 'q_01',
      type: 'meaning_match',
      question_th: "'你好' มีความหมายตรงกับข้อใด?",
      explanation_th: 'แปลว่า สวัสดี',
      encouragement: 'เก่งมาก!',
      options: ['สวัสดี', 'ขอบคุณ', 'ลาก่อน', 'ขอโทษ'],
      correct_index: 0,
      tokens: [],
      correct_sequence: [],
    },
    {
      _clientId: 'q_02',
      type: 'listen_match',
      question_th: 'ฟังเสียงแล้วเลือกคำศัพท์ที่ถูกต้อง',
      explanation_th: 'เสียง xie4xie แปลว่า ขอบคุณ',
      encouragement: 'ยอดเยี่ยม!',
      options: ['你好', '谢谢', '再见', '对不起'],
      correct_index: 1,
      tokens: [],
      correct_sequence: [],
    },
  ];

  beforeEach(() => {
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
    vi.restoreAllMocks();
  });

  it('renders quiz items with MCQ options and updates correct_index on radio click', async () => {
    const onUpdateQuiz = vi.fn();

    await act(async () => {
      root?.render(
        <QuizComposer
          quizList={mockQuizzes}
          availableVocabs={[]}
          onAddQuiz={vi.fn()}
          onUpdateQuiz={onUpdateQuiz}
          onRemoveQuiz={vi.fn()}
          onReorderQuiz={vi.fn()}
        />
      );
    });

    expect(container?.textContent).toContain('ข้อสอบที่ 1');
    expect(container?.textContent).toContain('ข้อสอบที่ 2');
    const inputValues = Array.from(container?.querySelectorAll('input') || []).map((i) => i.value);
    expect(inputValues).toContain('สวัสดี');
    expect(inputValues).toContain('ขอบคุณ');

    // Click radio button for Option 2 in Quiz 1
    const radioBtns = Array.from(container?.querySelectorAll('button[title*="คำตอบที่ถูกต้อง"]') || []);
    expect(radioBtns.length).toBeGreaterThan(0);

    await act(async () => {
      radioBtns[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onUpdateQuiz).toHaveBeenCalledWith(0, { correct_index: 1 });
  });

  it('safely re-indexes correct_index when an option is deleted', async () => {
    const onUpdateQuiz = vi.fn();

    await act(async () => {
      root?.render(
        <QuizComposer
          quizList={mockQuizzes}
          availableVocabs={[]}
          onAddQuiz={vi.fn()}
          onUpdateQuiz={onUpdateQuiz}
          onRemoveQuiz={vi.fn()}
          onReorderQuiz={vi.fn()}
        />
      );
    });

    // Delete Option 0 in Quiz 2 (where correct_index is 1)
    const deleteOptBtns = Array.from(container?.querySelectorAll('button[title="ลบตัวเลือกนี้"]') || []);
    expect(deleteOptBtns.length).toBeGreaterThan(0);

    await act(async () => {
      deleteOptBtns[4].dispatchEvent(new MouseEvent('click', { bubbles: true })); // Option 0 of quiz 2
    });

    // When option 0 was deleted, previous correct_index 1 becomes 0!
    expect(onUpdateQuiz).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        correct_index: 0,
        options: ['谢谢', '再见', '对不起'],
      })
    );
  });

  it('detects duplicate options and shows a warning alert', async () => {
    const duplicateQuiz: StudioQuizDraft[] = [
      {
        _clientId: 'q_dup',
        type: 'meaning_match',
        question_th: 'คำถาม',
        explanation_th: '',
        encouragement: '',
        options: ['สวัสดี', 'สวัสดี', 'ลาก่อน'], // Duplicate 'สวัสดี'
        correct_index: 0,
        tokens: [],
        correct_sequence: [],
      },
    ];

    await act(async () => {
      root?.render(
        <QuizComposer
          quizList={duplicateQuiz}
          availableVocabs={[]}
          onAddQuiz={vi.fn()}
          onUpdateQuiz={vi.fn()}
          onRemoveQuiz={vi.fn()}
          onReorderQuiz={vi.fn()}
        />
      );
    });

    expect(container?.textContent).toContain('พบตัวเลือกซ้ำกัน');
  });

  it('triggers Balance Guard bias alert when multiple choice quizzes cluster on option 1', async () => {
    const biasedQuizzes: StudioQuizDraft[] = [
      { ...mockQuizzes[0], _clientId: 'b1', correct_index: 0 },
      { ...mockQuizzes[1], _clientId: 'b2', correct_index: 0 },
      { ...mockQuizzes[0], _clientId: 'b3', correct_index: 0 },
    ];

    await act(async () => {
      root?.render(
        <QuizComposer
          quizList={biasedQuizzes}
          availableVocabs={[]}
          onAddQuiz={vi.fn()}
          onUpdateQuiz={vi.fn()}
          onRemoveQuiz={vi.fn()}
          onReorderQuiz={vi.fn()}
        />
      );
    });

    expect(container?.textContent).toContain('เครื่องมือ Balance Guard');
    expect(container?.textContent).toContain('ตรวจพบความเอียงของเฉลย');
  });
});

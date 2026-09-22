/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DialogueComposer } from './DialogueComposer';
import type { StudioDialogueDraft } from '../../engines/studio/studioTypes';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('DialogueComposer Component (TASK-603)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  const mockDialogue: StudioDialogueDraft[] = [
    {
      _clientId: 'd_01',
      speaker: 'A',
      speaker_name: 'น้องทู่ทู่ 🐰',
      zh: '你好！',
      pinyin: 'nǐ hǎo!',
      th: 'สวัสดีครับ!',
      en: 'Hello!',
    },
    {
      _clientId: 'd_02',
      speaker: 'B',
      speaker_name: 'เหล่าซือหลิน 👩‍🏫',
      zh: '你好，不客气。',
      pinyin: 'nǐ hǎo, bù kèqi.',
      th: 'สวัสดี ไม่ต้องเกรงใจ', // Contains translationese for testing
      en: 'Hello, you are welcome.',
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

  it('renders dialogue lines and displays natural Thai phrasing advice', async () => {
    await act(async () => {
      root?.render(
        <DialogueComposer
          dialogueList={mockDialogue}
          tier={1}
          onAddLine={vi.fn()}
          onUpdateLine={vi.fn()}
          onRemoveLine={vi.fn()}
          onReorderLine={vi.fn()}
        />
      );
    });

    expect(container?.textContent).toContain('บรรทัดที่ 1');
    expect(container?.textContent).toContain('บรรทัดที่ 2');

    // Verify Natural Thai translation advice
    expect(container?.textContent).toContain('แนะนำการแปล');
    expect(container?.textContent).toContain('ไม่เป็นไรครับ');
  });

  it('updates speaker and name when persona preset button is clicked', async () => {
    const onUpdateLine = vi.fn();

    await act(async () => {
      root?.render(
        <DialogueComposer
          dialogueList={mockDialogue}
          tier={1}
          onAddLine={vi.fn()}
          onUpdateLine={onUpdateLine}
          onRemoveLine={vi.fn()}
          onReorderLine={vi.fn()}
        />
      );
    });

    const personaBtn = Array.from(container?.querySelectorAll('button') || []).find((b) =>
      b.textContent?.includes('อาหมิง')
    );
    expect(personaBtn).toBeDefined();

    await act(async () => {
      personaBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onUpdateLine).toHaveBeenCalledWith(
      0,
      expect.objectContaining({
        speaker_name: 'อาหมิง 🧑‍💼',
        speaker: 'A',
      })
    );
  });

  it('displays pacing guard warning when lines exceed 6 for Tier 1', async () => {
    const longDialogue: StudioDialogueDraft[] = Array.from({ length: 7 }, (_, i) => ({
      _clientId: `d_${i}`,
      speaker: (i % 2 === 0 ? 'A' : 'B') as 'A' | 'B',
      speaker_name: `Speaker ${i}`,
      zh: '你好',
      pinyin: 'nǐ hǎo',
      th: 'สวัสดี',
      en: 'hello',
    }));

    await act(async () => {
      root?.render(
        <DialogueComposer
          dialogueList={longDialogue}
          tier={1}
          onAddLine={vi.fn()}
          onUpdateLine={vi.fn()}
          onRemoveLine={vi.fn()}
          onReorderLine={vi.fn()}
        />
      );
    });

    expect(container?.textContent).toContain('คำแนะนำจังหวะการเรียนรู้ (Pacing Guard)');
    expect(container?.textContent).toContain('ควรมีความยาว 4–6 บรรทัด');
  });
});

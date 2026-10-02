/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { VocabComposer } from './VocabComposer';
import type { StudioVocabDraft } from '../../engines/studio/studioTypes';
import * as audioEngine from '../../engines/audio/audioEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('VocabComposer Component (TASK-603)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  const mockVocabs: StudioVocabDraft[] = [
    {
      _clientId: 'v_01',
      id: 'hsk1_0001',
      hanzi: '你好',
      pinyin: 'nǐ hǎo',
      pinyin_tone: 'ni3 hao3',
      meaning_th: 'สวัสดี',
      meaning_en: 'hello',
      radical: '亻',
      radical_name_th: 'หมวดคน',
      stroke_count: 7,
      mnemonic: 'คนยืนทักทายกัน',
      kid_mnemonic: 'กระต่ายทู่ทู่โบกมือ',
      body_gesture: 'พนมมือไหว้',
    },
    {
      _clientId: 'v_02',
      id: 'hsk1_0002',
      hanzi: '謝謝', // Traditional characters for testing
      pinyin: 'xie4xie',
      pinyin_tone: 'xie4 xie',
      meaning_th: 'ขอบคุณ',
      meaning_en: 'thank you',
      radical: '讠',
      radical_name_th: 'หมวดคำพูด',
      stroke_count: 12,
      mnemonic: '',
      kid_mnemonic: '',
      body_gesture: '',
    },
  ];

  beforeEach(() => {
    vi.spyOn(audioEngine, 'speak').mockResolvedValue();
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});

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

  it('renders empty state when vocabulary list is empty and triggers onAddVocab', async () => {
    const onAddVocab = vi.fn();

    await act(async () => {
      root?.render(
        <VocabComposer
          vocabList={[]}
          onAddVocab={onAddVocab}
          onUpdateVocab={vi.fn()}
          onRemoveVocab={vi.fn()}
          onReorderVocab={vi.fn()}
        />
      );
    });

    expect(container?.textContent).toContain('ยังไม่มีรายการคำศัพท์ในบทเรียนนี้');
    const addBtn = container?.querySelector('button');
    expect(addBtn).toBeDefined();

    await act(async () => {
      addBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(onAddVocab).toHaveBeenCalledTimes(1);
  });

  it('renders vocab cards with all fields and displays Tone Sandhi guidance', async () => {
    await act(async () => {
      root?.render(
        <VocabComposer
          vocabList={mockVocabs}
          onAddVocab={vi.fn()}
          onUpdateVocab={vi.fn()}
          onRemoveVocab={vi.fn()}
          onReorderVocab={vi.fn()}
        />
      );
    });

    // Check vocabulary headers
    expect(container?.textContent).toContain('คำศัพท์ที่ 1');
    expect(container?.textContent).toContain('คำศัพท์ที่ 2');

    // Check Tone Sandhi alert for '你好' (3+3 rule)
    expect(container?.textContent).toContain('ข้อสังเกตการผันเสียง');
    expect(container?.textContent).toContain('ní hǎo');

    // Check traditional Chinese alert for '謝謝'
    expect(container?.textContent).toContain('พบตัวเต็ม');
    expect(container?.textContent).toContain('謝 ➔ 谢');
    expect(container?.textContent).toContain('1-Click แปลงเป็นตัวย่อ');
  });

  it('performs 1-click conversion for traditional Chinese characters', async () => {
    const onUpdateVocab = vi.fn();

    await act(async () => {
      root?.render(
        <VocabComposer
          vocabList={mockVocabs}
          onAddVocab={vi.fn()}
          onUpdateVocab={onUpdateVocab}
          onRemoveVocab={vi.fn()}
          onReorderVocab={vi.fn()}
        />
      );
    });

    const simplifyButtons = Array.from(container?.querySelectorAll('button') || []).filter((b) =>
      b.textContent?.includes('แปลงเป็นตัวย่อ')
    );
    expect(simplifyButtons.length).toBeGreaterThan(0);

    await act(async () => {
      simplifyButtons[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onUpdateVocab).toHaveBeenCalledWith(1, { hanzi: '谢谢' });
  });

  it('applies spoken Tone Sandhi suggestion to display_pinyin on click', async () => {
    const onUpdateVocab = vi.fn();

    await act(async () => {
      root?.render(
        <VocabComposer
          vocabList={mockVocabs}
          onAddVocab={vi.fn()}
          onUpdateVocab={onUpdateVocab}
          onRemoveVocab={vi.fn()}
          onReorderVocab={vi.fn()}
        />
      );
    });

    const sandhiBtn = Array.from(container?.querySelectorAll('button') || []).find((b) =>
      b.textContent?.includes('ใส่ใน Display Pinyin')
    );
    expect(sandhiBtn).toBeDefined();

    await act(async () => {
      sandhiBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onUpdateVocab).toHaveBeenCalledWith(
      0,
      expect.objectContaining({
        display_pinyin: 'ní hǎo',
        sandhi_rule: '3+3',
      })
    );
  });

  it('handles reorder and remove actions safely', async () => {
    const onReorderVocab = vi.fn();
    const onRemoveVocab = vi.fn();

    await act(async () => {
      root?.render(
        <VocabComposer
          vocabList={mockVocabs}
          onAddVocab={vi.fn()}
          onUpdateVocab={vi.fn()}
          onRemoveVocab={onRemoveVocab}
          onReorderVocab={onReorderVocab}
        />
      );
    });

    // Move Down on first card
    const moveDownBtns = Array.from(container?.querySelectorAll('button[title="เลื่อนการ์ดลง"]') || []);
    expect(moveDownBtns.length).toBe(2);

    await act(async () => {
      moveDownBtns[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(onReorderVocab).toHaveBeenCalledWith(0, 1);

    // Delete first card
    const deleteBtns = Array.from(container?.querySelectorAll('button[title="ลบคำศัพท์นี้"]') || []);
    expect(deleteBtns.length).toBe(2);

    await act(async () => {
      deleteBtns[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(onRemoveVocab).toHaveBeenCalledWith(0);
  });

  it('triggers TTS audio probe on speak button click and stops on unmount', async () => {
    await act(async () => {
      root?.render(
        <VocabComposer
          vocabList={mockVocabs}
          onAddVocab={vi.fn()}
          onUpdateVocab={vi.fn()}
          onRemoveVocab={vi.fn()}
          onReorderVocab={vi.fn()}
        />
      );
    });

    const speakBtn = container?.querySelector('button[title="ทดสอบฟังเสียงภาษาจีนกลาง (zh-CN)"]');
    expect(speakBtn).toBeDefined();

    await act(async () => {
      speakBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(audioEngine.speak).toHaveBeenCalledWith('你好', expect.anything());

    // Unmount triggers stopSpeaking
    act(() => {
      root?.unmount();
    });
    expect(audioEngine.stopSpeaking).toHaveBeenCalled();
  });
});

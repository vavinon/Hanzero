/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GrammarSlotBuilder,
  GrammarSlotBuilderProps,
} from './GrammarSlotBuilder';
import { GrammarSlotProblem } from '../../engines/grammar/grammarSlotEngine';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

const mockProblem: GrammarSlotProblem = {
  id: 'prob_ba_phone',
  category: 'ba_sentence',
  titleTh: 'ประโยค 把: หยิบโทรศัพท์มือถือออกมา',
  explanationTh: 'โครงสร้าง: [คำขอร้อง] + 把 + [กรรม] + [กริยา] + [ทิศทาง]',
  canonicalSentence: {
    zh: '请把手机拿出来',
    pinyin: 'Qǐng bǎ shǒujī ná chūlai',
    th: 'กรุณาหยิบโทรศัพท์มือถือออกมา',
  },
  tokens: [
    { id: 't_qing', zh: '请', pinyin: 'qǐng', th: 'กรุณา', role: 'modal' },
    { id: 't_ba', zh: '把', pinyin: 'bǎ', th: 'นำ/เอา', role: 'operator' },
    { id: 't_shouji', zh: '手机', pinyin: 'shǒujī', th: 'โทรศัพท์มือถือ', role: 'object' },
    { id: 't_na', zh: '拿', pinyin: 'ná', th: 'หยิบ', role: 'verb' },
    { id: 't_chulai', zh: '出来', pinyin: 'chūlai', th: 'ออกมา', role: 'complement' },
  ],
  validSequences: [
    ['t_qing', 't_ba', 't_shouji', 't_na', 't_chulai'],
  ],
  formula: '[Modal] + 把 + [Object] + [Verb] + [Direction]',
  hintTh: 'วาง 把 ก่อนสิ่งของ แล้วตามด้วยกริยาและการเคลื่อนไหว',
};

describe('GrammarSlotBuilder Component (TASK-703)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    vi.spyOn(audioEngine, 'speak').mockImplementation((_text, options) => {
      options?.onStart?.();
      options?.onEnd?.();
      return Promise.resolve();
    });
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playIncorrect').mockImplementation(() => {});
  });

  afterEach(async () => {
    if (root) {
      await act(async () => {
        root!.unmount();
      });
      root = null;
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
      container = null;
    }
    vi.restoreAllMocks();
  });

  const renderComponent = async (props: Partial<GrammarSlotBuilderProps> = {}) => {
    const defaultProps: GrammarSlotBuilderProps = {
      problem: mockProblem,
      ...props,
    };

    await act(async () => {
      root!.render(<GrammarSlotBuilder {...defaultProps} />);
    });
  };

  it('1. renders header, formula, empty slot receiver, and available tokens correctly', async () => {
    await renderComponent();

    expect(container?.textContent).toContain('ประโยค 把: หยิบโทรศัพท์มือถือออกมา');
    expect(container?.textContent).toContain('[Modal] + 把 + [Object] + [Verb] + [Direction]');
    expect(container?.textContent).toContain('0 / 5 สล็อต');
    expect(container?.textContent).toContain('แตะบล็อกคำจากถาดด้านล่าง');

    // Available tokens
    expect(container?.textContent).toContain('请');
    expect(container?.textContent).toContain('把');
    expect(container?.textContent).toContain('手机');
    expect(container?.textContent).toContain('拿');
    expect(container?.textContent).toContain('出来');
  });

  it('2. supports Tap-to-Place (tray to slot) and Unslot (slot back to tray)', async () => {
    await renderComponent();

    // Click '请' in tray
    const qingButton = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.textContent?.includes('请')
    );
    expect(qingButton).toBeDefined();

    await act(async () => {
      qingButton!.click();
    });

    expect(audioEngine.playClick).toHaveBeenCalled();
    expect(container?.textContent).toContain('1 / 5 สล็อต');

    // Click '请' in slot area to unslot
    const unslotButton = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.title === 'แตะเพื่อถอดกลับคืนถาด' && b.textContent?.includes('请')
    );
    expect(unslotButton).toBeDefined();

    await act(async () => {
      unslotButton!.click();
    });

    expect(container?.textContent).toContain('0 / 5 สล็อต');
  });

  it('3. resets placed tokens when clicking reset button', async () => {
    const onReset = vi.fn();
    await renderComponent({ onReset });

    // Place one token
    const qingButton = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.textContent?.includes('请')
    );
    await act(async () => {
      qingButton!.click();
    });
    expect(container?.textContent).toContain('1 / 5 สล็อต');

    // Click reset
    const resetBtn = container?.querySelector('button[aria-label="รีเซ็ตบล็อกคำ"]') as HTMLButtonElement;
    expect(resetBtn).toBeDefined();

    await act(async () => {
      resetBtn.click();
    });

    expect(container?.textContent).toContain('0 / 5 สล็อต');
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('4. displays Tutu Guidance Hint when arrangement is incorrect', async () => {
    await renderComponent();

    // Place tokens with bare verb violation: [请, 把, 手机, 拿] (missing 出来)
    const tokenOrder = ['请', '把', '手机', '拿'];
    for (const char of tokenOrder) {
      const btn = Array.from(container?.querySelectorAll('button') || []).find(
        (b) => b.title?.includes('แตะเพื่อวางบล็อก') && b.textContent?.includes(char)
      );
      await act(async () => {
        btn!.click();
      });
    }

    // Click check
    const checkBtn = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.textContent?.includes('ตรวจคำตอบ')
    );
    expect(checkBtn).toBeDefined();

    await act(async () => {
      checkBtn!.click();
    });

    expect(audioEngine.playIncorrect).toHaveBeenCalled();
    expect(container?.textContent).toContain('คำแนะนำจากพี่เลี้ยงทู่ทู่:');
    expect(container?.textContent).toContain('ส่วนเสริมผลลัพธ์/ทิศทาง');
  });

  it('5. validates correct arrangement, plays correct sound, and displays success card', async () => {
    const onSuccess = vi.fn();
    await renderComponent({ onSuccess });

    // Place all in correct order: [请, 把, 手机, 拿, 出来]
    const tokenOrder = ['请', '把', '手机', '拿', '出来'];
    for (const char of tokenOrder) {
      const btn = Array.from(container?.querySelectorAll('button') || []).find(
        (b) => b.title?.includes('แตะเพื่อวางบล็อก') && b.textContent?.includes(char)
      );
      await act(async () => {
        btn!.click();
      });
    }

    const checkBtn = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.textContent?.includes('ตรวจคำตอบ')
    );
    await act(async () => {
      checkBtn!.click();
    });

    expect(audioEngine.playCorrect).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith(100);
    expect(container?.textContent).toContain('เก่งมาก! เรียงประโยคถูกต้องสมบูรณ์แบบ');
    expect(container?.textContent).toContain('请把手机拿出来');
  });

  describe('🔥 Red Team Chaos Attacks', () => {
    it('Attack 1: Rapid Tap Spamming (50 clicks) executes safely without duplicates or state corruption', async () => {
      await renderComponent();

      // Rapidly spam click the exact same token 50 times
      await act(async () => {
        const btn = container?.querySelector('button[title^="แตะเพื่อวางบล็อก"]') as HTMLButtonElement;
        for (let i = 0; i < 50; i++) {
          btn.click();
        }
      });

      // Token should only be placed once (no duplicate t_qing, no overflow)
      expect(container?.textContent).toContain('1 / 5 สล็อต');
    });

    it('Attack 2: Empty Check Guard prevents clicking check when zero tokens are placed', async () => {
      await renderComponent();

      const checkBtn = Array.from(container?.querySelectorAll('button') || []).find(
        (b) => b.textContent?.includes('ตรวจคำตอบ')
      ) as HTMLButtonElement;

      expect(checkBtn.disabled).toBe(true);

      await act(async () => {
        checkBtn.click();
      });

      expect(audioEngine.playIncorrect).not.toHaveBeenCalled();
      expect(audioEngine.playCorrect).not.toHaveBeenCalled();
    });
  });
});

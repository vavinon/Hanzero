/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImmersionArticleReader } from './ImmersionArticleReader';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('ImmersionArticleReader Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    vi.spyOn(audioEngine, 'speak').mockResolvedValue(undefined);
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});
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

  it('renders article title, stats, and initial controls', async () => {
    await act(async () => {
      root!.render(<ImmersionArticleReader />);
    });

    expect(container!.textContent).toContain('跨国商务谈判与采购合同审阅');
    expect(container!.textContent).toContain('การเจรจาธุรกิจระหว่างประเทศและการตรวจร่างสัญญาจัดซื้อ');
    expect(container!.textContent).toContain('HSK 5');
    expect(container!.textContent).toContain('คะแนนความยาก:');
    expect(container!.textContent).toContain('纯 Pure');
    expect(container!.textContent).toContain('拼 Ruby');
    expect(container!.textContent).toContain('点 Tap');
    expect(container!.textContent).toContain('HSK Heatmap');
  });

  it('switches between Pinyin modes and renders ruby tags in ruby mode', async () => {
    await act(async () => {
      root!.render(<ImmersionArticleReader />);
    });

    // Initially in 'pure' mode: no <ruby> elements
    expect(container!.querySelectorAll('ruby').length).toBe(0);

    // Find and click the '拼 Ruby' button
    const buttons = Array.from(container!.querySelectorAll('button'));
    const rubyBtn = buttons.find((b) => b.textContent?.includes('拼 Ruby'));
    expect(rubyBtn).toBeDefined();

    await act(async () => {
      rubyBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // Now <ruby> and <rt> elements should be present
    const rubyElements = container!.querySelectorAll('ruby');
    expect(rubyElements.length).toBeGreaterThan(0);
    const rtElements = container!.querySelectorAll('rt');
    expect(rtElements.length).toBeGreaterThan(0);
  });

  it('toggles HSK Heatmap switch properly', async () => {
    await act(async () => {
      root!.render(<ImmersionArticleReader />);
    });

    const buttons = Array.from(container!.querySelectorAll('button'));
    const heatmapBtn = buttons.find((b) => b.textContent?.includes('HSK Heatmap'));
    expect(heatmapBtn).toBeDefined();
    expect(heatmapBtn!.getAttribute('aria-pressed')).toBe('true');

    await act(async () => {
      heatmapBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(heatmapBtn!.getAttribute('aria-pressed')).toBe('false');

    await act(async () => {
      heatmapBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(heatmapBtn!.getAttribute('aria-pressed')).toBe('true');
  });

  it('opens Slide-up Bottom Sheet on token tap and speaks word', async () => {
    await act(async () => {
      root!.render(<ImmersionArticleReader />);
    });

    // Find token "互利共赢"
    const token = container!.querySelector('[data-testid="token-互利共赢"]');
    expect(token).toBeDefined();

    await act(async () => {
      token!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(audioEngine.speak).toHaveBeenCalledWith('互利共赢');

    // Bottom sheet dialog should appear
    const dialog = container!.querySelector('[role="dialog"]');
    expect(dialog).toBeDefined();
    expect(dialog!.textContent).toContain('hù lì gòng yíng');
    expect(dialog!.textContent).toContain('ผลประโยชน์ร่วมกัน');

    // Close modal via close button
    const closeBtn = dialog!.querySelector('button[aria-label="ปิดหน้าต่าง"]');
    expect(closeBtn).toBeDefined();

    await act(async () => {
      closeBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(audioEngine.stopSpeaking).toHaveBeenCalled();
  });

  it('adds word to SRS and updates button state and toast feedback', async () => {
    const handleAddSRS = vi.fn();
    await act(async () => {
      root!.render(<ImmersionArticleReader onAddSRS={handleAddSRS} />);
    });

    // Click on token "不可抗力"
    const token = container!.querySelector('[data-testid="token-不可抗力"]');
    expect(token).toBeDefined();

    await act(async () => {
      token!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // Click on add to SRS button
    const dialog = container!.querySelector('[role="dialog"]');
    const buttons = Array.from(dialog!.querySelectorAll('button'));
    const addSrsBtn = buttons.find((b) => b.textContent?.includes('บันทึกเข้าคลังทบทวน'));
    expect(addSrsBtn).toBeDefined();

    await act(async () => {
      addSrsBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(handleAddSRS).toHaveBeenCalledTimes(1);
    expect(handleAddSRS).toHaveBeenCalledWith(
      expect.objectContaining({
        hanzi: '不可抗力',
        pinyin: 'bù kě kàng lì',
      })
    );

    // Button should morph into disabled "บันทึกในคลังทบทวนแล้ว 🐰"
    expect(dialog!.textContent).toContain('บันทึกในคลังทบทวนแล้ว');
  });

  it('renders comprehension mini-quiz and handles answer selection with feedback', async () => {
    await act(async () => {
      root!.render(<ImmersionArticleReader />);
    });

    expect(container!.textContent).toContain('แบบทดสอบความเข้าใจ (Mini-Quiz)');
    expect(container!.textContent).toContain('ตามเนื้อหาในบทความ ข้อใดคือเงื่อนไขการชำระเงินตามปกติ');

    // Find option button for Option B (index 1)
    const buttons = Array.from(container!.querySelectorAll('button'));
    const correctOptionBtn = buttons.find((b) =>
      b.textContent?.includes('จ่ายเงินมัดจำ 30% และจ่ายเงินงวดสุดท้าย 70%')
    );
    expect(correctOptionBtn).toBeDefined();

    await act(async () => {
      correctOptionBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container!.textContent).toContain('ถูกต้อง!');
    expect(container!.textContent).toContain('💡 คำอธิบาย:');
  });
});

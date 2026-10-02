/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MinimalPairBoard } from './MinimalPairBoard';
import * as audioEngine from '../../engines/audio/audioEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('MinimalPairBoard Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    vi.spyOn(audioEngine, 'speak').mockResolvedValue();
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playIncorrect').mockImplementation(() => {});

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

  it('renders MinimalPairBoard with default b vs p pair and anatomical cues', async () => {
    await act(async () => {
      root?.render(<MinimalPairBoard initialPairId="b_vs_p" />);
    });

    expect(container?.querySelector('[data-testid="minimal-pair-board"]')).not.toBeNull();
    expect(container?.textContent).toContain('b (ป) vs p (พ)');
    expect(container?.querySelector('[data-testid="card-pair-a"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="card-pair-b"]')).not.toBeNull();

    // Anatomical badges
    expect(container?.textContent).toContain('ไม่พ่นลม');
    expect(container?.textContent).toContain('พ่นลมแรง');
  });

  it('switches between pairs seamlessly when pair tabs are tapped', async () => {
    await act(async () => {
      root?.render(<MinimalPairBoard initialPairId="b_vs_p" />);
    });

    const shiSiTab = container?.querySelector(
      '[data-testid="tab-pair-shi_vs_si"]'
    ) as HTMLButtonElement;
    expect(shiSiTab).not.toBeNull();

    await act(async () => {
      shiSiTab.click();
    });

    expect(container?.textContent).toContain('shì (是) vs sì (四)');
    expect(container?.textContent).toContain('ม้วนลิ้น');
    expect(container?.textContent).toContain('ลิ้นแบน');
  });

  it('plays speech audio when audio buttons on Card A or Card B are clicked', async () => {
    const speakSpy = vi.spyOn(audioEngine, 'speak');

    await act(async () => {
      root?.render(<MinimalPairBoard initialPairId="b_vs_p" />);
    });

    const playABtn = container?.querySelector('[data-testid="btn-play-a"]') as HTMLButtonElement;
    expect(playABtn).not.toBeNull();

    await act(async () => {
      playABtn.click();
    });

    expect(speakSpy).toHaveBeenCalledWith('八', { rate: 0.85 });

    const playBBtn = container?.querySelector('[data-testid="btn-play-b"]') as HTMLButtonElement;
    expect(playBBtn).not.toBeNull();

    await act(async () => {
      playBBtn.click();
    });

    expect(speakSpy).toHaveBeenCalledWith('怕', { rate: 0.85 });
  });

  it('switches to Test My Ears (หูทองคำ) mode and handles answers in safe zone', async () => {
    await act(async () => {
      root?.render(<MinimalPairBoard initialPairId="b_vs_p" />);
    });

    const testEarsBtn = container?.querySelector(
      '[data-testid="btn-mode-test-ears"]'
    ) as HTMLButtonElement;
    expect(testEarsBtn).not.toBeNull();

    await act(async () => {
      testEarsBtn.click();
    });

    expect(container?.textContent).toContain('หูทองคำ');

    // Tap Card A as guess
    const cardA = container?.querySelector('[data-testid="card-pair-a"]') as HTMLDivElement;
    expect(cardA).not.toBeNull();

    await act(async () => {
      cardA.click();
    });

    // Result banner should appear
    expect(container?.querySelector('[data-testid="quiz-result-banner"]')).not.toBeNull();
  });
});

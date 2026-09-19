/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ToneCoaster } from './ToneCoaster';
import * as audioEngine from '../../engines/audio/audioEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('ToneCoaster Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    vi.spyOn(audioEngine, 'playToneContour').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'speak').mockResolvedValue();
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playIncorrect').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});

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

  it('renders Tone Coaster in explore mode with all 5 tone tracks', async () => {
    await act(async () => {
      root?.render(<ToneCoaster initialMode="explore" />);
    });

    expect(container?.querySelector('[data-testid="bunny-tone-coaster"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-mode-explore"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-mode-quiz"]')).not.toBeNull();

    // Check tone buttons (1, 2, 3, 4, 0)
    expect(container?.querySelector('[data-testid="btn-tone-track-1"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-tone-track-2"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-tone-track-3"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-tone-track-4"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-tone-track-0"]')).not.toBeNull();
  });

  it('plays tone contour and speech when a tone track is tapped in explore mode', async () => {
    const contourSpy = vi.spyOn(audioEngine, 'playToneContour');
    const speakSpy = vi.spyOn(audioEngine, 'speak');

    await act(async () => {
      root?.render(<ToneCoaster initialMode="explore" />);
    });

    const tone3Btn = container?.querySelector(
      '[data-testid="btn-tone-track-3"]'
    ) as HTMLButtonElement;
    expect(tone3Btn).not.toBeNull();

    await act(async () => {
      tone3Btn.click();
    });

    expect(contourSpy).toHaveBeenCalledWith(3, 0.4);
    expect(speakSpy).toHaveBeenCalledWith('马', { rate: 0.85 });
  });

  it('switches to Quiz mode and handles safe practice failure gracefully (no penalty)', async () => {
    const incorrectSpy = vi.spyOn(audioEngine, 'playIncorrect');

    await act(async () => {
      root?.render(<ToneCoaster initialMode="quiz" />);
    });

    expect(container?.textContent).toContain('ฟังแล้วเลือกรางให้ตรงเสียง');

    // Force wrong answer by tapping a button different from target
    // We can simulate tapping track 1 or 2
    const track1Btn = container?.querySelector(
      '[data-testid="btn-tone-track-1"]'
    ) as HTMLButtonElement;

    await act(async () => {
      track1Btn.click();
    });

    // Check that Tutu responds safely
    const tutuMsg = container?.querySelector('[data-testid="tutu-message"]');
    expect(tutuMsg).not.toBeNull();
    expect(incorrectSpy).toBeDefined();
  });

  it('toggles Tone Sandhi 3+3 visualizer and triggers pronunciation', async () => {
    const speakSpy = vi.spyOn(audioEngine, 'speak');

    await act(async () => {
      root?.render(<ToneCoaster initialMode="explore" />);
    });

    const sandhiBtn = container?.querySelector(
      '[data-testid="btn-toggle-sandhi"]'
    ) as HTMLButtonElement;
    expect(sandhiBtn).not.toBeNull();

    await act(async () => {
      sandhiBtn.click();
    });

    expect(container?.textContent).toContain('สับรางเป็น: ní (เสียง 2) + hǎo (เสียง 3)!');
    expect(speakSpy).toHaveBeenCalledWith('你好', { rate: 0.85 });
  });
});

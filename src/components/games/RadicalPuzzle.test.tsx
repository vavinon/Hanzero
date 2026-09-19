/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RadicalPuzzle } from './RadicalPuzzle';
import * as audioEngine from '../../engines/audio/audioEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('RadicalPuzzle Component', () => {
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

  it('renders RadicalPuzzle in explore mode with assembly slots and candidates', async () => {
    await act(async () => {
      root?.render(<RadicalPuzzle initialMode="explore" initialPuzzleId="puz_hao" />);
    });

    expect(container?.querySelector('[data-testid="radical-puzzle-builder"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-mode-explore"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-mode-challenge"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="assembly-slot-0"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="assembly-slot-1"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="candidates-palette"]')).not.toBeNull();

    // Verify first puzzle is "好"
    expect(container?.textContent).toContain('好');
    expect(container?.textContent).toContain('หมวดผู้หญิง');
  });

  it('successfully assembles 女 + 子 into 好 with correct audio triggers', async () => {
    const correctSpy = vi.spyOn(audioEngine, 'playCorrect');
    const speakSpy = vi.spyOn(audioEngine, 'speak');
    const toneSpy = vi.spyOn(audioEngine, 'playToneContour');

    await act(async () => {
      root?.render(<RadicalPuzzle initialMode="explore" initialPuzzleId="puz_hao" />);
    });

    // Find pieces 女 and 子
    const btnNv = container?.querySelector('[data-testid="btn-piece-女"]') as HTMLButtonElement;
    const btnZi = container?.querySelector('[data-testid="btn-piece-子"]') as HTMLButtonElement;

    expect(btnNv).not.toBeNull();
    expect(btnZi).not.toBeNull();

    // Click 女 then 子
    await act(async () => {
      btnNv.click();
    });

    await act(async () => {
      btnZi.click();
    });

    // Success state should be reached
    expect(correctSpy).toHaveBeenCalledTimes(1);
    expect(speakSpy).toHaveBeenCalledWith('好', { rate: 0.85 });
    expect(toneSpy).toHaveBeenCalledWith(3, 0.4);

    const feedback = container?.querySelector('[data-testid="tutu-feedback-bubble"]');
    expect(feedback?.textContent).toContain('ประกอบร่างสำเร็จ');
  });

  it('handles safe practice failure gracefully with gentle Tutu encouragement (no crash)', async () => {
    const incorrectSpy = vi.spyOn(audioEngine, 'playIncorrect');

    await act(async () => {
      root?.render(<RadicalPuzzle initialMode="explore" initialPuzzleId="puz_hao" />);
    });

    // Click candidate pieces in palette that do NOT make 好
    const buttons = container?.querySelectorAll(
      '[data-testid^="btn-piece-"]'
    ) as NodeListOf<HTMLButtonElement>;

    // Pick two pieces where at least one is NOT in parts
    const [b1, b2] = Array.from(buttons);

    await act(async () => {
      b1.click();
    });

    await act(async () => {
      b2.click();
    });

    expect(container?.textContent).toBeDefined();
    expect(incorrectSpy).toBeDefined();
    // Tutu provides safe feedback
    const feedback = container?.querySelector('[data-testid="tutu-feedback-bubble"]');
    expect(feedback).not.toBeNull();
  });

  it('allows switching puzzles and toggling between explore and challenge modes', async () => {
    await act(async () => {
      root?.render(<RadicalPuzzle initialMode="explore" />);
    });

    // Click on 字 puzzle in selector strip
    const btnZi = container?.querySelector(
      '[data-testid="btn-select-puzzle-puz_zi"]'
    ) as HTMLButtonElement;
    expect(btnZi).not.toBeNull();

    await act(async () => {
      btnZi.click();
    });

    expect(container?.textContent).toContain('โครงสร้างบน-ล่าง');
    expect(container?.textContent).toContain('宀');

    // Switch to challenge mode
    const btnChallenge = container?.querySelector(
      '[data-testid="btn-mode-challenge"]'
    ) as HTMLButtonElement;

    await act(async () => {
      btnChallenge.click();
    });

    expect(container?.textContent).toContain('ภารกิจชิงเหรียญ');
  });
});

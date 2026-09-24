/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImmersionHub } from './ImmersionHub';
import * as audioEngine from '../../engines/audio/audioEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('ImmersionHub Component (TASK-806)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    vi.spyOn(audioEngine, 'speak').mockResolvedValue();
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});

    window.scrollTo = vi.fn();

    // Canvas mock
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fill: vi.fn(),
      roundRect: vi.fn(),
      createLinearGradient: vi.fn().mockReturnValue({
        addColorStop: vi.fn(),
      }),
    });

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

  it('renders overview dashboard with 4 quest cards and scholar title', async () => {
    await act(async () => {
      root?.render(<ImmersionHub />);
    });

    expect(container?.textContent).toContain('หอวิชาการฮั่นหลิน 翰林院');
    expect(container?.querySelector('[data-testid="hub-overview-content"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="quest-card-reader"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="quest-card-idiom"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="quest-card-podcast"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="quest-card-voice"]')).not.toBeNull();
  });

  it('switches to reader view when clicking quest-card-reader', async () => {
    await act(async () => {
      root?.render(<ImmersionHub />);
    });

    const readerCard = container?.querySelector('[data-testid="quest-card-reader"]') as HTMLDivElement;
    expect(readerCard).not.toBeNull();

    await act(async () => {
      readerCard.click();
    });

    expect(container?.querySelector('[data-testid="hub-reader-content"]')).not.toBeNull();
  });

  it('switches tabs directly via navigation buttons', async () => {
    await act(async () => {
      root?.render(<ImmersionHub />);
    });

    const idiomTabBtn = container?.querySelector('[data-testid="hub-nav-tab-idiom"]') as HTMLButtonElement;
    expect(idiomTabBtn).not.toBeNull();

    await act(async () => {
      idiomTabBtn.click();
    });

    expect(container?.querySelector('[data-testid="hub-idiom-content"]')).not.toBeNull();

    const voiceTabBtn = container?.querySelector('[data-testid="hub-nav-tab-voice"]') as HTMLButtonElement;
    await act(async () => {
      voiceTabBtn.click();
    });

    expect(container?.querySelector('[data-testid="hub-voice-content"]')).not.toBeNull();
  });

  it('calls onBackToMap when back button is clicked', async () => {
    const backSpy = vi.fn();

    await act(async () => {
      root?.render(<ImmersionHub onBackToMap={backSpy} />);
    });

    const backBtn = container?.querySelector('[data-testid="btn-hub-back-to-map"]') as HTMLButtonElement;
    expect(backBtn).not.toBeNull();

    await act(async () => {
      backBtn.click();
    });

    expect(backSpy).toHaveBeenCalledTimes(1);
  });
});

/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { VoicePitchingRecorder, DEFAULT_PITCH_SCENARIOS } from './VoicePitchingRecorder';
import * as audioEngine from '../../engines/audio/audioEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('VoicePitchingRecorder Component (TASK-806)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    vi.spyOn(audioEngine, 'speak').mockResolvedValue();
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});

    // Mock HTMLCanvasElement getContext
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

  it('renders initial pitch scenario, prompt text, pinyin and canvas', async () => {
    await act(async () => {
      root?.render(<VoicePitchingRecorder />);
    });

    expect(container?.textContent).toContain('สตูดิโอฝึกพูดนำเสนอ & จำลองวิกฤต 2.0');
    expect(container?.textContent).toContain('各位评委好');
    expect(container?.textContent).toContain('Gèwèi píngwěi hǎo');
    expect(container?.textContent).toContain('สวัสดีท่านกรรมการครับ');
    expect(container?.querySelector('[data-testid="pitch-waveform-canvas"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-start-pitch-recording"]')).not.toBeNull();
  });

  it('switches scenarios when clicking scenario tabs', async () => {
    await act(async () => {
      root?.render(<VoicePitchingRecorder />);
    });

    const secondTab = container?.querySelector(
      `[data-testid="scenario-tab-${DEFAULT_PITCH_SCENARIOS[1].id}"]`
    ) as HTMLButtonElement;
    expect(secondTab).not.toBeNull();

    await act(async () => {
      secondTab.click();
    });

    expect(container?.textContent).toContain(DEFAULT_PITCH_SCENARIOS[1].promptZh);
    expect(container?.textContent).toContain(DEFAULT_PITCH_SCENARIOS[1].meaningTh);
  });

  it('speaks prompt on play native sound button click', async () => {
    const speakSpy = vi.spyOn(audioEngine, 'speak');

    await act(async () => {
      root?.render(<VoicePitchingRecorder />);
    });

    const nativeBtn = container?.querySelector(
      '[data-testid="btn-play-native-prompt"]'
    ) as HTMLButtonElement;
    expect(nativeBtn).not.toBeNull();

    await act(async () => {
      nativeBtn.click();
    });

    expect(speakSpy).toHaveBeenCalledWith(DEFAULT_PITCH_SCENARIOS[0].promptZh, {
      rate: 0.9,
      onEnd: expect.any(Function),
      onError: expect.any(Function),
    });
  });

  it('handles unsupported environment without crash', async () => {
    const originalMediaDevices = navigator.mediaDevices;
    Object.defineProperty(navigator, 'mediaDevices', {
      value: undefined,
      configurable: true,
    });

    await act(async () => {
      root?.render(<VoicePitchingRecorder />);
    });

    const startBtn = container?.querySelector(
      '[data-testid="btn-start-pitch-recording"]'
    ) as HTMLButtonElement;

    await act(async () => {
      startBtn.click();
    });

    expect(container?.querySelector('[data-testid="pitch-error-banner"]')).not.toBeNull();
    expect(container?.textContent).toContain('เบราว์เซอร์นี้ยังไม่รองรับ Web MediaRecorder API');

    Object.defineProperty(navigator, 'mediaDevices', {
      value: originalMediaDevices,
      configurable: true,
    });
  });

  it('handles permission denied error gracefully', async () => {
    const originalMediaRecorder = window.MediaRecorder;
    (window as unknown as { MediaRecorder: unknown }).MediaRecorder = class MockRecorder {
      static isTypeSupported = vi.fn().mockReturnValue(true);
    };

    const mockGetUserMedia = vi.fn().mockRejectedValue(new Error('NotAllowedError'));
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: mockGetUserMedia,
      },
      configurable: true,
    });

    await act(async () => {
      root?.render(<VoicePitchingRecorder />);
    });

    const startBtn = container?.querySelector(
      '[data-testid="btn-start-pitch-recording"]'
    ) as HTMLButtonElement;

    await act(async () => {
      startBtn.click();
    });

    expect(container?.querySelector('[data-testid="pitch-error-banner"]')).not.toBeNull();
    expect(container?.textContent).toContain('ยังไม่ได้รับอนุญาตให้ใช้ไมโครโฟน');

    (window as unknown as { MediaRecorder: unknown }).MediaRecorder = originalMediaRecorder;
  });
});

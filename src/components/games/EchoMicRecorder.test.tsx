/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EchoMicRecorder } from './EchoMicRecorder';
import * as audioEngine from '../../engines/audio/audioEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('EchoMicRecorder Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    vi.spyOn(audioEngine, 'speak').mockResolvedValue();
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
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

  it('renders target word, pinyin, and meaning in Thai', async () => {
    await act(async () => {
      root?.render(
        <EchoMicRecorder text="你好" pinyin="nǐ hǎo" meaningTh="สวัสดี" />
      );
    });

    expect(container?.textContent).toContain('你好');
    expect(container?.textContent).toContain('nǐ hǎo');
    expect(container?.textContent).toContain('สวัสดี');
    expect(container?.querySelector('[data-testid="btn-start-recording"]')).not.toBeNull();
  });

  it('plays native reference sound when prompt speaker button is clicked', async () => {
    const speakSpy = vi.spyOn(audioEngine, 'speak');

    await act(async () => {
      root?.render(
        <EchoMicRecorder text="mā" pinyin="mā" meaningTh="แม่" />
      );
    });

    const promptBtn = container?.querySelector(
      '[data-testid="btn-play-native-prompt"]'
    ) as HTMLButtonElement;
    expect(promptBtn).not.toBeNull();

    await act(async () => {
      promptBtn.click();
    });

    expect(speakSpy).toHaveBeenCalledWith('mā', { rate: 0.85 });
  });

  it('handles unsupported mediaDevices gracefully without crashing', async () => {
    const originalMediaDevices = navigator.mediaDevices;
    // Mock navigator.mediaDevices as undefined
    Object.defineProperty(navigator, 'mediaDevices', {
      value: undefined,
      configurable: true,
    });

    await act(async () => {
      root?.render(
        <EchoMicRecorder text="八" pinyin="bā" meaningTh="แปด" />
      );
    });

    const recordBtn = container?.querySelector(
      '[data-testid="btn-start-recording"]'
    ) as HTMLButtonElement;

    await act(async () => {
      recordBtn.click();
    });

    expect(container?.querySelector('[data-testid="mic-error-banner"]')).not.toBeNull();
    expect(container?.textContent).toContain('เบราว์เซอร์นี้ยังไม่รองรับการอัดเสียง');

    // Restore
    Object.defineProperty(navigator, 'mediaDevices', {
      value: originalMediaDevices,
      configurable: true,
    });
  });

  it('handles permission denied error with resilient fallback banner', async () => {
    const originalMediaRecorder = window.MediaRecorder;
    (window as unknown as { MediaRecorder: unknown }).MediaRecorder = class MockRecorder {
      static isTypeSupported = vi.fn().mockReturnValue(true);
    };

    const mockGetUserMedia = vi.fn().mockRejectedValue(new Error('Permission denied'));
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: mockGetUserMedia,
      },
      configurable: true,
    });

    await act(async () => {
      root?.render(
        <EchoMicRecorder text="大" pinyin="dà" meaningTh="ใหญ่" />
      );
    });

    const recordBtn = container?.querySelector(
      '[data-testid="btn-start-recording"]'
    ) as HTMLButtonElement;

    await act(async () => {
      recordBtn.click();
    });

    expect(container?.querySelector('[data-testid="mic-error-banner"]')).not.toBeNull();
    expect(container?.textContent).toContain('ยังไม่ได้รับอนุญาตให้ใช้ไมโครโฟน');

    (window as unknown as { MediaRecorder: unknown }).MediaRecorder = originalMediaRecorder;
  });
});

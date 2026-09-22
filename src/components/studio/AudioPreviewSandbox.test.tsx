/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AudioPreviewSandbox } from './AudioPreviewSandbox';
import { studioAudioController } from './studioAudioPlayer';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

vi.mock('../../engines/audio/audioEngine', async () => {
  const actual = await vi.importActual('../../engines/audio/audioEngine');
  return {
    ...actual,
    hasChineseVoice: vi.fn(() => true),
    speak: vi.fn(),
    stopSpeaking: vi.fn(),
  };
});

describe('AudioPreviewSandbox Component (TASK-604)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    vi.clearAllMocks();
    studioAudioController.stop();
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
    studioAudioController.stop();
    vi.restoreAllMocks();
  });

  it('renders audio sandbox with header and default input', async () => {
    await act(async () => {
      root?.render(<AudioPreviewSandbox initialText="你好" />);
    });

    expect(container?.textContent).toContain('Audio Sandbox');
    expect(container?.querySelector('[data-testid="voice-status-badge"]')).not.toBeNull();
    expect(container?.textContent).toContain('zh-CN เสียงแท้');

    const input = container?.querySelector('[data-testid="sandbox-text-input"]') as HTMLInputElement;
    expect(input.value).toBe('你好');
  });

  it('detects tone sandhi for "你好" and displays banner', async () => {
    await act(async () => {
      root?.render(<AudioPreviewSandbox initialText="你好" />);
    });

    const banner = container?.querySelector('[data-testid="tone-sandhi-banner"]');
    expect(banner).not.toBeNull();
    expect(banner?.textContent).toContain('3+3 ➔ 2+3');
    expect(banner?.textContent).toContain('ní hǎo');
  });

  it('updates text on input change and clears text on clear button click', async () => {
    await act(async () => {
      root?.render(<AudioPreviewSandbox initialText="你好" />);
    });

    const input = container?.querySelector('[data-testid="sandbox-text-input"]') as HTMLInputElement;
    
    // Simulate typing
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      setter?.call(input, '谢谢');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(input.value).toBe('谢谢');

    // Click clear button
    const clearBtn = container?.querySelector('button[aria-label="ล้างข้อความ"]') as HTMLButtonElement;
    expect(clearBtn).not.toBeNull();
    await act(async () => {
      clearBtn.click();
    });
    expect(input.value).toBe('');
  });

  it('switches speed rate between 1.0x and 0.75x', async () => {
    await act(async () => {
      root?.render(<AudioPreviewSandbox initialText="再见" />);
    });

    const rate075Btn = container?.querySelector('[data-testid="rate-075x-btn"]') as HTMLButtonElement;
    await act(async () => {
      rate075Btn.click();
    });

    const playSpy = vi.spyOn(studioAudioController, 'play');
    const playBtn = container?.querySelector('[data-testid="sandbox-play-btn"]') as HTMLButtonElement;
    
    await act(async () => {
      playBtn.click();
    });

    expect(playSpy).toHaveBeenCalledWith('studio-sandbox-audio', '再见', 0.75);
  });

  it('selects a quick chip to set text and play immediately', async () => {
    const playSpy = vi.spyOn(studioAudioController, 'play');
    
    await act(async () => {
      root?.render(<AudioPreviewSandbox sampleWords={['苹果', '香蕉']} />);
    });

    const chip = container?.querySelector('[data-testid="quick-chip-苹果"]') as HTMLButtonElement;
    expect(chip).not.toBeNull();

    await act(async () => {
      chip.click();
    });

    const input = container?.querySelector('[data-testid="sandbox-text-input"]') as HTMLInputElement;
    expect(input.value).toBe('苹果');
    expect(playSpy).toHaveBeenCalledWith('studio-sandbox-audio', '苹果', 1.0);
  });
});

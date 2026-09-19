/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { VoiceHealthModal } from './VoiceHealthModal';
import * as voiceHealthEngine from '../../engines/audio/voiceHealthEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('VoiceHealthModal Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    vi.spyOn(voiceHealthEngine, 'inspectVoiceHealth').mockResolvedValue({
      grade: 'optimal',
      clientOS: 'windows',
      hasChineseVoice: true,
      isNeural: true,
      activeVoiceName: 'Xiaoxiao',
      totalChineseVoices: 2,
      isOnline: true,
      samplePhrase: '你好！很高兴认识你。',
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

  it('renders nothing when isOpen is false', async () => {
    await act(async () => {
      root?.render(<VoiceHealthModal isOpen={false} onClose={vi.fn()} />);
    });

    expect(container?.innerHTML).toBe('');
  });

  it('renders voice health grade, tester button, and triggers test playback', async () => {
    const playSpy = vi.spyOn(voiceHealthEngine, 'playSamplePhrase').mockResolvedValue(true);
    const handleClose = vi.fn();

    await act(async () => {
      root?.render(<VoiceHealthModal isOpen={true} onClose={handleClose} />);
    });

    expect(container?.textContent).toContain('ตรวจสุขภาพเสียงภาษาจีน');
    expect(container?.textContent).toContain('ยอดเยี่ยม: ระบบตรวจพบเสียงพรีเมียม');
    expect(container?.textContent).toContain('Xiaoxiao');

    // Click tester button
    const testButton = container?.querySelector('button.btn-tactile-primary') as HTMLButtonElement;
    expect(testButton).not.toBeNull();

    await act(async () => {
      testButton.click();
    });

    expect(playSpy).toHaveBeenCalled();
  });

  it('allows switching OS installation guide tabs (iOS / Android / Mac)', async () => {
    await act(async () => {
      root?.render(<VoiceHealthModal isOpen={true} onClose={vi.fn()} />);
    });

    const buttons = Array.from(container?.querySelectorAll('button') || []);
    const iosTab = buttons.find((b) => b.textContent === 'iOS');
    expect(iosTab).toBeDefined();

    await act(async () => {
      iosTab?.click();
    });

    expect(container?.textContent).toContain('iPhone / iPad');
    expect(container?.textContent).toContain('Mute');
  });

  it('calls onClose when close button or bottom button is clicked', async () => {
    const handleClose = vi.fn();

    await act(async () => {
      root?.render(<VoiceHealthModal isOpen={true} onClose={handleClose} />);
    });

    const closeIconBtn = container?.querySelector('button[aria-label="ปิดหน้าต่าง"]') as HTMLButtonElement;
    expect(closeIconBtn).not.toBeNull();

    await act(async () => {
      closeIconBtn.click();
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

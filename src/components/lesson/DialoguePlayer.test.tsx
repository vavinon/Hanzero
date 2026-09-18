/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DialoguePlayer } from './DialoguePlayer';
import { DialogueLine } from '../../types/lesson';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// Mock Dialogue lines from Unit 1 Lesson 1
const mockDialogue: DialogueLine[] = [
  {
    speaker: 'A',
    speaker_name: 'น้องกระต่ายทู่ทู่ 🐰 (Tutu)',
    zh: '你好！',
    pinyin: 'Nǐ hǎo!',
    th: 'สวัสดีจ้า!',
    en: 'Hello!',
  },
  {
    speaker: 'B',
    speaker_name: 'สมชาย 🧒 (Somchai)',
    zh: '你好！',
    pinyin: 'Nǐ hǎo!',
    th: 'สวัสดีครับ!',
    en: 'Hello!',
  },
  {
    speaker: 'A',
    speaker_name: 'น้องกระต่ายทู่ทู่ 🐰 (Tutu)',
    zh: '谢谢！',
    pinyin: 'Xièxie!',
    th: 'ขอบคุณนะ!',
    en: 'Thank you!',
  },
  {
    speaker: 'B',
    speaker_name: 'สมชาย 🧒 (Somchai)',
    zh: '不客气，再见！',
    pinyin: 'Bú kèqi, zàijiàn!',
    th: 'ไม่เป็นไรครับ แล้วพบกันใหม่นะ!',
    en: "You're welcome, goodbye!",
  },
];

describe('DialoguePlayer Component (Phase 2 Slice 2.3)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let speakSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let stopSpeakingSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let unlockAudioSpy: any;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    speakSpy = vi.spyOn(audioEngine, 'speak').mockImplementation((_text, options) => {
      options?.onStart?.();
      options?.onEnd?.();
      return Promise.resolve();
    });
    stopSpeakingSpy = vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    unlockAudioSpy = vi.spyOn(audioEngine, 'unlockAudioContext').mockResolvedValue(true);
    vi.spyOn(audioEngine, 'hasChineseVoice').mockReturnValue(true);
    vi.spyOn(audioEngine, 'onVoicesChanged').mockReturnValue(() => {});
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
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

  // --------------------------------------------------------------------------
  // 1. Rendering & Structure Tests
  // --------------------------------------------------------------------------
  describe('Rendering & Speaker Layout', () => {
    it('renders all dialogue lines with correct avatars and speaker names', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} title="ทักทายแรกพบ" />);
      });

      expect(container?.textContent).toContain('ทักทายแรกพบ');
      expect(container?.textContent).toContain('4 ประโยคสนทนา');
      expect(container?.textContent).toContain('น้องกระต่ายทู่ทู่ 🐰 (Tutu)');
      expect(container?.textContent).toContain('สมชาย 🧒 (Somchai)');
      expect(container?.textContent).toContain('你好！');
      expect(container?.textContent).toContain('谢谢！');
      expect(container?.textContent).toContain('不客气，再见！');

      // Check avatars
      expect(container?.textContent).toContain('🐰');
      expect(container?.textContent).toContain('🧒');
    });

    it('renders correct flex orientation for Speaker A and Speaker B', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      const rows = container?.querySelectorAll('.dialogue-bubble-row');
      expect(rows).toHaveLength(4);
      expect(rows?.[0].classList.contains('speaker-a')).toBe(true);
      expect(rows?.[1].classList.contains('speaker-b')).toBe(true);
      expect(rows?.[2].classList.contains('speaker-a')).toBe(true);
      expect(rows?.[3].classList.contains('speaker-b')).toBe(true);
    });

    it('conforms to W3C ARIA hierarchy: no nested role="button" inside interactive controls', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      // Confirm the bubble div itself does NOT have role="button"
      const bubbleDivs = container?.querySelectorAll('.dialogue-bubble');
      bubbleDivs?.forEach((bubble) => {
        expect(bubble.getAttribute('role')).not.toBe('button');
      });
    });
  });

  // --------------------------------------------------------------------------
  // 2. 3-Tier Scaffolding & Tap-to-Peek Tests
  // --------------------------------------------------------------------------
  describe('3-Tier Scaffolding & Tap to Peek', () => {
    it('displays full mode by default: Hanzi, Pinyin, Thai and English', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} initialScaffolding="full" />);
      });

      expect(container?.textContent).toContain('Nǐ hǎo!');
      expect(container?.textContent).toContain('สวัสดีจ้า!');
      expect(container?.textContent).toContain('Hello!');
      expect(container?.textContent).not.toContain('[ซ่อนคำแปล');
      expect(container?.textContent).not.toContain('[ซ่อนพินอิน');
    });

    it('switches to pinyin_only mode: hides translations and shows peek option', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      // Find and click "พินอิน" tab
      const pinyinTab = Array.from(container?.querySelectorAll('button[role="tab"]') || []).find(
        (btn) => btn.textContent?.includes('พินอิน')
      ) as HTMLButtonElement;

      expect(pinyinTab).toBeTruthy();

      await act(async () => {
        pinyinTab.click();
      });

      expect(container?.textContent).toContain('Nǐ hǎo!');
      expect(container?.textContent).toContain('[ซ่อนคำแปล — แตะเพื่อแอบดู]');
      expect(container?.textContent).not.toContain('สวัสดีจ้า!');

      // Tap to peek on first line
      const peekButtons = container?.querySelectorAll('button[aria-label="แอบดูคำอ่านและคำแปล"]');
      expect(peekButtons?.length).toBeGreaterThan(0);

      await act(async () => {
        (peekButtons?.[0] as HTMLButtonElement).click();
      });

      // After peeking, line 1 translation is revealed
      expect(container?.textContent).toContain('สวัสดีจ้า!');
      expect(container?.textContent).toContain('Hello!');

      // Tapping again hides it
      const hideButtons = container?.querySelectorAll('button[aria-label="ซ่อนคำแปล"]');
      expect(hideButtons?.length).toBeGreaterThan(0);

      await act(async () => {
        (hideButtons?.[0] as HTMLButtonElement).click();
      });

      expect(container?.textContent).not.toContain('สวัสดีจ้า!');
    });

    it('switches to hanzi_only mode: hides pinyin and translations', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      const hanziTab = Array.from(container?.querySelectorAll('button[role="tab"]') || []).find(
        (btn) => btn.textContent?.includes('จีนล้วน')
      ) as HTMLButtonElement;

      await act(async () => {
        hanziTab.click();
      });

      expect(container?.textContent).toContain('[ซ่อนพินอิน — แตะเพื่อแอบดู]');
      expect(container?.textContent).toContain('[ซ่อนคำแปล — แตะเพื่อแอบดู]');
      expect(container?.textContent).not.toContain('Nǐ hǎo!');
      expect(container?.textContent).not.toContain('สวัสดีจ้า!');

      // Tap to peek reveals both pinyin and translation with "แอบดู 👀" tag
      const peekButtons = container?.querySelectorAll('button[aria-label="แอบดูคำอ่านและคำแปล"]');
      await act(async () => {
        (peekButtons?.[0] as HTMLButtonElement).click();
      });

      expect(container?.textContent).toContain('Nǐ hǎo!');
      expect(container?.textContent).toContain('แอบดู 👀');
      expect(container?.textContent).toContain('สวัสดีจ้า!');
    });
  });

  // --------------------------------------------------------------------------
  // 3. Audio Playback & Speed Controls
  // --------------------------------------------------------------------------
  describe('Audio Playback & Speed Control', () => {
    it('plays single line when clicking audio button', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      const audioButtons = container?.querySelectorAll('button[aria-label^="ฟังเสียงประโยค:"]');
      expect(audioButtons?.length).toBe(4);

      await act(async () => {
        (audioButtons?.[2] as HTMLButtonElement).click(); // Line 2: 谢谢！
      });

      expect(speakSpy).toHaveBeenCalledWith('谢谢！', expect.objectContaining({ rate: 1.0 }));
    });

    it('toggles speed between 1.0x and 0.75x', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} defaultSpeed={1.0} />);
      });

      const speedBtn = container?.querySelector('button[aria-label^="ความเร็วเสียง"]') as HTMLButtonElement;
      expect(speedBtn).toBeTruthy();
      expect(speedBtn.textContent).toContain('1.0x');

      await act(async () => {
        speedBtn.click();
      });

      expect(speedBtn.textContent).toContain('0.75x ช้า');

      // Now play a line and check speech rate
      const audioButtons = container?.querySelectorAll('button[aria-label^="ฟังเสียงประโยค:"]');
      await act(async () => {
        (audioButtons?.[0] as HTMLButtonElement).click();
      });

      expect(speakSpy).toHaveBeenCalledWith('你好！', expect.objectContaining({ rate: 0.75 }));
    });

    it('executes sequential playback (Play All) and calls onPlaybackComplete', async () => {
      vi.useFakeTimers();

      const onComplete = vi.fn();
      const onLineChange = vi.fn();

      await act(async () => {
        root!.render(
          <DialoguePlayer
            dialogue={mockDialogue}
            onPlaybackComplete={onComplete}
            onLineChange={onLineChange}
          />
        );
      });

      const playAllBtn = container?.querySelector('button[aria-label^="เล่นบทสนทนาทั้งหมด"]') as HTMLButtonElement;
      expect(playAllBtn).toBeTruthy();

      await act(async () => {
        playAllBtn.click();
      });

      // Line 0 spoken
      expect(speakSpy).toHaveBeenCalledWith('你好！', expect.anything());
      expect(onLineChange).toHaveBeenCalledWith(0);

      // Fast-forward delay between line 0 and line 1
      await act(async () => {
        vi.advanceTimersByTime(550);
      });

      // Line 1 spoken
      expect(speakSpy).toHaveBeenCalledWith('你好！', expect.anything());

      // Advance through all lines
      await act(async () => {
        vi.advanceTimersByTime(550);
      });
      await act(async () => {
        vi.advanceTimersByTime(550);
      });

      expect(onComplete).toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('stops active speech and sequential playback when user clicks stop button', async () => {
      vi.useFakeTimers();

      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      const playAllBtn = container?.querySelector('button[aria-label^="เล่นบทสนทนาทั้งหมด"]') as HTMLButtonElement;

      await act(async () => {
        playAllBtn.click();
      });

      // Now it should show stop button
      const stopBtn = container?.querySelector('button[aria-label="หยุดเล่นบทสนทนา"]') as HTMLButtonElement;
      expect(stopBtn).toBeTruthy();

      await act(async () => {
        stopBtn.click();
      });

      expect(stopSpeakingSpy).toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('cleans up audio engine and timers on unmount', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} autoPlay={true} />);
      });

      await act(async () => {
        root!.unmount();
        root = null;
      });

      expect(stopSpeakingSpy).toHaveBeenCalled();
    });
  });

  // --------------------------------------------------------------------------
  // 4. Red Team Adversarial Regression Tests
  // --------------------------------------------------------------------------
  describe('Red Team Adversarial Hardening (VULN-01 to VULN-07)', () => {
    it('[VULN-01] handles rapid single-line clicks without highlight desynchronization', async () => {
      let pendingResolveLine0: (() => void) | null = null;
      let pendingResolveLine2: (() => void) | null = null;
      speakSpy.mockImplementation((text: string) => {
        if (text === '你好！') {
          return new Promise<void>((resolve) => {
            pendingResolveLine0 = resolve;
          });
        }
        if (text === '谢谢！') {
          return new Promise<void>((resolve) => {
            pendingResolveLine2 = resolve;
          });
        }
        return Promise.resolve();
      });

      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      const audioButtons = container?.querySelectorAll('button[aria-label^="ฟังเสียงประโยค:"]');

      // Click Line 0
      await act(async () => {
        (audioButtons?.[0] as HTMLButtonElement).click();
      });

      // Rapidly click Line 2 before Line 0 finishes
      await act(async () => {
        (audioButtons?.[2] as HTMLButtonElement).click();
      });

      // Line 0's promise resolves late (interrupted)
      await act(async () => {
        pendingResolveLine0?.();
      });

      // Bubble 2 should STILL be the active bubble, not cleared by Line 0
      const bubbles = container?.querySelectorAll('.dialogue-bubble');
      expect(bubbles?.[2].classList.contains('is-active')).toBe(true);

      // Now Line 2 finishes
      await act(async () => {
        pendingResolveLine2?.();
      });

      // Bubble 2 clears upon completion
      expect(bubbles?.[2].classList.contains('is-active')).toBe(false);
    });

    it('[VULN-02] guards against double-clicking Play All without running duplicate parallel loops', async () => {
      vi.useFakeTimers();

      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      const playAllBtn = container?.querySelector('button[aria-label^="เล่นบทสนทนาทั้งหมด"]') as HTMLButtonElement;

      // Simulate rapid double click
      await act(async () => {
        playAllBtn.click();
        playAllBtn.click(); // Should toggle off or guard, NOT duplicate
      });

      // It should have stopped
      expect(stopSpeakingSpy).toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('[VULN-03] safely unblocks inter-line pause promise upon stop/cancel', async () => {
      vi.useFakeTimers();

      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      const playAllBtn = container?.querySelector('button[aria-label^="เล่นบทสนทนาทั้งหมด"]') as HTMLButtonElement;

      await act(async () => {
        playAllBtn.click();
      });

      // In the middle of 500ms delay, stop is clicked
      const stopBtn = container?.querySelector('button[aria-label="หยุดเล่นบทสนทนา"]') as HTMLButtonElement;
      await act(async () => {
        stopBtn.click();
      });

      // Advance time to verify no dangling promise triggers further speech
      speakSpy.mockClear();
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      expect(speakSpy).not.toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('[VULN-04] cancels audio and resets state when dialogue prop changes', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      const audioButtons = container?.querySelectorAll('button[aria-label^="ฟังเสียงประโยค:"]');
      await act(async () => {
        (audioButtons?.[0] as HTMLButtonElement).click();
      });

      // Change dialogue prop to a new list
      const newDialogue: DialogueLine[] = [
        {
          speaker: 'A',
          speaker_name: 'ครูหวัง',
          zh: '早上好！',
          pinyin: 'Zǎoshang hǎo!',
          th: 'อรุณสวัสดิ์ครับ!',
          en: 'Good morning!',
        },
      ];

      await act(async () => {
        root!.render(<DialoguePlayer dialogue={newDialogue} />);
      });

      expect(stopSpeakingSpy).toHaveBeenCalled();
      expect(container?.textContent).toContain('早上好！');
      expect(container?.textContent).not.toContain('不客气，再见！');
    });

    it('[VULN-05] enforces minimum 44px hitbox across controls', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} initialScaffolding="pinyin_only" />);
      });

      const speedBtn = container?.querySelector('button[aria-label^="ความเร็วเสียง"]') as HTMLButtonElement;
      expect(speedBtn.style.minHeight).toBe('44px');

      const tabs = container?.querySelectorAll('button[role="tab"]');
      tabs?.forEach((tab) => {
        expect((tab as HTMLElement).style.minHeight).toBe('44px');
      });

      const peekButtons = container?.querySelectorAll('button[aria-label="แอบดูคำอ่านและคำแปล"]');
      peekButtons?.forEach((btn) => {
        expect((btn as HTMLElement).style.minHeight).toBe('44px');
      });
    });

    it('invokes unlockAudioContext when Play All or single line is tapped', async () => {
      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      const playAllBtn = Array.from(container?.querySelectorAll('button') || []).find(
        (btn) => btn.textContent?.includes('ฟังบทสนทนาทั้งหมด')
      ) as HTMLButtonElement;

      expect(playAllBtn).toBeTruthy();

      await act(async () => {
        playAllBtn.click();
      });

      expect(unlockAudioSpy).toHaveBeenCalled();
    });

    it('renders Voice Readiness Info Banner when Chinese voice is not available and allows dismissal', async () => {
      vi.spyOn(audioEngine, 'hasChineseVoice').mockReturnValue(false);

      await act(async () => {
        root!.render(<DialoguePlayer dialogue={mockDialogue} />);
      });

      expect(container?.textContent).toContain('กำลังใช้ระบบเสียงออนไลน์');

      const dismissBtn = container?.querySelector('button[aria-label="ปิดการแจ้งเตือนเสียง"]') as HTMLButtonElement;
      expect(dismissBtn).toBeTruthy();

      await act(async () => {
        dismissBtn.click();
      });

      expect(container?.textContent).not.toContain('กำลังใช้ระบบเสียงออนไลน์');
    });
  });
});


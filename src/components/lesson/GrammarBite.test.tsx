/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GrammarBite, LegoFormulaVisualizer } from './GrammarBite';
import { GrammarBite as GrammarBiteData, ToneRule } from '../../types/lesson';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// Mock Grammar Bite Data from Unit 1 Lesson 1
const mockGrammarBite: GrammarBiteData = {
  title: 'สูตรสำเร็จรูป: [สรรพนาม/ชื่อคน] + 好 = สวัสดีคนนั้น!',
  explanation_th:
    'ง่ายเหมือนเติมคำในช่องว่าง แค่เลือกคนที่อยากคุยด้วย แล้วเติมคำว่า 好 (ดี) ต่อท้าย ก็กลายเป็นการอวยพรทักทายทันที!',
  patterns: [
    {
      formula: '你 (เธอ) + 好 (ดี) = 你好！',
      zh: '你好！',
      pinyin: 'Nǐ hǎo!',
      th: 'สวัสดีจ้า! (ทักเพื่อน รุ่นเดียวกัน คนทั่วไป)',
      en: 'Hello! / Hi!',
    },
    {
      formula: '您 (ท่าน) + 好 (ดี) = 您好！',
      zh: '您好！',
      pinyin: 'Nín hǎo!',
      th: 'สวัสดีครับ/ค่ะ (ทักผู้ใหญ่ ลูกค้า คุณครู)',
      en: 'Hello (polite / formal)',
    },
    {
      formula: '你们 (พวกเธอ) + 好 (ดี) = 你们好！',
      zh: '你们好！',
      pinyin: 'Nǐmen hǎo!',
      th: 'สวัสดีทุกคน! (ทักกลุ่มเพื่อนพร้อมกันหลายคน)',
      en: 'Hello everyone!',
    },
  ],
};

// Mock Tone Rule Data from Unit 1 Lesson 1
const mockToneRule: ToneRule = {
  rule_name: 'กฎการผันเสียง 3 + 3 ➔ 2 + 3 (Tone Sandhi)',
  description_th:
    'เมื่อเสียงที่ 3 อยู่ติดกัน 2 ตัว คำหน้าจะผันเสียงเป็นเสียงที่ 2 โดยอัตโนมัติ เพื่อให้ออกเสียงลื่นไหล',
  example: "你 (nǐ) + 好 (hǎo) ➔ อ่านออกเสียงจริงว่า 'ní hǎo' (หนีห่าว)",
  fun_metaphor:
    'เสียง 3 ต้องก้มลงต่ำ ถ้าพูด หนี่ แล้วต้องกดต่ำอีก ลิ้นจะเหนื่อยมาก! ภาษาจีนใจดี เลยเปลี่ยนให้คำแรกสไลด์พุ่งขึ้นเป็น หนี เพื่อให้ทิ้งตัวลง ห่าว ได้พริ้วๆ เหมือนเล่นสไลเดอร์สวนสนุก!',
  reassurance:
    '💖 เคล็ดลับคลายกังวล: ถ้าเผลอพูด หนี่ห่าว คนจีนก็ฟังรู้เรื่อง 100% จ้า ไม่ต้องกลัวผิดเลยนะคนเก่ง!',
};

describe('GrammarBite Component (Phase 2 Slice 2.4)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let speakSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let stopSpeakingSpy: any;

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
  // 1. LegoFormulaVisualizer Helper Tests
  // --------------------------------------------------------------------------
  describe('LegoFormulaVisualizer Helper', () => {
    it('renders Lego brick tokens correctly from formula string', async () => {
      await act(async () => {
        root!.render(<LegoFormulaVisualizer formula="你 (เธอ) + 好 (ดี) = 你好！" />);
      });

      expect(container?.textContent).toContain('你 (เธอ)');
      expect(container?.textContent).toContain('好 (ดี)');
      expect(container?.textContent).toContain('你好！');
      expect(container?.textContent).toContain('+');
      expect(container?.textContent).toContain('=');
    });

    it('returns null when formula is empty or blank', async () => {
      await act(async () => {
        root!.render(<LegoFormulaVisualizer formula="" />);
      });

      expect(container?.children.length).toBe(0);
    });
  });

  // --------------------------------------------------------------------------
  // 2. Rendering & Structure Tests
  // --------------------------------------------------------------------------
  describe('Rendering & Layout Structure', () => {
    it('renders header badge, title, and Thai explanation', async () => {
      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} />);
      });

      expect(container?.textContent).toContain('ไวยากรณ์ 1 นาที');
      expect(container?.textContent).toContain(mockGrammarBite.title);
      expect(container?.textContent).toContain(mockGrammarBite.explanation_th);
      expect(container?.textContent).toContain('1.0x');
    });

    it('renders all pattern cards with Hanzi, Pinyin, Thai and English', async () => {
      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} />);
      });

      expect(container?.textContent).toContain('ตัวอย่างประโยคตามสูตร (3)');
      expect(container?.textContent).toContain('你好！');
      expect(container?.textContent).toContain('Nǐ hǎo!');
      expect(container?.textContent).toContain('สวัสดีจ้า!');
      expect(container?.textContent).toContain('Hello! / Hi!');

      expect(container?.textContent).toContain('您好！');
      expect(container?.textContent).toContain('Nín hǎo!');

      expect(container?.textContent).toContain('你们好！');
      expect(container?.textContent).toContain('Nǐmen hǎo!');
    });
  });

  // --------------------------------------------------------------------------
  // 3. Tone Rule & Reassurance Card Tests
  // --------------------------------------------------------------------------
  describe('Tone Rule & Reassurance Card', () => {
    it('renders Tone Rule card with metaphor and reassurance when toneRule is provided', async () => {
      await act(async () => {
        root!.render(
          <GrammarBite grammarBite={mockGrammarBite} toneRule={mockToneRule} />
        );
      });

      expect(container?.textContent).toContain('กฎการผันเสียง 3 + 3 ➔ 2 + 3 (Tone Sandhi)');
      expect(container?.textContent).toContain(mockToneRule.description_th);
      expect(container?.textContent).toContain('สไลเดอร์สวนสนุก');
      expect(container?.textContent).toContain('เคล็ดลับคลายกังวล');
      expect(container?.textContent).toContain('ไม่ต้องกลัวผิดเลยนะคนเก่ง');
    });

    it('omits Tone Rule card when toneRule is not passed or null', async () => {
      await act(async () => {
        root!.render(
          <GrammarBite grammarBite={mockGrammarBite} toneRule={null} />
        );
      });

      expect(container?.textContent).not.toContain('Tone Sandhi');
      expect(container?.textContent).not.toContain('เคล็ดลับคลายกังวล');
    });

    it('plays audio for tone rule example when button is clicked', async () => {
      await act(async () => {
        root!.render(
          <GrammarBite grammarBite={mockGrammarBite} toneRule={mockToneRule} />
        );
      });

      const toneAudioBtn = container?.querySelector(
        'button[aria-label*="ฟังเสียงตัวอย่างกฎการผันเสียง"]'
      ) as HTMLButtonElement;
      expect(toneAudioBtn).not.toBeNull();

      await act(async () => {
        toneAudioBtn.click();
      });

      expect(speakSpy).toHaveBeenCalledWith('ní hǎo', expect.objectContaining({ rate: 1.0 }));
    });
  });

  // --------------------------------------------------------------------------
  // 4. Interactive Audio Playback & Speed Controls
  // --------------------------------------------------------------------------
  describe('Interactive Audio Playback & Speed Controls', () => {
    it('plays speech for pattern when audio button is clicked', async () => {
      const onPlayMock = vi.fn();
      await act(async () => {
        root!.render(
          <GrammarBite
            grammarBite={mockGrammarBite}
            onPatternAudioPlay={onPlayMock}
          />
        );
      });

      const audioButtons = container?.querySelectorAll(
        'button[aria-label^="ฟังเสียงประโยค"]'
      );
      expect(audioButtons?.length).toBe(3);

      await act(async () => {
        (audioButtons![0] as HTMLButtonElement).click();
      });

      expect(speakSpy).toHaveBeenCalledWith('你好！', expect.objectContaining({ rate: 1.0 }));
      expect(onPlayMock).toHaveBeenCalledWith(0, '你好！');
    });

    it('toggles speed between 1.0x and 0.75x and applies to speech calls', async () => {
      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} />);
      });

      const speedBtn = container?.querySelector(
        'button[aria-label^="ความเร็วเสียง"]'
      ) as HTMLButtonElement;
      expect(speedBtn.textContent).toContain('1.0x');

      // Click to toggle to 0.75x
      await act(async () => {
        speedBtn.click();
      });

      expect(speedBtn.textContent).toContain('0.75x');

      // Click pattern audio with 0.75x speed
      const audioButtons = container?.querySelectorAll(
        'button[aria-label^="ฟังเสียงประโยค"]'
      );
      await act(async () => {
        (audioButtons![1] as HTMLButtonElement).click();
      });

      expect(speakSpy).toHaveBeenCalledWith('您好！', expect.objectContaining({ rate: 0.75 }));
    });

    it('stops speech when clicking the same pattern audio button while active', async () => {
      // Mock speak without immediate resolution to simulate ongoing playback
      speakSpy.mockImplementation(() => new Promise(() => {}));

      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} />);
      });

      const audioBtn = container?.querySelectorAll(
        'button[aria-label^="ฟังเสียงประโยค"]'
      )[0] as HTMLButtonElement;

      // First click: start speech
      await act(async () => {
        audioBtn.click();
      });

      expect(speakSpy).toHaveBeenCalledTimes(1);

      // Second click on same active item: should trigger stopSpeaking
      await act(async () => {
        audioBtn.click();
      });

      expect(stopSpeakingSpy).toHaveBeenCalled();
    });
  });

  // --------------------------------------------------------------------------
  // 5. Resilience, Teardown & Red Team Security Guards
  // --------------------------------------------------------------------------
  describe('Resilience, Teardown & Red Team Defense', () => {
    it('calls stopSpeaking on unmount to prevent memory leaks or dangling audio', async () => {
      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} />);
      });

      await act(async () => {
        root!.unmount();
        root = null;
      });

      expect(stopSpeakingSpy).toHaveBeenCalled();
    });

    it('handles rapid consecutive audio button clicks safely without race condition', async () => {
      speakSpy.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 50)));

      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} />);
      });

      const audioButtons = container?.querySelectorAll(
        'button[aria-label^="ฟังเสียงประโยค"]'
      );

      // Rapidly click pattern 0, then pattern 1, then pattern 2
      await act(async () => {
        (audioButtons![0] as HTMLButtonElement).click();
        (audioButtons![1] as HTMLButtonElement).click();
        (audioButtons![2] as HTMLButtonElement).click();
      });

      // Stop speaking should be called to interrupt previous speech on each click
      expect(stopSpeakingSpy).toHaveBeenCalled();
      expect(speakSpy).toHaveBeenCalledWith('你们好！', expect.anything());
    });

    it('survives Audio Flood Attack (50 rapid consecutive clicks across patterns & tone rule)', async () => {
      // Simulate audio engine with delayed response
      let resolveActive: (() => void) | null = null;
      speakSpy.mockImplementation((_text: string, options: any) => {
        options?.onStart?.();
        return new Promise<void>((resolve) => {
          resolveActive = () => {
            options?.onEnd?.();
            resolve();
          };
        });
      });

      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} toneRule={mockToneRule} />);
      });

      const patternBtns = container?.querySelectorAll('button[aria-label^="ฟังเสียงประโยค"]');
      const toneBtn = container?.querySelector('button[aria-label*="ฟังเสียงตัวอย่างกฎการผันเสียง"]') as HTMLButtonElement;
      expect(patternBtns?.length).toBe(3);
      expect(toneBtn).not.toBeNull();

      // Fire 50 rapid clicks alternating between patterns and tone rule
      await act(async () => {
        for (let i = 0; i < 50; i++) {
          if (i % 4 === 3) {
            toneBtn.click();
          } else {
            const targetBtn = patternBtns![i % 3] as HTMLButtonElement;
            targetBtn.click();
          }
        }
      });

      // Verification:
      // 1. stopSpeaking must have been invoked repeatedly to cancel prior audio
      expect(stopSpeakingSpy).toHaveBeenCalled();
      expect(stopSpeakingSpy.mock.calls.length).toBeGreaterThanOrEqual(50);

      // 2. Component is still stable and functional
      expect(container?.textContent).toContain('ไวยากรณ์ 1 นาที');

      // Resolve final pending speech
      await act(async () => {
        if (resolveActive) resolveActive();
      });
    });

    it('safely handles unmount when speech is in-flight (Zero memory leak & no setState on unmounted component)', async () => {
      let pendingOnEnd: (() => void) | null = null;
      speakSpy.mockImplementation((_text: string, options: any) => {
        options?.onStart?.();
        return new Promise<void>((resolve) => {
          pendingOnEnd = () => {
            options?.onEnd?.();
            resolve();
          };
        });
      });

      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} />);
      });

      const audioBtn = container?.querySelectorAll('button[aria-label^="ฟังเสียงประโยค"]')[0] as HTMLButtonElement;

      // Start speech
      await act(async () => {
        audioBtn.click();
      });

      expect(speakSpy).toHaveBeenCalledTimes(1);

      // Unmount while speech is still active / unresolved
      await act(async () => {
        root!.unmount();
        root = null;
      });

      // Stop speaking MUST have been called on unmount teardown
      expect(stopSpeakingSpy).toHaveBeenCalled();

      // Now resolve the late speech promise - must not throw or cause warning
      expect(() => {
        if (pendingOnEnd) pendingOnEnd();
      }).not.toThrow();
    });

    it('safely recovers when speech synthesis rejects with an error', async () => {
      speakSpy.mockImplementation((_text: string, options: any) => {
        options?.onError?.(new Error('SpeechSynthesis error: audio channel busy'));
        return Promise.reject(new Error('SpeechSynthesis error: audio channel busy'));
      });

      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} />);
      });

      const audioBtn = container?.querySelectorAll('button[aria-label^="ฟังเสียงประโยค"]')[0] as HTMLButtonElement;

      await act(async () => {
        audioBtn.click();
      });

      // Component recovers safely, button returns to normal volume icon
      expect(container?.textContent).toContain('ไวยากรณ์ 1 นาที');
    });

    it('renders and wraps LegoFormulaVisualizer properly on 320px viewport without overflow', async () => {
      // Create a 320px constrained wrapper
      const testWrapper = document.createElement('div');
      testWrapper.style.width = '320px';
      testWrapper.style.maxWidth = '320px';
      testWrapper.style.boxSizing = 'border-box';
      testWrapper.style.padding = '16px';
      container?.appendChild(testWrapper);

      const localRoot = createRoot(testWrapper);
      await act(async () => {
        localRoot.render(
          <LegoFormulaVisualizer formula="[สรรพนาม/ชื่อคน] + 好 = สวัสดีคนนั้น!" />
        );
      });

      const formulaGroup = testWrapper.querySelector('div[role="group"]') as HTMLDivElement;
      expect(formulaGroup).not.toBeNull();
      // Verify flex-wrap is set to 'wrap' for mobile screen wrapping
      expect(formulaGroup.style.display).toBe('flex');
      expect(formulaGroup.style.flexWrap).toBe('wrap');

      // Check all brick tokens exist
      expect(testWrapper.textContent).toContain('[สรรพนาม/ชื่อคน]');
      expect(testWrapper.textContent).toContain('好');
      expect(testWrapper.textContent).toContain('สวัสดีคนนั้น!');

      await act(async () => {
        localRoot.unmount();
      });
      testWrapper.remove();
    });

    it('renders gracefully even with an empty patterns array', async () => {
      const emptyGrammarBite: GrammarBiteData = {
        title: 'สูตรประโยคว่างเปล่า',
        explanation_th: 'คำอธิบายทดสอบกรณีไม่มีตัวอย่าง',
        patterns: [],
      };

      await act(async () => {
        root!.render(<GrammarBite grammarBite={emptyGrammarBite} />);
      });

      expect(container?.textContent).toContain('ตัวอย่างประโยคตามสูตร (0)');
    });
  });

  // --------------------------------------------------------------------------
  // 6. Mobile Touch Standards (>= 44px Hitbox) & A11y
  // --------------------------------------------------------------------------
  describe('Mobile Touch Ergonomics & Accessibility (WCAG 2.1 / Apple HIG)', () => {
    it('ensures all interactive buttons have minHeight >= 44px', async () => {
      await act(async () => {
        root!.render(
          <GrammarBite grammarBite={mockGrammarBite} toneRule={mockToneRule} />
        );
      });

      const allButtons = container?.querySelectorAll('button');
      expect(allButtons?.length).toBeGreaterThan(0);

      allButtons?.forEach((button) => {
        const style = button.style;
        const minHeight = parseInt(style.minHeight || '0', 10);
        expect(minHeight).toBeGreaterThanOrEqual(44);
      });
    });

    it('has valid accessible region role and label', async () => {
      await act(async () => {
        root!.render(<GrammarBite grammarBite={mockGrammarBite} />);
      });

      const region = container?.querySelector('article[role="region"]');
      expect(region).not.toBeNull();
      expect(region?.getAttribute('aria-label')).toBe('การ์ดสรุปไวยากรณ์และกฎเสียง 1 นาที');
    });
  });
});

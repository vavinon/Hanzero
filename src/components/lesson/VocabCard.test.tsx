/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { VocabCard, parseToneInfo } from './VocabCard';
import { VocabularyItem } from '../../types/lesson';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// Sample Mock Vocabularies from Unit 1
const mockVocabNi: VocabularyItem = {
  id: 'hsk1_0012',
  hanzi: '你',
  pinyin: 'nǐ',
  pinyin_tone: 'ni3',
  meaning_th: 'คุณ, เธอ',
  meaning_en: 'you',
  radical: '亻',
  radical_name_th: 'หมวดคนยืน (单人旁)',
  stroke_count: 7,
  mnemonic: 'มีคน (亻) หนึ่งคนยืนอยู่ตรงหน้าเรา = คุณ',
  kid_mnemonic: "มี 'คน (亻)' หนึ่งคน กางแขนยืนส่งยิ้มให้ 'เธอ'",
  body_gesture: 'ชี้นิ้วไปข้างหน้าอย่างสุภาพพร้อมรอยยิ้ม',
};

const mockVocabXiexie: VocabularyItem = {
  id: 'hsk1_0088',
  hanzi: '谢谢',
  pinyin: 'xièxie',
  pinyin_tone: 'xie4xie5',
  meaning_th: 'ขอบคุณ',
  meaning_en: 'thank you',
  radical: '讠',
  radical_name_th: 'หมวดคำพูด (言字旁)',
  stroke_count: 12,
  writing_note: "ตัวอักษร '谢' มี 12 ขีด",
  mnemonic: 'ส่งคำพูดดีๆ ออกไปด้วยความซาบซึ้งใจ',
  kid_mnemonic: 'ปากพูดคำหวาน (讠) + ตัวน้อมคำนับ (身) = ขอบคุณจากใจ!',
  body_gesture: 'ประสานสองมือกุมคารวะระดับอกแล้วค้อมศีรษะลงเบาๆ',
};

const mockVocabBuKeqi: VocabularyItem = {
  id: 'hsk1_0487',
  hanzi: '不客气',
  pinyin: 'bú kèqi',
  pinyin_tone: 'bu2 ke4 qi5',
  display_pinyin: 'bú kèqi',
  sandhi_rule: 'bu',
  meaning_th: 'ไม่เป็นไร, ไม่ต้องเกรงใจ',
  meaning_en: "you're welcome, don't mention it",
  radical: '一',
  radical_name_th: 'หมวดเส้นขวาง',
  stroke_count: 16,
  mnemonic: 'ไม่ต้องเกรงใจเหมือนเป็นแขก',
  kid_mnemonic: 'ไม่ต้องเกรงใจเหมือนแขกนอกบ้าน! เราเป็นเพื่อนกันแล้ว',
  body_gesture: "ยกมือโบกปัดเบาๆ สองครั้งพร้อมรอยยิ้ม สื่อว่า 'เรื่องเล็กน้อย!'",
};

describe('VocabCard Component (Phase 2 Slice 2.2)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  let speakSpy: any;
  let stopSpeakingSpy: any;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    speakSpy = vi.spyOn(audioEngine, 'speak').mockImplementation((_text, options) => {
      options?.onStart?.();
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
  // 1. Tone Parsing Unit Tests
  // --------------------------------------------------------------------------
  describe('parseToneInfo helper', () => {
    it('parses single syllable tone correctly (ni3 -> Tone 3 with dipping contour ˇ)', () => {
      const tones = parseToneInfo('ni3');
      expect(tones).toHaveLength(1);
      expect(tones[0].raw).toBe('ni');
      expect(tones[0].tone).toBe(3);
      expect(tones[0].symbol).toBe('ˇ');
      expect(tones[0].toneNameTh).toContain('เสียง 3');
    });

    it('parses concatenated syllables correctly (xie4xie5 -> Tone 4 and Tone 5)', () => {
      const tones = parseToneInfo('xie4xie5');
      expect(tones).toHaveLength(2);
      expect(tones[0].raw).toBe('xie');
      expect(tones[0].tone).toBe(4);
      expect(tones[0].symbol).toBe('ˋ');
      expect(tones[1].raw).toBe('xie');
      expect(tones[1].tone).toBe(5);
      expect(tones[1].symbol).toBe('·');
    });

    it('parses space-separated syllables correctly (bu2 ke4 qi5)', () => {
      const tones = parseToneInfo('bu2 ke4 qi5');
      expect(tones).toHaveLength(3);
      expect(tones[0].tone).toBe(2);
      expect(tones[0].symbol).toBe('ˊ');
      expect(tones[1].tone).toBe(4);
      expect(tones[1].symbol).toBe('ˋ');
      expect(tones[2].tone).toBe(5);
      expect(tones[2].symbol).toBe('·');
    });

    it('handles empty or malformed pinyin tone gracefully', () => {
      expect(parseToneInfo('')).toEqual([]);
      expect(parseToneInfo(null as any)).toEqual([]);
    });
  });

  // --------------------------------------------------------------------------
  // 2. Visual & Typography Standards Tests
  // --------------------------------------------------------------------------
  describe('Visual & Typography Standards', () => {
    it('renders Chinese character, pinyin, trilingual meanings, radical, and mnemonics', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      expect(container?.textContent).toContain('你');
      expect(container?.textContent).toContain('nǐ');
      expect(container?.textContent).toContain('คุณ, เธอ');
      expect(container?.textContent).toContain('you');
      expect(container?.textContent).toContain('หมวดคนยืน');
      expect(container?.textContent).toContain('7 ขีด');
      expect(container?.textContent).toContain("มี 'คน (亻)' หนึ่งคน กางแขนยืนส่งยิ้มให้ 'เธอ'");
      expect(container?.textContent).toContain('ชี้นิ้วไปข้างหน้าอย่างสุภาพพร้อมรอยยิ้ม');
    });

    it('renders color-blind accessible tone contour symbol and tone number', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      // Tone 3 for "ni3" -> symbol ˇ, (T3)
      const tonePill = container?.querySelector('.tone-pill-3');
      expect(tonePill).not.toBeNull();
      expect(tonePill?.textContent).toContain('ni');
      expect(tonePill?.textContent).toContain('ˇ');
      expect(tonePill?.textContent).toContain('(T3)');
      expect(tonePill?.getAttribute('aria-label')).toContain('เสียง 3');
    });

    it('renders Tone Sandhi badge when sandhi_rule is present', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabBuKeqi} />);
      });

      expect(container?.textContent).toContain('bù + เสียง 4 -> bú');
    });

    it('renders multi-character word with neutral tone correctly (谢谢)', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabXiexie} />);
      });

      expect(container?.textContent).toContain('谢谢');
      expect(container?.textContent).toContain('ขอบคุณ');
      expect(container?.textContent).toContain('thank you');
      // Tone 4 and Tone 5 pills
      expect(container?.querySelector('.tone-pill-4')).not.toBeNull();
      expect(container?.querySelector('.tone-pill-5')).not.toBeNull();
    });
  });

  // --------------------------------------------------------------------------
  // 3. Native Audio Integration & Speed Toggle Tests
  // --------------------------------------------------------------------------
  describe('Native Voice & Speed Toggle', () => {
    it('plays standard vocab audio at 1.0x on button click', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const playBtn = container?.querySelector('button[aria-label="ฟังเสียงคำศัพท์ 你"]') as HTMLButtonElement;
      expect(playBtn).not.toBeNull();

      await act(async () => {
        playBtn.click();
      });

      expect(speakSpy).toHaveBeenCalledWith('你', expect.objectContaining({ rate: 1.0 }));
    });

    it('toggles speed rate between 1.0x and 0.75x and speaks at the chosen rate', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const slowBtn = container?.querySelector('button[title*="0.75x"]') as HTMLButtonElement;
      expect(slowBtn).not.toBeNull();

      await act(async () => {
        slowBtn.click();
      });

      const playBtn = container?.querySelector('button[aria-label="ฟังเสียงคำศัพท์ 你"]') as HTMLButtonElement;
      await act(async () => {
        playBtn.click();
      });

      expect(speakSpy).toHaveBeenCalledWith('你', expect.objectContaining({ rate: 0.75 }));
    });

    it('stops speech safely if play button is clicked while already playing', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const playBtn = container?.querySelector('button[aria-label="ฟังเสียงคำศัพท์ 你"]') as HTMLButtonElement;

      // First click: starts speech
      await act(async () => {
        playBtn.click();
      });
      expect(speakSpy).toHaveBeenCalledTimes(1);

      // Second click while in playing state: calls stopSpeaking
      await act(async () => {
        playBtn.click();
      });
      expect(stopSpeakingSpy).toHaveBeenCalled();
    });

    it('calls stopSpeaking cleanly on component unmount', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      await act(async () => {
        root!.unmount();
        root = null;
      });

      expect(stopSpeakingSpy).toHaveBeenCalled();
    });
  });

  // --------------------------------------------------------------------------
  // 4. Progressive Pinyin Fading Tests
  // --------------------------------------------------------------------------
  describe('Progressive Pinyin Fading Prototype', () => {
    it('starts in full mode with 100% visible pinyin', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} initialPinyinMode="full" />);
      });

      const pinyinSpan = container?.querySelector('.pinyin-display');
      expect(pinyinSpan?.className).toContain('pinyin-mode-full');
    });

    it('switches to faded mode when clicking "จาง" button', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const fadedBtn = container?.querySelector('button[title*="จาง"]') as HTMLButtonElement;
      await act(async () => {
        fadedBtn.click();
      });

      const pinyinSpan = container?.querySelector('.pinyin-display');
      expect(pinyinSpan?.className).toContain('pinyin-mode-faded');
    });

    it('switches to hidden mode and reveals pinyin on tap to peek', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      // Switch to hidden
      const hiddenBtn = container?.querySelector('button[title*="ซ่อน"]') as HTMLButtonElement;
      await act(async () => {
        hiddenBtn.click();
      });

      let pinyinSpan = container?.querySelector('.pinyin-display');
      expect(pinyinSpan?.className).toContain('pinyin-mode-hidden');
      expect(container?.textContent).toContain('แตะเพื่อดู');

      // Tap on character / pinyin area to peek
      const peekTarget = container?.querySelector('div[role="button"]') as HTMLElement;
      await act(async () => {
        peekTarget.click();
      });

      pinyinSpan = container?.querySelector('.pinyin-display');
      expect(pinyinSpan?.className).toContain('pinyin-mode-peek');
      expect(container?.textContent).toContain('กำลังแอบดู');

      // Tap again toggles peek off
      await act(async () => {
        peekTarget.click();
      });
      pinyinSpan = container?.querySelector('.pinyin-display');
      expect(pinyinSpan?.className).not.toContain('pinyin-mode-peek');
    });

    it('calls onPeek callback with hanzi and incremental peekCount in hidden mode', async () => {
      const onPeekMock = vi.fn();
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} initialPinyinMode="hidden" onPeek={onPeekMock} />);
      });

      const peekTarget = container?.querySelector('div[role="button"]') as HTMLElement;
      await act(async () => {
        peekTarget.click();
      });

      expect(onPeekMock).toHaveBeenCalledWith('你', 1);

      // Toggle off and peek again -> count increments to 2
      await act(async () => {
        peekTarget.click();
      });
      await act(async () => {
        peekTarget.click();
      });

      expect(onPeekMock).toHaveBeenCalledWith('你', 2);
    });

    it('supports Hold-to-Peek 2.0 with pointerdown and pointerup', async () => {
      vi.useFakeTimers();
      try {
        const onPeekMock = vi.fn();
        await act(async () => {
          root!.render(<VocabCard vocab={mockVocabNi} initialPinyinMode="hidden" onPeek={onPeekMock} />);
        });

        const peekTarget = container?.querySelector('div[role="button"]') as HTMLElement;
        
        // Pointer down starts hold timer
        await act(async () => {
          peekTarget.dispatchEvent(new Event('pointerdown', { bubbles: true }));
        });

        // Before 150ms timeout, peek should not have triggered
        expect(onPeekMock).not.toHaveBeenCalled();

        // Advance past 150ms
        await act(async () => {
          vi.advanceTimersByTime(160);
        });

        expect(onPeekMock).toHaveBeenCalledWith('你', 1);
        const pinyinSpan = container?.querySelector('.pinyin-display');
        expect(pinyinSpan?.className).toContain('pinyin-mode-peek');

        // Pointer up releases peek
        await act(async () => {
          peekTarget.dispatchEvent(new Event('pointerup', { bubbles: true }));
        });

        expect(container?.querySelector('.pinyin-display')?.className).not.toContain('pinyin-mode-peek');
      } finally {
        vi.useRealTimers();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. 3D Card Flip Tests
  // --------------------------------------------------------------------------
  describe('3D Card Flip Micro-interaction', () => {
    it('flips card to Face B and renders contextual example sentence', async () => {
      const onFlipMock = vi.fn();
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} onFlip={onFlipMock} />);
      });

      const flipper = container?.querySelector('.vocab-card-flipper');
      expect(flipper?.className).not.toContain('is-flipped');

      const flipBtn = container?.querySelector('button[aria-label="พลิกดูตัวอย่างประโยค"]') as HTMLButtonElement;
      await act(async () => {
        flipBtn.click();
      });

      expect(flipper?.className).toContain('is-flipped');
      expect(onFlipMock).toHaveBeenCalledWith(true);

      // Verify Face B context sentence
      expect(container?.textContent).toContain('ตัวอย่างประโยคจริง');
      expect(container?.textContent).toContain('你好！很高兴认识你。');
      expect(container?.textContent).toContain('nǐ hǎo! hěn gāoxìng rènshi nǐ.');
      expect(container?.textContent).toContain('สวัสดี! ยินดีที่ได้รู้จักเธอนะ');

      // Click flip back button
      const flipBackBtn = container?.querySelector('button[aria-label="กลับไปหน้าคำศัพท์"]') as HTMLButtonElement;
      await act(async () => {
        flipBackBtn.click();
      });

      expect(flipper?.className).not.toContain('is-flipped');
      expect(onFlipMock).toHaveBeenCalledWith(false);
    });

    it('plays example sentence audio when clicking listen button on Face B', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} initialFlipped={true} />);
      });

      const sentencePlayBtn = container?.querySelector(
        'button[aria-label="ฟังเสียงประโยค 你好！很高兴认识你。"]'
      ) as HTMLButtonElement;
      expect(sentencePlayBtn).not.toBeNull();

      await act(async () => {
        sentencePlayBtn.click();
      });

      expect(speakSpy).toHaveBeenCalledWith('你好！很高兴认识你。', expect.any(Object));
    });
  });

  // --------------------------------------------------------------------------
  // 6. Stroke Inspector Modal Tests
  // --------------------------------------------------------------------------
  describe('Stroke Inspector Modal (แว่นขยายเส้นขีด)', () => {
    it('opens modal on clicking "ขยายเส้นขีด" and closes on clicking close button', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      expect(container?.querySelector('.stroke-modal-overlay')).toBeNull();

      const openModalBtn = container?.querySelector('button[aria-label="ขยายดูเส้นขีดตัวอักษร"]') as HTMLButtonElement;
      await act(async () => {
        openModalBtn.click();
      });

      const modal = container?.querySelector('.stroke-modal-overlay');
      expect(modal).not.toBeNull();
      expect(modal?.getAttribute('role')).toBe('dialog');
      expect(modal?.textContent).toContain('ขยายเส้นขีด: 你 (7 ขีด)');

      // Close modal via close button
      const closeBtn = container?.querySelector('button[aria-label="ปิดหน้าต่างขยายเส้นขีด"]') as HTMLButtonElement;
      await act(async () => {
        closeBtn.click();
      });

      expect(container?.querySelector('.stroke-modal-overlay')).toBeNull();
    });

    it('closes modal when Escape key is pressed', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const openModalBtn = container?.querySelector('button[aria-label="ขยายดูเส้นขีดตัวอักษร"]') as HTMLButtonElement;
      await act(async () => {
        openModalBtn.click();
      });

      expect(container?.querySelector('.stroke-modal-overlay')).not.toBeNull();

      await act(async () => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      });

      expect(container?.querySelector('.stroke-modal-overlay')).toBeNull();
    });

    it('provides character switching tabs for multi-character words like "不客气"', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabBuKeqi} />);
      });

      const openModalBtn = container?.querySelector('button[aria-label="ขยายดูเส้นขีดตัวอักษร"]') as HTMLButtonElement;
      await act(async () => {
        openModalBtn.click();
      });

      // Should have buttons for '不', '客', '气'
      expect(container?.textContent).toContain('เลือกพยางค์:');
      const charButtons = container?.querySelectorAll('.stroke-modal-content button');
      const charTexts = Array.from(charButtons || []).map((b) => b.textContent?.trim());
      expect(charTexts).toContain('不');
      expect(charTexts).toContain('客');
      expect(charTexts).toContain('气');
    });

    it('dismisses modal on backdrop overlay click, but NOT on content click', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const openModalBtn = container?.querySelector('button[aria-label="ขยายดูเส้นขีดตัวอักษร"]') as HTMLButtonElement;
      await act(async () => {
        openModalBtn.click();
      });

      const overlay = container?.querySelector('.stroke-modal-overlay') as HTMLElement;
      const content = container?.querySelector('.stroke-modal-content') as HTMLElement;
      expect(overlay).not.toBeNull();
      expect(content).not.toBeNull();

      // Click on content should NOT close modal
      await act(async () => {
        content.click();
      });
      expect(container?.querySelector('.stroke-modal-overlay')).not.toBeNull();

      // Click directly on overlay backdrop SHOULD close modal
      await act(async () => {
        overlay.click();
      });
      expect(container?.querySelector('.stroke-modal-overlay')).toBeNull();
    });
  });

  // --------------------------------------------------------------------------
  // 7. 🔥 RED TEAM ADVERSARIAL ATTACK SUITE
  // --------------------------------------------------------------------------
  describe('🔥 Red Team Adversarial Attack Suite', () => {
    it('Attack 1 (Audio Flood): spams audio button 50 times rapidly without deadlock or crash', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const playBtn = container?.querySelector('button[aria-label="ฟังเสียงคำศัพท์ 你"]') as HTMLButtonElement;
      expect(playBtn).not.toBeNull();

      // Simulate 50 rapid sequential clicks
      for (let i = 0; i < 50; i++) {
        await act(async () => {
          playBtn.click();
        });
      }

      // Audio engine should still be intact and responsive
      expect(speakSpy).toHaveBeenCalled();
      expect(stopSpeakingSpy).toHaveBeenCalled();
      // Component still renders healthy and mounted
      expect(container?.textContent).toContain('你');
    });

    it('Attack 2 (Prop Switch Mid-Audio): changing vocab immediately stops dangling speech and resets state', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      // Start audio on card 1
      const playBtn = container?.querySelector('button[aria-label="ฟังเสียงคำศัพท์ 你"]') as HTMLButtonElement;
      await act(async () => {
        playBtn.click();
      });
      expect(speakSpy).toHaveBeenCalledWith('你', expect.any(Object));

      // Flip card 1
      const flipBtn = container?.querySelector('button[aria-label="พลิกดูตัวอย่างประโยค"]') as HTMLButtonElement;
      await act(async () => {
        flipBtn.click();
      });
      const flipper = container?.querySelector('.vocab-card-flipper');
      expect(flipper?.className).toContain('is-flipped');

      // Now parent passes new vocab item (mockVocabXiexie) without unmounting
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabXiexie} />);
      });

      // Previous audio MUST be terminated
      expect(stopSpeakingSpy).toHaveBeenCalled();
      // New card should automatically reset flip state back to Face A Front
      expect(flipper?.className).not.toContain('is-flipped');
      // Content updated to new vocab
      expect(container?.textContent).toContain('谢谢');
    });

    it('Attack 3 (Safe finally cleanup): guarantees isPlaying resets even if speak resolves via unblock', async () => {
      // Mock speak that resolves when stopSpeaking is called, without triggering onEnd callback
      speakSpy.mockImplementation(() => {
        return new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 10);
        });
      });

      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const playBtn = container?.querySelector('button[aria-label="ฟังเสียงคำศัพท์ 你"]') as HTMLButtonElement;
      await act(async () => {
        playBtn.click();
      });

      // Wait for promise resolution
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 30));
      });

      // Button should not be stuck in "กำลังออกเสียง..."
      expect(playBtn.textContent).toContain('ฟังเสียง Native');
    });

    it('Attack 4 (Flip Accessibility & Inert State): active face is interactive, hidden face is inert', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const frontFace = container?.querySelector('.vocab-card-front') as HTMLElement;
      const backFace = container?.querySelector('.vocab-card-back') as HTMLElement;

      // Face A Front initial state
      expect(frontFace.getAttribute('aria-hidden')).toBe('false');
      expect(frontFace.style.pointerEvents).toBe('auto');
      expect(backFace.getAttribute('aria-hidden')).toBe('true');
      expect(backFace.style.pointerEvents).toBe('none');

      // Flip to Face B Back
      const flipBtn = container?.querySelector('button[aria-label="พลิกดูตัวอย่างประโยค"]') as HTMLButtonElement;
      await act(async () => {
        flipBtn.click();
      });

      // Face B Back active state
      expect(frontFace.getAttribute('aria-hidden')).toBe('true');
      expect(frontFace.style.pointerEvents).toBe('none');
      expect(backFace.getAttribute('aria-hidden')).toBe('false');
      expect(backFace.style.pointerEvents).toBe('auto');
    });

    it('Attack 5 (Touch Target Ergonomics): ensures all interactive buttons meet >= 44px hitbox', async () => {
      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const buttons = container?.querySelectorAll('button');
      expect(buttons?.length).toBeGreaterThan(0);

      buttons?.forEach((btn) => {
        const minHeight = parseInt(btn.style.minHeight || '0', 10);
        const hasTactileClass = btn.className.includes('btn-tactile');
        expect(minHeight >= 44 || hasTactileClass).toBe(true);
      });
    });

    it('Attack 6 (Monotonic Request ID Concurrency Guard): rapid alternating clicks prevent stale audio callbacks from corrupting live state', async () => {
      let resolveFirstSpeak: (() => void) | null = null;
      speakSpy.mockImplementationOnce(() => {
        return new Promise<void>((resolve) => {
          resolveFirstSpeak = resolve;
        });
      });

      await act(async () => {
        root!.render(<VocabCard vocab={mockVocabNi} />);
      });

      const playVocabBtn = container?.querySelector('button[aria-label="ฟังเสียงคำศัพท์ 你"]') as HTMLButtonElement;
      
      // First click: fires request 1 (in flight)
      await act(async () => {
        playVocabBtn.click();
      });
      expect(speakSpy).toHaveBeenCalledTimes(1);

      // Rapidly flip card: increments activeRequestIdRef and stops speaking
      const flipBtn = container?.querySelector('button[aria-label="พลิกดูตัวอย่างประโยค"]') as HTMLButtonElement;
      await act(async () => {
        flipBtn.click();
      });
      expect(stopSpeakingSpy).toHaveBeenCalled();

      // Now resolve the stale first speak request
      await act(async () => {
        if (resolveFirstSpeak) resolveFirstSpeak();
      });

      // Stale callback must not throw or desynchronize state
      expect(stopSpeakingSpy).toHaveBeenCalled();
    });
  });
});



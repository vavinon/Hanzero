/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QuizContainer } from './QuizContainer';
import {
  QuizQuestion,
  BossChallenge,
  CheerTrophy,
} from '../../types/lesson';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// Mock Quiz Questions from Unit 1 Lesson 1
const mockQuizzes: QuizQuestion[] = [
  {
    type: 'listen_match',
    question_th: "ฟังเสียง 'hǎo' แล้วสังเกตว่าเสียงเคลื่อนที่แบบไหน?",
    options: [
      'เสียง 1 (ā) เรียบตรงบนฟ้า',
      'เสียง 2 (á) พุ่งขึ้นภูเขา',
      'เสียง 3 (ǎ) ตีลังกาลงสไลเดอร์แล้วเด้งขึ้น',
      'เสียง 4 (à) ตกตุ้บลงพื้น',
    ],
    correct_index: 2,
    explanation_th: 'hǎo ออกเสียงลงต่ำแล้วตวัดขึ้น เป็นวรรณยุกต์เสียงที่ 3 เหมือนเรือเหาะตีลังกา!',
    encouragement: 'เก่งมาก! หูไวระดับเทพจับเสียงสไลเดอร์ได้แม่นยำมาก!',
    target_audio: '好',
  },
  {
    type: 'sentence_scramble',
    question_th: 'เรียงคำตอบรับเมื่อเพื่อนกล่าวขอบคุณ (ไม่เป็นไร / ไม่ต้องเกรงใจ):',
    tokens: ['客', '不', '气'],
    correct_sequence: ['不', '客', '气'],
    pinyin: 'Bú kèqi',
    meaning_th: 'ไม่เป็นไร, ไม่ต้องเกรงใจ',
    explanation_th: '不 (ไม่) + 客气 (เกรงใจ) = ไม่ต้องเกรงใจ / ไม่เป็นไร',
    encouragement: 'สุดยอดเลย! ไม่ (不) ต้องเกรงใจ (客气) เหมือนคนนอก ตอบได้อย่างมั่นใจมาก!',
  },
  {
    type: 'flash_recall',
    question_th: "คำว่า '再见' แปลว่าอะไร?",
    options: ['สวัสดี', 'ขอบคุณ', 'ขอโทษ', 'ลาก่อน / แล้วพบกันใหม่'],
    correct_index: 3,
    explanation_th: '再 (อีกครั้ง) + 见 (พบ) = แล้วพบกันใหม่อีกครั้ง / ลาก่อน',
    encouragement: 'ถูกต้องแล้วจ้า! 再 (อีกครั้ง) + 见 (พบ) โบกมือบ๊ายบายได้อย่างน่ารักที่สุด!',
  },
];

const mockBossChallenge: BossChallenge = {
  scenario_th:
    "คุณเพิ่งก้าวเข้าไปในคาเฟ่ที่เซี่ยงไฮ้ พนักงานยิ้มหวานแล้วยื่นการ์ดเมนูชานมไข่มุกให้คุณพร้อมพูดว่า '你好！' คุณควรตอบกลับอย่างไรให้เป็นมิตรและถูกต้องที่สุด?",
  options: ['再见！ (Zàijiàn!)', '你好！ (Nǐ hǎo!)', '不客气 (Bú kèqi)', '不 (Bù)'],
  correct_index: 1,
  explanation_th: "เมื่อมีคนทักทายเราว่า '你好！' ให้ส่งยิ้มหวานแล้วตอบกลับอย่างมั่นใจว่า '你好！' เช่นกันจ้า!",
  encouragement: 'ว้าว! คุณพิชิตภารกิจทักทายสำเร็จแล้ว! คนจีนยิ้มรับความสดใสของคุณแน่นอน!',
};

const mockCheerTrophy: CheerTrophy = {
  badge_id: 'badge_t1_u01_l01',
  badge_name: 'ทูตน้อยรอยยิ้มพิมพ์ใจ 🐰✨',
  message_th:
    'ยินดีด้วยนะคนเก่ง! วันนี้คุณพูดทักทาย ขอบคุณ และบอกลาภาษาจีนได้อย่างคล่องแคล่ว ก้าวแรกจาก 0 สู่ความมั่นใจสำเร็จแล้ว!',
  xp_reward: 50,
};

describe('QuizContainer Component (Phase 2 Slice 2.5)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let playCorrectSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let playIncorrectSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let playFanfareSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let speakSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let stopSpeakingSpy: any;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    playCorrectSpy = vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});
    playIncorrectSpy = vi.spyOn(audioEngine, 'playIncorrect').mockImplementation(() => {});
    playFanfareSpy = vi.spyOn(audioEngine, 'playFanfare').mockImplementation(() => {});
    speakSpy = vi.spyOn(audioEngine, 'speak').mockResolvedValue();
    stopSpeakingSpy = vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});

    // Mock window.alert and document.execCommand for clipboard fallback
    window.alert = vi.fn();
    document.execCommand = vi.fn().mockReturnValue(true);
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
  // 1. Initial State & Render Tests
  // --------------------------------------------------------------------------
  describe('Initial State & Controls', () => {
    it('renders top control bar with progress, silent toggle, and hearts', async () => {
      await act(async () => {
        root!.render(
          <QuizContainer
            quizzes={mockQuizzes}
            bossChallenge={mockBossChallenge}
            cheerTrophy={mockCheerTrophy}
          />
        );
      });

      expect(container?.textContent).toContain('ข้อที่ 1 จาก 4');
      expect(container?.textContent).toContain('25%');
      expect(container?.textContent).toContain('เสียง 🔊');
      expect(container?.textContent).toContain('5'); // 5 hearts
    });

    it('honors initialHearts and initialSilentMode props', async () => {
      await act(async () => {
        root!.render(
          <QuizContainer
            quizzes={mockQuizzes}
            initialHearts={3}
            initialSilentMode={true}
          />
        );
      });

      expect(container?.textContent).toContain('3');
      expect(container?.textContent).toContain('เงียบ 🤫');
    });

    it('renders listen_match mode with audio button when silent mode is off', async () => {
      await act(async () => {
        root!.render(<QuizContainer quizzes={mockQuizzes} />);
      });

      const audioBtn = container?.querySelector('button[aria-label="ฟังเสียงคำถาม"]');
      expect(audioBtn).toBeTruthy();
      expect(audioBtn?.textContent).toContain('กดฟังเสียง 🔊');

      // Click listen button
      await act(async () => {
        audioBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(speakSpy).toHaveBeenCalledWith('好', expect.objectContaining({ rate: 0.85 }));
    });
  });

  // --------------------------------------------------------------------------
  // 2. Multiple Choice Questions Interaction & Feedback
  // --------------------------------------------------------------------------
  describe('Multiple Choice Interaction', () => {
    it('allows selecting option and checking correct answer', async () => {
      await act(async () => {
        root!.render(<QuizContainer quizzes={mockQuizzes} shuffleOptions={false} />);
      });

      const checkBtn = container?.querySelector('button[aria-label="ตรวจคำตอบ"]') as HTMLButtonElement;
      expect(checkBtn.disabled).toBe(true);

      // Select Option C (index 2: correct answer)
      const options = container?.querySelectorAll('.quiz-option-card');
      expect(options?.length).toBe(4);

      await act(async () => {
        options![2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(options![2].classList.contains('is-selected')).toBe(true);
      expect(checkBtn.disabled).toBe(false);

      // Check answer
      await act(async () => {
        checkBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Verification
      expect(playCorrectSpy).toHaveBeenCalled();
      expect(options![2].classList.contains('is-correct')).toBe(true);
      expect(container?.textContent).toContain('ถูกต้องแล้วคนเก่ง!');
      expect(container?.textContent).toContain('hǎo ออกเสียงลงต่ำแล้วตวัดขึ้น');
      expect(container?.textContent).toContain('เก่งมาก! หูไวระดับเทพ');

      // Check next button is now displayed
      const nextBtn = container?.querySelector('button[aria-label="ไปต่อข้อถัดไป"]');
      expect(nextBtn).toBeTruthy();
    });

    it('handles incorrect answer submission with heart deduction and feedback', async () => {
      const onHeartLostMock = vi.fn();

      await act(async () => {
        root!.render(
          <QuizContainer
            quizzes={mockQuizzes}
            initialHearts={3}
            onHeartLost={onHeartLostMock}
            shuffleOptions={false}
          />
        );
      });

      // Select Option A (index 0: wrong answer)
      const options = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        options![0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const checkBtn = container?.querySelector('button[aria-label="ตรวจคำตอบ"]') as HTMLButtonElement;
      await act(async () => {
        checkBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Verification
      expect(playIncorrectSpy).toHaveBeenCalled();
      expect(options![0].classList.contains('is-wrong')).toBe(true);
      expect(options![2].classList.contains('is-correct')).toBe(true); // Shows correct answer highlight
      expect(onHeartLostMock).toHaveBeenCalledWith(2);
      expect(container?.textContent).toContain('ยังไม่ถูกต้องนะ');
      expect(container?.textContent).toContain('2'); // Hearts remaining
    });

    it('protects hearts from deduction when isSafeZone is enabled', async () => {
      const onHeartLostMock = vi.fn();

      await act(async () => {
        root!.render(
          <QuizContainer
            quizzes={mockQuizzes}
            initialHearts={3}
            isSafeZone={true}
            onHeartLost={onHeartLostMock}
            shuffleOptions={false}
          />
        );
      });

      // Verify Safe Zone badge is rendered
      expect(container?.textContent).toContain('Safe Zone');

      // Select Option A (index 0: wrong answer)
      const options = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        options![0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const checkBtn = container?.querySelector('button[aria-label="ตรวจคำตอบ"]') as HTMLButtonElement;
      await act(async () => {
        checkBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Verification: SFX plays but NO hearts are lost
      expect(playIncorrectSpy).toHaveBeenCalled();
      expect(onHeartLostMock).not.toHaveBeenCalled();
    });
  });

  // --------------------------------------------------------------------------
  // 3. Adaptive Silent Mode
  // --------------------------------------------------------------------------
  describe('Adaptive Silent Mode', () => {
    it('adapts listen_match to visual text and mutes sound effects', async () => {
      await act(async () => {
        root!.render(<QuizContainer quizzes={mockQuizzes} initialSilentMode={true} shuffleOptions={false} />);
      });

      // Verification: Audio button is replaced by silent visual hint
      expect(container?.querySelector('button[aria-label="ฟังเสียงคำถาม"]')).toBeNull();
      expect(container?.textContent).toContain('โหมดอ่านเงียบ: ให้สังเกตจากตัวอักษรและพินอินในตัวเลือก');

      // Select and check answer
      const options = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        options![2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const checkBtn = container?.querySelector('button[aria-label="ตรวจคำตอบ"]') as HTMLButtonElement;
      await act(async () => {
        checkBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // SFX should NOT be played in silent mode
      expect(playCorrectSpy).not.toHaveBeenCalled();
      expect(container?.textContent).toContain('ถูกต้องแล้วคนเก่ง!');
    });

    it('strictly isolates click SFX: playClick is never invoked when in silent mode', async () => {
      const playClickSpy = vi.spyOn(audioEngine, 'playClick');
      playClickSpy.mockClear();

      await act(async () => {
        root!.render(<QuizContainer quizzes={mockQuizzes} initialSilentMode={true} />);
      });

      // Tap multiple-choice option
      const options = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        options![2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Tap toggle
      const toggleBtn = container?.querySelector('button[aria-label="ปิดโหมดเงียบ"]');
      await act(async () => {
        toggleBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Even while toggling off or tapping, playClick was zero during silent mode!
      expect(playClickSpy).not.toHaveBeenCalled();
    });

    it('toggles silent mode on and off via top switch', async () => {
      await act(async () => {
        root!.render(<QuizContainer quizzes={mockQuizzes} initialSilentMode={false} />);
      });

      const toggleBtn = container?.querySelector('button[aria-label="เปิดโหมดเงียบ"]');
      expect(toggleBtn).toBeTruthy();

      await act(async () => {
        toggleBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(container?.textContent).toContain('เงียบ 🤫');
      expect(container?.textContent).toContain('โหมดอ่านเงียบ');
    });
  });

  // --------------------------------------------------------------------------
  // 4. Sentence Scramble / Builder (Lego Tokens)
  // --------------------------------------------------------------------------
  describe('Sentence Scramble (Lego Builder)', () => {
    it('allows picking, returning, resetting, and submitting Lego tokens', async () => {
      // Advance to Question 2 (index 1 is Sentence Scramble)
      await act(async () => {
        root!.render(<QuizContainer quizzes={mockQuizzes} />);
      });

      // Pass Question 1
      const optionsQ1 = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        optionsQ1![2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ตรวจคำตอบ"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ไปต่อข้อถัดไป"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // We are now on Question 2: Sentence Scramble: tokens ["客", "不", "气"], correct: ["不", "客", "气"]
      expect(container?.textContent).toContain('Bú kèqi');
      expect(container?.textContent).toContain('ไม่เป็นไร, ไม่ต้องเกรงใจ');

      // Check dropzone placeholder
      expect(container?.textContent).toContain('แตะชิ้นส่วนเลโก้ด้านล่างเพื่อเรียงประโยค');

      // Pick "客" first (wrong order)
      const tokenKe = container?.querySelector('button[aria-label="เลือกคำว่า 客"]');
      await act(async () => {
        tokenKe?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(container?.querySelector('button[aria-label="ดึงคำว่า 客 กลับ"]')).toBeTruthy();

      // Tap reset button to clear
      const resetBtn = container?.querySelector('button[aria-label="เริ่มเรียงใหม่"]');
      expect(resetBtn).toBeTruthy();
      await act(async () => {
        resetBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Now pick in correct order: 不 -> 客 -> 气
      const tokenBu = container?.querySelector('button[aria-label="เลือกคำว่า 不"]');
      await act(async () => {
        tokenBu?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const tokenKe2 = container?.querySelector('button[aria-label="เลือกคำว่า 客"]');
      await act(async () => {
        tokenKe2?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const tokenQi = container?.querySelector('button[aria-label="เลือกคำว่า 气"]');
      await act(async () => {
        tokenQi?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Submit answer
      const checkBtn = container?.querySelector('button[aria-label="ตรวจคำตอบ"]');
      await act(async () => {
        checkBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(playCorrectSpy).toHaveBeenCalled();
      expect(container?.textContent).toContain('ถูกต้องแล้วคนเก่ง!');
      expect(container?.textContent).toContain('不 (ไม่) + 客气 (เกรงใจ)');
    });
  });

  // --------------------------------------------------------------------------
  // 5. Boss Challenge & Victory Screen
  // --------------------------------------------------------------------------
  describe('Boss Challenge & Victory Screen', () => {
    it('progresses to boss challenge and completes with victory screen and trophy', async () => {
      const onCompleteMock = vi.fn();

      // Use 1 quiz + boss challenge to quickly verify transition
      const singleQuiz: QuizQuestion[] = [mockQuizzes[2]]; // flash_recall: "再见"

      await act(async () => {
        root!.render(
          <QuizContainer
            quizzes={singleQuiz}
            bossChallenge={mockBossChallenge}
            cheerTrophy={mockCheerTrophy}
            onComplete={onCompleteMock}
            shuffleOptions={false}
          />
        );
      });

      expect(container?.textContent).toContain('ข้อที่ 1 จาก 2');

      // Answer Question 1 correctly: index 3 ("ลาก่อน / แล้วพบกันใหม่")
      const q1Options = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        q1Options![3].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ตรวจคำตอบ"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ไปต่อข้อถัดไป"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // We are now on Boss Stage!
      expect(container?.textContent).toContain('ด่านบอสประจำบท');
      expect(container?.textContent).toContain('สถานการณ์จริง (Scenario)');
      expect(container?.textContent).toContain('คุณเพิ่งก้าวเข้าไปในคาเฟ่ที่เซี่ยงไฮ้');

      // Answer Boss Challenge correctly: index 1 ("你好！")
      const bossOptions = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        bossOptions![1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ตรวจคำตอบ"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(container?.textContent).toContain('ว้าว! คุณพิชิตภารกิจทักทายสำเร็จแล้ว!');

      // Click "ดูผลลัพธ์ชัยชนะ"
      const victoryNavBtn = container?.querySelector('button[aria-label="ไปต่อข้อถัดไป"]');
      expect(victoryNavBtn?.textContent).toContain('ดูผลลัพธ์ชัยชนะ 🏆');

      await act(async () => {
        victoryNavBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Victory screen rendered!
      expect(playFanfareSpy).toHaveBeenCalled();
      expect(container?.textContent).toContain('พิชิตด่านท้าทายสำเร็จ!');
      expect(container?.textContent).toContain('ทูตน้อยรอยยิ้มพิมพ์ใจ 🐰✨');
      expect(container?.textContent).toContain('+50 XP');
      expect(onCompleteMock).toHaveBeenCalledWith(
        expect.objectContaining({
          passed: true,
          score: 2,
          totalQuestions: 2,
          xpEarned: 50,
        })
      );

      // Test Share Trophy button
      const shareBtn = container?.querySelector('button[aria-label="คัดลอกเกียรติยศเพื่อแชร์"]');
      expect(shareBtn).toBeTruthy();
      await act(async () => {
        shareBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. Safe Heart Recovery Modal
  // --------------------------------------------------------------------------
  describe('Hearts Depleted Recovery', () => {
    it('shows refill modal when hearts reach 0 and refills safely on button click', async () => {
      await act(async () => {
        root!.render(<QuizContainer quizzes={mockQuizzes} initialHearts={1} shuffleOptions={false} />);
      });

      // Submit wrong answer with 1 heart left -> 0 hearts
      const options = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        options![0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ตรวจคำตอบ"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Heart recovery dialog appears
      expect(container?.textContent).toContain('หัวใจหมดแล้วนะคนเก่ง 💖');
      expect(container?.textContent).toContain('น้องกระต่ายทู่ทู่เติมหัวใจให้ฟรี');

      const refillBtn = container?.querySelector('button[aria-label="เติมพลังใจแล้วลุยต่อ"]');
      expect(refillBtn).toBeTruthy();

      await act(async () => {
        refillBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Hearts refilled back to 5!
      expect(container?.textContent).toContain('5');
      expect(container?.querySelector('div[role="dialog"]')).toBeNull();
    });
  });

  // --------------------------------------------------------------------------
  // 7. Red Team Concurrency & Anti-Exploit Tests
  // --------------------------------------------------------------------------
  describe('Red Team Concurrency & Anti-Exploit', () => {
    it('prevents question skipping when Next Question button is rapidly double-clicked', async () => {
      await act(async () => {
        root!.render(<QuizContainer quizzes={mockQuizzes} />);
      });

      // Answer Question 1 correctly
      const options = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        options![2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ตรวจคำตอบ"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const nextBtn = container?.querySelector('button[aria-label="ไปต่อข้อถัดไป"]');
      expect(nextBtn).toBeTruthy();

      // Rapidly dispatch two clicks in the same event tick
      await act(async () => {
        nextBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        nextBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Should advance strictly to Question 2 (Sentence Scramble), NOT Question 3!
      expect(container?.textContent).toContain('ข้อที่ 2 จาก 3');
      expect(container?.textContent).toContain('Bú kèqi');
    });

    it('gates boss victory: failing boss challenge shows retry button and does not trigger victory screen', async () => {
      const onCompleteMock = vi.fn();
      const singleQuiz: QuizQuestion[] = [mockQuizzes[2]]; // flash_recall

      await act(async () => {
        root!.render(
          <QuizContainer
            quizzes={singleQuiz}
            bossChallenge={mockBossChallenge}
            cheerTrophy={mockCheerTrophy}
            onComplete={onCompleteMock}
            shuffleOptions={false}
          />
        );
      });

      // Answer Question 1 correctly
      const q1Options = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        q1Options![3].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ตรวจคำตอบ"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ไปต่อข้อถัดไป"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // We are in Boss stage. Pick WRONG answer: index 0 ("再见！")
      const bossOptions = container?.querySelectorAll('.quiz-option-card');
      await act(async () => {
        bossOptions![0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await act(async () => {
        container?.querySelector('button[aria-label="ตรวจคำตอบ"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // Victory screen must NOT appear!
      expect(container?.querySelector('.quiz-victory-screen')).toBeNull();
      expect(onCompleteMock).not.toHaveBeenCalled();

      // Retry boss button must be displayed
      const retryBossBtn = container?.querySelector('button[aria-label="ลองตอบใหม่อีกครั้ง"]');
      expect(retryBossBtn).toBeTruthy();
      expect(retryBossBtn?.textContent).toContain('ลองตอบด่านบอสใหม่อีกครั้ง 🐰💪');

      // Click retry button resets boss options
      await act(async () => {
        retryBossBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(container?.querySelector('button[aria-label="ตรวจคำตอบ"]')).toBeTruthy();
      expect((container?.querySelector('button[aria-label="ตรวจคำตอบ"]') as HTMLButtonElement).disabled).toBe(true);
    });
  });

  // --------------------------------------------------------------------------
  // 8. Runtime Shuffling & Resilient Sharing
  // --------------------------------------------------------------------------
  describe('Runtime Shuffling & Resilient Sharing', () => {
    it('defaults to shuffleOptions=true, maintaining letter badges A-D while correctly validating text', async () => {
      await act(async () => {
        root!.render(<QuizContainer quizzes={[mockQuizzes[0]]} />);
      });

      const options = container?.querySelectorAll('.quiz-option-card');
      expect(options?.length).toBe(4);

      // Verify badges are sequentially A, B, C, D
      const badges = Array.from(options!).map((el) => el.querySelector('.quiz-option-badge')?.textContent);
      expect(badges).toEqual(['A', 'B', 'C', 'D']);

      // Find the card with the correct answer text: 'เสียง 3 (ǎ) ตีลังกาลงสไลเดอร์แล้วเด้งขึ้น'
      const targetCard = Array.from(options!).find((el) =>
        el.textContent?.includes('เสียง 3 (ǎ) ตีลังกาลงสไลเดอร์แล้วเด้งขึ้น')
      );
      expect(targetCard).toBeTruthy();

      // Click the correct card
      await act(async () => {
        targetCard!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const checkBtn = container?.querySelector('button[aria-label="ตรวจคำตอบ"]') as HTMLButtonElement;
      await act(async () => {
        checkBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(playCorrectSpy).toHaveBeenCalled();
      expect(targetCard!.classList.contains('is-correct')).toBe(true);
      expect(container?.textContent).toContain('ถูกต้องแล้วคนเก่ง!');
    });
  });

  // --------------------------------------------------------------------------
  // 9. Cleanup & Teardown
  // --------------------------------------------------------------------------
  describe('Cleanup & Teardown', () => {
    it('cancels active speech when unmounted', async () => {
      await act(async () => {
        root!.render(<QuizContainer quizzes={mockQuizzes} />);
      });

      await act(async () => {
        root!.unmount();
        root = null;
      });

      expect(stopSpeakingSpy).toHaveBeenCalled();
    });
  });
});

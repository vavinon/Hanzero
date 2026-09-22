/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MobilePreviewFrame } from './MobilePreviewFrame';
import { Lesson } from '../../types/lesson';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

vi.mock('../../engines/audio/audioEngine', async () => {
  const actual = await vi.importActual('../../engines/audio/audioEngine');
  return {
    ...actual,
    hasChineseVoice: vi.fn(() => true),
    speak: vi.fn(),
    stopSpeaking: vi.fn(),
    playClick: vi.fn(),
    playCorrect: vi.fn(),
    playIncorrect: vi.fn(),
  };
});

const mockLesson: Lesson = {
  lesson_id: 'tier1_u01_l01',
  lesson_number: 1,
  title: {
    th: 'สวัสดีภาษาจีน',
    zh: '你好中文',
    en: 'Hello Chinese',
  },
  can_do: {
    th: 'ทักทายคนจีนได้',
    en: 'Can greet in Chinese',
  },
  baby_step_goal: 'ทักทายพื้นฐาน',
  vocabulary: [
    {
      id: 'vocab_1',
      hanzi: '你好',
      pinyin: 'nǐ hǎo',
      pinyin_tone: 'ni3 hao3',
      meaning_th: 'สวัสดี',
      meaning_en: 'Hello',
      radical: '亻',
      radical_name_th: 'คน',
      stroke_count: 7,
      mnemonic: 'คนสองคนคำนับกัน',
      kid_mnemonic: 'สวัสดีเพื่อนกระต่าย',
      body_gesture: 'โค้งคำนับ',
      example_sentence: {
        zh: '你好！',
        pinyin: 'Nǐ hǎo!',
        th: 'สวัสดี!',
        en: 'Hello!',
      },
    },
    {
      id: 'vocab_2',
      hanzi: '再见',
      pinyin: 'zàijiàn',
      pinyin_tone: 'zai4 jian4',
      meaning_th: 'ลาก่อน',
      meaning_en: 'Goodbye',
      radical: '冂',
      radical_name_th: 'ขอบเขต',
      stroke_count: 6,
      mnemonic: 'พบกันอีกครั้ง',
      kid_mnemonic: 'โบกมือบ๊ายบาย',
      body_gesture: 'โบกมือ',
      example_sentence: {
        zh: '老师，再见！',
        pinyin: 'Lǎoshī, zàijiàn!',
        th: 'คุณครู ลาก่อนครับ!',
        en: 'Goodbye teacher!',
      },
    },
  ],
  grammar_bite: {
    title: 'โครงสร้างประโยค',
    explanation_th: 'อธิบายไวยากรณ์',
    patterns: [],
  },
  dialogue: [
    {
      speaker: 'A',
      speaker_name: 'ทู่ทู่ 🐰',
      zh: '你好！',
      pinyin: 'Nǐ hǎo!',
      th: 'สวัสดี!',
      en: 'Hello!',
    },
    {
      speaker: 'B',
      speaker_name: 'สมชาย 🧒',
      zh: '你好！很高兴认识你。',
      pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshí nǐ.',
      th: 'สวัสดี! ยินดีที่ได้รู้จักเธอ',
      en: 'Hello! Nice to meet you.',
    },
  ],
  quizzes: [
    {
      type: 'meaning_match',
      question_th: 'คำว่า "สวัสดี" ในภาษาจีนคืออะไร?',
      options: ['你好', '谢谢'],
      correct_index: 0,
      explanation_th: '你好 (nǐ hǎo) แปลว่า สวัสดี',
      encouragement: 'ยอดเยี่ยมมาก!',
    },
  ],
  boss_challenge: {
    scenario_th: 'ทักทายในชีวิตจริง',
    options: ['你好', '再见'],
    correct_index: 0,
    explanation_th: 'ตอบสวัสดี',
    encouragement: 'เก่งมาก!',
  },
  cheer_trophy: {
    badge_id: 'badge_greet',
    badge_name: 'นักทักทาย',
    message_th: 'ยินดีด้วย!',
    xp_reward: 50,
  },
};

const emptyLesson: Lesson = {
  lesson_id: 'tier1_u01_l02',
  lesson_number: 2,
  title: { th: '', zh: '', en: '' },
  can_do: { th: '', en: '' },
  baby_step_goal: '',
  vocabulary: [],
  grammar_bite: {
    title: '',
    explanation_th: '',
    patterns: [],
  },
  dialogue: [],
  quizzes: [],
  boss_challenge: {
    scenario_th: '',
    options: [],
    correct_index: 0,
    explanation_th: '',
    encouragement: '',
  },
  cheer_trophy: {
    badge_id: '',
    badge_name: '',
    message_th: '',
    xp_reward: 0,
  },
};

describe('MobilePreviewFrame Component (TASK-604)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    vi.clearAllMocks();
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

  it('renders mobile smartphone chassis, status bar, dynamic island, and overview view', async () => {
    await act(async () => {
      root?.render(<MobilePreviewFrame lesson={mockLesson} tier={1} unitNumber={1} />);
    });

    expect(container?.querySelector('[data-testid="mobile-device-chassis"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="dynamic-island-notch"]')).not.toBeNull();
    expect(container?.textContent).toContain('9:41');
    expect(container?.textContent).toContain('สวัสดีภาษาจีน');
    expect(container?.textContent).toContain('你好中文');
    expect(container?.querySelector('[data-testid="preview-view-overview"]')).not.toBeNull();
  });

  it('switches between preview modes via mode pills', async () => {
    await act(async () => {
      root?.render(<MobilePreviewFrame lesson={mockLesson} />);
    });

    // 1. Switch to Vocab
    const vocabTabBtn = container?.querySelector('[data-testid="preview-tab-vocab"]') as HTMLButtonElement;
    await act(async () => {
      vocabTabBtn.click();
    });
    expect(container?.querySelector('[data-testid="preview-view-vocab"]')).not.toBeNull();
    expect(container?.textContent).toContain('คำที่ 1 / 2');

    // 2. Switch to Dialogue
    const dialogueTabBtn = container?.querySelector('[data-testid="preview-tab-dialogue"]') as HTMLButtonElement;
    await act(async () => {
      dialogueTabBtn.click();
    });
    expect(container?.querySelector('[data-testid="preview-view-dialogue"]')).not.toBeNull();

    // 3. Switch to Quiz
    const quizTabBtn = container?.querySelector('[data-testid="preview-tab-quiz"]') as HTMLButtonElement;
    await act(async () => {
      quizTabBtn.click();
    });
    expect(container?.querySelector('[data-testid="preview-view-quiz"]')).not.toBeNull();

    // 4. Switch to Audio
    const audioTabBtn = container?.querySelector('[data-testid="preview-tab-audio"]') as HTMLButtonElement;
    await act(async () => {
      audioTabBtn.click();
    });
    expect(container?.querySelector('[data-testid="preview-view-audio"]')).not.toBeNull();
    expect(container?.textContent).toContain('Audio Sandbox');
  });

  it('navigates vocabulary carousel with next and previous buttons', async () => {
    await act(async () => {
      root?.render(<MobilePreviewFrame lesson={mockLesson} activeStudioTab="vocab" />);
    });

    expect(container?.querySelector('[data-testid="preview-view-vocab"]')).not.toBeNull();
    expect(container?.textContent).toContain('คำที่ 1 / 2');
    expect(container?.textContent).toContain('你好');

    // Click next vocab
    const nextBtn = container?.querySelector('[data-testid="next-vocab-btn"]') as HTMLButtonElement;
    await act(async () => {
      nextBtn.click();
    });
    expect(container?.textContent).toContain('คำที่ 2 / 2');
    expect(container?.textContent).toContain('再见');

    // Click prev vocab
    const prevBtn = container?.querySelector('[data-testid="prev-vocab-btn"]') as HTMLButtonElement;
    await act(async () => {
      prevBtn.click();
    });
    expect(container?.textContent).toContain('คำที่ 1 / 2');
  });

  it('renders resilient empty states when lesson contains no items', async () => {
    await act(async () => {
      root?.render(<MobilePreviewFrame lesson={emptyLesson} activeStudioTab="vocab" />);
    });
    expect(container?.querySelector('[data-testid="vocab-empty-state"]')).not.toBeNull();
    expect(container?.textContent).toContain('ยังไม่มีคำศัพท์');

    // Switch to dialogue
    const dialogueTabBtn = container?.querySelector('[data-testid="preview-tab-dialogue"]') as HTMLButtonElement;
    await act(async () => {
      dialogueTabBtn.click();
    });
    expect(container?.querySelector('[data-testid="dialogue-empty-state"]')).not.toBeNull();
    expect(container?.textContent).toContain('ยังไม่มีบทสนทนา');

    // Switch to quiz
    const quizTabBtn = container?.querySelector('[data-testid="preview-tab-quiz"]') as HTMLButtonElement;
    await act(async () => {
      quizTabBtn.click();
    });
    expect(container?.querySelector('[data-testid="quiz-empty-state"]')).not.toBeNull();
    expect(container?.textContent).toContain('ยังไม่มีแบบฝึกหัด');
  });

  it('automatically syncs preview mode with activeStudioTab prop', async () => {
    await act(async () => {
      root?.render(<MobilePreviewFrame lesson={mockLesson} activeStudioTab="dialogue" />);
    });
    expect(container?.querySelector('[data-testid="preview-view-dialogue"]')).not.toBeNull();

    await act(async () => {
      root?.render(<MobilePreviewFrame lesson={mockLesson} activeStudioTab="quiz" />);
    });
    expect(container?.querySelector('[data-testid="preview-view-quiz"]')).not.toBeNull();
  });

  it('calls onCloseDrawer when close button is clicked in drawer mode', async () => {
    const onCloseDrawer = vi.fn();
    await act(async () => {
      root?.render(
        <MobilePreviewFrame
          lesson={mockLesson}
          isDrawer={true}
          onCloseDrawer={onCloseDrawer}
        />
      );
    });

    const closeBtn = container?.querySelector('[data-testid="close-preview-drawer-btn"]') as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();
    await act(async () => {
      closeBtn.click();
    });
    expect(onCloseDrawer).toHaveBeenCalledTimes(1);
  });
});

/**
 * src/components/lesson/VocabCard.tsx
 * ------------------------------------------------
 * Trilingual VocabCard Component (UX Golden Template).
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Pure Presentation & Isolated Logic
 * - Strict TypeScript: Zero 'any'
 * - Mobile-First 360px+ Touch Ergonomics (Min 44px hitbox)
 * - 60fps GPU-Accelerated 3D Card Flip
 * - Universal Design: Color-blind accessible tone contours (¯ ˊ ˇ ˋ ·) + tone numbers
 * - Progressive Pinyin Fading (full / faded / hidden + tap to peek)
 * - Native Voice integration with 1.0x / 0.75x speed toggle & Safe Stop
 * - Stroke Inspector Modal with MizigeGrid & HanziWriterBox (zero memory leaks)
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Volume2,
  RotateCw,
  Undo2,
  Maximize2,
  X,
  EyeOff,
  Sparkles,
  BookOpen,
  Smile,
  Activity,
} from 'lucide-react';
import { VocabularyItem, ExampleSentence } from '../../types/lesson';
import { speak, stopSpeaking, playClick } from '../../engines/audio/audioEngine';

const HanziWriterBox = React.lazy(() =>
  import('../hanzi/HanziWriterBox').then((m) => ({ default: m.HanziWriterBox }))
);

export type PinyinFadingMode = 'full' | 'faded' | 'hidden';

export interface SyllableTone {
  raw: string;
  tone: number;
  symbol: string;
  toneNameTh: string;
  toneNumber: number;
}

export interface VocabCardProps {
  /** Vocabulary item conforming strictly to types/lesson.ts */
  vocab: VocabularyItem;
  /** Initial pinyin fading mode (default: 'full') */
  initialPinyinMode?: PinyinFadingMode;
  /** Initial flip state (default: false = Face A Front) */
  initialFlipped?: boolean;
  /** Default audio playback rate (default: 1.0) */
  defaultPlaybackRate?: 1.0 | 0.75;
  /** Callback when card is flipped */
  onFlip?: (isFlipped: boolean) => void;
  /** Callback when audio starts or finishes */
  onAudioPlay?: (hanzi: string, rate: number) => void;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
}

const TONE_SYMBOLS: Record<number, string> = {
  1: '¯',
  2: 'ˊ',
  3: 'ˇ',
  4: 'ˋ',
  5: '·',
};

const TONE_NAMES_TH: Record<number, string> = {
  1: 'เสียง 1 (สามัญ-สูง)',
  2: 'เสียง 2 (จัตวา-ขึ้น)',
  3: 'เสียง 3 (เอก-ตกแล้วขึ้น)',
  4: 'เสียง 4 (โท-ตกฮวบ)',
  5: 'เสียง 5 (เสียงเบา/สั้น)',
};

/**
 * Parses pinyin_tone string (e.g. "ni3", "xie4xie5", "bu2 ke4 qi5") into structured syllable info.
 */
export function parseToneInfo(pinyinToneStr: string): SyllableTone[] {
  if (!pinyinToneStr || typeof pinyinToneStr !== 'string') {
    return [];
  }

  const matches = Array.from(pinyinToneStr.matchAll(/([a-zA-ZüÜ]+)([1-5]?)/g));
  if (matches.length === 0) {
    return [];
  }

  return matches
    .filter((m) => m[1].length > 0)
    .map((m) => {
      const raw = m[1];
      const toneNum = m[2] ? parseInt(m[2], 10) : 5;
      const validTone = toneNum >= 1 && toneNum <= 5 ? toneNum : 5;
      return {
        raw,
        tone: validTone,
        symbol: TONE_SYMBOLS[validTone] || '·',
        toneNameTh: TONE_NAMES_TH[validTone] || 'เสียงเบา',
        toneNumber: validTone,
      };
    });
}

/**
 * Pedagogical contextual fallback sentences for Unit 1 vocabulary.
 */
const UNIT1_FALLBACK_SENTENCES: Record<string, ExampleSentence> = {
  你: {
    zh: '你好！很高兴认识你。',
    pinyin: 'nǐ hǎo! hěn gāoxìng rènshi nǐ.',
    th: 'สวัสดี! ยินดีที่ได้รู้จักเธอนะ',
    en: 'Hello! Nice to meet you.',
  },
  好: {
    zh: '今天天气很好。',
    pinyin: 'jīntiān tiānqì hěn hǎo.',
    th: 'วันนี้อากาศดีมาก',
    en: 'The weather is very good today.',
  },
  谢谢: {
    zh: '太谢谢你了，朋友！',
    pinyin: 'tài xièxie nǐ le, péngyou!',
    th: 'ขอบคุณเธอมากๆ เลยนะเพื่อนรัก!',
    en: 'Thank you so much, my friend!',
  },
  不客气: {
    zh: '不用谢，大家都是朋友，不客气！',
    pinyin: 'bú yòng xiè, dàjiā dōu shì péngyou, bú kèqi!',
    th: 'ไม่ต้องขอบคุณหรอก พวกเราเป็นเพื่อนกัน ไม่เป็นไรเลย!',
    en: "Don't mention it, we are all friends!",
  },
  再见: {
    zh: '明天学校见，再见！',
    pinyin: 'míngtiān xuéxiào jiàn, zàijiàn!',
    th: 'พรุ่งนี้เจอกันที่โรงเรียนนะ ลาก่อน!',
    en: 'See you tomorrow at school, goodbye!',
  },
  我: {
    zh: '我是泰国人。',
    pinyin: 'wǒ shì tàiguó rén.',
    th: 'ฉันเป็นคนไทย',
    en: 'I am Thai.',
  },
  叫: {
    zh: '我叫李明，你呢？',
    pinyin: 'wǒ jiào Lǐ Míng, nǐ ne?',
    th: 'ฉันชื่อหลี่หมิง แล้วคุณล่ะ?',
    en: 'My name is Li Ming, and you?',
  },
  什么: {
    zh: '你叫什么名字？',
    pinyin: 'nǐ jiào shénme míngzi?',
    th: 'คุณชื่ออะไรหรือ?',
    en: 'What is your name?',
  },
  名字: {
    zh: '这个名字很有意思。',
    pinyin: 'zhè ge míngzi hěn yǒu yìsi.',
    th: 'ชื่อนี้น่าสนใจและมีความหมายดีมาก',
    en: 'This name is very interesting.',
  },
  是: {
    zh: '我是学生，不是老师。',
    pinyin: 'wǒ shì xuésheng, bú shì lǎoshī.',
    th: 'ฉันเป็นนักเรียน ไม่ใช่คุณครู',
    en: 'I am a student, not a teacher.',
  },
  哪: {
    zh: '你是哪国人？',
    pinyin: 'nǐ shì nǎ guó rén?',
    th: 'คุณเป็นคนประเทศไหน?',
    en: 'Which country are you from?',
  },
  国: {
    zh: '中国和泰国是好朋友。',
    pinyin: 'zhōngguó hé tàiguó shì hǎo péngyou.',
    th: 'ประเทศจีนและประเทศไทยเป็นมิตรที่ดีต่อกัน',
    en: 'China and Thailand are good friends.',
  },
  人: {
    zh: '中国人很热情。',
    pinyin: 'zhōngguó rén hěn rèqíng.',
    th: 'คนจีนเป็นมิตรและอบอุ่นมาก',
    en: 'Chinese people are very warm and friendly.',
  },
  泰国: {
    zh: '我来自美丽的泰国。',
    pinyin: 'wǒ láizì měilì de tàiguó.',
    th: 'ฉันมาจากประเทศไทยอันสวยงาม',
    en: 'I come from beautiful Thailand.',
  },
  中国: {
    zh: '我想去中国旅游。',
    pinyin: 'wǒ xiǎng qù zhōngguó lǚyóu.',
    th: 'ฉันอยากไปเที่ยวประเทศจีน',
    en: 'I want to travel to China.',
  },
  您: {
    zh: '老师，您好！很高兴认识您。',
    pinyin: 'lǎoshī, nín hǎo! hěn gāoxìng rènshi nín.',
    th: 'คุณครู สวัสดีครับ ยินดีที่ได้รู้จักท่านครับ',
    en: 'Hello, teacher! Nice to meet you.',
  },
  高兴: {
    zh: '今天见到你，我很高兴。',
    pinyin: 'jīntiān jiàn dào nǐ, wǒ hěn gāoxìng.',
    th: 'วันนี้ได้เจอเธอ ฉันดีใจมากเลย',
    en: 'I am very glad to see you today.',
  },
  认识: {
    zh: '很高兴认识你！',
    pinyin: 'hěn gāoxìng rènshi nǐ!',
    th: 'ยินดีที่ได้รู้จักเธอนะ!',
    en: 'Nice to meet you!',
  },
};

export const VocabCard: React.FC<VocabCardProps> = ({
  vocab,
  initialPinyinMode = 'full',
  initialFlipped = false,
  defaultPlaybackRate = 1.0,
  onFlip,
  onAudioPlay,
  className = '',
  style = {},
}) => {
  // State Management
  const [isFlipped, setIsFlipped] = useState<boolean>(initialFlipped);
  const [pinyinMode, setPinyinMode] = useState<PinyinFadingMode>(initialPinyinMode);
  const [isPeeking, setIsPeeking] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<1.0 | 0.75>(defaultPlaybackRate);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPlayingSentence, setIsPlayingSentence] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [selectedCharIndex, setSelectedCharIndex] = useState<number>(0);

  const isMountedRef = useRef<boolean>(true);
  const activeRequestIdRef = useRef<number>(0);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  // Extract Hanzi characters for multi-character inspection (e.g. 谢谢 -> 谢; 不客气 -> 不, 客, 气)
  const uniqueHanziChars = useMemo(() => {
    const chars = Array.from(vocab.hanzi).filter((ch) => /[\u4e00-\u9fa5]/.test(ch));
    const set = new Set<string>();
    const result: string[] = [];
    for (const ch of chars) {
      if (!set.has(ch)) {
        set.add(ch);
        result.push(ch);
      }
    }
    return result.length > 0 ? result : [vocab.hanzi[0] || '你'];
  }, [vocab.hanzi]);

  const activeInspectorChar = uniqueHanziChars[selectedCharIndex] || uniqueHanziChars[0] || '你';

  // Tone parsing for accessible visual indicators
  const syllableTones = useMemo(() => {
    return parseToneInfo(vocab.pinyin_tone);
  }, [vocab.pinyin_tone]);

  // Contextual Example Sentence
  const exampleSentence: ExampleSentence = useMemo(() => {
    if (vocab.example_sentence) {
      return vocab.example_sentence;
    }
    if (UNIT1_FALLBACK_SENTENCES[vocab.hanzi]) {
      return UNIT1_FALLBACK_SENTENCES[vocab.hanzi];
    }
    return {
      zh: `${vocab.hanzi}很好。`,
      pinyin: `${vocab.display_pinyin || vocab.pinyin} hěn hǎo.`,
      th: `${vocab.meaning_th}ดีมาก`,
      en: `${vocab.meaning_en} is very good.`,
    };
  }, [vocab]);

  // Safe unmount audio cleanup
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      activeRequestIdRef.current++;
      stopSpeaking();
    };
  }, []);

  // Synchronize state and stop any dangling audio when vocab prop changes
  useEffect(() => {
    activeRequestIdRef.current++;
    stopSpeaking();
    setIsPlaying(false);
    setIsPlayingSentence(false);
    setIsFlipped(initialFlipped);
    setPinyinMode(initialPinyinMode);
    setIsPeeking(false);
    setIsInspectorOpen(false);
    setSelectedCharIndex(0);
  }, [vocab.id, initialFlipped, initialPinyinMode]);

  // Keyboard accessibility for modal (Escape key) & Auto-focus
  useEffect(() => {
    if (!isInspectorOpen) return;

    const timer = window.setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsInspectorOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInspectorOpen]);

  // Handle Flip Toggle
  const handleToggleFlip = useCallback(() => {
    playClick();
    activeRequestIdRef.current++;
    stopSpeaking();
    setIsPlaying(false);
    setIsPlayingSentence(false);

    setIsFlipped((prev) => {
      const next = !prev;
      onFlip?.(next);
      return next;
    });
  }, [onFlip]);

  // Handle Main Vocabulary Audio Playback
  const handlePlayVocabAudio = useCallback(async () => {
    if (isPlaying) {
      activeRequestIdRef.current++;
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    const requestId = ++activeRequestIdRef.current;
    stopSpeaking();
    setIsPlaying(true);
    setIsPlayingSentence(false);
    onAudioPlay?.(vocab.hanzi, playbackRate);

    try {
      await speak(vocab.hanzi, {
        rate: playbackRate,
        onStart: () => {
          if (isMountedRef.current && activeRequestIdRef.current === requestId) {
            setIsPlaying(true);
          }
        },
        onEnd: () => {
          if (isMountedRef.current && activeRequestIdRef.current === requestId) {
            setIsPlaying(false);
          }
        },
        onError: () => {
          if (isMountedRef.current && activeRequestIdRef.current === requestId) {
            setIsPlaying(false);
          }
        },
      });
    } catch {
      if (isMountedRef.current && activeRequestIdRef.current === requestId) {
        setIsPlaying(false);
      }
    } finally {
      if (isMountedRef.current && activeRequestIdRef.current === requestId) {
        setIsPlaying(false);
      }
    }
  }, [isPlaying, vocab.hanzi, playbackRate, onAudioPlay]);

  // Handle Example Sentence Audio Playback
  const handlePlaySentenceAudio = useCallback(async () => {
    if (isPlayingSentence) {
      activeRequestIdRef.current++;
      stopSpeaking();
      setIsPlayingSentence(false);
      return;
    }

    const requestId = ++activeRequestIdRef.current;
    stopSpeaking();
    setIsPlayingSentence(true);
    setIsPlaying(false);

    try {
      await speak(exampleSentence.zh, {
        rate: playbackRate,
        onStart: () => {
          if (isMountedRef.current && activeRequestIdRef.current === requestId) {
            setIsPlayingSentence(true);
          }
        },
        onEnd: () => {
          if (isMountedRef.current && activeRequestIdRef.current === requestId) {
            setIsPlayingSentence(false);
          }
        },
        onError: () => {
          if (isMountedRef.current && activeRequestIdRef.current === requestId) {
            setIsPlayingSentence(false);
          }
        },
      });
    } catch {
      if (isMountedRef.current && activeRequestIdRef.current === requestId) {
        setIsPlayingSentence(false);
      }
    } finally {
      if (isMountedRef.current && activeRequestIdRef.current === requestId) {
        setIsPlayingSentence(false);
      }
    }
  }, [isPlayingSentence, exampleSentence.zh, playbackRate]);

  // Toggle Playback Rate
  const handleToggleRate = useCallback((rate: 1.0 | 0.75) => {
    playClick();
    setPlaybackRate(rate);
  }, []);

  // Handle Progressive Pinyin Peek Tap
  const handlePinyinPeek = useCallback(() => {
    if (pinyinMode === 'hidden') {
      playClick();
      setIsPeeking((prev) => !prev);
    }
  }, [pinyinMode]);

  // Switch Pinyin Fading Mode
  const handleSetPinyinMode = useCallback((mode: PinyinFadingMode) => {
    playClick();
    setPinyinMode(mode);
    setIsPeeking(false);
  }, []);

  return (
    <div
      className={`vocab-card-container ${className}`}
      style={{
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
        ...style,
      }}
    >
      {/* 3D Card Flipper Wrapper */}
      <div className={`vocab-card-flipper ${isFlipped ? 'is-flipped' : ''}`}>
        {/* ===================================================================
            FACE A (FRONT): Character, Pinyin, Meaning, Mnemonic & Audio
            =================================================================== */}
        <div
          className={`vocab-card-face vocab-card-front ${
            isPlaying ? 'acoustic-card-active' : ''
          }`}
          aria-hidden={isFlipped}
          style={{
            padding: '20px 16px 16px 16px',
            gap: '14px',
            position: 'relative',
            pointerEvents: isFlipped ? 'none' : 'auto',
          }}
        >
          {/* Top Utilities Row: Pinyin Fading Controls & Stroke Inspector Trigger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '12px',
            }}
          >
            {/* Progressive Pinyin Fading Pill Segment */}
            <div
              role="group"
              aria-label="การแสดงผลพินอิน"
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '3px',
                gap: '2px',
              }}
            >
              <button
                type="button"
                aria-pressed={pinyinMode === 'full'}
                onClick={() => handleSetPinyinMode('full')}
                style={{
                  padding: '6px 12px',
                  minHeight: '44px',
                  minWidth: '44px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: pinyinMode === 'full' ? '#FFFFFF' : 'transparent',
                  color: pinyinMode === 'full' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                  boxShadow: pinyinMode === 'full' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                }}
                title="แสดงพินอินชัดเจน 100%"
              >
                เต็ม
              </button>

              <button
                type="button"
                aria-pressed={pinyinMode === 'faded'}
                onClick={() => handleSetPinyinMode('faded')}
                style={{
                  padding: '6px 12px',
                  minHeight: '44px',
                  minWidth: '44px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: pinyinMode === 'faded' ? '#FFFFFF' : 'transparent',
                  color: pinyinMode === 'faded' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                  boxShadow: pinyinMode === 'faded' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                }}
                title="แสดงพินอินจางลง 40% กระตุ้นให้อ่านตัวจีนก่อน"
              >
                จาง
              </button>

              <button
                type="button"
                aria-pressed={pinyinMode === 'hidden'}
                onClick={() => handleSetPinyinMode('hidden')}
                style={{
                  padding: '6px 12px',
                  minHeight: '44px',
                  minWidth: '44px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: pinyinMode === 'hidden' ? '#FFFFFF' : 'transparent',
                  color: pinyinMode === 'hidden' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                  boxShadow: pinyinMode === 'hidden' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                }}
                title="ซ่อนพินอิน (แตะเพื่อแอบดู)"
              >
                {pinyinMode === 'hidden' ? <EyeOff size={12} style={{ marginRight: 3 }} /> : null}
                ซ่อน
              </button>
            </div>

            {/* Stroke Inspector Trigger Button */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsInspectorOpen(true);
              }}
              className="btn-tactile-secondary"
              style={{
                minHeight: '44px',
                minWidth: '44px',
                padding: '8px 12px',
                gap: '6px',
                fontSize: '12px',
                borderRadius: 'var(--radius-full)',
              }}
              title="ขยายดูเส้นขีดและตารางเก้าช่อง"
              aria-label="ขยายดูเส้นขีดตัวอักษร"
            >
              <Maximize2 size={14} color="var(--color-jade-primary)" />
              <span>ขยายเส้นขีด</span>
            </button>
          </div>

          {/* Main Hanzi Character Display (>= 36px / 2.25rem, here 56px for Hero readability) */}
          <div
            onClick={handlePinyinPeek}
            role={pinyinMode === 'hidden' ? 'button' : undefined}
            tabIndex={pinyinMode === 'hidden' ? 0 : undefined}
            aria-label={`ตัวอักษรจีน ${vocab.hanzi}`}
            style={{
              textAlign: 'center',
              marginTop: '4px',
              cursor: pinyinMode === 'hidden' ? 'pointer' : 'default',
            }}
          >
            <div
              style={{
                fontSize: 'var(--size-hanzi-hero, 3.5rem)',
                fontWeight: 700,
                fontFamily: 'var(--font-hanzi-hero), Noto Sans SC, LXGW WenKai, sans-serif',
                color: 'var(--text-ink-primary)',
                lineHeight: 1.1,
                letterSpacing: '0.04em',
                userSelect: 'none',
                transition: 'transform 0.15s ease',
                transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {vocab.hanzi}
            </div>

            {/* Pinyin Text with Fading / Peek States */}
            <div
              style={{
                marginTop: '6px',
                fontSize: 'var(--size-pinyin-body, 1.35rem)',
                fontWeight: 600,
                lineHeight: 'var(--line-height-pinyin, 1.6)',
                minHeight: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <span
                className={`pinyin-display pinyin-mode-${pinyinMode} ${
                  isPeeking ? 'pinyin-mode-peek' : ''
                }`}
                style={{
                  color: isPeeking ? 'var(--color-jade-primary)' : 'var(--text-ink-primary)',
                }}
              >
                {vocab.display_pinyin || vocab.pinyin}
              </span>

              {pinyinMode === 'hidden' && (
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isPeeking ? 'var(--color-jade-surface)' : '#F3F4F6',
                    color: isPeeking ? 'var(--color-jade-primary)' : 'var(--text-ink-muted)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {isPeeking ? '👀 กำลังแอบดู' : '👆 แตะเพื่อดู'}
                </span>
              )}
            </div>
          </div>

          {/* Accessible Tone Indicators (Universal Design) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              marginTop: '-4px',
            }}
            aria-label="เครื่องหมายวรรณยุกต์และคลื่นเสียง"
          >
            {syllableTones.map((s, idx) => (
              <span
                key={`${s.raw}-${idx}`}
                className={`tone-pill tone-pill-${s.tone}`}
                title={`${s.raw}: ${s.toneNameTh}`}
                aria-label={`${s.raw} ${s.toneNameTh} สัญลักษณ์ ${s.symbol}`}
              >
                <span>{s.raw}</span>
                <span style={{ fontSize: '13px', fontWeight: 900 }}>{s.symbol}</span>
                <span>(T{s.toneNumber})</span>
              </span>
            ))}

            {vocab.sandhi_rule && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-ochre)',
                  backgroundColor: 'var(--color-ochre-surface)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #FDE68A',
                }}
                title="คำนี้มีกฎการผันเสียงอัตโนมัติ"
              >
                💡 {vocab.sandhi_rule === 'bu' ? 'bù + เสียง 4 -> bú' : vocab.sandhi_rule === '3+3' ? 'เสียง 3+3 -> 2+3' : 'ผันเสียง'}
              </span>
            )}
          </div>

          {/* Trilingual Meanings: Natural Thai + International English */}
          <div
            style={{
              textAlign: 'center',
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--text-ink-primary)',
              }}
            >
              {vocab.meaning_th}
            </div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-ink-secondary)',
                marginTop: '2px',
              }}
            >
              {vocab.meaning_en}
            </div>
          </div>

          {/* Radical and Stroke Info Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'var(--text-ink-secondary)',
            }}
          >
            <span style={{ fontWeight: 600 }}>หมวดนำ:</span>
            <span
              style={{
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#F3EDE4',
                color: 'var(--text-ink-primary)',
                fontWeight: 700,
              }}
            >
              {vocab.radical} {vocab.radical_name_th}
            </span>
            <span>•</span>
            <span>{vocab.stroke_count} ขีด</span>
          </div>

          {/* Kid Mnemonic Story & Body Gesture */}
          <div
            style={{
              backgroundColor: '#FDFCF9',
              border: '1px dashed var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '12px',
              lineHeight: 1.45,
            }}
          >
            {vocab.kid_mnemonic && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <Sparkles size={14} color="var(--color-ochre)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>ภาพจำช่วยจำ:</strong> {vocab.kid_mnemonic}
                </span>
              </div>
            )}
            {vocab.body_gesture && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <Smile size={14} color="var(--color-jade-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>ท่าทางจำง่าย:</strong> {vocab.body_gesture}
                </span>
              </div>
            )}
          </div>

          {/* Audio Controls Bar: Play Native Voice + Speed Toggle (1.0x / 0.75x) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              marginTop: 'auto',
              paddingTop: '6px',
            }}
          >
            {/* Play Sound Button */}
            <button
              type="button"
              onClick={handlePlayVocabAudio}
              className="btn-tactile-primary"
              style={{
                flex: 1,
                gap: '8px',
                minHeight: '46px',
                padding: '8px 16px',
              }}
              aria-label={`ฟังเสียงคำศัพท์ ${vocab.hanzi}`}
            >
              {isPlaying ? <Activity size={18} /> : <Volume2 size={18} />}
              <span>{isPlaying ? 'กำลังออกเสียง...' : 'ฟังเสียง Native'}</span>
            </button>

            {/* Speed Toggle Switch (1.0x / 0.75x) */}
            <div
              role="group"
              aria-label="ความเร็วเสียง"
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '3px',
                gap: '3px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <button
                type="button"
                aria-pressed={playbackRate === 1.0}
                onClick={() => handleToggleRate(1.0)}
                style={{
                  padding: '6px 12px',
                  minHeight: '44px',
                  minWidth: '44px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: playbackRate === 1.0 ? '#FFFFFF' : 'transparent',
                  color: playbackRate === 1.0 ? 'var(--color-jade-primary)' : 'var(--text-ink-muted)',
                  boxShadow: playbackRate === 1.0 ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
                title="ความเร็วปกติ (1.0x)"
              >
                1.0x
              </button>
              <button
                type="button"
                aria-pressed={playbackRate === 0.75}
                onClick={() => handleToggleRate(0.75)}
                style={{
                  padding: '6px 12px',
                  minHeight: '44px',
                  minWidth: '44px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: playbackRate === 0.75 ? '#FFFFFF' : 'transparent',
                  color: playbackRate === 0.75 ? 'var(--color-jade-primary)' : 'var(--text-ink-muted)',
                  boxShadow: playbackRate === 0.75 ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
                title="ความเร็วช้าสำหรับผู้เริ่มต้น (0.75x)"
              >
                0.75x
              </button>
            </div>
          </div>

          {/* Bottom Flip Trigger Pill */}
          <button
            type="button"
            onClick={handleToggleFlip}
            className="btn-tactile-secondary"
            aria-label="พลิกดูตัวอย่างประโยค"
            style={{
              width: '100%',
              gap: '6px',
              minHeight: '44px',
              fontSize: '13px',
              color: 'var(--text-ink-secondary)',
            }}
          >
            <RotateCw size={14} color="var(--color-jade-primary)" />
            <span>พลิกดูตัวอย่างประโยคบริบทจริง 🔄</span>
          </button>
        </div>

        {/* ===================================================================
            FACE B (BACK): Contextual Example Sentence (3 Languages)
            =================================================================== */}
        <div
          className={`vocab-card-face vocab-card-back ${
            isPlayingSentence ? 'acoustic-card-active' : ''
          }`}
          aria-hidden={!isFlipped}
          style={{
            padding: '20px 16px 16px 16px',
            gap: '14px',
            justifyContent: 'space-between',
            pointerEvents: isFlipped ? 'auto' : 'none',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} color="var(--color-jade-primary)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
                ตัวอย่างประโยคจริง (Contextual Example)
              </span>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--color-jade-primary)',
                backgroundColor: 'var(--color-jade-surface)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              คำหลัก: {vocab.hanzi}
            </span>
          </div>

          {/* Example Sentence Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '16px 14px',
              backgroundColor: 'var(--bg-rice-paper)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}
          >
            {/* Sentence Chinese Characters */}
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                fontFamily: 'var(--font-hanzi-hero), Noto Sans SC, sans-serif',
                color: 'var(--text-ink-primary)',
                lineHeight: 1.35,
              }}
            >
              {exampleSentence.zh}
            </div>

            {/* Sentence Pinyin */}
            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--color-ochre)',
                lineHeight: 1.4,
              }}
            >
              {exampleSentence.pinyin}
            </div>

            {/* Sentence Thai Meaning */}
            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--text-ink-primary)',
                borderTop: '1px dashed var(--border-subtle)',
                paddingTop: '8px',
              }}
            >
              "{exampleSentence.th}"
            </div>

            {/* Sentence English Meaning */}
            <div
              style={{
                fontSize: '13px',
                color: 'var(--text-ink-secondary)',
                fontStyle: 'italic',
              }}
            >
              "{exampleSentence.en}"
            </div>
          </div>

          {/* Pedagogical Tip for Sentence */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-card-subtle)',
              fontSize: '12px',
              color: 'var(--text-ink-secondary)',
            }}
          >
            <Sparkles size={14} color="var(--color-ochre)" style={{ flexShrink: 0 }} />
            <span>
              <strong>Tip การจำ:</strong> ฟังและออกเสียงตามจังหวะธรรมชาติ ช่วยให้จำศัพท์ได้ยาวนานขึ้น 2 เท่า!
            </span>
          </div>

          {/* Action Buttons: Listen to Sentence & Flip Back */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
            <button
              type="button"
              onClick={handlePlaySentenceAudio}
              className="btn-tactile-primary"
              style={{
                width: '100%',
                gap: '8px',
                minHeight: '46px',
              }}
              aria-label={`ฟังเสียงประโยค ${exampleSentence.zh}`}
            >
              {isPlayingSentence ? <Activity size={18} /> : <Volume2 size={18} />}
              <span>{isPlayingSentence ? 'กำลังเล่นประโยค...' : `ฟังเสียงประโยค (${playbackRate}x)`}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleFlip}
              className="btn-tactile-secondary"
              aria-label="กลับไปหน้าคำศัพท์"
              style={{
                width: '100%',
                gap: '6px',
                minHeight: '44px',
                fontSize: '13px',
              }}
            >
              <Undo2 size={14} />
              <span>กลับไปหน้าคำศัพท์ ↩️</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================
          STROKE INSPECTOR MODAL (แว่นขยายเส้นขีด): Zero Memory Leak Lifecycle
          =================================================================== */}
      {isInspectorOpen && (
        <div
          className="stroke-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stroke-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              playClick();
              setIsInspectorOpen(false);
            }
          }}
        >
          <div className="stroke-modal-content">
            {/* Modal Header */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Maximize2 size={16} color="var(--color-jade-primary)" />
                <h3
                  id="stroke-modal-title"
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--text-ink-primary)',
                    margin: 0,
                  }}
                >
                  ขยายเส้นขีด: {activeInspectorChar} ({uniqueHanziChars.length > 1 ? `รวมคำ ${vocab.stroke_count}` : vocab.stroke_count} ขีด)
                </h3>
              </div>

              <button
                ref={modalCloseBtnRef}
                type="button"
                onClick={() => {
                  playClick();
                  setIsInspectorOpen(false);
                }}
                className="btn-tactile-secondary"
                style={{
                  minHeight: '44px',
                  minWidth: '44px',
                  padding: '10px',
                  borderRadius: '50%',
                }}
                aria-label="ปิดหน้าต่างขยายเส้นขีด"
              >
                <X size={18} />
              </button>
            </div>

            {/* Character Selector for Multi-character words (e.g. 谢谢 -> 谢; 不客气 -> 不, 客, 气) */}
            {uniqueHanziChars.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '2px',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--text-ink-muted)', fontWeight: 600 }}>
                  เลือกพยางค์:
                </span>
                {uniqueHanziChars.map((char, idx) => (
                  <button
                    key={`${char}-${idx}`}
                    type="button"
                    onClick={() => {
                      playClick();
                      setSelectedCharIndex(idx);
                    }}
                    style={{
                      padding: '8px 14px',
                      minHeight: '44px',
                      minWidth: '44px',
                      borderRadius: 'var(--radius-full)',
                      border: '1.5px solid',
                      borderColor:
                        selectedCharIndex === idx
                          ? 'var(--color-jade-primary)'
                          : 'var(--border-subtle)',
                      backgroundColor:
                        selectedCharIndex === idx
                          ? 'var(--color-jade-surface)'
                          : 'transparent',
                      color:
                        selectedCharIndex === idx
                          ? 'var(--color-jade-primary)'
                          : 'var(--text-ink-secondary)',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {char}
                  </button>
                ))}
              </div>
            )}

            {/* Interactive HanziWriter inside MizigeGrid (220px on Mobile) */}
            <div style={{ display: 'flex', justifyContent: 'center', minHeight: '220px' }}>
              <React.Suspense
                fallback={
                  <div
                    className="animate-zen-pulse"
                    style={{
                      width: '220px',
                      height: '220px',
                      backgroundColor: 'var(--bg-rice-paper)',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px dashed var(--border-card)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <div style={{ fontSize: '24px' }}>🖌️</div>
                    <span style={{ fontSize: '11px', color: 'var(--text-ink-muted)', fontWeight: 500 }}>
                      ฝนหมึกเตรียมกระดาษข้าว...
                    </span>
                  </div>
                }
              >
                <HanziWriterBox
                  character={activeInspectorChar}
                  size={220}
                  initialMode="idle"
                  showOutline={true}
                />
              </React.Suspense>
            </div>

            {/* Radical & Writing Note */}
            <div
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-rice-paper)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                lineHeight: 1.4,
                color: 'var(--text-ink-secondary)',
              }}
            >
              <div>
                <strong>หมวดนำ:</strong> {vocab.radical} ({vocab.radical_name_th})
              </div>
              {vocab.writing_note && (
                <div style={{ marginTop: '4px' }}>
                  <strong>ข้อสังเกตการเขียน:</strong> {vocab.writing_note}
                </div>
              )}
            </div>

            {/* Done Button */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsInspectorOpen(false);
              }}
              className="btn-tactile-primary"
              style={{ width: '100%', minHeight: '44px', fontSize: '13px' }}
            >
              เข้าใจแล้ว ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

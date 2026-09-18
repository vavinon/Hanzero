/**
 * src/components/lesson/GrammarBite.tsx
 * ------------------------------------------------
 * 1-Minute Grammar Bite & Tone Rule Component (UX Golden Template).
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Pure Presentation & Resilient Audio Orchestration
 * - Strict TypeScript: Zero 'any'
 * - Modern Oriental "Lego Formula" Visual UX (Mobile-First 320px+)
 * - Tactile 3D Lego Sentence Blocks with Semantic Color Coding:
 *   - Pronoun/Person/Subject: Warm Ochre (--color-ochre)
 *   - Verb/Predicate/State: Sacred Jade (--color-jade-primary)
 *   - Question/Modifier: Sky Tint
 *   - Result Expression: Bold Jade / Golden Accent
 * - 1-Minute Bite-sized Thai Explanations for Zero-Knowledge Learners
 * - Tone Sandhi & Fun Metaphor Reassurance:
 *   - Fun Metaphor card ("ภาพจำช่วยจำสนุกๆ 🎢")
 *   - Reassurance card ("เคล็ดลับคลายกังวล 💖")
 *   - Audio pronunciation for tone rule example
 * - Interactive Pattern Cards with Native Voice Audio & Speed Toggle (1.0x / 0.75x)
 * - Mobile Touch Standards: Min 44px hitbox across all interactive controls (Apple HIG / WCAG)
 * - Anti-Race Concurrency Guard (monotonically increasing request IDs)
 * - Zero Memory Leak Teardown (cancels in-flight audio on unmount)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Volume2,
  Square,
  Gauge,
  BookOpen,
  Music,
  Heart,
  Sliders,
} from 'lucide-react';
import { GrammarBite as GrammarBiteData, GrammarPattern, ToneRule } from '../../types/lesson';
import { speak, stopSpeaking, playClick } from '../../engines/audio/audioEngine';

export interface GrammarBiteProps {
  /** Grammar Bite data payload conforming strictly to types/lesson.ts */
  grammarBite: GrammarBiteData;
  /** Optional Tone Rule & Reassurance data */
  toneRule?: ToneRule | null;
  /** Initial playback speed rate (default: 1.0) */
  defaultSpeed?: 1.0 | 0.75;
  /** Optional callback fired when a pattern audio is played */
  onPatternAudioPlay?: (patternIndex: number, text: string) => void;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
}

/**
 * Determines the category color theme of a Lego brick token.
 */
function getLegoTokenTheme(token: string): {
  bg: string;
  border: string;
  text: string;
  shadow: string;
} {
  const t = token.trim().toLowerCase();

  // Subject / Pronoun / Person tokens
  if (
    t.includes('สรรพนาม') ||
    t.includes('ชื่อ') ||
    t.includes('ประธาน') ||
    t.includes('你') ||
    t.includes('我') ||
    t.includes('您') ||
    t.includes('他') ||
    t.includes('她') ||
    t.includes('们') ||
    t.includes('คน')
  ) {
    return {
      bg: 'var(--color-ochre-surface, #FFFBEB)',
      border: '#FDE68A',
      text: 'var(--color-ochre, #D97706)',
      shadow: '#F59E0B',
    };
  }

  // Verb / Adjective / Greeting / Predicate tokens
  if (
    t.includes('好') ||
    t.includes('叫') ||
    t.includes('是') ||
    t.includes('认识') ||
    t.includes('กริยา') ||
    t.includes('ดี') ||
    t.includes('สวัสดี')
  ) {
    return {
      bg: 'var(--color-jade-surface, #ECFDF5)',
      border: '#A7F3D0',
      text: 'var(--color-jade-primary, #059669)',
      shadow: 'var(--color-jade-deep, #047857)',
    };
  }

  // Question / Modifier tokens
  if (t.includes('什么') || t.includes('哪') || t.includes('吗') || t.includes('?')) {
    return {
      bg: '#EFF6FF',
      border: '#BFDBFE',
      text: '#2563EB',
      shadow: '#3B82F6',
    };
  }

  // Default neutral token
  return {
    bg: '#F9FAFB',
    border: 'var(--border-subtle, #EAE5DE)',
    text: 'var(--text-ink-primary, #1C1E21)',
    shadow: 'var(--border-card, #E2DBD0)',
  };
}

/**
 * Visualizer for a Lego-style sentence formula string.
 * Example input: "你 (เธอ) + 好 (ดี) = 你好！" or "[สรรพนาม/ชื่อคน] + 好 = สวัสดีคนนั้น!"
 */
export const LegoFormulaVisualizer: React.FC<{ formula: string; compact?: boolean }> = ({
  formula,
  compact = false,
}) => {
  if (!formula || !formula.trim()) return null;

  // Split on '=' to isolate components from result
  const equalParts = formula.split('=');
  const leftSide = equalParts[0] || '';
  const rightSide = equalParts.length > 1 ? equalParts.slice(1).join('=').trim() : null;

  // Split left side on '+' to isolate Lego bricks
  const bricks = leftSide
    .split('+')
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div
      role="group"
      aria-label={`สูตรโครงสร้าง: ${formula}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: compact ? '4px' : '6px',
        padding: compact ? '2px 0' : '4px 0',
      }}
    >
      {bricks.map((brick, idx) => {
        const theme = getLegoTokenTheme(brick);
        return (
          <React.Fragment key={`${brick}-${idx}`}>
            {idx > 0 && (
              <span
                style={{
                  fontSize: compact ? '12px' : '14px',
                  fontWeight: 800,
                  color: 'var(--text-ink-muted, #9CA3AF)',
                  userSelect: 'none',
                  padding: '0 2px',
                }}
                aria-hidden="true"
              >
                +
              </span>
            )}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: theme.bg,
                color: theme.text,
                border: `1.5px solid ${theme.border}`,
                boxShadow: `0 2px 0 ${theme.shadow}`,
                borderRadius: '8px',
                padding: compact ? '3px 8px' : '6px 12px',
                fontSize: compact ? '12px' : '13px',
                fontWeight: 700,
                lineHeight: 1.3,
                wordBreak: 'break-word',
                transition: 'transform 0.1s ease',
              }}
            >
              {brick}
            </span>
          </React.Fragment>
        );
      })}

      {rightSide && (
        <>
          <span
            style={{
              fontSize: compact ? '13px' : '15px',
              fontWeight: 800,
              color: 'var(--color-jade-primary, #059669)',
              userSelect: 'none',
              padding: '0 2px',
            }}
            aria-hidden="true"
          >
            =
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'var(--color-jade-surface, #ECFDF5)',
              color: 'var(--color-jade-deep, #047857)',
              border: '1.5px solid #6EE7B7',
              boxShadow: '0 2px 0 #059669',
              borderRadius: '8px',
              padding: compact ? '4px 10px' : '6px 14px',
              fontSize: compact ? '13px' : '14px',
              fontWeight: 800,
              lineHeight: 1.3,
              wordBreak: 'break-word',
            }}
          >
            {rightSide}
          </span>
        </>
      )}
    </div>
  );
};

export const GrammarBite: React.FC<GrammarBiteProps> = ({
  grammarBite,
  toneRule,
  defaultSpeed = 1.0,
  onPatternAudioPlay,
  className = '',
  style,
}) => {
  const [speed, setSpeed] = useState<1.0 | 0.75>(defaultSpeed);
  const [playingIndex, setPlayingIndex] = useState<number | 'tone_rule' | null>(null);

  // Concurrency & Teardown safety refs
  const isMountedRef = useRef<boolean>(true);
  const activeRequestIdRef = useRef<number>(0);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      stopSpeaking();
    };
  }, []);

  /**
   * Toggles audio playback speed between 1.0x (normal) and 0.75x (slow).
   */
  const handleToggleSpeed = useCallback(() => {
    playClick();
    setSpeed((prev) => (prev === 1.0 ? 0.75 : 1.0));
  }, []);

  /**
   * Plays speech for a given pattern or tone example with full interruption guard.
   */
  const handlePlayAudio = useCallback(
    async (textToSpeak: string, sourceIndex: number | 'tone_rule') => {
      playClick();

      // If user taps the currently playing audio, stop it
      if (playingIndex === sourceIndex) {
        stopSpeaking();
        if (isMountedRef.current) {
          setPlayingIndex(null);
        }
        return;
      }

      const requestId = ++activeRequestIdRef.current;
      stopSpeaking();

      if (isMountedRef.current) {
        setPlayingIndex(sourceIndex);
      }

      if (typeof sourceIndex === 'number') {
        onPatternAudioPlay?.(sourceIndex, textToSpeak);
      }

      try {
        await speak(textToSpeak, {
          rate: speed,
          onStart: () => {
            if (isMountedRef.current && activeRequestIdRef.current === requestId) {
              setPlayingIndex(sourceIndex);
            }
          },
          onEnd: () => {
            if (isMountedRef.current && activeRequestIdRef.current === requestId) {
              setPlayingIndex(null);
            }
          },
          onError: () => {
            if (isMountedRef.current && activeRequestIdRef.current === requestId) {
              setPlayingIndex(null);
            }
          },
        });
      } catch {
        if (isMountedRef.current && activeRequestIdRef.current === requestId) {
          setPlayingIndex(null);
        }
      }
    },
    [playingIndex, speed, onPatternAudioPlay]
  );

  /**
   * Helper to extract clean Chinese characters or pinyin from a tone rule example.
   * e.g. "你 (nǐ) + 好 (hǎo) ➔ อ่านออกเสียงจริงว่า 'ní hǎo'" -> "ní hǎo" or "你好"
   */
  const extractToneAudioTarget = (example: string): string => {
    const quoteMatch = example.match(/['"](.*?)['"]/);
    if (quoteMatch && quoteMatch[1]) {
      return quoteMatch[1];
    }
    const cleanChinese = example.replace(/[^\u4e00-\u9fa5]/g, '');
    return cleanChinese || '你好';
  };

  return (
    <article
      role="region"
      aria-label="การ์ดสรุปไวยากรณ์และกฎเสียง 1 นาที"
      className={`grammar-bite-card ${className}`}
      style={{
        backgroundColor: 'var(--bg-card, #FFFFFF)',
        borderRadius: 'var(--radius-lg, 24px)',
        padding: '20px 16px',
        boxShadow: 'var(--shadow-card, 0 8px 28px -4px rgba(44, 34, 20, 0.05))',
        border: '1px solid var(--border-card, #E2DBD0)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* 1. Header Bar: Pill Badge & Speed Toggle */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--color-ochre-surface, #FFFBEB)',
            color: 'var(--color-ochre, #D97706)',
            border: '1px solid #FDE68A',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full, 9999px)',
            fontSize: '12px',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          <Sparkles size={14} color="var(--color-ochre, #D97706)" />
          <span>ไวยากรณ์ 1 นาที (Grammar Bite)</span>
        </div>

        {/* Playback Speed Controller (Strict >= 44px touch target) */}
        <button
          type="button"
          onClick={handleToggleSpeed}
          aria-label={`ความเร็วเสียง: ปัจจุบัน ${speed}x`}
          className="btn-tactile-secondary"
          style={{
            minHeight: '44px',
            minWidth: '44px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-full, 9999px)',
            fontSize: '12px',
            fontWeight: 700,
            gap: '5px',
            color: speed === 0.75 ? 'var(--color-ochre, #D97706)' : 'var(--text-ink-primary, #1C1E21)',
            borderColor: speed === 0.75 ? '#FDE68A' : 'var(--border-card, #E2DBD0)',
            backgroundColor: speed === 0.75 ? 'var(--color-ochre-surface, #FFFBEB)' : '#FFFFFF',
            cursor: 'pointer',
          }}
        >
          <Gauge size={15} />
          <span>{speed === 1.0 ? '1.0x' : '0.75x ช้า'}</span>
        </button>
      </header>

      {/* 2. Main Title & Lego Formula Header */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 800,
            color: 'var(--text-ink-primary, #1C1E21)',
            lineHeight: 1.35,
            margin: 0,
            wordBreak: 'break-word',
          }}
        >
          {grammarBite.title}
        </h3>

        {/* Visual Lego Formula Header if title contains '+' or '=' */}
        {(grammarBite.title.includes('+') || grammarBite.title.includes('=')) && (
          <div
            style={{
              padding: '8px 10px',
              backgroundColor: 'var(--bg-rice-paper, #FBF9F5)',
              borderRadius: 'var(--radius-md, 16px)',
              border: '1px dashed var(--border-subtle, #EAE5DE)',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-ink-muted, #9CA3AF)',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              🧩 สูตรประโยคสำเร็จรูป
            </div>
            <LegoFormulaVisualizer formula={grammarBite.title.replace(/^สูตรสำเร็จรูป:\s*/, '')} />
          </div>
        )}

        {/* Thai Explanation Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            backgroundColor: 'var(--bg-rice-paper, #FBF9F5)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md, 16px)',
            border: '1px solid var(--border-subtle, #EAE5DE)',
            fontSize: '13.5px',
            lineHeight: 1.55,
            color: 'var(--text-ink-secondary, #525866)',
          }}
        >
          <BookOpen
            size={16}
            color="var(--color-jade-primary, #059669)"
            style={{ flexShrink: 0, marginTop: '2px' }}
          />
          <p style={{ margin: 0, wordBreak: 'break-word' }}>{grammarBite.explanation_th}</p>
        </div>
      </section>

      {/* 3. Tone Sandhi & Reassurance Card (Conditional on toneRule) */}
      {toneRule && (
        <section
          role="region"
          aria-label={toneRule.rule_name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '14px 12px',
            backgroundColor: '#FFFDF9',
            borderRadius: 'var(--radius-md, 16px)',
            border: '1.5px solid #FDE68A',
            boxShadow: '0 2px 10px rgba(217, 119, 6, 0.04)',
          }}
        >
          {/* Tone Rule Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-ochre-surface, #FFFBEB)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-ochre, #D97706)',
                  flexShrink: 0,
                }}
              >
                <Music size={14} />
              </div>
              <h4
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: 'var(--color-ochre, #D97706)',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {toneRule.rule_name}
              </h4>
            </div>

            {/* Audio Button for Tone Rule Example (>= 44px touch target) */}
            <button
              type="button"
              onClick={() => handlePlayAudio(extractToneAudioTarget(toneRule.example), 'tone_rule')}
              aria-label={`ฟังเสียงตัวอย่างกฎการผันเสียง: ${toneRule.example}`}
              className="btn-tactile-secondary"
              style={{
                minHeight: '44px',
                minWidth: '44px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-full, 9999px)',
                backgroundColor:
                  playingIndex === 'tone_rule' ? 'var(--color-ochre, #D97706)' : '#FFFFFF',
                color: playingIndex === 'tone_rule' ? '#FFFFFF' : 'var(--color-ochre, #D97706)',
                borderColor: '#FDE68A',
                fontSize: '12px',
                fontWeight: 700,
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              {playingIndex === 'tone_rule' ? (
                <>
                  <Square size={14} fill="currentColor" />
                  <span>หยุด</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  <span>ฟังเสียง</span>
                </>
              )}
            </button>
          </div>

          {/* Tone Rule Description & Example */}
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'var(--text-ink-primary, #1C1E21)',
              margin: 0,
            }}
          >
            {toneRule.description_th}
          </p>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm, 10px)',
              border: '1px solid var(--border-subtle, #EAE5DE)',
              fontSize: '12.5px',
              color: 'var(--text-ink-secondary, #525866)',
              fontWeight: 600,
              wordBreak: 'break-word',
            }}
          >
            📌 <strong>ตัวอย่าง:</strong> {toneRule.example}
          </div>

          {/* Fun Metaphor Card 🎢 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              backgroundColor: 'var(--color-ochre-surface, #FFFBEB)',
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm, 10px)',
              border: '1px dashed #FCD34D',
              fontSize: '12.5px',
              lineHeight: 1.5,
              color: '#92400E',
            }}
          >
            <span style={{ fontSize: '18px', flexShrink: 0, userSelect: 'none' }}>🎢</span>
            <div style={{ wordBreak: 'break-word' }}>
              <strong>ภาพจำช่วยจำสนุกๆ:</strong> {toneRule.fun_metaphor}
            </div>
          </div>

          {/* Reassurance Card 💖 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              backgroundColor: 'var(--color-vermilion-surface, #FEF2F2)',
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm, 10px)',
              border: '1px solid #FECACA',
              fontSize: '12.5px',
              lineHeight: 1.5,
              color: '#991B1B',
            }}
          >
            <Heart
              size={16}
              color="var(--color-vermilion, #DC2626)"
              fill="var(--color-vermilion, #DC2626)"
              style={{ flexShrink: 0, marginTop: '2px' }}
            />
            <div style={{ wordBreak: 'break-word', fontWeight: 600 }}>
              {toneRule.reassurance}
            </div>
          </div>
        </section>
      )}

      {/* 4. Interactive Sentence Pattern Cards */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders size={14} color="var(--color-jade-primary, #059669)" />
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-ink-secondary, #525866)',
              }}
            >
              ตัวอย่างประโยคตามสูตร ({grammarBite.patterns.length})
            </span>
          </div>
        </div>

        {/* Pattern Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          {grammarBite.patterns.map((pattern: GrammarPattern, idx: number) => {
            const isThisPlaying = playingIndex === idx;

            return (
              <div
                key={`${pattern.zh}-${idx}`}
                style={{
                  backgroundColor: isThisPlaying
                    ? 'var(--color-jade-surface, #ECFDF5)'
                    : '#FFFFFF',
                  borderRadius: 'var(--radius-md, 16px)',
                  border: '1.5px solid',
                  borderColor: isThisPlaying
                    ? 'var(--color-jade-primary, #059669)'
                    : 'var(--border-subtle, #EAE5DE)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: isThisPlaying
                    ? '0 4px 14px rgba(5, 150, 105, 0.12)'
                    : 'var(--shadow-sm, 0 1px 3px rgba(28, 30, 33, 0.04))',
                  transition: 'all 0.15s ease',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Pattern Lego Formula Breakdown */}
                {pattern.formula && (
                  <LegoFormulaVisualizer formula={pattern.formula} compact />
                )}

                {/* Main Phrase Row: Hanzi, Pinyin & Audio Button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginTop: '2px',
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        fontFamily: 'var(--font-hanzi-card, "Noto Sans SC", sans-serif)',
                        color: isThisPlaying
                          ? 'var(--color-jade-primary, #059669)'
                          : 'var(--text-ink-primary, #1C1E21)',
                        lineHeight: 1.2,
                        wordBreak: 'break-word',
                      }}
                    >
                      {pattern.zh}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-ochre, #D97706)',
                        marginTop: '2px',
                        wordBreak: 'break-word',
                      }}
                    >
                      {pattern.pinyin}
                    </div>
                  </div>

                  {/* Audio Playback Button (Strict >= 44px touch target) */}
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(pattern.zh, idx)}
                    aria-label={`ฟังเสียงประโยค ${pattern.zh}`}
                    className="btn-tactile-secondary"
                    style={{
                      minHeight: '44px',
                      minWidth: '44px',
                      padding: '10px',
                      borderRadius: 'var(--radius-full, 9999px)',
                      backgroundColor: isThisPlaying
                        ? 'var(--color-jade-primary, #059669)'
                        : 'var(--color-jade-surface, #ECFDF5)',
                      color: isThisPlaying ? '#FFFFFF' : 'var(--color-jade-primary, #059669)',
                      borderColor: isThisPlaying
                        ? 'var(--color-jade-deep, #047857)'
                        : '#A7F3D0',
                      flexShrink: 0,
                      cursor: 'pointer',
                      boxShadow: isThisPlaying
                        ? '0 3px 0 var(--color-jade-deep, #047857)'
                        : '0 2px 0 #A7F3D0',
                    }}
                  >
                    {isThisPlaying ? (
                      <Square size={16} fill="currentColor" />
                    ) : (
                      <Volume2 size={18} />
                    )}
                  </button>
                </div>

                {/* Translations: Thai & English */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    paddingTop: '6px',
                    borderTop: '1px dashed var(--border-subtle, #EAE5DE)',
                    fontSize: '13px',
                    lineHeight: 1.4,
                  }}
                >
                  <div
                    style={{
                      color: 'var(--text-ink-primary, #1C1E21)',
                      fontWeight: 600,
                      wordBreak: 'break-word',
                    }}
                  >
                    🇹🇭 {pattern.th}
                  </div>
                  {pattern.en && (
                    <div
                      style={{
                        color: 'var(--text-ink-muted, #9CA3AF)',
                        fontSize: '12px',
                        fontWeight: 500,
                        wordBreak: 'break-word',
                      }}
                    >
                      🇬🇧 {pattern.en}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
};

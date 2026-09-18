/**
 * src/components/lesson/DialoguePlayer.tsx
 * ------------------------------------------------
 * Interactive Dialogue Player Component (UX Golden Template).
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Pure Presentation & Resilient Audio Orchestration
 * - Strict TypeScript: Zero 'any'
 * - Mobile-First 320px+ Touch Ergonomics (Min 44px hitbox across all controls)
 * - Valid W3C ARIA Hierarchy (zero nested role="button" inside interactive controls)
 * - 3-Tier Scaffolding: Full (Hanzi+Pinyin+TH/EN), Pinyin Only, Hanzi Only
 * - Tap-to-Peek mechanics for masked translations/pinyin
 * - Sequential Playback ("Play All") with natural inter-line pause (~500ms)
 * - Single-Line on-demand tap playback with instant speech interruption
 * - Hardened Concurrency & Session Guards (monotonically increasing request IDs)
 * - Zero Memory Leak Teardown (resolves pending delay promises on cancel/unmount)
 * - Prop synchronization guard on dialogue changes
 * - Visual Karaoke Active Highlight with acoustic breathing ripple & animated soundwaves
 * - Speed Toggle: 1.0x (normal) / 0.75x (slow)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Square,
  Volume2,
  Gauge,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { DialogueLine } from '../../types/lesson';
import {
  speak,
  stopSpeaking,
  playClick,
  unlockAudioContext,
  hasChineseVoice,
  onVoicesChanged,
} from '../../engines/audio/audioEngine';

export type ScaffoldingMode = 'full' | 'pinyin_only' | 'hanzi_only';

export interface DialoguePlayerProps {
  /** Array of dialogue lines conforming strictly to types/lesson.ts */
  dialogue: DialogueLine[];
  /** Optional title for dialogue scenario */
  title?: string;
  /** Initial scaffolding mode (default: 'full') */
  initialScaffolding?: ScaffoldingMode;
  /** Initial playback speed rate (default: 1.0) */
  defaultSpeed?: 1.0 | 0.75;
  /** Auto-start playback on mount (default: false) */
  autoPlay?: boolean;
  /** Callback fired when the active line changes */
  onLineChange?: (lineIndex: number) => void;
  /** Callback fired when sequential playback reaches the end */
  onPlaybackComplete?: () => void;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
}

/**
 * Extracts a friendly avatar emoji / badge based on speaker name or identifier.
 */
function getSpeakerAvatar(speaker: 'A' | 'B' | 'C', speakerName: string): string {
  const lowerName = speakerName.toLowerCase();
  if (lowerName.includes('🐰') || lowerName.includes('tutu') || lowerName.includes('ทู่ทู่')) {
    return '🐰';
  }
  if (lowerName.includes('🧒') || lowerName.includes('somchai') || lowerName.includes('สมชาย')) {
    return '🧒';
  }
  if (lowerName.includes('林') || lowerName.includes('wang')) {
    return '👩‍💼';
  }
  if (lowerName.includes('李') || lowerName.includes('li')) {
    return '👨‍💼';
  }
  if (speaker === 'A') return '🐰';
  if (speaker === 'B') return '🧒';
  return '💬';
}

export const DialoguePlayer: React.FC<DialoguePlayerProps> = ({
  dialogue,
  title = 'บทสนทนาจำลองสถานการณ์จริง',
  initialScaffolding = 'full',
  defaultSpeed = 1.0,
  autoPlay = false,
  onLineChange,
  onPlaybackComplete,
  className = '',
  style,
}) => {
  // Scaffolding & Audio Controls State
  const [scaffolding, setScaffolding] = useState<ScaffoldingMode>(initialScaffolding);
  const [speed, setSpeed] = useState<1.0 | 0.75>(defaultSpeed);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);

  // Voice Readiness & Notice State
  const [isVoiceReady, setIsVoiceReady] = useState<boolean>(() => hasChineseVoice());
  const [dismissVoiceWarning, setDismissVoiceWarning] = useState<boolean>(false);

  // Set of line indices that are currently "peeked" by the learner
  const [peekedLines, setPeekedLines] = useState<Set<number>>(new Set());

  // Ref guards for timeouts, component mounting, and sequential state
  const isMountedRef = useRef<boolean>(true);
  const sequenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequenceTimerResolverRef = useRef<(() => void) | null>(null);
  const isPlayingAllRef = useRef<boolean>(false);
  const speedRef = useRef<1.0 | 0.75>(speed);
  const activePlayRequestIdRef = useRef<number>(0);

  // Synchronize live voices availability
  useEffect(() => {
    setIsVoiceReady(hasChineseVoice());
    const unsub = onVoicesChanged(() => {
      if (isMountedRef.current) {
        setIsVoiceReady(hasChineseVoice());
      }
    });
    return unsub;
  }, []);

  // Synchronize refs with live state
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    isPlayingAllRef.current = isPlayingAll;
  }, [isPlayingAll]);

  // Clear any scheduled sequential advancement timer and safely unblock pending promise (VULN-03)
  const clearSequenceTimer = useCallback(() => {
    if (sequenceTimerRef.current) {
      clearTimeout(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
    if (sequenceTimerResolverRef.current) {
      sequenceTimerResolverRef.current();
      sequenceTimerResolverRef.current = null;
    }
  }, []);

  // Safe speech cancellation
  const cancelAllAudio = useCallback(() => {
    clearSequenceTimer();
    stopSpeaking();
  }, [clearSequenceTimer]);

  // Guard against dialogue prop mutations (VULN-04)
  useEffect(() => {
    cancelAllAudio();
    setActiveLineIndex(null);
    setIsPlayingAll(false);
    isPlayingAllRef.current = false;
    setPeekedLines(new Set());
  }, [dialogue, cancelAllAudio]);

  /**
   * Speaks a single dialogue line given its index.
   * Resolves when speech completes (or errors/cancelled).
   */
  const speakLine = useCallback(
    async (index: number): Promise<void> => {
      const line = dialogue[index];
      if (!line) return;

      if (!isMountedRef.current) return;

      setActiveLineIndex(index);
      onLineChange?.(index);

      return speak(line.zh, {
        rate: speedRef.current,
        onEnd: () => {
          if (!isMountedRef.current) return;
        },
        onError: (err) => {
          if (!isMountedRef.current) return;
          console.warn(`[DialoguePlayer] Audio playback notice for line ${index}:`, err);
        },
      });
    },
    [dialogue, onLineChange]
  );

  /**
   * Starts sequential playback from a given line index.
   */
  const runSequenceFromIndex = useCallback(
    async (startIndex: number) => {
      // Prevent parallel loop collision (VULN-02)
      if (isPlayingAllRef.current) {
        return;
      }

      const sequenceId = ++activePlayRequestIdRef.current;
      clearSequenceTimer();
      stopSpeaking();

      setIsPlayingAll(true);
      isPlayingAllRef.current = true;

      for (let i = startIndex; i < dialogue.length; i++) {
        if (
          !isMountedRef.current ||
          !isPlayingAllRef.current ||
          activePlayRequestIdRef.current !== sequenceId
        ) {
          break;
        }

        await speakLine(i);

        if (
          !isMountedRef.current ||
          !isPlayingAllRef.current ||
          activePlayRequestIdRef.current !== sequenceId
        ) {
          break;
        }

        // Natural pause between lines (~500ms) with clean resolver leak prevention (VULN-03)
        if (i < dialogue.length - 1) {
          await new Promise<void>((resolve) => {
            sequenceTimerResolverRef.current = resolve;
            sequenceTimerRef.current = setTimeout(() => {
              sequenceTimerResolverRef.current = null;
              sequenceTimerRef.current = null;
              resolve();
            }, 500);
          });
        }
      }

      if (
        isMountedRef.current &&
        isPlayingAllRef.current &&
        activePlayRequestIdRef.current === sequenceId
      ) {
        setIsPlayingAll(false);
        isPlayingAllRef.current = false;
        setActiveLineIndex(null);
        onPlaybackComplete?.();
      }
    },
    [dialogue.length, clearSequenceTimer, speakLine, onPlaybackComplete]
  );

  /**
   * Plays all lines sequentially starting from line 0.
   */
  const handlePlayAll = useCallback(async () => {
    playClick();
    unlockAudioContext();
    // Use live ref instead of stale state closure (VULN-02)
    if (isPlayingAllRef.current) {
      // Pause / Stop sequential playback
      cancelAllAudio();
      setIsPlayingAll(false);
      isPlayingAllRef.current = false;
      setActiveLineIndex(null);
    } else {
      runSequenceFromIndex(0);
    }
  }, [cancelAllAudio, runSequenceFromIndex]);

  /**
   * Plays a single line when user taps a speech bubble or play button.
   */
  const handlePlaySingleLine = useCallback(
    async (index: number) => {
      playClick();
      unlockAudioContext();
      const requestId = ++activePlayRequestIdRef.current;

      // Halt any running sequential autoplay immediately
      if (isPlayingAllRef.current) {
        isPlayingAllRef.current = false;
        setIsPlayingAll(false);
        clearSequenceTimer();
      }

      await speakLine(index);

      // Only clear highlight if this request is still the active one (VULN-01)
      if (
        isMountedRef.current &&
        !isPlayingAllRef.current &&
        activePlayRequestIdRef.current === requestId
      ) {
        setActiveLineIndex(null);
      }
    },
    [clearSequenceTimer, speakLine]
  );

  /**
   * Toggles "Peek" mode for a specific line in hidden scaffolding modes.
   */
  const togglePeekLine = useCallback((index: number) => {
    playClick();
    setPeekedLines((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  /**
   * Toggles playback speed between 1.0x and 0.75x.
   */
  const handleToggleSpeed = useCallback(() => {
    playClick();
    setSpeed((prev) => (prev === 1.0 ? 0.75 : 1.0));
  }, []);

  /**
   * Switches scaffolding mode and resets peeked state.
   */
  const handleSelectScaffolding = useCallback((mode: ScaffoldingMode) => {
    playClick();
    setScaffolding(mode);
    setPeekedLines(new Set());
  }, []);

  // Autoplay on mount support
  useEffect(() => {
    if (autoPlay && dialogue.length > 0) {
      runSequenceFromIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Teardown on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      isPlayingAllRef.current = false;
      clearSequenceTimer();
      stopSpeaking();
    };
  }, [clearSequenceTimer]);

  return (
    <div
      className={`dialogue-player-container ${className}`}
      role="region"
      aria-label="เครื่องเล่นบทสนทนาจำลอง"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
        boxSizing: 'border-box',
        gap: '14px',
        ...style,
      }}
    >
      {/* Header & Controls Panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--border-card)',
          boxShadow: 'var(--shadow-card)',
          padding: '14px',
          gap: '12px',
        }}
      >
        {/* Title bar - with 320px flex blowout guard (VULN-07) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                minWidth: '34px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-jade-surface)',
                color: 'var(--color-jade-primary)',
                flexShrink: 0,
              }}
            >
              <MessageCircle size={18} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--text-ink-primary)',
                  margin: 0,
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {title}
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--text-ink-secondary)',
                  fontWeight: 500,
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {dialogue.length} ประโยคสนทนา
              </span>
            </div>
          </div>

          {/* Speed Toggle Button (VULN-05: Strict 44px min touch target) */}
          <button
            type="button"
            onClick={handleToggleSpeed}
            aria-label={`ความเร็วเสียง: ปัจจุบัน ${speed}x`}
            className="btn-tactile-secondary"
            style={{
              padding: '8px 12px',
              minHeight: '44px',
              minWidth: '44px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 700,
              gap: '4px',
              flexShrink: 0,
              color: speed === 0.75 ? 'var(--color-ochre)' : 'var(--text-ink-primary)',
              borderColor: speed === 0.75 ? '#FDE68A' : 'var(--border-card)',
              backgroundColor: speed === 0.75 ? 'var(--color-ochre-surface)' : '#FFFFFF',
            }}
          >
            <Gauge size={14} />
            <span>{speed === 1.0 ? '1.0x' : '0.75x ช้า'}</span>
          </button>
        </div>

        {/* 3-Tier Scaffolding Switcher (VULN-05: 44px accessible touch target) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-card-subtle)',
            padding: '3px',
            borderRadius: 'var(--radius-full)',
            gap: '2px',
          }}
          role="tablist"
          aria-label="ระดับการแสดงผลบทเรียน"
        >
          <button
            type="button"
            role="tab"
            aria-selected={scaffolding === 'full'}
            onClick={() => handleSelectScaffolding('full')}
            style={{
              flex: 1,
              minHeight: '44px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: scaffolding === 'full' ? '#FFFFFF' : 'transparent',
              color: scaffolding === 'full' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
              boxShadow: scaffolding === 'full' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            เต็มรูปแบบ
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={scaffolding === 'pinyin_only'}
            onClick={() => handleSelectScaffolding('pinyin_only')}
            style={{
              flex: 1,
              minHeight: '44px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: scaffolding === 'pinyin_only' ? '#FFFFFF' : 'transparent',
              color: scaffolding === 'pinyin_only' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
              boxShadow: scaffolding === 'pinyin_only' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            พินอิน
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={scaffolding === 'hanzi_only'}
            onClick={() => handleSelectScaffolding('hanzi_only')}
            style={{
              flex: 1,
              minHeight: '44px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: scaffolding === 'hanzi_only' ? '#FFFFFF' : 'transparent',
              color: scaffolding === 'hanzi_only' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
              boxShadow: scaffolding === 'hanzi_only' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            จีนล้วน
          </button>
        </div>

        {/* Scaffolding Hint Notice */}
        {scaffolding !== 'full' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: 'var(--text-ink-muted)',
              padding: '0 4px',
            }}
          >
            <Sparkles size={12} color="var(--color-ochre)" />
            <span>
              {scaffolding === 'pinyin_only'
                ? 'โหมดพินอิน: ซ่อนคำแปลไว้ แตะที่ปุ่มแอบดูเพื่อดูเฉลยได้นะ!'
                : 'โหมดจีนล้วน: ซ่อนพินอินและคำแปล แตะที่ปุ่มแอบดูได้จ้า!'}
            </span>
          </div>
        )}

        {/* Voice Readiness Info Banner (shown when browser uses high-quality Online Audio Stream or local audio) */}
        {!isVoiceReady && !dismissVoiceWarning && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              color: 'var(--color-jade-primary)',
              fontSize: '12.5px',
              lineHeight: 1.4,
            }}
            role="status"
            aria-live="polite"
          >
            <Sparkles size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-jade-primary)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, marginBottom: '2px', color: 'var(--color-jade-primary)' }}>
                ✨ กำลังใช้ระบบเสียงออนไลน์ความคมชัดสูง (Online HD Audio)
              </div>
              <div style={{ color: 'var(--text-ink-secondary)', fontSize: '11.5px' }}>
                เบราว์เซอร์นี้ไม่มีเสียงภาษาจีนในเครื่อง ระบบจึงสตรีมเสียงออกเสียงมาตรฐานให้โดยอัตโนมัติ (หากต้องการใช้งานออฟไลน์ แนะนำเปิดด้วย Microsoft Edge หรือติดตั้ง Chinese Speech Pack ใน Windows)
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDismissVoiceWarning(true)}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'var(--text-ink-muted)',
                cursor: 'pointer',
                padding: '2px 6px',
                fontSize: '13px',
                fontWeight: 700,
                lineHeight: 1,
              }}
              aria-label="ปิดการแจ้งเตือนเสียง"
            >
              ✕
            </button>
          </div>
        )}

        {/* Master Playback Action Bar */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handlePlayAll}
            className={isPlayingAll ? 'btn-tactile-secondary' : 'btn-tactile-primary'}
            aria-label={isPlayingAll ? 'หยุดเล่นบทสนทนา' : 'เล่นบทสนทนาทั้งหมดตั้งแต่ต้น'}
            style={{
              flex: 1,
              minHeight: '44px',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {isPlayingAll ? (
              <>
                <Square size={16} fill="currentColor" />
                <span>หยุดเล่นบทสนทนา</span>
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                <span>ฟังบทสนทนาทั้งหมด</span>
              </>
            )}
          </button>

          {activeLineIndex !== null && !isPlayingAll && (
            <button
              type="button"
              onClick={cancelAllAudio}
              className="btn-tactile-secondary"
              aria-label="หยุดเสียง"
              style={{
                minHeight: '44px',
                minWidth: '44px',
                padding: '0 12px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Dialogue Chat Stream */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '4px 0',
        }}
        role="list"
        aria-label="รายการประโยคสนทนา"
      >
        {dialogue.map((line, index) => {
          const isSpeakerA = line.speaker === 'A';
          const isCurrentActive = activeLineIndex === index;
          const isPeeked = peekedLines.has(index);

          // Visibility determination based on scaffolding and peek
          const showPinyin = scaffolding !== 'hanzi_only' || isPeeked;
          const showTranslation = scaffolding === 'full' || isPeeked;

          const avatarEmoji = getSpeakerAvatar(line.speaker, line.speaker_name);

          return (
            <div
              key={`${index}-${line.zh}`}
              role="listitem"
              className={`dialogue-bubble-row ${isSpeakerA ? 'speaker-a' : 'speaker-b'}`}
              style={{
                display: 'flex',
                width: '100%',
                marginBottom: '14px',
                gap: '8px',
                alignItems: 'flex-start',
                flexDirection: isSpeakerA ? 'row' : 'row-reverse',
              }}
            >
              {/* Speaker Avatar Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  minWidth: '38px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isSpeakerA ? '#F5EBE1' : 'var(--color-jade-surface)',
                  border: isSpeakerA ? '1.5px solid #E5DACB' : '1.5px solid #A7F3D0',
                  fontSize: '18px',
                  boxShadow: 'var(--shadow-sm)',
                  marginTop: '18px',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                {avatarEmoji}
              </div>

              {/* Bubble & Speaker Meta Container */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isSpeakerA ? 'flex-start' : 'flex-end',
                  maxWidth: 'calc(100% - 46px)',
                }}
              >
                {/* Speaker Name Tag */}
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--text-ink-secondary)',
                    marginBottom: '4px',
                    padding: '0 4px',
                  }}
                >
                  {line.speaker_name}
                </span>

                {/* Speech Bubble Container (VULN-06: Clean presentation container, zero invalid nested ARIA) */}
                <div
                  className={`dialogue-bubble ${isSpeakerA ? 'speaker-a' : 'speaker-b'} ${
                    isCurrentActive ? 'is-active acoustic-card-active' : ''
                  }`}
                  style={{
                    borderRadius: '16px',
                    padding: '12px 14px',
                    position: 'relative',
                    width: '100%',
                    boxSizing: 'border-box',
                    backgroundColor: isCurrentActive
                      ? isSpeakerA
                        ? '#FFFFFF'
                        : '#E6FAF0'
                      : isSpeakerA
                      ? 'var(--bg-card-subtle)'
                      : 'var(--color-jade-surface)',
                    border: isCurrentActive
                      ? '2px solid var(--color-jade-primary)'
                      : isSpeakerA
                      ? '1.5px solid var(--border-subtle)'
                      : '1.5px solid #A7F3D0',
                  }}
                  onClick={() => {
                    if (scaffolding !== 'full' && !isCurrentActive) {
                      togglePeekLine(index);
                    } else {
                      handlePlaySingleLine(index);
                    }
                  }}
                >
                  {/* Chinese Text (Large & Clear) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-hanzi-hero)',
                        fontSize: '22px',
                        fontWeight: 700,
                        color: 'var(--text-ink-primary)',
                        lineHeight: 1.3,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {line.zh}
                    </span>

                    {/* Audio Status & Single-Line Trigger Button (44px min hitbox) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlaySingleLine(index);
                      }}
                      aria-label={`ฟังเสียงประโยค: ${line.zh}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '44px',
                        height: '44px',
                        minWidth: '44px',
                        minHeight: '44px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isCurrentActive
                          ? 'var(--color-jade-primary)'
                          : 'rgba(255, 255, 255, 0.8)',
                        color: isCurrentActive ? '#FFFFFF' : 'var(--color-jade-primary)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        margin: '-8px -6px -8px 0',
                        flexShrink: 0,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isCurrentActive ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                            height: '16px',
                          }}
                          aria-label="กำลังออกเสียง"
                        >
                          <span
                            className="sound-wave-bar"
                            style={{ backgroundColor: '#FFFFFF' }}
                          />
                          <span
                            className="sound-wave-bar"
                            style={{ backgroundColor: '#FFFFFF' }}
                          />
                          <span
                            className="sound-wave-bar"
                            style={{ backgroundColor: '#FFFFFF' }}
                          />
                        </div>
                      ) : (
                        <Volume2 size={18} />
                      )}
                    </button>
                  </div>

                  {/* Pinyin Reading */}
                  {showPinyin ? (
                    <div
                      style={{
                        fontSize: '14px',
                        fontFamily: 'var(--font-latin)',
                        fontWeight: 600,
                        color:
                          isPeeked && scaffolding === 'hanzi_only'
                            ? 'var(--color-jade-primary)'
                            : 'var(--color-jade-deep)',
                        marginTop: '2px',
                        lineHeight: 1.4,
                      }}
                    >
                      {line.pinyin}
                      {isPeeked && scaffolding === 'hanzi_only' && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            marginLeft: '6px',
                            backgroundColor: 'var(--color-jade-surface)',
                            padding: '1px 5px',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          แอบดู 👀
                        </span>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: '4px',
                        fontSize: '11px',
                        color: 'var(--text-ink-muted)',
                        fontStyle: 'italic',
                      }}
                    >
                      [ซ่อนพินอิน — แตะเพื่อแอบดู]
                    </div>
                  )}

                  {/* Translations (Thai & English) */}
                  {showTranslation ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        marginTop: '6px',
                        paddingTop: '6px',
                        borderTop: '1px dashed rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {/* Thai Translation */}
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          color: 'var(--text-ink-primary)',
                          lineHeight: 1.35,
                        }}
                      >
                        {line.th}
                      </span>
                      {/* English Translation */}
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 400,
                          color: 'var(--text-ink-secondary)',
                          lineHeight: 1.3,
                        }}
                      >
                        {line.en}
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: '4px',
                        fontSize: '11px',
                        color: 'var(--text-ink-muted)',
                        fontStyle: 'italic',
                      }}
                    >
                      [ซ่อนคำแปล — แตะเพื่อแอบดู]
                    </div>
                  )}

                  {/* Tap to Peek action button (VULN-05: 44px min touch target) */}
                  {scaffolding !== 'full' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePeekLine(index);
                      }}
                      aria-label={isPeeked ? 'ซ่อนคำแปล' : 'แอบดูคำอ่านและคำแปล'}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: isPeeked ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                        marginTop: '8px',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isPeeked ? 'var(--color-jade-surface)' : 'rgba(0,0,0,0.04)',
                        border: isPeeked ? '1px solid #A7F3D0' : '1px solid transparent',
                        minHeight: '44px',
                        boxSizing: 'border-box',
                      }}
                    >
                      {isPeeked ? <EyeOff size={14} /> : <Eye size={14} />}
                      <span>{isPeeked ? 'ซ่อนเฉลย' : 'แอบดูเฉลย'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

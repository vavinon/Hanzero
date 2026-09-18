/**
 * src/components/hanzi/HanziWriterBox.tsx
 * Interactive Chinese Character Stroke Engine & Handwriting Canvas.
 * Incorporates HanziWriter with 米字格 (Mǐzìgé) grid, audio feedback,
 * mobile touch trapping, and leak-free lifecycle cleanup.
 *
 * Strict TypeScript: Zero 'any'
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import HanziWriter, { StrokeData } from 'hanzi-writer';
import {
  Play,
  RotateCcw,
  Lightbulb,
  Eye,
  EyeOff,
  PenTool,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { MizigeGrid } from './MizigeGrid';
import {
  createCharDataLoader,
  sanitizeHanziChar,
  StrokeDataLoaderError,
} from '../../engines/hanzi/strokeDataLoader';
import {
  playClick,
  playCorrect,
  playIncorrect,
  playFanfare,
} from '../../engines/audio/audioEngine';

export type HanziWriterMode = 'animate' | 'quiz' | 'idle';

export interface HanziWriterBoxProps {
  /** The single Chinese character to render and practice */
  character: string;
  /** Size of the square canvas in pixels (default: 280) */
  size?: number;
  /** Initial mode on mount (default: 'idle') */
  initialMode?: HanziWriterMode;
  /** Whether to show ghost reference outline (default: true) */
  showOutline?: boolean;
  /** Called when the full character writing quiz is completed successfully */
  onComplete?: (summary: { character: string; totalMistakes: number }) => void;
  /** Called when a single stroke is drawn correctly */
  onCorrectStroke?: (strokeData: StrokeData) => void;
  /** Called when a mistake is made during handwriting */
  onMistake?: (strokeData: StrokeData) => void;
  /** Custom CSS class name */
  className?: string;
}

export const HanziWriterBox: React.FC<HanziWriterBoxProps> = ({
  character: rawCharacter,
  size = 280,
  initialMode = 'idle',
  showOutline: initialShowOutline = true,
  onComplete,
  onCorrectStroke,
  onMistake,
  className = '',
}) => {
  // Sanitize character safely
  let safeChar = '你';
  let charError: string | null = null;
  try {
    safeChar = sanitizeHanziChar(rawCharacter);
  } catch (err) {
    charError = err instanceof StrokeDataLoaderError ? err.message : 'Invalid character';
  }

  // State Management
  const [currentMode, setCurrentMode] = useState<HanziWriterMode>(initialMode);
  const [showOutline, setShowOutline] = useState<boolean>(initialShowOutline);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(charError);
  const [strokeCount, setStrokeCount] = useState<number>(0);
  const [currentStrokeNum, setCurrentStrokeNum] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [shakeKey, setShakeKey] = useState<number>(0);

  // DOM and Instance Refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const isMountedRef = useRef<boolean>(true);
  const requestIdRef = useRef<number>(0);

  // Teardown previous writer instance cleanly
  const teardownWriter = useCallback(() => {
    if (writerRef.current) {
      try {
        writerRef.current.cancelQuiz();
        writerRef.current.pauseAnimation();
      } catch {
        // Safe noop
      }
      writerRef.current = null;
    }
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  }, []);

  // Initialize HanziWriter instance
  useEffect(() => {
    isMountedRef.current = true;
    const currentRequestId = ++requestIdRef.current;

    if (charError || !containerRef.current) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);
    setIsCompleted(false);
    setMistakes(0);
    setCurrentStrokeNum(0);

    teardownWriter();

    const abortController = new AbortController();
    const loader = createCharDataLoader({ signal: abortController.signal });

    const writer = HanziWriter.create(containerRef.current, safeChar, {
      width: size,
      height: size,
      padding: Math.round(size * 0.08),
      showOutline,
      showCharacter: false,
      strokeColor: '#1C1E21', // Authentic Chinese Pine Soot Ink
      radicalColor: '#047857', // Jade radical highlight
      outlineColor: '#E8E1D5', // Faint watermark guide
      highlightColor: '#059669', // Imperial Jade active glow
      drawingColor: '#2C3038', // Calligraphy finger brush
      drawingWidth: Math.max(12, Math.round(size * 0.06)),
      strokeAnimationSpeed: 1.25,
      delayBetweenStrokes: 180,
      charDataLoader: loader,
      onLoadCharDataSuccess: (charData) => {
        if (!isMountedRef.current || currentRequestId !== requestIdRef.current) return;
        setIsLoading(false);
        setStrokeCount(charData.strokes.length);
        if (initialMode === 'animate') {
          writer.animateCharacter();
        } else if (initialMode === 'quiz') {
          startQuiz(writer);
        }
      },
      onLoadCharDataError: (err) => {
        if (!isMountedRef.current || currentRequestId !== requestIdRef.current) return;
        setIsLoading(false);
        const msg =
          err instanceof Error
            ? err.message
            : 'ไม่สามารถโหลดข้อมูลเส้นขีดได้ (กรุณาเชื่อมต่ออินเทอร์เน็ตครั้งแรก)';
        setLoadError(msg);
      },
    });

    writerRef.current = writer;

    return () => {
      isMountedRef.current = false;
      abortController.abort();
      teardownWriter();
    };
  }, [safeChar, size, charError, teardownWriter]);

  // Start Quiz implementation
  const startQuiz = (writerInstance?: HanziWriter) => {
    const writer = writerInstance ?? writerRef.current;
    if (!writer) return;

    try {
      writer.pauseAnimation();
      writer.cancelQuiz();
    } catch {
      // noop
    }

    setCurrentMode('quiz');
    setIsCompleted(false);
    setMistakes(0);
    setCurrentStrokeNum(0);

    writer.quiz({
      leniency: 1.15,
      showHintAfterMisses: 3,
      highlightOnComplete: true,
      onCorrectStroke: (strokeData: StrokeData) => {
        if (!isMountedRef.current) return;
        playCorrect();
        setCurrentStrokeNum(strokeData.strokeNum + 1);
        onCorrectStroke?.(strokeData);
      },
      onMistake: (strokeData: StrokeData) => {
        if (!isMountedRef.current) return;
        playIncorrect();
        setMistakes((prev) => prev + 1);
        setShakeKey((prev) => prev + 1);
        onMistake?.(strokeData);
      },
      onComplete: (summary: { character: string; totalMistakes: number }) => {
        if (!isMountedRef.current) return;
        playFanfare();
        setIsCompleted(true);
        setCurrentMode('idle');
        onComplete?.(summary);
      },
    });
  };

  // Actions
  const handlePlayAnimation = async () => {
    playClick();
    const writer = writerRef.current;
    if (!writer) return;

    try {
      writer.cancelQuiz();
    } catch {
      // noop
    }

    setCurrentMode('animate');
    setIsCompleted(false);
    setCurrentStrokeNum(0);

    try {
      await writer.animateCharacter({
        onComplete: () => {
          if (!isMountedRef.current) return;
          setCurrentMode('idle');
        },
      });
    } catch {
      if (isMountedRef.current) setCurrentMode('idle');
    }
  };

  const handleStartPractice = () => {
    playClick();
    startQuiz();
  };

  const handleReset = () => {
    playClick();
    const writer = writerRef.current;
    if (!writer) return;

    try {
      writer.cancelQuiz();
      writer.pauseAnimation();
      writer.hideCharacter();
    } catch {
      // noop
    }

    setCurrentMode('idle');
    setIsCompleted(false);
    setMistakes(0);
    setCurrentStrokeNum(0);
  };

  const handleHint = () => {
    playClick();
    const writer = writerRef.current;
    if (!writer) return;

    try {
      writer.highlightStroke(currentStrokeNum);
    } catch {
      // noop
    }
  };

  const handleToggleOutline = () => {
    playClick();
    const writer = writerRef.current;
    const nextOutline = !showOutline;
    setShowOutline(nextOutline);

    if (writer) {
      if (nextOutline) {
        writer.showOutline();
      } else {
        writer.hideOutline();
      }
    }
  };

  return (
    <div
      className={`hanzi-writer-box ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        maxWidth: `${size + 16}px`,
        margin: '0 auto',
      }}
    >
      {/* 1. Canvas HUD: Info Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '0 4px',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        {/* Stroke Progress Badge */}
        <div
          className="badge-capsule"
          style={{
            backgroundColor: 'var(--color-jade-surface)',
            color: 'var(--color-jade-primary)',
            padding: '4px 10px',
            fontSize: '12px',
          }}
        >
          <PenTool size={13} />
          <span>
            {strokeCount > 0
              ? `ขีดที่ ${Math.min(currentStrokeNum + 1, strokeCount)}/${strokeCount}`
              : `ตัวอักษร: ${safeChar}`}
          </span>
        </div>

        {/* Current State / Mistakes Badge */}
        {currentMode === 'quiz' && (
          <div
            className="badge-capsule"
            style={{
              backgroundColor: mistakes > 0 ? 'var(--color-ochre-surface)' : 'var(--bg-rice-paper)',
              color: mistakes > 0 ? 'var(--color-ochre)' : 'var(--text-ink-muted)',
              padding: '4px 10px',
              fontSize: '12px',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{mistakes > 0 ? `ผิด ${mistakes} ครั้ง` : 'กำลังฝึกเขียน...'}</span>
          </div>
        )}

        {isCompleted && (
          <div
            className="badge-capsule"
            style={{
              backgroundColor: 'var(--color-jade-surface)',
              color: 'var(--color-jade-primary)',
              padding: '4px 10px',
              fontSize: '12px',
            }}
          >
            <Sparkles size={13} />
            <span>เขียนสำเร็จ! +10 XP</span>
          </div>
        )}

        {currentMode === 'animate' && (
          <div
            className="badge-capsule"
            style={{
              backgroundColor: 'var(--bg-rice-paper)',
              color: 'var(--color-jade-primary)',
              padding: '4px 10px',
              fontSize: '12px',
            }}
          >
            <Play size={13} />
            <span>กำลังสาธิต...</span>
          </div>
        )}
      </div>

      {/* 2. Interactive Canvas in 米字格 (Mǐzìgé) Grid */}
      <div
        key={shakeKey}
        className={shakeKey > 0 ? 'hanzero-shake' : ''}
        style={{
          position: 'relative',
          width: `${size}px`,
          height: `${size}px`,
          touchAction: 'none',
        }}
      >
        <MizigeGrid size={size}>
          {/* HanziWriter Render Container */}
          <div
            ref={containerRef}
            style={{
              width: '100%',
              height: '100%',
              touchAction: 'none',
              cursor: currentMode === 'quiz' ? 'crosshair' : 'default',
            }}
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(253, 251, 247, 0.85)',
                backdropFilter: 'blur(2px)',
                zIndex: 10,
                gap: '8px',
                color: 'var(--text-ink-secondary)',
                fontSize: '13px',
              }}
            >
              <div className="spinner" />
              <span>กำลังเตรียมพู่กัน...</span>
            </div>
          )}

          {/* Fallback View (Offline or Error) */}
          {loadError && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(253, 251, 247, 0.95)',
                zIndex: 10,
                padding: '16px',
                textAlign: 'center',
                boxSizing: 'border-box',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: `${size * 0.45}px`,
                  fontFamily: 'var(--font-hanzi-hero)',
                  lineHeight: 1,
                  color: 'var(--text-ink-primary)',
                }}
              >
                {safeChar}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-ochre)', fontSize: '11px', fontWeight: 600 }}>
                <AlertCircle size={14} />
                <span>โหมดดูตัวอักษรแบบมาตรฐาน</span>
              </div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-ink-muted)' }}>
                {loadError}
              </p>
            </div>
          )}

          {/* Completed Celebration Overlay */}
          {isCompleted && (
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(4, 120, 87, 0.95)',
                color: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(4, 120, 87, 0.3)',
                animation: 'fade-in 0.3s ease',
                zIndex: 5,
                whiteSpace: 'nowrap',
              }}
            >
              <CheckCircle2 size={14} />
              <span>ยอดเยี่ยมมาก! เขียนถูกต้องครบถ้วน</span>
            </div>
          )}
        </MizigeGrid>
      </div>

      {/* 3. Tactile Action Dock (44px+ Touch Targets) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          width: '100%',
        }}
      >
        {/* Animate Button */}
        <button
          type="button"
          onClick={handlePlayAnimation}
          disabled={isLoading || !!loadError}
          className="btn-stroke-tactile"
          title="ดูตัวอย่างวิธีเขียน"
          style={{
            backgroundColor: currentMode === 'animate' ? 'var(--color-jade-surface)' : 'var(--bg-card)',
            color: currentMode === 'animate' ? 'var(--color-jade-primary)' : 'var(--text-ink-primary)',
            borderColor: currentMode === 'animate' ? 'var(--color-jade-primary)' : 'var(--border-subtle)',
          }}
        >
          <Play size={16} />
          <span>สาธิต</span>
        </button>

        {/* Practice/Quiz Button */}
        <button
          type="button"
          onClick={handleStartPractice}
          disabled={isLoading || !!loadError}
          className="btn-stroke-tactile"
          title="เริ่มฝึกเขียนด้วยตนเอง"
          style={{
            backgroundColor: currentMode === 'quiz' ? 'var(--color-jade-surface)' : 'var(--bg-card)',
            color: currentMode === 'quiz' ? 'var(--color-jade-primary)' : 'var(--color-jade-primary)',
            borderColor: currentMode === 'quiz' ? 'var(--color-jade-primary)' : 'var(--border-subtle)',
            fontWeight: 700,
          }}
        >
          <PenTool size={16} />
          <span>ฝึกเขียน</span>
        </button>

        {/* Hint Button */}
        <button
          type="button"
          onClick={handleHint}
          disabled={isLoading || !!loadError || currentMode !== 'quiz'}
          className="btn-stroke-tactile"
          title="แสดงเส้นบอกใบ้ขีดถัดไป"
          style={{
            backgroundColor: 'var(--bg-card)',
            color: currentMode === 'quiz' ? 'var(--color-ochre)' : 'var(--text-ink-muted)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <Lightbulb size={16} />
          <span>ชี้แนะ</span>
        </button>

        {/* Reset / Outline Toggle */}
        <button
          type="button"
          onClick={currentMode === 'idle' ? handleToggleOutline : handleReset}
          disabled={isLoading || !!loadError}
          className="btn-stroke-tactile"
          title={currentMode === 'idle' ? (showOutline ? 'ซ่อนเส้นไกด์' : 'แสดงเส้นไกด์') : 'ล้างกระดาน'}
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-ink-secondary)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          {currentMode !== 'idle' ? (
            <>
              <RotateCcw size={16} />
              <span>ล้าง</span>
            </>
          ) : showOutline ? (
            <>
              <EyeOff size={16} />
              <span>ซ่อนไกด์</span>
            </>
          ) : (
            <>
              <Eye size={16} />
              <span>เส้นไกด์</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

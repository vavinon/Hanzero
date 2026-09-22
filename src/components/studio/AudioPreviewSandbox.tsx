/**
 * src/components/studio/AudioPreviewSandbox.tsx
 * ---------------------------------------------------------------------------
 * In-Studio Audio Sandbox for Hanzero Content Authoring Studio (TASK-604).
 *
 * Provides curriculum authors with an immediate Chinese TTS voice sandbox:
 * 1. Mandarin Voice Detection (zh-CN) via Web Speech API.
 * 2. Dual Speed Rate toggle: 1.0x (normal native) / 0.75x (pedagogical slow).
 * 3. Real-time Tone Sandhi Inspector (e.g., 3+3 -> 2+3 detection).
 * 4. Quick Phrase Chips from draft vocabulary or common conversational presets.
 * 5. Audio Flooding & Preemption Guard using studioAudioController.
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any', Zero Memory Leaks.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Volume2,
  Square,
  Sparkles,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { hasChineseVoice, stopSpeaking } from '../../engines/audio/audioEngine';
import { studioAudioController, useStudioAudioPlayer } from './studioAudioPlayer';
import { KNOWN_33_SANDHI_MAP } from '../../engines/pinyin/pinyinUtils';

export interface AudioPreviewSandboxProps {
  initialText?: string;
  sampleWords?: string[];
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_PRESETS = ['你好', '谢谢', '不客气', '再见', '很好', '对不起', '多少钱'];

export const AudioPreviewSandbox: React.FC<AudioPreviewSandboxProps> = ({
  initialText = '你好',
  sampleWords = [],
  className = '',
  style = {},
}) => {
  const [text, setText] = useState<string>(initialText);
  const [rate, setRate] = useState<1.0 | 0.75>(1.0);
  const [hasVoice, setHasVoice] = useState<boolean>(true);

  const { activePlayingId, play, stop } = useStudioAudioPlayer();
  const sandboxAudioId = 'studio-sandbox-audio';
  const isPlaying = activePlayingId === sandboxAudioId;

  // Check Chinese voice availability
  useEffect(() => {
    try {
      setHasVoice(hasChineseVoice());
    } catch {
      setHasVoice(true);
    }
  }, []);

  // Tone sandhi detection for current input
  const sandhiInfo = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return null;
    return KNOWN_33_SANDHI_MAP[trimmed] || null;
  }, [text]);

  // Combined quick chips (deduped)
  const quickChips = useMemo(() => {
    const combined = [...new Set([...sampleWords, ...DEFAULT_PRESETS])].filter(
      (w) => w.trim().length > 0
    );
    return combined.slice(0, 10);
  }, [sampleWords]);

  // Handle Play
  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      if (!text.trim()) return;
      play(sandboxAudioId, text.trim(), rate);
    }
  }, [isPlaying, text, rate, play, stop]);

  // Handle Select Chip
  const handleSelectChip = useCallback((word: string) => {
    setText(word);
    studioAudioController.play('studio-sandbox-audio', word, 1.0);
  }, []);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <div
      className={`audio-preview-sandbox ${className}`}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-rice-paper, #E5E7EB)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
        ...style,
      }}
    >
      {/* Header with Title & Voice Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#FEF3C7',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <h4
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--text-ink-primary, #1C1E21)',
                margin: 0,
              }}
            >
              Audio Sandbox
            </h4>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--text-ink-muted, #6B7280)',
                margin: 0,
              }}
            >
              ทดสอบฟังเสียงจีนกลาง (zh-CN) & ตรวจสอบวรรณยุกต์
            </p>
          </div>
        </div>

        {/* Voice Health Badge */}
        <div
          data-testid="voice-status-badge"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '999px',
            backgroundColor: hasVoice ? '#ECFDF5' : '#FFFBEB',
            color: hasVoice ? '#065F46' : '#92400E',
            border: `1px solid ${hasVoice ? '#A7F3D0' : '#FDE68A'}`,
          }}
        >
          {hasVoice ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
          <span>{hasVoice ? 'zh-CN เสียงแท้' : 'Synthesizer สำรอง'}</span>
        </div>
      </div>

      {/* Input Field with Clear Button */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          data-testid="sandbox-text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="พิมพ์ตัวอักษรจีนหรือประโยคที่ต้องการฟัง..."
          style={{
            width: '100%',
            padding: '12px 42px 12px 14px',
            fontSize: '16px',
            fontFamily: '"LXGW WenKai", "Noto Sans SC", sans-serif',
            borderRadius: '12px',
            border: '1.5px solid #E5E7EB',
            outline: 'none',
            boxSizing: 'border-box',
            backgroundColor: '#F9FAFB',
            color: '#1F2937',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-jade-primary, #1B7A4E)';
            e.currentTarget.style.backgroundColor = '#FFFFFF';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.backgroundColor = '#F9FAFB';
          }}
        />
        {text && (
          <button
            type="button"
            aria-label="ล้างข้อความ"
            onClick={() => setText('')}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              padding: '6px',
              color: '#9CA3AF',
              cursor: 'pointer',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RotateCcw size={15} />
          </button>
        )}
      </div>

      {/* Tone Sandhi Banner (if detected) */}
      {sandhiInfo && (
        <div
          data-testid="tone-sandhi-banner"
          style={{
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#1E40AF',
          }}
        >
          <div>
            <span style={{ fontWeight: 700 }}>💡 กฎผันเสียง Tone Sandhi:</span>{' '}
            <span style={{ fontFamily: 'monospace' }}>
              {sandhiInfo.basePinyin} ➔{' '}
              <strong style={{ color: '#2563EB' }}>{sandhiInfo.displayPinyin}</strong>
            </span>
          </div>
          <span
            style={{
              fontSize: '10px',
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: '#DBEAFE',
              fontWeight: 700,
            }}
          >
            3+3 ➔ 2+3
          </span>
        </div>
      )}

      {/* Controls: Speed Toggle + Play Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {/* Speed Toggle (1.0x / 0.75x) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
            borderRadius: '10px',
            padding: '4px',
            gap: '4px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0 8px',
              fontSize: '12px',
              color: '#6B7280',
            }}
          >
            <Gauge size={14} />
            <span>ความเร็ว:</span>
          </div>
          <button
            type="button"
            data-testid="rate-1x-btn"
            onClick={() => setRate(1.0)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: '34px',
              backgroundColor: rate === 1.0 ? '#FFFFFF' : 'transparent',
              color: rate === 1.0 ? '#111827' : '#6B7280',
              boxShadow: rate === 1.0 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            1.0x ปกติ
          </button>
          <button
            type="button"
            data-testid="rate-075x-btn"
            onClick={() => setRate(0.75)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: '34px',
              backgroundColor: rate === 0.75 ? '#FFFFFF' : 'transparent',
              color: rate === 0.75 ? '#111827' : '#6B7280',
              boxShadow: rate === 0.75 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            0.75x ช้าชัด
          </button>
        </div>

        {/* Main Play / Stop Button */}
        <button
          type="button"
          data-testid="sandbox-play-btn"
          disabled={!text.trim()}
          onClick={handleTogglePlay}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: isPlaying
              ? '#DC2626'
              : !text.trim()
              ? '#E5E7EB'
              : 'var(--color-jade-primary, #1B7A4E)',
            color: !text.trim() ? '#9CA3AF' : '#FFFFFF',
            fontWeight: 700,
            fontSize: '14px',
            cursor: !text.trim() ? 'not-allowed' : 'pointer',
            minHeight: '44px',
            transition: 'all 0.15s ease',
            boxShadow:
              isPlaying || !text.trim()
                ? 'none'
                : '0 4px 12px rgba(27, 122, 78, 0.25)',
          }}
        >
          {isPlaying ? <Square size={16} fill="#FFFFFF" /> : <Volume2 size={18} />}
          <span>{isPlaying ? 'หยุดเสียง' : 'กดฟังเสียง'}</span>
        </button>
      </div>

      {/* Quick Phrase Chips */}
      {quickChips.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-ink-muted, #9CA3AF)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            คำศัพท์แนะนำสำหรับทดสอบ:
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            {quickChips.map((word) => (
              <button
                key={word}
                type="button"
                data-testid={`quick-chip-${word}`}
                onClick={() => handleSelectChip(word)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontFamily: '"LXGW WenKai", "Noto Sans SC", sans-serif',
                  border:
                    text === word
                      ? '1.5px solid var(--color-jade-primary, #1B7A4E)'
                      : '1px solid #E5E7EB',
                  backgroundColor: text === word ? '#ECFDF5' : '#F9FAFB',
                  color: text === word ? '#065F46' : '#374151',
                  cursor: 'pointer',
                  fontWeight: text === word ? 700 : 500,
                  transition: 'all 0.15s ease',
                  minHeight: '32px',
                }}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

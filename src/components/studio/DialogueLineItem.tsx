/**
 * src/components/studio/DialogueLineItem.tsx
 * ---------------------------------------------------------------------------
 * Memoized individual dialogue line editor for Hanzero Content Studio.
 * Includes Persona Presets, Smart Pinyin, TTS probe, and Natural Thai Linter hints.
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any', 60fps React.memo.
 */

import React, { useCallback, useMemo } from 'react';
import {
  Volume2,
  Trash2,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import type { StudioDialogueDraft } from '../../engines/studio/studioTypes';
import { lintTraditionalChars } from '../../engines/studio/studioLinterEngine';
import { toneNumberToMark } from '../../engines/pinyin/pinyinUtils';

// Persona presets
export const PERSONA_PRESETS = [
  { name: 'น้องทู่ทู่ 🐰', defaultSpeaker: 'A' as const },
  { name: 'เหล่าซือหลิน 👩‍🏫', defaultSpeaker: 'B' as const },
  { name: 'อาหมิง 🧑‍💼', defaultSpeaker: 'A' as const },
  { name: 'เสี่ยวเฉิน 👨‍🍳', defaultSpeaker: 'B' as const },
  { name: 'นักท่องเที่ยว 🧳', defaultSpeaker: 'A' as const },
];

export interface DialogueLineItemProps {
  line: StudioDialogueDraft;
  index: number;
  totalCount: number;
  isPlaying: boolean;
  onUpdate: (clientId: string, patch: Partial<StudioDialogueDraft>) => void;
  onRemove: (clientId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onPlayAudio: (id: string, text: string) => void;
}

export const DialogueLineItem: React.FC<DialogueLineItemProps> = React.memo(
  ({
    line,
    index,
    totalCount,
    isPlaying,
    onUpdate,
    onRemove,
    onMoveUp,
    onMoveDown,
    onPlayAudio,
  }) => {
    // Check traditional chars in zh
    const traditionalIssues = useMemo(() => {
      return lintTraditionalChars(line.zh || '');
    }, [line.zh]);

    // Natural Thai phrasing check
    const naturalThaiWarning = useMemo(() => {
      if (!line.zh || !line.th) return null;
      if (line.zh.includes('不客气') && line.th.includes('ไม่ต้องเกรงใจ')) {
        return {
          current: line.th,
          suggestion: 'ไม่เป็นไรครับ / ด้วยความยินดีครับ',
          reason: "คำว่า '不客气' ในบริบทตอบรับคำขอบคุณ ควรแปลว่า 'ไม่เป็นไร / ยินดีครับ' แทน 'ไม่ต้องเกรงใจ'",
        };
      }
      if (line.zh.includes('慢走') && line.th.includes('เดินช้า')) {
        return {
          current: line.th,
          suggestion: 'เดินทางปลอดภัยนะครับ / กลับดีๆ นะครับ',
          reason: "คำว่า '慢走' เป็นคำอวยพรเวลาส่งแขก ควรแปลว่า 'เดินทางปลอดภัยครับ'",
        };
      }
      return null;
    }, [line.zh, line.th]);

    // Handle Smart Pinyin on blur or space
    const triggerSmartPinyin = useCallback(() => {
      if (/[0-5]/.test(line.pinyin)) {
        const converted = toneNumberToMark(line.pinyin);
        if (converted !== line.pinyin) {
          onUpdate(line._clientId, { pinyin: converted });
        }
      }
    }, [line._clientId, line.pinyin, onUpdate]);

    // 1-Click Convert Traditional to Simplified
    const handleSimplifyZh = useCallback(() => {
      let simplified = line.zh;
      for (const item of traditionalIssues) {
        simplified = simplified.split(item.char).join(item.simplified);
      }
      onUpdate(line._clientId, { zh: simplified });
    }, [line._clientId, line.zh, traditionalIssues, onUpdate]);

    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #EAE5DE',
          padding: '18px',
          boxShadow: '0 4px 20px -2px rgba(44, 34, 20, 0.04)',
          position: 'relative',
        }}
      >
        {/* Line Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            borderBottom: '1px solid #F5F1EA',
            paddingBottom: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: line.speaker === 'A' ? 'var(--color-jade-surface)' : '#FFFBEB',
                color: line.speaker === 'A' ? 'var(--color-jade-deep)' : '#B45309',
                fontWeight: 700,
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {line.speaker}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-ink-secondary)' }}>
              บรรทัดที่ {index + 1}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
              className="btn-tactile-secondary"
              title="เลื่อนบรรทัดขึ้น"
              style={{ padding: '4px 6px', minHeight: '32px', borderRadius: '6px', opacity: index === 0 ? 0.3 : 1 }}
            >
              <ChevronUp size={16} />
            </button>
            <button
              onClick={() => onMoveDown(index)}
              disabled={index === totalCount - 1}
              className="btn-tactile-secondary"
              title="เลื่อนบรรทัดลง"
              style={{
                padding: '4px 6px',
                minHeight: '32px',
                borderRadius: '6px',
                opacity: index === totalCount - 1 ? 0.3 : 1,
              }}
            >
              <ChevronDown size={16} />
            </button>
            <button
              onClick={() => onRemove(line._clientId)}
              className="btn-tactile-secondary"
              title="ลบบรรทัดนี้"
              style={{ padding: '4px 6px', minHeight: '32px', borderRadius: '6px', color: '#DC2626' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Row 1: Speaker Role & Name */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '90px 1fr auto',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          {/* Speaker Letter */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
              ผู้พูด (Role)
            </label>
            <select
              value={line.speaker}
              onChange={(e) => onUpdate(line._clientId, { speaker: e.target.value as 'A' | 'B' | 'C' })}
              style={{
                width: '100%',
                minHeight: '40px',
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '13px',
                fontWeight: 600,
                outline: 'none',
              }}
            >
              <option value="A">คน A</option>
              <option value="B">คน B</option>
              <option value="C">คน C</option>
            </select>
          </div>

          {/* Speaker Name */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
              ชื่อตัวละคร / ตำแหน่ง
            </label>
            <input
              type="text"
              value={line.speaker_name}
              placeholder="เช่น น้องทู่ทู่ 🐰 หรือ คุณครูหลี่ 👩‍🏫"
              onChange={(e) => onUpdate(line._clientId, { speaker_name: e.target.value })}
              style={{
                width: '100%',
                minHeight: '40px',
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          {/* Persona Presets Dropdown */}
          <div style={{ paddingTop: '18px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {PERSONA_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => onUpdate(line._clientId, { speaker_name: p.name, speaker: p.defaultSpeaker })}
                  style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #EAE5DE',
                    backgroundColor: line.speaker_name === p.name ? 'var(--color-jade-surface)' : '#F9F7F3',
                    color: line.speaker_name === p.name ? 'var(--color-jade-deep)' : 'var(--text-ink-primary)',
                    cursor: 'pointer',
                  }}
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Chinese Utterance & TTS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '12px',
            alignItems: 'end',
            marginBottom: '12px',
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
              ประโยคภาษาจีน (Chinese zh) *
            </label>
            <input
              type="text"
              value={line.zh}
              placeholder="เช่น 你好！很高兴认识你。"
              onChange={(e) => {
                const clean = e.target.value.replace(/[\u200B\uFEFF]/g, '');
                onUpdate(line._clientId, { zh: clean });
              }}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: traditionalIssues.length > 0 ? '2px solid #DC2626' : '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '18px',
                fontWeight: 600,
                fontFamily: 'var(--font-hanzi-card)',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => onPlayAudio(line._clientId, line.zh)}
            className={isPlaying ? 'btn-tactile-primary' : 'btn-tactile-secondary'}
            title="ทดสอบฟังเสียงบทสนทนานี้"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isPlaying ? '#FFFFFF' : 'var(--color-jade-deep)',
            }}
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* Traditional Warning if detected */}
        {traditionalIssues.length > 0 && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              padding: '8px 12px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#DC2626' }}>
              ⚠️ พบตัวเต็ม: {traditionalIssues.map((i) => `${i.char}➔${i.simplified}`).join(', ')}
            </span>
            <button
              type="button"
              onClick={handleSimplifyZh}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#FFFFFF',
                backgroundColor: '#DC2626',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 8px',
                cursor: 'pointer',
              }}
            >
              แปลงเป็นตัวย่อ 🪄
            </button>
          </div>
        )}

        {/* Row 3: Pinyin */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
            พินอิน (Pinyin) *
          </label>
          <input
            type="text"
            value={line.pinyin}
            placeholder="เช่น nǐ hǎo! hěn gāoxìng rènshi nǐ."
            onChange={(e) => onUpdate(line._clientId, { pinyin: e.target.value })}
            onBlur={triggerSmartPinyin}
            style={{
              width: '100%',
              minHeight: '44px',
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #E2DBD0',
              backgroundColor: '#FDFBF7',
              fontSize: '15px',
              lineHeight: 1.6,
              fontFamily: 'var(--font-latin)',
              outline: 'none',
            }}
          />
        </div>

        {/* Row 4: Meaning TH & EN */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
              คำแปลภาษาไทย *
            </label>
            <input
              type="text"
              value={line.th}
              placeholder="เช่น สวัสดีครับ! ยินดีที่ได้รู้จักครับ"
              onChange={(e) => onUpdate(line._clientId, { th: e.target.value })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
              คำแปลภาษาอังกฤษ
            </label>
            <input
              type="text"
              value={line.en}
              placeholder="e.g. Hello! Nice to meet you."
              onChange={(e) => onUpdate(line._clientId, { en: e.target.value })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Natural Thai Phrasing Warning */}
        {naturalThaiWarning && (
          <div
            style={{
              marginTop: '10px',
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '12px', color: '#92400E' }}>
              <span style={{ fontWeight: 600 }}>💡 แนะนำการแปล:</span> {naturalThaiWarning.reason} (แนะนำ: "
              {naturalThaiWarning.suggestion}")
            </div>
            <button
              type="button"
              onClick={() => onUpdate(line._clientId, { th: naturalThaiWarning.suggestion })}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#B45309',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FCD34D',
                borderRadius: '4px',
                padding: '2px 8px',
                cursor: 'pointer',
              }}
            >
              ใช้คำแนะนำนี้ ✨
            </button>
          </div>
        )}
      </div>
    );
  }
);

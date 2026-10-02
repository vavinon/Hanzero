/**
 * src/components/studio/VocabItemCard.tsx
 * ---------------------------------------------------------------------------
 * Memoized individual vocabulary card editor for Hanzero Content Studio.
 * Features:
 * - Smart Pinyin with Contextual Umlaut & Punctuation Detachment
 * - Ink-Flash feedback animation (400ms)
 * - Traditional Chinese inline alert with 1-click simplify
 * - Tone Sandhi dual pinyin guidance with 1-click apply to display_pinyin
 * - Safe stroke_count parsing (handles '' without NaN)
 * - TTS audio probe with Singleton preemption
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any', 60fps React.memo.
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  Volume2,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Smile,
  Activity,
} from 'lucide-react';
import type { StudioVocabDraft } from '../../engines/studio/studioTypes';
import { lintVocabItem } from '../../engines/studio/studioLinterEngine';
import { toneNumberToMark } from '../../engines/pinyin/pinyinUtils';

// Common radicals for quick selection
const COMMON_RADICALS = [
  { char: '一', name: 'หมวดขีดเดี่ยว' },
  { char: '亻', name: 'หมวดคน' },
  { char: '口', name: 'หมวดปาก' },
  { char: '女', name: 'หมวดผู้หญิง' },
  { char: '氵', name: 'หมวดน้ำ' },
  { char: '讠', name: 'หมวดคำพูด' },
  { char: '辶', name: 'หมวดการเดิน' },
  { char: '木', name: 'หมวดต้นไม้' },
  { char: '日', name: 'หมวดดวงอาทิตย์' },
  { char: '心', name: 'หมวดหัวใจ' },
];

export interface VocabItemCardProps {
  vocab: StudioVocabDraft;
  index: number;
  totalCount: number;
  isPlaying: boolean;
  onUpdate: (clientId: string, patch: Partial<StudioVocabDraft>) => void;
  onRemove: (clientId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onPlayAudio: (id: string, text: string) => void;
}

export const VocabItemCard: React.FC<VocabItemCardProps> = React.memo(
  ({
    vocab,
    index,
    totalCount,
    isPlaying,
    onUpdate,
    onRemove,
    onMoveUp,
    onMoveDown,
    onPlayAudio,
  }) => {
    const [showInkFlash, setShowInkFlash] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Run memoized linter report for this specific card
    const lintReport = useMemo(() => {
      return lintVocabItem({
        hanzi: vocab.hanzi,
        pinyin: vocab.pinyin,
        meaning_th: vocab.meaning_th,
        meaning_en: vocab.meaning_en,
      });
    }, [vocab.hanzi, vocab.pinyin, vocab.meaning_th, vocab.meaning_en]);

    // Handle Smart Pinyin on blur or key triggers
    const triggerSmartPinyin = useCallback(() => {
      if (/[0-5]/.test(vocab.pinyin)) {
        const converted = toneNumberToMark(vocab.pinyin);
        if (converted !== vocab.pinyin) {
          onUpdate(vocab._clientId, { pinyin: converted });
          setShowInkFlash(true);
          setTimeout(() => setShowInkFlash(false), 400);
        }
      }
    }, [vocab._clientId, vocab.pinyin, onUpdate]);

    const handlePinyinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Tab') {
        triggerSmartPinyin();
      }
    };

    // 1-Click Convert Traditional to Simplified
    const handleSimplifyHanzi = useCallback(() => {
      let simplified = vocab.hanzi;
      for (const item of lintReport.traditionalChars) {
        simplified = simplified.split(item.char).join(item.simplified);
      }
      onUpdate(vocab._clientId, { hanzi: simplified });
    }, [vocab._clientId, vocab.hanzi, lintReport.traditionalChars, onUpdate]);

    // Apply spoken pinyin from Tone Sandhi suggestion to display_pinyin
    const handleApplySandhiToDisplay = useCallback(
      (suggested: string) => {
        onUpdate(vocab._clientId, {
          display_pinyin: suggested,
          sandhi_rule: lintReport.sandhiHints[0]?.ruleType === '3+3' ? '3+3' : 'bu',
        });
      },
      [vocab._clientId, lintReport.sandhiHints, onUpdate]
    );

    // Safe Stroke Count Change Handler
    const handleStrokeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === '') {
        onUpdate(vocab._clientId, { stroke_count: '' });
      } else {
        const num = parseInt(val, 10);
        onUpdate(vocab._clientId, { stroke_count: isNaN(num) ? 1 : Math.max(1, num) });
      }
    };

    return (
      <div
        data-testid={`vocab-card-${index}`}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #EAE5DE',
          padding: '20px',
          boxShadow: '0 4px 20px -2px rgba(44, 34, 20, 0.04)',
          position: 'relative',
          transition: 'all 0.2s ease',
        }}
      >
        {/* Card Header: Index & Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            borderBottom: '1px solid #F5F1EA',
            paddingBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-jade-surface)',
                color: 'var(--color-jade-deep)',
                fontWeight: 700,
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {index + 1}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-ink-secondary)' }}>
              คำศัพท์ที่ {index + 1}
            </span>
            {vocab.id && (
              <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'monospace' }}>
                ({vocab.id})
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Move Up */}
            <button
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
              className="btn-tactile-secondary"
              title="เลื่อนการ์ดขึ้น"
              style={{
                padding: '4px 6px',
                minHeight: '32px',
                borderRadius: '6px',
                opacity: index === 0 ? 0.3 : 1,
              }}
            >
              <ChevronUp size={16} />
            </button>
            {/* Move Down */}
            <button
              onClick={() => onMoveDown(index)}
              disabled={index === totalCount - 1}
              className="btn-tactile-secondary"
              title="เลื่อนการ์ดลง"
              style={{
                padding: '4px 6px',
                minHeight: '32px',
                borderRadius: '6px',
                opacity: index === totalCount - 1 ? 0.3 : 1,
              }}
            >
              <ChevronDown size={16} />
            </button>
            {/* Delete Card */}
            <button
              onClick={() => onRemove(vocab._clientId)}
              className="btn-tactile-secondary"
              title="ลบคำศัพท์นี้"
              style={{
                padding: '4px 6px',
                minHeight: '32px',
                borderRadius: '6px',
                color: '#DC2626',
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Primary Row: Hanzi + Pinyin + Audio Button */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'flex-start',
            marginBottom: '14px',
          }}
        >
          {/* Hanzi Input */}
          <div style={{ flex: '1 1 120px', minWidth: '0' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-ink-secondary)',
                marginBottom: '4px',
              }}
            >
              ตัวอักษรจีน (Hanzi) *
            </label>
            <input
              type="text"
              data-testid="input-hanzi"
              value={vocab.hanzi}
              placeholder="เช่น 你好"
              onChange={(e) => {
                // Strict CJK & Clean Input
                const clean = e.target.value.replace(/[\u200B\uFEFF]/g, '');
                onUpdate(vocab._clientId, { hanzi: clean });
              }}
              onBlur={() => {
                onUpdate(vocab._clientId, { hanzi: vocab.hanzi.trim() });
              }}
              style={{
                width: '100%',
                minHeight: '48px',
                padding: '8px 12px',
                borderRadius: '10px',
                border:
                  lintReport.traditionalChars.length > 0 ? '2px solid #DC2626' : '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '22px',
                fontWeight: 700,
                fontFamily: 'var(--font-hanzi-card)',
                outline: 'none',
              }}
            />
          </div>

          {/* Pinyin Input with Ink Flash */}
          <div style={{ flex: '1.5 1 140px', minWidth: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-ink-secondary)',
                }}
              >
                พินอิน (Pinyin) *
              </label>
              {/[0-5]/.test(vocab.pinyin) && (
                <button
                  type="button"
                  data-testid="btn-smart-pinyin"
                  onClick={triggerSmartPinyin}
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-jade-deep)',
                    backgroundColor: 'var(--color-jade-surface)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  ✨ แปลงวรรณยุกต์
                </button>
              )}
            </div>
            <input
              type="text"
              data-testid="input-pinyin"
              value={vocab.pinyin}
              placeholder="เช่น nǐ hǎo หรือ ni3 hao3"
              onChange={(e) => onUpdate(vocab._clientId, { pinyin: e.target.value })}
              onKeyDown={handlePinyinKeyDown}
              onBlur={triggerSmartPinyin}
              style={{
                width: '100%',
                minHeight: '48px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: showInkFlash ? '#ECFDF5' : '#FDFBF7',
                fontSize: '16px',
                lineHeight: 1.6,
                paddingTop: '6px',
                fontFamily: 'var(--font-latin)',
                outline: 'none',
                transition: 'background-color 0.4s ease',
              }}
            />
          </div>

          {/* Instant TTS Audio Probe */}
          <div style={{ paddingTop: '22px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => onPlayAudio(vocab._clientId, vocab.hanzi)}
              className={isPlaying ? 'btn-tactile-primary' : 'btn-tactile-secondary'}
              title="ทดสอบฟังเสียงภาษาจีนกลาง (zh-CN)"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isPlaying ? '#FFFFFF' : 'var(--color-jade-deep)',
              }}
            >
              <Volume2 size={20} style={{ animation: isPlaying ? 'pulse 0.8s infinite' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Inline Pedagogical Alerts */}
        {/* Traditional Chinese Alert with 1-Click Convert */}
        {lintReport.traditionalChars.length > 0 && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '10px',
              padding: '10px 12px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#DC2626' }}>
              <AlertTriangle size={16} />
              <span>
                พบตัวเต็ม:{' '}
                <strong>
                  {lintReport.traditionalChars.map((t) => `${t.char} ➔ ${t.simplified}`).join(', ')}
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleSimplifyHanzi}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#FFFFFF',
                backgroundColor: '#DC2626',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 10px',
                cursor: 'pointer',
              }}
            >
              1-Click แปลงเป็นตัวย่อ 🪄
            </button>
          </div>
        )}

        {/* Tone Sandhi Guidance Alert */}
        {lintReport.sandhiHints.length > 0 && (
          <div
            style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '10px',
              padding: '10px 12px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontSize: '12px', color: '#B45309' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                <Lightbulb size={14} />
                <span>ข้อสังเกตการผันเสียง: {lintReport.sandhiHints[0].explanation}</span>
              </div>
              <div style={{ marginTop: '2px', color: '#92400E' }}>
                เสียงอ่านจริงแนะนำ: <strong>{lintReport.sandhiHints[0].suggestedPinyin}</strong>
                {vocab.display_pinyin && ` (ปัจจุบัน: ${vocab.display_pinyin})`}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleApplySandhiToDisplay(lintReport.sandhiHints[0].suggestedPinyin)}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#B45309',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FCD34D',
                borderRadius: '6px',
                padding: '4px 8px',
                cursor: 'pointer',
              }}
            >
              ใส่ใน Display Pinyin ⚡
            </button>
          </div>
        )}

        {/* Meanings Row (TH & EN) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: '12px',
            marginBottom: '14px',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-ink-secondary)',
                marginBottom: '4px',
              }}
            >
              คำแปลภาษาไทย *
            </label>
            <input
              type="text"
              data-testid="input-meaning-th"
              value={vocab.meaning_th}
              placeholder="เช่น สวัสดี"
              onChange={(e) => onUpdate(vocab._clientId, { meaning_th: e.target.value })}
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
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-ink-secondary)',
                marginBottom: '4px',
              }}
            >
              คำแปลภาษาอังกฤษ
            </label>
            <input
              type="text"
              data-testid="input-meaning-en"
              value={vocab.meaning_en}
              placeholder="e.g. Hello"
              onChange={(e) => onUpdate(vocab._clientId, { meaning_en: e.target.value })}
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

        {/* Radical & Stroke Count Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'flex-end',
            marginBottom: '14px',
          }}
        >
          {/* Radical Char */}
          <div style={{ flex: '1 1 70px', minWidth: '0' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-ink-secondary)',
                marginBottom: '4px',
              }}
            >
              หมวดนำ
            </label>
            <input
              type="text"
              value={vocab.radical}
              placeholder="一"
              onChange={(e) => onUpdate(vocab._clientId, { radical: e.target.value.trim() })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '18px',
                textAlign: 'center',
                fontFamily: 'var(--font-hanzi-card)',
                outline: 'none',
              }}
            />
          </div>

          {/* Radical Name TH */}
          <div style={{ flex: '2 1 120px', minWidth: '0' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-ink-secondary)',
                marginBottom: '4px',
              }}
            >
              ชื่อหมวดนำ (ไทย)
            </label>
            <input
              type="text"
              value={vocab.radical_name_th}
              placeholder="เช่น หมวดขีดเดี่ยว"
              onChange={(e) => onUpdate(vocab._clientId, { radical_name_th: e.target.value })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          {/* Stroke Count */}
          <div style={{ flex: '1 1 80px', minWidth: '0' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-ink-secondary)',
                marginBottom: '4px',
              }}
            >
              จำนวนขีด
            </label>
            <input
              type="number"
              min={1}
              max={64}
              value={vocab.stroke_count}
              onChange={handleStrokeCountChange}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                textAlign: 'center',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Quick Common Radicals Pills */}
        <div style={{ marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', color: '#9CA3AF', marginRight: '6px' }}>เลือกหมวดนำพบบ่อย:</span>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
            {COMMON_RADICALS.map((r) => (
              <button
                key={r.char}
                type="button"
                onClick={() => onUpdate(vocab._clientId, { radical: r.char, radical_name_th: r.name })}
                style={{
                  fontSize: '12px',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  border: '1px solid #EAE5DE',
                  backgroundColor: vocab.radical === r.char ? 'var(--color-jade-surface)' : '#F9F7F3',
                  color: vocab.radical === r.char ? 'var(--color-jade-deep)' : 'var(--text-ink-primary)',
                  cursor: 'pointer',
                }}
              >
                {r.char} ({r.name})
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Section: Mnemonics & Pedagogical Anchors */}
        <div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-jade-deep)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 0',
            }}
          >
            {isExpanded ? '▲ ซ่อนเทคนิคช่วยจำ & กายบริหาร' : '▼ เพิ่มเติม: เทคนิคช่วยจำ ภาพจำ & ท่าทาง (Mnemonics)'}
          </button>

          {isExpanded && (
            <div
              style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px dashed #EAE5DE',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
              }}
            >
              {/* Adult Mnemonic */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
                  <Sparkles size={12} />
                  <span>ภาพจำช่วยจำ (Mnemonic ผู้ใหญ่)</span>
                </label>
                <textarea
                  rows={2}
                  value={vocab.mnemonic}
                  placeholder="เช่น คน (亻) ยืนกราบไหว้ทักทายกัน..."
                  onChange={(e) => onUpdate(vocab._clientId, { mnemonic: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #E2DBD0',
                    backgroundColor: '#FDFBF7',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Kid Mnemonic */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
                  <Smile size={12} />
                  <span>ภาพจำนิทานเด็ก (Kid Mnemonic)</span>
                </label>
                <textarea
                  rows={2}
                  value={vocab.kid_mnemonic}
                  placeholder="เช่น กระต่ายทู่ทู่โบกมือทักทายเพื่อน..."
                  onChange={(e) => onUpdate(vocab._clientId, { kid_mnemonic: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #E2DBD0',
                    backgroundColor: '#FDFBF7',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Body Gesture */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
                  <Activity size={12} />
                  <span>ท่าทางประกอบ (Body Gesture)</span>
                </label>
                <textarea
                  rows={2}
                  value={vocab.body_gesture}
                  placeholder="เช่น ยกมือขวาขึ้นมาแตะหน้าอกแล้วก้มหัวเล็กน้อย..."
                  onChange={(e) => onUpdate(vocab._clientId, { body_gesture: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #E2DBD0',
                    backgroundColor: '#FDFBF7',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

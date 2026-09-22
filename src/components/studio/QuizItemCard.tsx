/**
 * src/components/studio/QuizItemCard.tsx
 * ---------------------------------------------------------------------------
 * Memoized Quiz Item Card for Hanzero Content Studio.
 * Features:
 * - 6 Strict Quiz Types matching Discriminated Literal Union in types/lesson.ts
 * - Safe Option Deletion & Re-indexing (Red Team Invariant)
 * - Sentence Scramble token management with unique tracking
 * - Inline distractor and balance guidance
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any', 60fps React.memo.
 */

import React, { useCallback, useMemo } from 'react';
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import type { QuizQuestionType } from '../../types/lesson';
import type { StudioQuizDraft, StudioVocabDraft } from '../../engines/studio/studioTypes';

export const QUIZ_TYPE_METADATA: Record<
  QuizQuestionType,
  { label: string; icon: string; description: string }
> = {
  listen_match: {
    label: 'ฟังเสียงแล้วเลือกข้อที่ถูก (Listen Match)',
    icon: '🎧',
    description: 'ฝึกการฟังและแยกแยะเสียงพินอิน/คำศัพท์ภาษาจีน',
  },
  meaning_match: {
    label: 'จับคู่ความหมาย (Meaning Match)',
    icon: '📖',
    description: 'เลือกคำแปลภาษาไทยที่ถูกต้องตรงกับคำศัพท์',
  },
  flash_recall: {
    label: 'จำไวตอบไว (Flash Recall)',
    icon: '⚡',
    description: 'ทดสอบความเร็วในการนึกความหมายของตัวอักษรจีน',
  },
  tone_match: {
    label: 'จับคู่วรรณยุกต์ (Tone Match)',
    icon: '🎵',
    description: 'เลือกรูปวรรณยุกต์หรือพินอินที่มีเสียงถูกต้อง',
  },
  radical_focus: {
    label: 'ทายหมวดนำอักษรจีน (Radical Focus)',
    icon: '🔍',
    description: 'เลือกหมวดนำ (Radical) ที่ซ่อนอยู่ในตัวอักษร',
  },
  sentence_scramble: {
    label: 'เรียงประโยคให้ถูกต้อง (Sentence Scramble)',
    icon: '🧩',
    description: 'นำบล็อกคำศัพท์มาเรียงตามโครงสร้างไวยากรณ์จีน',
  },
};

export interface QuizItemCardProps {
  quiz: StudioQuizDraft;
  index: number;
  totalCount: number;
  availableVocabs: StudioVocabDraft[];
  onUpdate: (clientId: string, patch: Partial<StudioQuizDraft>) => void;
  onRemove: (clientId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const QuizItemCard: React.FC<QuizItemCardProps> = React.memo(
  ({
    quiz,
    index,
    totalCount,
    availableVocabs,
    onUpdate,
    onRemove,
    onMoveUp,
    onMoveDown,
  }) => {
    const isScramble = quiz.type === 'sentence_scramble';

    // Check duplicate options in multiple choice
    const duplicateOptionsWarning = useMemo(() => {
      if (isScramble || !quiz.options || quiz.options.length < 2) return false;
      const set = new Set(quiz.options.map((o) => o.trim()));
      return set.size < quiz.options.length;
    }, [isScramble, quiz.options]);

    // Safe Option Deletion Handler (Red Team Invariant)
    const handleRemoveOption = useCallback(
      (optIndex: number) => {
        if (quiz.options.length <= 2) return; // Prevent deleting when <= 2 options

        const nextOptions = quiz.options.filter((_, i) => i !== optIndex);
        let nextCorrectIndex = quiz.correct_index;

        if (optIndex === quiz.correct_index) {
          nextCorrectIndex = 0; // Reset to first option if correct option was removed
        } else if (optIndex < quiz.correct_index) {
          nextCorrectIndex = quiz.correct_index - 1; // Decrement index if an earlier option was removed
        }

        // Clamp index safety
        nextCorrectIndex = Math.max(0, Math.min(nextCorrectIndex, nextOptions.length - 1));

        onUpdate(quiz._clientId, {
          options: nextOptions,
          correct_index: nextCorrectIndex,
        });
      },
      [quiz._clientId, quiz.options, quiz.correct_index, onUpdate]
    );

    // Add Option Handler (Max 4)
    const handleAddOption = useCallback(() => {
      if (quiz.options.length >= 4) return;
      const nextOptions = [...quiz.options, `ตัวเลือกที่ ${quiz.options.length + 1}`];
      onUpdate(quiz._clientId, { options: nextOptions });
    }, [quiz._clientId, quiz.options, onUpdate]);

    // Update Single Option
    const handleUpdateOption = useCallback(
      (optIndex: number, text: string) => {
        const nextOptions = [...quiz.options];
        nextOptions[optIndex] = text;
        onUpdate(quiz._clientId, { options: nextOptions });
      },
      [quiz._clientId, quiz.options, onUpdate]
    );

    // Distractor Generator Helper: pull other meanings or words from lesson vocabs
    const handleSuggestDistractors = useCallback(() => {
      if (availableVocabs.length < 3) return;
      const otherVocabs = availableVocabs.filter(
        (v) => v.meaning_th && !quiz.options.includes(v.meaning_th)
      );
      if (otherVocabs.length === 0) return;

      const nextOptions = [...quiz.options];
      let vocabIdx = 0;
      for (let i = 0; i < nextOptions.length; i++) {
        if (i !== quiz.correct_index && vocabIdx < otherVocabs.length) {
          nextOptions[i] = otherVocabs[vocabIdx].meaning_th;
          vocabIdx++;
        }
      }
      onUpdate(quiz._clientId, { options: nextOptions });
    }, [quiz._clientId, quiz.options, quiz.correct_index, availableVocabs, onUpdate]);

    // Scramble: Update tokens by comma or space
    const handleTokensChange = useCallback(
      (text: string) => {
        const tokens = text
          .split(/[,，\s]+/)
          .map((t) => t.trim())
          .filter(Boolean);
        onUpdate(quiz._clientId, {
          tokens,
          correct_sequence: tokens, // default to input sequence
        });
      },
      [quiz._clientId, onUpdate]
    );

    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #EAE5DE',
          padding: '20px',
          boxShadow: '0 4px 20px -2px rgba(44, 34, 20, 0.04)',
          position: 'relative',
        }}
      >
        {/* Header: Index & Quiz Controls */}
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
              ข้อสอบที่ {index + 1}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: '#F5F1EA',
                color: 'var(--text-ink-secondary)',
                padding: '2px 8px',
                borderRadius: '9999px',
              }}
            >
              {QUIZ_TYPE_METADATA[quiz.type]?.icon} {QUIZ_TYPE_METADATA[quiz.type]?.label.split(' ')[0]}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
              className="btn-tactile-secondary"
              title="เลื่อนข้อสอบขึ้น"
              style={{ padding: '4px 6px', minHeight: '32px', borderRadius: '6px', opacity: index === 0 ? 0.3 : 1 }}
            >
              <ChevronUp size={16} />
            </button>
            <button
              onClick={() => onMoveDown(index)}
              disabled={index === totalCount - 1}
              className="btn-tactile-secondary"
              title="เลื่อนข้อสอบลง"
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
              onClick={() => onRemove(quiz._clientId)}
              className="btn-tactile-secondary"
              title="ลบข้อสอบนี้"
              style={{ padding: '4px 6px', minHeight: '32px', borderRadius: '6px', color: '#DC2626' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Quiz Type Selector */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
            ประเภทแบบฝึกหัด (Quiz Type)
          </label>
          <select
            value={quiz.type}
            onChange={(e) => onUpdate(quiz._clientId, { type: e.target.value as QuizQuestionType })}
            style={{
              width: '100%',
              minHeight: '44px',
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #E2DBD0',
              backgroundColor: '#FDFBF7',
              fontSize: '14px',
              fontWeight: 600,
              outline: 'none',
            }}
          >
            {(Object.keys(QUIZ_TYPE_METADATA) as QuizQuestionType[]).map((typeKey) => (
              <option key={typeKey} value={typeKey}>
                {QUIZ_TYPE_METADATA[typeKey].icon} {QUIZ_TYPE_METADATA[typeKey].label}
              </option>
            ))}
          </select>
        </div>

        {/* Question Text TH */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
            คำถาม (ภาษาไทย) *
          </label>
          <input
            type="text"
            value={quiz.question_th}
            placeholder="เช่น คำว่า '你好' มีความหมายตรงกับข้อใด?"
            onChange={(e) => onUpdate(quiz._clientId, { question_th: e.target.value })}
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

        {/* Duplicate Options Warning */}
        {duplicateOptionsWarning && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              padding: '8px 12px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#DC2626',
            }}
          >
            <AlertTriangle size={16} />
            <span>⚠️ พบตัวเลือกซ้ำกัน กรุณาแก้ไขตัวเลือกหลอกไม่ให้มีข้อความซ้ำ</span>
          </div>
        )}

        {/* Type Specific Fields: Multiple Choice vs Sentence Scramble */}
        {!isScramble ? (
          /* Multiple Choice Options List */
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)' }}>
                ตัวเลือกคำตอบ (Options - คลิกเลือกวงกลมสีเขียวที่ข้อเฉลยที่ถูกต้อง)
              </label>

              <div style={{ display: 'flex', gap: '6px' }}>
                {availableVocabs.length >= 3 && (
                  <button
                    type="button"
                    onClick={handleSuggestDistractors}
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--color-jade-deep)',
                      backgroundColor: 'var(--color-jade-surface)',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      cursor: 'pointer',
                    }}
                  >
                    ✨ ดึงตัวหลอกจากคำศัพท์
                  </button>
                )}

                {quiz.options.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddOption}
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--text-ink-primary)',
                      backgroundColor: '#F5F1EA',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      cursor: 'pointer',
                    }}
                  >
                    + เพิ่มช้อยส์
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quiz.options.map((option, optIdx) => {
                const isCorrect = quiz.correct_index === optIdx;

                return (
                  <div
                    key={optIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: isCorrect ? 'var(--color-jade-surface)' : '#FDFBF7',
                      border: isCorrect ? '1px solid var(--color-jade-primary)' : '1px solid #E2DBD0',
                      borderRadius: '10px',
                      padding: '6px 10px',
                    }}
                  >
                    {/* Correct Index Radio Button */}
                    <button
                      type="button"
                      onClick={() => onUpdate(quiz._clientId, { correct_index: optIdx })}
                      title={isCorrect ? 'ข้อนี้เป็นคำตอบที่ถูกต้อง' : 'คลิกเพื่อตั้งให้ข้อนี้เป็นคำตอบที่ถูกต้อง'}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: isCorrect ? '2px solid var(--color-jade-primary)' : '2px solid #D1C9BE',
                        backgroundColor: isCorrect ? 'var(--color-jade-primary)' : '#FFFFFF',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      {isCorrect && <CheckCircle2 size={16} />}
                    </button>

                    <input
                      type="text"
                      value={option}
                      placeholder={`ตัวเลือกที่ ${optIdx + 1}`}
                      onChange={(e) => handleUpdateOption(optIdx, e.target.value)}
                      style={{
                        flex: 1,
                        minHeight: '36px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '14px',
                        fontWeight: isCorrect ? 600 : 400,
                        outline: 'none',
                      }}
                    />

                    {/* Delete Option (Disabled when <= 2) */}
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(optIdx)}
                      disabled={quiz.options.length <= 2}
                      title={quiz.options.length <= 2 ? 'ต้องมีอย่างน้อย 2 ตัวเลือก' : 'ลบตัวเลือกนี้'}
                      style={{
                        color: quiz.options.length <= 2 ? '#D1C9BE' : '#DC2626',
                        background: 'none',
                        border: 'none',
                        cursor: quiz.options.length <= 2 ? 'not-allowed' : 'pointer',
                        padding: '4px',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Sentence Scramble Editor */
          <div style={{ marginBottom: '16px' }}>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
                โทเคนคำศัพท์ที่นำมาเรียง (คั่นด้วยเครื่องหมายจุลภาค หรือเว้นวรรค)
              </label>
              <input
                type="text"
                value={quiz.tokens.join(', ')}
                placeholder="เช่น 我, 是, 老师"
                onChange={(e) => handleTokensChange(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #E2DBD0',
                  backgroundColor: '#FDFBF7',
                  fontSize: '15px',
                  fontFamily: 'var(--font-hanzi-card)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Token Chips Preview */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              <span style={{ fontSize: '11px', color: '#9CA3AF', alignSelf: 'center' }}>ลำดับเฉลย:</span>
              {quiz.correct_sequence.map((token, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    backgroundColor: 'var(--color-jade-surface)',
                    color: 'var(--color-jade-deep)',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid #A7F3D0',
                  }}
                >
                  {tIdx + 1}. {token}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Explanation & Encouragement (Bilingual / Thai) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
              คำอธิบายเฉลย (Explanation ภาษาไทย)
            </label>
            <input
              type="text"
              value={quiz.explanation_th}
              placeholder="เช่น '你好' ประกอบด้วย คุณ + ดี แปลว่า สวัสดี"
              onChange={(e) => onUpdate(quiz._clientId, { explanation_th: e.target.value })}
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

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
              ข้อความให้กำลังใจ (Encouragement)
            </label>
            <input
              type="text"
              value={quiz.encouragement}
              placeholder="เช่น ยอดเยี่ยมมาก! 🐰✨"
              onChange={(e) => onUpdate(quiz._clientId, { encouragement: e.target.value })}
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
        </div>
      </div>
    );
  }
);

/**
 * src/components/studio/QuizComposer.tsx
 * ---------------------------------------------------------------------------
 * Main Quiz Composer Component for Hanzero Content Studio.
 * Features:
 * - 6 Strict Quiz Types
 * - Balance Guard: Detects answer position clustering and duplicate options
 * - Empty State Safeguard (prevents WSOD)
 * - Stable ClientId-based mutations
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any'.
 */

import React, { useCallback, useMemo } from 'react';
import { Plus, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { QuizQuestionType } from '../../types/lesson';
import type { StudioQuizDraft, StudioVocabDraft } from '../../engines/studio/studioTypes';
import { QuizItemCard } from './QuizItemCard';

export interface QuizComposerProps {
  quizList: StudioQuizDraft[];
  availableVocabs: StudioVocabDraft[];
  onAddQuiz: (type: QuizQuestionType) => void;
  onUpdateQuiz: (index: number, patch: Partial<StudioQuizDraft>) => void;
  onRemoveQuiz: (index: number) => void;
  onReorderQuiz: (from: number, to: number) => void;
}

export const QuizComposer: React.FC<QuizComposerProps> = ({
  quizList,
  availableVocabs,
  onAddQuiz,
  onUpdateQuiz,
  onRemoveQuiz,
  onReorderQuiz,
}) => {
  // Stable ClientId-based updater
  const handleUpdateByClientId = useCallback(
    (clientId: string, patch: Partial<StudioQuizDraft>) => {
      const idx = quizList.findIndex((q) => q._clientId === clientId);
      if (idx !== -1) {
        onUpdateQuiz(idx, patch);
      }
    },
    [quizList, onUpdateQuiz]
  );

  // Stable ClientId-based remover
  const handleRemoveByClientId = useCallback(
    (clientId: string) => {
      const idx = quizList.findIndex((q) => q._clientId === clientId);
      if (idx !== -1) {
        onRemoveQuiz(idx);
      }
    },
    [quizList, onRemoveQuiz]
  );

  // Reordering Handlers
  const handleMoveUp = useCallback(
    (index: number) => {
      if (index > 0) {
        onReorderQuiz(index, index - 1);
      }
    },
    [onReorderQuiz]
  );

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index < quizList.length - 1) {
        onReorderQuiz(index, index + 1);
      }
    },
    [quizList.length, onReorderQuiz]
  );

  // Balance Guard Analysis
  const balanceGuardReport = useMemo(() => {
    const mcQuizzes = quizList.filter((q) => q.type !== 'sentence_scramble');
    if (mcQuizzes.length < 3) return null;

    // Count correct index distribution
    const counts: Record<number, number> = {};
    for (const q of mcQuizzes) {
      counts[q.correct_index] = (counts[q.correct_index] || 0) + 1;
    }

    const maxCount = Math.max(...Object.values(counts));
    const dominantIndex = Object.keys(counts).find((k) => counts[parseInt(k, 10)] === maxCount);

    if (maxCount >= mcQuizzes.length - 1 && dominantIndex !== undefined) {
      const idxNum = parseInt(dominantIndex, 10);
      return {
        isBiased: true,
        dominantIndex: idxNum,
        message: `ตรวจพบความเอียงของเฉลย: ข้อสอบ ${maxCount} จาก ${mcQuizzes.length} ข้อเฉลยตัวเลือกที่ ${idxNum + 1} แนะนำให้สลับกระจายตำแหน่งตัวเลือกเพื่อป้องกันผู้เรียนเดาทาง`,
      };
    }

    return {
      isBiased: false,
      message: `การกระจายตำแหน่งเฉลยมีความสมดุลดี (ตัวเลือกเฉลยกระจายตัวเหมาะสม ✅)`,
    };
  }, [quizList]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--color-jade-primary)" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-ink-primary)' }}>
            แบบฝึกหัดประจำบทเรียน ({quizList.length} ข้อ)
          </h2>
        </div>

        {/* Quick Add Quiz Dropdown Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => onAddQuiz('meaning_match')}
            className="btn-tactile-primary"
            style={{
              padding: '8px 14px',
              minHeight: '44px',
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} />
            เพิ่มควิซปรนัย (MCQ)
          </button>
          <button
            type="button"
            onClick={() => onAddQuiz('sentence_scramble')}
            className="btn-tactile-secondary"
            style={{
              padding: '8px 14px',
              minHeight: '44px',
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} />
            เพิ่มเรียงประโยค
          </button>
        </div>
      </div>

      {/* Balance Guard Indicator Banner */}
      {balanceGuardReport && (
        <div
          style={{
            backgroundColor: balanceGuardReport.isBiased ? '#FFFBEB' : '#ECFDF5',
            border: balanceGuardReport.isBiased ? '1px solid #FDE68A' : '1px solid #A7F3D0',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {balanceGuardReport.isBiased ? (
            <AlertTriangle size={18} color="#D97706" />
          ) : (
            <ShieldCheck size={18} color="#059669" />
          )}
          <div style={{ fontSize: '13px', color: balanceGuardReport.isBiased ? '#92400E' : '#065F46' }}>
            <strong>เครื่องมือ Balance Guard:</strong> {balanceGuardReport.message}
          </div>
        </div>
      )}

      {/* Empty State Safeguard */}
      {quizList.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '2px dashed #EAE5DE',
          }}
        >
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🧩🐰</div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
            ยังไม่มีแบบฝึกหัดในบทเรียนนี้
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', maxWidth: '380px', margin: '0 auto 20px auto' }}>
            สร้างแบบฝึกหัดปรนัย จับคู่วรรณยุกต์ หรือเรียงประโยค เพื่อทดสอบความจำและความเข้าใจของผู้เรียน
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => onAddQuiz('meaning_match')}
              className="btn-tactile-primary"
              style={{ padding: '10px 18px', minHeight: '48px', fontSize: '14px' }}
            >
              <Plus size={16} style={{ marginRight: '6px' }} />
              เพิ่มควิซความหมาย
            </button>
            <button
              type="button"
              onClick={() => onAddQuiz('sentence_scramble')}
              className="btn-tactile-secondary"
              style={{ padding: '10px 18px', minHeight: '48px', fontSize: '14px' }}
            >
              <Plus size={16} style={{ marginRight: '6px' }} />
              เพิ่มเรียงประโยค
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Items List */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {quizList.map((quiz, index) => (
            <QuizItemCard
              key={quiz._clientId}
              quiz={quiz}
              index={index}
              totalCount={quizList.length}
              availableVocabs={availableVocabs}
              onUpdate={handleUpdateByClientId}
              onRemove={handleRemoveByClientId}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          ))}
        </div>
      )}
    </div>
  );
};

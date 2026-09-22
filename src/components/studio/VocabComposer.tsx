/**
 * src/components/studio/VocabComposer.tsx
 * ---------------------------------------------------------------------------
 * Main Vocabulary Composer Component for Hanzero Content Studio.
 * Features:
 * - Empty State Safeguard (prevents WSOD when list is empty)
 * - Pure memoized card items rendering at 60fps
 * - Centralized audio integration via useStudioAudioPlayer
 * - Batch 1-Click Simplify for entire lesson's vocabulary
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any'.
 */

import React, { useCallback, useMemo } from 'react';
import { Plus, BookOpen, RefreshCw } from 'lucide-react';
import type { StudioVocabDraft } from '../../engines/studio/studioTypes';
import { VocabItemCard } from './VocabItemCard';
import { useStudioAudioPlayer } from './studioAudioPlayer';
import { lintTraditionalChars } from '../../engines/studio/studioLinterEngine';

export interface VocabComposerProps {
  vocabList: StudioVocabDraft[];
  onAddVocab: (initial?: Partial<StudioVocabDraft>) => void;
  onUpdateVocab: (index: number, patch: Partial<StudioVocabDraft>) => void;
  onRemoveVocab: (index: number) => void;
  onReorderVocab: (from: number, to: number) => void;
}

export const VocabComposer: React.FC<VocabComposerProps> = ({
  vocabList,
  onAddVocab,
  onUpdateVocab,
  onRemoveVocab,
  onReorderVocab,
}) => {
  const { activePlayingId, play } = useStudioAudioPlayer();

  // Stable ClientId-based updater
  const handleUpdateByClientId = useCallback(
    (clientId: string, patch: Partial<StudioVocabDraft>) => {
      const idx = vocabList.findIndex((v) => v._clientId === clientId);
      if (idx !== -1) {
        onUpdateVocab(idx, patch);
      }
    },
    [vocabList, onUpdateVocab]
  );

  // Stable ClientId-based remover
  const handleRemoveByClientId = useCallback(
    (clientId: string) => {
      const idx = vocabList.findIndex((v) => v._clientId === clientId);
      if (idx !== -1) {
        onRemoveVocab(idx);
      }
    },
    [vocabList, onRemoveVocab]
  );

  // Reordering handlers
  const handleMoveUp = useCallback(
    (index: number) => {
      if (index > 0) {
        onReorderVocab(index, index - 1);
      }
    },
    [onReorderVocab]
  );

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index < vocabList.length - 1) {
        onReorderVocab(index, index + 1);
      }
    },
    [vocabList.length, onReorderVocab]
  );

  // Check if any vocab item contains traditional characters
  const hasAnyTraditionalChars = useMemo(() => {
    return vocabList.some((v) => lintTraditionalChars(v.hanzi || '').length > 0);
  }, [vocabList]);

  // 1-Click Convert all traditional characters in lesson
  const handleSimplifyAll = useCallback(() => {
    vocabList.forEach((v, idx) => {
      const issues = lintTraditionalChars(v.hanzi || '');
      if (issues.length > 0) {
        let simplified = v.hanzi;
        for (const item of issues) {
          simplified = simplified.split(item.char).join(item.simplified);
        }
        onUpdateVocab(idx, { hanzi: simplified });
      }
    });
  }, [vocabList, onUpdateVocab]);

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
          <BookOpen size={20} color="var(--color-jade-primary)" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-ink-primary)' }}>
            คลังคำศัพท์ประจำบทเรียน ({vocabList.length} คำ)
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hasAnyTraditionalChars && (
            <button
              type="button"
              onClick={handleSimplifyAll}
              className="btn-tactile-secondary"
              title="แปลงตัวอักษรจีนตัวเต็มทั้งหมดในบทเรียนนี้เป็นตัวย่อทันที"
              style={{
                padding: '8px 12px',
                minHeight: '44px',
                fontSize: '13px',
                color: '#DC2626',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <RefreshCw size={14} />
              แปลงตัวย่อทั้งหมด (1-Click)
            </button>
          )}

          <button
            type="button"
            onClick={() => onAddVocab()}
            className="btn-tactile-primary"
            style={{
              padding: '8px 16px',
              minHeight: '44px',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} />
            เพิ่มคำศัพท์ใหม่
          </button>
        </div>
      </div>

      {/* Empty State Safeguard */}
      {vocabList.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '2px dashed #EAE5DE',
          }}
        >
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎴🐰</div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
            ยังไม่มีรายการคำศัพท์ในบทเรียนนี้
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', maxWidth: '360px', margin: '0 auto 20px auto' }}>
            เริ่มต้นสร้างคำศัพท์แรก เพื่อให้ผู้เรียนได้ฝึกการออกเสียง จำความหมาย และฝึกคัดลำดับขีด
          </p>
          <button
            type="button"
            onClick={() => onAddVocab()}
            className="btn-tactile-primary"
            style={{ padding: '10px 20px', minHeight: '48px', fontSize: '14px' }}
          >
            <Plus size={16} style={{ marginRight: '6px' }} />
            เพิ่มคำศัพท์แรก
          </button>
        </div>
      ) : (
        /* Vocab Cards List with clientId Keys */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {vocabList.map((vocab, index) => (
            <VocabItemCard
              key={vocab._clientId}
              vocab={vocab}
              index={index}
              totalCount={vocabList.length}
              isPlaying={activePlayingId === vocab._clientId}
              onUpdate={handleUpdateByClientId}
              onRemove={handleRemoveByClientId}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onPlayAudio={play}
            />
          ))}
        </div>
      )}
    </div>
  );
};

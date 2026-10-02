/**
 * src/components/studio/DialogueComposer.tsx
 * ---------------------------------------------------------------------------
 * Main Dialogue Composer Component for Hanzero Content Studio.
 * Features:
 * - Empty State Safeguard (prevents WSOD)
 * - Pacing Guard: Warns if dialogue length exceeds 6 lines for Tier 0-1
 * - Stable ClientId-based updaters & removals
 * - Centralized audio integration
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any'.
 */

import React, { useCallback, useMemo } from 'react';
import { Plus, MessageSquare, AlertCircle } from 'lucide-react';
import type { StudioDialogueDraft } from '../../engines/studio/studioTypes';
import { DialogueLineItem } from './DialogueLineItem';
import { useStudioAudioPlayer } from './studioAudioPlayer';

export interface DialogueComposerProps {
  dialogueList: StudioDialogueDraft[];
  tier: number;
  onAddLine: (initial?: Partial<StudioDialogueDraft>) => void;
  onUpdateLine: (index: number, patch: Partial<StudioDialogueDraft>) => void;
  onRemoveLine: (index: number) => void;
  onReorderLine: (from: number, to: number) => void;
}

export const DialogueComposer: React.FC<DialogueComposerProps> = ({
  dialogueList,
  tier,
  onAddLine,
  onUpdateLine,
  onRemoveLine,
  onReorderLine,
}) => {
  const { activePlayingId, play } = useStudioAudioPlayer();

  // Stable ClientId-based updater
  const handleUpdateByClientId = useCallback(
    (clientId: string, patch: Partial<StudioDialogueDraft>) => {
      const idx = dialogueList.findIndex((d) => d._clientId === clientId);
      if (idx !== -1) {
        onUpdateLine(idx, patch);
      }
    },
    [dialogueList, onUpdateLine]
  );

  // Stable ClientId-based remover
  const handleRemoveByClientId = useCallback(
    (clientId: string) => {
      const idx = dialogueList.findIndex((d) => d._clientId === clientId);
      if (idx !== -1) {
        onRemoveLine(idx);
      }
    },
    [dialogueList, onRemoveLine]
  );

  // Reorder Handlers
  const handleMoveUp = useCallback(
    (index: number) => {
      if (index > 0) {
        onReorderLine(index, index - 1);
      }
    },
    [onReorderLine]
  );

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index < dialogueList.length - 1) {
        onReorderLine(index, index + 1);
      }
    },
    [dialogueList.length, onReorderLine]
  );

  // Pacing Guard: Tier 0-1 dialogue length limit
  const isTooLongForBeginner = useMemo(() => {
    return tier <= 1 && dialogueList.length > 6;
  }, [tier, dialogueList.length]);

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
          <MessageSquare size={20} color="var(--color-jade-primary)" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-ink-primary)' }}>
            บทสนทนาประจำบทเรียน ({dialogueList.length} บรรทัด)
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onAddLine()}
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
          เพิ่มบรรทัดบทสนทนา
        </button>
      </div>

      {/* Pacing Guard Warning Banner */}
      {isTooLongForBeginner && (
        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertCircle size={18} color="#D97706" />
          <div style={{ fontSize: '13px', color: '#92400E' }}>
            <strong>💡 คำแนะนำจังหวะการเรียนรู้ (Pacing Guard):</strong> สำหรับ Tier {tier}{' '}
            บทสนทนาควรมีความยาว 4–6 บรรทัด เพื่อป้องกันไม่ให้เกินขีดจำกัดความจำของผู้เริ่มต้น (ปัจจุบัน: {dialogueList.length} บรรทัด)
          </div>
        </div>
      )}

      {/* Empty State Safeguard */}
      {dialogueList.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '2px dashed #EAE5DE',
          }}
        >
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬🐰</div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
            ยังไม่มีบทสนทนาในบทเรียนนี้
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', maxWidth: '380px', margin: '0 auto 20px auto' }}>
            สร้างบทสนทนาสั้นๆ ระหว่างตัวละคร A และ B เพื่อให้ผู้เรียนได้ฝึกฟังและเข้าใจรูปประโยคในสถานการณ์จริง
          </p>
          <button
            type="button"
            onClick={() => onAddLine()}
            className="btn-tactile-primary"
            style={{ padding: '10px 20px', minHeight: '48px', fontSize: '14px' }}
          >
            <Plus size={16} style={{ marginRight: '6px' }} />
            เพิ่มบทสนทนาแรก
          </button>
        </div>
      ) : (
        /* Dialogue Line Items */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {dialogueList.map((line, index) => (
            <DialogueLineItem
              key={line._clientId}
              line={line}
              index={index}
              totalCount={dialogueList.length}
              isPlaying={activePlayingId === line._clientId}
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

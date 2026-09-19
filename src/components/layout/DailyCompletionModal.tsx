/**
 * src/components/layout/DailyCompletionModal.tsx
 * Congratulatory celebration card when daily goal / milestone is reached.
 */

import React, { useEffect } from 'react';
import { Award, Sparkles, Check } from 'lucide-react';
import { playFanfare } from '../../engines/audio/audioEngine';
import bunnyImg from '../../assets/brand/mascot_bunny.jpg';

export interface DailyCompletionModalProps {
  isOpen: boolean;
  xpEarnedToday: number;
  streakCount: number;
  onClose: () => void;
}

export const DailyCompletionModal: React.FC<DailyCompletionModalProps> = ({
  isOpen,
  xpEarnedToday,
  streakCount,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      playFanfare();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-card)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          padding: '24px 20px',
          width: '100%',
          maxWidth: '380px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          animation: 'zenPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        <div style={{ position: 'relative', width: '80px', height: '80px' }}>
          <img
            src={bunnyImg}
            alt="Mascot Bunny"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '3px solid var(--color-jade-primary)',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#F59E0B',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Award size={16} />
          </div>
        </div>

        <div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--color-jade-dark)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            DAILY GOAL ACHIEVED!
          </span>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-ink-primary)', marginTop: '2px' }}>
            ภารกิจวันนี้สำเร็จแล้ว! 🌟
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
            การเรียนรู้วันละนิดอย่างสม่ำเสมอ คือกุญแจสู่ความเชี่ยวชาญภาษาจีนอย่างแท้จริง
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            width: '100%',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-ink-muted)' }}>XP ที่ได้รับ</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-jade-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Sparkles size={16} />
              <span>+{xpEarnedToday}</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-ink-muted)' }}>Streak</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#B45309' }}>
              🔥 {streakCount} วัน
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-tactile-primary"
          style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 700, gap: '6px' }}
        >
          <Check size={18} />
          <span>ลุยต่อไป / ยอดเยี่ยม</span>
        </button>
      </div>
    </div>
  );
};

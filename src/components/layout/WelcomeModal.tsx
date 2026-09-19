/**
 * src/components/layout/WelcomeModal.tsx
 * First-run Learner Onboarding Modal for Hanzero.
 *
 * Adheres strictly to:
 * - AGENTS.md §1 & Phase 4 Actionable Checklist §1
 * - Dual-Track Navigation: Track A (Tier 0 Zero-Knowledge) vs Track B (Tier 1 Direct Conversation)
 * - Zero-MP3 Voice Health Quick Check integration
 * - Mobile Touch Ergonomics: >= 44px hitbox, 320px responsive scroll
 */

import React, { useState } from 'react';
import { Sparkles, Volume2, ArrowRight } from 'lucide-react';
import bunnyImg from '../../assets/brand/mascot_bunny.jpg';
import { useVoiceHealth } from '../../hooks/useVoiceHealth';

export interface WelcomeModalProps {
  isOpen: boolean;
  onSelectTrack: (track: 'tier0' | 'tier1', silentMode: boolean) => void;
  onOpenVoiceHealth: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onSelectTrack,
  onOpenVoiceHealth,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<'tier0' | 'tier1'>('tier0');
  const [silentMode, setSilentMode] = useState<boolean>(false);
  const { healthState } = useVoiceHealth();

  if (!isOpen) return null;

  const handleStart = () => {
    onSelectTrack(selectedTrack, silentMode);
  };

  const getVoiceBadgeLabel = () => {
    if (!healthState) return 'กำลังตรวจระบบเสียง...';
    if (healthState.grade === 'optimal') return `✨ เสียงสตูดิโอพร้อม (${healthState.activeVoiceName || 'Neural'})`;
    if (healthState.grade === 'good') return `🔊 เสียงมาตรฐานพร้อม (${healthState.activeVoiceName || 'Standard'})`;
    if (healthState.grade === 'fallback') return '🌐 สตรีมเสียงผ่านเครือข่ายความละเอียดสูง';
    return '🛡️ โหมดคลื่นเสียง Tone Contour';
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 105,
        padding: '16px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-card)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
          padding: '24px 20px',
          width: '100%',
          maxWidth: '460px',
          maxHeight: '92vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          animation: 'zenPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* Mascot Header */}
        <div style={{ position: 'relative', width: '76px', height: '76px' }}>
          <img
            src={bunnyImg}
            alt="Mascot Bunny"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '3px solid var(--color-jade-primary)',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(4, 120, 87, 0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              backgroundColor: 'var(--color-jade-primary)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={14} />
          </div>
        </div>

        {/* Title & Slogan */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-ink-primary)', margin: 0 }}>
            ยินดีต้อนรับสู่ Hanzero 🐰✨
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', margin: '4px 0 0 0' }}>
            "เริ่มจาก 0 สู่ภาษาจีนคล่องตัว" เลือกเส้นทางที่คุณต้องการเริ่มต้น
          </p>
        </div>

        {/* Dual-Track Selection Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {/* Track A: Tier 0 Pinyin Mastery (Recommended) */}
          <div
            data-testid="track-card-tier0"
            onClick={() => setSelectedTrack('tier0')}
            style={{
              borderRadius: 'var(--radius-md)',
              border: selectedTrack === 'tier0' ? '2px solid var(--color-jade-primary)' : '1.5px solid var(--border-card)',
              backgroundColor: selectedTrack === 'tier0' ? 'rgba(16, 185, 129, 0.06)' : '#FFFFFF',
              padding: '14px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: selectedTrack === 'tier0' ? '0 4px 12px rgba(4, 120, 87, 0.12)' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🌱</span>
                <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                  เริ่มจาก 0 ไม่เคยเรียนจีนมาก่อน
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: 'var(--color-jade-primary)',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                แนะนำมากที่สุด
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', margin: 0, lineHeight: 1.4 }}>
              ปูพื้นฐานริมฝีปากและลิ้น (b, p, m, f) 4 วรรณยุกต์กับรถไฟเหาะ และตัวอักษรจีนแรกในชีวิต (Tier 0) โดยไม่เสียหัวใจ
            </p>
          </div>

          {/* Track B: Tier 1 Conversation Direct */}
          <div
            data-testid="track-card-tier1"
            onClick={() => setSelectedTrack('tier1')}
            style={{
              borderRadius: 'var(--radius-md)',
              border: selectedTrack === 'tier1' ? '2px solid #3B82F6' : '1.5px solid var(--border-card)',
              backgroundColor: selectedTrack === 'tier1' ? 'rgba(59, 130, 246, 0.06)' : '#FFFFFF',
              padding: '14px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: selectedTrack === 'tier1' ? '0 4px 12px rgba(59, 130, 246, 0.12)' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🚀</span>
                <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                  พอรู้พินอินแล้ว ข้ามไปบทสนทนา
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#EFF6FF',
                  color: '#1D4ED8',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #BFDBFE',
                }}
              >
                ข้ามด่านพื้นฐาน
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', margin: 0, lineHeight: 1.4 }}>
              ปลดล็อกข้ามไปเริ่มบทสนทนาจริง ทักทาย แนะนำตัว และเริ่มสะสมคลังคำศัพท์ HSK 1 (Tier 1) ได้ทันที
            </p>
          </div>
        </div>

        {/* Voice Health Strip */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FAFAF8',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-card)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <Volume2 size={16} color="var(--color-jade-dark)" style={{ flexShrink: 0 }} />
            <span
              style={{
                fontSize: '11px',
                color: 'var(--text-ink-primary)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {getVoiceBadgeLabel()}
            </span>
          </div>

          <button
            onClick={onOpenVoiceHealth}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-vermilion)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              flexShrink: 0,
              padding: '4px',
              textDecoration: 'underline',
            }}
          >
            ทดสอบ / ตั้งค่าเสียง 🎧
          </button>
        </div>

        {/* Silent Mode Toggle Switch */}
        <label
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--text-ink-secondary)',
            cursor: 'pointer',
            userSelect: 'none',
            padding: '0 4px',
          }}
        >
          <span>เปิดเสียงอ่านและเสียงประกอบอัตโนมัติ</span>
          <input
            type="checkbox"
            checked={!silentMode}
            onChange={(e) => setSilentMode(!e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: 'var(--color-jade-primary)', cursor: 'pointer' }}
          />
        </label>

        {/* Start Journey Button */}
        <button
          onClick={handleStart}
          className="btn-tactile-primary"
          style={{
            width: '100%',
            minHeight: '48px',
            fontSize: '15px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(4, 120, 87, 0.3)',
          }}
        >
          <span>เริ่มการเดินทางสู่ภาษาจีน</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

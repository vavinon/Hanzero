/**
 * src/components/layout/VoiceHealthModal.tsx
 * Tutu Bunny Voice Health & Device Voice Setup Guide Modal.
 *
 * Adheres strictly to:
 * - AGENTS.md §4.2: Presentation Layer, Zero 'any', Memory Cleanup
 * - docs/architecture/zero_mp3_audio_health_blueprint.md
 * - Technical QA: 44px touch targets, 320px responsive scroll, zero console errors
 * - Pedagogical QA: Authentic Chinese greeting, empathetic Thai copy
 * - Red Team: Audio flood debounced playback, iOS physical mute switch alert
 */

import React, { useState } from 'react';
import { Volume2, X, RefreshCw } from 'lucide-react';
import { useVoiceHealth } from '../../hooks/useVoiceHealth';
import { ClientOS, getOsVoiceGuide } from '../../engines/audio/voiceHealthEngine';

export interface VoiceHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleSilentMode?: (silent: boolean) => void;
  isSilentMode?: boolean;
}

export const VoiceHealthModal: React.FC<VoiceHealthModalProps> = ({
  isOpen,
  onClose,
  onToggleSilentMode,
  isSilentMode = false,
}) => {
  const { healthState, isLoading, isPlayingSample, testVoice, recheck } = useVoiceHealth();
  const [activeOsTab, setActiveOsTab] = useState<ClientOS>(healthState?.clientOS || 'windows');

  if (!isOpen) return null;

  const currentGuide = getOsVoiceGuide(activeOsTab);

  const getGradeInfo = () => {
    const grade = healthState?.grade || 'fallback';
    switch (grade) {
      case 'optimal':
        return {
          title: 'ยอดเยี่ยม: ระบบตรวจพบเสียงพรีเมียม (Neural Voice) ✨',
          badgeBg: '#ECFDF5',
          badgeBorder: 'var(--color-jade-primary)',
          badgeColor: 'var(--color-jade-dark)',
          icon: '🌟',
          desc: `เครื่องของคุณมีเสียงระดับสตูดิโอ (${healthState?.activeVoiceName || 'Neural TTS'}) พร้อมออกเสียงวรรณยุกต์และผันเสียงได้อย่างแม่นยำที่สุด`,
        };
      case 'good':
        return {
          title: 'ดีมาก: ระบบตรวจพบเสียงมาตรฐานในเครื่อง 👍',
          badgeBg: '#EFF6FF',
          badgeBorder: '#3B82F6',
          badgeColor: '#1D4ED8',
          icon: '🔊',
          desc: `ตรวจพบเสียงอ่านมาตรฐาน (${healthState?.activeVoiceName || 'Standard TTS'}) ออกเสียงถูกต้องพร้อมใช้งานแบบออฟไลน์ 100%`,
        };
      case 'fallback':
        return {
          title: 'โหมดสตรีมเสียงผ่านเครือข่าย 🌐',
          badgeBg: '#FFFBEB',
          badgeBorder: '#F59E0B',
          badgeColor: '#B45309',
          icon: '⚡',
          desc: 'ยังไม่พบเสียงจีนในเครื่อง ระบบจะสตรีมเสียงเจ้าของภาษาความละเอียดสูงผ่านเครือข่ายให้แบบอัตโนมัติ',
        };
      case 'unsupported':
      default:
        return {
          title: 'โหมดคลื่นเสียงสังเคราะห์ (Acoustic Fallback) 🛡️',
          badgeBg: '#F3F4F6',
          badgeBorder: '#9CA3AF',
          badgeColor: '#374151',
          icon: '🎵',
          desc: 'ออฟไลน์และไม่พบชุดเสียงในเครื่อง ระบบเปิดเกราะป้องกันแอปเงียบด้วยคลื่นเสียงวรรณยุกต์ Tone Contour',
        };
    }
  };

  const gradeInfo = getGradeInfo();

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
        zIndex: 110,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        data-testid="voice-health-modal"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-card)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          padding: '24px 20px',
          width: '100%',
          maxWidth: '460px',
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          animation: 'zenPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🐰🎧</span>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-ink-primary)', margin: 0 }}>
                ตรวจสุขภาพเสียงภาษาจีน
              </h2>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', margin: '4px 0 0 0' }}>
              Zero-MP3 Neural Audio: ชัดเจน ลื่นไหล และประหยัดพื้นที่ 100%
            </p>
          </div>
          <button
            onClick={onClose}
            data-testid="btn-close-voice-health"
            aria-label="ปิดหน้าต่าง"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-ink-secondary)',
              padding: '6px',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Current Health Status Card */}
        <div
          data-testid="voice-health-badge"
          style={{
            backgroundColor: gradeInfo.badgeBg,
            border: `1.5px solid ${gradeInfo.badgeBorder}`,
            borderRadius: 'var(--radius-md)',
            padding: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '18px' }}>{gradeInfo.icon}</span>
            <span style={{ fontWeight: 700, fontSize: '13px', color: gradeInfo.badgeColor }}>
              {gradeInfo.title}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', margin: 0, lineHeight: 1.5 }}>
            {gradeInfo.desc}
          </p>
        </div>

        {/* Interactive Sound Tester Button */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            backgroundColor: 'var(--bg-rice-paper)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            border: '1px solid var(--border-card)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
              ทดสอบเสียงพูดกระต่ายทู่ทู่
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>
              {isPlayingSample ? '🔊 กำลังออกเสียง...' : 'กดเพื่อฟัง'}
            </span>
          </div>

          <button
            onClick={() => testVoice()}
            disabled={isPlayingSample}
            className="btn-tactile-primary"
            style={{
              width: '100%',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            <Volume2 size={18} className={isPlayingSample ? 'pulse-anim' : ''} />
            <span>{isPlayingSample ? 'กำลังพูด: "你好！很高兴认识你。"' : 'ฟังเสียงตัวอย่าง: "你好！"'}</span>
          </button>

          <div style={{ fontSize: '11px', color: 'var(--text-ink-secondary)', textAlign: 'center' }}>
            พินอิน: <span style={{ color: 'var(--color-vermilion)', fontWeight: 600 }}>Nǐ hǎo! Hěn gāoxìng rènshi nǐ.</span>
          </div>
        </div>

        {/* OS Installation Guide Tabs */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
              วิธีเพิ่มเสียงแท้ประจำเครื่อง (ฟรี 1 นาที):
            </span>
            <button
              onClick={() => recheck()}
              disabled={isLoading}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-jade-dark)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <RefreshCw size={12} className={isLoading ? 'spin-anim' : ''} />
              ตรวจซ้ำ
            </button>
          </div>

          {/* OS Switcher Pills */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#EDE8DF',
              borderRadius: 'var(--radius-full)',
              padding: '2px',
              gap: '2px',
              marginBottom: '10px',
            }}
          >
            {(['windows', 'ios', 'android', 'mac'] as ClientOS[]).map((osKey) => {
              const isSelected = activeOsTab === osKey;
              const labels: Record<ClientOS, string> = {
                windows: 'Windows',
                ios: 'iOS',
                android: 'Android',
                mac: 'Mac',
                other: 'อื่นๆ',
              };

              return (
                <button
                  key={osKey}
                  data-testid={`tab-os-${osKey}`}
                  onClick={() => setActiveOsTab(osKey)}
                  style={{
                    flex: 1,
                    padding: '6px 4px',
                    minHeight: '36px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                    color: isSelected ? 'var(--color-jade-dark)' : 'var(--text-ink-secondary)',
                    boxShadow: isSelected ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {labels[osKey]}
                </button>
              );
            })}
          </div>

          {/* Step-by-Step Guide Box */}
          <div
            style={{
              backgroundColor: '#FAFAF8',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-jade-dark)', marginBottom: '2px' }}>
              {currentGuide.icon} คู่มือสำหรับ {currentGuide.osName}
            </div>
            {currentGuide.steps.map((step) => (
              <div key={step.stepNumber} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-jade-primary)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {step.stepNumber}
                </span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-ink-secondary)', lineHeight: 1.4 }}>
                    {step.description}
                  </div>
                </div>
              </div>
            ))}

            {currentGuide.tip && (
              <div
                style={{
                  marginTop: '4px',
                  padding: '8px',
                  backgroundColor: '#FEF3C7',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11px',
                  color: '#92400E',
                  lineHeight: 1.4,
                }}
              >
                {currentGuide.tip}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons / Close */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <button
            onClick={onClose}
            className="btn-tactile-secondary"
            style={{ width: '100%', minHeight: '44px', fontWeight: 700 }}
          >
            เข้าใจแล้ว / กลับสู่บทเรียน 🐰✨
          </button>

          {onToggleSilentMode && (
            <button
              onClick={() => onToggleSilentMode(!isSilentMode)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-ink-secondary)',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '6px',
                textAlign: 'center',
              }}
            >
              {isSilentMode ? '🔊 สลับเป็นโหมดเปิดเสียง' : '🔇 ต้องการเรียนเงียบๆ โดยไม่เปิดเสียง (Visual Mode)'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

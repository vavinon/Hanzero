/**
 * src/components/layout/HeaderBar.tsx
 * Sticky header bar displaying Streak, Responsive Heart Meter, XP & Level,
 * and Settings / Storage access.
 *
 * Implements Mobile 360px Responsive Rule:
 * - On viewports <= 380px: condenses 5 hearts into "❤️ x N" to prevent overflow
 * - Touch Targets >= 44x44px
 */

import React, { useState, useEffect } from 'react';
import { Flame, Heart, Sparkles, VolumeX, Volume2, Database, Award } from 'lucide-react';
import { ProgressState, PreferencesState } from '../../engines/storage/types';
import bunnyImg from '../../assets/brand/mascot_bunny.jpg';

export interface HeaderBarProps {
  progress: ProgressState;
  preferences: PreferencesState;
  practiceCorrectCount?: number;
  onToggleSilentMode: () => void;
  onOpenDevDrawer: () => void;
  onOpenReviewDeck?: () => void;
  dueCardsCount?: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  progress,
  preferences,
  practiceCorrectCount = 0,
  onToggleSilentMode,
  onOpenDevDrawer,
  onOpenReviewDeck,
  dueCardsCount = 0,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 380 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 380);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mascotTapCountRef = React.useRef<number>(0);
  const mascotTapTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMascotTap = () => {
    mascotTapCountRef.current += 1;
    if (mascotTapTimerRef.current) clearTimeout(mascotTapTimerRef.current);
    if (mascotTapCountRef.current >= 5) {
      mascotTapCountRef.current = 0;
      onOpenDevDrawer();
    } else {
      mascotTapTimerRef.current = setTimeout(() => {
        mascotTapCountRef.current = 0;
      }, 1500);
    }
  };

  const heartsCurrent = Math.max(0, Math.min(5, progress.hearts.current));
  const isStreakActive = progress.streak.count > 0;

  return (
    <header
      data-testid="header-bar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(253, 251, 247, 0.94)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      {/* Brand & Mascot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img
          src={bunnyImg}
          alt="Hanzero Tutu Bunny"
          data-testid="mascot-avatar"
          onClick={handleMascotTap}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '2px solid var(--color-jade-primary)',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--color-jade-dark)' }}>
              Hanzero
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-ink-muted)', fontWeight: 600 }}>
              汉 0
            </span>
          </div>
          <span className="header-brand-sublabel" style={{ fontSize: '10px', color: 'var(--text-ink-secondary)', fontWeight: 500 }}>
            Lv.{progress.level} นักสำรวจ
          </span>
        </div>
      </div>

      {/* Stats Cluster: Streak, Hearts, XP */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Streak */}
        <div
          data-testid="streak-badge"
          title={`Streak: เรียนติดต่อกัน ${progress.streak.count} วัน`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isStreakActive ? 'rgba(245, 158, 11, 0.12)' : 'rgba(0,0,0,0.04)',
            color: isStreakActive ? '#B45309' : 'var(--text-ink-muted)',
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          <Flame size={15} color={isStreakActive ? '#F59E0B' : 'currentColor'} fill={isStreakActive ? '#F59E0B' : 'none'} />
          <span>{progress.streak.count}</span>
        </div>

        {/* Heart Meter (Responsive Condensed on <=380px) */}
        <div
          data-testid="heart-meter"
          title={`หัวใจ: ${heartsCurrent}/5 ดวง`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '4px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: heartsCurrent > 0 ? 'rgba(220, 38, 38, 0.08)' : 'rgba(0,0,0,0.06)',
            color: 'var(--color-vermilion)',
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          <Heart size={15} color="var(--color-vermilion)" fill="var(--color-vermilion)" />
          {isSmallScreen ? (
            <span>x {heartsCurrent}</span>
          ) : (
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '10px',
                    opacity: idx <= heartsCurrent ? 1 : 0.25,
                    filter: idx <= heartsCurrent ? 'none' : 'grayscale(1)',
                  }}
                >
                  ❤️
                </span>
              ))}
            </div>
          )}
        </div>

        {/* XP */}
        <div
          data-testid="xp-badge"
          className="capsule-hide-compact"
          title={`XP สะสม: ${progress.xp} คะแนน`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '4px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            color: 'var(--color-jade-dark)',
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          <Sparkles size={14} color="var(--color-jade-primary)" fill="var(--color-jade-primary)" />
          <span>{progress.xp}</span>
        </div>

        {/* Due Cards Badge / Quick SRS Access */}
        {onOpenReviewDeck && (
          <button
            onClick={onOpenReviewDeck}
            data-testid="btn-srs-review"
            title={dueCardsCount > 0 ? `มี ${dueCardsCount} คำถึงกำหนดทบทวน` : 'คลังทบทวนคำศัพท์'}
            style={{
              padding: '4px 8px',
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-ink-secondary)',
            }}
          >
            <Award size={18} color="var(--color-jade-dark)" />
            {dueCardsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  backgroundColor: 'var(--color-vermilion)',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 700,
                  borderRadius: '10px',
                  padding: '1px 5px',
                }}
              >
                {dueCardsCount}
              </span>
            )}
          </button>
        )}

        {/* Silent Mode Toggle (Kept visible across all screen sizes) */}
        <button
          onClick={onToggleSilentMode}
          data-testid="btn-toggle-silent"
          title={preferences.silent_mode ? 'เปิดเสียง (Normal Mode)' : 'โหมดเงียบขณะเดินทาง (Silent Mode)'}
          style={{
            padding: '4px 8px',
            minHeight: '44px',
            minWidth: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-sm)',
            color: preferences.silent_mode ? 'var(--color-vermilion)' : 'var(--text-ink-secondary)',
          }}
          aria-label="สลับโหมดเงียบ"
        >
          {preferences.silent_mode ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Storage Drawer Toggle */}
        <button
          className="capsule-hide-compact"
          onClick={onOpenDevDrawer}
          data-testid="btn-toggle-dev-drawer"
          title="สถานะระบบจัดเก็บข้อมูล"
          style={{
            padding: '4px 8px',
            minHeight: '44px',
            minWidth: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-ink-secondary)',
          }}
          aria-label="เปิดแผงข้อมูล"
        >
          <Database size={17} />
        </button>
      </div>

      {/* Practice-to-Earn Sub-bar (shows only when hearts < 5) */}
      {heartsCurrent < 5 && (
        <div
          style={{
            position: 'absolute',
            bottom: '-22px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-card)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            borderRadius: '12px',
            padding: '2px 10px',
            fontSize: '10px',
            fontWeight: 600,
            color: 'var(--color-jade-dark)',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 40,
          }}
        >
          <span>ซ้อมถูกอีก {5 - practiceCorrectCount} คำ เติม 1 ❤️</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '1px',
                  backgroundColor: i <= practiceCorrectCount ? 'var(--color-jade-primary)' : '#E5E7EB',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * src/components/layout/DesktopSidebar.tsx
 * Persistent Left Navigation Sidebar for Desktop viewports (>= 1024px).
 * Provides immediate 1-click access to all core learning zones,
 * while maintaining existing testid contracts and responsive design standards.
 */

import React from 'react';
import {
  Compass,
  Layers,
  BookOpen,
  Scroll,
  Headphones,
  Sparkles,
  Palette,
  FlaskConical,
  Award,
  Library,
} from 'lucide-react';
import bunnyImg from '../../assets/brand/mascot_bunny.jpg';

export interface DesktopSidebarProps {
  currentView: 'map' | 'lesson' | 'review' | 'studio' | 'reader' | 'idiom' | 'podcast' | 'immersion' | 'vocab';
  onNavigate: (view: 'map' | 'lesson' | 'review' | 'studio' | 'reader' | 'idiom' | 'podcast' | 'immersion' | 'vocab') => void;
  dueCardsCount?: number;
  onOpenPassport?: () => void;
  onOpenTestPanel?: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentView,
  onNavigate,
  dueCardsCount = 0,
  onOpenPassport,
  onOpenTestPanel,
}) => {
  const navItems = [
    {
      id: 'vocab' as const,
      label: 'คลังคำศัพท์ HSK 3.0',
      sublabel: 'ค้นหา & ฟังเสียง ระดับ 1-9',
      icon: Library,
      testId: 'nav-item-vocab',
    },
    {
      id: 'map' as const,
      label: 'สารบัญบทเรียน',
      sublabel: 'Course Curriculum (T0 - T2)',
      icon: Compass,
      testId: 'nav-item-map',
    },
    {
      id: 'review' as const,
      label: 'คลังทบทวน SRS',
      sublabel: 'Spaced Repetition',
      icon: Layers,
      testId: 'nav-item-review',
      badge: dueCardsCount > 0 ? dueCardsCount : undefined,
    },
    {
      id: 'immersion' as const,
      label: 'หอวิชาการฮั่นหลิน',
      sublabel: 'Immersion Hub',
      icon: Sparkles,
      testId: 'nav-item-immersion',
    },
    {
      id: 'reader' as const,
      label: 'Smart Reader',
      sublabel: 'อ่านบทความจริง',
      icon: BookOpen,
      testId: 'nav-item-reader',
    },
    {
      id: 'idiom' as const,
      label: '成语 Lore & Dilemma',
      sublabel: 'สำนวนสุภาษิตจีน',
      icon: Scroll,
      testId: 'nav-item-idiom',
    },
    {
      id: 'podcast' as const,
      label: 'Commute Podcast',
      sublabel: 'ฝึกฟังความเร็วธรรมชาติ',
      icon: Headphones,
      testId: 'nav-item-podcast',
    },
    {
      id: 'studio' as const,
      label: 'Authoring Studio',
      sublabel: 'คลังสร้างสรรค์เนื้อหา',
      icon: Palette,
      testId: 'nav-item-studio',
    },
  ];

  return (
    <aside
      data-testid="desktop-sidebar"
      style={{
        width: 'var(--sidebar-desktop-width, 256px)',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid var(--border-subtle, #EAE5DE)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        flexShrink: 0,
        boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 30, 33, 0.04))',
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '20px 18px 16px 18px',
          borderBottom: '1px solid var(--border-subtle, #EAE5DE)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }}
        onClick={() => onNavigate('map')}
      >
        <img
          src={bunnyImg}
          alt="Hanzero Tutu Bunny"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: '2px solid var(--color-jade-primary, #059669)',
            objectFit: 'cover',
          }}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--color-jade-deep, #047857)' }}>
              Hanzero
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-ink-muted, #9CA3AF)', fontWeight: 600 }}>
              汉 0
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-ink-secondary, #525866)', fontWeight: 500 }}>
            เริ่มจาก 0 สู่ภาษาจีนคล่องตัว
          </div>
        </div>
      </div>

      {/* Navigation Menu List */}
      <nav
        style={{
          flex: 1,
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          overflowY: 'auto',
        }}
      >
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              data-testid={item.testId}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md, 16px)',
                backgroundColor: isActive ? 'var(--color-jade-surface, #ECFDF5)' : 'transparent',
                color: isActive ? 'var(--color-jade-deep, #047857)' : 'var(--text-ink-primary, #1C1E21)',
                border: isActive
                  ? '1px solid rgba(5, 150, 105, 0.2)'
                  : '1px solid transparent',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease',
                position: 'relative',
              }}
            >
              <Icon
                size={20}
                color={isActive ? 'var(--color-jade-primary, #059669)' : 'var(--text-ink-secondary, #525866)'}
                strokeWidth={isActive ? 2.4 : 1.8}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: isActive ? 700 : 600, lineHeight: 1.2 }}>
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: isActive ? 'var(--color-jade-primary, #059669)' : 'var(--text-ink-muted, #9CA3AF)',
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.sublabel}
                </div>
              </div>
              {item.badge !== undefined && (
                <span
                  style={{
                    backgroundColor: 'var(--color-vermilion, #DC2626)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-full, 9999px)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Utility Actions */}
      <div
        style={{
          padding: '14px 12px',
          borderTop: '1px solid var(--border-subtle, #EAE5DE)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {onOpenPassport && (
          <button
            onClick={onOpenPassport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm, 10px)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-ink-secondary, #525866)',
              backgroundColor: 'var(--bg-card-subtle, #F5F1EA)',
              width: '100%',
            }}
          >
            <Award size={16} color="#B45309" />
            <span>หนังสือเดินทางฮั่นซีโร่ 📜</span>
          </button>
        )}
        {onOpenTestPanel && (
          <button
            onClick={onOpenTestPanel}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm, 10px)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-ink-muted, #9CA3AF)',
              backgroundColor: 'transparent',
              width: '100%',
            }}
          >
            <FlaskConical size={15} />
            <span>Engine Test Lab 🧪</span>
          </button>
        )}
      </div>
    </aside>
  );
};

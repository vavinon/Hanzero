/**
 * src/components/layout/MobileLessonDrawer.tsx
 * Slide-out Off-Canvas Course Tree Navigator for Mobile & Tablet (< 1024px).
 * Allows thumb-friendly jumping to any lesson across all 63 units with zero locks.
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any', Hitbox >= 44x44px.
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Check,
  Crown,
  ChevronDown,
  ChevronRight,
  Library,
  Layers,
  Sparkles,
} from 'lucide-react';
import bunnyImg from '../../assets/brand/mascot_bunny.jpg';
import {
  MANIFEST_TIERS,
  getManifestUnitsByTier,
  searchCurriculumManifest,
  ManifestUnit,
} from '../../data/lessons/curriculumManifest';

export interface MobileLessonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeLessonId?: string;
  onSelectLesson: (unitId: string, lessonId: string) => void;
  completedLessons?: string[];
  onNavigateView?: (view: 'vocab' | 'review' | 'immersion' | 'map') => void;
}

export const MobileLessonDrawer: React.FC<MobileLessonDrawerProps> = ({
  isOpen,
  onClose,
  activeLessonId = 't0_u01_l01',
  onSelectLesson,
  completedLessons = [],
  onNavigateView,
}) => {
  const [selectedTier, setSelectedTier] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    tier0_u01: true,
  });

  const toggleUnitExpand = (unitId: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  const displayedUnits: ManifestUnit[] = useMemo(() => {
    if (searchQuery.trim()) {
      return searchCurriculumManifest(searchQuery);
    }
    return getManifestUnitsByTier(selectedTier);
  }, [selectedTier, searchQuery]);

  const currentTierInfo = useMemo(() => {
    return MANIFEST_TIERS.find((t) => t.tier === selectedTier) || MANIFEST_TIERS[0];
  }, [selectedTier]);

  if (!isOpen) return null;

  return (
    <div
      data-testid="mobile-lesson-drawer-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-start',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        data-testid="mobile-lesson-drawer-content"
        style={{
          width: '88%',
          maxWidth: '360px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--border-subtle, #EAE5DE)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAF9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={bunnyImg}
              alt="Hanzero Tutu Bunny"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid var(--color-jade-primary, #059669)',
                objectFit: 'cover',
              }}
            />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-jade-deep, #047857)' }}>
                สารบัญบทเรียน Hanzero
              </div>
              <div style={{ fontSize: '10px', color: '#6B7280' }}>
                เลือกกระโดดเรียนได้อิสระ 100%
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            data-testid="btn-close-mobile-drawer"
            style={{
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6B7280',
            }}
            aria-label="ปิดสารบัญ"
          >
            <X size={20} />
          </button>
        </div>

        {/* Global Hub Shortcuts on Mobile */}
        {onNavigateView && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              padding: '8px 12px',
              backgroundColor: '#F3F4F6',
              borderBottom: '1px solid #E5E7EB',
            }}
          >
            <button
              onClick={() => {
                onNavigateView('vocab');
                onClose();
              }}
              style={{
                minHeight: '44px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 700,
                color: '#374151',
                cursor: 'pointer',
              }}
            >
              <Library size={16} color="#059669" />
              <span>คลังคำศัพท์</span>
            </button>

            <button
              onClick={() => {
                onNavigateView('review');
                onClose();
              }}
              style={{
                minHeight: '44px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 700,
                color: '#374151',
                cursor: 'pointer',
              }}
            >
              <Layers size={16} color="#059669" />
              <span>ทบทวน SRS</span>
            </button>

            <button
              onClick={() => {
                onNavigateView('immersion');
                onClose();
              }}
              style={{
                minHeight: '44px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 700,
                color: '#374151',
                cursor: 'pointer',
              }}
            >
              <Sparkles size={16} color="#059669" />
              <span>หอวิชาการ</span>
            </button>
          </div>
        )}

        {/* Tier Selector Pills: T0 to T4 (Touch Target >= 44x44px) */}
        <div style={{ padding: '10px 12px 6px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
            {MANIFEST_TIERS.map((t) => {
              const isSelected = selectedTier === t.tier && !searchQuery;
              return (
                <button
                  key={t.tier}
                  onClick={() => {
                    setSelectedTier(t.tier);
                    setSearchQuery('');
                  }}
                  style={{
                    minHeight: '44px',
                    borderRadius: '8px',
                    border: isSelected ? '2px solid var(--color-jade-primary, #059669)' : '1px solid #E5E7EB',
                    backgroundColor: isSelected ? 'var(--color-jade-surface, #ECFDF5)' : '#FFFFFF',
                    color: isSelected ? 'var(--color-jade-deep, #047857)' : '#4B5563',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span>T{t.tier}</span>
                </button>
              );
            })}
          </div>

          {!searchQuery && (
            <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600 }}>
              <span style={{ color: 'var(--color-jade-deep)', fontWeight: 800 }}>T{currentTierInfo.tier}: </span>
              {currentTierInfo.taglineTh}
            </div>
          )}

          {/* Search Input Filter */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="ค้นหาบทเรียน (อาหาร, รถไฟ, พินอิน)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 32px',
                fontSize: '13px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                backgroundColor: '#F9FAFB',
                outline: 'none',
                boxSizing: 'border-box',
                minHeight: '44px',
              }}
            />
          </div>
        </div>

        {/* Scrollable Unit & Lesson List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {displayedUnits.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
              ไม่พบบทเรียนที่ตรงกับคำค้นหา 🐰
            </div>
          ) : (
            displayedUnits.map((unit) => {
              const isExpanded = expandedUnits[unit.unitId] || Boolean(searchQuery);
              const completedCount = unit.lessons.filter((l) => completedLessons.includes(l.lessonId)).length;
              const isUnitFullyCompleted = completedCount > 0 && completedCount === unit.lessons.length;

              return (
                <div
                  key={unit.unitId}
                  style={{
                    borderRadius: '10px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: isExpanded ? '#FAFAF9' : '#FFFFFF',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    onClick={() => toggleUnitExpand(unit.unitId)}
                    style={{
                      padding: '10px 12px',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '16px' }}>{unit.icon}</span>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Unit {unit.unitNumber}: {unit.title.th}
                        </div>
                        <div style={{ fontSize: '11px', color: '#6B7280' }}>
                          {unit.title.zh} • {unit.totalLessons} บท
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isUnitFullyCompleted && <Check size={16} color="#059669" strokeWidth={2.5} />}
                      {isExpanded ? <ChevronDown size={16} color="#9CA3AF" /> : <ChevronRight size={16} color="#9CA3AF" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      style={{
                        padding: '4px 8px 8px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        borderTop: '1px dashed #E5E7EB',
                      }}
                    >
                      {unit.lessons.map((lesson) => {
                        const isCompleted = completedLessons.includes(lesson.lessonId);
                        const isActive = activeLessonId === lesson.lessonId;

                        return (
                          <button
                            key={lesson.lessonId}
                            onClick={() => {
                              onSelectLesson(unit.unitId, lesson.lessonId);
                              onClose();
                            }}
                            style={{
                              minHeight: '44px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              backgroundColor: isActive ? 'var(--color-jade-surface, #ECFDF5)' : '#FFFFFF',
                              border: isActive ? '1.5px solid var(--color-jade-primary, #059669)' : '1px solid #F3F4F6',
                              color: isActive ? 'var(--color-jade-deep, #047857)' : '#1F2937',
                              fontWeight: isActive ? 700 : 500,
                              fontSize: '12px',
                              cursor: 'pointer',
                              textAlign: 'left',
                              width: '100%',
                            }}
                          >
                            <div style={{ width: '16px', display: 'flex', justifyContent: 'center' }}>
                              {isCompleted ? (
                                <Check size={14} color="#059669" strokeWidth={2.5} />
                              ) : lesson.isBoss ? (
                                <Crown size={14} color="#D97706" />
                              ) : (
                                <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700 }}>
                                  {lesson.lessonNumber}
                                </span>
                              )}
                            </div>

                            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              <span>{lesson.title.th}</span>
                              <span style={{ color: '#6B7280', fontSize: '11px', marginLeft: '4px' }}>
                                ({lesson.title.zh})
                              </span>
                            </div>

                            {lesson.isBoss && (
                              <span
                                style={{
                                  fontSize: '9px',
                                  backgroundColor: '#FEF3C7',
                                  color: '#92400E',
                                  padding: '2px 5px',
                                  borderRadius: '4px',
                                  fontWeight: 800,
                                }}
                              >
                                BOSS
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileLessonDrawer;

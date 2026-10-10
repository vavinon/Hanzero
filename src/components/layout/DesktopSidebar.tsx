/**
 * src/components/layout/DesktopSidebar.tsx
 * Persistent Left Navigation Sidebar for Desktop viewports (>= 1024px).
 * Features:
 * - Dual-Zone: Global Hubs (Vocab, SRS, Immersion) + Interactive Course Tree Navigator
 * - All 63 Units (Tier 0 to Tier 4) with zero lock-in (Jump to any lesson in 1-click)
 * - Defaults to Step 0 (Tier 0: Pinyin & Strokes)
 * - Strict Typing, Zero 'any', High Breathing Room.
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Layers,
  Sparkles,
  Award,
  FlaskConical,
  Library,
  ChevronDown,
  ChevronRight,
  Check,
  Crown,
  Search,
  BookOpen,
  Scroll,
  Headphones,
  Palette,
  X,
} from 'lucide-react';
import bunnyImg from '../../assets/brand/mascot_bunny.jpg';
import {
  MANIFEST_TIERS,
  MANIFEST_UNITS,
  getManifestUnitsByTier,
  searchCurriculumManifest,
  ManifestUnit,
} from '../../data/lessons/curriculumManifest';

export interface DesktopSidebarProps {
  currentView: 'map' | 'lesson' | 'review' | 'studio' | 'reader' | 'idiom' | 'podcast' | 'immersion' | 'vocab';
  onNavigate: (view: 'map' | 'lesson' | 'review' | 'studio' | 'reader' | 'idiom' | 'podcast' | 'immersion' | 'vocab') => void;
  dueCardsCount?: number;
  onOpenPassport?: () => void;
  onOpenTestPanel?: () => void;
  activeLessonId?: string;
  onSelectLesson?: (unitId: string, lessonId: string) => void;
  completedLessons?: string[];
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentView,
  onNavigate,
  dueCardsCount = 0,
  onOpenPassport,
  onOpenTestPanel,
  activeLessonId = 't0_u01_l01',
  onSelectLesson,
  completedLessons = [],
}) => {
  // Tier Selection: 0 (Tier 0 Step 0) by default!
  const [selectedTier, setSelectedTier] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAdvancedTools, setShowAdvancedTools] = useState<boolean>(false);

  // Auto-expand the unit that contains activeLessonId
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = { tier0_u01: true };
    for (const u of MANIFEST_UNITS) {
      if (u.lessons.some((l) => l.lessonId === activeLessonId)) {
        initial[u.unitId] = true;
      }
    }
    return initial;
  });

  // Whenever activeLessonId changes, expand its parent unit and switch to that tier
  useEffect(() => {
    for (const u of MANIFEST_UNITS) {
      if (u.lessons.some((l) => l.lessonId === activeLessonId)) {
        setSelectedTier(u.tier);
        setExpandedUnits((prev) => ({ ...prev, [u.unitId]: true }));
        break;
      }
    }
  }, [activeLessonId]);

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

  return (
    <aside
      data-testid="desktop-sidebar"
      style={{
        width: 'var(--sidebar-desktop-width, 280px)',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid var(--border-subtle, #EAE5DE)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        position: 'relative',
        zIndex: 40,
        flexShrink: 0,
        boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 30, 33, 0.04))',
        overflow: 'hidden',
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '16px 16px 12px 16px',
          borderBottom: '1px solid var(--border-subtle, #EAE5DE)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          flexShrink: 0,
        }}
        onClick={() => onNavigate('map')}
      >
        <img
          src={bunnyImg}
          alt="Hanzero Tutu Bunny"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: '2px solid var(--color-jade-primary, #059669)',
            objectFit: 'cover',
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, fontSize: '17px', color: 'var(--color-jade-deep, #047857)' }}>
              Hanzero
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-ink-muted, #9CA3AF)', fontWeight: 700 }}>
              汉 0
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-ink-secondary, #525866)', fontWeight: 500 }}>
            เริ่มจาก 0 สู่ภาษาจีนคล่องตัว
          </div>
        </div>
      </div>

      {/* Top Global Hubs */}
      <div
        style={{
          padding: '10px 10px 6px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          borderBottom: '1px solid var(--border-subtle, #EAE5DE)',
          flexShrink: 0,
        }}
      >
        <button
          data-testid="nav-item-vocab"
          onClick={() => onNavigate('vocab')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm, 10px)',
            backgroundColor: currentView === 'vocab' ? 'var(--color-jade-surface, #ECFDF5)' : 'transparent',
            color: currentView === 'vocab' ? 'var(--color-jade-deep, #047857)' : 'var(--text-ink-primary, #1C1E21)',
            border: currentView === 'vocab' ? '1px solid rgba(5, 150, 105, 0.2)' : '1px solid transparent',
            fontWeight: currentView === 'vocab' ? 700 : 600,
            fontSize: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <Library size={16} color={currentView === 'vocab' ? '#059669' : '#6B7280'} />
          <span style={{ flex: 1 }}>คลังคำศัพท์ HSK 3.0 (5,363 คำ)</span>
        </button>

        <button
          data-testid="nav-item-review"
          onClick={() => onNavigate('review')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm, 10px)',
            backgroundColor: currentView === 'review' ? 'var(--color-jade-surface, #ECFDF5)' : 'transparent',
            color: currentView === 'review' ? 'var(--color-jade-deep, #047857)' : 'var(--text-ink-primary, #1C1E21)',
            border: currentView === 'review' ? '1px solid rgba(5, 150, 105, 0.2)' : '1px solid transparent',
            fontWeight: currentView === 'review' ? 700 : 600,
            fontSize: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <Layers size={16} color={currentView === 'review' ? '#059669' : '#6B7280'} />
          <span style={{ flex: 1 }}>คลังทบทวนคำศัพท์ SRS</span>
          {dueCardsCount > 0 && (
            <span
              style={{
                backgroundColor: 'var(--color-vermilion, #DC2626)',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '9999px',
              }}
            >
              {dueCardsCount}
            </span>
          )}
        </button>

        <button
          data-testid="nav-item-immersion"
          onClick={() => onNavigate('immersion')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm, 10px)',
            backgroundColor: currentView === 'immersion' ? 'var(--color-jade-surface, #ECFDF5)' : 'transparent',
            color: currentView === 'immersion' ? 'var(--color-jade-deep, #047857)' : 'var(--text-ink-primary, #1C1E21)',
            border: currentView === 'immersion' ? '1px solid rgba(5, 150, 105, 0.2)' : '1px solid transparent',
            fontWeight: currentView === 'immersion' ? 700 : 600,
            fontSize: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <Sparkles size={16} color={currentView === 'immersion' ? '#059669' : '#6B7280'} />
          <span style={{ flex: 1 }}>หอวิชาการฮั่นหลิน (Immersion Hub)</span>
        </button>
      </div>

      {/* Course Tree Navigator Header */}
      <div style={{ padding: '12px 12px 6px 12px', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-ink-muted, #9CA3AF)', letterSpacing: '0.04em' }}>
            📑 สารบัญบทเรียน (กระโดดได้อิสระ)
          </span>
          <button
            data-testid="nav-item-map"
            onClick={() => onNavigate('map')}
            style={{
              fontSize: '11px',
              color: 'var(--color-jade-deep, #047857)',
              fontWeight: 700,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            ภาพรวม
          </button>
        </div>

        {/* Tier Selector Pills: T0, T1, T2, T3, T4 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
          {MANIFEST_TIERS.map((t) => {
            const isSelected = selectedTier === t.tier && !searchQuery;
            return (
              <button
                key={t.tier}
                onClick={() => {
                  setSelectedTier(t.tier);
                  setSearchQuery('');
                }}
                title={`${t.nameTh} (${t.unitCount} หมวด)`}
                style={{
                  padding: '6px 2px',
                  borderRadius: '6px',
                  border: isSelected ? '1.5px solid var(--color-jade-primary, #059669)' : '1px solid var(--border-subtle, #EAE5DE)',
                  backgroundColor: isSelected ? 'var(--color-jade-surface, #ECFDF5)' : '#F9FAFB',
                  color: isSelected ? 'var(--color-jade-deep, #047857)' : 'var(--text-ink-secondary, #4B5563)',
                  fontWeight: 800,
                  fontSize: '11px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                T{t.tier}
              </button>
            );
          })}
        </div>

        {/* Active Tier Tagline */}
        {!searchQuery && (
          <div style={{ fontSize: '11px', color: 'var(--text-ink-secondary)', fontWeight: 600, lineHeight: 1.3 }}>
            <span style={{ color: 'var(--color-jade-deep)', fontWeight: 800 }}>T{currentTierInfo.tier}: </span>
            {currentTierInfo.taglineTh}
          </div>
        )}

        {/* Search Input Filter */}
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="ค้นหาบทเรียน (อาหาร, รถไฟ, พินอิน)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 26px 6px 28px',
              fontSize: '11px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle, #EAE5DE)',
              backgroundColor: '#F9FAFB',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '6px',
                top: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px',
                color: '#9CA3AF',
              }}
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Course Tree List (Scrollable Area) */}
      <div
        className="course-tree-scroll-area"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          padding: '6px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {displayedUnits.length === 0 ? (
          <div style={{ padding: '24px 12px', textAlign: 'center', color: '#9CA3AF', fontSize: '12px' }}>
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
                  borderRadius: '8px',
                  backgroundColor: isExpanded ? '#FAFAF9' : 'transparent',
                  border: isExpanded ? '1px solid var(--border-subtle, #EAE5DE)' : '1px solid transparent',
                  overflow: 'hidden',
                  transition: 'background-color 0.15s ease',
                  flexShrink: 0,
                }}
              >
                {/* Unit Accordion Header */}
                <div
                  onClick={() => toggleUnitExpand(unit.unitId)}
                  style={{
                    padding: '8px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                    <span style={{ fontSize: '13px' }}>{unit.icon}</span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--text-ink-primary, #1C1E21)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        Unit {unit.unitNumber}: {unit.title.th}
                      </div>
                      <div style={{ fontSize: '10px', color: '#6B7280' }}>
                        {unit.title.zh} • {unit.totalLessons} บท
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isUnitFullyCompleted && (
                      <span title="พิชิตหมวดนี้แล้ว!" style={{ color: '#059669', display: 'flex' }}>
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                    )}
                    {isExpanded ? <ChevronDown size={14} color="#9CA3AF" /> : <ChevronRight size={14} color="#9CA3AF" />}
                  </div>
                </div>

                {/* Sub-lessons List */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '2px 6px 6px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      borderTop: '1px dashed #E5E7EB',
                    }}
                  >
                    {unit.lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.lessonId);
                      const isActive = activeLessonId === lesson.lessonId && currentView === 'lesson';

                      return (
                        <button
                          key={lesson.lessonId}
                          onClick={() => {
                            if (onSelectLesson) {
                              onSelectLesson(unit.unitId, lesson.lessonId);
                            } else {
                              onNavigate('lesson');
                            }
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            backgroundColor: isActive ? 'var(--color-jade-surface, #ECFDF5)' : '#FFFFFF',
                            border: isActive ? '1px solid var(--color-jade-primary, #059669)' : '1px solid #F3F4F6',
                            color: isActive ? 'var(--color-jade-deep, #047857)' : 'var(--text-ink-primary, #1C1E21)',
                            fontWeight: isActive ? 700 : 500,
                            fontSize: '11px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            width: '100%',
                            transition: 'all 0.1s ease',
                          }}
                        >
                          {/* Status Icon */}
                          <div style={{ flexShrink: 0, width: '14px', display: 'flex', justifyContent: 'center' }}>
                            {isCompleted ? (
                              <Check size={12} color="#059669" strokeWidth={2.5} />
                            ) : lesson.isBoss ? (
                              <Crown size={12} color="#D97706" />
                            ) : (
                              <span style={{ fontSize: '9px', color: '#9CA3AF', fontWeight: 700 }}>
                                {lesson.lessonNumber}
                              </span>
                            )}
                          </div>

                          {/* Lesson Title */}
                          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <span>{lesson.title.th}</span>
                            <span style={{ color: '#6B7280', fontSize: '10px', marginLeft: '4px' }}>
                              ({lesson.title.zh})
                            </span>
                          </div>

                          {lesson.isBoss && (
                            <span
                              style={{
                                fontSize: '9px',
                                backgroundColor: '#FEF3C7',
                                color: '#92400E',
                                padding: '1px 4px',
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

      {/* Advanced Tools Collapsible Section */}
      <div style={{ borderTop: '1px solid var(--border-subtle, #EAE5DE)', padding: '6px 10px', flexShrink: 0 }}>
        <button
          onClick={() => setShowAdvancedTools(!showAdvancedTools)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '4px 6px',
            background: 'none',
            border: 'none',
            fontSize: '11px',
            color: 'var(--text-ink-muted, #9CA3AF)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <span>เครื่องมือขั้นสูง & วัฒนธรรม</span>
          {showAdvancedTools ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>

        {showAdvancedTools && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
            <button
              data-testid="nav-item-reader"
              onClick={() => onNavigate('reader')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                borderRadius: '6px',
                background: currentView === 'reader' ? 'var(--color-jade-surface)' : 'transparent',
                color: currentView === 'reader' ? 'var(--color-jade-deep)' : '#4B5563',
                border: 'none',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <BookOpen size={14} />
              <span>Smart Immersion Reader</span>
            </button>

            <button
              data-testid="nav-item-idiom"
              onClick={() => onNavigate('idiom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                borderRadius: '6px',
                background: currentView === 'idiom' ? 'var(--color-jade-surface)' : 'transparent',
                color: currentView === 'idiom' ? 'var(--color-jade-deep)' : '#4B5563',
                border: 'none',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Scroll size={14} />
              <span>成语 Lore & Dilemma</span>
            </button>

            <button
              data-testid="nav-item-podcast"
              onClick={() => onNavigate('podcast')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                borderRadius: '6px',
                background: currentView === 'podcast' ? 'var(--color-jade-surface)' : 'transparent',
                color: currentView === 'podcast' ? 'var(--color-jade-deep)' : '#4B5563',
                border: 'none',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Headphones size={14} />
              <span>Commute Podcast</span>
            </button>

            <button
              data-testid="nav-item-studio"
              onClick={() => onNavigate('studio')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                borderRadius: '6px',
                background: currentView === 'studio' ? 'var(--color-jade-surface)' : 'transparent',
                color: currentView === 'studio' ? 'var(--color-jade-deep)' : '#4B5563',
                border: 'none',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Palette size={14} />
              <span>Content Authoring Studio</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Utility Actions */}
      <div
        style={{
          padding: '8px 10px',
          borderTop: '1px solid var(--border-subtle, #EAE5DE)',
          display: 'flex',
          gap: '4px',
          flexShrink: 0,
        }}
      >
        {onOpenPassport && (
          <button
            onClick={onOpenPassport}
            title="หนังสือเดินทางฮั่นซีโร่ 📜"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px 8px',
              borderRadius: 'var(--radius-sm, 8px)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-ink-secondary, #525866)',
              backgroundColor: 'var(--bg-card-subtle, #F5F1EA)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Award size={14} color="#B45309" />
            <span>พาสปอร์ต</span>
          </button>
        )}
        {onOpenTestPanel && (
          <button
            onClick={onOpenTestPanel}
            title="Engine Test Lab 🧪"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm, 8px)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-ink-muted, #9CA3AF)',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-subtle, #EAE5DE)',
              cursor: 'pointer',
            }}
          >
            <FlaskConical size={14} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default DesktopSidebar;

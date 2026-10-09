/**
 * src/components/directory/CourseDirectoryView.tsx
 * Universal Course Directory & Learning Horizon (All 63 Units, Tiers 0 to 4).
 * Allows users to freely browse and jump to any lesson without forced linear locks:
 * - 🌱 Tier 0: ปูพื้นฐานพินอิน & 8 เส้นขีด (Step 0)
 * - 🌿 Tier 1: เอาตัวรอดในชีวิตประจำวัน (HSK 1-2)
 * - 🎋 Tier 2: เที่ยวจีน & ดิจิทัลไลฟ์สไตล์ (HSK 3-4)
 * - 🐉 Tier 3: ทำงาน สังคม & วัฒนธรรม (HSK 5-6)
 * - 👑 Tier 4: วรรณกรรม & การทูต (HSK 7-9)
 * Features Compact List vs Detailed Cards view toggle, instant search, and Absolute Zero callout.
 */

import React, { useState, useMemo } from 'react';
import {
  CheckCircle,
  ArrowRight,
  Search,
  Crown,
  LayoutList,
  LayoutGrid,
  BookOpen,
} from 'lucide-react';
import {
  MANIFEST_TIERS,
  getManifestUnitsByTier,
  searchCurriculumManifest,
  ManifestUnit,
} from '../../data/lessons/curriculumManifest';

export interface CourseDirectoryViewProps {
  onSelectLesson: (unitId: string, lessonId: string) => void;
  completedLessons?: string[];
  onOpenVocabLibrary?: () => void;
}

export const CourseDirectoryView: React.FC<CourseDirectoryViewProps> = ({
  onSelectLesson,
  completedLessons = [],
  onOpenVocabLibrary,
}) => {
  // Default to Tier 0 (Step 0) for zero-knowledge beginners!
  const [activeTier, setActiveTier] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('compact');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const displayedUnits: ManifestUnit[] = useMemo(() => {
    if (searchQuery.trim()) {
      return searchCurriculumManifest(searchQuery);
    }
    return getManifestUnitsByTier(activeTier);
  }, [activeTier, searchQuery]);

  const currentTierInfo = useMemo(() => {
    return MANIFEST_TIERS.find((t) => t.tier === activeTier) || MANIFEST_TIERS[0];
  }, [activeTier]);

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 16px 48px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Absolute Zero Callout Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #047857 60%, #059669 100%)',
          borderRadius: 'var(--radius-xl, 20px)',
          padding: '24px 22px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 8px 24px rgba(4, 120, 87, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '20px' }}>
              🐰 Hanzero Open Curriculum
            </span>
            <span style={{ fontSize: '13px', opacity: 0.9 }}>สารบัญบทเรียนเปิดกว้าง 63 หมวด</span>
          </div>
          {onOpenVocabLibrary && (
            <button
              onClick={onOpenVocabLibrary}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#047857',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full, 9999px)',
                fontWeight: 700,
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <BookOpen size={14} />
              <span>เปิดคลังคำศัพท์ HSK 5,363 คำ</span>
            </button>
          )}
        </div>

        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px 0', lineHeight: 1.2 }}>
            เริ่มจาก 0 สู่ภาษาจีนคล่องตัว 🇨🇳
          </h1>
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.9, maxWidth: '680px', lineHeight: 1.5 }}>
            เลือกเรียนหัวข้อที่สนใจได้ทันทีแบบไม่ต้องเรียง! ไม่ว่าจะเป็นการปูพื้นฐานพินอิน, บทสนทนาเอาชีวิตรอด, หรือสแกนจ่ายเงินและเดินทาง
          </p>
        </div>

        {/* Absolute Zero Quick Jump Callout */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(4px)',
            borderRadius: '12px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🌱</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '13px' }}>
                เพิ่งเริ่มต้นเรียนจีนครั้งแรกใช่ไหม?
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                แนะนำเริ่มต้นที่ Tier 0: ปูพื้นฐานพินอินและ 8 เส้นขีด (Step 0) เพื่อสร้างความคุ้นเคยก่อน
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectLesson('tier0_u01', 't0_u01_l01')}
            style={{
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>เริ่มเรียนขั้น 0 ทันที</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Tier Switcher Navigation (5 Tiers) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
        }}
      >
        {MANIFEST_TIERS.map((t) => {
          const isSelected = activeTier === t.tier && !searchQuery;
          return (
            <button
              key={t.tier}
              onClick={() => {
                setActiveTier(t.tier);
                setSearchQuery('');
              }}
              style={{
                padding: '12px 10px',
                borderRadius: '12px',
                border: isSelected ? '2px solid var(--color-jade-primary, #059669)' : '1px solid var(--border-subtle, #EAE5DE)',
                backgroundColor: isSelected ? 'var(--color-jade-surface, #ECFDF5)' : '#FFFFFF',
                color: isSelected ? 'var(--color-jade-deep, #047857)' : 'var(--text-ink-secondary, #4B5563)',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px' }}>{t.badgeIcon} T{t.tier}</span>
                <span style={{ fontSize: '10px', color: '#6B7280', fontWeight: 600 }}>{t.unitCount} หมวด</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '2px' }}>
                {t.nameTh.split(':')[1]?.trim() || t.nameTh}
              </div>
              <div style={{ fontSize: '10px', color: '#9CA3AF' }}>
                {t.hskLevel}
              </div>
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Search & View Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          backgroundColor: '#FFFFFF',
          padding: '10px 14px',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle, #EAE5DE)',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="ค้นหาหมวดเรียนหรือคำศัพท์ (เช่น อาหาร, รถไฟ, ตัวเลข, พินอิน)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              fontSize: '12px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#F3F4F6', padding: '3px', borderRadius: '8px' }}>
          <button
            onClick={() => setViewMode('compact')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: viewMode === 'compact' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'compact' ? 'var(--color-jade-deep, #047857)' : '#6B7280',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              boxShadow: viewMode === 'compact' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <LayoutList size={14} />
            <span>สารบัญกระชับ</span>
          </button>

          <button
            onClick={() => setViewMode('detailed')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: viewMode === 'detailed' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'detailed' ? 'var(--color-jade-deep, #047857)' : '#6B7280',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              boxShadow: viewMode === 'detailed' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <LayoutGrid size={14} />
            <span>การ์ดละเอียด</span>
          </button>
        </div>
      </div>

      {/* Active Tier Info Summary */}
      {!searchQuery && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#4B5563',
            padding: '2px 4px',
          }}
        >
          <span>
            {currentTierInfo.badgeIcon} กำลังแสดง: <strong>{currentTierInfo.nameTh}</strong> ({currentTierInfo.hskLevel})
          </span>
          <span style={{ fontSize: '11px', color: '#6B7280' }}>
            ทั้งหมด {currentTierInfo.unitCount} หมวด
          </span>
        </div>
      )}

      {/* Curriculum Units Listing */}
      {displayedUnits.length === 0 ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '48px 16px',
            textAlign: 'center',
            color: '#6B7280',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🐰🔍</div>
          <div style={{ fontWeight: 700 }}>ไม่พบบทเรียนที่ตรงกับคำค้นหา</div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>ลองเปลี่ยนคำค้นหาเป็นภาษาไทยหรือภาษาจีน</div>
        </div>
      ) : viewMode === 'compact' ? (
        /* COMPACT LIST VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {displayedUnits.map((unit) => {
            const completedCount = unit.lessons.filter((l) => completedLessons.includes(l.lessonId)).length;
            const isFullyCompleted = completedCount > 0 && completedCount === unit.lessons.length;

            return (
              <div
                key={unit.unitId}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle, #EAE5DE)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  transition: 'border-color 0.15s ease',
                }}
              >
                {/* Unit Header Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px', flex: 1 }}>
                  <span style={{ fontSize: '20px' }}>{unit.icon}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          backgroundColor: 'var(--color-jade-surface, #ECFDF5)',
                          color: 'var(--color-jade-deep, #047857)',
                          padding: '1px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        Unit {unit.unitNumber}
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '14px', color: '#111827' }}>
                        {unit.title.th}
                      </span>
                      <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                        ({unit.title.zh})
                      </span>
                      {isFullyCompleted && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            backgroundColor: '#ECFDF5',
                            color: '#047857',
                            padding: '1px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          ผ่านครบแล้ว 🎉
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                      {unit.description}
                    </div>
                  </div>
                </div>

                {/* Sub-lessons Quick Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  {unit.lessons.map((lesson) => {
                    const isLessonDone = completedLessons.includes(lesson.lessonId);
                    return (
                      <button
                        key={lesson.lessonId}
                        onClick={() => onSelectLesson(unit.unitId, lesson.lessonId)}
                        title={`${lesson.title.th} (${lesson.title.zh}) - ${lesson.canDo.th}`}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: isLessonDone ? '1px solid #059669' : '1px solid #E5E7EB',
                          backgroundColor: isLessonDone ? '#ECFDF5' : '#F9FAFB',
                          color: isLessonDone ? '#047857' : '#374151',
                          fontWeight: 700,
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {isLessonDone ? (
                          <CheckCircle size={12} color="#059669" />
                        ) : lesson.isBoss ? (
                          <Crown size={12} color="#D97706" />
                        ) : null}
                        <span>บท {lesson.lessonNumber}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DETAILED CARDS VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {displayedUnits.map((unit) => (
            <div
              key={unit.unitId}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid var(--border-subtle, #EAE5DE)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{unit.icon}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          backgroundColor: 'var(--color-jade-surface, #ECFDF5)',
                          color: 'var(--color-jade-deep, #047857)',
                          fontWeight: 800,
                          fontSize: '11px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        Unit {unit.unitNumber}
                      </span>
                      <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>
                        {unit.title.th} ({unit.title.zh})
                      </h2>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6B7280' }}>
                      {unit.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-lessons Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '10px',
                }}
              >
                {unit.lessons.map((lesson) => {
                  const isDone = completedLessons.includes(lesson.lessonId);
                  return (
                    <div
                      key={lesson.lessonId}
                      onClick={() => onSelectLesson(unit.unitId, lesson.lessonId)}
                      style={{
                        border: isDone ? '1px solid #059669' : '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        backgroundColor: isDone ? '#F0FDF4' : '#FAFAF9',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 700 }}>
                          บทที่ {lesson.lessonNumber}
                        </span>
                        {isDone ? (
                          <span style={{ color: '#059669', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <CheckCircle size={12} />
                            <span>เรียนแล้ว</span>
                          </span>
                        ) : lesson.isBoss ? (
                          <span style={{ color: '#D97706', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Crown size={12} />
                            <span>Boss Challenge</span>
                          </span>
                        ) : null}
                      </div>

                      <div style={{ fontWeight: 800, fontSize: '14px', color: '#111827' }}>
                        {lesson.title.th}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-jade-deep, #047857)', fontWeight: 600 }}>
                        {lesson.title.zh}
                      </div>

                      {lesson.canDo && (
                        <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.3, marginTop: '2px' }}>
                          🎯 {lesson.canDo.th}
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-jade-deep)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <span>เข้าเรียน</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDirectoryView;

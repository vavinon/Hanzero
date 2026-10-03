/**
 * src/components/directory/CourseDirectoryView.tsx
 * Open Course Directory (Curriculum Catalog).
 * Allows users to freely browse and choose any lesson across:
 * - 🌱 Tier 0: ปูพื้นฐานพินอิน (Pinyin Foundation - 6 Units)
 * - 🌿 Tier 1: เอาตัวรอดในชีวิตประจำวัน (Survival Chinese - 10 Units)
 * All lessons are open and accessible with zero locks.
 */

import React, { useState } from 'react';
import { CheckCircle, Volume2, ArrowRight } from 'lucide-react';
import { tier0Units } from '../../data/lessons/tier0';
import { tier1Units } from '../../data/lessons/tier1';

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
  const [activeTierTab, setActiveTierTab] = useState<'tier0' | 'tier1'>('tier1');

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 16px 48px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Banner Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #047857 60%, #059669 100%)',
          borderRadius: 'var(--radius-xl, 20px)',
          padding: '28px 24px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 8px 24px rgba(4, 120, 87, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '20px' }}>
            🐰 Hanzero Open Curriculum
          </span>
          <span style={{ fontSize: '13px', opacity: 0.9 }}>สารบัญบทเรียนเปิดกว้าง</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          เริ่มจาก 0 สู่ภาษาจีนคล่องตัว 🇨🇳
        </h1>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, maxWidth: '640px', lineHeight: 1.5 }}>
          เลือกเรียนหัวข้อที่สนใจได้ทันทีโดยไม่มีการล็อกกุญแจ! ไม่ว่าจะเป็นการปูพื้นฐานพินอิน หรือบทสนทนาเอาชีวิตรอด สั่งอาหาร ชานม และช็อปปิ้ง
        </p>

        {onOpenVocabLibrary && (
          <div style={{ marginTop: '6px' }}>
            <button
              onClick={onOpenVocabLibrary}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#047857',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <span>📚 เปิดค้นหาคลังคำศัพท์ HSK 3.0 ทั้งหมด</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Tier Switcher Tabs */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setActiveTierTab('tier1')}
          style={{
            flex: 1,
            padding: '14px 16px',
            borderRadius: 'var(--radius-lg, 16px)',
            border: activeTierTab === 'tier1' ? '2px solid var(--color-jade-primary)' : '1px solid var(--border-subtle)',
            backgroundColor: activeTierTab === 'tier1' ? 'var(--color-jade-surface)' : '#FFFFFF',
            color: activeTierTab === 'tier1' ? 'var(--color-jade-deep)' : 'var(--text-ink-secondary)',
            fontWeight: 800,
            fontSize: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
          }}
        >
          <span>🌿 Tier 1: เอาตัวรอดในชีวิตประจำวัน (10 หมวด)</span>
        </button>

        <button
          onClick={() => setActiveTierTab('tier0')}
          style={{
            flex: 1,
            padding: '14px 16px',
            borderRadius: 'var(--radius-lg, 16px)',
            border: activeTierTab === 'tier0' ? '2px solid var(--color-jade-primary)' : '1px solid var(--border-subtle)',
            backgroundColor: activeTierTab === 'tier0' ? 'var(--color-jade-surface)' : '#FFFFFF',
            color: activeTierTab === 'tier0' ? 'var(--color-jade-deep)' : 'var(--text-ink-secondary)',
            fontWeight: 800,
            fontSize: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
          }}
        >
          <span>🌱 Tier 0: ปูพื้นฐานพินอิน & เสียง (6 หมวด)</span>
        </button>
      </div>

      {/* Tier 1 Curriculum Units Grid */}
      {activeTierTab === 'tier1' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {tier1Units.map((unit) => (
            <div
              key={unit.unit_id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl, 20px)',
                border: '1.5px solid var(--border-subtle)',
                padding: '20px 22px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Unit Title Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        backgroundColor: 'var(--color-jade-surface)',
                        color: 'var(--color-jade-deep)',
                        fontWeight: 800,
                        fontSize: '12px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Unit {unit.unit_number}
                    </span>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-ink-primary)' }}>
                      {unit.title.th} ({unit.title.zh})
                    </h2>
                  </div>
                  <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: 'var(--text-ink-secondary)' }}>
                    {unit.description}
                  </p>
                </div>
              </div>

              {/* Lessons under this unit */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '12px',
                }}
              >
                {unit.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.lesson_id);
                  const vocabCount = lesson.vocabulary ? lesson.vocabulary.length : 0;

                  return (
                    <div
                      key={lesson.lesson_id}
                      onClick={() => onSelectLesson(unit.unit_id, lesson.lesson_id)}
                      style={{
                        border: '1.5px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg, 16px)',
                        padding: '16px',
                        backgroundColor: isCompleted ? 'rgba(236, 253, 245, 0.4)' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        transition: 'transform 0.15s, border-color 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-ink-muted)' }}>
                          บทที่ {lesson.lesson_number}
                        </span>
                        {isCompleted && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                            <CheckCircle size={14} />
                            <span>เรียนแล้ว</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-ink-primary)' }}>
                          {lesson.title.th}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-jade-deep)', fontWeight: 600, marginTop: '2px' }}>
                          {lesson.title.zh}
                        </div>
                      </div>

                      {lesson.can_do && (
                        <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', lineHeight: 1.4 }}>
                          🎯 {lesson.can_do.th}
                        </div>
                      )}

                      {/* Vocabulary Preview Chips */}
                      {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '6px' }}>
                          {lesson.vocabulary.slice(0, 4).map((v) => (
                            <span
                              key={v.id}
                              style={{
                                backgroundColor: '#F3F4F6',
                                color: '#374151',
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '2px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              {v.hanzi} ({v.meaning_th})
                            </span>
                          ))}
                          {lesson.vocabulary.length > 4 && (
                            <span style={{ fontSize: '11px', color: 'var(--text-ink-muted)', alignSelf: 'center' }}>
                              +{lesson.vocabulary.length - 4} คำ
                            </span>
                          )}
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-ink-muted)', fontWeight: 600 }}>
                          {vocabCount} คำศัพท์
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-jade-deep)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>เข้าเรียน</span>
                          <ArrowRight size={14} />
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

      {/* Tier 0 Curriculum Units Grid */}
      {activeTierTab === 'tier0' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {tier0Units.map((unit) => (
            <div
              key={unit.unit_id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl, 20px)',
                border: '1.5px solid var(--border-subtle)',
                padding: '20px 22px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        fontWeight: 800,
                        fontSize: '12px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Pinyin Unit {unit.unit_number}
                    </span>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-ink-primary)' }}>
                      {unit.title.th} ({unit.title.zh})
                    </h2>
                  </div>
                  <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: 'var(--text-ink-secondary)' }}>
                    {unit.description}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '12px',
                }}
              >
                {unit.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.lesson_id);

                  return (
                    <div
                      key={lesson.lesson_id}
                      onClick={() => onSelectLesson(unit.unit_id, lesson.lesson_id)}
                      style={{
                        border: '1.5px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg, 16px)',
                        padding: '16px',
                        backgroundColor: isCompleted ? 'rgba(236, 253, 245, 0.4)' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        transition: 'transform 0.15s, border-color 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-ink-muted)' }}>
                          {lesson.baby_step_goal || 'พื้นฐานเสียงพินอิน'}
                        </span>
                        {isCompleted && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                            <CheckCircle size={14} />
                            <span>เรียนแล้ว</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-ink-primary)' }}>
                          {lesson.title.th}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-jade-deep)', fontWeight: 600, marginTop: '2px' }}>
                          {lesson.title.zh}
                        </div>
                      </div>

                      <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', lineHeight: 1.4 }}>
                        🎯 {lesson.can_do.th}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '10px', marginTop: 'auto' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-jade-deep)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Volume2 size={13} />
                          <span>ฝึกออกเสียง</span>
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-jade-deep)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>เข้าเรียน</span>
                          <ArrowRight size={14} />
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

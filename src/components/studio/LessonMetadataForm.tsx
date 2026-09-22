/**
 * src/components/studio/LessonMetadataForm.tsx
 * ---------------------------------------------------------------------------
 * Form for Unit and Lesson Metadata in Hanzero Content Studio.
 * Includes live regex pattern validation for unit_id and lesson_id.
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any'.
 */

import React, { useMemo } from 'react';
import { CheckCircle2, AlertCircle, Layers, BookMarked } from 'lucide-react';
import type { StudioDraftState, StudioLessonDraft } from '../../engines/studio/studioTypes';
import { lintTraditionalChars } from '../../engines/studio/studioLinterEngine';

export interface LessonMetadataFormProps {
  draft: StudioDraftState;
  activeLesson: StudioLessonDraft;
  onUpdateUnitMetadata: (
    patch: Partial<Pick<StudioDraftState, 'unit_id' | 'tier' | 'unit_number' | 'title' | 'description'>>
  ) => void;
  onUpdateLessonMetadata: (
    patch: Partial<Pick<StudioLessonDraft, 'title' | 'can_do' | 'baby_step_goal'>>
  ) => void;
  onSelectLessonIndex: (index: number) => void;
}

export const LessonMetadataForm: React.FC<LessonMetadataFormProps> = ({
  draft,
  activeLesson,
  onUpdateUnitMetadata,
  onUpdateLessonMetadata,
  onSelectLessonIndex,
}) => {
  // Validate unit_id format e.g. "t1_u01"
  const isUnitIdValid = useMemo(() => {
    return /^t[0-4]_u\d{2}$/.test(draft.unit_id);
  }, [draft.unit_id]);

  // Check traditional chars in unit title
  const unitTitleZhIssues = useMemo(() => {
    return lintTraditionalChars(draft.title.zh || '');
  }, [draft.title.zh]);

  // Check traditional chars in lesson title
  const lessonTitleZhIssues = useMemo(() => {
    return lintTraditionalChars(activeLesson.title.zh || '');
  }, [activeLesson.title.zh]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Section 1: Unit Level Metadata */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #EAE5DE',
          padding: '24px',
          boxShadow: '0 4px 20px -2px rgba(44, 34, 20, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #F5F1EA', paddingBottom: '12px' }}>
          <Layers size={20} color="var(--color-jade-primary)" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-ink-primary)' }}>
            ข้อมูลระดับยูนิต (Unit Metadata)
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          {/* Tier Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              ระดับชั้นเรียน (Tier)
            </label>
            <select
              value={draft.tier}
              onChange={(e) => onUpdateUnitMetadata({ tier: parseInt(e.target.value, 10) || 0 })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            >
              <option value={0}>Tier 0: Pinyin Foundation (ปูพื้นฐานพินอิน)</option>
              <option value={1}>Tier 1: Beginner HSK 1 (พื้นฐานสนทนา)</option>
              <option value={2}>Tier 2: Elementary HSK 2 (ใช้ชีวิตประจำวัน)</option>
              <option value={3}>Tier 3: Intermediate (สื่อสารคล่องตัว)</option>
              <option value={4}>Tier 4: Advanced Immersion (เจ้าของภาษา)</option>
            </select>
          </div>

          {/* Unit Number */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              ลำดับยูนิต (Unit Number)
            </label>
            <input
              type="number"
              min={1}
              max={99}
              value={draft.unit_number}
              onChange={(e) => onUpdateUnitMetadata({ unit_number: Math.max(1, parseInt(e.target.value, 10) || 1) })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          {/* Unit ID with live regex indicator */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-ink-secondary)' }}>
                รหัสยูนิต (Unit ID)
              </label>
              <span style={{ fontSize: '11px', color: isUnitIdValid ? '#059669' : '#DC2626', display: 'flex', alignItems: 'center', gap: '3px' }}>
                {isUnitIdValid ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                {isUnitIdValid ? 'รูปแบบถูกต้อง' : 'ต้องเป็น tX_uYY'}
              </span>
            </div>
            <input
              type="text"
              value={draft.unit_id}
              placeholder="e.g. t1_u01"
              onChange={(e) => onUpdateUnitMetadata({ unit_id: e.target.value.trim() })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: isUnitIdValid ? '1px solid #E2DBD0' : '1px solid #DC2626',
                backgroundColor: isUnitIdValid ? '#FDFBF7' : '#FEF2F2',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Unit Title Trilingual */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              ชื่อยูนิตภาษาจีน (🇨🇳)
            </label>
            <input
              type="text"
              value={draft.title.zh}
              placeholder="เช่น 问候与初次见面"
              onChange={(e) => onUpdateUnitMetadata({ title: { ...draft.title, zh: e.target.value } })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: unitTitleZhIssues.length > 0 ? '1px solid #D97706' : '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '15px',
                fontFamily: 'var(--font-hanzi-card)',
                outline: 'none',
              }}
            />
            {unitTitleZhIssues.length > 0 && (
              <span style={{ fontSize: '11px', color: '#D97706', marginTop: '4px', display: 'block' }}>
                ⚠️ พบตัวเต็ม: {unitTitleZhIssues.map((i) => `${i.char}➔${i.simplified}`).join(', ')}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              ชื่อยูนิตภาษาไทย (🇹🇭)
            </label>
            <input
              type="text"
              value={draft.title.th}
              placeholder="เช่น การทักทายและการพบกันครั้งแรก"
              onChange={(e) => onUpdateUnitMetadata({ title: { ...draft.title, th: e.target.value } })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              ชื่อยูนิตภาษาอังกฤษ (🇬🇧)
            </label>
            <input
              type="text"
              value={draft.title.en}
              placeholder="e.g. Greetings & First Encounters"
              onChange={(e) => onUpdateUnitMetadata({ title: { ...draft.title, en: e.target.value } })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Unit Description */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
            คำอธิบายภาพรวมยูนิต (Unit Description - ภาษาไทย)
          </label>
          <textarea
            rows={2}
            value={draft.description}
            placeholder="อธิบายบริบทและเป้าหมายการเรียนรู้หลักของยูนิตนี้..."
            onChange={(e) => onUpdateUnitMetadata({ description: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid #E2DBD0',
              backgroundColor: '#FDFBF7',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>
      </section>

      {/* Section 2: Lesson Level Metadata */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #EAE5DE',
          padding: '24px',
          boxShadow: '0 4px 20px -2px rgba(44, 34, 20, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #F5F1EA', paddingBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookMarked size={20} color="var(--color-jade-primary)" />
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-ink-primary)' }}>
              ข้อมูลบทเรียนที่กำลังแต่ง (Lesson {draft.activeLessonIndex + 1})
            </h2>
          </div>

          {/* Lesson selector pills if multiple lessons */}
          {draft.lessons.length > 1 && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {draft.lessons.map((lesson, idx) => (
                <button
                  key={lesson._clientId}
                  onClick={() => onSelectLessonIndex(idx)}
                  className="btn-tactile-secondary"
                  style={{
                    padding: '4px 12px',
                    minHeight: '32px',
                    fontSize: '12px',
                    borderRadius: '8px',
                    backgroundColor: draft.activeLessonIndex === idx ? 'var(--color-jade-primary)' : '#FFFFFF',
                    color: draft.activeLessonIndex === idx ? '#FFFFFF' : 'var(--text-ink-primary)',
                    borderColor: draft.activeLessonIndex === idx ? 'var(--color-jade-deep)' : '#E2DBD0',
                  }}
                >
                  บทเรียน {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lesson Title Trilingual */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              ชื่อบทเรียนภาษาจีน (🇨🇳)
            </label>
            <input
              type="text"
              value={activeLesson.title.zh}
              placeholder="เช่น 你好！初次见面"
              onChange={(e) => onUpdateLessonMetadata({ title: { ...activeLesson.title, zh: e.target.value } })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: lessonTitleZhIssues.length > 0 ? '1px solid #D97706' : '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '15px',
                fontFamily: 'var(--font-hanzi-card)',
                outline: 'none',
              }}
            />
            {lessonTitleZhIssues.length > 0 && (
              <span style={{ fontSize: '11px', color: '#D97706', marginTop: '4px', display: 'block' }}>
                ⚠️ พบตัวเต็ม: {lessonTitleZhIssues.map((i) => `${i.char}➔${i.simplified}`).join(', ')}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              ชื่อบทเรียนภาษาไทย (🇹🇭)
            </label>
            <input
              type="text"
              value={activeLesson.title.th}
              placeholder="เช่น สวัสดี! ยินดีที่ได้รู้จัก"
              onChange={(e) => onUpdateLessonMetadata({ title: { ...activeLesson.title, th: e.target.value } })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              ชื่อบทเรียนภาษาอังกฤษ (🇬🇧)
            </label>
            <input
              type="text"
              value={activeLesson.title.en}
              placeholder="e.g. Hello! Nice to meet you"
              onChange={(e) => onUpdateLessonMetadata({ title: { ...activeLesson.title, en: e.target.value } })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Can-Do Goals (Bilingual) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              🎯 Can-Do Objective (ภาษาไทย)
            </label>
            <input
              type="text"
              value={activeLesson.can_do.th}
              placeholder="เช่น ทักทายและกล่าวคำอำลาเป็นภาษาจีนอย่างสุภาพได้"
              onChange={(e) => onUpdateLessonMetadata({ can_do: { ...activeLesson.can_do, th: e.target.value } })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
              🎯 Can-Do Objective (English)
            </label>
            <input
              type="text"
              value={activeLesson.can_do.en}
              placeholder="e.g. Greet and say goodbye politely in Chinese"
              onChange={(e) => onUpdateLessonMetadata({ can_do: { ...activeLesson.can_do, en: e.target.value } })}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Baby Step Goal */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-secondary)' }}>
            🐰 Baby Step Goal (เป้าหมายก้าวเล็กๆ สำหรับผู้เริ่มต้น)
          </label>
          <input
            type="text"
            value={activeLesson.baby_step_goal}
            placeholder="เช่น ออกเสียง สวัสดี (nǐ hǎo) ได้ชัดเจนและรู้ว่าคำทักทายจีนแปลตรงตัวว่า 'คุณดี'"
            onChange={(e) => onUpdateLessonMetadata({ baby_step_goal: e.target.value })}
            style={{
              width: '100%',
              minHeight: '44px',
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #E2DBD0',
              backgroundColor: '#FDFBF7',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>
      </section>
    </div>
  );
};

/**
 * src/components/studio/StudioReviewPanel.tsx
 * ---------------------------------------------------------------------------
 * Review, Validation Summary, and 1-Click Export Panel for Hanzero Content Studio.
 * Features:
 * - Real-time statistics counters
 * - Validation error list with clickable tab jump links
 * - 1-Click Copy JSON to clipboard with tactile feedback
 * - 1-Click Download formatted .json file ready for src/data/lessons/
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any'.
 */

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Copy,
  Download,
  FileCode,
  Layers,
  BookOpen,
  MessageSquare,
  Sparkles,
  Check,
} from 'lucide-react';
import type { StudioDraftState, StudioValidationError } from '../../engines/studio/studioTypes';
import { copyTextWithFallback } from '../../utils/clipboard';
import type { StudioTab } from './StudioNavbar';

export interface StudioReviewPanelProps {
  draft: StudioDraftState;
  validationErrors: StudioValidationError[];
  validationWarnings: StudioValidationError[];
  onNavigateToTab: (tab: StudioTab) => void;
  exportJson: () => { jsonString: string; isValid: boolean; errors: string[] };
}

export const StudioReviewPanel: React.FC<StudioReviewPanelProps> = ({
  draft,
  validationErrors,
  validationWarnings,
  onNavigateToTab,
  exportJson,
}) => {
  const [copied, setCopied] = useState(false);

  // Generate serialized JSON
  const exportResult = useMemo(() => {
    return exportJson();
  }, [exportJson]);

  const activeLesson = draft.lessons[draft.activeLessonIndex];
  const vocabCount = activeLesson?.vocabulary.length || 0;
  const dialogueCount = activeLesson?.dialogue.length || 0;
  const quizCount = activeLesson?.quizzes.length || 0;

  // Handle Copy JSON
  const handleCopyJson = async () => {
    const success = await copyTextWithFallback(exportResult.jsonString);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle Download JSON
  const handleDownloadJson = () => {
    const filename = `${draft.unit_id || 'unit_draft'}.json`;
    const blob = new Blob([exportResult.jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Resolve target tab for validation error
  const getTargetTabForError = (error: StudioValidationError): StudioTab => {
    if (error.path.includes('vocabulary')) return 'vocab';
    if (error.path.includes('dialogue')) return 'dialogue';
    if (error.path.includes('quizzes')) return 'quiz';
    return 'metadata';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-ink-primary)' }}>
            ตรวจทาน & ส่งออกบทเรียน (Review & Export)
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', margin: 0 }}>
            ตรวจสอบความถูกต้องของเนื้อหาก่อนส่งออกเป็นไฟล์ JSON สำหรับนำไปใช้งานในหลักสูตร
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={handleCopyJson}
            className="btn-tactile-secondary"
            style={{
              padding: '8px 14px',
              minHeight: '44px',
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
            <span>{copied ? 'คัดลอกแล้ว!' : 'คัดลอก JSON'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadJson}
            className="btn-tactile-primary"
            style={{
              padding: '8px 16px',
              minHeight: '44px',
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Download size={16} />
            <span>ดาวน์โหลด .json</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #EAE5DE', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Layers size={24} color="var(--color-jade-primary)" />
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>ระดับ Tier / Unit</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
              Tier {draft.tier} / {draft.unit_id}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #EAE5DE', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BookOpen size={24} color="var(--color-jade-primary)" />
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>คำศัพท์</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
              {vocabCount} คำ
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #EAE5DE', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <MessageSquare size={24} color="var(--color-jade-primary)" />
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>บทสนทนา</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
              {dialogueCount} บรรทัด
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #EAE5DE', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={24} color="var(--color-jade-primary)" />
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>แบบฝึกหัด</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
              {quizCount} ข้อ
            </div>
          </div>
        </div>
      </div>

      {/* Validation Status Report */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #EAE5DE',
          padding: '20px',
          boxShadow: '0 4px 20px -2px rgba(44, 34, 20, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid #F5F1EA', paddingBottom: '10px' }}>
          {validationErrors.length === 0 ? (
            <CheckCircle2 size={20} color="#059669" />
          ) : (
            <AlertCircle size={20} color="#DC2626" />
          )}
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-ink-primary)' }}>
            ผลการตรวจสอบความสมบูรณ์ ({validationErrors.length} ข้อผิดพลาด, {validationWarnings.length} ข้อสังเกต)
          </h3>
        </div>

        {validationErrors.length === 0 && validationWarnings.length === 0 ? (
          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-jade-surface)',
              color: 'var(--color-jade-deep)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={18} />
            <span>บทเรียนผ่านเกณฑ์มาตรฐานการตรวจสอบ 100% พร้อมส่งออกเข้าสู่หลักสูตรแล้ว 🐰✨</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Errors List */}
            {validationErrors.map((err, idx) => (
              <div
                key={`err-${idx}`}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#DC2626' }}>
                  <AlertCircle size={16} flex-shrink={0} />
                  <span>
                    <strong>{err.field}:</strong> {err.message}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToTab(getTargetTabForError(err))}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#DC2626',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #FCA5A5',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  แก้ไขที่แท็บนี้ ➔
                </button>
              </div>
            ))}

            {/* Warnings List */}
            {validationWarnings.map((warn, idx) => (
              <div
                key={`warn-${idx}`}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#92400E' }}>
                  <AlertTriangle size={16} flex-shrink={0} />
                  <span>
                    <strong>{warn.field}:</strong> {warn.message}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToTab(getTargetTabForError(warn))}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#B45309',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #FCD34D',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ดูที่แท็บนี้ ➔
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* JSON Payload Preview Container */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #EAE5DE',
          padding: '20px',
          boxShadow: '0 4px 20px -2px rgba(44, 34, 20, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <FileCode size={18} color="var(--color-jade-primary)" />
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-ink-primary)' }}>
            ตัวอย่างไฟล์ JSON ที่จะส่งออก ({draft.unit_id || 'unit'}.json)
          </h3>
        </div>

        <pre
          style={{
            maxHeight: '360px',
            overflowY: 'auto',
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: '#1E293B',
            color: '#E2E8F0',
            fontSize: '12px',
            fontFamily: 'monospace',
            lineHeight: 1.5,
          }}
        >
          {exportResult.jsonString}
        </pre>
      </section>
    </div>
  );
};

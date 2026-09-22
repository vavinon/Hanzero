/**
 * src/components/studio/StudioNavbar.tsx
 * ---------------------------------------------------------------------------
 * Dual-Level Header & Progressive Stepper for Hanzero Content Studio.
 * Designed under the aesthetic of Warm Modern Oriental Minimalism.
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Pure Presentation, Strict Types, Zero 'any'
 * - Touch Targets >= 48px
 * - WCAG AA Contrast Ratio
 */

import React from 'react';
import {
  FileText,
  BookOpen,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Save,
  RotateCcw,
  Upload,
  ArrowLeft,
} from 'lucide-react';
import type { StorageStatus, StudioValidationError } from '../../engines/studio/studioTypes';

export type StudioTab = 'metadata' | 'vocab' | 'dialogue' | 'quiz' | 'review';

export interface StudioNavbarProps {
  activeTab: StudioTab;
  onSelectTab: (tab: StudioTab) => void;
  tier: number;
  unitNumber: number;
  lessonNumber: number;
  unitTitleTh: string;
  isSaving: boolean;
  isDirty: boolean;
  lastSavedAt: number | null;
  storageStatus: StorageStatus;
  vocabCount: number;
  dialogueCount: number;
  quizCount: number;
  validationErrors: StudioValidationError[];
  validationWarnings: StudioValidationError[];
  onForceSave: () => void;
  onReset: () => void;
  onLoadSample: () => void;
  onOpenImport: () => void;
  onExit: () => void;
}

export const StudioNavbar: React.FC<StudioNavbarProps> = ({
  activeTab,
  onSelectTab,
  tier,
  unitNumber,
  lessonNumber,
  unitTitleTh,
  isSaving,
  isDirty,
  lastSavedAt,
  storageStatus,
  vocabCount,
  dialogueCount,
  quizCount,
  validationErrors,
  validationWarnings,
  onForceSave,
  onReset,
  onLoadSample,
  onOpenImport,
  onExit,
}) => {
  // Format last saved time
  const formattedSavedTime = lastSavedAt
    ? new Date(lastSavedAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    : null;

  // Compute tab-specific issue counts
  const vocabErrors = validationErrors.filter((e) => e.path.includes('vocabulary'));
  const vocabWarnings = validationWarnings.filter((e) => e.path.includes('vocabulary'));
  const dialogueErrors = validationErrors.filter((e) => e.path.includes('dialogue'));
  const dialogueWarnings = validationWarnings.filter((e) => e.path.includes('dialogue'));
  const quizErrors = validationErrors.filter((e) => e.path.includes('quizzes'));
  const quizWarnings = validationWarnings.filter((e) => e.path.includes('quizzes'));
  const metadataErrors = validationErrors.filter(
    (e) => !e.path.includes('vocabulary') && !e.path.includes('dialogue') && !e.path.includes('quizzes')
  );

  const steps = [
    {
      id: 'metadata' as StudioTab,
      label: 'ข้อมูลทั่วไป',
      icon: FileText,
      count: null,
      errorCount: metadataErrors.length,
      warningCount: 0,
    },
    {
      id: 'vocab' as StudioTab,
      label: 'คำศัพท์',
      icon: BookOpen,
      count: vocabCount,
      errorCount: vocabErrors.length,
      warningCount: vocabWarnings.length,
    },
    {
      id: 'dialogue' as StudioTab,
      label: 'บทสนทนา',
      icon: MessageSquare,
      count: dialogueCount,
      errorCount: dialogueErrors.length,
      warningCount: dialogueWarnings.length,
    },
    {
      id: 'quiz' as StudioTab,
      label: 'แบบฝึกหัด',
      icon: Sparkles,
      count: quizCount,
      errorCount: quizErrors.length,
      warningCount: quizWarnings.length,
    },
    {
      id: 'review' as StudioTab,
      label: 'ตรวจทาน & ส่งออก',
      icon: CheckCircle2,
      count: null,
      errorCount: validationErrors.length,
      warningCount: validationWarnings.length,
    },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EAE5DE',
        boxShadow: '0 2px 10px rgba(44, 34, 20, 0.04)',
      }}
    >
      {/* Master Utility Top Bar (56px) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: '1px solid #F5F1EA',
          flexWrap: 'wrap',
          gap: '8px',
          minHeight: '52px',
        }}
      >
        {/* Left: Brand & Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onExit}
            className="btn-tactile-secondary"
            title="กลับสู่แผนที่การเรียนรู้"
            style={{
              padding: '6px 10px',
              minHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              borderRadius: '8px',
            }}
          >
            <ArrowLeft size={16} />
            <span style={{ display: 'inline' }}>กลับ</span>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>🐰</span>
              <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                Hanzero Studio
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  backgroundColor: '#ECFDF5',
                  color: '#047857',
                  padding: '1px 6px',
                  borderRadius: '9999px',
                }}
              >
                P06
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-ink-secondary)' }}>
              Tier {tier} › Unit {unitNumber < 10 ? `0${unitNumber}` : unitNumber} ({unitTitleTh || 'แบบร่าง'}) › บทเรียน {lessonNumber}
            </div>
          </div>
        </div>

        {/* Center: Live Autosave Heartbeat */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: storageStatus === 'quota_exceeded' ? '#FEF2F2' : '#F9F7F3',
          }}
        >
          {isSaving ? (
            <span style={{ color: 'var(--text-ink-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
              <span>กำลังบันทึก...</span>
            </span>
          ) : isDirty ? (
            <span style={{ color: '#B45309', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D97706' }} />
              <span>มีข้อมูลยังไม่บันทึก</span>
            </span>
          ) : storageStatus === 'quota_exceeded' ? (
            <span style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AlertCircle size={14} />
              <span>หน่วยความจำเต็ม (สำรองใน RAM)</span>
            </span>
          ) : (
            <span style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669' }} />
              <span>บันทึกแล้ว {formattedSavedTime ? `(${formattedSavedTime})` : ''}</span>
            </span>
          )}
        </div>

        {/* Right: Master Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={onLoadSample}
            className="btn-tactile-secondary"
            title="โหลดข้อมูลบทเรียนตัวอย่าง Unit 1"
            style={{ padding: '6px 10px', minHeight: '36px', fontSize: '12px', borderRadius: '8px' }}
          >
            ตัวอย่าง
          </button>
          <button
            onClick={onOpenImport}
            className="btn-tactile-secondary"
            title="นำเข้าไฟล์ JSON บทเรียน"
            style={{ padding: '6px 10px', minHeight: '36px', fontSize: '12px', borderRadius: '8px' }}
          >
            <Upload size={14} style={{ marginRight: '4px' }} />
            นำเข้า
          </button>
          <button
            onClick={onForceSave}
            className="btn-tactile-primary"
            title="บันทึกลงเครื่องทันที"
            style={{
              padding: '6px 12px',
              minHeight: '36px',
              fontSize: '12px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Save size={14} />
            บันทึก
          </button>
          <button
            onClick={onReset}
            className="btn-tactile-secondary"
            title="ล้างข้อมูลร่างทั้งหมดเพื่อเริ่มใหม่"
            style={{ padding: '6px 8px', minHeight: '36px', fontSize: '12px', borderRadius: '8px', color: '#DC2626' }}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Progressive Stepper Bar (Tabs with Counts & Validation Status) */}
      <nav
        aria-label="Studio ขั้นตอนการแต่งบทเรียน"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          padding: '0 8px',
          gap: '4px',
          backgroundColor: '#FCFAF7',
        }}
      >
        {steps.map((step) => {
          const isActive = activeTab === step.id;
          const IconComponent = step.icon;
          const hasError = step.errorCount > 0;
          const hasWarning = step.warningCount > 0 && !hasError;
          const isValid = !hasError && !hasWarning && step.count !== null && step.count > 0;

          return (
            <button
              key={step.id}
              data-tab={step.id}
              onClick={() => onSelectTab(step.id)}
              role="tab"
              aria-selected={isActive}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                minHeight: '48px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                borderBottom: isActive ? '3px solid var(--color-jade-primary)' : '3px solid transparent',
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                borderRadius: '8px 8px 0 0',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <IconComponent size={16} />
              <span>{step.label}</span>

              {/* Item Count Capsule */}
              {step.count !== null && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? 'var(--color-jade-surface)' : '#EAE5DE',
                    color: isActive ? 'var(--color-jade-deep)' : 'var(--text-ink-secondary)',
                  }}
                >
                  {step.count}
                </span>
              )}

              {/* Validation Status Micro-Indicator */}
              {hasError ? (
                <span
                  title={`พบข้อผิดพลาด ${step.errorCount} จุด`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: '10px',
                    color: '#DC2626',
                    backgroundColor: '#FEF2F2',
                    padding: '1px 5px',
                    borderRadius: '9999px',
                  }}
                >
                  <AlertCircle size={12} />
                  <span>{step.errorCount}</span>
                </span>
              ) : hasWarning ? (
                <span
                  title={`มีข้อสังเกต ${step.warningCount} จุด`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: '10px',
                    color: '#D97706',
                    backgroundColor: '#FFFBEB',
                    padding: '1px 5px',
                    borderRadius: '9999px',
                  }}
                >
                  <AlertTriangle size={12} />
                  <span>{step.warningCount}</span>
                </span>
              ) : isValid ? (
                <span
                  title="ผ่านการตรวจสอบเรียบร้อย"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '10px',
                    color: '#059669',
                  }}
                >
                  <CheckCircle2 size={13} />
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

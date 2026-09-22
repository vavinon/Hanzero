/**
 * src/components/studio/StudioLayout.tsx
 * ---------------------------------------------------------------------------
 * Master Studio Layout Container for Hanzero Content Authoring Studio.
 * Features:
 * - Direct reactive integration with useStudioDraft hook
 * - Persistent Tab Layout via CSS display (preserves scroll & focus)
 * - Import JSON Modal with syntax and validation feedback
 * - Reset Draft Confirmation Modal
 * - Quota Exceeded Emergency Backup Notification
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any', Zero Memory Leaks.
 */

import React, { useState, useCallback } from 'react';
import { useStudioDraft } from '../../hooks/useStudioDraft';
import { StudioNavbar, StudioTab } from './StudioNavbar';
import { LessonMetadataForm } from './LessonMetadataForm';
import { VocabComposer } from './VocabComposer';
import { DialogueComposer } from './DialogueComposer';
import { QuizComposer } from './QuizComposer';
import { StudioReviewPanel } from './StudioReviewPanel';
import { AlertCircle, Upload, X, AlertTriangle } from 'lucide-react';

export interface StudioLayoutProps {
  onExit: () => void;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ onExit }) => {
  const {
    draft,
    activeLesson,
    isDirty,
    isSaving,
    lastSavedAt,
    storageStatus,
    validation,
    setActiveLessonIndex,
    updateUnitMetadata,
    updateLessonMetadata,
    addVocab,
    updateVocab,
    removeVocab,
    reorderVocab,
    addDialogueLine,
    updateDialogueLine,
    removeDialogueLine,
    reorderDialogue,
    addQuiz,
    updateQuiz,
    removeQuiz,
    reorderQuiz,
    forceSave,
    resetDraft,
    loadSampleLesson,
    importJson,
    exportJson,
  } = useStudioDraft();

  const [activeTab, setActiveTab] = useState<StudioTab>('metadata');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importErrors, setImportErrors] = useState<string[]>([]);

  // Handle Import Submit
  const handleImportSubmit = useCallback(() => {
    if (!importText.trim()) return;
    const result = importJson(importText);
    if (result.success) {
      setShowImportModal(false);
      setImportText('');
      setImportErrors([]);
    } else {
      setImportErrors(result.errors);
    }
  }, [importText, importJson]);

  // Handle Reset Submit
  const handleConfirmReset = useCallback(() => {
    resetDraft();
    setShowResetModal(false);
    setActiveTab('metadata');
  }, [resetDraft]);

  const currentLesson = activeLesson || draft.lessons[0];
  if (!currentLesson) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-ink-secondary)' }}>
        กำลังเตรียมข้อมูลบทเรียน... 🐰
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-rice-paper)',
        color: 'var(--text-ink-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Quota Exceeded Emergency Alert Banner */}
      {storageStatus === 'quota_exceeded' && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            borderBottom: '1px solid #FCA5A5',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: '#991B1B',
            zIndex: 100,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            <span>
              <strong>⚠️ หน่วยความจำเครื่องเต็ม:</strong> ไม่สามารถบันทึกดราฟต์ลง LocalStorage ได้
              (ขณะนี้บันทึกสำรองใน RAM) กรุณากดส่งออก JSON เพื่อความปลอดภัย
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('review')}
            style={{
              padding: '4px 12px',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ไปหน้าส่งออก ➔
          </button>
        </div>
      )}

      {/* Dual-Level Studio Navbar */}
      <StudioNavbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        tier={draft.tier}
        unitNumber={draft.unit_number}
        lessonNumber={draft.activeLessonIndex + 1}
        unitTitleTh={draft.title.th}
        isSaving={isSaving}
        isDirty={isDirty}
        lastSavedAt={lastSavedAt}
        storageStatus={storageStatus}
        vocabCount={activeLesson?.vocabulary.length || 0}
        dialogueCount={activeLesson?.dialogue.length || 0}
        quizCount={activeLesson?.quizzes.length || 0}
        validationErrors={validation.errors}
        validationWarnings={validation.warnings}
        onForceSave={forceSave}
        onReset={() => setShowResetModal(true)}
        onLoadSample={() => loadSampleLesson()}
        onOpenImport={() => {
          setImportText('');
          setImportErrors([]);
          setShowImportModal(true);
        }}
        onExit={onExit}
      />

      {/* Main Content Area (Persistent Tabs via CSS Visibility) */}
      <main style={{ flex: 1, paddingBottom: '60px' }}>
        {/* Tab 1: Metadata */}
        <div style={{ display: activeTab === 'metadata' ? 'block' : 'none' }}>
          <LessonMetadataForm
            draft={draft}
            activeLesson={currentLesson}
            onUpdateUnitMetadata={updateUnitMetadata}
            onUpdateLessonMetadata={updateLessonMetadata}
            onSelectLessonIndex={setActiveLessonIndex}
          />
        </div>

        {/* Tab 2: Vocab */}
        <div style={{ display: activeTab === 'vocab' ? 'block' : 'none' }}>
          <VocabComposer
            vocabList={currentLesson.vocabulary}
            onAddVocab={addVocab}
            onUpdateVocab={updateVocab}
            onRemoveVocab={removeVocab}
            onReorderVocab={reorderVocab}
          />
        </div>

        {/* Tab 3: Dialogue */}
        <div style={{ display: activeTab === 'dialogue' ? 'block' : 'none' }}>
          <DialogueComposer
            dialogueList={currentLesson.dialogue}
            tier={draft.tier}
            onAddLine={addDialogueLine}
            onUpdateLine={updateDialogueLine}
            onRemoveLine={removeDialogueLine}
            onReorderLine={reorderDialogue}
          />
        </div>

        {/* Tab 4: Quiz */}
        <div style={{ display: activeTab === 'quiz' ? 'block' : 'none' }}>
          <QuizComposer
            quizList={currentLesson.quizzes}
            availableVocabs={currentLesson.vocabulary}
            onAddQuiz={addQuiz}
            onUpdateQuiz={updateQuiz}
            onRemoveQuiz={removeQuiz}
            onReorderQuiz={reorderQuiz}
          />
        </div>

        {/* Tab 5: Review & Export */}
        <div style={{ display: activeTab === 'review' ? 'block' : 'none' }}>
          <StudioReviewPanel
            draft={draft}
            validationErrors={validation.errors}
            validationWarnings={validation.warnings}
            onNavigateToTab={setActiveTab}
            exportJson={exportJson}
          />
        </div>
      </main>

      {/* Modal 1: Import JSON Dialog */}
      {showImportModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="import-dialog-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 30, 33, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Upload size={20} color="var(--color-jade-primary)" />
                <h3 id="import-dialog-title" style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
                  นำเข้าไฟล์ JSON บทเรียน
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', marginBottom: '12px' }}>
              วางโค้ด JSON ของ UnitLessonData ลงในกล่องด้านล่าง เพื่อนำเข้าสู่ Studio สำหรับแก้ไขต่อ:
            </p>

            <textarea
              rows={10}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='วาง JSON ที่นี่ เช่น { "unit_id": "t1_u01", ... }'
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: importErrors.length > 0 ? '1px solid #DC2626' : '1px solid #E2DBD0',
                backgroundColor: '#FDFBF7',
                fontFamily: 'monospace',
                fontSize: '12px',
                lineHeight: 1.4,
                outline: 'none',
                resize: 'vertical',
                marginBottom: '12px',
              }}
            />

            {importErrors.length > 0 && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  marginBottom: '14px',
                  maxHeight: '120px',
                  overflowY: 'auto',
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#DC2626', marginBottom: '4px' }}>
                  ไม่สามารถนำเข้าได้ พบข้อผิดพลาด:
                </div>
                {importErrors.map((err, idx) => (
                  <div key={idx} style={{ fontSize: '12px', color: '#B91C1C' }}>
                    • {err}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="btn-tactile-secondary"
                style={{ padding: '8px 16px', minHeight: '40px', fontSize: '13px' }}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="btn-tactile-primary"
                style={{ padding: '8px 18px', minHeight: '40px', fontSize: '13px' }}
              >
                นำเข้าและเปิดแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Reset Confirmation Dialog */}
      {showResetModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 30, 33, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '440px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#FEF2F2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
              }}
            >
              <AlertTriangle size={24} />
            </div>

            <h3 id="reset-dialog-title" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-ink-primary)' }}>
              ยืนยันการล้างข้อมูลแบบร่าง?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', marginBottom: '20px' }}>
              การดำเนินการนี้จะลบข้อมูลคำศัพท์ บทสนทนา และแบบฝึกหัดทั้งหมดในร่างปัจจุบันและเริ่มต้นหน้าเปล่าใหม่
              ข้อมูลที่ยังไม่ได้ส่งออกจะไม่สามารถกู้คืนได้
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="btn-tactile-secondary"
                style={{ padding: '8px 16px', minHeight: '44px', fontSize: '13px' }}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                style={{
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 20px',
                  minHeight: '44px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                ยืนยันล้างข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StudioLayout;

/**
 * src/components/studio/GitExportModal.tsx
 * ---------------------------------------------------------------------------
 * Zero-Token GitHub Export & Pull Request Generator Modal.
 * Designed with the aesthetic of Warm Modern Oriental Minimalism.
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Strict Typing, Zero 'any', Zero Memory Leaks (URL.revokeObjectURL & timer cleanups)
 * - Safe 3-Tier Clipboard Integration
 * - WCAG AA Contrast & Keyboard Accessibility (Escape to close, aria-modal)
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  GitPullRequest,
  FileCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Terminal,
} from 'lucide-react';
import type { StudioDraftState, StudioValidationError } from '../../engines/studio/studioTypes';
import {
  generateSuggestedFilename,
  generatePullRequestTemplate,
  generateGitCommandSnippet,
} from '../../engines/studio/gitHandoff';
import { copyTextWithFallback } from '../../utils/clipboard';

export interface GitExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  draft: StudioDraftState;
  jsonString: string;
  isValid: boolean;
  validationErrors?: StudioValidationError[];
  validationWarnings?: StudioValidationError[];
}

export type ExportModalTab = 'pr' | 'json';

export const GitExportModal: React.FC<GitExportModalProps> = ({
  isOpen,
  onClose,
  draft,
  jsonString,
  isValid,
  validationErrors = [],
  validationWarnings = [],
}) => {
  const [activeTab, setActiveTab] = useState<ExportModalTab>('pr');
  const [copiedPr, setCopiedPr] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout[]>([]);

  // Safe timeout helper
  const setSafeTimeout = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timerRef.current.push(id);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timerRef.current.forEach((t) => clearTimeout(t));
      timerRef.current = [];
    };
  }, []);

  // Handle ESC key listener for accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Precomputed helpers
  const filename = useMemo(() => generateSuggestedFilename(draft), [draft]);
  const prTemplate = useMemo(() => generatePullRequestTemplate(draft, jsonString), [draft, jsonString]);
  const gitSnippet = useMemo(() => generateGitCommandSnippet(draft, filename), [draft, filename]);
  const targetPath = `src/data/lessons/tier${draft.tier || 1}/${filename}`;

  // Copy PR Template
  const handleCopyPrTemplate = async () => {
    const ok = await copyTextWithFallback(prTemplate);
    if (ok) {
      setCopiedPr(true);
      setSafeTimeout(() => setCopiedPr(false), 2000);
    }
  };

  // Copy JSON Code
  const handleCopyJson = async () => {
    const ok = await copyTextWithFallback(jsonString);
    if (ok) {
      setCopiedJson(true);
      setSafeTimeout(() => setCopiedJson(false), 2000);
    }
  };

  // Copy Git Terminal Commands
  const handleCopyGitSnippet = async () => {
    const ok = await copyTextWithFallback(gitSnippet);
    if (ok) {
      setCopiedGitCmd(true);
      setSafeTimeout(() => setCopiedGitCmd(false), 2000);
    }
  };

  // 1-Click JSON Download with URL.revokeObjectURL
  const handleDownloadJson = () => {
    try {
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setSafeTimeout(() => setDownloadSuccess(false), 2500);
    } catch {
      // Fallback if blob download fails
      handleCopyJson();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="git-export-title"
      data-testid="modal-git-export"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28, 30, 33, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
          border: '1px solid #EAE5DE',
          overflow: 'hidden',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #EAE5DE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FCFAF7',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-jade-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-jade-deep)',
              }}
            >
              <GitPullRequest size={20} />
            </div>
            <div>
              <h2
                id="git-export-title"
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  margin: 0,
                  color: 'var(--text-ink-primary)',
                }}
              >
                ส่งออกบทเรียน & เปิด GitHub Pull Request
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', margin: '2px 0 0 0' }}>
                ระบบส่งมอบงานสู่ระบบหลักสูตรแบบ Zero-Token ปลอดภัย 100% 🐰✨
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดหน้าต่างส่งออก"
            data-testid="btn-close-export-modal"
            style={{
              background: 'none',
              border: 'none',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'var(--text-ink-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Validation Status Indicator */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: isValid ? '#F0FDF4' : '#FFFBEB',
            borderBottom: isValid ? '1px solid #BBF7D0' : '1px solid #FDE68A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            {isValid ? (
              <>
                <ShieldCheck size={16} color="#16A34A" />
                <span style={{ fontWeight: 600, color: '#15803D' }}>
                  โครงสร้างข้อมูลผ่านการตรวจสอบ 100% พร้อมส่งเข้าหลักสูตร
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={16} color="#D97706" />
                <span style={{ fontWeight: 600, color: '#B45309' }}>
                  พบข้อสังเกต {validationErrors.length + validationWarnings.length} จุด (ตรวจสอบในแท็บตรวจทาน)
                </span>
              </>
            )}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>
            ไฟล์เป้าหมาย: <code style={{ backgroundColor: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2DBD0' }}>{filename}</code>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #EAE5DE',
            padding: '0 20px',
            backgroundColor: '#FAFAFA',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('pr')}
            data-testid="tab-export-pr"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 14px',
              fontSize: '13px',
              fontWeight: activeTab === 'pr' ? 700 : 500,
              color: activeTab === 'pr' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
              borderBottom: activeTab === 'pr' ? '3px solid var(--color-jade-primary)' : '3px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
            }}
          >
            <GitPullRequest size={16} />
            <span>🚀 GitHub PR Template</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('json')}
            data-testid="tab-export-json"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 14px',
              fontSize: '13px',
              fontWeight: activeTab === 'json' ? 700 : 500,
              color: activeTab === 'json' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
              borderBottom: activeTab === 'json' ? '3px solid var(--color-jade-primary)' : '3px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
            }}
          >
            <FileCode size={16} />
            <span>📄 รหัส JSON ({filename})</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {activeTab === 'pr' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Step-by-Step Instructions */}
              <div
                style={{
                  backgroundColor: '#F8F6F2',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  border: '1px solid #EAE5DE',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
                  📋 3 ขั้นตอนง่ายๆ ในการส่งมอบบทเรียนเข้า GitHub:
                </div>
                <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--text-ink-secondary)', lineHeight: 1.6 }}>
                  <li>
                    กดปุ่ม <b>"💾 ดาวน์โหลดไฟล์ .json"</b> แล้วนำไปวางไว้ที่โฟลเดอร์ <code>{targetPath}</code> ในโปรเจกต์
                  </li>
                  <li>
                    กดปุ่ม <b>"📋 คัดลอก Pull Request Template"</b> ด้านล่างนี้
                  </li>
                  <li>
                    เปิดหน้า <b>Pull Requests</b> บน GitHub แล้ววางข้อความเพื่อเปิด PR ได้ทันที
                  </li>
                </ol>
              </div>

              {/* Action Buttons Row */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleCopyPrTemplate}
                  data-testid="btn-copy-pr-template"
                  className="btn-tactile-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    minHeight: '40px',
                    fontSize: '13px',
                    borderRadius: '8px',
                  }}
                >
                  {copiedPr ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedPr ? 'คัดลอก PR Template แล้ว! ✅' : 'คัดลอก PR Template'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadJson}
                  data-testid="btn-download-json-sub"
                  className="btn-tactile-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    minHeight: '40px',
                    fontSize: '13px',
                    borderRadius: '8px',
                  }}
                >
                  {downloadSuccess ? <Check size={16} color="#16A34A" /> : <Download size={16} />}
                  <span>{downloadSuccess ? 'ดาวน์โหลดสำเร็จ! 💾' : `ดาวน์โหลด ${filename}`}</span>
                </button>

                <a
                  href="https://github.com/vavinon/Hanzero/compare"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-open-github-pr"
                  className="btn-tactile-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    minHeight: '40px',
                    fontSize: '13px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--text-ink-primary)',
                  }}
                >
                  <ExternalLink size={15} />
                  <span>ไปยังหน้าสร้าง PR บน GitHub</span>
                </a>
              </div>

              {/* PR Preview Box */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--text-ink-secondary)',
                    marginBottom: '6px',
                  }}
                >
                  ตัวอย่างเนื้อหา Pull Request (Markdown):
                </label>
                <textarea
                  readOnly
                  value={prTemplate}
                  rows={10}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #E2DBD0',
                    backgroundColor: '#FDFBF7',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Terminal Snippet Box */}
              <div
                style={{
                  backgroundColor: '#1E1E1E',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  color: '#D4D4D4',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A0A0A0', fontWeight: 600 }}>
                    <Terminal size={14} />
                    <span>Git Command Snippet สำหรับผู้ร่วมพัฒนาสาย Terminal:</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyGitSnippet}
                    data-testid="btn-copy-git-snippet"
                    style={{
                      background: 'none',
                      border: '1px solid #444',
                      borderRadius: '4px',
                      color: copiedGitCmd ? '#4ADE80' : '#CCCCCC',
                      fontSize: '11px',
                      padding: '2px 8px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {copiedGitCmd ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedGitCmd ? 'คัดลอกแล้ว' : 'คัดลอกคำสั่ง'}</span>
                  </button>
                </div>
                <pre style={{ margin: 0, overflowX: 'auto', fontFamily: 'monospace', lineHeight: 1.4 }}>
                  {gitSnippet}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
                    ไฟล์ข้อมูลบทเรียน: <code>{filename}</code>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>
                    โฟลเดอร์สำหรับจัดเก็บ: <code>{targetPath}</code>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    data-testid="btn-copy-json"
                    className="btn-tactile-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      minHeight: '38px',
                      fontSize: '13px',
                      borderRadius: '8px',
                    }}
                  >
                    {copiedJson ? <Check size={15} /> : <Copy size={15} />}
                    <span>{copiedJson ? 'คัดลอก JSON แล้ว! ✅' : 'คัดลอก JSON'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    data-testid="btn-download-json"
                    className="btn-tactile-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      minHeight: '38px',
                      fontSize: '13px',
                      borderRadius: '8px',
                    }}
                  >
                    {downloadSuccess ? <Check size={15} /> : <Download size={15} />}
                    <span>{downloadSuccess ? 'ดาวน์โหลดสำเร็จ! 💾' : 'ดาวน์โหลดไฟล์ .json'}</span>
                  </button>
                </div>
              </div>

              {/* JSON Code Viewer */}
              <div
                style={{
                  borderRadius: '10px',
                  border: '1px solid #E2DBD0',
                  overflow: 'hidden',
                  backgroundColor: '#1E1E1E',
                }}
              >
                <div
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#2D2D2D',
                    color: '#999999',
                    fontSize: '11px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>JSON Preview ({Math.round(jsonString.length / 1024)} KB)</span>
                  <span>UTF-8 Ready</span>
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '14px',
                    maxHeight: '380px',
                    overflowY: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    lineHeight: 1.4,
                    color: '#9CDCFE',
                  }}
                >
                  {jsonString}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer Zero-Token Safety Guarantee */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid #EAE5DE',
            backgroundColor: '#FCFAF7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-ink-secondary)' }}>
            <ShieldCheck size={16} color="var(--color-jade-deep)" />
            <span>
              <b>Zero-Token Guarantee:</b> ไม่มีการร้องขอหรือส่ง Personal Access Token (PAT) ออกนอกเครื่อง ปลอดภัย 100%
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-tactile-secondary"
            style={{ padding: '6px 14px', minHeight: '36px', fontSize: '13px', borderRadius: '8px' }}
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitExportModal;

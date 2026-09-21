import React, { useState } from 'react';
import {
  Database,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Copy,
  Check,
  FileText,
  Trash2,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import {
  StorageDiagnostics,
  UserStateSchema,
  getQuickSyncCode,
  restoreFromQuickSyncCode,
  exportSnapshotAsJsonString,
  resetStorage,
  getTopLearningBottlenecks,
  getDiagnosticsSnapshot,
  exportDiagnosticsMarkdown,
  exportDiagnosticsJson,
} from '../../engines/storage';

export interface DevStorageDrawerProps {
  userState: UserStateSchema;
  storageHealth: StorageDiagnostics | null;
  strokeCacheStatus: string | null;
  onInspectStrokeCache: () => void;
  onRestoreState: (state: UserStateSchema) => void;
  onOpenVoiceHealth?: () => void;
  onResetOnboarding?: () => void;
  defaultOpen?: boolean;
}

export const DevStorageDrawer: React.FC<DevStorageDrawerProps> = ({
  userState,
  storageHealth,
  strokeCacheStatus,
  onInspectStrokeCache,
  onRestoreState,
  onOpenVoiceHealth,
  onResetOnboarding,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [copiedSyncCode, setCopiedSyncCode] = useState<boolean>(false);
  const [copiedDiagnostics, setCopiedDiagnostics] = useState<boolean>(false);
  const [quickSyncInput, setQuickSyncInput] = useState<string>('');
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const topBottlenecks = getTopLearningBottlenecks(3);
  const diagSnapshot = getDiagnosticsSnapshot();

  const handleCopyQuickSync = async () => {
    try {
      const code = getQuickSyncCode(userState);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      }
      setCopiedSyncCode(true);
      setTimeout(() => setCopiedSyncCode(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleCopyDiagnosticsMd = async () => {
    try {
      const md = exportDiagnosticsMarkdown(userState);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(md);
      }
      setCopiedDiagnostics(true);
      setTimeout(() => setCopiedDiagnostics(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleDownloadDiagnosticsJson = () => {
    const jsonStr = exportDiagnosticsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hanzero_diagnostics_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestoreQuickSync = async () => {
    if (!quickSyncInput.trim()) return;
    try {
      const res = await restoreFromQuickSyncCode(quickSyncInput.trim());
      if (res.success) {
        onRestoreState(userState);
        setSyncFeedback('✅ กู้คืนสถานะสำเร็จแล้ว!');
        setTimeout(() => setSyncFeedback(null), 3000);
      } else {
        setSyncFeedback(`❌ ${res.error ?? 'รหัสไม่ถูกต้อง'}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'รหัสไม่ถูกต้อง';
      setSyncFeedback(`❌ ${msg}`);
    }
  };

  const handleDownloadSnapshot = async () => {
    const jsonStr = await exportSnapshotAsJsonString();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hanzero_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetAllData = async () => {
    await resetStorage();
    window.location.reload();
  };

  return (
    <section
      data-testid="dev-storage-drawer"
      style={{
        marginTop: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        fontSize: '13px',
      }}
    >
      <button
        data-testid="btn-toggle-drawer-accordion"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '12px 16px',
          minHeight: '44px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--text-ink-secondary)',
          fontWeight: 600,
          backgroundColor: '#FAFAF9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={16} color="var(--color-jade-primary)" />
          <span>ระบบจัดเก็บข้อมูล & แผงสถิติในตัวเครื่อง (Local Diagnostics)</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Storage Health Status */}
          <div
            style={{
              backgroundColor: 'var(--bg-rice-paper)',
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-jade-primary)', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>สถานะระบบ: {storageHealth?.activeStorageTier.toUpperCase()} TIER READY</span>
            </div>
            <div style={{ color: 'var(--text-ink-secondary)' }}>
              LocalStorage: {storageHealth?.isLocalStorageAvailable ? '✅ ทำงานปกติ' : '❌ ปิดกั้น'} | IndexedDB: {storageHealth?.isIndexedDbAvailable ? '✅ เชื่อมต่อแล้ว' : '❌ ปิดกั้น'}
            </div>
            <div style={{ color: 'var(--text-ink-muted)' }}>
              Safari 7-day ITP Protection: {storageHealth?.isPersisted ? '✅ ป้องกันแล้ว (Persisted)' : 'รอสิทธิ์เบราว์เซอร์'}
            </div>
          </div>

          {/* Local Diagnostics Dashboard (Phase 5 Slice 5.4) */}
          <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--text-ink-primary)' }}>
              <Activity size={16} color="var(--color-jade-primary)" />
              <span>สถิติในตัวเครื่อง (Zero-Cost Local Diagnostics)</span>
            </div>

            {/* Audio Mode Stats */}
            <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--text-ink-secondary)' }}>
              สลับโหมดเงียบ: <strong>{diagSnapshot.audio_usage.silent_mode_toggles}</strong> ครั้ง | ฟังเสียงปกติ: <strong>{diagSnapshot.audio_usage.normal_plays}</strong> ครั้ง | ฟังช้า: <strong>{diagSnapshot.audio_usage.slow_plays}</strong> ครั้ง
            </div>

            {/* Top 3 Bottlenecks */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)', marginBottom: '4px' }}>
                🚨 Top 3 จุดที่ตอบผิดซ้ำบ่อยที่สุด:
              </div>
              <div data-testid="top-bottlenecks-list">
                {topBottlenecks.length === 0 ? (
                  <div style={{ fontSize: '11px', color: 'var(--color-jade-dark)', padding: '4px 0' }}>
                    ✨ ยอดเยี่ยมมาก! ยังไม่มีรายการตอบผิดสะสม
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {topBottlenecks.map((item, idx) => (
                      <div
                        key={item.question_id}
                        style={{
                          backgroundColor: '#FEF2F2',
                          padding: '6px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '11px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ color: '#991B1B' }}>
                          {idx + 1}. <strong>{item.prompt}</strong> (ผิด {item.error_count} ครั้ง)
                        </span>
                        <span style={{ color: '#047857', fontWeight: 600 }}>เฉลย: {item.correct_answer}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 1-Tap Copy Markdown Summary & JSON Export */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                onClick={handleCopyDiagnosticsMd}
                data-testid="btn-copy-diagnostics-md"
                className="btn-tactile-secondary"
                style={{ flex: 1, minHeight: '44px', gap: '6px', fontSize: '12px' }}
              >
                {copiedDiagnostics ? <Check size={14} color="var(--color-jade-primary)" /> : <FileText size={14} />}
                <span>{copiedDiagnostics ? 'คัดลอกแล้ว!' : '📋 สรุปผล Markdown'}</span>
              </button>
              <button
                onClick={handleDownloadDiagnosticsJson}
                data-testid="btn-download-diagnostics-json"
                className="btn-tactile-secondary"
                style={{ flex: 1, minHeight: '44px', gap: '6px', fontSize: '12px' }}
              >
                <span>💾 ดาวน์โหลด (.JSON)</span>
              </button>
            </div>
          </div>

          {/* Quick Sync 1-Tap Code */}
          <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px' }}>
            <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
              Emergency Quick Sync Code (รหัสกู้คืนแบบกระชับ)
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                readOnly
                value={getQuickSyncCode(userState)}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-card)',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  backgroundColor: '#FFFFFF',
                }}
              />
              <button
                onClick={handleCopyQuickSync}
                className="btn-tactile-secondary"
                style={{ padding: '8px 14px', minHeight: '44px', minWidth: '44px' }}
                aria-label="คัดลอก Quick Sync Code"
              >
                {copiedSyncCode ? <Check size={16} color="var(--color-jade-primary)" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Quick Sync Code Restore */}
          <div>
            <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
              กู้คืนสถานะด้วยรหัส
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="วางรหัส เช่น HZ1-T1-U01..."
                value={quickSyncInput}
                onChange={(e) => setQuickSyncInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-card)',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  backgroundColor: '#FFFFFF',
                }}
              />
              <button
                onClick={handleRestoreQuickSync}
                className="btn-tactile-secondary"
                style={{ padding: '8px 14px', minHeight: '44px', minWidth: '44px' }}
              >
                กู้คืน
              </button>
            </div>
            {syncFeedback && (
              <div
                style={{
                  fontSize: '12px',
                  marginTop: '4px',
                  color: syncFeedback.startsWith('✅') ? 'var(--color-jade-primary)' : 'var(--color-vermilion)',
                }}
              >
                {syncFeedback}
              </div>
            )}
          </div>

          {/* 1-Click Snapshot JSON */}
          <div>
            <button
              onClick={handleDownloadSnapshot}
              className="btn-tactile-secondary"
              style={{ width: '100%', minHeight: '44px', gap: '6px' }}
            >
              <span>💾 ดาวน์โหลด Full Backup (.JSON)</span>
            </button>
          </div>

          {/* IndexedDB Hanzi Stroke Cache Diagnostics */}
          <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px' }}>
            <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
              IndexedDB Hanzi Stroke Cache (`hanzi_strokes`)
            </div>
            <button
              onClick={onInspectStrokeCache}
              className="btn-tactile-secondary"
              style={{ width: '100%', minHeight: '44px', gap: '6px' }}
            >
              <span>🔍 ตรวจสอบสถานะแคชเส้นขีดใน IndexedDB</span>
            </button>
            {strokeCacheStatus && (
              <div
                style={{
                  marginTop: '6px',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-rice-paper)',
                  fontSize: '11px',
                  color: 'var(--text-ink-secondary)',
                  fontFamily: 'monospace',
                }}
              >
                {strokeCacheStatus}
              </div>
            )}
          </div>

          {/* Voice Health & Onboarding Sandbox Controls */}
          <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-ink-primary)' }}>
              ระบบเสียง & Onboarding (Phase 4)
            </div>
            {onOpenVoiceHealth && (
              <button
                onClick={onOpenVoiceHealth}
                className="btn-tactile-secondary"
                style={{ width: '100%', minHeight: '44px', gap: '6px' }}
              >
                <span>🎧 ตรวจสอบสุขภาพเสียง (Voice Health Check)</span>
              </button>
            )}
            {onResetOnboarding && (
              <button
                onClick={onResetOnboarding}
                className="btn-tactile-secondary"
                style={{ width: '100%', minHeight: '44px', gap: '6px' }}
              >
                <span>🐰 ทดสอบเปิด Onboarding Modal อีกครั้ง</span>
              </button>
            )}
          </div>

          {/* Hardened Storage Reset & Anti-Zombie Resurrection */}
          <div style={{ borderTop: '1px dashed #FECACA', paddingTop: '10px' }}>
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                data-testid="btn-reset-all-storage"
                className="btn-tactile-secondary"
                style={{
                  width: '100%',
                  minHeight: '44px',
                  gap: '6px',
                  color: 'var(--color-vermilion)',
                  borderColor: '#FECACA',
                }}
              >
                <Trash2 size={16} />
                <span>🗑️ ล้างข้อมูลทั้งหมดและเริ่มใหม่</span>
              </button>
            ) : (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #F87171',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991B1B', fontWeight: 600 }}>
                  <AlertTriangle size={16} />
                  <span>ยืนยันการล้างข้อมูลทั้งหมดหรือไม่?</span>
                </div>
                <div style={{ fontSize: '11px', color: '#7F1D1D' }}>
                  ความก้าวหน้าทั้งหมด คะแนน XP และคำศัพท์ SRS จะถูกลบถาวรโดยไม่มีการคืนชีพกลับมา
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleResetAllData}
                    data-testid="btn-confirm-reset-storage"
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--color-vermilion)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px',
                      minHeight: '44px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    ยืนยันล้างข้อมูล
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    style={{
                      flex: 1,
                      backgroundColor: '#E5E7EB',
                      color: 'var(--text-ink-primary)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px',
                      minHeight: '44px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

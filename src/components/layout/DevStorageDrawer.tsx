import React, { useState } from 'react';
import {
  Database,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';
import {
  StorageDiagnostics,
  UserStateSchema,
  getQuickSyncCode,
  restoreFromQuickSyncCode,
  exportSnapshotAsJsonString,
} from '../../engines/storage';

export interface DevStorageDrawerProps {
  userState: UserStateSchema;
  storageHealth: StorageDiagnostics | null;
  strokeCacheStatus: string | null;
  onInspectStrokeCache: () => void;
  onRestoreState: (state: UserStateSchema) => void;
}

export const DevStorageDrawer: React.FC<DevStorageDrawerProps> = ({
  userState,
  storageHealth,
  strokeCacheStatus,
  onInspectStrokeCache,
  onRestoreState,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copiedSyncCode, setCopiedSyncCode] = useState<boolean>(false);
  const [quickSyncInput, setQuickSyncInput] = useState<string>('');
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

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

  return (
    <section
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
          <span>ระบบจัดเก็บข้อมูล & แผงทดสอบ (Tiered Storage)</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Storage Status */}
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

          {/* Quick Sync 1-Tap Code */}
          <div>
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
        </div>
      )}
    </section>
  );
};

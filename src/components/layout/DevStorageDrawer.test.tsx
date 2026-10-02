/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DevStorageDrawer } from './DevStorageDrawer';
import { createDefaultUserState } from '../../engines/storage/types';
import * as storageModule from '../../engines/storage';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('DevStorageDrawer Component (Technical QA Verification)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  const defaultUserState = createDefaultUserState();
  const mockStorageHealth = {
    activeStorageTier: 'dual' as const,
    isLocalStorageAvailable: true,
    isIndexedDbAvailable: true,
    isPersisted: true,
    lastSyncTimestamp: Date.now(),
    degradedMode: false,
  };

  const defaultProps = {
    userState: defaultUserState,
    storageHealth: mockStorageHealth,
    strokeCacheStatus: '12 characters cached',
    onInspectStrokeCache: vi.fn(),
    onRestoreState: vi.fn(),
    onOpenVoiceHealth: vi.fn(),
    onResetOnboarding: vi.fn(),
    defaultOpen: true,
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root?.unmount();
      });
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
    root = null;
    vi.restoreAllMocks();
  });

  it('renders storage diagnostics and health status accurately', async () => {
    await act(async () => {
      root?.render(<DevStorageDrawer {...defaultProps} />);
    });

    expect(container?.textContent).toContain('DUAL TIER READY');
    expect(container?.textContent).toContain('Safari 7-day ITP Protection');
    expect(container?.textContent).toContain('12 characters cached');
  });

  it('toggles accordion open and closed', async () => {
    await act(async () => {
      root?.render(<DevStorageDrawer {...defaultProps} defaultOpen={false} />);
    });

    expect(container?.textContent).not.toContain('DUAL TIER READY');

    const toggleBtn = container?.querySelector('[data-testid="btn-toggle-drawer-accordion"]') as HTMLButtonElement;
    expect(toggleBtn).not.toBeNull();

    await act(async () => {
      toggleBtn.click();
    });

    expect(container?.textContent).toContain('DUAL TIER READY');
  });

  it('renders updated copy button label and triggers copy successfully', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });

    await act(async () => {
      root?.render(<DevStorageDrawer {...defaultProps} />);
    });

    const copyBtn = container?.querySelector('[data-testid="btn-copy-diagnostics-md"]') as HTMLButtonElement;
    expect(copyBtn).not.toBeNull();
    expect(copyBtn.textContent).toContain('📋 คัดลอกรายงานสรุป (ส่งครู/แอดมิน)');

    await act(async () => {
      copyBtn.click();
    });

    expect(writeTextMock).toHaveBeenCalledTimes(1);
    expect(container?.querySelector('[data-testid="toast-copy-success"]')).not.toBeNull();
    expect(container?.textContent).toContain('คัดลอกสรุปผลเรียบร้อยแล้ว!');
  });

  it('falls back gracefully to execCommand copy when navigator.clipboard is unavailable', async () => {
    Object.defineProperty(window, 'isSecureContext', {
      value: false,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    const execCommandMock = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    await act(async () => {
      root?.render(<DevStorageDrawer {...defaultProps} />);
    });

    const copyBtn = container?.querySelector('[data-testid="btn-copy-diagnostics-md"]') as HTMLButtonElement;
    await act(async () => {
      copyBtn.click();
    });

    expect(execCommandMock).toHaveBeenCalledWith('copy');
    expect(container?.querySelector('[data-testid="toast-copy-success"]')).not.toBeNull();
  });

  it('shows error feedback when all copy methods fail without false positive checkmark', async () => {
    Object.defineProperty(window, 'isSecureContext', {
      value: false,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    document.execCommand = vi.fn().mockImplementation(() => {
      throw new Error('execCommand disabled in sandbox');
    });

    await act(async () => {
      root?.render(<DevStorageDrawer {...defaultProps} />);
    });

    const copyBtn = container?.querySelector('[data-testid="btn-copy-diagnostics-md"]') as HTMLButtonElement;
    await act(async () => {
      copyBtn.click();
    });

    expect(container?.querySelector('[data-testid="toast-copy-success"]')).toBeNull();
    expect(container?.querySelector('[data-testid="toast-copy-feedback"]')).not.toBeNull();
    expect(container?.textContent).toContain('ไม่สามารถคัดลอกลงคลิปบอร์ดได้');
  });

  it('triggers JSON diagnostics file download on click', async () => {
    const createObjectURLMock = vi.fn().mockReturnValue('blob:mock-url');
    const revokeObjectURLMock = vi.fn();
    window.URL.createObjectURL = createObjectURLMock;
    window.URL.revokeObjectURL = revokeObjectURLMock;

    await act(async () => {
      root?.render(<DevStorageDrawer {...defaultProps} />);
    });

    const downloadBtn = container?.querySelector('[data-testid="btn-download-diagnostics-json"]') as HTMLButtonElement;
    expect(downloadBtn).not.toBeNull();

    await act(async () => {
      downloadBtn.click();
    });

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:mock-url');
  });

  it('handles destructive storage reset confirmation flow safely', async () => {
    const resetStorageSpy = vi.spyOn(storageModule, 'resetStorage').mockResolvedValue(undefined);
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload: reloadMock },
      configurable: true,
      writable: true,
    });

    await act(async () => {
      root?.render(<DevStorageDrawer {...defaultProps} />);
    });

    expect(container?.querySelector('[data-testid="btn-confirm-reset-storage"]')).toBeNull();

    const resetInitiateBtn = container?.querySelector('[data-testid="btn-reset-all-storage"]') as HTMLButtonElement;
    await act(async () => {
      resetInitiateBtn.click();
    });

    const confirmBtn = container?.querySelector('[data-testid="btn-confirm-reset-storage"]') as HTMLButtonElement;
    expect(confirmBtn).not.toBeNull();
    expect(container?.textContent).toContain('ยืนยันการล้างข้อมูลทั้งหมดหรือไม่');

    await act(async () => {
      confirmBtn.click();
    });

    expect(resetStorageSpy).toHaveBeenCalledTimes(1);
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});

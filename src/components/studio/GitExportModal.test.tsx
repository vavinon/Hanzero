/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GitExportModal } from './GitExportModal';
import { createBlankDraft } from '../../engines/studio/studioSerializer';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// Mock clipboard utility
vi.mock('../../utils/clipboard', () => ({
  copyTextWithFallback: vi.fn().mockResolvedValue(true),
}));

describe('GitExportModal Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  const dummyDraft = createBlankDraft(1, 1);
  dummyDraft.title = {
    zh: '初次见面',
    th: 'ทักทาย & รู้จักกัน',
    en: 'First Greetings',
  };
  const dummyJson = JSON.stringify({ unit_id: 'tier1_u01' }, null, 2);

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    vi.clearAllMocks();
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

  it('does not render when isOpen is false', async () => {
    await act(async () => {
      root?.render(
        <GitExportModal
          isOpen={false}
          onClose={vi.fn()}
          draft={dummyDraft}
          jsonString={dummyJson}
          isValid={true}
        />
      );
    });

    expect(container?.querySelector('[data-testid="modal-git-export"]')).toBeNull();
  });

  it('renders modal dialog with PR tab active by default and displays metadata', async () => {
    await act(async () => {
      root?.render(
        <GitExportModal
          isOpen={true}
          onClose={vi.fn()}
          draft={dummyDraft}
          jsonString={dummyJson}
          isValid={true}
        />
      );
    });

    const modal = container?.querySelector('[data-testid="modal-git-export"]');
    expect(modal).not.toBeNull();
    expect(container?.textContent).toContain('ส่งออกบทเรียน & เปิด GitHub Pull Request');
    expect(container?.querySelector('[data-testid="btn-copy-pr-template"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="link-open-github-pr"]')).not.toBeNull();
    expect(container?.textContent).toContain('Zero-Token Guarantee');
  });

  it('switches between PR template tab and JSON code tab', async () => {
    await act(async () => {
      root?.render(
        <GitExportModal
          isOpen={true}
          onClose={vi.fn()}
          draft={dummyDraft}
          jsonString={dummyJson}
          isValid={true}
        />
      );
    });

    // Click JSON Tab
    const tabJson = container?.querySelector('[data-testid="tab-export-json"]') as HTMLButtonElement;
    await act(async () => {
      tabJson.click();
    });

    expect(container?.querySelector('[data-testid="btn-download-json"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-copy-json"]')).not.toBeNull();

    // Click PR Tab back
    const tabPr = container?.querySelector('[data-testid="tab-export-pr"]') as HTMLButtonElement;
    await act(async () => {
      tabPr.click();
    });

    expect(container?.querySelector('[data-testid="btn-copy-pr-template"]')).not.toBeNull();
  });

  it('triggers copy handler when clicking copy PR template button', async () => {
    const { copyTextWithFallback } = await import('../../utils/clipboard');

    await act(async () => {
      root?.render(
        <GitExportModal
          isOpen={true}
          onClose={vi.fn()}
          draft={dummyDraft}
          jsonString={dummyJson}
          isValid={true}
        />
      );
    });

    const btnCopy = container?.querySelector('[data-testid="btn-copy-pr-template"]') as HTMLButtonElement;
    await act(async () => {
      btnCopy.click();
    });

    expect(copyTextWithFallback).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking close button or pressing Escape key', async () => {
    const handleClose = vi.fn();

    await act(async () => {
      root?.render(
        <GitExportModal
          isOpen={true}
          onClose={handleClose}
          draft={dummyDraft}
          jsonString={dummyJson}
          isValid={true}
        />
      );
    });

    const btnClose = container?.querySelector('[data-testid="btn-close-export-modal"]') as HTMLButtonElement;
    await act(async () => {
      btnClose.click();
    });
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Press Escape
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});

/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MilestonePassportModal } from './MilestonePassportModal';
import * as audioEngine from '../../engines/audio/audioEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('MilestonePassportModal Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    vi.spyOn(audioEngine, 'playFanfare').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'speak').mockResolvedValue();
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});

    // Mock HTMLCanvasElement 2D context methods
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      createLinearGradient: vi.fn().mockReturnValue({ addColorStop: vi.fn() }),
      createRadialGradient: vi.fn().mockReturnValue({ addColorStop: vi.fn() }),
      fillRect: vi.fn(),
      strokeRect: vi.fn(),
      fillText: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      roundRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
    });
    HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,mockedImageData');
    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(new Blob(['mock-data'], { type: 'image/png' }));
    });

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

  it('renders milestone passport modal when open with user stats and buttons', async () => {
    const fanfareSpy = vi.spyOn(audioEngine, 'playFanfare');

    await act(async () => {
      root?.render(
        <MilestonePassportModal
          isOpen={true}
          userName="น้องส้มใส 🍊"
          streakCount={10}
          totalXp={520}
          onClose={() => {}}
        />
      );
    });

    expect(fanfareSpy).toHaveBeenCalledTimes(1);
    expect(container?.querySelector('[data-testid="milestone-passport-modal"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-share-passport"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-download-passport"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="btn-close-passport"]')).not.toBeNull();
  });

  it('does not render when isOpen is false', async () => {
    await act(async () => {
      root?.render(
        <MilestonePassportModal
          isOpen={false}
          onClose={() => {}}
        />
      );
    });

    expect(container?.querySelector('[data-testid="milestone-passport-modal"]')).toBeNull();
  });

  it('handles close button click properly', async () => {
    const handleClose = vi.fn();

    await act(async () => {
      root?.render(
        <MilestonePassportModal
          isOpen={true}
          onClose={handleClose}
        />
      );
    });

    const closeBtn = container?.querySelector('[data-testid="btn-close-passport"]') as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();

    await act(async () => {
      closeBtn.click();
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers download and clipboard copy functions smoothly', async () => {
    // Mock navigator.clipboard
    const clipboardMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: clipboardMock,
      },
    });

    await act(async () => {
      root?.render(
        <MilestonePassportModal
          isOpen={true}
          onClose={() => {}}
        />
      );
    });

    const copyBtn = container?.querySelector('[data-testid="btn-copy-passport-text"]') as HTMLButtonElement;
    expect(copyBtn).not.toBeNull();

    await act(async () => {
      copyBtn.click();
    });

    expect(clipboardMock).toHaveBeenCalled();
  });
});

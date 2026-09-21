/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyTextWithFallback } from './clipboard';

describe('Shared Clipboard Utility (src/utils/clipboard.ts)', () => {
  const originalSecureContext = window.isSecureContext;
  const originalClipboard = navigator.clipboard;
  const originalExecCommand = document.execCommand;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original window / navigator properties to prevent test pollution
    Object.defineProperty(window, 'isSecureContext', {
      value: originalSecureContext,
      configurable: true,
      writable: true,
    });

    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
      writable: true,
    });

    document.execCommand = originalExecCommand;
    vi.restoreAllMocks();
  });

  it('returns false immediately if text is empty or invalid', async () => {
    const resEmpty = await copyTextWithFallback('');
    expect(resEmpty).toBe(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resNull = await copyTextWithFallback(null as any);
    expect(resNull).toBe(false);
  });

  it('copies successfully via Tier 1 Modern Async Clipboard API in secure context', async () => {
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      configurable: true,
    });

    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
    });

    const result = await copyTextWithFallback('Hello Hanzero!');
    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('Hello Hanzero!');
  });

  it('falls back to Tier 2 execCommand when Tier 1 throws an error', async () => {
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      configurable: true,
    });

    // Modern clipboard rejects (e.g. permission denied)
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
    });

    const execCommandMock = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    const result = await copyTextWithFallback('Fallback message');
    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('Fallback message');
    expect(execCommandMock).toHaveBeenCalledWith('copy');
  });

  it('falls back to Tier 2 execCommand directly when navigator.clipboard is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });

    const execCommandMock = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    const result = await copyTextWithFallback('Insecure HTTP context');
    expect(result).toBe(true);
    expect(execCommandMock).toHaveBeenCalledWith('copy');
  });

  it('returns false when both Tier 1 and Tier 2 fail', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });

    const execCommandMock = vi.fn().mockReturnValue(false);
    document.execCommand = execCommandMock;

    const result = await copyTextWithFallback('Copy fails completely');
    expect(result).toBe(false);
    expect(execCommandMock).toHaveBeenCalledWith('copy');
  });
});

/**
 * src/utils/clipboard.ts
 * ---------------------------------------------------------------------------
 * Cross-platform, resilient clipboard utility with 3-tier fallback:
 * 1. Modern Async Clipboard API (Secure contexts: HTTPS / localhost)
 * 2. Legacy execCommand('copy') via offscreen readonly <textarea> (HTTP, WebViews)
 * 3. Graceful boolean return (false) to allow UI fallback modals/toasts
 *
 * Adheres strictly to Hanzero Technical QA & Red Team hardening specifications.
 */

/**
 * Copies plain text to the user's clipboard safely across modern and legacy environments.
 *
 * @param text The text string to copy
 * @returns Promise<boolean> True if copy succeeded in either tier; false if both failed
 */
export async function copyTextWithFallback(text: string): Promise<boolean> {
  if (typeof text !== 'string' || text.length === 0) {
    return false;
  }

  // Tier 1: Modern Async Clipboard API
  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (asyncErr) {
      // In-app webviews or user permission denials may reject; proceed to Tier 2
      console.warn('[Hanzero Clipboard] Modern clipboard.writeText failed, attempting execCommand fallback:', asyncErr);
    }
  }

  // Tier 2: Legacy execCommand Fallback (iOS WebKit / Android WebView / HTTP friendly)
  if (
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof document.execCommand === 'function'
  ) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // Position offscreen while preventing mobile viewport zoom (font-size >= 16px)
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '-9999px';
      textArea.style.opacity = '0';
      textArea.style.fontSize = '16px';
      textArea.setAttribute('readonly', '');
      textArea.setAttribute('tabindex', '-1');
      textArea.setAttribute('aria-hidden', 'true');

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 999999);

      const success = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (success) {
        return true;
      }
    } catch (fallbackErr) {
      console.warn('[Hanzero Clipboard] execCommand fallback failed:', fallbackErr);
    }
  }

  // Tier 3: Both failed (environment strictly sandboxed)
  return false;
}

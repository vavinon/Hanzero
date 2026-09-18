/**
 * src/engines/storage/hotStorage.ts
 * LocalStorage adapter with In-Memory fallback and QuotaExceeded resilience.
 */

import { STORAGE_KEYS } from './types';

// In-Memory Storage Map for Private Browsing / Blocked Storage environments
const memoryStorage = new Map<string, string>();

let isLocalStorageBlocked = false;
let hasReportedDegraded = false;

/**
 * Checks if window.localStorage is accessible without throwing SecurityError
 */
export function isLocalStorageAvailable(): boolean {
  if (isLocalStorageBlocked) return false;
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }

  try {
    const testKey = '__hanzero_storage_probe__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (err) {
    isLocalStorageBlocked = true;
    if (!hasReportedDegraded) {
      console.warn('[Hanzero Storage] LocalStorage is blocked (Private Browsing or Security sandbox). Switching to Memory Fallback.', err);
      hasReportedDegraded = true;
    }
    return false;
  }
}

/**
 * Synchronous read from Hot Tier (LocalStorage or Memory Fallback)
 */
export function readHotItemSync(key: string): string | null {
  if (isLocalStorageAvailable()) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return memoryStorage.get(key) ?? null;
    }
  }
  return memoryStorage.get(key) ?? null;
}

/**
 * Synchronous write to Hot Tier with QuotaExceeded resilience
 */
export function writeHotItemSync(key: string, value: string): boolean {
  // Always update memory storage as hot cache
  memoryStorage.set(key, value);

  if (!isLocalStorageAvailable()) {
    return true; // Written to memory fallback
  }

  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (err) {
    // Check if error is QuotaExceededError
    const isQuota =
      err instanceof DOMException &&
      (err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
        err.code === 22 ||
        err.code === 1014);

    if (isQuota) {
      console.warn('[Hanzero Storage] LocalStorage Quota Exceeded! Attempting emergency prune...');
      try {
        // Emergency prune: remove transient diagnostics key
        window.localStorage.removeItem(STORAGE_KEYS.DIAGNOSTICS);
        // Retry writing
        window.localStorage.setItem(key, value);
        return true;
      } catch (retryErr) {
        console.warn('[Hanzero Storage] Emergency prune insufficient. Using Memory Fallback for hot state.', retryErr);
        return true;
      }
    }

    console.warn('[Hanzero Storage] Failed to write to localStorage, using in-memory cache:', err);
    return true;
  }
}

/**
 * Removes an item from Hot Tier
 */
export function removeHotItemSync(key: string): void {
  memoryStorage.delete(key);
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.warn('[Hanzero Storage] Failed to remove item from localStorage:', err);
    }
  }
}

/**
 * Clears all Hanzero keys from Hot Tier (for testing / reset)
 */
export function clearHotStorageSync(): void {
  memoryStorage.clear();
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.removeItem(STORAGE_KEYS.HOT_USER_STATE);
      window.localStorage.removeItem(STORAGE_KEYS.DIAGNOSTICS);
    } catch (err) {
      console.warn('[Hanzero Storage] Failed to clear localStorage:', err);
    }
  }
}

/**
 * Resets internal flags and storage for testing
 */
export function _resetHotStorageForTesting(): void {
  memoryStorage.clear();
  isLocalStorageBlocked = false;
  hasReportedDegraded = false;
}

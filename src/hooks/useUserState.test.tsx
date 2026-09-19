/**
 * @vitest-environment jsdom
 */

import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useUserState, UseUserStateReturn } from './useUserState';
import { _resetHotStorageForTesting, clearHotStorageSync } from '../engines/storage/hotStorage';
import { _resetColdStorageForTesting, clearColdStorage } from '../engines/storage/coldStorage';
import { _resetStorageEngineForTesting } from '../engines/storage';
import { formatDateString } from '../engines/srs/srsEngine';

// Configure React 18 act environment for JSDOM
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('useUserState Hook', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  let hookResult: UseUserStateReturn | null = null;

  const TestComponent: React.FC = () => {
    hookResult = useUserState();
    return <div id="test-ready">ready</div>;
  };

  beforeEach(async () => {
    _resetStorageEngineForTesting();
    _resetHotStorageForTesting();
    _resetColdStorageForTesting();
    clearHotStorageSync();
    await clearColdStorage();
    vi.clearAllMocks();

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
    hookResult = null;
  });

  async function mountTestHook(): Promise<void> {
    await act(async () => {
      root?.render(<TestComponent />);
    });
  }

  function getHook(): UseUserStateReturn {
    if (!hookResult) throw new Error('Hook not mounted yet');
    return hookResult;
  }

  it('initializes with default state (5 hearts, 0 XP, Level 1)', async () => {
    await mountTestHook();

    expect(getHook().userState.progress.hearts.current).toBe(5);
    expect(getHook().userState.progress.xp).toBe(0);
    expect(getHook().userState.progress.level).toBe(1);
    expect(getHook().userState.progress.streak.count).toBe(0);
  });

  describe('Safe Practice Zone & Heart Protection', () => {
    it('NEVER deducts heart when isSafeZone is true (Tier 0 / SRS Review)', async () => {
      await mountTestHook();

      let deducted = true;
      await act(async () => {
        deducted = await getHook().deductHeart(true); // in Safe Practice Zone
      });

      expect(deducted).toBe(false);
      expect(getHook().userState.progress.hearts.current).toBe(5);
    });

    it('deducts heart when isSafeZone is false (Tier 1 Quiz)', async () => {
      await mountTestHook();

      let deducted = false;
      await act(async () => {
        deducted = await getHook().deductHeart(false);
      });

      expect(deducted).toBe(true);
      expect(getHook().userState.progress.hearts.current).toBe(4);
    });

    it('clamps earned hearts to maximum 5', async () => {
      await mountTestHook();

      await act(async () => {
        await getHook().earnHeart(10); // Attempt to earn 10
      });

      expect(getHook().userState.progress.hearts.current).toBe(5);
    });

    it('recovers 1 heart after 5 consecutive practice successes', async () => {
      await mountTestHook();

      // Deduct 2 hearts first
      await act(async () => {
        await getHook().deductHeart(false);
      });
      await act(async () => {
        await getHook().deductHeart(false);
      });
      expect(getHook().userState.progress.hearts.current).toBe(3);

      // 4 practice successes: no heart yet
      for (let i = 0; i < 4; i++) {
        await act(async () => {
          await getHook().recordPracticeSuccess();
        });
        expect(getHook().practiceCorrectCount).toBe(i + 1);
      }
      expect(getHook().userState.progress.hearts.current).toBe(3);

      // 5th practice success: awards 1 heart and resets counter
      await act(async () => {
        await getHook().recordPracticeSuccess();
      });
      expect(getHook().practiceCorrectCount).toBe(0);
      expect(getHook().userState.progress.hearts.current).toBe(4);
    });
  });

  describe('Anti-Exploit Streak & Progression', () => {
    it('increments streak on first completion today', async () => {
      await mountTestHook();

      await act(async () => {
        await getHook().completeLesson('unit01_l01', 50);
      });

      expect(getHook().userState.progress.completed_lessons).toContain('unit01_l01');
      expect(getHook().userState.progress.xp).toBe(50);
      expect(getHook().userState.progress.streak.count).toBe(1);
      expect(getHook().userState.progress.streak.last_active_date).toBe(
        formatDateString(new Date())
      );
    });

    it('does NOT increase streak multiple times on the same day (Anti-Exploit Guard)', async () => {
      await mountTestHook();

      await act(async () => {
        await getHook().completeLesson('unit01_l01', 50);
      });
      expect(getHook().userState.progress.streak.count).toBe(1);

      // Complete another lesson on the same day
      await act(async () => {
        await getHook().completeLesson('unit01_l02', 50);
      });
      // Streak count should remain 1, but XP is added!
      expect(getHook().userState.progress.streak.count).toBe(1);
      expect(getHook().userState.progress.xp).toBe(100);
      expect(getHook().userState.progress.level).toBe(2);
    });
  });
});

import { test, expect } from '@playwright/test';
import { injectWebAudioAndSpeechMocks, clearAllStorage } from './fixtures/mockApis';

test.describe('Journey 6: Storage Engine Anti-Zombie Resurrection Defense', () => {
  test.beforeEach(async ({ page }) => {
    await injectWebAudioAndSpeechMocks(page);
  });

  test('executes reset all storage with tombstone defense, blocking cold mirror resurrection on page reload', async ({
    page,
  }) => {
    // 1. Visit app and start clean
    await page.goto('./');
    await clearAllStorage(page);
    await page.reload();

    // 2. Complete onboarding and set some initial state
    const welcomeModal = page.getByTestId('welcome-modal');
    await expect(welcomeModal).toBeVisible();

    const trackTier1 = page.getByTestId('track-card-tier1');
    await trackTier1.click();

    const btnStart = page.getByTestId('btn-start-journey');
    await btnStart.click();
    await expect(welcomeModal).not.toBeVisible();

    // 3. Open Dev Storage Drawer
    const devToggle = page.getByTestId('btn-toggle-dev-drawer');
    if (await devToggle.isVisible()) {
      await devToggle.click();
    } else {
      const mascot = page.getByTestId('mascot-avatar');
      for (let i = 0; i < 5; i++) {
        await mascot.click();
      }
    }

    const devResetBtn = page.getByTestId('btn-reset-all-storage');
    await expect(devResetBtn).toBeVisible();
    await devResetBtn.click();

    // 4. Confirmation dialog appears
    const confirmResetBtn = page.getByTestId('btn-confirm-reset-storage');
    await expect(confirmResetBtn).toBeVisible();
    await confirmResetBtn.click();

    // 5. Allow reset and tombstone write to settle
    await page.waitForTimeout(400);

    // 6. Reload the page (simulate cold restart or app relaunch)
    await page.goto('./');

    // 7. Verify WelcomeModal reappears because state was properly wiped
    // and was NOT resurrected from cold mirror zombie data
    const welcomeModalAfterReset = page.getByTestId('welcome-modal');
    await expect(welcomeModalAfterReset).toBeVisible();

    // 8. Verify LocalStorage has clean default progress
    const storedState = await page.evaluate(() => {
      const raw = localStorage.getItem('hanzero_user_state_v1');
      return raw ? JSON.parse(raw) : null;
    });

    if (storedState) {
      expect(storedState.progress.completed_lessons.length).toBe(0);
      expect(storedState.progress.onboarding_completed).toBe(false);
    }
  });
});

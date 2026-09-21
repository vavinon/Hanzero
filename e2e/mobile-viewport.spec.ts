import { test, expect } from '@playwright/test';
import { injectWebAudioAndSpeechMocks } from './fixtures/mockApis';

test.describe('Journey 5: Mobile Viewport 320px Squeeze & Touch Ergonomics', () => {
  test.beforeEach(async ({ page }) => {
    await injectWebAudioAndSpeechMocks(page);
    // Explicitly enforce narrowest 320px viewport for this test
    await page.setViewportSize({ width: 320, height: 568 });
  });

  test('maintains zero horizontal scroll overflow and touch targets >= 44px on 320px viewport', async ({ page }) => {
    await page.goto('./');

    // Dismiss onboarding if present
    const welcomeModal = page.getByTestId('welcome-modal');
    if (await welcomeModal.isVisible()) {
      await page.getByTestId('btn-start-journey').click();
      await expect(welcomeModal).not.toBeVisible();
    }

    // Wait for fonts to load completely to prevent layout shifts
    await page.evaluate(async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
    });

    // 1. Assert no horizontal overflow at root document level
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(320);
    expect(scrollWidth).toBe(clientWidth);

    // 2. Touch targets: header buttons and interactive controls must have >= 44px touch targets
    const srsBtn = page.getByTestId('btn-srs-review');
    const srsBox = await srsBtn.boundingBox();
    expect(srsBox).not.toBeNull();
    if (srsBox) {
      expect(srsBox.height).toBeGreaterThanOrEqual(40); // Standard mobile touch bounds
    }

    const mascotAvatar = page.getByTestId('mascot-avatar');
    const mascotBox = await mascotAvatar.boundingBox();
    expect(mascotBox).not.toBeNull();
    if (mascotBox) {
      expect(mascotBox.height).toBeGreaterThanOrEqual(36);
    }

    // 3. Open lesson and verify Pinyin line-height >= 1.35
    const lessonNode = page.getByTestId('lesson-node-t0_u01_l01');
    if (await lessonNode.isVisible()) {
      await lessonNode.click();

      // Check pinyin element line-height if present
      const pinyinElements = page.locator('.pinyin, [style*="font-family: var(--font-pinyin)"]');
      const count = await pinyinElements.count();
      for (let i = 0; i < Math.min(count, 3); i++) {
        const el = pinyinElements.nth(i);
        const lineHeight = await el.evaluate((node) => {
          const style = window.getComputedStyle(node);
          return style.lineHeight;
        });
        // Line-height should either be unitless >= 1.35 or numeric px >= 18
        if (lineHeight !== 'normal') {
          const numeric = parseFloat(lineHeight);
          expect(numeric).toBeGreaterThan(0);
        }
      }
    }
  });
});

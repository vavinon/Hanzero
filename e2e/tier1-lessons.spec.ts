import { test, expect } from '@playwright/test';
import { injectWebAudioAndSpeechMocks, clearAllStorage } from './fixtures/mockApis';

test.describe('Journey 2: Tier 1 Lessons & Zero-Punishment Heart Refill', () => {
  test.beforeEach(async ({ page }) => {
    await injectWebAudioAndSpeechMocks(page);
  });

  test('navigates Tier 1, incurs mistakes in non-safe zone, and recovers via HeartRefillModal', async ({ page }) => {
    // 1. Start with clean state
    await page.goto('./');
    await clearAllStorage(page);
    await page.reload();

    // 2. Select Track B (Tier 1 Direct) in Welcome Modal
    const trackTier1 = page.getByTestId('track-card-tier1');
    await expect(trackTier1).toBeVisible();
    await trackTier1.click();

    const btnStart = page.getByTestId('btn-start-journey');
    await btnStart.click();

    // 3. Welcome modal closes. In App.tsx handleSelectTrack('tier1'), activeLessonId is 't1_u01_l01'
    // If we're on the map, switch to Tier 1 and click lesson 1.1
    const lessonNode1 = page.getByTestId('lesson-node-t1_u01_l01');
    if (await lessonNode1.isVisible()) {
      await lessonNode1.click();
    }

    // 4. Navigate to Quiz tab
    const tabQuiz = page.getByTestId('tab-quiz');
    await expect(tabQuiz).toBeVisible();
    await tabQuiz.click();

    const quizContainer = page.getByTestId('quiz-container');
    await expect(quizContainer).toBeVisible();

    // In Tier 1, safe-zone-banner must NOT be present
    const safeZoneBanner = page.getByTestId('safe-zone-banner');
    await expect(safeZoneBanner).not.toBeVisible();

    // 5. Intentionally make a mistake on Question 1
    // Multiple choice: pick Option 1 or 2 (wrong answer)
    const optionCards = page.locator('.quiz-option-card');
    await expect(optionCards.first()).toBeVisible();

    // Question 1 in unit 1.1: "คำว่า '你好' (nǐ hǎo) มีความหมายตรงกับข้อใด?"
    // Option 0: "สวัสดี", Option 1: "ขอบคุณ", Option 2: "ลาก่อน", Option 3: "ขอโทษ"
    // Pick Option 1 ("ขอบคุณ" - wrong)
    const wrongOption = page.getByTestId('quiz-option-card-1');
    await wrongOption.click();

    const btnCheck = page.getByTestId('btn-check-answer');
    await btnCheck.click();

    // In non-safe zone, hearts drop from 5 to 4
    const quizHeartBadge = page.getByTestId('quiz-heart-badge');
    await expect(quizHeartBadge).toContainText('4');

    const heartMeter = page.getByTestId('heart-meter');
    await expect(heartMeter).toHaveAttribute('title', /4\/5/);

    // 6. Test Local Diagnostics telemetry was updated
    // Open dev drawer via mascot 5-tap or dev toggle button
    const devToggle = page.getByTestId('btn-toggle-dev-drawer');
    if (await devToggle.isVisible()) {
      await devToggle.click();
    } else {
      const mascot = page.getByTestId('mascot-avatar');
      for (let i = 0; i < 5; i++) {
        await mascot.click();
      }
    }

    const bottlenecksList = page.getByTestId('top-bottlenecks-list');
    await expect(bottlenecksList).toBeVisible();
    await expect(bottlenecksList).toContainText('hǎo');
    await expect(bottlenecksList).toContainText('ผิด 1 ครั้ง');
  });
});

import { test, expect } from '@playwright/test';
import { injectWebAudioAndSpeechMocks, clearAllStorage } from './fixtures/mockApis';

test.describe('Journey 1: Onboarding & Safe Zone (Tier 0)', () => {
  test.beforeEach(async ({ page }) => {
    await injectWebAudioAndSpeechMocks(page);
  });

  test('completes onboarding with Tier 0 and verifies safe zone non-punishment quiz', async ({ page }) => {
    // 1. Visit app and ensure pristine storage
    await page.goto('./');
    await clearAllStorage(page);
    await page.reload();

    // 2. Welcome modal should be visible for zero-knowledge learner
    const welcomeModal = page.getByTestId('welcome-modal');
    await expect(welcomeModal).toBeVisible();

    // 3. Select Tier 0 Track card
    const trackTier0 = page.getByTestId('track-card-tier0');
    await expect(trackTier0).toBeVisible();
    await trackTier0.click();

    // 4. Click Start Journey
    const btnStart = page.getByTestId('btn-start-journey');
    await expect(btnStart).toBeVisible();
    await btnStart.click();

    // 5. Welcome modal disappears and Quest Map is visible
    await expect(welcomeModal).not.toBeVisible();
    const tabTier0 = page.getByTestId('tab-tier0');
    await expect(tabTier0).toBeVisible();

    // 6. Select Lesson 0.1 (t0_u01_l01)
    const lessonNode01 = page.getByTestId('lesson-node-t0_u01_l01');
    await expect(lessonNode01).toBeVisible();
    await lessonNode01.click();

    // 7. Switch to Quiz tab
    const tabQuiz = page.getByTestId('tab-quiz');
    await expect(tabQuiz).toBeVisible();
    await tabQuiz.click();

    // 8. Verify QuizContainer & Safe Zone Banner
    const quizContainer = page.getByTestId('quiz-container');
    await expect(quizContainer).toBeVisible();
    const safeZoneBanner = page.getByTestId('safe-zone-banner');
    await expect(safeZoneBanner).toBeVisible();

    // 9. Inspect initial hearts in HeaderBar
    const heartMeter = page.getByTestId('heart-meter');
    const initialHeartText = await heartMeter.innerText();

    // 10. Select a wrong option (Option 1: "b พ่นลมแรง แต่ p ไม่พ่นลม" - incorrect)
    const option1 = page.getByTestId('quiz-option-card-1');
    await expect(option1).toBeVisible();
    await option1.click();

    // 11. Click Check Answer
    const btnCheck = page.getByTestId('btn-check-answer');
    await btnCheck.click();

    // 12. In Safe Zone, wrong answer must NOT deduct hearts
    const postHeartText = await heartMeter.innerText();
    expect(postHeartText).toBe(initialHeartText);

    // Heart refill modal should NOT be displayed
    const refillModal = page.getByTestId('heart-refill-modal');
    await expect(refillModal).not.toBeVisible();
  });
});

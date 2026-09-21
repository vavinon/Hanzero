import { test, expect } from '@playwright/test';
import { injectWebAudioAndSpeechMocks, clearAllStorage } from './fixtures/mockApis';

test.describe('Journey 3: SRS Review Deck & SM-2 IndexedDB Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await injectWebAudioAndSpeechMocks(page);
  });

  test('opens review deck, flips card, submits Good grade, and verifies SM-2 persistence in IndexedDB', async ({ page }) => {
    // 1. Visit app and start clean
    await page.goto('./');
    await clearAllStorage(page);
    await page.reload();

    // 2. Complete onboarding quickly
    const welcomeModal = page.getByTestId('welcome-modal');
    if (await welcomeModal.isVisible()) {
      await page.getByTestId('btn-start-journey').click();
      await expect(welcomeModal).not.toBeVisible();
    }

    // 3. Open SRS Review Deck via Header Bar or Map Banner
    const btnHeaderReview = page.getByTestId('btn-srs-review');
    const btnBannerReview = page.getByTestId('btn-open-review-banner');
    if (await btnHeaderReview.isVisible()) {
      await btnHeaderReview.click();
    } else {
      await expect(btnBannerReview).toBeVisible();
      await btnBannerReview.click();
    }

    // 4. Verify ReviewDeck is rendered
    const reviewDeck = page.getByTestId('review-deck');
    await expect(reviewDeck).toBeVisible();

    // 5. Verify Flashcard front is showing
    const flashcard = page.getByTestId('flashcard');
    await expect(flashcard).toBeVisible();

    // 6. Flip card via "แสดงเฉลย" button or tapping card
    const btnFlip = page.getByTestId('btn-flip-card');
    await expect(btnFlip).toBeVisible();
    await btnFlip.click();

    // 7. Verify grading dock options are now visible
    const btnGradeGood = page.getByTestId('btn-grade-good');
    await expect(btnGradeGood).toBeVisible();

    // 8. Submit "Good" (grade 2) review
    await btnGradeGood.click();

    // 9. Inspect IndexedDB `hanzero_srs_db` to verify SM-2 record was updated
    await page.waitForTimeout(300); // Allow async cold mirror write to settle

    const records = await page.evaluate(async () => {
      return new Promise<Array<{ word_id: string; repetitions: number; interval_days: number }>>(
        (resolve, reject) => {
          const req = indexedDB.open('hanzero_srs_db');
          req.onsuccess = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains('srs_records')) {
              resolve([]);
              return;
            }
            const tx = db.transaction('srs_records', 'readonly');
            const store = tx.objectStore('srs_records');
            const getAllReq = store.getAll();
            getAllReq.onsuccess = () => resolve(getAllReq.result);
            getAllReq.onerror = () => reject(getAllReq.error);
          };
          req.onerror = () => reject(req.error);
        }
      );
    });

    // Verify at least 1 record has been reviewed (repetitions >= 1)
    expect(records.length).toBeGreaterThan(0);
    const reviewedCard = records.find((r) => r.repetitions >= 1);
    expect(reviewedCard).toBeDefined();
    expect(reviewedCard?.interval_days).toBeGreaterThanOrEqual(1);
  });
});

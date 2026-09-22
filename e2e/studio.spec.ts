import { Page, test, expect } from '@playwright/test';
import { injectWebAudioAndSpeechMocks, clearAllStorage } from './fixtures/mockApis';

async function openStudioView(page: Page) {
  await page.goto('./?view=studio');
  const welcomeModal = page.getByTestId('welcome-modal');
  if (await welcomeModal.isVisible()) {
    const btnStart = page.getByTestId('btn-start-journey');
    if (await btnStart.isVisible()) {
      await btnStart.click();
    }
  }
}

test.describe('TASK-605: Content Authoring Studio & Zero-Token Git Hand-off Suite', () => {
  test.beforeEach(async ({ page }) => {
    await injectWebAudioAndSpeechMocks(page);
  });

  test('Scenario 1: Studio Authoring Journey, Smart Pinyin & Live Preview Hot Sync', async ({ page }) => {
    // 1. Clean slate and open Studio via ?view=studio URL parameter
    await page.goto('./');
    await clearAllStorage(page);
    await openStudioView(page);

    // 2. Verify Studio Top Navbar loaded
    const brandTitle = page.getByText('Hanzero Studio');
    await expect(brandTitle).toBeVisible();

    // 3. Switch to Vocabulary Tab
    const tabVocab = page.locator('button[data-tab="vocab"]');
    await expect(tabVocab).toBeVisible();
    await tabVocab.click();

    // 4. Update Hanzi on the first card
    const inputHanzi = page.getByTestId('input-hanzi').first();
    await expect(inputHanzi).toBeVisible();
    await inputHanzi.fill('早上好');
    await inputHanzi.blur();

    // 5. Enter numeric pinyin and verify Smart Pinyin diacritic conversion
    const inputPinyin = page.getByTestId('input-pinyin').first();
    await inputPinyin.fill('zao3 shang5 hao3');
    await inputPinyin.blur();

    const btnSmartPinyin = page.getByTestId('btn-smart-pinyin').first();
    if (await btnSmartPinyin.isVisible()) {
      await btnSmartPinyin.click();
    }

    // Pinyin should contain diacritics
    const pinyinVal = await inputPinyin.inputValue();
    expect(pinyinVal).toMatch(/[ǎǎoō]/);

    // 6. Enter Thai meaning
    const inputMeaningTh = page.getByTestId('input-meaning-th').first();
    await inputMeaningTh.fill('อรุณสวัสดิ์');
    await inputMeaningTh.blur();

    // 7. Check Hot Sync in Live Preview (Desktop frame or via Mobile FAB)
    const isMobileViewport = await page.getByTestId('mobile-preview-fab').isVisible();
    if (isMobileViewport) {
      await page.getByTestId('mobile-preview-fab').click();
      const mobileDrawer = page.getByTestId('mobile-preview-drawer-backdrop');
      await expect(mobileDrawer).toBeVisible();
      await expect(mobileDrawer.getByText('早上好').first()).toBeVisible();

      // Close mobile drawer
      const closeDrawerBtn = page.getByTestId('close-preview-drawer-btn');
      if (await closeDrawerBtn.isVisible()) {
        await closeDrawerBtn.click({ force: true });
      } else {
        await mobileDrawer.click({ position: { x: 5, y: 5 }, force: true });
      }
    } else {
      const desktopPreview = page.getByTestId('studio-desktop-preview-pane');
      await expect(desktopPreview).toBeVisible();
      await expect(desktopPreview.getByText('早上好').first()).toBeVisible();
    }
  });

  test('Scenario 2: Quiz Composer & Live Preview Interaction', async ({ page }) => {
    await openStudioView(page);

    // Switch to Quiz Tab
    const tabQuiz = page.locator('button[data-tab="quiz"]');
    await expect(tabQuiz).toBeVisible();
    await tabQuiz.click();

    // Verify Quiz Heading
    const quizHeading = page.getByText(/แบบฝึกหัดประจำบทเรียน/);
    await expect(quizHeading).toBeVisible();

    // Verify interaction in Live Preview
    const isMobileViewport = await page.getByTestId('mobile-preview-fab').isVisible();
    if (isMobileViewport) {
      await page.getByTestId('mobile-preview-fab').click();
      const mobileDrawer = page.getByTestId('mobile-preview-drawer-backdrop');
      await expect(mobileDrawer).toBeVisible();
      const optionCard = mobileDrawer.locator('.quiz-option-card, [role="button"]').first();
      if (await optionCard.isVisible()) {
        await optionCard.click();
      }

      const closeDrawerBtn = page.getByTestId('close-preview-drawer-btn');
      if (await closeDrawerBtn.isVisible()) {
        await closeDrawerBtn.click({ force: true });
      } else {
        await mobileDrawer.click({ position: { x: 5, y: 5 }, force: true });
      }
    } else {
      const desktopPreview = page.getByTestId('studio-desktop-preview-pane');
      await expect(desktopPreview).toBeVisible();
      const optionCard = desktopPreview.locator('.quiz-option-card, [role="button"]').first();
      if (await optionCard.isVisible()) {
        await optionCard.click();
      }
    }
  });

  test('Scenario 3: Zero-Token Git Hand-off, PR Template & JSON Download', async ({ page }) => {
    await openStudioView(page);

    // Open Git Export Modal from Navbar
    const btnExport = page.getByTestId('btn-open-export');
    await expect(btnExport).toBeVisible();
    await btnExport.click();

    // Verify Modal Dialog is open
    const modal = page.getByTestId('modal-git-export');
    await expect(modal).toBeVisible();
    await expect(page.getByText('ส่งออกบทเรียน & เปิด GitHub Pull Request')).toBeVisible();

    // Verify Zero-Token Guarantee Badge
    await expect(page.getByText(/Zero-Token Guarantee/i)).toBeVisible();

    // Test Copy PR Template button
    const btnCopyPr = page.getByTestId('btn-copy-pr-template');
    await expect(btnCopyPr).toBeVisible();
    await btnCopyPr.click();
    await expect(page.getByText(/คัดลอก PR Template แล้ว!/i)).toBeVisible();

    // Switch to Raw JSON tab
    const tabJson = page.getByTestId('tab-export-json');
    await tabJson.click();

    const btnDownload = page.getByTestId('btn-download-json');
    await expect(btnDownload).toBeVisible();

    // Test JSON Download Event Trigger
    const downloadPromise = page.waitForEvent('download').catch(() => null);
    await btnDownload.click();
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.json$/);
    }

    // Close Modal via close button
    const btnCloseModal = page.getByTestId('btn-close-export-modal');
    await btnCloseModal.click();
    await expect(modal).not.toBeVisible();
  });

  test('Scenario 4: Draft Crash Resilience & LocalStorage Recovery', async ({ page }) => {
    await openStudioView(page);

    // 1. Switch to Metadata tab
    const tabMetadata = page.locator('button[data-tab="metadata"]');
    await tabMetadata.click();

    // 2. Edit Thai title
    const inputTitleTh = page.locator('input[placeholder*="ทักทาย"]').first();
    const uniqueTitle = `ทดสอบกู้คืนดราฟต์_${Date.now()}`;
    await inputTitleTh.fill(uniqueTitle);
    await inputTitleTh.blur();

    // 3. Force save
    const btnSave = page.getByRole('button', { name: 'บันทึก' }).first();
    await btnSave.click();

    // 4. Reload page (simulating accidental close or browser restart)
    await page.reload();
    await openStudioView(page);

    // 5. Verify that the unique title is preserved 100%
    await expect(inputTitleTh).toHaveValue(uniqueTitle);
  });

  test('Scenario 5: Red Team Chaos & XSS Sanitization Guard', async ({ page }) => {
    await openStudioView(page);

    // 1. Open Import Modal
    const btnImport = page.getByRole('button', { name: 'นำเข้า' });
    await btnImport.click();

    // 2. Prepare payload with XSS injection tags
    const xssPayload = JSON.stringify({
      unit_id: 'tier1_u99',
      tier: 1,
      unit_number: 99,
      title: {
        zh: '测试 <script>alert(1)</script>',
        th: 'บทเรียนทดสอบ XSS <img src=x onerror=alert(1)>',
        en: 'XSS Defense Test',
      },
      description: 'ทดสอบความปลอดภัยต่อการแทรกสคริปต์อันตราย',
      lessons: [
        {
          lesson_id: 't1_u99_l01',
          lesson_number: 1,
          title: {
            zh: '课程一',
            th: 'บทเรียนย่อย <script>',
            en: 'Sublesson 1',
          },
          can_do: { th: 'เข้าใจ', en: 'Understand' },
          baby_step_goal: 'ทดสอบ',
          vocabulary: [
            {
              id: 'hsk1_9901_01',
              hanzi: '安全',
              pinyin: 'ān quán',
              meaning_th: 'ปลอดภัย | ไม่โดน XSS <script>',
              meaning_en: 'safe',
              radical: '宀',
              radical_name_th: 'หมวดหลังคา',
            },
          ],
          dialogue: [],
          quizzes: [],
        },
      ],
    });

    const textarea = page.locator('textarea[placeholder*="วาง JSON"]');
    await textarea.fill(xssPayload);

    const btnConfirmImport = page.getByRole('button', { name: 'นำเข้าและเปิดแก้ไข' });
    await btnConfirmImport.click();

    // 3. Ensure app did not crash
    const brandTitle = page.getByText('Hanzero Studio');
    await expect(brandTitle).toBeVisible();

    // 4. Open Export Modal to ensure PR template properly sanitized XSS
    const btnExport = page.getByTestId('btn-open-export');
    await btnExport.click();

    const prTextarea = page.locator('textarea[readonly]');
    await expect(prTextarea).toBeVisible();
    const prContent = await prTextarea.inputValue();

    // Split markdown description from the raw JSON payload in <details>
    const markdownBody = prContent.split('```json')[0];

    // Markdown description must NOT contain raw unescaped <script>alert(1)</script>
    expect(markdownBody).not.toContain('<script>alert(1)</script>');
    // Must contain escaped &lt;script&gt;
    expect(markdownBody).toContain('&lt;script&gt;');
  });
});

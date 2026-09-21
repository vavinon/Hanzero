import { test, expect } from '@playwright/test';
import { injectWebAudioAndSpeechMocks, clearAllStorage } from './fixtures/mockApis';

test.describe('Journey 4: Voice Health System Check & Fallback Guidance', () => {
  test('gracefully handles missing native Chinese voice and displays fallback instructions across OS tabs', async ({
    page,
  }) => {
    // 1. Inject audio mock with chineseVoiceAvailable = false (simulates raw device without Chinese TTS)
    await injectWebAudioAndSpeechMocks(page, { chineseVoiceAvailable: false });

    await page.goto('./');
    await clearAllStorage(page);
    await page.reload();

    // 2. Welcome modal is visible, click "ทดสอบ / ตั้งค่าเสียง 🎧"
    const btnOpenVoiceHealth = page.getByTestId('btn-open-voice-health');
    await expect(btnOpenVoiceHealth).toBeVisible();
    await btnOpenVoiceHealth.click();

    // 3. Verify Voice Health modal appears
    const voiceModal = page.getByTestId('voice-health-modal');
    await expect(voiceModal).toBeVisible();

    // 4. Verify fallback status badge is displayed
    const voiceBadge = page.getByTestId('voice-health-badge');
    await expect(voiceBadge).toBeVisible();
    // In fallback mode, the badge indicates network audio or contour mode
    const badgeText = await voiceBadge.innerText();
    expect(badgeText.length).toBeGreaterThan(0);

    // 5. Switch and verify OS instruction tabs
    const tabWindows = page.getByTestId('tab-os-windows');
    const tabIos = page.getByTestId('tab-os-ios');
    const tabAndroid = page.getByTestId('tab-os-android');
    const tabMac = page.getByTestId('tab-os-mac');

    await expect(tabWindows).toBeVisible();
    await expect(tabIos).toBeVisible();
    await expect(tabAndroid).toBeVisible();
    await expect(tabMac).toBeVisible();

    // Click iOS tab and check guide content
    await tabIos.click();
    await expect(page.getByText('iPhone / iPad (iOS)')).toBeVisible();

    // Click Android tab and check guide content
    await tabAndroid.click();
    await expect(page.getByText('Android Smartphone / Tablet')).toBeVisible();

    // 6. Close voice health modal
    const btnClose = page.getByTestId('btn-close-voice-health');
    await btnClose.click();
    await expect(voiceModal).not.toBeVisible();
  });
});

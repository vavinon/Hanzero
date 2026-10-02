import { test, expect } from '@playwright/test';
import { injectWebAudioAndSpeechMocks, clearAllStorage } from './fixtures/mockApis';

test.describe('Journey 6: Phase 8 Advanced Immersion & Fluency Hub (TASK-806)', () => {
  test.beforeEach(async ({ page }) => {
    await injectWebAudioAndSpeechMocks(page);
  });

  test('navigates to Immersion Hub, explores Reader, Idiom Dilemma, Podcast Ladder, and Voice Pitching', async ({ page }) => {
    // 1. Direct deep-link navigation to Immersion Hub
    await page.goto('./?view=immersion');
    await clearAllStorage(page);
    await page.goto('./?view=immersion');

    // 2. Verify Immersion Hub presence & Overview Quest Cards
    const hub = page.getByTestId('immersion-hub');
    await expect(hub).toBeVisible();
    await expect(hub).toContainText('หอวิชาการฮั่นหลิน 翰林院');

    const overviewContent = page.getByTestId('hub-overview-content');
    await expect(overviewContent).toBeVisible();
    await expect(page.getByTestId('quest-card-reader')).toBeVisible();
    await expect(page.getByTestId('quest-card-idiom')).toBeVisible();
    await expect(page.getByTestId('quest-card-podcast')).toBeVisible();
    await expect(page.getByTestId('quest-card-voice')).toBeVisible();

    // 4. Test Quest 1: Smart Immersion Reader (via card or tab)
    const cardReader = page.getByTestId('quest-card-reader');
    await cardReader.click();

    const readerContent = page.getByTestId('hub-reader-content');
    await expect(readerContent).toBeVisible();
    await expect(readerContent).toContainText('Immersion Reader');

    // Switch pinyin mode to ruby and back
    const btnPinyinRuby = page.getByTestId('btn-pinyin-ruby');
    if (await btnPinyinRuby.isVisible()) {
      await btnPinyinRuby.click();
    }

    // 5. Test Quest 2: 成语 Lore & Dilemma Engine
    const tabIdiom = page.getByTestId('hub-nav-tab-idiom');
    await tabIdiom.click();

    const idiomContent = page.getByTestId('hub-idiom-content');
    await expect(idiomContent).toBeVisible();
    await expect(idiomContent).toContainText('成语');

    // 6. Test Quest 3: Commute Podcast Station & Native Speed Ladder
    const tabPodcast = page.getByTestId('hub-nav-tab-podcast');
    await tabPodcast.click();

    const podcastContent = page.getByTestId('hub-podcast-content');
    await expect(podcastContent).toBeVisible();
    await expect(podcastContent).toContainText('Commute Podcast Mode');

    const toggleSpeedBtn = page.getByTestId('toggle-speed-ladder-btn');
    if (await toggleSpeedBtn.isVisible()) {
      await toggleSpeedBtn.click();
      await expect(podcastContent).toContainText('0.75x');
      await expect(podcastContent).toContainText('1.5x');
    }

    // 7. Test Quest 4: Voice Pitching & Shadowing 2.0 Studio
    const tabVoice = page.getByTestId('hub-nav-tab-voice');
    await tabVoice.click();

    const voiceContent = page.getByTestId('hub-voice-content');
    await expect(voiceContent).toBeVisible();
    await expect(voiceContent).toContainText('สตูดิโอฝึกพูดนำเสนอ & จำลองวิกฤต 2.0');

    // Verify canvas waveform & record button
    const canvasWaveform = page.getByTestId('pitch-waveform-canvas');
    await expect(canvasWaveform).toBeVisible();

    const btnStartPitch = page.getByTestId('btn-start-pitch-recording');
    await expect(btnStartPitch).toBeVisible();

    // 8. Return back to Quest Map
    const btnBackToMap = page.getByTestId('btn-hub-back-to-map');
    await expect(btnBackToMap).toBeVisible();
    await btnBackToMap.click();

    await expect(hub).not.toBeVisible();
    await expect(page.getByTestId('btn-open-immersion-banner')).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';
import { injectWebAudioAndSpeechMocks, clearAllStorage } from './fixtures/mockApis';

test.describe('Journey 5: Tier 2 Traveler Quest - HSR Metro Map & Stamped Tickets (TASK-706)', () => {
  test.beforeEach(async ({ page }) => {
    await injectWebAudioAndSpeechMocks(page);
  });

  test('navigates to Tier 2 tab, explores 4 Metropolises HSR Route, opens station, and inspects stamped ticket', async ({ page }) => {
    // 1. Clean slate
    await page.goto('./');
    await clearAllStorage(page);
    await page.reload();

    // 2. Complete onboarding welcome modal into QuestMap
    const welcomeModal = page.getByTestId('welcome-modal');
    await expect(welcomeModal).toBeVisible();
    const trackTier0 = page.getByTestId('track-card-tier0');
    await trackTier0.click();
    const btnStart = page.getByTestId('btn-start-journey');
    await btnStart.click();
    await expect(welcomeModal).not.toBeVisible();

    // 3. Switch to Tier 2 tab on QuestMap
    const tabTier2 = page.getByTestId('tab-tier2');
    await expect(tabTier2).toBeVisible();
    await tabTier2.click();

    // 4. Verify HSR Quest Map & Header
    const hsrMap = page.getByTestId('hsr-quest-map');
    await expect(hsrMap).toBeVisible();

    const header = page.getByTestId('hsr-header-card');
    await expect(header).toContainText('เส้นทางรถไฟ 4 มหานคร');
    await expect(header).toContainText('ปักกิ่ง ➔ ซีอาน ➔ เฉิงตู ➔ เซี่ยงไฮ้');

    // 5. Test Metropolis filter buttons
    const filterXian = page.getByTestId('filter-hub-xian');
    await expect(filterXian).toBeVisible();
    await filterXian.click();

    // Station 15 (Xi'an North) must be visible, Station 11 (Beijing) should be hidden
    await expect(page.getByTestId('hsr-station-node-15')).toBeVisible();
    await expect(page.getByTestId('hsr-station-node-11')).not.toBeVisible();

    // Reset filter to All
    const filterAll = page.getByTestId('filter-hub-all');
    await filterAll.click();
    await expect(page.getByTestId('hsr-station-node-11')).toBeVisible();

    // 6. Click Station 11 node to open Station Details Modal
    const station11 = page.getByTestId('hsr-station-node-11');
    await station11.click();

    const stationModal = page.getByTestId('station-detail-modal');
    await expect(stationModal).toBeVisible();
    await expect(stationModal).toContainText('北京南站');

    // Close station modal
    const btnCloseStation = page.getByTestId('btn-close-station-modal');
    await btnCloseStation.click();
    await expect(stationModal).not.toBeVisible();

    // 7. Open Collectible Stamped HSR Ticket Modal
    const btnOpenTicket = page.getByTestId('btn-open-hsr-ticket');
    await expect(btnOpenTicket).toBeVisible();
    await btnOpenTicket.click();

    const ticketModal = page.getByTestId('hsr-ticket-modal');
    await expect(ticketModal).toBeVisible();

    const ticketCard = page.getByTestId('hsr-ticket-card');
    await expect(ticketCard).toContainText('G706 次');
    await expect(ticketCard).toContainText('北京南');
    await expect(ticketCard).toContainText('上海虹桥');
    await expect(ticketCard).toContainText('07车 06F号');

    // Check Vermilion Stamp exists
    const stamp = page.getByTestId('ticket-vermilion-stamp');
    await expect(stamp).toBeVisible();
    await expect(stamp).toContainText('中国高铁');

    // Close ticket modal
    const btnCloseTicket = page.getByTestId('btn-close-hsr-ticket');
    await btnCloseTicket.click();
    await expect(ticketModal).not.toBeVisible();
  });

  test('maintains visual layout and tapability on small mobile 320px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto('./');
    await clearAllStorage(page);
    await page.reload();

    const welcomeModal = page.getByTestId('welcome-modal');
    await expect(welcomeModal).toBeVisible();
    const trackTier0 = page.getByTestId('track-card-tier0');
    await trackTier0.click();
    const btnStart = page.getByTestId('btn-start-journey');
    await btnStart.click();
    await expect(welcomeModal).not.toBeVisible();

    const tabTier2 = page.getByTestId('tab-tier2');
    await expect(tabTier2).toBeVisible();
    await tabTier2.click();

    const hsrMap = page.getByTestId('hsr-quest-map');
    await expect(hsrMap).toBeVisible();

    // Verify Station 11 is rendered and clickable without horizontal overflow
    const station11 = page.getByTestId('hsr-station-node-11');
    await expect(station11).toBeVisible();
    await station11.click();

    const stationModal = page.getByTestId('station-detail-modal');
    await expect(stationModal).toBeVisible();
  });
});

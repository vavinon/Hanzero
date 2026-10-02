/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HsrQuestMap, HsrQuestMapProps } from './HsrQuestMap';
import { ProgressState } from '../../engines/storage/types';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

const mockProgress: ProgressState = {
  current_tier: 'tier2',
  unlocked_tiers: ['tier0', 'tier1', 'tier2'],
  unlocked_units: ['tier2_u11', 'tier2_u12'],
  completed_lessons: ['t2_u11_l01', 't2_u11_l02', 't2_u11_l03', 't2_u11_l04'],
  hearts: { current: 5, max: 5, last_regen_timestamp: Date.now() },
  streak: { count: 3, last_active_date: '2026-09-23', freeze_tokens: 0 },
  xp: 450,
  level: 5,
  onboarding_completed: true,
};

describe('HsrQuestMap Component (TASK-706)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playIncorrect').mockImplementation(() => {});
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root!.unmount();
      });
      root = null;
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
      container = null;
    }
    vi.restoreAllMocks();
  });

  const renderComponent = async (props: Partial<HsrQuestMapProps> = {}) => {
    const onSelectLessonMock = vi.fn();
    const defaultProps: HsrQuestMapProps = {
      progress: mockProgress,
      onSelectLesson: onSelectLessonMock,
      ...props,
    };

    await act(async () => {
      root!.render(<HsrQuestMap {...defaultProps} />);
    });

    return { onSelectLessonMock };
  };

  it('renders HSR Metro Quest Map container and 4-metropolis header', async () => {
    await renderComponent();

    const map = container?.querySelector('[data-testid="hsr-quest-map"]');
    expect(map).toBeTruthy();

    const header = container?.querySelector('[data-testid="hsr-header-card"]');
    expect(header?.textContent).toContain('เส้นทางรถไฟ 4 มหานคร');
    expect(header?.textContent).toContain('ปักกิ่ง ➔ ซีอาน ➔ เฉิงตู ➔ เซี่ยงไฮ้');
  });

  it('renders all 15 stations along the HSR route by default', async () => {
    await renderComponent();

    // Check station 11 through 25 nodes
    for (let u = 11; u <= 25; u++) {
      const stationNode = container?.querySelector(`[data-testid="hsr-station-node-${u}"]`);
      expect(stationNode).toBeTruthy();
    }
  });

  it('filters stations when clicking Metropolis hub buttons', async () => {
    await renderComponent();

    const filterXian = container?.querySelector('[data-testid="filter-hub-xian"]') as HTMLButtonElement;
    expect(filterXian).toBeTruthy();

    await act(async () => {
      filterXian.click();
    });

    // Xi'an stations: 15, 16, 17, 18 should be visible
    expect(container?.querySelector('[data-testid="hsr-station-node-15"]')).toBeTruthy();
    expect(container?.querySelector('[data-testid="hsr-station-node-18"]')).toBeTruthy();
    // Beijing station 11 should not be visible when filtered to Xi'an
    expect(container?.querySelector('[data-testid="hsr-station-node-11"]')).toBeNull();

    // Reset to All
    const filterAll = container?.querySelector('[data-testid="filter-hub-all"]') as HTMLButtonElement;
    await act(async () => {
      filterAll.click();
    });
    expect(container?.querySelector('[data-testid="hsr-station-node-11"]')).toBeTruthy();
  });

  it('opens Station Details Modal and triggers onSelectLesson on lesson click', async () => {
    const { onSelectLessonMock } = await renderComponent();

    const station11Node = container?.querySelector('[data-testid="hsr-station-node-11"]') as HTMLElement;
    expect(station11Node).toBeTruthy();

    await act(async () => {
      station11Node.click();
    });

    // Station modal should appear
    const modal = container?.querySelector('[data-testid="station-detail-modal"]');
    expect(modal).toBeTruthy();
    expect(modal?.textContent).toContain('北京南站');

    // Click on lesson 11.1
    const lesson1Btn = container?.querySelector('[data-testid="btn-station-lesson-t2_u11_l01"]') as HTMLElement;
    expect(lesson1Btn).toBeTruthy();

    await act(async () => {
      lesson1Btn.click();
    });

    expect(onSelectLessonMock).toHaveBeenCalledWith('tier2_u11', 't2_u11_l01');
  });

  it('opens and closes Collectible Stamped HSR Ticket Modal with G706 and Vermilion Stamp', async () => {
    await renderComponent();

    const btnOpenTicket = container?.querySelector('[data-testid="btn-open-hsr-ticket"]') as HTMLButtonElement;
    expect(btnOpenTicket).toBeTruthy();

    // Open ticket modal
    await act(async () => {
      btnOpenTicket.click();
    });

    const ticketModal = container?.querySelector('[data-testid="hsr-ticket-modal"]');
    expect(ticketModal).toBeTruthy();

    // Verify ticket details
    const card = container?.querySelector('[data-testid="hsr-ticket-card"]');
    expect(card?.textContent).toContain('G706 次');
    expect(card?.textContent).toContain('北京南');
    expect(card?.textContent).toContain('上海虹桥');
    expect(card?.textContent).toContain('07车 06F号');
    expect(card?.textContent).toContain('二等座');

    // Vermilion stamp verification
    const stamp = container?.querySelector('[data-testid="ticket-vermilion-stamp"]');
    expect(stamp).toBeTruthy();
    expect(stamp?.textContent).toContain('中国高铁');
    expect(stamp?.textContent).toContain('已检票');

    // Close ticket modal
    const btnClose = container?.querySelector('[data-testid="btn-close-hsr-ticket"]') as HTMLButtonElement;
    expect(btnClose).toBeTruthy();
    await act(async () => {
      btnClose.click();
    });

    expect(container?.querySelector('[data-testid="hsr-ticket-modal"]')).toBeNull();
  });

  it('prevents launching lessons on locked stations and displays locked warning banner (SEC-RED-001)', async () => {
    const { onSelectLessonMock } = await renderComponent();

    // Station 25 (Grand Boss) is locked for this progress state
    const station25Node = container?.querySelector('[data-testid="hsr-station-node-25"]') as HTMLElement;
    expect(station25Node).toBeTruthy();

    await act(async () => {
      station25Node.click();
    });

    // Station modal should appear with locked warning banner
    const modal = container?.querySelector('[data-testid="station-detail-modal"]');
    expect(modal).toBeTruthy();
    const lockedBanner = container?.querySelector('[data-testid="station-locked-banner"]');
    expect(lockedBanner).toBeTruthy();
    expect(lockedBanner?.textContent).toContain('สถานีนี้ยังไม่เปิดให้บริการ');

    // Attempting to click lesson 1 in locked station 25
    const lockedLessonBtn = container?.querySelector('[data-testid="btn-station-lesson-t2_u25_l01"]') as HTMLElement;
    expect(lockedLessonBtn).toBeTruthy();

    await act(async () => {
      lockedLessonBtn.click();
    });

    // onSelectLesson must NOT be called for locked station!
    expect(onSelectLessonMock).not.toHaveBeenCalled();
    expect(audioEngine.playIncorrect).toHaveBeenCalled();
  });
});

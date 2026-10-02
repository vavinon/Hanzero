/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IdiomExplorer } from './IdiomExplorer';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('IdiomExplorer Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    vi.spyOn(audioEngine, 'speak').mockResolvedValue(undefined);
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playIncorrect').mockImplementation(() => {});
  });

  afterEach(async () => {
    if (root) {
      await act(async () => {
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

  it('renders header, search input, category filters, and idiom list', async () => {
    await act(async () => {
      root!.render(<IdiomExplorer />);
    });

    expect(container!.textContent).toContain('成语 Lore & Dilemma Engine');
    expect(container!.textContent).toContain('ม้วนคัมภีร์');
    expect(container!.textContent).toContain('จำลองวิกฤต');
    expect(container!.textContent).toContain('破釜沉舟');
    expect(container!.textContent).toContain('未雨绸缪');
    expect(container!.textContent).toContain('亡羊补牢');
  });

  it('filters idioms when user types search query', async () => {
    await act(async () => {
      root!.render(<IdiomExplorer />);
    });

    const searchInput = container!.querySelector(
      '[data-testid="idiom-search-input"]'
    ) as HTMLInputElement;
    expect(searchInput).toBeTruthy();

    await act(async () => {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )!.set!;
      nativeSetter.call(searchInput, 'ทุบหม้อ');
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(container!.textContent).toContain('破釜沉舟');
    expect(container!.textContent).not.toContain('未雨绸缪');
  });

  it('opens historical story modal when clicking an idiom card', async () => {
    await act(async () => {
      root!.render(<IdiomExplorer />);
    });

    const pfcCard = container!.querySelector(
      '[data-testid="idiom-card-idiom-pofuchenzhou"]'
    ) as HTMLElement;
    expect(pfcCard).toBeTruthy();

    await act(async () => {
      pfcCard.click();
    });

    const modal = container!.querySelector('[data-testid="idiom-story-modal"]');
    expect(modal).toBeTruthy();
    expect(container!.textContent).toContain('ม้วนคัมภีร์ประวัติศาสตร์: 《史记·项羽本纪》');
    expect(container!.textContent).toContain('项羽 (เซี่ยงอวี่)');
    expect(container!.textContent).toContain('ข้ามแม่น้ำสู่ศึกชี้ชะตา');
  });

  it('navigates story panel frames in modal', async () => {
    await act(async () => {
      root!.render(<IdiomExplorer initialIdiomId="idiom-pofuchenzhou" />);
    });

    expect(container!.textContent).toContain('ฉากที่ 1 จาก 3: ข้ามแม่น้ำสู่ศึกชี้ชะตา');

    // Click next frame
    const nextBtn = container!.querySelector(
      'button[aria-label="เฟรมถัดไป"]'
    ) as HTMLButtonElement;
    expect(nextBtn).toBeTruthy();

    await act(async () => {
      nextBtn.click();
    });

    expect(container!.textContent).toContain('ฉากที่ 2 จาก 3: คำสั่งทุบหม้อและจมเรือ');
  });

  it('adds idiom to SRS from story modal', async () => {
    const onAddSRS = vi.fn();

    await act(async () => {
      root!.render(
        <IdiomExplorer
          initialIdiomId="idiom-pofuchenzhou"
          onAddSRS={onAddSRS}
        />
      );
    });

    const addSrsBtn = container!.querySelector(
      '[data-testid="modal-add-srs-btn"]'
    ) as HTMLButtonElement;
    expect(addSrsBtn).toBeTruthy();

    await act(async () => {
      addSrsBtn.click();
    });

    expect(onAddSRS).toHaveBeenCalledTimes(1);
    expect(onAddSRS.mock.calls[0][0].hanzi).toBe('破釜沉舟');
    expect(container!.textContent).toContain('อยู่ในคลัง SRS แล้ว');
  });

  it('switches to dilemma simulator tab and displays crisis scenario', async () => {
    await act(async () => {
      root!.render(<IdiomExplorer initialMode="dilemma" />);
    });

    expect(container!.textContent).toContain('สถานการณ์:');
    const dilemmaCard = container!.querySelector('[data-testid="idiom-dilemma-card"]');
    expect(dilemmaCard).toBeTruthy();
  });
});

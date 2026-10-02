/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IdiomDilemmaCard } from './IdiomDilemmaCard';
import { getIdiomById } from '../../engines/idiom/idiomLoreEngine';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('IdiomDilemmaCard Component', () => {
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

  it('renders dilemma situation, core question, and choices', async () => {
    const pfc = getIdiomById('idiom-pofuchenzhou')!;
    const dilemma = pfc.dilemmas[0];

    await act(async () => {
      root!.render(<IdiomDilemmaCard dilemmaCase={dilemma} parentIdiom={pfc} />);
    });

    expect(container!.textContent).toContain('วิกฤตสตาร์ทอัพ: ตัดสินใจทุ่มงบก้อนสุดท้าย');
    expect(container!.textContent).toContain('กลยุทธ์องค์กร');
    expect(container!.textContent).toContain('破釜沉舟');
    expect(container!.textContent).toContain('背水一战');
    expect(container!.textContent).toContain('守株待兔');
  });

  it('selects choice, submits optimal answer, and calls onSolve with correct result', async () => {
    const pfc = getIdiomById('idiom-pofuchenzhou')!;
    const dilemma = pfc.dilemmas[0];
    const onSolve = vi.fn();

    await act(async () => {
      root!.render(
        <IdiomDilemmaCard dilemmaCase={dilemma} parentIdiom={pfc} onSolve={onSolve} />
      );
    });

    // Select optimal choice (破釜沉舟)
    const optimalBtn = container!.querySelector(
      '[data-testid="choice-idiom-pofuchenzhou"]'
    ) as HTMLButtonElement;
    expect(optimalBtn).toBeTruthy();

    await act(async () => {
      optimalBtn.click();
    });

    // Submit
    const submitBtn = container!.querySelector(
      '[data-testid="submit-dilemma-btn"]'
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    await act(async () => {
      submitBtn.click();
    });

    expect(audioEngine.playCorrect).toHaveBeenCalledTimes(1);
    expect(onSolve).toHaveBeenCalledTimes(1);
    expect(onSolve.mock.calls[0][0].isOptimal).toBe(true);
    expect(onSolve.mock.calls[0][0].scoreAwarded).toBe(30);
    expect(container!.textContent).toContain('ยอดเยี่ยมมาก');
  });

  it('selects nuance trap choice and reveals nuance comparison', async () => {
    const pfc = getIdiomById('idiom-pofuchenzhou')!;
    const dilemma = pfc.dilemmas[0];
    const onSolve = vi.fn();

    await act(async () => {
      root!.render(
        <IdiomDilemmaCard dilemmaCase={dilemma} parentIdiom={pfc} onSolve={onSolve} />
      );
    });

    // Select nuance trap choice (背水一战)
    const trapBtn = container!.querySelector(
      '[data-testid="choice-idiom-beishuiyizhan"]'
    ) as HTMLButtonElement;
    expect(trapBtn).toBeTruthy();

    await act(async () => {
      trapBtn.click();
    });

    // Submit
    const submitBtn = container!.querySelector(
      '[data-testid="submit-dilemma-btn"]'
    ) as HTMLButtonElement;
    await act(async () => {
      submitBtn.click();
    });

    expect(audioEngine.playIncorrect).toHaveBeenCalledTimes(1);
    expect(onSolve.mock.calls[0][0].isOptimal).toBe(false);
    expect(onSolve.mock.calls[0][0].chosenChoice.nuanceTrap).toBe(true);
    expect(container!.textContent).toContain('เกือบจะดีแล้ว');
    expect(container!.textContent).toContain('จุดต่างเชิงนัยยะ: 破釜沉舟 vs 背水一战');
  });

  it('triggers onAddSRS when clicking add SRS button', async () => {
    const pfc = getIdiomById('idiom-pofuchenzhou')!;
    const dilemma = pfc.dilemmas[0];
    const onAddSRS = vi.fn();

    await act(async () => {
      root!.render(
        <IdiomDilemmaCard
          dilemmaCase={dilemma}
          parentIdiom={pfc}
          onAddSRS={onAddSRS}
        />
      );
    });

    // Select and submit first
    const optimalBtn = container!.querySelector(
      '[data-testid="choice-idiom-pofuchenzhou"]'
    ) as HTMLButtonElement;
    await act(async () => {
      optimalBtn.click();
    });

    const submitBtn = container!.querySelector(
      '[data-testid="submit-dilemma-btn"]'
    ) as HTMLButtonElement;
    await act(async () => {
      submitBtn.click();
    });

    // Click Add SRS
    const srsBtn = container!.querySelector(
      '[data-testid="add-srs-btn"]'
    ) as HTMLButtonElement;
    expect(srsBtn).toBeTruthy();

    await act(async () => {
      srsBtn.click();
    });

    expect(onAddSRS).toHaveBeenCalledTimes(1);
    expect(onAddSRS.mock.calls[0][0].hanzi).toBe('破釜沉舟');
    expect(container!.textContent).toContain('บันทึกเข้า SRS แล้ว');
  });
});

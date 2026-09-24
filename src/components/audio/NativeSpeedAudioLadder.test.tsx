/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NativeSpeedAudioLadder } from './NativeSpeedAudioLadder';
import * as audioEngine from '../../engines/audio/audioEngine';
import * as nativeSpeedEngine from '../../engines/audio/nativeSpeedEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('NativeSpeedAudioLadder Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(nativeSpeedEngine, 'startAmbientSoundscape').mockReturnValue(true);
    vi.spyOn(nativeSpeedEngine, 'stopAmbientSoundscape').mockImplementation(() => {});
    vi.spyOn(nativeSpeedEngine, 'setAmbientVolume').mockImplementation(() => {});
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

  it('renders 4 speed step buttons and highlights the current speed', async () => {
    await act(async () => {
      root!.render(<NativeSpeedAudioLadder currentSpeed={1.25} />);
    });

    const ladder = container?.querySelector('[data-testid="native-speed-ladder"]');
    expect(ladder).not.toBeNull();

    const stepBtns = container?.querySelectorAll('[data-testid^="speed-step-"]');
    expect(stepBtns?.length).toBe(4);

    const step125 = container?.querySelector('[data-testid="speed-step-1.25"]');
    expect(step125?.getAttribute('aria-pressed')).toBe('true');

    const step10 = container?.querySelector('[data-testid="speed-step-1"]');
    expect(step10?.getAttribute('aria-pressed')).toBe('false');
  });

  it('switches speed and triggers callbacks on click', async () => {
    const onSpeedSelect = vi.fn();

    await act(async () => {
      root!.render(
        <NativeSpeedAudioLadder currentSpeed={1.0} onSpeedSelect={onSpeedSelect} />
      );
    });

    const step15 = container?.querySelector('[data-testid="speed-step-1.5"]') as HTMLButtonElement;
    expect(step15).not.toBeNull();

    await act(async () => {
      step15.click();
    });

    expect(audioEngine.playClick).toHaveBeenCalled();
    expect(onSpeedSelect).toHaveBeenCalledWith(1.5);
    expect(step15.getAttribute('aria-pressed')).toBe('true');
  });

  it('toggles ambient soundscape drawer and changes preset', async () => {
    await act(async () => {
      root!.render(<NativeSpeedAudioLadder showAmbientControls={true} />);
    });

    const ambientToggleBtn = container?.querySelector('button[aria-label="ตั้งค่าเสียงบรรยากาศ"]') as HTMLButtonElement;
    expect(ambientToggleBtn).not.toBeNull();

    // Open drawer
    await act(async () => {
      ambientToggleBtn.click();
    });

    const drawer = container?.querySelector('[data-testid="ambient-drawer"]');
    expect(drawer).not.toBeNull();

    // Select cafe preset
    const cafeBtn = container?.querySelector('[data-testid="ambient-preset-cafe"]') as HTMLButtonElement;
    expect(cafeBtn).not.toBeNull();

    await act(async () => {
      cafeBtn.click();
    });

    expect(nativeSpeedEngine.startAmbientSoundscape).toHaveBeenCalledWith('cafe', expect.any(Number));
  });
});

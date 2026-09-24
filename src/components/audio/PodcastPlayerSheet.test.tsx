/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PodcastPlayerSheet } from './PodcastPlayerSheet';
import * as audioEngine from '../../engines/audio/audioEngine';
import * as nativeSpeedEngine from '../../engines/audio/nativeSpeedEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('PodcastPlayerSheet Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();

    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'speak').mockResolvedValue(undefined);
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    vi.spyOn(nativeSpeedEngine, 'setupMediaSession').mockReturnValue(true);
    vi.spyOn(nativeSpeedEngine, 'setMediaSessionPlaybackState').mockImplementation(() => {});
    vi.spyOn(nativeSpeedEngine, 'clearMediaSession').mockImplementation(() => {});
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

  it('renders track header, transcript cues, and control dock', async () => {
    await act(async () => {
      root!.render(<PodcastPlayerSheet />);
    });

    const sheet = container?.querySelector('[data-testid="podcast-player-sheet"]');
    expect(sheet).not.toBeNull();

    const cues = container?.querySelectorAll('[data-testid^="transcript-cue-"]');
    expect(cues && cues.length).toBeGreaterThan(0);

    const playBtn = container?.querySelector('[data-testid="podcast-play-pause-btn"]');
    expect(playBtn).not.toBeNull();
  });

  it('toggles playback and speaks the active cue', async () => {
    await act(async () => {
      root!.render(<PodcastPlayerSheet />);
    });

    const playBtn = container?.querySelector('[data-testid="podcast-play-pause-btn"]') as HTMLButtonElement;
    expect(playBtn).not.toBeNull();

    await act(async () => {
      playBtn.click();
    });

    expect(audioEngine.speak).toHaveBeenCalled();
    expect(nativeSpeedEngine.setupMediaSession).toHaveBeenCalled();

    // Toggle pause
    await act(async () => {
      playBtn.click();
    });

    expect(audioEngine.stopSpeaking).toHaveBeenCalled();
    expect(nativeSpeedEngine.setMediaSessionPlaybackState).toHaveBeenCalledWith('paused');
  });

  it('allows clicking on a cue to select that line', async () => {
    await act(async () => {
      root!.render(<PodcastPlayerSheet />);
    });

    const secondCue = container?.querySelector('[data-testid="transcript-cue-1"]') as HTMLDivElement;
    expect(secondCue).not.toBeNull();

    await act(async () => {
      secondCue.click();
    });

    expect(audioEngine.playClick).toHaveBeenCalled();
  });

  it('toggles speed ladder tray when speed pill button is clicked', async () => {
    await act(async () => {
      root!.render(<PodcastPlayerSheet />);
    });

    const toggleSpeedBtn = container?.querySelector('[data-testid="toggle-speed-ladder-btn"]') as HTMLButtonElement;
    expect(toggleSpeedBtn).not.toBeNull();

    await act(async () => {
      toggleSpeedBtn.click();
    });

    const ladder = container?.querySelector('[data-testid="native-speed-ladder"]');
    expect(ladder).not.toBeNull();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();

    await act(async () => {
      root!.render(<PodcastPlayerSheet onClose={onClose} />);
    });

    const closeBtn = container?.querySelector('button[aria-label="ปิดเครื่องเล่นพอดแคสต์"]') as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();

    await act(async () => {
      closeBtn.click();
    });

    expect(onClose).toHaveBeenCalled();
  });
});

/**
 * @vitest-environment jsdom
 */

import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useVoiceHealth, UseVoiceHealthReturn } from './useVoiceHealth';
import * as voiceHealthEngine from '../engines/audio/voiceHealthEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('useVoiceHealth Hook', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  let hookResult: UseVoiceHealthReturn | null = null;

  const TestComponent: React.FC = () => {
    hookResult = useVoiceHealth();
    return <div id="test-ready">ready</div>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root?.unmount();
      });
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
    root = null;
    hookResult = null;
  });

  async function mountTestHook(): Promise<void> {
    await act(async () => {
      root?.render(<TestComponent />);
    });
  }

  function getHook(): UseVoiceHealthReturn {
    if (!hookResult) throw new Error('Hook not mounted yet');
    return hookResult;
  }

  it('mounts, starts in loading, and populates healthState', async () => {
    vi.spyOn(voiceHealthEngine, 'inspectVoiceHealth').mockResolvedValue({
      grade: 'optimal',
      clientOS: 'windows',
      hasChineseVoice: true,
      isNeural: true,
      activeVoiceName: 'Xiaoxiao',
      totalChineseVoices: 2,
      isOnline: true,
      samplePhrase: '你好！很高兴认识你。',
    });

    await mountTestHook();

    const hook = getHook();
    expect(hook.healthState?.grade).toBe('optimal');
    expect(hook.healthState?.activeVoiceName).toBe('Xiaoxiao');
    expect(hook.isLoading).toBe(false);
    expect(hook.osGuide.os).toBe('windows');
  });

  it('allows playing sample voice via testVoice', async () => {
    vi.spyOn(voiceHealthEngine, 'inspectVoiceHealth').mockResolvedValue({
      grade: 'good',
      clientOS: 'android',
      hasChineseVoice: true,
      isNeural: false,
      activeVoiceName: 'Google Chinese',
      totalChineseVoices: 1,
      isOnline: true,
      samplePhrase: '你好！很高兴认识你。',
    });
    const playSpy = vi.spyOn(voiceHealthEngine, 'playSamplePhrase').mockResolvedValue(true);

    await mountTestHook();

    let success: boolean | undefined;
    await act(async () => {
      success = await getHook().testVoice('你好');
    });

    expect(success).toBe(true);
    expect(playSpy).toHaveBeenCalledWith('你好');
    expect(getHook().isPlayingSample).toBe(false);
  });
});

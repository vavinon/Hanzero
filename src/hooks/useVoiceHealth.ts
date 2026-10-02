/**
 * src/hooks/useVoiceHealth.ts
 * React Hook bridging voiceHealthEngine to UI components.
 * Subscribes to browser voice changes and provides reactive voice health state.
 *
 * Adheres strictly to AGENTS.md §4.2: Separation of Concerns, Zero Memory Leaks.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  inspectVoiceHealth,
  playSamplePhrase,
  getOsVoiceGuide,
  VoiceHealthState,
  OsVoiceGuide,
  detectClientOS,
  DEFAULT_SAMPLE_PHRASE,
} from '../engines/audio/voiceHealthEngine';
import { onVoicesChanged } from '../engines/audio/audioEngine';

export interface UseVoiceHealthReturn {
  healthState: VoiceHealthState | null;
  isLoading: boolean;
  isPlayingSample: boolean;
  testVoice: (phrase?: string) => Promise<boolean>;
  recheck: () => Promise<void>;
  osGuide: OsVoiceGuide;
}

export function useVoiceHealth(): UseVoiceHealthReturn {
  const [healthState, setHealthState] = useState<VoiceHealthState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlayingSample, setIsPlayingSample] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  const performCheck = useCallback(async () => {
    setIsLoading(true);
    try {
      const state = await inspectVoiceHealth();
      if (isMountedRef.current) {
        setHealthState(state);
      }
    } catch {
      // Safe fallback
      if (isMountedRef.current) {
        setHealthState({
          grade: 'fallback',
          clientOS: detectClientOS(),
          hasChineseVoice: false,
          isNeural: false,
          activeVoiceName: null,
          totalChineseVoices: 0,
          isOnline: typeof navigator !== 'undefined' ? (navigator.onLine ?? true) : true,
          samplePhrase: DEFAULT_SAMPLE_PHRASE,
        });
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    performCheck();

    // Listen to dynamically loaded voices (Chrome / Safari delayed loading)
    const unsubscribe = onVoicesChanged(() => {
      if (isMountedRef.current) {
        performCheck();
      }
    });

    return () => {
      isMountedRef.current = false;
      unsubscribe();
    };
  }, [performCheck]);

  const testVoice = useCallback(async (phrase?: string): Promise<boolean> => {
    if (isPlayingSample) {
      return false;
    }
    setIsPlayingSample(true);
    try {
      const result = await playSamplePhrase(phrase);
      return result;
    } finally {
      if (isMountedRef.current) {
        setIsPlayingSample(false);
      }
    }
  }, [isPlayingSample]);

  const osGuide = getOsVoiceGuide(healthState?.clientOS);

  return {
    healthState,
    isLoading,
    isPlayingSample,
    testVoice,
    recheck: performCheck,
    osGuide,
  };
}

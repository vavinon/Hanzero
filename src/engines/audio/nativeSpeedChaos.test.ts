/**
 * src/engines/audio/nativeSpeedChaos.test.ts
 * Red Team Adversarial Chaos & Stress Test Suite for Native Speed Ladder & Ambient Engine.
 *
 * Adheres strictly to AGENTS.md §5.4 (Red Team Adversary Standards).
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  SPEED_STEPS,
  setGlobalSpeed,
  getGlobalSpeed,
  onSpeedChanged,
  startAmbientSoundscape,
  stopAmbientSoundscape,
  setAmbientVolume,
  getAmbientSoundscapeState,
  findActiveCueIndex,
  setupMediaSession,
  clearMediaSession,
} from './nativeSpeedEngine';
import { PodcastTrack, TranscriptCue } from '../../types/audio';

describe('Red Team Chaos - Speed Flood Attack', () => {
  afterEach(() => {
    setGlobalSpeed(1.0);
  });

  it('survives 100 rapid concurrent speed alterations without state corruption', () => {
    const listener = vi.fn();
    const unsubscribe = onSpeedChanged(listener);

    // Rapid spamming across all steps
    for (let i = 0; i < 100; i++) {
      const step = SPEED_STEPS[i % SPEED_STEPS.length];
      setGlobalSpeed(step);
    }

    expect(SPEED_STEPS).toContain(getGlobalSpeed());
    expect(listener.mock.calls.length).toBeGreaterThan(0);
    unsubscribe();
  });

  it('handles faulty listeners that throw exceptions without halting engine', () => {
    const badListener = vi.fn(() => {
      throw new Error('Chaos injected into listener');
    });
    const goodListener = vi.fn();

    const unsubBad = onSpeedChanged(badListener);
    const unsubGood = onSpeedChanged(goodListener);

    expect(() => {
      setGlobalSpeed(1.5);
    }).not.toThrow();

    expect(goodListener).toHaveBeenCalledWith(1.5);
    unsubBad();
    unsubGood();
  });
});

describe('Red Team Chaos - Ambient Soundscape Stress & Memory Defense', () => {
  afterEach(() => {
    stopAmbientSoundscape();
  });

  it('survives rapid preset cycling 50 times without crashing', () => {
    const presets = ['cafe', 'subway', 'office', 'none'] as const;

    expect(() => {
      for (let i = 0; i < 50; i++) {
        const preset = presets[i % presets.length];
        startAmbientSoundscape(preset, 0.4);
      }
    }).not.toThrow();

    stopAmbientSoundscape();
    const state = getAmbientSoundscapeState();
    expect(state.isPlaying).toBe(false);
  });

  it('survives volume slider erratic spam (negative, extreme, NaN)', () => {
    const chaoticVolumes = [-100, 9999, NaN, Infinity, -Infinity, 0.00001, 0.99999];

    chaoticVolumes.forEach((vol) => {
      expect(() => {
        setAmbientVolume(vol);
      }).not.toThrow();
    });

    const state = getAmbientSoundscapeState();
    expect(state.volume).toBeGreaterThanOrEqual(0);
    expect(state.volume).toBeLessThanOrEqual(1);
  });
});

describe('Red Team Chaos - Malformed Cues & MediaSession Edge Cases', () => {
  afterEach(() => {
    clearMediaSession();
  });

  it('handles irregular and disordered transcript cue timestamps gracefully', () => {
    const chaoticCues: TranscriptCue[] = [
      {
        id: 'c1',
        zh: '乱序1',
        pinyin: 'luàn xù yī',
        th: 'สับสน 1',
        en: 'Disordered 1',
        startTimeMs: 10000,
        endTimeMs: 5000, // Inverted duration
      },
      {
        id: 'c2',
        zh: '乱序2',
        pinyin: 'luàn xù èr',
        th: 'สับสน 2',
        en: 'Disordered 2',
        startTimeMs: 2000,
        endTimeMs: 4000,
      },
    ];

    expect(() => {
      const idx = findActiveCueIndex(chaoticCues, 3000);
      expect(typeof idx).toBe('number');
    }).not.toThrow();
  });

  it('handles corrupted MediaSession implementations gracefully', () => {
    if (typeof navigator !== 'undefined') {
      const corruptedMediaSession = {
        metadata: null,
        playbackState: 'none',
        setActionHandler: vi.fn(() => {
          throw new DOMException('NotSupportedError');
        }),
      };
      Object.defineProperty(navigator, 'mediaSession', {
        value: corruptedMediaSession,
        writable: true,
        configurable: true,
      });

      const track: PodcastTrack = {
        id: 'crash-test',
        titleZh: '压力测试',
        titlePinyin: 'Yā Lì Cè Shì',
        titleTh: 'ทดสอบแรงดัน',
        titleEn: 'Pressure Test',
        category: 'news',
        level: 'Tier 3',
        durationSec: 10,
        descriptionTh: 'ทดสอบความทนทานต่อ MediaSession ผิดปกติ',
        cues: [],
      };

      // Engine must catch and survive without bubbling error to UI
      expect(() => {
        setupMediaSession(track, {
          onPlay: () => {},
        });
      }).not.toThrow();
    }
  });
});

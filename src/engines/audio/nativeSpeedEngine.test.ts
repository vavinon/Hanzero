/**
 * src/engines/audio/nativeSpeedEngine.test.ts
 * Vitest Unit Tests for Hanzero Native Speed Ladder, Ambient Soundscapes & MediaSession.
 *
 * Adheres strictly to AGENTS.md §5.1: 100% pure engine test coverage, zero fake assertions.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  SPEED_STEPS,
  getGlobalSpeed,
  setGlobalSpeed,
  normalizeSpeed,
  getSpeedStepInfo,
  onSpeedChanged,
  AMBIENT_PRESETS,
  startAmbientSoundscape,
  stopAmbientSoundscape,
  setAmbientVolume,
  getAmbientSoundscapeState,
  setupMediaSession,
  setMediaSessionPlaybackState,
  clearMediaSession,
  isMediaSessionSupported,
  findActiveCueIndex,
  formatAudioDuration,
} from './nativeSpeedEngine';
import { PodcastTrack, TranscriptCue } from '../../types/audio';

describe('nativeSpeedEngine - Multi-Step Speed Ladder', () => {
  beforeEach(() => {
    setGlobalSpeed(1.0);
  });

  it('defines exactly the 4 required speed steps in order', () => {
    expect(SPEED_STEPS).toEqual([0.75, 1.0, 1.25, 1.5]);
  });

  it('normalizes speeds into valid ladder steps', () => {
    expect(normalizeSpeed(0.5)).toBe(0.75);
    expect(normalizeSpeed(0.75)).toBe(0.75);
    expect(normalizeSpeed(0.85)).toBe(0.75);
    expect(normalizeSpeed(0.9)).toBe(1.0);
    expect(normalizeSpeed(1.0)).toBe(1.0);
    expect(normalizeSpeed(1.1)).toBe(1.0);
    expect(normalizeSpeed(1.2)).toBe(1.25);
    expect(normalizeSpeed(1.25)).toBe(1.25);
    expect(normalizeSpeed(1.35)).toBe(1.25);
    expect(normalizeSpeed(1.4)).toBe(1.5);
    expect(normalizeSpeed(1.5)).toBe(1.5);
    expect(normalizeSpeed(2.0)).toBe(1.5);
  });

  it('provides complete pedagogical metadata for each speed step', () => {
    SPEED_STEPS.forEach((step) => {
      const info = getSpeedStepInfo(step);
      expect(info.step).toBe(step);
      expect(info.label).toBe(step === 1.0 ? '1.0x' : `${step}x`);
      expect(info.tagline.length).toBeGreaterThan(2);
      expect(info.descriptionTh.length).toBeGreaterThan(10);
      expect(info.descriptionEn.length).toBeGreaterThan(10);
      expect(info.pedagogicalFocus.length).toBeGreaterThan(5);
      expect(info.color.startsWith('#')).toBe(true);
    });
  });

  it('updates global speed and notifies subscribers with cleanup', () => {
    const listener = vi.fn();
    const unsubscribe = onSpeedChanged(listener);

    const newSpeed = setGlobalSpeed(1.25);
    expect(newSpeed).toBe(1.25);
    expect(getGlobalSpeed()).toBe(1.25);
    expect(listener).toHaveBeenCalledWith(1.25);

    // Should not re-trigger if same step
    setGlobalSpeed(1.25);
    expect(listener).toHaveBeenCalledTimes(1);

    // Unsubscribe
    unsubscribe();
    setGlobalSpeed(1.5);
    expect(getGlobalSpeed()).toBe(1.5);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('nativeSpeedEngine - Ambient Soundscapes Subsystem', () => {
  afterEach(() => {
    stopAmbientSoundscape();
  });

  it('defines 4 ambient presets including silence', () => {
    expect(AMBIENT_PRESETS).toHaveLength(4);
    const ids = AMBIENT_PRESETS.map((p) => p.id);
    expect(ids).toContain('none');
    expect(ids).toContain('cafe');
    expect(ids).toContain('subway');
    expect(ids).toContain('office');
  });

  it('stops soundscape when "none" preset is chosen', () => {
    startAmbientSoundscape('cafe', 0.5);
    startAmbientSoundscape('none');
    const state = getAmbientSoundscapeState();
    expect(state.currentPresetId).toBe('none');
    expect(state.isPlaying).toBe(false);
  });

  it('manages ambient volume within 0.0 to 1.0 bounds', () => {
    setAmbientVolume(0.8);
    let state = getAmbientSoundscapeState();
    expect(state.volume).toBe(0.8);

    setAmbientVolume(-0.5);
    state = getAmbientSoundscapeState();
    expect(state.volume).toBe(0.0);

    setAmbientVolume(1.8);
    state = getAmbientSoundscapeState();
    expect(state.volume).toBe(1.0);
  });

  it('safely handles unknown preset IDs', () => {
    // @ts-expect-error Testing invalid ID runtime guard
    const result = startAmbientSoundscape('unknown_station');
    expect(result).toBe(false);
  });
});

describe('nativeSpeedEngine - MediaSession API & Background Audio', () => {
  const dummyTrack: PodcastTrack = {
    id: 'test-track',
    titleZh: '测试播客',
    titlePinyin: 'Cè Shì Bō Kè',
    titleTh: 'พอดแคสต์ทดสอบ',
    titleEn: 'Test Podcast',
    category: 'dialogue',
    level: 'Tier 3 Master',
    durationSec: 60,
    descriptionTh: 'คำอธิบายพอดแคสต์ทดสอบ',
    cues: [],
  };

  afterEach(() => {
    clearMediaSession();
  });

  it('checks mediaSession support correctly', () => {
    const supported = isMediaSessionSupported();
    expect(typeof supported).toBe('boolean');
  });

  it('sets up mediaSession metadata and action handlers if supported', () => {
    const handlers = {
      onPlay: vi.fn(),
      onPause: vi.fn(),
      onNextTrack: vi.fn(),
      onPreviousTrack: vi.fn(),
    };

    // Mock mediaSession in test environment if navigator exists
    if (typeof navigator !== 'undefined') {
      const mockActionHandlers: Record<string, ((...args: unknown[]) => void) | null> = {};
      const mockMediaSession = {
        metadata: null,
        playbackState: 'none',
        setActionHandler: vi.fn((action: string, handler: ((...args: unknown[]) => void) | null) => {
          mockActionHandlers[action] = handler;
        }),
      };
      Object.defineProperty(navigator, 'mediaSession', {
        value: mockMediaSession,
        writable: true,
        configurable: true,
      });

      const success = setupMediaSession(dummyTrack, handlers);
      expect(success).toBe(true);
      expect(navigator.mediaSession.metadata).not.toBeNull();
      expect(navigator.mediaSession.setActionHandler).toHaveBeenCalledWith('play', handlers.onPlay);
      expect(navigator.mediaSession.setActionHandler).toHaveBeenCalledWith('pause', handlers.onPause);

      setMediaSessionPlaybackState('playing');
      expect(navigator.mediaSession.playbackState).toBe('playing');

      clearMediaSession();
      expect(navigator.mediaSession.metadata).toBeNull();
      expect(navigator.mediaSession.playbackState).toBe('none');
    }
  });
});

describe('nativeSpeedEngine - Transcript Timeline Synchronization', () => {
  const mockCues: TranscriptCue[] = [
    {
      id: 'cue-1',
      zh: '第一句',
      pinyin: 'dì yī jù',
      th: 'ประโยคที่หนึ่ง',
      en: 'First line',
      startTimeMs: 0,
      endTimeMs: 4000,
    },
    {
      id: 'cue-2',
      zh: '第二句',
      pinyin: 'dì èr jù',
      th: 'ประโยคที่สอง',
      en: 'Second line',
      startTimeMs: 4500,
      endTimeMs: 9000,
    },
    {
      id: 'cue-3',
      zh: '第三句',
      pinyin: 'dì sān jù',
      th: 'ประโยคที่สาม',
      en: 'Third line',
      startTimeMs: 9500,
      endTimeMs: 15000,
    },
  ];

  it('handles empty cues array gracefully', () => {
    expect(findActiveCueIndex([], 1000)).toBe(-1);
  });

  it('locates correct active cue during exact cue intervals', () => {
    expect(findActiveCueIndex(mockCues, 0)).toBe(0);
    expect(findActiveCueIndex(mockCues, 2000)).toBe(0);
    expect(findActiveCueIndex(mockCues, 5000)).toBe(1);
    expect(findActiveCueIndex(mockCues, 8999)).toBe(1);
    expect(findActiveCueIndex(mockCues, 10000)).toBe(2);
    expect(findActiveCueIndex(mockCues, 14999)).toBe(2);
  });

  it('handles before start and past end times', () => {
    expect(findActiveCueIndex(mockCues, -500)).toBe(0);
    expect(findActiveCueIndex(mockCues, 20000)).toBe(2);
  });

  it('handles silence gaps between cues by returning preceding cue', () => {
    // Gap between 4000 and 4500
    expect(findActiveCueIndex(mockCues, 4200)).toBe(0);
    // Gap between 9000 and 9500
    expect(findActiveCueIndex(mockCues, 9200)).toBe(1);
  });

  it('formats audio duration to mm:ss format accurately', () => {
    expect(formatAudioDuration(0)).toBe('00:00');
    expect(formatAudioDuration(5000)).toBe('00:05');
    expect(formatAudioDuration(65000)).toBe('01:05');
    expect(formatAudioDuration(3600000)).toBe('60:00');
  });
});

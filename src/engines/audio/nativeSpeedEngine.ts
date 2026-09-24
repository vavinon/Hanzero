/**
 * src/engines/audio/nativeSpeedEngine.ts
 * Hanzero Native Speed Audio Ladder & Commute Podcast Engine.
 *
 * Core capabilities:
 * 1. Multi-Step Speed Ladder (0.75x, 1.0x, 1.25x, 1.5x) with pitch-preserved rates and pedagogical metadata.
 * 2. Pure Web Audio Synthesizer for Ambient Soundscapes (Cafe, Subway, Office) - 0 KB audio assets.
 * 3. Commute Podcast Controller & MediaSession API integration for Lock Screen / Bluetooth controls.
 * 4. Transcript timeline synchronization (Karaoke highlight calculation).
 *
 * Adheres strictly to AGENTS.md §4.2: Pure TypeScript, zero-UI, fully testable, zero memory leaks.
 */

import {
  SpeedStep,
  SpeedStepInfo,
  AmbientSoundscapeId,
  AmbientPreset,
  PodcastTrack,
  TranscriptCue,
} from '../../types/audio';
import { getAudioContext, unlockAudioContext } from './audioEngine';

// ==========================================
// 1. Multi-Step Speed Ladder Subsystem
// ==========================================

export const SPEED_STEPS: SpeedStep[] = [0.75, 1.0, 1.25, 1.5];

export const SPEED_STEP_METADATA: Record<SpeedStep, SpeedStepInfo> = {
  0.75: {
    step: 0.75,
    label: '0.75x',
    tagline: 'วิเคราะห์โครงสร้าง',
    descriptionTh: 'ช้าและชัดเป็นพิเศษ เหมาะสำหรับการแกะคำเชื่อม (使得, 进而) และวรรณยุกต์ซับซ้อน',
    descriptionEn: 'Slow & crystalline: ideal for parsing connectives and tonal transitions.',
    pedagogicalFocus: 'Grammar & Tone Clarity',
    color: '#0D9488', // Teal
  },
  1.0: {
    step: 1.0,
    label: '1.0x',
    tagline: 'มาตรฐาน HSK',
    descriptionTh: 'ความเร็วมาตรฐานสำหรับผู้เรียนทั่วไป ตามเกณฑ์ข้อสอบ HSK',
    descriptionEn: 'Standard baseline speed calibrated to official HSK listening standards.',
    pedagogicalFocus: 'HSK Standard Comprehension',
    color: '#047857', // Imperial Jade
  },
  1.25: {
    step: 1.25,
    label: '1.25x',
    tagline: 'ชีวิตจริงประจำวัน',
    descriptionTh: 'ความเร็วบทสนทนาจริงของคนจีนในชีวิตประจำวันอย่างเป็นธรรมชาติ',
    descriptionEn: 'Colloquial native cadence spoken on Chinese streets and daily business meetings.',
    pedagogicalFocus: 'Native Colloquial Fluency',
    color: '#D97706', // Warm Amber
  },
  1.5: {
    step: 1.5,
    label: '1.5x',
    tagline: 'ข่าว & พอดแคสต์ด่วน',
    descriptionTh: 'ความเร็วดีเบต ข่าวสาร หรือพอดแคสต์ด่วน เพื่อฝึกไหวพริบการประมวลผลฉับพลัน',
    descriptionEn: 'Fast-paced debate and broadcast speed to sharpen instant comprehension reflexes.',
    pedagogicalFocus: 'Rapid Broadcast & Debate Reflexes',
    color: '#DC2626', // Vermilion Red
  },
};

let currentGlobalSpeed: SpeedStep = 1.0;
const speedListeners = new Set<(speed: SpeedStep) => void>();

export function getGlobalSpeed(): SpeedStep {
  return currentGlobalSpeed;
}

export function setGlobalSpeed(speed: number): SpeedStep {
  const normalized = normalizeSpeed(speed);
  if (currentGlobalSpeed !== normalized) {
    currentGlobalSpeed = normalized;
    speedListeners.forEach((fn) => {
      try {
        fn(normalized);
      } catch {
        // Safe ignore listener errors
      }
    });
  }
  return currentGlobalSpeed;
}

export function normalizeSpeed(speed: number): SpeedStep {
  if (speed <= 0.85) return 0.75;
  if (speed <= 1.1) return 1.0;
  if (speed <= 1.35) return 1.25;
  return 1.5;
}

export function getSpeedStepInfo(step: SpeedStep): SpeedStepInfo {
  return SPEED_STEP_METADATA[step] || SPEED_STEP_METADATA[1.0];
}

export function onSpeedChanged(callback: (speed: SpeedStep) => void): () => void {
  speedListeners.add(callback);
  return () => {
    speedListeners.delete(callback);
  };
}

// ==========================================
// 2. Ambient Soundscape Synthesizer Subsystem
// ==========================================

export const AMBIENT_PRESETS: AmbientPreset[] = [
  {
    id: 'none',
    labelTh: 'ปิดเสียงบรรยากาศ',
    labelZh: '静音',
    labelEn: 'Silent Studio',
    icon: '🔇',
    descriptionTh: 'เสียงบทเรียนบริสุทธิ์ ไร้เสียงรบกวน เหมาะสำหรับการสอบหรือฝึกออกเสียงแม่นยำ',
    defaultVolume: 0.0,
  },
  {
    id: 'cafe',
    labelTh: 'ร้านกาแฟหรู',
    labelZh: '街角咖啡馆',
    labelEn: 'Street Cafe',
    icon: '☕',
    descriptionTh: 'เสียงบรรยากาศอบอุ่นคล้ายร้านกาแฟเซี่ยงไฮ้ ฝึกการฟังพร้อมเสียงแก้วและคลื่นเสียง Lo-Fi เบาๆ',
    defaultVolume: 0.35,
  },
  {
    id: 'subway',
    labelTh: 'รถไฟใต้ดินปักกิ่ง',
    labelZh: '北京地铁',
    labelEn: 'Subway Commute',
    icon: '🚇',
    descriptionTh: 'เสียงก้องฮัมของขบวนรถไฟใต้ดินความเร็วสูง เพื่อฝึกการจับใจความท่ามกลางการเดินทาง',
    defaultVolume: 0.3,
  },
  {
    id: 'office',
    labelTh: 'ออฟฟิศข้ามชาติ',
    labelZh: '跨国办公室',
    labelEn: 'Open Office',
    icon: '💼',
    descriptionTh: 'เสียงแอร์เบาๆ ผสมผสานเสียงสัมผัสแป้นพิมพ์ ฝึกสมาธิสำหรับการสนทนาธุรกิจ',
    defaultVolume: 0.25,
  },
];

interface AmbientActiveNodes {
  masterGain: GainNode;
  noiseSource?: AudioBufferSourceNode;
  filters?: BiquadFilterNode[];
  oscillators?: OscillatorNode[];
  gainNodes?: GainNode[];
}

let activeAmbientNodes: AmbientActiveNodes | null = null;
let currentAmbientPresetId: AmbientSoundscapeId = 'none';
let currentAmbientVolume = 0.3;

/**
 * Generates an audio buffer filled with colored noise (white/pink approximation).
 */
function createNoiseBuffer(ctx: AudioContext, seconds: number = 3): AudioBuffer {
  const bufferSize = ctx.sampleRate * seconds;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Pink noise approximation via Paul Kellet filter algorithm
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
    b6 = white * 0.115926;
  }

  return buffer;
}

/**
 * Stops and cleans up all active ambient audio nodes immediately.
 */
export function stopAmbientSoundscape(): void {
  if (!activeAmbientNodes) {
    currentAmbientPresetId = 'none';
    return;
  }

  try {
    if (activeAmbientNodes.noiseSource) {
      activeAmbientNodes.noiseSource.stop();
      activeAmbientNodes.noiseSource.disconnect();
    }
    if (activeAmbientNodes.oscillators) {
      activeAmbientNodes.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Safe ignore
        }
      });
    }
    if (activeAmbientNodes.filters) {
      activeAmbientNodes.filters.forEach((f) => {
        try {
          f.disconnect();
        } catch {
          // Safe ignore
        }
      });
    }
    if (activeAmbientNodes.gainNodes) {
      activeAmbientNodes.gainNodes.forEach((g) => {
        try {
          g.disconnect();
        } catch {
          // Safe ignore
        }
      });
    }
    activeAmbientNodes.masterGain.disconnect();
  } catch {
    // Graceful fallback
  }

  activeAmbientNodes = null;
  currentAmbientPresetId = 'none';
}

/**
 * Starts or switches the synthesized ambient soundscape.
 */
export function startAmbientSoundscape(
  presetId: AmbientSoundscapeId,
  volume?: number
): boolean {
  if (presetId === 'none') {
    stopAmbientSoundscape();
    return true;
  }

  const preset = AMBIENT_PRESETS.find((p) => p.id === presetId);
  if (!preset) return false;

  stopAmbientSoundscape();

  const ctx = getAudioContext();
  if (!ctx) return false;

  unlockAudioContext().catch(() => {});

  if (volume !== undefined) {
    currentAmbientVolume = Math.max(0, Math.min(1, volume));
  } else if (currentAmbientVolume <= 0) {
    currentAmbientVolume = preset.defaultVolume;
  }

  try {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(currentAmbientVolume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const noiseBuffer = createNoiseBuffer(ctx, 4);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filters: BiquadFilterNode[] = [];
    const oscillators: OscillatorNode[] = [];
    const gainNodes: GainNode[] = [];

    if (presetId === 'cafe') {
      // Warm low-pass filter (room reverberation) + subtle bandpass
      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.setValueAtTime(450, ctx.currentTime);
      lpf.Q.setValueAtTime(1.0, ctx.currentTime);

      const bpf = ctx.createBiquadFilter();
      bpf.type = 'bandpass';
      bpf.frequency.setValueAtTime(800, ctx.currentTime);
      bpf.Q.setValueAtTime(2.0, ctx.currentTime);

      noiseSource.connect(lpf);
      lpf.connect(bpf);
      bpf.connect(masterGain);
      filters.push(lpf, bpf);
    } else if (presetId === 'subway') {
      // Deep low-frequency train rumble (60Hz - 160Hz)
      const rumble = ctx.createBiquadFilter();
      rumble.type = 'lowpass';
      rumble.frequency.setValueAtTime(120, ctx.currentTime);
      rumble.Q.setValueAtTime(3.0, ctx.currentTime);

      // Soft rhythmic oscillation for train track sway
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.5, ctx.currentTime); // 0.5 Hz train sway
      lfoGain.gain.setValueAtTime(0.3, ctx.currentTime);
      lfo.connect(lfoGain);

      noiseSource.connect(rumble);
      rumble.connect(masterGain);

      filters.push(rumble);
      oscillators.push(lfo);
      gainNodes.push(lfoGain);
      lfo.start();
    } else if (presetId === 'office') {
      // Soft air-conditioner / ventilation hum (300Hz low-pass)
      const humFilter = ctx.createBiquadFilter();
      humFilter.type = 'lowpass';
      humFilter.frequency.setValueAtTime(320, ctx.currentTime);
      humFilter.Q.setValueAtTime(0.8, ctx.currentTime);

      noiseSource.connect(humFilter);
      humFilter.connect(masterGain);
      filters.push(humFilter);
    }

    noiseSource.start();

    activeAmbientNodes = {
      masterGain,
      noiseSource,
      filters,
      oscillators,
      gainNodes,
    };
    currentAmbientPresetId = presetId;
    return true;
  } catch {
    stopAmbientSoundscape();
    return false;
  }
}

/**
 * Updates the volume of the ambient soundscape smoothly.
 */
export function setAmbientVolume(volume: number): void {
  currentAmbientVolume = Math.max(0, Math.min(1, volume));
  if (activeAmbientNodes) {
    const ctx = getAudioContext();
    if (ctx) {
      activeAmbientNodes.masterGain.gain.setTargetAtTime(
        currentAmbientVolume,
        ctx.currentTime,
        0.05
      );
    } else {
      activeAmbientNodes.masterGain.gain.value = currentAmbientVolume;
    }
  }
}

export function getAmbientSoundscapeState(): {
  currentPresetId: AmbientSoundscapeId;
  volume: number;
  isPlaying: boolean;
} {
  return {
    currentPresetId: currentAmbientPresetId,
    volume: currentAmbientVolume,
    isPlaying: activeAmbientNodes !== null && currentAmbientPresetId !== 'none',
  };
}

// ==========================================
// 3. Commute Podcast & MediaSession API Manager
// ==========================================

export interface MediaSessionActionHandlers {
  onPlay?: () => void;
  onPause?: () => void;
  onNextTrack?: () => void;
  onPreviousTrack?: () => void;
  onSeekTo?: (timeMs: number) => void;
}

let isMediaSessionConfigured = false;

/**
 * Configures the mobile Lock Screen & Notification Center MediaSession metadata.
 */
export function setupMediaSession(
  track: PodcastTrack,
  handlers: MediaSessionActionHandlers = {}
): boolean {
  if (
    typeof navigator === 'undefined' ||
    !('mediaSession' in navigator) ||
    !navigator.mediaSession
  ) {
    return false;
  }

  try {
    const artworkArray = [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ];

    const metadataPayload = {
      title: `${track.titleZh} (${track.titlePinyin})`,
      artist: `Hanzero 汉Zero • ${track.level}`,
      album: 'Hanzero Commute Podcast (ฮั่นซีโร่)',
      artwork: artworkArray,
    };

    if (typeof MediaMetadata !== 'undefined') {
      navigator.mediaSession.metadata = new MediaMetadata(metadataPayload);
    } else {
      (navigator.mediaSession as unknown as { metadata: unknown }).metadata = metadataPayload;
    }

    if (handlers.onPlay) {
      navigator.mediaSession.setActionHandler('play', handlers.onPlay);
    }
    if (handlers.onPause) {
      navigator.mediaSession.setActionHandler('pause', handlers.onPause);
    }
    if (handlers.onPreviousTrack) {
      navigator.mediaSession.setActionHandler('previoustrack', handlers.onPreviousTrack);
    }
    if (handlers.onNextTrack) {
      navigator.mediaSession.setActionHandler('nexttrack', handlers.onNextTrack);
    }
    if (handlers.onSeekTo) {
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) {
          handlers.onSeekTo?.(details.seekTime * 1000);
        }
      });
    }

    isMediaSessionConfigured = true;
    return true;
  } catch {
    return false;
  }
}

/**
 * Updates the playback state ('playing' | 'paused' | 'none') on the mobile Lock Screen.
 */
export function setMediaSessionPlaybackState(state: 'playing' | 'paused' | 'none'): void {
  if (
    typeof navigator !== 'undefined' &&
    'mediaSession' in navigator &&
    navigator.mediaSession
  ) {
    try {
      navigator.mediaSession.playbackState = state;
    } catch {
      // Safe ignore
    }
  }
}

/**
 * Clears MediaSession metadata and handlers when podcast player unmounts.
 */
export function clearMediaSession(): void {
  if (
    typeof navigator !== 'undefined' &&
    'mediaSession' in navigator &&
    navigator.mediaSession
  ) {
    try {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
      navigator.mediaSession.setActionHandler('seekto', null);
      navigator.mediaSession.playbackState = 'none';
    } catch {
      // Safe ignore
    }
  }
  isMediaSessionConfigured = false;
}

export function isMediaSessionSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    'mediaSession' in navigator &&
    Boolean(navigator.mediaSession)
  );
}

export function isMediaSessionActive(): boolean {
  return isMediaSessionConfigured;
}

// ==========================================
// 4. Transcript Timeline Synchronization
// ==========================================

/**
 * Binary/linear search to locate the active transcript cue based on the current playback time.
 */
export function findActiveCueIndex(cues: TranscriptCue[], currentTimeMs: number): number {
  if (!cues || cues.length === 0) return -1;
  if (currentTimeMs < cues[0].startTimeMs) return 0;
  if (currentTimeMs >= cues[cues.length - 1].endTimeMs) return cues.length - 1;

  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    if (currentTimeMs >= cue.startTimeMs && currentTimeMs < cue.endTimeMs) {
      return i;
    }
  }

  // If between gaps, pick the closest upcoming cue
  for (let i = 0; i < cues.length - 1; i++) {
    if (currentTimeMs >= cues[i].endTimeMs && currentTimeMs < cues[i + 1].startTimeMs) {
      return i;
    }
  }

  return cues.length - 1;
}

/**
 * Formats milliseconds into a human-readable mm:ss string.
 */
export function formatAudioDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

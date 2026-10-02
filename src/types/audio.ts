/**
 * src/types/audio.ts
 * Strict TypeScript types for Hanzero Native Speed Audio Ladder,
 * Ambient Soundscapes, and Commute Podcast Mode.
 *
 * Adheres strictly to AGENTS.md §4.2: Zero 'any', pure types, 100% testable.
 */

export type SpeedStep = 0.75 | 1.0 | 1.25 | 1.5;

export interface SpeedStepInfo {
  step: SpeedStep;
  label: string;
  tagline: string;
  descriptionTh: string;
  descriptionEn: string;
  pedagogicalFocus: string;
  color: string;
}

export type AmbientSoundscapeId = 'none' | 'cafe' | 'subway' | 'office';

export interface AmbientPreset {
  id: AmbientSoundscapeId;
  labelTh: string;
  labelZh: string;
  labelEn: string;
  icon: string;
  descriptionTh: string;
  defaultVolume: number; // 0.0 to 1.0
}

export interface TranscriptCue {
  id: string;
  zh: string;
  pinyin: string;
  th: string;
  en: string;
  speaker?: string;
  startTimeMs: number;
  endTimeMs: number;
}

export type PodcastCategory = 'dialogue' | 'idiom' | 'culture' | 'business' | 'news';

export interface PodcastTrack {
  id: string;
  titleZh: string;
  titlePinyin: string;
  titleTh: string;
  titleEn: string;
  category: PodcastCategory;
  level: string; // e.g., 'Tier 3 Master', 'HSK 5', '成语'
  durationSec: number;
  descriptionTh: string;
  cues: TranscriptCue[];
  coverArtwork?: string;
}

export interface PodcastPlaybackState {
  isPlaying: boolean;
  currentTrackId: string;
  currentTrackIndex: number;
  currentTimeMs: number;
  speed: SpeedStep;
  ambientId: AmbientSoundscapeId;
  ambientVolume: number; // 0.0 to 1.0
  isLooping: boolean;
  activeCueIndex: number;
}

export interface MediaMetadataConfig {
  title: string;
  artist: string;
  album: string;
  artwork?: Array<{ src: string; sizes: string; type: string }>;
}

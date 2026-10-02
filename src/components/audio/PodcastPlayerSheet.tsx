/**
 * src/components/audio/PodcastPlayerSheet.tsx
 * Commute Podcast Player with Synchronized Transcript Highlighting (Karaoke)
 * and Lock Screen MediaSession integration.
 *
 * Adheres strictly to AGENTS.md §4 (Warm Modern Oriental Minimalism, Mobile First).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PodcastTrack, SpeedStep } from '../../types/audio';
import { PODCAST_TRACKS } from '../../data/audio/podcastCatalog';
import {
  getGlobalSpeed,
  setGlobalSpeed,
  setupMediaSession,
  setMediaSessionPlaybackState,
  clearMediaSession,
} from '../../engines/audio/nativeSpeedEngine';
import {
  speak,
  stopSpeaking,
  playClick,
} from '../../engines/audio/audioEngine';
import { NativeSpeedAudioLadder } from './NativeSpeedAudioLadder';

export interface PodcastPlayerSheetProps {
  initialTrackId?: string;
  onClose?: () => void;
  className?: string;
}

export const PodcastPlayerSheet: React.FC<PodcastPlayerSheetProps> = ({
  initialTrackId,
  onClose,
  className = '',
}) => {
  const [tracks] = useState<PodcastTrack[]>(PODCAST_TRACKS);
  const [trackIndex, setTrackIndex] = useState<number>(() => {
    if (initialTrackId) {
      const idx = PODCAST_TRACKS.findIndex((t) => t.id === initialTrackId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const currentTrack = tracks[trackIndex] || tracks[0];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeCueIdx, setActiveCueIdx] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<SpeedStep>(getGlobalSpeed());
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [showSpeedLadder, setShowSpeedLadder] = useState<boolean>(false);

  const activeCueRef = useRef<HTMLDivElement | null>(null);
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  isPlayingRef.current = isPlaying;

  // Auto-scroll transcript container to active line
  useEffect(() => {
    if (activeCueRef.current && transcriptContainerRef.current) {
      activeCueRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeCueIdx]);

  // Play a single cue by index
  const playCueAtIndex = useCallback(
    async (index: number) => {
      if (index < 0 || index >= currentTrack.cues.length) {
        if (isLooping) {
          playCueAtIndex(0);
        } else {
          setIsPlaying(false);
          setMediaSessionPlaybackState('paused');
          setActiveCueIdx(0);
        }
        return;
      }

      setActiveCueIdx(index);
      const cue = currentTrack.cues[index];

      try {
        await speak(cue.zh, {
          rate: playbackSpeed,
          onStart: () => {
            setMediaSessionPlaybackState('playing');
          },
          onEnd: () => {
            if (isPlayingRef.current) {
              // Proceed to next cue
              playCueAtIndex(index + 1);
            }
          },
          onError: () => {
            if (isPlayingRef.current) {
              playCueAtIndex(index + 1);
            }
          },
        });
      } catch {
        if (isPlayingRef.current) {
          playCueAtIndex(index + 1);
        }
      }
    },
    [currentTrack, playbackSpeed, isLooping]
  );

  const handleTogglePlay = useCallback(() => {
    playClick();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      setMediaSessionPlaybackState('paused');
    } else {
      setIsPlaying(true);
      playCueAtIndex(activeCueIdx);
    }
  }, [isPlaying, activeCueIdx, playCueAtIndex]);

  const handleNextTrack = useCallback(() => {
    playClick();
    stopSpeaking();
    setIsPlaying(false);
    setTrackIndex((prev) => (prev + 1) % tracks.length);
    setActiveCueIdx(0);
  }, [tracks.length]);

  const handlePrevTrack = useCallback(() => {
    playClick();
    stopSpeaking();
    setIsPlaying(false);
    setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setActiveCueIdx(0);
  }, [tracks.length]);

  const handleCueClick = (index: number) => {
    playClick();
    stopSpeaking();
    setActiveCueIdx(index);
    if (isPlaying) {
      playCueAtIndex(index);
    }
  };

  const handleSpeedSelect = (speed: SpeedStep) => {
    setPlaybackSpeed(speed);
    setGlobalSpeed(speed);
    // If currently playing, restart active cue with new speed rate
    if (isPlaying) {
      stopSpeaking();
      playCueAtIndex(activeCueIdx);
    }
  };

  // Setup MediaSession for Lock Screen & Bluetooth Earphones
  useEffect(() => {
    setupMediaSession(currentTrack, {
      onPlay: handleTogglePlay,
      onPause: handleTogglePlay,
      onNextTrack: handleNextTrack,
      onPreviousTrack: handlePrevTrack,
    });

    return () => {
      clearMediaSession();
      stopSpeaking();
    };
  }, [currentTrack, handleTogglePlay, handleNextTrack, handlePrevTrack]);

  return (
    <div
      className={`flex flex-col h-full max-h-[92vh] w-full max-w-lg mx-auto bg-[#FDFBF7] rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden text-stone-800 ${className}`}
      data-testid="podcast-player-sheet"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200/80 bg-white/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
            Commute Podcast Mode
          </span>
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
            {currentTrack.level}
          </span>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={() => {
              playClick();
              stopSpeaking();
              onClose();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 active:scale-95 transition-all"
            aria-label="ปิดเครื่องเล่นพอดแคสต์"
          >
            ✕
          </button>
        )}
      </div>

      {/* Track Selector Bar (Horizontal carousel) */}
      <div className="flex gap-2 px-5 py-2.5 overflow-x-auto no-scrollbar border-b border-stone-100 bg-stone-50/50">
        {tracks.map((t, idx) => {
          const isSelected = idx === trackIndex;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                playClick();
                stopSpeaking();
                setIsPlaying(false);
                setTrackIndex(idx);
                setActiveCueIdx(0);
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>{t.coverArtwork || '🎧'}</span>
              <span className="truncate max-w-[120px]">{t.titleZh}</span>
            </button>
          );
        })}
      </div>

      {/* Hero Track Artwork & Title */}
      <div className="flex flex-col items-center px-6 pt-4 pb-2 text-center bg-gradient-to-b from-stone-50/70 to-transparent">
        {/* Animated Vinyl / Artwork */}
        <div
          className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-stone-900 shadow-md ring-4 ring-amber-500/20 text-3xl transition-transform duration-700 ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '8s' }}
        >
          <span className="select-none">{currentTrack.coverArtwork || '🎧'}</span>
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-stone-700/60" />
        </div>

        <h2 className="mt-3 text-lg font-bold text-stone-900 tracking-tight">
          {currentTrack.titleZh}
        </h2>
        <p className="text-xs text-amber-700 font-medium">
          {currentTrack.titlePinyin}
        </p>
        <p className="mt-0.5 text-xs text-stone-500 line-clamp-1">
          {currentTrack.titleTh}
        </p>
      </div>

      {/* Synchronized Transcript Highlighting Area (Karaoke) */}
      <div
        ref={transcriptContainerRef}
        className="flex-1 overflow-y-auto px-5 py-3 space-y-3"
        data-testid="transcript-container"
      >
        {currentTrack.cues.map((cue, idx) => {
          const isActive = idx === activeCueIdx;
          return (
            <div
              key={cue.id}
              ref={isActive ? activeCueRef : null}
              onClick={() => handleCueClick(idx)}
              className={`cursor-pointer rounded-2xl p-3.5 transition-all duration-300 ${
                isActive
                  ? 'bg-amber-50/90 border border-amber-300 shadow-sm ring-2 ring-amber-400/20'
                  : 'bg-white/70 border border-stone-200/60 hover:bg-stone-50/80 opacity-70 hover:opacity-100'
              }`}
              data-testid={`transcript-cue-${idx}`}
            >
              <div className="flex items-center justify-between mb-1">
                {cue.speaker && (
                  <span
                    className={`text-[11px] font-bold ${
                      isActive ? 'text-amber-800' : 'text-stone-500'
                    }`}
                  >
                    {cue.speaker}
                  </span>
                )}
                {isActive && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-100/80 px-2 py-0.5 rounded-full">
                    <span>กำลังเล่น</span>
                    <span className="inline-block animate-bounce">▶</span>
                  </span>
                )}
              </div>

              {/* Chinese sentence */}
              <p
                className={`text-base font-semibold leading-relaxed tracking-wide ${
                  isActive ? 'text-stone-900 font-bold' : 'text-stone-700'
                }`}
              >
                {cue.zh}
              </p>

              {/* Pinyin sentence */}
              <p
                className={`mt-1 text-xs leading-normal font-sans ${
                  isActive ? 'text-amber-700 font-medium' : 'text-stone-600'
                }`}
              >
                {cue.pinyin}
              </p>

              {/* Thai translation */}
              <p
                className={`mt-1.5 text-xs leading-normal ${
                  isActive ? 'text-stone-700 font-normal' : 'text-stone-600'
                }`}
              >
                {cue.th}
              </p>
            </div>
          );
        })}
      </div>

      {/* Speed & Ambient Toggle Tray */}
      {showSpeedLadder && (
        <div className="px-4 py-2 border-t border-stone-200/80 bg-stone-50/90 animate-fadeIn">
          <NativeSpeedAudioLadder
            currentSpeed={playbackSpeed}
            onSpeedSelect={handleSpeedSelect}
            showAmbientControls={true}
            showTagline={false}
            compact={true}
          />
        </div>
      )}

      {/* Primary Control Dock (Bottom Bar) */}
      <div className="px-5 py-3.5 border-t border-stone-200/90 bg-white/95 backdrop-blur-md">
        <div className="flex items-center justify-between">
          {/* Speed Pill Toggle */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setShowSpeedLadder(!showSpeedLadder);
            }}
            className="flex items-center gap-1.5 rounded-full bg-stone-100 hover:bg-stone-200 px-3 py-1.5 text-xs font-bold text-stone-700 transition-all active:scale-95"
            data-testid="toggle-speed-ladder-btn"
            title="ปรับความเร็วและเสียงบรรยากาศ"
          >
            <span>⚡</span>
            <span>{playbackSpeed}x</span>
          </button>

          {/* Core Transport Controls */}
          <div className="flex items-center gap-3">
            {/* Prev Track */}
            <button
              type="button"
              onClick={handlePrevTrack}
              className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 hover:bg-stone-100 active:scale-95 transition-all"
              aria-label="แทร็กก่อนหน้า"
              title="แทร็กก่อนหน้า"
            >
              ⏮
            </button>

            {/* Main Play/Pause Button */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all active:scale-90 ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-700 ring-4 ring-amber-200'
                  : 'bg-emerald-700 hover:bg-emerald-800 ring-4 ring-emerald-100'
              }`}
              data-testid="podcast-play-pause-btn"
              aria-label={isPlaying ? 'หยุดชั่วคราว' : 'เล่น'}
            >
              <span className="text-xl ml-0.5">{isPlaying ? '⏸' : '▶'}</span>
            </button>

            {/* Next Track */}
            <button
              type="button"
              onClick={handleNextTrack}
              className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 hover:bg-stone-100 active:scale-95 transition-all"
              aria-label="แทร็กถัดไป"
              title="แทร็กถัดไป"
            >
              ⏭
            </button>
          </div>

          {/* Loop toggle */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsLooping(!isLooping);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs transition-all active:scale-95 ${
              isLooping
                ? 'bg-amber-100 text-amber-900 font-bold ring-1 ring-amber-300'
                : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'
            }`}
            title="เล่นวนซ้ำอัตโนมัติ"
            aria-label="เล่นวนซ้ำอัตโนมัติ"
          >
            🔁
          </button>
        </div>

        {/* Lock Screen & Offline banner note */}
        <p className="mt-2 text-center text-[10px] text-stone-600">
          📱 รองรับการควบคุมจากหน้าจอ Lock Screen และปุ่มหูฟังบลูทูธ
        </p>
      </div>
    </div>
  );
};

/**
 * src/components/studio/studioAudioPlayer.ts
 * ---------------------------------------------------------------------------
 * Centralized Audio Singleton & Custom Hook for Hanzero Content Studio.
 *
 * Capabilities:
 * 1. Preemptive Audio Playback: Safely stops existing playback before playing new item.
 * 2. Session Tracking: Tracks active playing clientId to prevent zombie speaker states.
 * 3. Flooding Guard: Throttles audio triggers (250ms) to prevent audio thread locking.
 * 4. Cleanup on Unmount: Automatically stops playback when components unmount.
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any', Zero Memory Leaks.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { speak, stopSpeaking } from '../../engines/audio/audioEngine';

export type AudioPlayStateListener = (activeId: string | null) => void;

class StudioAudioController {
  private activeId: string | null = null;
  private lastTriggerTime = 0;
  private listeners: Set<AudioPlayStateListener> = new Set();
  private throttleMs = 250;

  public subscribe(listener: AudioPlayStateListener): () => void {
    this.listeners.add(listener);
    listener(this.activeId);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.activeId);
    }
  }

  public getActiveId(): string | null {
    return this.activeId;
  }

  public play(id: string, text: string, rate: number = 1.0): void {
    const now = Date.now();
    if (now - this.lastTriggerTime < this.throttleMs) {
      return;
    }
    this.lastTriggerTime = now;

    if (!text || text.trim().length === 0) {
      this.stop();
      return;
    }

    // Stop current speech first (preemption)
    stopSpeaking();
    this.activeId = id;
    this.notify();

    try {
      speak(text.trim(), {
        rate,
        onEnd: () => {
          if (this.activeId === id) {
            this.activeId = null;
            this.notify();
          }
        },
        onError: () => {
          if (this.activeId === id) {
            this.activeId = null;
            this.notify();
          }
        },
      });
    } catch {
      this.activeId = null;
      this.notify();
    }
  }

  public stop(): void {
    try {
      stopSpeaking();
    } catch {
      // Safe no-op
    }
    this.activeId = null;
    this.notify();
  }
}

export const studioAudioController = new StudioAudioController();

/**
 * Hook to bind a component to the Studio Audio Singleton.
 */
export function useStudioAudioPlayer() {
  const [activePlayingId, setActivePlayingId] = useState<string | null>(() =>
    studioAudioController.getActiveId()
  );
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const unsubscribe = studioAudioController.subscribe((id) => {
      if (mountedRef.current) {
        setActivePlayingId(id);
      }
    });

    return () => {
      mountedRef.current = false;
      unsubscribe();
      // On unmount of the consumer, stop audio to avoid background noise
      studioAudioController.stop();
    };
  }, []);

  const play = useCallback((id: string, text: string, rate?: number) => {
    studioAudioController.play(id, text, rate);
  }, []);

  const stop = useCallback(() => {
    studioAudioController.stop();
  }, []);

  return {
    activePlayingId,
    isPlaying: (id: string) => activePlayingId === id,
    play,
    stop,
  };
}

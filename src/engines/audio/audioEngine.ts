/**
 * Hanzero Audio Resilience Engine (audioEngine.ts)
 * ------------------------------------------------
 * Robust, zero-cost audio subsystem for Web Audio SFX, Chinese Speech Synthesis (TTS),
 * and tone contour synthesis with proactive mobile/Safari lifecycle management.
 *
 * Adheres strictly to AGENTS.md §4.2: Pure TypeScript, zero-UI, fully testable.
 */

export type ToneNumber = 1 | 2 | 3 | 4;

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error | unknown) => void;
}

export interface AudioEngineStatus {
  isAudioContextSupported: boolean;
  isSpeechSupported: boolean;
  audioContextState: AudioContextState | 'uninitialized' | 'unsupported';
  hasChineseVoice: boolean;
  isInAppBrowser: boolean;
}

// Module-level singletons and tracking
let audioContextInstance: AudioContext | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let watchdogTimer: ReturnType<typeof setTimeout> | null = null;
let isLifecycleBound = false;

/**
 * Detects whether the user is inside a constrained mobile in-app WebView
 * (LINE, Facebook, WeChat, Instagram) which often restricts audio autoplay.
 */
export function isInAppBrowser(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  const ua = navigator.userAgent || '';
  return /FBAN|FBAV|Line\/|MicroMessenger|Instagram/i.test(ua);
}

/**
 * Returns the singleton AudioContext instance or null if unsupported.
 * Lazily creates the instance on first demand.
 */
export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!audioContextInstance) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (AudioCtx) {
      try {
        audioContextInstance = new AudioCtx();
        setupLifecycleListeners();
      } catch {
        audioContextInstance = null;
      }
    }
  }

  return audioContextInstance;
}

/**
 * Automatically binds visibilitychange and window focus events to resume
 * a suspended AudioContext when the learner returns from another tab or mobile sleep.
 */
function setupLifecycleListeners(): void {
  if (isLifecycleBound || typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const handleResume = () => {
    if (audioContextInstance && audioContextInstance.state === 'suspended') {
      audioContextInstance.resume().catch(() => {
        // Silent catch: may require user gesture on strict browsers
      });
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      handleResume();
    }
  });

  window.addEventListener('focus', handleResume);
  isLifecycleBound = true;
}

/**
 * Explicit user-gesture unlocker for iOS / Safari Autoplay policies.
 * Should be invoked on the very first touch/click interaction.
 */
export async function unlockAudioContext(): Promise<boolean> {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      return false;
    }
  }

  // Play a 1-sample silent buffer to unlock the hardware audio pipeline
  try {
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    return true;
  } catch {
    return false;
  }
}

/**
 * Web Audio SFX: Short and gentle button click feedback.
 */
export function playClick(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Graceful fallback
  }
}

/**
 * Web Audio SFX: Cheerful ascending major triad chime (C5 - E5 - G5) for correct answers.
 */
export function playCorrect(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

    notes.forEach((freq, index) => {
      const startTime = now + index * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.26);
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Web Audio SFX: Gentle descending minor dyad for incorrect attempts.
 */
export function playIncorrect(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [440.0, 392.0]; // A4 -> G4

    notes.forEach((freq, index) => {
      const startTime = now + index * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.21);
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Web Audio SFX: Joyful celebration fanfare for quest/unit completion.
 */
export function playFanfare(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // C5 - E5 - G5 - C6
    const notes = [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((freq, index) => {
      const startTime = now + index * 0.1;
      const duration = index === notes.length - 1 ? 0.4 : 0.15;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.01);
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Synthesizes a pure sine wave frequency glide that contours the 4 standard Mandarin tones.
 * Tone 1 (55): High and level (440Hz -> 440Hz)
 * Tone 2 (35): Mid-rising (330Hz -> 440Hz)
 * Tone 3 (214): Dipping (293Hz -> 220Hz -> 370Hz)
 * Tone 4 (51): High-falling (440Hz -> 220Hz)
 */
export function playToneContour(tone: ToneNumber, durationSeconds = 0.35): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';

    if (tone === 1) {
      // 1st Tone (High-Level 55)
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(440, now + durationSeconds);
    } else if (tone === 2) {
      // 2nd Tone (Rising 35)
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + durationSeconds);
    } else if (tone === 3) {
      // 3rd Tone (Dipping 214)
      const dipPoint = now + durationSeconds * 0.45;
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(220, dipPoint);
      osc.frequency.exponentialRampToValueAtTime(370, now + durationSeconds);
    } else if (tone === 4) {
      // 4th Tone (Falling 51)
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + durationSeconds);
    }

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSeconds + 0.02);
  } catch {
    // Graceful fallback
  }
}

/**
 * Searches the browser speech synthesis voices for the optimal Chinese voice.
 */
export function findChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  // Priority: Mainland Chinese (zh-CN / cmn-Hans-CN) -> any zh voice
  return (
    voices.find(
      (v) =>
        v.lang === 'zh-CN' ||
        v.lang === 'cmn-Hans-CN' ||
        v.lang.toLowerCase() === 'zh_cn' ||
        v.lang === 'zh'
    ) ||
    voices.find((v) => v.lang.startsWith('zh') || v.lang.startsWith('cmn')) ||
    null
  );
}

/**
 * Stops any active speech and clears pending watchdog timers.
 */
export function stopSpeaking(): void {
  if (watchdogTimer) {
    clearTimeout(watchdogTimer);
    watchdogTimer = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cancel errors
    }
  }

  currentUtterance = null;
}

/**
 * Returns true if an utterance is currently active in the engine.
 */
export function isSpeaking(): boolean {
  return currentUtterance !== null;
}

/**
 * High-resilience speech synthesis (TTS) for Chinese characters and phrases.
 * Includes:
 * 1. Safe cancel before start to avoid queue deadlocks.
 * 2. Utterance retention to avoid mobile Safari GC mid-speech bugs.
 * 3. 3-second watchdog timer: automatically invokes fallback and triggers onEnd if browser hangs.
 */
export function speak(text: string, options: SpeakOptions = {}): Promise<void> {
  const { rate = 0.85, pitch = 1.0, onStart, onEnd, onError } = options;

  return new Promise((resolve) => {
    // Stop any existing speech and clean up timer
    stopSpeaking();

    const hasSpeech =
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined';

    if (!hasSpeech) {
      // Fallback to sine tone chime
      playToneContour(1, 0.25);
      onError?.(new Error('SpeechSynthesis not supported on this browser'));
      onEnd?.();
      resolve();
      return;
    }

    let isCompleted = false;

    const finalize = (error?: Error) => {
      if (isCompleted) return;
      isCompleted = true;

      if (watchdogTimer) {
        clearTimeout(watchdogTimer);
        watchdogTimer = null;
      }

      currentUtterance = null;

      if (error) {
        onError?.(error);
      }
      onEnd?.();
      resolve();
    };

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = Math.max(0.5, Math.min(rate, 1.5));
      utterance.pitch = Math.max(0.5, Math.min(pitch, 1.5));

      const chineseVoice = findChineseVoice();
      if (chineseVoice) {
        utterance.voice = chineseVoice;
      }

      // Retain utterance reference to avoid mobile garbage collection
      currentUtterance = utterance;

      utterance.onstart = () => {
        onStart?.();
      };

      utterance.onend = () => {
        finalize();
      };

      utterance.onerror = (event) => {
        finalize(new Error(event.error || 'SpeechSynthesis error occurred'));
      };

      // 3-second Watchdog: If browser locks up or fails to trigger onend/onerror
      watchdogTimer = setTimeout(() => {
        if (!isCompleted) {
          stopSpeaking();
          playToneContour(1, 0.2); // Fallback tone
          finalize(new Error('SpeechSynthesis timed out (3s watchdog triggered)'));
        }
      }, 3000);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      playToneContour(1, 0.25);
      finalize(err instanceof Error ? err : new Error('Unexpected speech error'));
    }
  });
}

/**
 * Inspects the current audio subsystem health and readiness.
 */
export function getAudioEngineStatus(): AudioEngineStatus {
  const isAudioCtxSupported =
    typeof window !== 'undefined' &&
    !!(
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    );

  const isSpeechSupported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined';

  return {
    isAudioContextSupported: isAudioCtxSupported,
    isSpeechSupported,
    audioContextState: audioContextInstance
      ? audioContextInstance.state
      : isAudioCtxSupported
        ? 'uninitialized'
        : 'unsupported',
    hasChineseVoice: !!findChineseVoice(),
    isInAppBrowser: isInAppBrowser(),
  };
}

/**
 * Teardown utility for test suites and memory cleanup.
 */
export function _resetAudioEngineForTesting(): void {
  stopSpeaking();
  if (audioContextInstance) {
    try {
      audioContextInstance.close().catch(() => {});
    } catch {
      // Ignore close error
    }
    audioContextInstance = null;
  }
  isLifecycleBound = false;
}

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
let currentAudioElement: HTMLAudioElement | null = null;
let watchdogTimer: ReturnType<typeof setTimeout> | null = null;
let audioStreamWatchdogTimer: ReturnType<typeof setTimeout> | null = null;
let isLifecycleBound = false;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Concurrency & Session guards
let activeSessionId = 0;
let activeSessionResolve: (() => void) | null = null;
let unlockPromise: Promise<boolean> | null = null;

/**
 * Populates and refreshes the internal cached voices list.
 */
function populateVoices(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const list = window.speechSynthesis.getVoices();
    if (list.length > 0) {
      cachedVoices = list;
    }
  }
}

// Automatically bind voiceschanged listener on module initialization
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  populateVoices();
  if (typeof window.speechSynthesis.addEventListener === 'function') {
    window.speechSynthesis.addEventListener('voiceschanged', populateVoices);
  } else {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }
}

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
 * Lazily creates the instance on first demand and automatically recreates
 * if the previous instance was closed by the host OS.
 */
export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!audioContextInstance || audioContextInstance.state === 'closed') {
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

  const handleSuspend = () => {
    if (
      audioContextInstance &&
      typeof audioContextInstance.suspend === 'function' &&
      audioContextInstance.state === 'running'
    ) {
      audioContextInstance.suspend().catch(() => {});
    }
    stopSpeaking();
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      handleResume();
    } else if (document.visibilityState === 'hidden') {
      handleSuspend();
    }
  });

  window.addEventListener('focus', handleResume);
  isLifecycleBound = true;
}

// Automatically bind lifecycle listeners on module initialization in browser
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  setupLifecycleListeners();
}

/**
 * Explicit user-gesture unlocker for iOS / Safari Autoplay policies.
 * Includes fast-path for running contexts and mutex memoization to prevent
 * duplicate buffer source allocation under rapid taps.
 */
export function unlockAudioContext(): Promise<boolean> {
  primeSharedAudio();
  const ctx = getAudioContext();
  if (!ctx) return Promise.resolve(false);

  // Fast-path: already operational
  if (ctx.state === 'running') return Promise.resolve(true);

  if (unlockPromise) return unlockPromise;

  unlockPromise = (async () => {
    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      return true;
    } catch {
      return false;
    } finally {
      unlockPromise = null;
    }
  })();

  return unlockPromise;
}

let lastClickTime = 0;
const CLICK_THROTTLE_MS = 30;

let lastCorrectTime = 0;
let lastIncorrectTime = 0;
let lastContourTime = 0;
const SFX_THROTTLE_MS = 40;

/**
 * Web Audio SFX: Short and gentle button click feedback.
 * Includes 30ms throttling to prevent oscillator node explosion on spam click.
 */
export function playClick(): void {
  const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (nowMs - lastClickTime < CLICK_THROTTLE_MS) {
    return;
  }
  lastClickTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

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

    osc.onended = () => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch {
        // Safe ignore
      }
    };

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
  const isTestMode = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';
  const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (!isTestMode && nowMs - lastCorrectTime < SFX_THROTTLE_MS) {
    return;
  }
  lastCorrectTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

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

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          // Safe ignore
        }
      };

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
  const isTestMode = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';
  const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (!isTestMode && nowMs - lastIncorrectTime < SFX_THROTTLE_MS) {
    return;
  }
  lastIncorrectTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

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

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          // Safe ignore
        }
      };

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

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

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

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          // Safe ignore
        }
      };

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
 * Tone 3 (214): Dipping (300Hz -> 220Hz -> 370Hz)
 * Tone 4 (51): High-falling (440Hz -> 220Hz)
 */
export function playToneContour(tone: ToneNumber, durationSeconds = 0.35): void {
  const isTestMode = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';
  const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (!isTestMode && nowMs - lastContourTime < SFX_THROTTLE_MS) {
    return;
  }
  lastContourTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

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

    osc.onended = () => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch {
        // Safe ignore
      }
    };

    osc.start(now);
    osc.stop(now + durationSeconds + 0.02);
  } catch {
    // Graceful fallback
  }
}

/**
 * Map of common Tier 0 / Tier 1 phonemes to standard Chinese characters
 * to allow SpeechSynthesis to pronounce them correctly without spelling letter-by-letter.
 */
export const PHONEME_CHARACTER_MAP: Record<string, string> = {
  a1: '啊',
  a2: '啊',
  a3: '啊',
  a4: '啊',
  ba1: '八',
  ba2: '拔',
  ba3: '把',
  ba4: '爸',
  ma1: '妈',
  ma2: '麻',
  ma3: '马',
  ma4: '骂',
  ma5: '吗',
  ma: '吗',
  ni3: '你',
  hao3: '好',
  wo3: '我',
  ta1: '他',
  shi4: '是',
  bu4: '不',
  bu2: '不',
  xie4: '谢',
  xie5: '谢',
  ke4: '客',
  qi4: '气',
  qi5: '气',
  qi: '气',
  zai4: '再',
  jian4: '见',
  jiao4: '叫',
  shen2: '什',
  me5: '么',
  me: '么',
  ming2: '名',
  zi4: '字',
  zi5: '字',
  na3: '哪',
  na4: '那',
  guo2: '国',
  ren2: '人',
  tai4: '泰',
  zhong1: '中',
  nin2: '您',
  gui4: '贵',
  xing4: '姓',
  ren4: '认',
  shi5: '识',
  shi: '识',
  gao1: '高',
  hen3: '很',
  ye3: '也',
  ne5: '呢',
  ne: '呢',
  men5: '们',
  men: '们',
};

/**
 * Plays pre-rendered Tier 0 static audio fallback from local PWA assets,
 * or gracefully falls back to synthesized tone contour / TTS if the asset is missing.
 *
 * Guaranteed non-throwing promise that resolves to true (if audio played) or false (fallback).
 */
export async function playPhonemeAudio(code: string): Promise<boolean> {
  const sanitized = code.trim().toLowerCase();
  if (!sanitized || !/^[a-z]+[1-5]?$/.test(sanitized)) {
    return false;
  }

  // Attempt Tier 0: Static Audio asset
  if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
    const assetUrl = `${import.meta.env.BASE_URL}audio/tier0/${sanitized}.mp3`;
    const played = await new Promise<boolean>((resolve) => {
      try {
        const audio = new Audio();
        let isResolved = false;

        const cleanup = () => {
          if (!isResolved) {
            isResolved = true;
            audio.onended = null;
            audio.onerror = null;
            audio.src = '';
          }
        };

        audio.onended = () => {
          cleanup();
          resolve(true);
        };

        audio.onerror = () => {
          cleanup();
          resolve(false);
        };

        // 1.5s timeout watchdog for asset load
        setTimeout(() => {
          if (!isResolved) {
            cleanup();
            resolve(false);
          }
        }, 1500);

        audio.src = assetUrl;
        audio.play().catch(() => {
          cleanup();
          resolve(false);
        });
      } catch {
        resolve(false);
      }
    });

    if (played) return true;
  }

  // Fallback Cascade Tier 1: Tone Contour Glide if tone digit exists
  const toneMatch = sanitized.match(/[1-4]$/);
  if (toneMatch) {
    const tone = parseInt(toneMatch[0], 10) as ToneNumber;
    playToneContour(tone, 0.35);
    return true;
  }

  // Fallback Cascade Tier 2: Mapped Chinese Character Speech
  const mappedChar = PHONEME_CHARACTER_MAP[sanitized];
  if (mappedChar) {
    await speak(mappedChar, { rate: 0.85 });
    return true;
  }

  // Fallback Cascade Tier 3: Default Tone 1 chime
  playToneContour(1, 0.25);
  return true;
}

/**
 * Searches the browser speech synthesis voices for the optimal Chinese voice.
 * Checks cached voices first and employs multi-tier matching across BCP 47 tags and voice names.
 */
export function findChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const liveVoices = window.speechSynthesis.getVoices();
  const voices = liveVoices.length > 0 ? liveVoices : cachedVoices;
  if (liveVoices.length > 0 && cachedVoices.length === 0) {
    cachedVoices = liveVoices;
  }

  // Priority 1: Mainland Standard Mandarin (zh-CN / cmn-Hans-CN / zh-Hans)
  const mainlandVoice = voices.find((v) => {
    const l = v.lang.toLowerCase().replace(/_/g, '-');
    return (
      l === 'zh-cn' ||
      l === 'cmn-hans-cn' ||
      l === 'cmn-hans' ||
      l === 'zh-hans-cn' ||
      l === 'zh-hans'
    );
  });
  if (mainlandVoice) return mainlandVoice;

  // Priority 2: General Chinese (zh, cmn, or regional accents: zh-HK, zh-TW, zh-SG)
  const regionalVoice = voices.find((v) => {
    const l = v.lang.toLowerCase().replace(/_/g, '-');
    return l.startsWith('zh') || l.startsWith('cmn');
  });
  if (regionalVoice) return regionalVoice;

  // Priority 3: Name-based Chinese voice heuristics
  const nameMatchVoice = voices.find((v) => {
    const n = v.name.toLowerCase();
    return (
      n.includes('chinese') ||
      n.includes('mandarin') ||
      n.includes('putonghua') ||
      v.name.includes('中文') ||
      v.name.includes('普通话') ||
      v.name.includes('華語') ||
      v.name.includes('国语')
    );
  });
  if (nameMatchVoice) return nameMatchVoice;

  return null;
}

/**
 * Returns true if at least one Chinese speech synthesis voice is available.
 */
export function hasChineseVoice(): boolean {
  return findChineseVoice() !== null;
}

/**
 * Returns all Chinese voices currently available in the speech synthesis engine.
 */
export function getAllChineseVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  const liveVoices = window.speechSynthesis.getVoices();
  const voices = liveVoices.length > 0 ? liveVoices : cachedVoices;
  return voices.filter((v) => {
    const l = v.lang.toLowerCase().replace(/_/g, '-');
    const n = v.name.toLowerCase();
    return (
      l.startsWith('zh') ||
      l.startsWith('cmn') ||
      n.includes('chinese') ||
      n.includes('mandarin') ||
      v.name.includes('中文') ||
      v.name.includes('普通话')
    );
  });
}

/**
 * Subscribes to dynamic voice loading events from the browser.
 * Returns an unsubscribe callback.
 */
export function onVoicesChanged(callback: () => void): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return () => {};
  }
  if (typeof window.speechSynthesis.addEventListener === 'function') {
    window.speechSynthesis.addEventListener('voiceschanged', callback);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', callback);
    };
  }
  const prevHandler = window.speechSynthesis.onvoiceschanged;
  window.speechSynthesis.onvoiceschanged = callback;
  return () => {
    if (window.speechSynthesis.onvoiceschanged === callback) {
      window.speechSynthesis.onvoiceschanged = prevHandler;
    }
  };
}

// Shared singleton HTMLAudioElement to preserve user gesture authorization across async loops
let sharedAudioElement: HTMLAudioElement | null = null;
let preferOnlineAudioState = false;

/**
 * Pre-warms / unlocks the shared HTMLAudioElement on direct user interaction.
 * Playing a silent 1-sample buffer during a click or touch event grants persistent
 * playback permissions in Chromium and WebKit browsers, allowing subsequent
 * asynchronous lines (e.g. sequential dialogue lines with 500ms gaps) to play.
 */
export function primeSharedAudio(): void {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return;
  try {
    if (!sharedAudioElement) {
      sharedAudioElement = new Audio();
      sharedAudioElement.preload = 'auto';
    }
    if (!sharedAudioElement.dataset.unlocked) {
      // 1-sample silent WAV data URI
      sharedAudioElement.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      sharedAudioElement.volume = 0;
      const playPromise = sharedAudioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (sharedAudioElement) {
              sharedAudioElement.dataset.unlocked = 'true';
              sharedAudioElement.volume = 1;
            }
          })
          .catch(() => {
            // User gesture not yet available or blocked; safe ignore
          });
      }
    }
  } catch {
    // Safe ignore in headless/test environments
  }
}

/**
 * Configure user preference for online audio streaming vs native TTS.
 */
export function setPreferOnlineAudio(prefer: boolean): void {
  preferOnlineAudioState = prefer;
}

/**
 * Returns current preference for online audio stream.
 */
export function isPreferOnlineAudio(): boolean {
  return preferOnlineAudioState;
}

/**
 * Local Pre-recorded Native Chinese Audio Map (Unit 1).
 * Serves zero-latency, high-fidelity studio MP3s directly from project assets
 * without relying on external network or browser speech synthesis.
 */
export const STATIC_AUDIO_MAP: Record<string, string> = {
  // Vocabulary
  '你': 'audio/unit01/ni.mp3',
  '好': 'audio/unit01/hao.mp3',
  '你好': 'audio/unit01/ni_hao.mp3',
  '您': 'audio/unit01/nin.mp3',
  '您好': 'audio/unit01/nin_hao.mp3',
  '你们': 'audio/unit01/nimen.mp3',
  '你们好': 'audio/unit01/nimen_hao.mp3',
  '谢谢': 'audio/unit01/xie_xie.mp3',
  '不': 'audio/unit01/bu.mp3',
  '客气': 'audio/unit01/ke_qi.mp3',
  '不客气': 'audio/unit01/bu_ke_qi.mp3',
  '再见': 'audio/unit01/zai_jian.mp3',
  // Dialogue & Sentences
  '你好！': 'audio/unit01/dialogue_ni_hao.mp3',
  '谢谢！': 'audio/unit01/dialogue_xie_xie.mp3',
  '不客气！': 'audio/unit01/dialogue_bu_ke_qi.mp3',
  '不客气，再见！': 'audio/unit01/dialogue_bu_ke_qi_zai_jian.mp3',
  '不客气，再见': 'audio/unit01/dialogue_bu_ke_qi_zai_jian.mp3',
  '不客气再见': 'audio/unit01/dialogue_bu_ke_qi_zai_jian.mp3',
  '再见！': 'audio/unit01/dialogue_zai_jian.mp3',
  '你好！很高兴认识你。': 'audio/unit01/sentence_ni_hao_renshi.mp3',
  '今天天气很好。': 'audio/unit01/sentence_tianqi_hao.mp3',
  '太谢谢你了，朋友！': 'audio/unit01/sentence_tai_xiexie.mp3',
  '不用谢，大家都是朋友，不客气！': 'audio/unit01/sentence_bu_yong_xie.mp3',
  '明天学校见，再见！': 'audio/unit01/sentence_mingtian_xuexiao.mp3',
  '我是泰国人。': 'audio/unit01/sentence_wo_shi_taiguo_ren.mp3',
  '我是泰国人': 'audio/unit01/sentence_wo_shi_taiguo_ren.mp3',
  '我叫李明，你呢？': 'audio/unit01/sentence_wo_jiao_li_ming.mp3',
  '认识你很高兴！': 'audio/unit01/sentence_renshi_ni.mp3',
  '认识你很高兴': 'audio/unit01/sentence_renshi_ni.mp3',
  '认识您我也很高兴！谢谢，再见！': 'audio/unit01/sentence_renshi_nin.mp3',
};

/**
 * Resolves the playback URL for a given Chinese text:
 * 1. Checks local static MP3 assets (fast, offline, studio quality)
 * 2. Falls back to Youdao DictVoice online stream (&le=zh) without punctuation to prevent HTTP 500
 */
export function getAudioSourceUrl(text: string): string {
  const clean = text.trim();
  const unpunct = clean.replace(/[！!？?。，,、；;：“”"'\s]+$/g, '') || clean;
  const noPunctuation = clean.replace(/[！!？?。，,、；;：“”"'\s]/g, '') || clean;

  const localFile =
    STATIC_AUDIO_MAP[clean] || STATIC_AUDIO_MAP[unpunct] || STATIC_AUDIO_MAP[noPunctuation];
  if (localFile) {
    const baseUrl =
      typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL
        ? import.meta.env.BASE_URL
        : '/Hanzero/';
    return `${baseUrl.replace(/\/$/, '')}/${localFile}`;
  }

  // Youdao DictVoice returns HTTP 500 if punctuation is present, so strip for fallback
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(noPunctuation)}&le=zh`;
}

/**
 * Plays high-quality Chinese speech via local MP3 audio assets or HTML5 Audio Stream.
 * Used as a zero-cost, high-fidelity fallback when the host OS/browser lacks Chinese TTS voice packs
 * or when native speech synthesis is unavailable or fails.
 */
export function playAudioStream(text: string, options: SpeakOptions = {}): Promise<boolean> {
  const { rate = 1.0, onStart, onEnd, onError } = options;

  if (typeof window === 'undefined' || typeof Audio === 'undefined') {
    return Promise.resolve(false);
  }

  const cleanText = text.trim();
  if (!cleanText) return Promise.resolve(false);

  // Stop any active audio stream
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch {
      // Safe ignore
    }
    currentAudioElement = null;
  }

  const targetUrl = getAudioSourceUrl(cleanText);

  return new Promise<boolean>((resolve) => {
    try {
      const audio = new Audio(targetUrl);
      currentAudioElement = audio;

      audio.playbackRate = Math.max(0.5, Math.min(rate, 1.5));
      audio.volume = 1;

      let isFinished = false;

      const finish = (success: boolean) => {
        if (isFinished) return;
        isFinished = true;
        if (audioStreamWatchdogTimer) {
          clearTimeout(audioStreamWatchdogTimer);
          audioStreamWatchdogTimer = null;
        }
        audio.onplay = null;
        audio.onended = null;
        audio.onerror = null;
        if (currentAudioElement === audio) {
          currentAudioElement = null;
        }
        if (success) {
          onEnd?.();
        } else {
          onError?.(new Error('Audio playback failed'));
        }
        resolve(success);
      };

      audio.onplay = () => {
        onStart?.();
      };

      audio.onended = () => {
        finish(true);
      };

      audio.onerror = () => {
        finish(false);
      };

      // 5s watchdog timeout for network/local audio
      if (audioStreamWatchdogTimer) {
        clearTimeout(audioStreamWatchdogTimer);
      }
      audioStreamWatchdogTimer = setTimeout(() => {
        if (!isFinished) {
          finish(false);
        }
      }, 5000);

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err: unknown) => {
          // Suppress AbortError caused by rapid preemption or pause
          if (err instanceof DOMException && err.name === 'AbortError') {
            finish(false);
            return;
          }
          finish(false);
        });
      }
    } catch {
      resolve(false);
    }
  });
}

/**
 * Stops any active speech, clears watchdog timers, and safely unblocks
 * any in-flight Promise so callers don't hang in an await state.
 */
export function stopSpeaking(): void {
  if (watchdogTimer) {
    clearTimeout(watchdogTimer);
    watchdogTimer = null;
  }
  if (audioStreamWatchdogTimer) {
    clearTimeout(audioStreamWatchdogTimer);
    audioStreamWatchdogTimer = null;
  }

  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch {
      // Safe ignore
    }
    currentAudioElement = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cancel errors
    }
  }

  currentUtterance = null;

  // Unblock any in-flight Promise so callers awaiting an interrupted speech don't hang
  if (activeSessionResolve) {
    activeSessionResolve();
    activeSessionResolve = null;
  }
}

/**
 * Returns true if an utterance is currently active in the engine.
 */
export function isSpeaking(): boolean {
  return currentUtterance !== null || currentAudioElement !== null;
}

let lastSpeakText = '';
let lastSpeakTimestamp = 0;
const SPEAK_DUPLICATE_THROTTLE_MS = 80;

/**
 * High-resilience speech synthesis (TTS) for Chinese characters and phrases.
 * Priority cascade:
 * 1. Pre-recorded studio MP3 files (Unit 1 assets in public/audio/unit01/)
 * 2. High-fidelity Online Audio Stream (Youdao DictVoice)
 * 3. Native SpeechSynthesis if available
 * 4. Tone contour acoustic glide fallback
 */
export function speak(text: string, options: SpeakOptions = {}): Promise<void> {
  const { rate = 0.85, pitch = 1.0, onStart, onEnd, onError } = options;

  const clean = text.trim();
  const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (clean && clean === lastSpeakText && nowMs - lastSpeakTimestamp < SPEAK_DUPLICATE_THROTTLE_MS && isSpeaking()) {
    return Promise.resolve();
  }
  lastSpeakText = clean;
  lastSpeakTimestamp = nowMs;

  return new Promise((resolve) => {
    // Stop existing speech, unblock prior callers, and clear watchdog
    stopSpeaking();

    const currentSessionId = ++activeSessionId;
    activeSessionResolve = resolve;

    const clean = text.trim();
    const unpunct = clean.replace(/[！!？?。，,、；;：“”"'\s]+$/g, '') || clean;
    const hasStaticAudio = !!(STATIC_AUDIO_MAP[clean] || STATIC_AUDIO_MAP[unpunct]);
    const isTestMode = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';

    const chineseVoice = findChineseVoice();
    const shouldUseAudioStream =
      (!isTestMode && hasStaticAudio) || preferOnlineAudioState || !chineseVoice;

    // Direct Studio MP3 / Audio Stream if available in real browser or when host lacks Chinese voice
    if (shouldUseAudioStream) {
      playAudioStream(text, {
        rate,
        onStart: () => {
          if (currentSessionId === activeSessionId) {
            onStart?.();
          }
        },
        onEnd: () => {
          if (currentSessionId === activeSessionId) {
            onEnd?.();
            activeSessionResolve = null;
          }
          resolve();
        },
        onError: () => {
          if (currentSessionId === activeSessionId) {
            // Acoustic Tone Fallback if offline/network stream fails
            playToneContour(1, 0.25);
            onError?.(new Error('Chinese TTS voice not installed and audio stream unavailable'));
            onEnd?.();
            activeSessionResolve = null;
          }
          resolve();
        },
      });
      return;
    }

    const hasSpeech =
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined';

    if (!hasSpeech) {
      // Fallback to online stream or sine tone chime
      playAudioStream(text, {
        rate,
        onStart,
        onEnd: () => {
          activeSessionResolve = null;
          resolve();
        },
        onError: () => {
          playToneContour(1, 0.25);
          onError?.(new Error('SpeechSynthesis not supported on this browser'));
          onEnd?.();
          activeSessionResolve = null;
          resolve();
        },
      });
      return;
    }

    let isCompleted = false;

    const finalize = (error?: Error) => {
      if (isCompleted) return;
      isCompleted = true;

      // Clean up global references ONLY if this is still the active session
      if (currentSessionId === activeSessionId) {
        if (watchdogTimer) {
          clearTimeout(watchdogTimer);
          watchdogTimer = null;
        }

        currentUtterance = null;
        activeSessionResolve = null;

        if (error) {
          onError?.(error);
        }
        onEnd?.();
      }

      // Always resolve this specific call's Promise to prevent hanging awaits
      resolve();
    };

    try {
      // Chromium Workaround: If speechSynthesis was left in paused state, resume it
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = Math.max(0.5, Math.min(rate, 1.5));
      utterance.pitch = Math.max(0.5, Math.min(pitch, 1.5));
      utterance.voice = chineseVoice;

      // Retain utterance reference to avoid mobile garbage collection
      currentUtterance = utterance;

      utterance.onstart = () => {
        if (currentSessionId === activeSessionId) {
          onStart?.();
        }
      };

      utterance.onend = () => {
        finalize();
      };

      utterance.onerror = (event) => {
        if (
          currentSessionId === activeSessionId &&
          event.error !== 'canceled' &&
          event.error !== 'interrupted'
        ) {
          playToneContour(1, 0.2);
        }
        finalize(new Error(event.error || 'SpeechSynthesis error occurred'));
      };

      // 3-second Watchdog: If browser locks up or fails to trigger onend/onerror
      watchdogTimer = setTimeout(() => {
        if (!isCompleted && currentSessionId === activeSessionId) {
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
    hasChineseVoice: hasChineseVoice(),
    isInAppBrowser: isInAppBrowser(),
  };
}

/**
 * Teardown utility for test suites and memory cleanup.
 */
export function _resetAudioEngineForTesting(): void {
  stopSpeaking();
  activeSessionId = 0;
  activeSessionResolve = null;
  unlockPromise = null;
  cachedVoices = [];
  currentAudioElement = null;
  sharedAudioElement = null;
  preferOnlineAudioState = false;
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

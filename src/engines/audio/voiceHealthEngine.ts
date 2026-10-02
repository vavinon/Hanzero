/**
 * Hanzero Voice Health Engine (voiceHealthEngine.ts)
 * --------------------------------------------------
 * Pure TypeScript, zero-UI engine for detecting client OS, inspecting Chinese
 * SpeechSynthesis voices, classifying audio health grades (Optimal / Good / Fallback / Unsupported),
 * and generating device-specific installation guides.
 *
 * Adheres strictly to AGENTS.md §4.2 and docs/architecture/zero_mp3_audio_health_blueprint.md.
 */

import { speak, playToneContour } from './audioEngine';

export type VoiceHealthGrade = 'optimal' | 'good' | 'fallback' | 'unsupported';
export type ClientOS = 'windows' | 'mac' | 'ios' | 'android' | 'other';

export interface VoiceHealthState {
  grade: VoiceHealthGrade;
  clientOS: ClientOS;
  hasChineseVoice: boolean;
  isNeural: boolean;
  activeVoiceName: string | null;
  totalChineseVoices: number;
  isOnline: boolean;
  samplePhrase: string;
}

export interface OsVoiceGuideStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface OsVoiceGuide {
  os: ClientOS;
  osName: string;
  icon: string;
  steps: OsVoiceGuideStep[];
  tip?: string;
}

export const DEFAULT_SAMPLE_PHRASE = '你好！很高兴认识你。';

// Neural & High-Quality Voice Identifiers
const NEURAL_VOICE_PATTERNS = [
  'xiaoxiao',
  'yunxi',
  'xiaoyi',
  'yunjian',
  'siri',
  'tingting',
  'yu-shu',
  'sin-ji',
  'natural',
  'neural',
  'online (natural)',
];

/**
 * Detects the client operating system from userAgent and platform.
 * Supports iOS (including iPadOS touch desktop mode), Android, Windows, Mac.
 */
export function detectClientOS(customUserAgent?: string, customPlatform?: string): ClientOS {
  if (typeof window === 'undefined' && !customUserAgent) {
    return 'other';
  }

  const ua = (customUserAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '')).toLowerCase();
  const platform = (customPlatform ?? (typeof navigator !== 'undefined' ? navigator.platform : '')).toLowerCase();

  // iOS check (iPhone, iPod, or iPad including iPadOS desktop mode)
  const isIPadOS =
    platform.includes('mac') &&
    typeof navigator !== 'undefined' &&
    navigator.maxTouchPoints !== undefined &&
    navigator.maxTouchPoints > 1;

  if (/iphone|ipad|ipod/.test(ua) || isIPadOS) {
    return 'ios';
  }

  // Android check
  if (ua.includes('android')) {
    return 'android';
  }

  // Windows check
  if (ua.includes('windows') || platform.includes('win')) {
    return 'windows';
  }

  // Mac check (must be checked after iOS/iPadOS)
  if (ua.includes('macintosh') || ua.includes('mac os') || platform.includes('mac')) {
    return 'mac';
  }

  return 'other';
}

/**
 * Checks if a voice is a high-fidelity neural/natural voice.
 */
export function isNeuralVoice(voice: SpeechSynthesisVoice): boolean {
  const name = voice.name.toLowerCase();
  return NEURAL_VOICE_PATTERNS.some((pattern) => name.includes(pattern));
}

/**
 * Checks if a given SpeechSynthesisVoice is a Simplified/Standard Chinese voice.
 */
export function isChineseVoice(voice: SpeechSynthesisVoice): boolean {
  const lang = voice.lang.toLowerCase().replace(/_/g, '-');
  const name = voice.name.toLowerCase();

  return (
    lang.startsWith('zh') ||
    lang.startsWith('cmn') ||
    name.includes('chinese') ||
    name.includes('mandarin') ||
    name.includes('putonghua') ||
    voice.name.includes('中文') ||
    voice.name.includes('普通话') ||
    voice.name.includes('國語')
  );
}

/**
 * Chrome & Chromium asynchronous getVoices() race condition handler.
 * Resolves immediately if voices are already loaded, or listens to the
 * `voiceschanged` event with an 800ms watchdog timeout.
 */
export function ensureVoicesReady(timeoutMs = 800): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }

  const immediateVoices = window.speechSynthesis.getVoices();
  if (immediateVoices.length > 0) {
    return Promise.resolve(immediateVoices);
  }

  return new Promise<SpeechSynthesisVoice[]>((resolve) => {
    let isResolved = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (typeof window.speechSynthesis.removeEventListener === 'function') {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
      } else if (window.speechSynthesis.onvoiceschanged === onVoices) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };

    const onVoices = () => {
      if (isResolved) return;
      const list = window.speechSynthesis.getVoices();
      if (list.length > 0) {
        isResolved = true;
        cleanup();
        resolve(list);
      }
    };

    // Bind voiceschanged listener
    if (typeof window.speechSynthesis.addEventListener === 'function') {
      window.speechSynthesis.addEventListener('voiceschanged', onVoices);
    } else {
      window.speechSynthesis.onvoiceschanged = onVoices;
    }

    // Watchdog timeout: fall back after timeoutMs
    timer = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        cleanup();
        resolve(window.speechSynthesis.getVoices());
      }
    }, timeoutMs);
  });
}

/**
 * Classifies the health grade of speech synthesis based on available voices and network status.
 */
export function classifyVoiceHealth(
  voices: SpeechSynthesisVoice[],
  isOnline = true
): {
  grade: VoiceHealthGrade;
  hasChineseVoice: boolean;
  isNeural: boolean;
  activeVoiceName: string | null;
  totalChineseVoices: number;
} {
  const chineseVoices = voices.filter(isChineseVoice);
  const totalChineseVoices = chineseVoices.length;

  if (totalChineseVoices === 0) {
    return {
      grade: isOnline ? 'fallback' : 'unsupported',
      hasChineseVoice: false,
      isNeural: false,
      activeVoiceName: null,
      totalChineseVoices: 0,
    };
  }

  // Check if an optimal neural voice exists
  const optimalVoice = chineseVoices.find(isNeuralVoice);
  if (optimalVoice) {
    return {
      grade: 'optimal',
      hasChineseVoice: true,
      isNeural: true,
      activeVoiceName: optimalVoice.name,
      totalChineseVoices,
    };
  }

  // Standard Chinese voice exists
  return {
    grade: 'good',
    hasChineseVoice: true,
    isNeural: false,
    activeVoiceName: chineseVoices[0].name,
    totalChineseVoices,
  };
}

/**
 * Fully inspects the client's current voice health status.
 */
export async function inspectVoiceHealth(): Promise<VoiceHealthState> {
  const isOnline = typeof navigator !== 'undefined' ? (navigator.onLine ?? true) : true;
  const clientOS = detectClientOS();

  const voices = await ensureVoicesReady(800);
  const classification = classifyVoiceHealth(voices, isOnline);

  return {
    grade: classification.grade,
    clientOS,
    hasChineseVoice: classification.hasChineseVoice,
    isNeural: classification.isNeural,
    activeVoiceName: classification.activeVoiceName,
    totalChineseVoices: classification.totalChineseVoices,
    isOnline,
    samplePhrase: DEFAULT_SAMPLE_PHRASE,
  };
}

let lastSamplePlayTime = 0;
const SAMPLE_DEBOUNCE_MS = 250;

/**
 * Resets internal state for unit testing.
 */
export function _resetVoiceHealthEngineForTesting(): void {
  lastSamplePlayTime = 0;
}

/**
 * Plays a sample Chinese greeting phrase with debounce and tone contour fallback.
 * Guaranteed non-throwing promise for UI safety.
 */
export async function playSamplePhrase(phrase = DEFAULT_SAMPLE_PHRASE): Promise<boolean> {
  const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (now - lastSamplePlayTime < SAMPLE_DEBOUNCE_MS) {
    return false;
  }
  lastSamplePlayTime = now;

  try {
    let hadError = false;
    await speak(phrase, {
      rate: 0.85,
      pitch: 1.0,
      onError: () => {
        hadError = true;
        playToneContour(1, 0.25);
      },
    });
    if (hadError) {
      return false;
    }
    return true;
  } catch {
    playToneContour(1, 0.25);
    return false;
  }
}

/**
 * Returns localized device-specific voice installation instructions for users.
 */
export function getOsVoiceGuide(os?: ClientOS): OsVoiceGuide {
  const targetOS = os ?? detectClientOS();

  switch (targetOS) {
    case 'windows':
      return {
        os: 'windows',
        osName: 'Windows 10 / 11',
        icon: '💻',
        steps: [
          {
            stepNumber: 1,
            title: 'เปิดการตั้งค่าเสียง',
            description: 'กด Start ➔ เข้า "Settings" ➔ เลือก "Time & Language" ➔ "Speech"',
          },
          {
            stepNumber: 2,
            title: 'เพิ่มภาษาเสียงอ่านจีน',
            description: 'ในหัวข้อ "Manage voices" กดปุ่ม "Add voices"',
          },
          {
            stepNumber: 3,
            title: 'เลือก Chinese (Simplified)',
            description: 'เลือก "Chinese (Simplified, China)" แล้วกด Add ระบบจะดาวน์โหลดเสียง Xiaoxiao/Yunxi อัตโนมัติใน 1 นาที',
          },
        ],
        tip: '💡 หากใช้เบราว์เซอร์ Microsoft Edge ระบบจะมีเสียง Neural เสียงเพราะระดับสตูดิโอติดมาในตัวทันที!',
      };

    case 'ios':
      return {
        os: 'ios',
        osName: 'iPhone / iPad (iOS)',
        icon: '🍏',
        steps: [
          {
            stepNumber: 1,
            title: 'เปิดการช่วยการเข้าถึง',
            description: 'ไปที่ "การตั้งค่า" (Settings) ➔ "การช่วยการเข้าถึง" (Accessibility)',
          },
          {
            stepNumber: 2,
            title: 'เข้าสู่เมนูเสียงอ่าน',
            description: 'เลือก "เนื้อหาการอ่านออกเสียง" (Spoken Content) ➔ "เสียง" (Voices)',
          },
          {
            stepNumber: 3,
            title: 'ดาวน์โหลดเสียงจีน',
            description: 'เลือก "ภาษาจีน" ➔ "จีนแผ่นดินใหญ่" (Chinese - Mainland) ➔ แตะเลือกเสียง "Tingting" หรือ "Siri"',
          },
        ],
        tip: '⚠️ สำคัญสำหรับผู้ใช้ iPhone: หากไม่ได้ยินเสียง กรุณาตรวจสอบสวิตช์ Mute ด้านข้างตัวเครื่องว่าเปิดเสียงอยู่หรือไม่',
      };

    case 'android':
      return {
        os: 'android',
        osName: 'Android Smartphone / Tablet',
        icon: '🤖',
        steps: [
          {
            stepNumber: 1,
            title: 'เปิดการตั้งค่าแปลงข้อจำเป็นคำพูด',
            description: 'ไปที่ "การตั้งค่า" (Settings) ➔ "ระบบ" หรือ "การช่วยการเข้าถึง" ➔ "การอ่านออกเสียงข้อความ" (Text-to-speech output)',
          },
          {
            stepNumber: 2,
            title: 'เลือกเครื่องมือเสียง Google',
            description: 'ตรวจดูว่าโปรแกรมที่ต้องการคือ "Speech Recognition and Synthesis from Google"',
          },
          {
            stepNumber: 3,
            title: 'ติดตั้งข้อมูลเสียงจีน',
            description: 'แตะไอคอนฟันเฟือง ➔ "ติดตั้งข้อมูลเสียง" (Install voice data) ➔ เลือกดาวน์โหลด "Chinese (China)"',
          },
        ],
        tip: '💡 แนะนำให้เปิดด้วย Google Chrome สำหรับ Android เพื่อประสิทธิภาพการอ่านที่ลื่นไหลที่สุด',
      };

    case 'mac':
      return {
        os: 'mac',
        osName: 'macOS (MacBook / iMac)',
        icon: '🍎',
        steps: [
          {
            stepNumber: 1,
            title: 'เปิด System Settings',
            description: 'คลิกไอคอน Apple  ➔ "System Settings" ➔ "Accessibility"',
          },
          {
            stepNumber: 2,
            title: 'เข้าสู่ Spoken Content',
            description: 'เลือกหัวข้อ "Spoken Content" ➔ ในช่อง "System Voice" คลิกเมนูเพื่อเลือก Manage Voices',
          },
          {
            stepNumber: 3,
            title: 'เพิ่มเสียงจีน Tingting หรือ Siri',
            description: 'ค้นหา "Chinese (China)" แล้วติ๊กดาวน์โหลดเสียงพรีเมียม Tingting หรือ Siri',
          },
        ],
        tip: '💡 ระบบเสียงใน Safari บน macOS มีการออกเสียงวรรณยุกต์ที่แม่นยำสูงมาก',
      };

    default:
      return {
        os: 'other',
        osName: 'เบราว์เซอร์ของคุณ',
        icon: '🌐',
        steps: [
          {
            stepNumber: 1,
            title: 'ตรวจการตั้งค่าเบราว์เซอร์',
            description: 'ตรวจสอบว่าเบราว์เซอร์อนุญาตให้เล่นเสียง (Sound/Audio autoplay permissions)',
          },
          {
            stepNumber: 2,
            title: 'เชื่อมต่ออินเทอร์เน็ต',
            description: 'หากเครื่องไม่มีเสียงในตัว ระบบของ Hanzero จะสตรีมเสียงความคมชัดสูงจากระบบเครือข่ายให้อัตโนมัติ',
          },
        ],
        tip: '🛡️ หากไม่มีเสียงใดๆ ระบบจะสลับไปใช้คลื่นเสียงวรรณยุกต์ Web Audio Tone Contour ให้โดยไม่มีสะดุด',
      };
  }
}

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getAudioContext,
  unlockAudioContext,
  playClick,
  playCorrect,
  playIncorrect,
  playFanfare,
  playToneContour,
  speak,
  stopSpeaking,
  findChineseVoice,
  getAudioEngineStatus,
  isInAppBrowser,
  _resetAudioEngineForTesting,
} from './audioEngine';

// Mock Web Audio API primitives
class MockAudioNode {
  connect = vi.fn();
  disconnect = vi.fn();
}

class MockAudioParam {
  value = 0;
  setValueAtTime = vi.fn();
  exponentialRampToValueAtTime = vi.fn();
  linearRampToValueAtTime = vi.fn();
}

class MockGainNode extends MockAudioNode {
  gain = new MockAudioParam();
}

class MockOscillatorNode extends MockAudioNode {
  type = 'sine';
  frequency = new MockAudioParam();
  start = vi.fn();
  stop = vi.fn();
}

class MockAudioBufferSourceNode extends MockAudioNode {
  buffer: unknown = null;
  connect = vi.fn();
  start = vi.fn();
  stop = vi.fn();
}

class MockAudioContext {
  state: AudioContextState = 'running';
  currentTime = 0;
  destination = new MockAudioNode();
  resume = vi.fn().mockResolvedValue(undefined);
  close = vi.fn().mockResolvedValue(undefined);
  createOscillator = vi.fn(() => new MockOscillatorNode());
  createGain = vi.fn(() => new MockGainNode());
  createBuffer = vi.fn(() => ({}));
  createBufferSource = vi.fn(() => new MockAudioBufferSourceNode());
}

describe('audioEngine', () => {
  let mockWindow: Record<string, unknown>;
  let mockDocument: Record<string, unknown>;
  let mockSpeechSynthesis: Record<string, unknown>;
  let mockSpeak: ReturnType<typeof vi.fn>;
  let mockCancel: ReturnType<typeof vi.fn>;
  let mockGetVoices: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();

    mockSpeak = vi.fn();
    mockCancel = vi.fn();
    mockGetVoices = vi.fn(() => [
      { name: 'Tingting', lang: 'zh-CN', default: true },
      { name: 'Alex', lang: 'en-US', default: false },
    ]);

    mockSpeechSynthesis = {
      speak: mockSpeak,
      cancel: mockCancel,
      getVoices: mockGetVoices,
    };

    class MockSpeechSynthesisUtterance {
      text: string;
      lang = 'en-US';
      rate = 1;
      pitch = 1;
      voice = null;
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      onerror: ((e: { error: string }) => void) | null = null;

      constructor(text: string) {
        this.text = text;
      }
    }

    mockWindow = {
      AudioContext: MockAudioContext,
      speechSynthesis: mockSpeechSynthesis,
      SpeechSynthesisUtterance: MockSpeechSynthesisUtterance,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockDocument = {
      addEventListener: vi.fn(),
      visibilityState: 'visible',
    };

    vi.stubGlobal('window', mockWindow);
    vi.stubGlobal('document', mockDocument);
    vi.stubGlobal('SpeechSynthesisUtterance', MockSpeechSynthesisUtterance);
    vi.stubGlobal('speechSynthesis', mockSpeechSynthesis);
    vi.stubGlobal('AudioContext', MockAudioContext);

    _resetAudioEngineForTesting();
  });

  afterEach(() => {
    _resetAudioEngineForTesting();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('In-App Browser Detection', () => {
    it('detects standard mobile browser as not in-app', () => {
      vi.stubGlobal('navigator', {
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
      });
      expect(isInAppBrowser()).toBe(false);
    });

    it('detects LINE in-app webview', () => {
      vi.stubGlobal('navigator', {
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) Line/13.8.0 Safari/604.1',
      });
      expect(isInAppBrowser()).toBe(true);
    });

    it('detects Facebook/Instagram webview', () => {
      vi.stubGlobal('navigator', {
        userAgent:
          'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 FBAV/420.0.0.0 Instagram 300.0',
      });
      expect(isInAppBrowser()).toBe(true);
    });

    it('detects WeChat (MicroMessenger) webview', () => {
      vi.stubGlobal('navigator', {
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) Mobile/15E148 MicroMessenger/8.0.30',
      });
      expect(isInAppBrowser()).toBe(true);
    });
  });

  describe('AudioContext Singleton & Lifecycle', () => {
    it('returns a singleton AudioContext instance across multiple calls', () => {
      const ctx1 = getAudioContext();
      const ctx2 = getAudioContext();
      expect(ctx1).not.toBeNull();
      expect(ctx1).toBe(ctx2);
    });

    it('memoizes in-flight unlockAudioContext calls and fast-paths once running', async () => {
      const ctx = getAudioContext() as unknown as MockAudioContext;
      ctx.state = 'suspended';

      // First unlock while suspended
      const p1 = unlockAudioContext();
      const p2 = unlockAudioContext();
      expect(p1).toBe(p2); // Same in-flight promise memoized

      const result = await p1;
      expect(result).toBe(true);

      // Subsequent call fast-paths when running
      ctx.state = 'running';
      const p3 = unlockAudioContext();
      expect(await p3).toBe(true);
    });

    it('reclaims and creates a new AudioContext if the previous one was closed', () => {
      const ctx1 = getAudioContext() as unknown as MockAudioContext;
      expect(ctx1).not.toBeNull();
      ctx1.state = 'closed';

      const ctx2 = getAudioContext() as unknown as MockAudioContext;
      expect(ctx2).not.toBeNull();
      expect(ctx2).not.toBe(ctx1);
    });

    it('reports engine status accurately', () => {
      const status = getAudioEngineStatus();
      expect(status.isAudioContextSupported).toBe(true);
      expect(status.audioContextState).toBe('uninitialized');
      getAudioContext();
      const statusAfterInit = getAudioEngineStatus();
      expect(statusAfterInit.audioContextState).toBe('running');
    });
  });

  describe('Web Audio SFX Oscillators', () => {
    it('plays click sound effect with oscillator ramp', () => {
      playClick();
      const ctx = getAudioContext() as unknown as MockAudioContext;
      expect(ctx.createOscillator).toHaveBeenCalled();
      expect(ctx.createGain).toHaveBeenCalled();
    });

    it('plays correct answer chime (3 ascending notes)', () => {
      playCorrect();
      const ctx = getAudioContext() as unknown as MockAudioContext;
      expect(ctx.createOscillator).toHaveBeenCalledTimes(3);
    });

    it('plays incorrect answer dyad (2 descending notes)', () => {
      playIncorrect();
      const ctx = getAudioContext() as unknown as MockAudioContext;
      expect(ctx.createOscillator).toHaveBeenCalledTimes(2);
    });

    it('plays celebration fanfare (4 notes)', () => {
      playFanfare();
      const ctx = getAudioContext() as unknown as MockAudioContext;
      expect(ctx.createOscillator).toHaveBeenCalledTimes(4);
    });
  });

  describe('Tone Contour Pitch Synthesis', () => {
    it('synthesizes Tone 1 (High-Level 55 at 440Hz)', () => {
      playToneContour(1);
      const ctx = getAudioContext() as unknown as MockAudioContext;
      expect(ctx.createOscillator).toHaveBeenCalledTimes(1);
    });

    it('synthesizes Tone 2 (Rising 35 from 330Hz to 440Hz)', () => {
      playToneContour(2);
      const ctx = getAudioContext() as unknown as MockAudioContext;
      expect(ctx.createOscillator).toHaveBeenCalledTimes(1);
    });

    it('synthesizes Tone 3 (Dipping 214 with 2 inflection ramps)', () => {
      playToneContour(3);
      const ctx = getAudioContext() as unknown as MockAudioContext;
      expect(ctx.createOscillator).toHaveBeenCalledTimes(1);
    });

    it('synthesizes Tone 4 (Falling 51 from 440Hz to 220Hz)', () => {
      playToneContour(4);
      const ctx = getAudioContext() as unknown as MockAudioContext;
      expect(ctx.createOscillator).toHaveBeenCalledTimes(1);
    });
  });

  describe('Speech Synthesis (TTS) & Watchdog', () => {
    it('finds Chinese voice correctly from available voices', () => {
      const voice = findChineseVoice();
      expect(voice).not.toBeNull();
      expect(voice?.lang).toBe('zh-CN');
    });

    it('cancels existing speech before queueing new utterance (anti-deadlock)', async () => {
      const onEndSpy = vi.fn();
      const speakPromise = speak('你好', { onEnd: onEndSpy });

      expect(mockCancel).toHaveBeenCalled();
      expect(mockSpeak).toHaveBeenCalled();

      // Trigger utterance onend to complete
      const utterance = mockSpeak.mock.calls[0][0];
      utterance.onend();

      await speakPromise;
      expect(onEndSpy).toHaveBeenCalled();
    });

    it('activates 3-second watchdog timer if speech hangs, falling back safely without freezing UI', async () => {
      const onEndSpy = vi.fn();
      const onErrorSpy = vi.fn();

      const speakPromise = speak('谢谢', { onEnd: onEndSpy, onError: onErrorSpy });

      // Fast-forward time past 3000ms without firing onend
      vi.advanceTimersByTime(3100);

      await speakPromise;
      expect(onErrorSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('3s watchdog triggered'),
        })
      );
      expect(onEndSpy).toHaveBeenCalled();
      expect(mockCancel).toHaveBeenCalled();
    });

    it('handles stopSpeaking safely and unblocks in-flight session', async () => {
      const onEndSpy = vi.fn();
      const speakPromise = speak('你好', { onEnd: onEndSpy });
      stopSpeaking();
      expect(mockCancel).toHaveBeenCalled();
      await speakPromise; // Unblocks
    });

    it('guarantees promise resolution on preempted speech calls and preserves active session watchdog', async () => {
      const onEndA = vi.fn();
      const onEndB = vi.fn();
      const onErrorB = vi.fn();

      // Start call A
      const promiseA = speak('A', { onEnd: onEndA });
      expect(mockSpeak).toHaveBeenCalledTimes(1);

      // Start call B immediately, preempting A
      const promiseB = speak('B', { onEnd: onEndB, onError: onErrorB });
      expect(mockSpeak).toHaveBeenCalledTimes(2);

      // Promise A must resolve cleanly rather than hanging
      await promiseA;

      // Advance time by 3100ms - Call B's watchdog must STILL be active and trip safely
      vi.advanceTimersByTime(3100);

      await promiseB;
      expect(onErrorB).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('3s watchdog triggered'),
        })
      );
      expect(onEndB).toHaveBeenCalled();
    });
  });
});

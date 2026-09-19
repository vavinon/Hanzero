import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  detectClientOS,
  isNeuralVoice,
  isChineseVoice,
  classifyVoiceHealth,
  ensureVoicesReady,
  getOsVoiceGuide,
  playSamplePhrase,
  inspectVoiceHealth,
  _resetVoiceHealthEngineForTesting,
  DEFAULT_SAMPLE_PHRASE,
} from './voiceHealthEngine';
import * as audioEngine from './audioEngine';

describe('Voice Health Engine (voiceHealthEngine.ts)', () => {
  // Helper to create mock SpeechSynthesisVoice objects
  function createMockVoice(name: string, lang: string): SpeechSynthesisVoice {
    return {
      name,
      lang,
      default: false,
      localService: true,
      voiceURI: name,
    };
  }

  let mockSpeechSynthesis: Record<string, unknown>;
  let mockWindow: Record<string, unknown>;

  beforeEach(() => {
    _resetVoiceHealthEngineForTesting();

    mockSpeechSynthesis = {
      getVoices: vi.fn().mockReturnValue([]),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockWindow = {
      speechSynthesis: mockSpeechSynthesis,
    };

    vi.stubGlobal('window', mockWindow);
    vi.stubGlobal('speechSynthesis', mockSpeechSynthesis);
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      platform: 'Win32',
      onLine: true,
    });
  });

  afterEach(() => {
    _resetVoiceHealthEngineForTesting();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('1. OS Detection (detectClientOS)', () => {
    it('detects Windows from userAgent and platform', () => {
      const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
      expect(detectClientOS(ua, 'Win32')).toBe('windows');
    });

    it('detects iPhone from userAgent', () => {
      const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15';
      expect(detectClientOS(ua, 'iPhone')).toBe('ios');
    });

    it('detects iPad from userAgent', () => {
      const ua = 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15';
      expect(detectClientOS(ua, 'iPad')).toBe('ios');
    });

    it('detects Android from userAgent', () => {
      const ua = 'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36';
      expect(detectClientOS(ua, 'Linux armv8l')).toBe('android');
    });

    it('detects macOS from userAgent and platform', () => {
      const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';
      expect(detectClientOS(ua, 'MacIntel')).toBe('mac');
    });

    it('falls back to other for unknown OS', () => {
      const ua = 'Mozilla/5.0 (X11; FreeBSD amd64)';
      expect(detectClientOS(ua, 'FreeBSD')).toBe('other');
    });
  });

  describe('2. Voice Filtering & Neural Classification', () => {
    const xiaoxiao = createMockVoice('Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)', 'zh-CN');
    const tingting = createMockVoice('Tingting (Enhanced)', 'zh-CN');
    const huihui = createMockVoice('Microsoft Huihui - Chinese (Simplified)', 'zh-CN');
    const siri = createMockVoice('Siri (Chinese)', 'zh-CN');
    const zira = createMockVoice('Microsoft Zira Desktop - English (United States)', 'en-US');
    const googleZh = createMockVoice('Google 普通话（中国大陆）', 'cmn-Hans-CN');

    it('correctly identifies Chinese voices vs non-Chinese voices', () => {
      expect(isChineseVoice(xiaoxiao)).toBe(true);
      expect(isChineseVoice(tingting)).toBe(true);
      expect(isChineseVoice(huihui)).toBe(true);
      expect(isChineseVoice(googleZh)).toBe(true);
      expect(isChineseVoice(zira)).toBe(false);
    });

    it('correctly distinguishes studio Neural voices from standard voices', () => {
      expect(isNeuralVoice(xiaoxiao)).toBe(true);
      expect(isNeuralVoice(tingting)).toBe(true);
      expect(isNeuralVoice(siri)).toBe(true);
      expect(isNeuralVoice(huihui)).toBe(false);
    });
  });

  describe('3. Voice Health Grade Classification (classifyVoiceHealth)', () => {
    const xiaoxiao = createMockVoice('Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)', 'zh-CN');
    const huihui = createMockVoice('Microsoft Huihui', 'zh-CN');
    const englishVoice = createMockVoice('Microsoft Zira', 'en-US');

    it('classifies as optimal when neural Chinese voice is present', () => {
      const result = classifyVoiceHealth([englishVoice, xiaoxiao], true);
      expect(result.grade).toBe('optimal');
      expect(result.hasChineseVoice).toBe(true);
      expect(result.isNeural).toBe(true);
      expect(result.activeVoiceName).toBe(xiaoxiao.name);
      expect(result.totalChineseVoices).toBe(1);
    });

    it('classifies as good when standard Chinese voice is present without neural', () => {
      const result = classifyVoiceHealth([englishVoice, huihui], true);
      expect(result.grade).toBe('good');
      expect(result.hasChineseVoice).toBe(true);
      expect(result.isNeural).toBe(false);
      expect(result.activeVoiceName).toBe(huihui.name);
      expect(result.totalChineseVoices).toBe(1);
    });

    it('classifies as fallback when no Chinese voices exist but user is online', () => {
      const result = classifyVoiceHealth([englishVoice], true);
      expect(result.grade).toBe('fallback');
      expect(result.hasChineseVoice).toBe(false);
      expect(result.isNeural).toBe(false);
      expect(result.activeVoiceName).toBeNull();
      expect(result.totalChineseVoices).toBe(0);
    });

    it('classifies as unsupported when no Chinese voices exist and user is offline', () => {
      const result = classifyVoiceHealth([englishVoice], false);
      expect(result.grade).toBe('unsupported');
      expect(result.hasChineseVoice).toBe(false);
      expect(result.isNeural).toBe(false);
      expect(result.totalChineseVoices).toBe(0);
    });
  });

  describe('4. Asynchronous Voice Loading Guard (ensureVoicesReady)', () => {
    it('returns immediately if getVoices() already has entries', async () => {
      const mockVoice = createMockVoice('Xiaoxiao', 'zh-CN');
      (mockSpeechSynthesis.getVoices as ReturnType<typeof vi.fn>).mockReturnValue([mockVoice]);

      const promise = ensureVoicesReady(800);
      const voices = await promise;
      expect(voices).toEqual([mockVoice]);
      expect(mockSpeechSynthesis.getVoices).toHaveBeenCalledTimes(1);
    });

    it('waits for voiceschanged event if initial list is empty', async () => {
      let callbackHandler: (() => void) | undefined = undefined;
      (mockSpeechSynthesis.getVoices as ReturnType<typeof vi.fn>).mockReturnValue([]);
      (mockSpeechSynthesis.addEventListener as ReturnType<typeof vi.fn>).mockImplementation((event, cb) => {
        if (event === 'voiceschanged') {
          callbackHandler = cb as () => void;
        }
      });

      const promise = ensureVoicesReady(800);

      // Simulate asynchronous voices load after 50ms
      const mockVoice = createMockVoice('Tingting', 'zh-CN');
      (mockSpeechSynthesis.getVoices as ReturnType<typeof vi.fn>).mockReturnValue([mockVoice]);

      if (callbackHandler) {
        (callbackHandler as () => void)();
      }

      const voices = await promise;
      expect(voices).toEqual([mockVoice]);
      expect(mockSpeechSynthesis.removeEventListener).toHaveBeenCalledWith('voiceschanged', expect.any(Function));
    });

    it('safely resolves with fallback after timeout if voiceschanged never fires', async () => {
      vi.useFakeTimers();
      (mockSpeechSynthesis.getVoices as ReturnType<typeof vi.fn>).mockReturnValue([]);

      const promise = ensureVoicesReady(500);

      // Fast-forward past timeout
      vi.advanceTimersByTime(550);

      const voices = await promise;
      expect(voices).toEqual([]);
      expect(mockSpeechSynthesis.removeEventListener).toHaveBeenCalled();
      vi.useRealTimers();
    });
  });

  describe('5. Full Inspection (inspectVoiceHealth)', () => {
    it('inspects state and classifies current environment', async () => {
      const xiaoxiao = createMockVoice('Xiaoxiao Neural', 'zh-CN');
      (mockSpeechSynthesis.getVoices as ReturnType<typeof vi.fn>).mockReturnValue([xiaoxiao]);

      const state = await inspectVoiceHealth();
      expect(state.grade).toBe('optimal');
      expect(state.clientOS).toBe('windows');
      expect(state.hasChineseVoice).toBe(true);
      expect(state.isNeural).toBe(true);
      expect(state.samplePhrase).toBe(DEFAULT_SAMPLE_PHRASE);
    });
  });

  describe('6. Sample Phrase Playback (playSamplePhrase)', () => {
    it('calls speak with default sample phrase and 0.85 rate', async () => {
      const speakSpy = vi.spyOn(audioEngine, 'speak').mockResolvedValue(undefined);

      const success = await playSamplePhrase();
      expect(success).toBe(true);
      expect(speakSpy).toHaveBeenCalledWith(
        DEFAULT_SAMPLE_PHRASE,
        expect.objectContaining({ rate: 0.85, pitch: 1.0 })
      );
    });

    it('debounces rapid spam calls within 250ms (Red Team Audio Flood Protection)', async () => {
      vi.spyOn(audioEngine, 'speak').mockResolvedValue(undefined);

      const firstCall = await playSamplePhrase();
      const secondCall = await playSamplePhrase();

      expect(firstCall).toBe(true);
      expect(secondCall).toBe(false); // Debounced!
    });

    it('catches audio error and falls back to tone contour without throwing', async () => {
      vi.spyOn(audioEngine, 'speak').mockImplementation(async (_, options) => {
        options?.onError?.(new Error('TTS failure'));
      });
      const contourSpy = vi.spyOn(audioEngine, 'playToneContour').mockImplementation(() => {});

      const success = await playSamplePhrase('你好');
      expect(success).toBe(false);
      expect(contourSpy).toHaveBeenCalledWith(1, 0.25);
    });
  });

  describe('7. OS Voice Installation Guide (getOsVoiceGuide)', () => {
    it('returns Windows guide with 3 clear steps and edge tip', () => {
      const guide = getOsVoiceGuide('windows');
      expect(guide.os).toBe('windows');
      expect(guide.steps).toHaveLength(3);
      expect(guide.steps[0].description).toContain('Settings');
      expect(guide.tip).toContain('Microsoft Edge');
    });

    it('returns iOS guide with Apple accessibility steps and mute switch warning', () => {
      const guide = getOsVoiceGuide('ios');
      expect(guide.os).toBe('ios');
      expect(guide.steps).toHaveLength(3);
      expect(guide.tip).toContain('Mute');
    });

    it('returns Android guide with Google TTS steps', () => {
      const guide = getOsVoiceGuide('android');
      expect(guide.os).toBe('android');
      expect(guide.steps).toHaveLength(3);
      expect(guide.steps[1].description).toContain('Google');
    });

    it('returns macOS guide with spoken content steps', () => {
      const guide = getOsVoiceGuide('mac');
      expect(guide.os).toBe('mac');
      expect(guide.steps).toHaveLength(3);
      expect(guide.steps[2].description).toContain('Tingting');
    });

    it('returns other/generic fallback guide', () => {
      const guide = getOsVoiceGuide('other');
      expect(guide.os).toBe('other');
      expect(guide.steps).toHaveLength(2);
    });
  });
});

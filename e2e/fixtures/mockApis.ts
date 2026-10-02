import { Page } from '@playwright/test';

export interface MockAudioOptions {
  chineseVoiceAvailable?: boolean;
}

/**
 * Injects deterministic Web Audio, SpeechSynthesis, and HTMLAudioElement mocks,
 * and intercepts third-party network audio requests (Youdao & Hanzi-Writer CDN).
 */
export async function injectWebAudioAndSpeechMocks(page: Page, options: MockAudioOptions = {}) {
  const chineseVoiceAvailable = options.chineseVoiceAvailable ?? true;

  // 1. Intercept Youdao dictionary audio requests (prevent 5s timeout / 403 on CI)
  await page.route('**/dictvoice*', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'audio/wav',
      body: Buffer.from('UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA', 'base64'),
    });
  });

  // 2. Intercept Hanzi-writer CDN requests for fast deterministic offline test
  await page.route('**/hanzi-writer-data@2.0/**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        strokes: [
          'M 0 0 L 100 100',
          'M 100 0 L 0 100',
        ],
        medians: [
          [[0, 0], [100, 100]],
          [[100, 0], [0, 100]],
        ],
      }),
    });
  });

  // 3. Inject in-browser mocks before scripts load
  await page.addInitScript(({ hasVoice }) => {
    // 3.1 Mock HTMLAudioElement.prototype.play to prevent watchdog timer hangs
    HTMLAudioElement.prototype.play = function () {
      const audio = this;
      setTimeout(() => {
        audio.dispatchEvent(new Event('play'));
        setTimeout(() => {
          audio.dispatchEvent(new Event('ended'));
        }, 20);
      }, 5);
      return Promise.resolve();
    };

    // 3.2 Mock window.Audio constructor
    const originalAudio = window.Audio;
    window.Audio = class extends originalAudio {
      constructor(src?: string) {
        super(src);
      }
      play() {
        setTimeout(() => {
          this.dispatchEvent(new Event('play'));
          setTimeout(() => {
            this.dispatchEvent(new Event('ended'));
          }, 20);
        }, 5);
        return Promise.resolve();
      }
    };

    // 3.3 Mock AudioContext & WebkitAudioContext
    class MockAudioNode {
      connect() { return this; }
      disconnect() {}
    }
    class MockAudioContext {
      state = 'running';
      currentTime = 0;
      destination = new MockAudioNode();
      createOscillator() {
        return {
          connect: () => {},
          start: () => {},
          stop: () => {},
          frequency: {
            setValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {},
          },
        };
      }
      createGain() {
        return {
          connect: () => {},
          gain: {
            setValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {},
            linearRampToValueAtTime: () => {},
          },
        };
      }
      resume() { return Promise.resolve(); }
      suspend() { return Promise.resolve(); }
      close() { return Promise.resolve(); }
    }
    // @ts-expect-error Mock assignment
    window.AudioContext = MockAudioContext;
    // @ts-expect-error Mock assignment
    window.webkitAudioContext = MockAudioContext;

    // 3.4 Mock SpeechSynthesis
    const mockVoices = hasVoice
      ? [{ name: 'Tingting (Neural)', lang: 'zh-CN', default: true, localService: true, voiceURI: 'Tingting' }]
      : [];

    class MockSpeechSynthesisUtterance {
      text: string;
      lang = 'zh-CN';
      rate = 1;
      pitch = 1;
      volume = 1;
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      constructor(text = '') {
        this.text = text;
      }
    }

    const mockSpeechSynthesis = {
      paused: false,
      pending: false,
      speaking: false,
      getVoices: () => mockVoices,
      speak: (utterance: MockSpeechSynthesisUtterance) => {
        mockSpeechSynthesis.speaking = true;
        setTimeout(() => {
          if (utterance.onstart) utterance.onstart();
          setTimeout(() => {
            mockSpeechSynthesis.speaking = false;
            if (utterance.onend) utterance.onend();
          }, 25);
        }, 5);
      },
      cancel: () => {
        mockSpeechSynthesis.speaking = false;
      },
      pause: () => {
        mockSpeechSynthesis.paused = true;
      },
      resume: () => {
        mockSpeechSynthesis.paused = false;
      },
      addEventListener: (type: string, listener: () => void) => {
        if (type === 'voiceschanged') setTimeout(listener, 5);
      },
      removeEventListener: () => {},
    };

    // @ts-expect-error Mock assignment
    window.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
    // @ts-expect-error Mock assignment
    window.speechSynthesis = mockSpeechSynthesis;
  }, { hasVoice: chineseVoiceAvailable });
}

/**
 * Clears LocalStorage, SessionStorage, and all IndexedDB databases
 */
export async function clearAllStorage(page: Page): Promise<void> {
  await page.evaluate(async () => {
    localStorage.clear();
    sessionStorage.clear();
    if (window.indexedDB && window.indexedDB.databases) {
      try {
        const dbs = await window.indexedDB.databases();
        for (const db of dbs) {
          if (db.name) window.indexedDB.deleteDatabase(db.name);
        }
      } catch {
        // Ignore
      }
    }
  });
}

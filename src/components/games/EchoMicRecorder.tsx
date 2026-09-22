/**
 * src/components/games/EchoMicRecorder.tsx
 * ------------------------------------------------
 * Shadowing Echo Mic: Microphone recorder and Dual Echo playback component.
 *
 * Adheres strictly to AGENTS.md:
 * - Browser MediaRecorder API client-side recording (no server dependency).
 * - Dual Echo Sequence: Plays Native model -> brief pause -> learner's voice.
 * - Resilient permission handling with friendly fallbacks (no unhandled exceptions).
 * - Comprehensive cleanup: track.stop(), URL.revokeObjectURL(), and timeout clearance.
 * - Mobile-first touch targets (>= 44px).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Square, Volume2, AlertCircle, Check, Headphones } from 'lucide-react';
import { speak, stopSpeaking, playClick } from '../../engines/audio/audioEngine';

export type RecorderState =
  | 'idle'
  | 'requesting'
  | 'recording'
  | 'recorded'
  | 'playing_native'
  | 'playing_echo'
  | 'permission_denied'
  | 'unsupported';

export interface EchoMicRecorderProps {
  text: string;
  pinyin: string;
  meaningTh: string;
  maxRecordDurationMs?: number; // default 2500ms
  onComplete?: () => void;
  className?: string;
}

export const EchoMicRecorder: React.FC<EchoMicRecorderProps> = ({
  text,
  pinyin,
  meaningTh,
  maxRecordDurationMs = 2500,
  onComplete,
  className = '',
}) => {
  const [state, setState] = useState<RecorderState>('idle');
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [hasPracticed, setHasPracticed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const currentAudioElementRef = useRef<HTMLAudioElement | null>(null);
  const recordedAudioUrlRef = useRef<string | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up all resources safely
  const cleanupAllResources = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (currentAudioElementRef.current) {
      try {
        currentAudioElementRef.current.pause();
        currentAudioElementRef.current.src = '';
      } catch {
        // Safe ignore
      }
      currentAudioElementRef.current = null;
    }
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => track.stop());
      } catch {
        // Safe ignore
      }
      streamRef.current = null;
    }
    if (recordedAudioUrlRef.current) {
      try {
        if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
          URL.revokeObjectURL(recordedAudioUrlRef.current);
        }
      } catch {
        // Safe ignore
      }
      recordedAudioUrlRef.current = null;
    }
    stopSpeaking();
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      cleanupAllResources();
    };
  }, [cleanupAllResources]);

  // Play Native Reference Sound
  const playNativeSound = useCallback(() => {
    playClick();
    speak(text, { rate: 0.85 });
  }, [text]);

  // Start Recording
  const startRecording = async () => {
    playClick();
    stopSpeaking();

    // Check MediaDevices and MediaRecorder support
    if (
      typeof window === 'undefined' ||
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function' ||
      typeof window.MediaRecorder === 'undefined'
    ) {
      setState('unsupported');
      setErrorMessage('เบราว์เซอร์นี้ยังไม่รองรับการอัดเสียงผ่านไมโครโฟน');
      return;
    }

    try {
      setState('requesting');
      setErrorMessage(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Hardware Privacy Guard: If component unmounted while prompt was open, halt and stop immediately
      if (!isMountedRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;

      // Revoke prior URL if re-recording
      if (recordedAudioUrlRef.current) {
        if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
          URL.revokeObjectURL(recordedAudioUrlRef.current);
        }
        recordedAudioUrlRef.current = null;
        setRecordedAudioUrl(null);
      }

      audioChunksRef.current = [];
      const options: MediaRecorderOptions = {};
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        if (MediaRecorder.isTypeSupported('audio/webm')) {
          options.mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          options.mimeType = 'audio/mp4';
        }
      }

      const recorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        recordedAudioUrlRef.current = audioUrl;
        setRecordedAudioUrl(audioUrl);
        setState('recorded');
        setRecordProgress(100);

        // Stop stream tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }

        // Auto trigger Dual Echo playback for immediate feedback
        triggerDualEcho(audioUrl);
      };

      recorder.start();
      setState('recording');
      setRecordProgress(0);

      const startTime = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, (elapsed / maxRecordDurationMs) * 100);
        setRecordProgress(pct);
      }, 50);

      // Auto-stop after maxRecordDurationMs
      timerRef.current = setTimeout(() => {
        stopRecording();
      }, maxRecordDurationMs);
    } catch (err) {
      setState('permission_denied');
      setErrorMessage('ยังไม่ได้รับอนุญาตให้ใช้ไมโครโฟน (โปรดเปิดการอนุญาตในบราวเซอร์)');
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // Safe ignore
      }
    }
  };

  // Hardware & Tab Visibility Guard: Stop recording immediately if tab is hidden or backgrounded
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
        }
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, []);

  // Dual Echo Sequence: 1. Native -> 2. User recording
  const triggerDualEcho = useCallback(
    (targetAudioUrl?: string) => {
      const urlToPlay = targetAudioUrl || recordedAudioUrl;
      if (!urlToPlay) return;

      playClick();
      stopSpeaking();

      if (currentAudioElementRef.current) {
        try {
          currentAudioElementRef.current.pause();
        } catch {
          // Safe ignore
        }
      }

      // Step 1: Play Native audio
      setState('playing_native');
      speak(text, {
        rate: 0.85,
        onEnd: () => {
          // Step 2: Gap of 350ms, then play learner's voice
          timerRef.current = setTimeout(() => {
            setState('playing_echo');
            try {
              const audio = new Audio(urlToPlay);
              currentAudioElementRef.current = audio;

              audio.onended = () => {
                setState('recorded');
                setHasPracticed(true);
              };

              audio.onerror = () => {
                setState('recorded');
              };

              audio.play().catch(() => {
                setState('recorded');
              });
            } catch {
              setState('recorded');
            }
          }, 350);
        },
        onError: () => {
          setState('recorded');
        },
      });
    },
    [recordedAudioUrl, text]
  );

  return (
    <div
      className={`shadowing-echo-mic w-full max-w-md mx-auto p-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col gap-4 ${className}`}
      data-testid="shadowing-echo-mic"
    >
      {/* Target Word Display */}
      <div className="flex flex-col items-center justify-center p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70 text-center relative">
        <div className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-wide mb-1 font-serif">
          {text}
        </div>
        <div className="text-lg font-semibold text-emerald-700 font-mono mb-1">{pinyin}</div>
        <div className="text-xs text-slate-500 font-medium">{meaningTh}</div>

        <button
          type="button"
          onClick={playNativeSound}
          disabled={state === 'recording'}
          className={`absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl shadow-sm border transition-transform active:scale-95 ${
            state === 'recording'
              ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
              : 'bg-white/90 hover:bg-white text-emerald-700 border-emerald-100'
          }`}
          title="ฟังเสียงเจ้าของภาษา"
          data-testid="btn-play-native-prompt"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Permission or Error Fallback Banner */}
      {(state === 'permission_denied' || state === 'unsupported') && (
        <div
          className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs flex items-start gap-2.5"
          data-testid="mic-error-banner"
        >
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold mb-0.5">ไม่สามารถเข้าถึงไมโครโฟนได้</div>
            <div className="text-slate-600 text-[11px] leading-relaxed">
              {errorMessage || 'กรุณาอนุญาตการใช้ไมโครโฟน หรือฝึกฟังเสียงเจ้าของภาษาแทนได้ครับ 🐰'}
            </div>
            <button
              type="button"
              onClick={playNativeSound}
              className="mt-2 text-xs font-semibold text-emerald-700 underline"
            >
              ฟังเสียงตัวอย่างเจ้าของภาษาอีกครั้ง
            </button>
          </div>
        </div>
      )}

      {/* Main Microphone Action Arena */}
      <div className="flex flex-col items-center justify-center gap-3 py-2">
        {state === 'recording' ? (
          <button
            type="button"
            onClick={stopRecording}
            className="w-20 h-20 rounded-full bg-red-500 text-white flex flex-col items-center justify-center shadow-lg shadow-red-500/25 animate-pulse transition-transform active:scale-95"
            data-testid="btn-stop-recording"
          >
            <Square className="w-7 h-7 fill-white mb-0.5" />
            <span className="text-[10px] font-bold uppercase">หยุด</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={startRecording}
            disabled={state === 'requesting' || state === 'playing_native' || state === 'playing_echo'}
            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-200 active:scale-95 shadow-md ${
              state === 'requesting' || state === 'playing_native' || state === 'playing_echo'
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
            }`}
            data-testid="btn-start-recording"
          >
            <Mic className="w-7 h-7 mb-0.5" />
            <span className="text-[10px] font-bold">
              {state === 'recorded' ? 'อัดซ้ำ' : 'กดอัดเสียง'}
            </span>
          </button>
        )}

        {/* Recording Progress Bar */}
        {state === 'recording' && (
          <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 mt-1">
            <div
              className="h-full bg-red-500 transition-all duration-75"
              style={{ width: `${recordProgress}%` }}
            />
          </div>
        )}

        {/* Status Text / Feedback */}
        <div className="text-center">
          {state === 'idle' && (
            <span className="text-xs text-slate-500 font-medium">
              แตะปุ่มไมค์ แล้วพูดตามเป็นเวลา 2 วินาที
            </span>
          )}
          {state === 'requesting' && (
            <span className="text-xs text-amber-600 font-medium animate-pulse">
              กำลังขออนุญาตเปิดไมโครโฟน...
            </span>
          )}
          {state === 'recording' && (
            <span className="text-xs text-red-600 font-bold flex items-center justify-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
              กำลังอัดเสียงของคุณ...
            </span>
          )}
          {state === 'playing_native' && (
            <span className="text-xs text-blue-700 font-bold flex items-center justify-center gap-1.5">
              <Volume2 className="w-4 h-4 text-blue-600 animate-bounce" />
              🔊 1. กำลังฟังเสียงต้นแบบ (Native Model)...
            </span>
          )}
          {state === 'playing_echo' && (
            <span className="text-xs text-purple-700 font-bold flex items-center justify-center gap-1.5">
              <Headphones className="w-4 h-4 text-purple-600 animate-bounce" />
              🎧 2. กำลังฟังเสียงสะท้อนของคุณ (Echo)...
            </span>
          )}
          {state === 'recorded' && (
            <span className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
              ✨ อัดเสียงสำเร็จ! เทียบเสียงของคุณกับต้นแบบได้เลย
            </span>
          )}
        </div>
      </div>

      {/* Dual Echo Playback Controls */}
      {recordedAudioUrl && (
        <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => triggerDualEcho()}
              disabled={state === 'playing_native' || state === 'playing_echo'}
              className="flex-1 min-h-[44px] py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold text-xs rounded-2xl border border-purple-200 flex items-center justify-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50"
              data-testid="btn-play-dual-echo"
            >
              <Headphones className="w-4 h-4 text-purple-600" />
              ฟังเสียงเทียบ (Native ➔ คุณ)
            </button>

            <button
              type="button"
              onClick={playNativeSound}
              className="min-h-[44px] min-w-[44px] py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-2xl border border-slate-200 flex items-center justify-center gap-1 transition-colors"
              title="ฟังเสียงเจ้าของภาษาเท่านั้น"
            >
              <Volume2 className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {hasPracticed && (
            <div className="flex items-center justify-between gap-2 mt-1">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onComplete?.();
                }}
                className="w-full min-h-[44px] py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                data-testid="btn-mic-complete"
              >
                <Check className="w-4 h-4" />
                ฟังดูใกล้เคียงแล้ว! ไปต่อ 🌟
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * src/components/voice/VoicePitchingRecorder.tsx
 * ------------------------------------------------------------------
 * Advanced Voice Pitching & Shadowing 2.0 Studio for Tier 3 & 4.
 *
 * Capabilities:
 * - 15–30 seconds long-form presentation & business speech practice.
 * - Real-time HTML5 Canvas 60fps audio waveform visualizer (AnalyserNode).
 * - 4 Curated Business Pitch & Crisis PR scenarios with Hanzi, Pinyin & Thai.
 * - Phrase-by-phrase comparison: Native Model vs User Recording.
 * - Zero Memory Leaks: AudioContext, MediaStream tracks, and Canvas loop cleanup.
 * - Mobile-first ergonomic touch targets (>= 44x44px).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  Square,
  Volume2,
  AlertCircle,
  Check,
  Headphones,
  Sparkles,
  Award,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { speak, stopSpeaking, playClick, playCorrect } from '../../engines/audio/audioEngine';

export interface PitchScenario {
  id: string;
  category: 'interview' | 'negotiation' | 'product_pitch' | 'crisis_pr';
  titleTh: string;
  titleZh: string;
  durationSeconds: number;
  promptZh: string;
  pinyin: string;
  meaningTh: string;
  keyVocabulary: string[];
}

export const DEFAULT_PITCH_SCENARIOS: PitchScenario[] = [
  {
    id: 'pitch_self_intro',
    category: 'interview',
    titleTh: 'การแนะนำตัวในที่ทำงาน (Self-Introduction)',
    titleZh: '职场自我介绍与优势呈现',
    durationSeconds: 20,
    promptZh: '各位评委好，我具备跨国商务开拓经验，精通数据分析与市场洞察，期待能为团队创造实质价值。',
    pinyin: 'Gèwèi píngwěi hǎo, wǒ jùbèi kuàguó shāngwù kāituò jīngyàn, jīngtōng shùjù fēnxī yǔ shìchǎng dòngchá, qīdài néng wèi tuánduì chuàngzào shízhì jiàzhí.',
    meaningTh: 'สวัสดีท่านกรรมการครับ ผมมีประสบการณ์บุกเบิกธุรกิจข้ามชาติ เชี่ยวชาญการวิเคราะห์ข้อมูลและเจาะลึกตลาด คาดหวังว่าจะสร้างคุณค่าที่แท้จริงให้แก่ทีมได้ครับ',
    keyVocabulary: ['跨国商务', '市场洞察', '实质价值', '团队协作'],
  },
  {
    id: 'pitch_negotiation',
    category: 'negotiation',
    titleTh: 'การต่อรองเงื่อนไขการค้า (Credit Term Negotiation)',
    titleZh: '商务谈判与账期协调',
    durationSeconds: 20,
    promptZh: '鉴于目前的原材料成本上涨，我们本着互利共赢的原则，提议将付款账期延长至六十天。',
    pinyin: 'Jiànyú mùqián de yuáncáiliào chéngběn shàngzhǎng, wǒmen běnzhe hùlì gòngyíng de yuánzé, tíyì jiāng fùkuǎn zhàngqī yáncháng zhì liùshí tiān.',
    meaningTh: 'เมื่อพิจารณาจากต้นทุนวัตถุดิบที่ปรับตัวสูงขึ้นในปัจจุบัน ด้วยหลักการผลประโยชน์ร่วมกัน เราจึงขอเสนอขยายระยะเวลาชำระเงินเป็น 60 วันครับ',
    keyVocabulary: ['鉴于', '互利共赢', '付款账期', '提议'],
  },
  {
    id: 'pitch_product_milestone',
    category: 'product_pitch',
    titleTh: 'การนำเสนอไฮไลต์ผลิตภัณฑ์ (Milestone Pitch)',
    titleZh: '创新项目亮点汇报',
    durationSeconds: 20,
    promptZh: '随着人工智能与算法的日新月异，本项目不仅显著提升了履约效率，更为客户降低了三成运营成本。',
    pinyin: 'Suízhe réngōng zhìnéng yǔ suànfǎ de rìxīnyuèyì, běn xiàngmù bùjǐn xiǎnzhù tíshēng le lǚyuē xiàolǜ, gèng wèi kèhù jiàngdī le sān chéng yùnyíng chéngběn.',
    meaningTh: 'ด้วยความก้าวหน้าอย่างรวดเร็วของ AI และอัลกอริทึม โครงการนี้ไม่เพียงยกระดับประสิทธิภาพการส่งมอบได้อย่างโดดเด่น แต่ยังช่วยลดต้นทุนดำเนินการให้ลูกค้าลงได้ถึง 30% ครับ',
    keyVocabulary: ['日新月异', '履约效率', '运营成本', '显著提升'],
  },
  {
    id: 'pitch_crisis_pr',
    category: 'crisis_pr',
    titleTh: 'การแถลงการณ์วิกฤตองค์กร (Crisis PR Statement)',
    titleZh: '企业危机公关与诚信应对',
    durationSeconds: 20,
    promptZh: '对于本次物流延误造成的困扰，我们深表歉意。我们将全力以赴亡羊补牢，在二十四小时内完成退换补偿。',
    pinyin: 'Duìyú běncì wùliú yánwù zàochéng de kùnrǎo, wǒmen shēn biǎo qiànyì. Wǒmen jiāng quánlìyǐfù wángyángbǔláo, zài èrshísì xiǎoshí nèi wánchéng tuìhuàn bǔcháng.',
    meaningTh: 'สำหรับความไม่สะดวกจากความล่าช้าด้านโลจิสติกส์ในครั้งนี้ ทางเราขออภัยเป็นอย่างยิ่ง เราจะทุ่มเทเต็มกำลังเพื่อเร่งแก้ไข โดยจะชดเชยและเปลี่ยนสินค้าภายใน 24 ชั่วโมงครับ',
    keyVocabulary: ['深表歉意', '全力以赴', '亡羊补牢', '补偿'],
  },
];

export type PitchState =
  | 'idle'
  | 'requesting'
  | 'recording'
  | 'recorded'
  | 'playing_native'
  | 'playing_user'
  | 'permission_denied'
  | 'unsupported';

export interface VoicePitchingRecorderProps {
  scenarios?: PitchScenario[];
  activeScenarioId?: string;
  onCompleteScenario?: (scenarioId: string, durationRecordedSec: number) => void;
  className?: string;
}

export const VoicePitchingRecorder: React.FC<VoicePitchingRecorderProps> = ({
  scenarios = DEFAULT_PITCH_SCENARIOS,
  activeScenarioId,
  onCompleteScenario,
  className = '',
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(() => {
    if (activeScenarioId) {
      const idx = scenarios.findIndex((s) => s.id === activeScenarioId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const scenario = scenarios[selectedScenarioIndex] || scenarios[0];
  const maxRecordDurationSec = scenario.durationSeconds || 20;

  const [state, setState] = useState<PitchState>('idle');
  const [recordedSeconds, setRecordedSeconds] = useState<number>(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<Record<string, boolean>>({});

  // Audio & Hardware Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAudioElemRef = useRef<HTMLAudioElement | null>(null);
  const recordedAudioUrlRef = useRef<string | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Interval & Timer Refs
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Comprehensive Resource Cleanup
  const cleanupAllResources = useCallback(() => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current);
      timeoutTimerRef.current = null;
    }
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (currentAudioElemRef.current) {
      try {
        currentAudioElemRef.current.pause();
        currentAudioElemRef.current.src = '';
      } catch {
        // safe ignore
      }
      currentAudioElemRef.current = null;
    }
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch {
        // safe ignore
      }
      analyserRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close().catch(() => {});
      } catch {
        // safe ignore
      }
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => track.stop());
      } catch {
        // safe ignore
      }
      streamRef.current = null;
    }
    if (recordedAudioUrlRef.current) {
      try {
        if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
          URL.revokeObjectURL(recordedAudioUrlRef.current);
        }
      } catch {
        // safe ignore
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

  // Tab visibility guard: stop recording immediately if page gets hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
        }
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibility);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibility);
      }
    };
  }, []);

  // Idle Canvas Waveform Drawer
  const drawIdleWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw baseline
    ctx.beginPath();
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Draw peaceful center pulse
    const bars = 24;
    const barWidth = 4;
    const gap = (width - bars * barWidth) / (bars + 1);

    for (let i = 0; i < bars; i++) {
      const x = gap + i * (barWidth + gap);
      const distFromCenter = Math.abs(i - bars / 2) / (bars / 2);
      const barHeight = Math.max(4, 18 * (1 - distFromCenter * 0.7));
      const y = (height - barHeight) / 2;

      ctx.fillStyle = '#CBD5E1';
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 2);
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    if (state === 'idle' || state === 'recorded') {
      drawIdleWaveform();
    }
  }, [state, drawIdleWaveform]);

  // Start Real-Time Waveform Animation
  const startWaveformVisualizer = (analyser: AnalyserNode) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      if (!isMountedRef.current || !analyserRef.current) return;

      analyser.getByteFrequencyData(dataArray);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#047857'); // Jade
      gradient.addColorStop(0.5, '#059669'); // Emerald
      gradient.addColorStop(1, '#D97706'); // Warm Ochre

      const bars = 28;
      const barWidth = 5;
      const gap = (width - bars * barWidth) / (bars + 1);

      for (let i = 0; i < bars; i++) {
        const dataIndex = Math.floor((i / bars) * bufferLength * 0.75);
        const value = dataArray[dataIndex] || 0;
        const normalized = value / 255;
        const barHeight = Math.max(6, normalized * (height - 10));
        const x = gap + i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 3);
        ctx.fill();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);
  };

  // Play Native Reference Sound
  const playNativeSound = () => {
    playClick();
    stopSpeaking();
    setState('playing_native');
    speak(scenario.promptZh, {
      rate: 0.9,
      onEnd: () => {
        if (isMountedRef.current) {
          setState(recordedAudioUrlRef.current ? 'recorded' : 'idle');
        }
      },
      onError: () => {
        if (isMountedRef.current) {
          setState(recordedAudioUrlRef.current ? 'recorded' : 'idle');
        }
      },
    });
  };

  // Start Recording Session
  const startRecording = async () => {
    playClick();
    stopSpeaking();

    if (
      typeof window === 'undefined' ||
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function' ||
      typeof window.MediaRecorder === 'undefined'
    ) {
      setState('unsupported');
      setErrorMessage('เบราว์เซอร์นี้ยังไม่รองรับ Web MediaRecorder API สำหรับอัดเสียง');
      return;
    }

    try {
      setState('requesting');
      setErrorMessage(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      if (!isMountedRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;

      // AudioContext + AnalyserNode for Real-time Waveform
      try {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtxClass) {
          const audioCtx = new AudioCtxClass();
          audioContextRef.current = audioCtx;
          if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
          }
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 128;
          analyser.smoothingTimeConstant = 0.8;
          source.connect(analyser);
          analyserRef.current = analyser;
          startWaveformVisualizer(analyser);
        }
      } catch {
        // Fallback: visualizer will remain idle if Web Audio analyser fails
      }

      // Revoke prior URL
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
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          options.mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
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
        const mime = recorder.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mime });
        const url = URL.createObjectURL(blob);
        recordedAudioUrlRef.current = url;
        setRecordedAudioUrl(url);
        setState('recorded');

        // Cleanup stream & analyser
        if (animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current);
          animFrameIdRef.current = null;
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(() => {});
          audioContextRef.current = null;
        }

        drawIdleWaveform();
      };

      recorder.start(100);
      setState('recording');
      setRecordedSeconds(0);

      const startTime = Date.now();
      progressTimerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setRecordedSeconds(Math.min(maxRecordDurationSec, elapsed));
      }, 250);

      timeoutTimerRef.current = setTimeout(() => {
        stopRecording();
      }, maxRecordDurationSec * 1000);
    } catch {
      setState('permission_denied');
      setErrorMessage('ยังไม่ได้รับอนุญาตให้ใช้ไมโครโฟน โปรดเปิดการอนุญาตในบราวเซอร์');
      cleanupAllResources();
    }
  };

  // Stop Recording Session
  const stopRecording = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current);
      timeoutTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // safe ignore
      }
    }
  };

  // Play User's Recorded Sound
  const playUserSound = () => {
    if (!recordedAudioUrl) return;
    playClick();
    stopSpeaking();

    if (currentAudioElemRef.current) {
      try {
        currentAudioElemRef.current.pause();
      } catch {
        // safe ignore
      }
    }

    setState('playing_user');
    const audio = new Audio(recordedAudioUrl);
    currentAudioElemRef.current = audio;

    audio.onended = () => {
      if (isMountedRef.current) {
        setState('recorded');
      }
    };
    audio.onerror = () => {
      if (isMountedRef.current) {
        setState('recorded');
      }
    };
    audio.play().catch(() => {
      if (isMountedRef.current) {
        setState('recorded');
      }
    });
  };

  // Complete & Save Scenario
  const handleMarkComplete = () => {
    playCorrect();
    setCompletedScenarios((prev) => ({ ...prev, [scenario.id]: true }));
    if (onCompleteScenario) {
      onCompleteScenario(scenario.id, recordedSeconds || maxRecordDurationSec);
    }
  };

  const handleSelectScenario = (index: number) => {
    if (state === 'recording') {
      stopRecording();
    }
    cleanupAllResources();
    setSelectedScenarioIndex(index);
    setState('idle');
    setRecordedAudioUrl(null);
    setRecordedSeconds(0);
    setErrorMessage(null);
  };

  const isCompleted = !!completedScenarios[scenario.id];

  return (
    <div
      className={`voice-pitching-recorder w-full max-w-xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-md flex flex-col gap-5 ${className}`}
      data-testid="voice-pitching-recorder"
    >
      {/* Header & Scenario Selector */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Mic className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5">
                สตูดิโอฝึกพูดนำเสนอ & จำลองวิกฤต 2.0
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                  Tier 3-4
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                ฝึกนำเสนอต่อเนื่อง 15–30 วิ พร้อมตรวจคลื่นเสียงแบบเรียลไทม์ 60fps
              </p>
            </div>
          </div>
          {isCompleted && (
            <span
              className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"
              data-testid="badge-scenario-completed"
            >
              <Award className="w-3.5 h-3.5" /> ผ่านด่านแล้ว
            </span>
          )}
        </div>

        {/* Scenario Carousel / Pill Selector */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {scenarios.map((sc, i) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleSelectScenario(i)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 min-h-[44px] ${
                i === selectedScenarioIndex
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              data-testid={`scenario-tab-${sc.id}`}
            >
              {completedScenarios[sc.id] ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Clock className="w-3.5 h-3.5 opacity-60" />
              )}
              {sc.titleZh}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Presentation Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-2 relative">
        <div className="flex items-center justify-between text-xs text-amber-800 font-semibold">
          <span>{scenario.titleTh}</span>
          <span className="flex items-center gap-1 font-mono text-[11px] bg-amber-100/90 px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3" /> เวลาฝึก: {scenario.durationSeconds} วินาที
          </span>
        </div>

        {/* Target Chinese Speech Prompt */}
        <div className="text-xl sm:text-2xl font-serif font-bold text-slate-800 leading-relaxed tracking-wide my-1">
          {scenario.promptZh}
        </div>

        {/* Pinyin */}
        <div className="text-xs sm:text-sm font-mono text-emerald-800 leading-normal">
          {scenario.pinyin}
        </div>

        {/* Meaning Thai */}
        <div className="text-xs text-slate-600 leading-relaxed mt-1 pt-2 border-t border-amber-200/60">
          💡 <span className="font-semibold text-slate-700">คำแปล:</span> {scenario.meaningTh}
        </div>

        {/* Key Vocabulary Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {scenario.keyVocabulary.map((word) => (
            <span
              key={word}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/90 border border-amber-200 text-amber-900 font-medium"
            >
              #{word}
            </span>
          ))}
        </div>
      </div>

      {/* Real-time HTML5 Canvas Waveform */}
      <div className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={64}
          className="w-full h-16 rounded-lg"
          data-testid="pitch-waveform-canvas"
        />

        {/* Dynamic Timer Overlay */}
        <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
          <div className="flex items-center gap-1.5">
            {state === 'recording' ? (
              <span className="flex items-center gap-1 text-red-400 font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> กำลังอัดเสียงพูด...
              </span>
            ) : state === 'playing_native' ? (
              <span className="text-blue-400 font-semibold flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" /> กำลังฟังเสียงต้นแบบ...
              </span>
            ) : state === 'playing_user' ? (
              <span className="text-purple-400 font-semibold flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5 animate-bounce" /> กำลังฟังเสียงของคุณ...
              </span>
            ) : (
              <span>คลื่นเสียงไมโครโฟนสด 60fps</span>
            )}
          </div>
          <div className="font-mono text-slate-300">
            {recordedSeconds}s / {maxRecordDurationSec}s
          </div>
        </div>
      </div>

      {/* Permission / Unsupported Error Fallback */}
      {(state === 'permission_denied' || state === 'unsupported') && (
        <div
          className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs flex items-start gap-2.5"
          data-testid="pitch-error-banner"
        >
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold mb-0.5">การเข้าถึงไมโครโฟนขัดข้อง</div>
            <div className="text-slate-600 text-[11px] leading-relaxed">
              {errorMessage || 'โปรดอนุญาตการใช้ไมค์ หรือฝึกฟังเสียงต้นแบบเจ้าของภาษาแทน'}
            </div>
            <button
              type="button"
              onClick={playNativeSound}
              className="mt-2 text-xs font-semibold text-emerald-700 underline"
            >
              ฟังเสียงตัวอย่างเจ้าของภาษา
            </button>
          </div>
        </div>
      )}

      {/* Main Microphone & Controls Action Arena */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Play Native Prompt Button */}
        <button
          type="button"
          onClick={playNativeSound}
          disabled={state === 'recording' || state === 'requesting'}
          className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          data-testid="btn-play-native-prompt"
        >
          <Volume2 className="w-4 h-4 text-emerald-600" />
          ฟังเสียงต้นแบบ (Native Model)
        </button>

        {/* Center Primary Record Button */}
        <div className="flex items-center gap-2">
          {state === 'recording' ? (
            <button
              type="button"
              onClick={stopRecording}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-red-500/25 animate-pulse transition-transform active:scale-95"
              data-testid="btn-stop-pitch-recording"
            >
              <Square className="w-4 h-4 fill-white" />
              หยุดบันทึก ({recordedSeconds}s)
            </button>
          ) : (
            <button
              type="button"
              onClick={startRecording}
              disabled={state === 'requesting' || state === 'playing_native' || state === 'playing_user'}
              className="min-h-[44px] px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition-transform active:scale-95 disabled:opacity-50"
              data-testid="btn-start-pitch-recording"
            >
              <Mic className="w-4 h-4" />
              {state === 'recorded' ? 'บันทึกเสียงใหม่' : 'เริ่มฝึกพูด (15–30s)'}
            </button>
          )}
        </div>

        {/* Play User Recording Button */}
        {recordedAudioUrl && (
          <button
            type="button"
            onClick={playUserSound}
            disabled={state === 'recording' || state === 'playing_native'}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50"
            data-testid="btn-play-user-recording"
          >
            <Headphones className="w-4 h-4 text-purple-600" />
            ฟังเสียงบันทึกของคุณ
          </button>
        )}
      </div>

      {/* Completion & Next Scenario Actions */}
      {recordedAudioUrl && (
        <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/90 flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-1">
          <div className="text-xs text-emerald-900 font-medium flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>ยอดเยี่ยม! คุณซ้อมพูดได้ครบ {recordedSeconds} วินาที</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleMarkComplete}
              className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              data-testid="btn-complete-scenario"
            >
              <Check className="w-4 h-4" />
              บันทึกคะแนนผ่านด่าน 🌟
            </button>
            {selectedScenarioIndex < scenarios.length - 1 && (
              <button
                type="button"
                onClick={() => handleSelectScenario(selectedScenarioIndex + 1)}
                className="min-h-[44px] px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-colors"
                data-testid="btn-next-scenario"
              >
                ด่านถัดไป <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoicePitchingRecorder;

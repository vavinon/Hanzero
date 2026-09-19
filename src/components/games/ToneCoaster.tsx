/**
 * src/components/games/ToneCoaster.tsx
 * ------------------------------------------------
 * Bunny Tone Coaster: 4 Mandarin Tones Interactive Coaster (Mini-Game 01).
 *
 * Adheres strictly to AGENTS.md:
 * - Safe Practice Zone 100%: Never deducts hearts on wrong answers.
 * - Kinesthetic Terrain: Visualizes tone contours (55, 35, 214, 51, neutral).
 * - Dual Audio: Web Audio Tone Contour glide + Chinese TTS speech cascade.
 * - Special 3+3 Tone Sandhi switch-track visualizer.
 * - Mobile-first touch ergonomic targets (>= 44px).
 * - Clean resource disposal on unmount (zero memory leaks).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, ArrowRight, Zap } from 'lucide-react';
import {
  playToneContour,
  speak,
  stopSpeaking,
  playCorrect,
  playIncorrect,
  playClick,
  ToneNumber,
} from '../../engines/audio/audioEngine';

export type ToneId = 1 | 2 | 3 | 4 | 0;

export interface ToneInfo {
  tone: ToneId;
  nameTh: string;
  nameZh: string;
  pinyinMark: string;
  pitchContour: string;
  thaiEquivalent: string;
  descriptionTh: string;
  color: string;
  borderColor: string;
  bgLight: string;
  exampleWord: {
    hanzi: string;
    pinyin: string;
    th: string;
  };
}

export const TONE_DETAILS: Record<ToneId, ToneInfo> = {
  1: {
    tone: 1,
    nameTh: 'เสียงที่ 1: สูง-ราบเรียบ (55)',
    nameZh: '第一声 (阴平)',
    pinyinMark: 'ā',
    pitchContour: '5-5',
    thaiEquivalent: 'คล้ายเสียงสามัญ (คีย์สูง)',
    descriptionTh: 'เสียงสูงลอยระดับ 5 ลากราบเรียบสม่ำเสมอ เหมือนนักร้องเทียบเสียง "อา~~"',
    color: '#0284c7',
    borderColor: '#38bdf8',
    bgLight: '#f0f9ff',
    exampleWord: { hanzi: '妈', pinyin: 'mā', th: 'แม่' },
  },
  2: {
    tone: 2,
    nameTh: 'เสียงที่ 2: พุ่งทะยานขึ้น (35)',
    nameZh: '第二声 (阳平)',
    pinyinMark: 'á',
    pitchContour: '3-5',
    thaiEquivalent: 'คล้ายเสียงจัตวา',
    descriptionTh: 'เสียงไต่จากระดับกลาง (3) พุ่งขึ้นสู่ระดับสูง (5) เหมือนถามสงสัย "หา? จริงเหรอ?"',
    color: '#059669',
    borderColor: '#34d399',
    bgLight: '#ecfdf5',
    exampleWord: { hanzi: '麻', pinyin: 'má', th: 'ชา/ป่าน' },
  },
  3: {
    tone: 3,
    nameTh: 'เสียงที่ 3: ดิ่งลงแล้วเด้งขึ้น (214)',
    nameZh: '第三声 (上声)',
    pinyinMark: 'ǎ',
    pitchContour: '2-1-4',
    thaiEquivalent: 'คล้ายเสียงเอกลากต่ำ แล้วสะบัดขึ้น',
    descriptionTh: 'เสียงกดต่ำลงก้นเหว (2 ไป 1) แล้วตวัดปลายเสียงเด้งขึ้นระดับ 4 "อืมม์!"',
    color: '#7e22ce',
    borderColor: '#c084fc',
    bgLight: '#faf5ff',
    exampleWord: { hanzi: '马', pinyin: 'mǎ', th: 'ม้า' },
  },
  4: {
    tone: 4,
    nameTh: 'เสียงที่ 4: ทิ้งดิ่งกระแทกลง (51)',
    nameZh: '第四声 (去声)',
    pinyinMark: 'à',
    pitchContour: '5-1',
    thaiEquivalent: 'คล้ายเสียงโทกระแทกห้วน',
    descriptionTh: 'เสียงเริ่มจากจุดสูงสุด (5) ทิ้งดิ่งฮวบลงสู่ล่างสุด (1) สั้น หนักแน่น เหมือนพูดว่า "ไม่!"',
    color: '#c2410c',
    borderColor: '#fb923c',
    bgLight: '#fff7ed',
    exampleWord: { hanzi: '骂', pinyin: 'mà', th: 'ด่า/ว่า' },
  },
  0: {
    tone: 0,
    nameTh: 'เสียงเบา: สั้น เบา ลอย (轻声)',
    nameZh: '轻声 (Qīngshēng)',
    pinyinMark: 'a',
    pitchContour: 'short',
    thaiEquivalent: 'เสียงกึ่งพยางค์ สั้น ลอย แผ่วเบา',
    descriptionTh: 'ไม่ออกเต็มเสียง ไม่ใส่รูปวรรณยุกต์ เปล่งเสียงสั้นนุ่มนวล เช่น "吗 ma (ไหม)"',
    color: '#475569',
    borderColor: '#94a3b8',
    bgLight: '#f8fafc',
    exampleWord: { hanzi: '吗', pinyin: 'ma', th: 'ไหม' },
  },
};

export interface ToneCoasterProps {
  initialMode?: 'explore' | 'quiz';
  onComplete?: (score: number) => void;
  className?: string;
}

export const ToneCoaster: React.FC<ToneCoasterProps> = ({
  initialMode = 'explore',
  onComplete,
  className = '',
}) => {
  const [mode, setMode] = useState<'explore' | 'quiz'>(initialMode);
  const [selectedTone, setSelectedTone] = useState<ToneId>(1);
  const [tutuState, setTutuState] = useState<'idle' | 'riding' | 'cheering' | 'puzzled'>('idle');
  const [coasterProgress, setCoasterProgress] = useState<number>(0);

  // Quiz state
  const [quizTarget, setQuizTarget] = useState<ToneId>(1);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizRound, setQuizRound] = useState<number>(1);
  const [totalRounds] = useState<number>(4);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintActive, setHintActive] = useState<boolean>(false);

  // Sandhi 3+3 Interactive Showcase
  const [sandhiActive, setSandhiActive] = useState<boolean>(false);

  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Set up new quiz challenge
  const setupNewQuizRound = useCallback((_roundNum: number) => {
    const tonePool: ToneId[] = [1, 2, 3, 4];
    const nextTone = tonePool[Math.floor(Math.random() * tonePool.length)];
    setQuizTarget(nextTone);
    setHasAnswered(false);
    setIsCorrect(null);
    setHintActive(false);
    setTutuState('idle');
    setCoasterProgress(0);

    // Auto play prompt after brief delay
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => {
      playTargetAudio(nextTone);
    }, 400);
  }, []);

  const playTargetAudio = useCallback((tone: ToneId) => {
    if (tone === 0) {
      speak('吗', { rate: 0.9 });
    } else {
      playToneContour(tone as ToneNumber, 0.4);
      const word = TONE_DETAILS[tone].exampleWord.hanzi;
      speak(word, { rate: 0.85 });
    }
  }, []);

  // Handle switching to Quiz mode
  const handleSwitchMode = (newMode: 'explore' | 'quiz') => {
    playClick();
    stopSpeaking();
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    setMode(newMode);
    setSandhiActive(false);
    if (newMode === 'quiz') {
      setQuizRound(1);
      setQuizScore(0);
      setupNewQuizRound(1);
    } else {
      setTutuState('idle');
      setCoasterProgress(0);
    }
  };

  // Animate coaster ride
  const triggerCoasterRide = useCallback(() => {
    setTutuState('riding');
    const start = performance.now();
    const duration = 650;

    const step = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(1, elapsed / duration);
      setCoasterProgress(progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setTutuState('idle');
        setCoasterProgress(0);
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  // Handle tone selection in Explore Mode
  const handleSelectExploreTone = (tone: ToneId) => {
    playClick();
    setSelectedTone(tone);
    triggerCoasterRide();
    playTargetAudio(tone);
  };

  // Handle track tap in Quiz Mode (100% Safe Practice)
  const handleSelectQuizTone = (tappedTone: ToneId) => {
    if (hasAnswered && isCorrect) return;

    playClick();
    setSelectedTone(tappedTone);
    setHasAnswered(true);

    if (tappedTone === quizTarget) {
      // Correct!
      setIsCorrect(true);
      setTutuState('cheering');
      playCorrect();
      triggerCoasterRide();

      const newScore = quizScore + 10;
      setQuizScore(newScore);

      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      animationTimerRef.current = setTimeout(() => {
        if (quizRound >= totalRounds) {
          onComplete?.(newScore);
        } else {
          setQuizRound((r) => r + 1);
          setupNewQuizRound(quizRound + 1);
        }
      }, 1600);
    } else {
      // Incorrect -> Safe Practice: No heart loss! Gentle Tutu feedback
      setIsCorrect(false);
      setTutuState('puzzled');
      playIncorrect();
      setHintActive(true);

      // Re-read after 800ms
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      animationTimerRef.current = setTimeout(() => {
        playTargetAudio(quizTarget);
      }, 900);
    }
  };

  // SVG Track Paths for each tone
  const getTrackPath = (tone: ToneId): string => {
    switch (tone) {
      case 1:
        // High Flat 55
        return 'M 25 50 L 375 50';
      case 2:
        // Rising Slope 35
        return 'M 25 150 Q 150 140 375 40';
      case 3:
        // Dip & Swoop 214
        return 'M 25 80 Q 140 180 230 170 T 375 60';
      case 4:
        // Steep Cliff Drop 51
        return 'M 25 40 Q 180 60 375 160';
      case 0:
        // Short Light Hop
        return 'M 140 100 Q 200 65 260 100';
    }
  };

  // Calculate Tutu cart coordinate along current path
  const getCartCoordinate = (tone: ToneId, progress: number): { x: number; y: number } => {
    const t = Math.max(0, Math.min(1, progress));
    switch (tone) {
      case 1:
        return { x: 25 + (375 - 25) * t, y: 50 };
      case 2: {
        const x = (1 - t) * (1 - t) * 25 + 2 * (1 - t) * t * 150 + t * t * 375;
        const y = (1 - t) * (1 - t) * 150 + 2 * (1 - t) * t * 140 + t * t * 40;
        return { x, y };
      }
      case 3: {
        // Approximate 2-1-4 curve
        const x = 25 + (375 - 25) * t;
        let y = 80;
        if (t < 0.6) {
          const subT = t / 0.6;
          y = 80 + 100 * Math.sin((subT * Math.PI) / 2);
        } else {
          const subT = (t - 0.6) / 0.4;
          y = 180 - 120 * subT;
        }
        return { x, y };
      }
      case 4: {
        const x = (1 - t) * (1 - t) * 25 + 2 * (1 - t) * t * 180 + t * t * 375;
        const y = (1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 60 + t * t * 160;
        return { x, y };
      }
      case 0: {
        const x = (1 - t) * (1 - t) * 140 + 2 * (1 - t) * t * 200 + t * t * 260;
        const y = (1 - t) * (1 - t) * 100 + 2 * (1 - t) * t * 65 + t * t * 100;
        return { x, y };
      }
    }
  };

  const activeDisplayTone: ToneId = sandhiActive ? 2 : selectedTone;
  const currentDetail = TONE_DETAILS[activeDisplayTone];
  const cartPos = getCartCoordinate(activeDisplayTone, coasterProgress);

  return (
    <div
      className={`bunny-tone-coaster w-full max-w-xl mx-auto p-4 sm:p-6 bg-amber-50/40 rounded-3xl border border-amber-200/70 shadow-sm flex flex-col gap-5 ${className}`}
      data-testid="bunny-tone-coaster"
    >
      {/* Top Header & Mode Toggle */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl shadow-inner">
            🎢
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg sm:text-xl flex items-center gap-1.5">
              Bunny Tone Coaster
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                Safe Zone 🛡️
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {mode === 'explore'
                ? 'สำรวจภูมิทัศน์ 4 เสียงวรรณยุกต์จีน'
                : `ด่านที่ ${quizRound}/${totalRounds} • ฟังแล้วเลือกรางให้ตรงเสียง`}
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => handleSwitchMode('explore')}
            className={`min-h-[44px] px-3.5 py-2 inline-flex items-center justify-center text-xs font-semibold rounded-xl transition-all ${
              mode === 'explore'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            data-testid="btn-mode-explore"
          >
            🔍 สำรวจเสียง
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('quiz')}
            className={`min-h-[44px] px-3.5 py-2 inline-flex items-center justify-center text-xs font-semibold rounded-xl transition-all ${
              mode === 'quiz'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            data-testid="btn-mode-quiz"
          >
            🎯 ทดสอบหู
          </button>
        </div>
      </div>

      {/* Main Coaster SVG Arena */}
      <div className="relative w-full h-52 sm:h-60 bg-gradient-to-b from-sky-50 via-white to-amber-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-inner flex flex-col justify-between p-3">
        {/* Sky Background Elements */}
        <div className="absolute top-2 left-4 text-slate-300 select-none text-xs flex items-center gap-1">
          ☁️ <span className="text-[10px] text-slate-400">ระดับเสียง 5 (สูง)</span>
        </div>
        <div className="absolute bottom-2 left-4 text-slate-300 select-none text-xs flex items-center gap-1">
          ⛰️ <span className="text-[10px] text-slate-400">ระดับเสียง 1 (ต่ำ)</span>
        </div>

        {/* SVG Roller Coaster Rails */}
        <svg
          viewBox="0 0 400 200"
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-label="Roller Coaster Track"
        >
          {/* Reference Grid lines */}
          <line x1="20" y1="40" x2="380" y2="40" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
          <line x1="20" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeDasharray="2 2" strokeWidth="1" />
          <line x1="20" y1="160" x2="380" y2="160" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />

          {/* Active Highlight Track */}
          <path
            d={getTrackPath(activeDisplayTone)}
            fill="none"
            stroke={currentDetail.color}
            strokeWidth="8"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Support track ties (Coaster wooden ties) */}
          <path
            d={getTrackPath(activeDisplayTone)}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="4 12"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Tutu Rabbit Mascot in Roller Coaster Cart */}
          <g
            transform={`translate(${cartPos.x - 22}, ${cartPos.y - 34})`}
            className="transition-transform duration-75"
          >
            {/* Coaster Cart Body */}
            <rect
              x="2"
              y="18"
              width="40"
              height="16"
              rx="6"
              fill={currentDetail.color}
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* Cart Wheels */}
            <circle cx="10" cy="35" r="4" fill="#334155" stroke="#ffffff" strokeWidth="1" />
            <circle cx="34" cy="35" r="4" fill="#334155" stroke="#ffffff" strokeWidth="1" />
            {/* Tutu Mascot Icon */}
            <text x="13" y="15" fontSize="20" className="select-none">
              {tutuState === 'cheering' ? '🎉' : tutuState === 'puzzled' ? '🤔' : '🐰'}
            </text>
          </g>
        </svg>

        {/* Floating Mascot Feedback Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {mode === 'quiz' && (
            <button
              type="button"
              onClick={() => playTargetAudio(quizTarget)}
              className="min-h-[44px] px-3.5 py-2 bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold rounded-full shadow-sm border border-slate-200 flex items-center gap-1.5 transition-transform active:scale-95"
              data-testid="btn-replay-prompt"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              ฟังเสียงซ้ำ
            </button>
          )}

          <div className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-slate-700 shadow-sm border border-slate-200 flex items-center gap-1">
            <span style={{ color: currentDetail.color }}>{currentDetail.pinyinMark}</span>
            <span className="text-slate-400">•</span>
            <span>{currentDetail.pitchContour}</span>
          </div>
        </div>

        {/* Tutu Speech Bubble */}
        <div className="bg-white/95 backdrop-blur px-3 py-2 rounded-2xl border border-slate-200/80 shadow-sm text-xs text-slate-700 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">
              {tutuState === 'cheering' ? '🌟' : tutuState === 'puzzled' ? '💬' : '🐰'}
            </span>
            <span className="font-medium" data-testid="tutu-message">
              {tutuState === 'cheering'
                ? 'เก่งมากครับ! ทู่ทู่แล่นฉิวไปตามรางเป๊ะเลย ✨'
                : tutuState === 'puzzled'
                  ? 'เอ๊ะ รางนี้ยังไม่ตรงเสียงนะคนเก่ง ลองฟังอีกทีแล้วเลือกใหม่น้า 🛡️'
                  : currentDetail.descriptionTh}
            </span>
          </div>
          {mode === 'explore' && (
            <button
              type="button"
              onClick={() => playTargetAudio(selectedTone)}
              className="min-w-[44px] min-h-[44px] p-2 rounded-xl hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors"
              title="ฟังเสียงตัวอย่าง"
              data-testid="btn-play-tone"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tone Track Selector Buttons (1 to 4 and 0) */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-600 flex items-center justify-between">
          <span>
            {mode === 'explore' ? 'เลือกรางรถไฟเพื่อทดลองฟัง:' : 'แตะเลือกรางรถไฟที่ได้ยิน:'}
          </span>
          {hintActive && mode === 'quiz' && (
            <span className="text-amber-600 text-[11px] font-normal animate-pulse">
              💡 ใบ้ให้: สังเกตรางที่กระพริบเบาๆ
            </span>
          )}
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {([1, 2, 3, 4, 0] as ToneId[]).map((t) => {
            const info = TONE_DETAILS[t];
            const isSelected = selectedTone === t;
            const isTargetHint = hintActive && t === quizTarget;

            return (
              <button
                key={t}
                type="button"
                onClick={() =>
                  mode === 'explore' ? handleSelectExploreTone(t) : handleSelectQuizTone(t)
                }
                className={`min-h-[52px] px-3 py-2 rounded-2xl border-2 font-medium flex flex-col items-center justify-center transition-all duration-150 active:scale-95 ${
                  t === 0 ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isSelected
                    ? 'shadow-md ring-2 ring-offset-1'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                } ${isTargetHint ? 'animate-bounce border-amber-400' : ''}`}
                style={{
                  borderColor: isSelected ? info.borderColor : undefined,
                  backgroundColor: isSelected ? info.bgLight : undefined,
                }}
                data-testid={`btn-tone-track-${t}`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold" style={{ color: info.color }}>
                    {info.pinyinMark}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {t === 0 ? 'เสียงเบา' : `เสียง ${t}`}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {info.exampleWord.hanzi} ({info.exampleWord.pinyin})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tone Sandhi 3+3 Interactive Easter Egg */}
      <div className="mt-1 p-3.5 bg-purple-50/70 rounded-2xl border border-purple-200/80 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-purple-600 font-bold text-xs flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              กลไกสับรางพิเศษ: กฎ 3 + 3 ➔ 2 + 3
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              playClick();
              const next = !sandhiActive;
              setSandhiActive(next);
              if (next) {
                // Speak "ní hǎo"
                speak('你好', { rate: 0.85 });
              }
            }}
            className="min-h-[44px] text-xs px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors inline-flex items-center justify-center"
            data-testid="btn-toggle-sandhi"
          >
            {sandhiActive ? 'ซ่อนการสับราง' : 'ดูการสับราง 你好'}
          </button>
        </div>

        {sandhiActive && (
          <div className="text-xs text-purple-900 bg-white/90 p-3 rounded-xl border border-purple-100 flex flex-col gap-1.5 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-purple-700">
              <span>รางเดิม: nǐ (เสียง 3) + hǎo (เสียง 3)</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                สับรางเป็น: ní (เสียง 2) + hǎo (เสียง 3)!
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              เมื่อรถไฟเหาะเจอเสียง 3 สองตัวติดกัน รางคันแรกจะดีดตัวขึ้นเขาเป็นเสียง 2
              เพื่อไม่ให้รถไฟตกรางและพูดได้ลื่นไหล ไม่สะดุดลิ้นครับ 🐰
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

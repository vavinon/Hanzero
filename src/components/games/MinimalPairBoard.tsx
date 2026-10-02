/**
 * src/components/games/MinimalPairBoard.tsx
 * ------------------------------------------------
 * Minimal Pairs Board: Phonetic contrast trainer for Thai learners.
 *
 * Adheres strictly to AGENTS.md:
 * - Addresses classic Thai learner confusions (b/p, d/t, g/k, j/q, zh/z, shì/sì, u/ü).
 * - Visual anatomical cues: Airflow burst (💨), tongue curling (👅), and lip rounding (👄).
 * - Two modes: Comparison View & "Test My Ears" (Safe Practice Zone 100%).
 * - Mobile-first responsive: Switches automatically to vertical stack on small screens (<400px).
 * - Minimum 44px touch targets and leak-free audio cleanup.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, Wind } from 'lucide-react';
import { speak, stopSpeaking, playCorrect, playIncorrect, playClick } from '../../engines/audio/audioEngine';

export interface PhoneticItem {
  symbol: string;
  thaiEquivalent: string;
  mouthFeature: string;
  airflow: 'none' | 'soft' | 'strong';
  tonguePosition: 'flat' | 'retroflex' | 'palatal' | 'neutral';
  lipShape: 'open' | 'spread' | 'rounded' | 'tight_round';
  exampleWord: {
    hanzi: string;
    pinyin: string;
    th: string;
  };
}

export interface MinimalPair {
  id: string;
  titleTh: string;
  contrastCategory: 'aspiration' | 'retroflex_vs_flat' | 'vowel_rounding' | 'palatal';
  summaryTh: string;
  itemA: PhoneticItem;
  itemB: PhoneticItem;
}

export const MINIMAL_PAIRS_CATALOG: MinimalPair[] = [
  {
    id: 'b_vs_p',
    titleTh: 'b (ป) vs p (พ)',
    contrastCategory: 'aspiration',
    summaryTh: 'คู่ริมฝีปาก: ไม่พ่นลม vs พ่นลมแรงกระแทก',
    itemA: {
      symbol: 'b',
      thaiEquivalent: 'ป (ไม่พ่นลม)',
      mouthFeature: 'ริมฝีปากประกบ กักลมไว้แล้วปล่อยเบาๆ ลมไม่ออก',
      airflow: 'none',
      tonguePosition: 'neutral',
      lipShape: 'open',
      exampleWord: { hanzi: '八', pinyin: 'bā', th: 'แปด' },
    },
    itemB: {
      symbol: 'p',
      thaiEquivalent: 'พ (พ่นลมแรง)',
      mouthFeature: 'ริมฝีปากประกบ ระเบิดลมแรงพุ่งออกมา กระดาษทิชชูปลิว',
      airflow: 'strong',
      tonguePosition: 'neutral',
      lipShape: 'open',
      exampleWord: { hanzi: '怕', pinyin: 'pà', th: 'กลัว' },
    },
  },
  {
    id: 'd_vs_t',
    titleTh: 'd (ต) vs t (ท)',
    contrastCategory: 'aspiration',
    summaryTh: 'คู่ปลายลิ้น: ไม่พ่นลม vs พ่นลมแรง',
    itemA: {
      symbol: 'd',
      thaiEquivalent: 'ต (ไม่พ่นลม)',
      mouthFeature: 'ปลายลิ้นแตะปุ่มเหงือกบน ปล่อยลมเบาๆ',
      airflow: 'none',
      tonguePosition: 'neutral',
      lipShape: 'open',
      exampleWord: { hanzi: '大', pinyin: 'dà', th: 'ใหญ่' },
    },
    itemB: {
      symbol: 't',
      thaiEquivalent: 'ท (พ่นลมแรง)',
      mouthFeature: 'ปลายลิ้นแตะปุ่มเหงือกบน พ่นลมแรงพุ่งออกมา',
      airflow: 'strong',
      tonguePosition: 'neutral',
      lipShape: 'open',
      exampleWord: { hanzi: '他', pinyin: 'tā', th: 'เขา' },
    },
  },
  {
    id: 'g_vs_k',
    titleTh: 'g (ก) vs k (ค)',
    contrastCategory: 'aspiration',
    summaryTh: 'คู่โคนลิ้น: กักลมไว้ vs ระเบิดลมลึกในคอ',
    itemA: {
      symbol: 'g',
      thaiEquivalent: 'ก (ไม่พ่นลม)',
      mouthFeature: 'โคนลิ้นยกแตะเพดานอ่อน ลมไม่พ่นออก',
      airflow: 'none',
      tonguePosition: 'neutral',
      lipShape: 'open',
      exampleWord: { hanzi: '哥', pinyin: 'gē', th: 'พี่ชาย' },
    },
    itemB: {
      symbol: 'k',
      thaiEquivalent: 'ค (พ่นลมแรง)',
      mouthFeature: 'โคนลิ้นยกแตะเพดานอ่อน พ่นลมออกมาแรงๆ จากลำคอ',
      airflow: 'strong',
      tonguePosition: 'neutral',
      lipShape: 'open',
      exampleWord: { hanzi: '看', pinyin: 'kàn', th: 'ดู' },
    },
  },
  {
    id: 'j_vs_q',
    titleTh: 'j (จ-ยิ้ม) vs q (ช-พ่นลม)',
    contrastCategory: 'palatal',
    summaryTh: 'คู่ฉีกยิ้ม: หน้าลิ้นแตะเพดาน vs พ่นลมลอดไรฟัน',
    itemA: {
      symbol: 'j',
      thaiEquivalent: 'จ (ฉีกยิ้ม)',
      mouthFeature: 'ฉีกยิ้มเห็นฟัน หน้าลิ้นแนบเพดานแข็ง ปล่อยลมเบาๆ',
      airflow: 'soft',
      tonguePosition: 'palatal',
      lipShape: 'spread',
      exampleWord: { hanzi: '叫', pinyin: 'jiào', th: 'เรียก/ชื่อ' },
    },
    itemB: {
      symbol: 'q',
      thaiEquivalent: 'ช (พ่นลม + ยิ้ม)',
      mouthFeature: 'ฉีกยิ้มเห็นฟัน พ่นลมแรงพุ่งลอดไรฟันออกมา',
      airflow: 'strong',
      tonguePosition: 'palatal',
      lipShape: 'spread',
      exampleWord: { hanzi: '七', pinyin: 'qī', th: 'เจ็ด' },
    },
  },
  {
    id: 'zh_vs_z',
    titleTh: 'zh (ม้วนลิ้น) vs z (ลิ้นแบน)',
    contrastCategory: 'retroflex_vs_flat',
    summaryTh: 'ศึกตัดสิน: ปลายลิ้นงอขึ้น vs ปลายลิ้นแบนชิดฟัน',
    itemA: {
      symbol: 'zh',
      thaiEquivalent: 'จ (ม้วนลิ้นห่อ)',
      mouthFeature: 'ยกปลายลิ้นงอไปด้านหลังแตะเพดานแข็ง ไม่แตะฟันหน้า',
      airflow: 'none',
      tonguePosition: 'retroflex',
      lipShape: 'rounded',
      exampleWord: { hanzi: '中', pinyin: 'zhōng', th: 'จีน/กลาง' },
    },
    itemB: {
      symbol: 'z',
      thaiEquivalent: 'จ/ซ (ลิ้นแบนชิดฟัน)',
      mouthFeature: 'ปลายลิ้นแบนราบแตะหลังฟันบน ห้ามม้วนลิ้นเด็ดขาด',
      airflow: 'none',
      tonguePosition: 'flat',
      lipShape: 'spread',
      exampleWord: { hanzi: '在', pinyin: 'zài', th: 'อยู่/ที่' },
    },
  },
  {
    id: 'shi_vs_si',
    titleTh: 'shì (是) vs sì (四)',
    contrastCategory: 'retroflex_vs_flat',
    summaryTh: 'คู่ปราบเซียน: ใช่ (shì - ม้วนลิ้น) vs สี่ (sì - ฟันชิด)',
    itemA: {
      symbol: 'shì',
      thaiEquivalent: 'ชี่ (ม้วนลิ้นขึ้น)',
      mouthFeature: 'ปลายลิ้นงอขึ้นเกือบแตะเพดาน ลมลอดผ่านร่องลิ้น',
      airflow: 'soft',
      tonguePosition: 'retroflex',
      lipShape: 'rounded',
      exampleWord: { hanzi: '是', pinyin: 'shì', th: 'คือ/ใช่' },
    },
    itemB: {
      symbol: 'sì',
      thaiEquivalent: 'ซี่ (ลิ้นแบนฟันชิด)',
      mouthFeature: 'ปลายลิ้นแตะโคนฟันล่าง ยิ้มฟันชิดแล้วพ่นลมฟู่',
      airflow: 'soft',
      tonguePosition: 'flat',
      lipShape: 'spread',
      exampleWord: { hanzi: '四', pinyin: 'sì', th: 'สี่' },
    },
  },
  {
    id: 'u_vs_v',
    titleTh: 'u (อู) vs ü (อวี)',
    contrastCategory: 'vowel_rounding',
    summaryTh: 'สระปราบเซียน: ปากห่อกลม vs ปากจู๋ในคอออกเสียงอี',
    itemA: {
      symbol: 'u',
      thaiEquivalent: 'อู (ปากห่อกลม)',
      mouthFeature: 'ห่อปากกลม ยื่นริมฝีปากไปข้างหน้าตามปกติ',
      airflow: 'none',
      tonguePosition: 'neutral',
      lipShape: 'rounded',
      exampleWord: { hanzi: '五', pinyin: 'wǔ', th: 'ห้า' },
    },
    itemB: {
      symbol: 'ü',
      thaiEquivalent: 'อวี (ปากจู๋รูปตัว u ออกเสียง i)',
      mouthFeature: '🌟 ปากจู๋รูปตัว u ค้างไว้ แต่ในลำคอออกเสียง "อี" ห้ามขยับปาก!',
      airflow: 'none',
      tonguePosition: 'palatal',
      lipShape: 'tight_round',
      exampleWord: { hanzi: '女', pinyin: 'nǚ', th: 'ผู้หญิง' },
    },
  },
];

export interface MinimalPairBoardProps {
  initialPairId?: string;
  onCompletePair?: (pairId: string) => void;
  className?: string;
}

export const MinimalPairBoard: React.FC<MinimalPairBoardProps> = ({
  initialPairId = 'b_vs_p',
  onCompletePair,
  className = '',
}) => {
  const [activePairId, setActivePairId] = useState<string>(initialPairId);
  const [boardMode, setBoardMode] = useState<'compare' | 'quiz'>('compare');

  // Quiz Mode State
  const [quizTargetItem, setQuizTargetItem] = useState<'A' | 'B'>('A');
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState<boolean | null>(null);
  const [quizStreak, setQuizStreak] = useState<number>(0);

  const activePair =
    MINIMAL_PAIRS_CATALOG.find((p) => p.id === activePairId) || MINIMAL_PAIRS_CATALOG[0];

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const playItemSound = useCallback((item: PhoneticItem) => {
    playClick();
    speak(item.exampleWord.hanzi, { rate: 0.85 });
  }, []);

  // Setup new quiz round for current pair
  const startQuizRound = useCallback((pair: MinimalPair) => {
    const target = Math.random() > 0.5 ? 'A' : 'B';
    setQuizTargetItem(target);
    setQuizAnswered(false);
    setQuizIsCorrect(null);

    const itemToPlay = target === 'A' ? pair.itemA : pair.itemB;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      speak(itemToPlay.exampleWord.hanzi, { rate: 0.85 });
    }, 300);
  }, []);

  const handleSelectPair = (pairId: string) => {
    playClick();
    stopSpeaking();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setActivePairId(pairId);
    setQuizAnswered(false);
    setQuizIsCorrect(null);
    const pair = MINIMAL_PAIRS_CATALOG.find((p) => p.id === pairId) || MINIMAL_PAIRS_CATALOG[0];
    if (boardMode === 'quiz') {
      startQuizRound(pair);
    }
  };

  const handleSwitchMode = (mode: 'compare' | 'quiz') => {
    playClick();
    stopSpeaking();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setBoardMode(mode);
    if (mode === 'quiz') {
      startQuizRound(activePair);
    } else {
      setQuizAnswered(false);
      setQuizIsCorrect(null);
    }
  };

  const handleQuizAnswer = (choice: 'A' | 'B') => {
    if (quizAnswered && quizIsCorrect) return;

    playClick();
    setQuizAnswered(true);

    if (choice === quizTargetItem) {
      // Correct!
      setQuizIsCorrect(true);
      playCorrect();
      setQuizStreak((s) => s + 1);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onCompletePair?.(activePair.id);
        startQuizRound(activePair);
      }, 1500);
    } else {
      // Incorrect -> Safe Practice Zone
      setQuizIsCorrect(false);
      playIncorrect();

      // Re-play audio
      const itemToPlay = quizTargetItem === 'A' ? activePair.itemA : activePair.itemB;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        speak(itemToPlay.exampleWord.hanzi, { rate: 0.85 });
      }, 800);
    }
  };

  const renderAnatomicalBadges = (item: PhoneticItem) => (
    <div className="flex flex-wrap gap-1.5 mt-2 text-[10px]">
      {/* Airflow Badge */}
      {item.airflow === 'strong' && (
        <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-medium flex items-center gap-0.5">
          <Wind className="w-3 h-3 text-cyan-600" /> พ่นลมแรง 💨
        </span>
      )}
      {item.airflow === 'none' && (
        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
          ไม่พ่นลม 🛑
        </span>
      )}
      {item.airflow === 'soft' && (
        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
          ลมเสียดแทรก 🌬️
        </span>
      )}

      {/* Tongue Position */}
      {item.tonguePosition === 'retroflex' && (
        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
          👅 ม้วนลิ้นขึ้น
        </span>
      )}
      {item.tonguePosition === 'flat' && (
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
          👅 ลิ้นแบนชิดฟัน
        </span>
      )}
      {item.tonguePosition === 'palatal' && (
        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-medium">
          👄 ฉีกยิ้มหน้าลิ้น
        </span>
      )}

      {/* Lip shape */}
      {item.lipShape === 'tight_round' && (
        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-medium">
          🎯 ปากจู๋คงที่
        </span>
      )}
    </div>
  );

  return (
    <div
      className={`minimal-pair-board w-full max-w-xl mx-auto p-4 sm:p-6 bg-slate-50/60 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 ${className}`}
      data-testid="minimal-pair-board"
    >
      {/* Header & Mode Switcher */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-bold text-slate-800 text-lg sm:text-xl flex items-center gap-2">
            <span>⚖️ Minimal Pairs Board</span>
            <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-medium">
              คู่เสียงปราบเซียน
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {boardMode === 'compare'
              ? activePair.summaryTh
              : 'ฟังเสียงสุ่มแล้วแตะการ์ดที่ตรงกับเสียง (Safe Zone 🛡️)'}
          </p>
        </div>

        {/* Mode Buttons */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button
            type="button"
            onClick={() => handleSwitchMode('compare')}
            className={`min-h-[44px] px-3.5 py-2 inline-flex items-center justify-center text-xs font-semibold rounded-xl transition-all ${
              boardMode === 'compare'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            data-testid="btn-mode-compare"
          >
            🔍 เทียบเสียง
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('quiz')}
            className={`min-h-[44px] px-3.5 py-2 inline-flex items-center justify-center text-xs font-semibold rounded-xl transition-all ${
              boardMode === 'quiz'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            data-testid="btn-mode-test-ears"
          >
            🎯 หูทองคำ
          </button>
        </div>
      </div>

      {/* Pair Quick Selector Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
        {MINIMAL_PAIRS_CATALOG.map((pair) => {
          const isSelected = pair.id === activePairId;
          return (
            <button
              key={pair.id}
              type="button"
              onClick={() => handleSelectPair(pair.id)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border inline-flex items-center justify-center ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
              data-testid={`tab-pair-${pair.id}`}
            >
              {pair.titleTh}
            </button>
          );
        })}
      </div>

      {/* Quiz Prompt Replay Bar */}
      {boardMode === 'quiz' && (
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">👂</span>
            <span className="text-xs text-emerald-900 font-semibold">
              แตะฟังเสียง แล้วเลือกการ์ดที่คิดว่าถูกต้อง:
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              const itemToPlay =
                quizTargetItem === 'A' ? activePair.itemA : activePair.itemB;
              speak(itemToPlay.exampleWord.hanzi, { rate: 0.85 });
            }}
            className="min-h-[44px] px-3.5 py-2 bg-white hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-xl shadow-sm border border-emerald-200 inline-flex items-center gap-1.5 transition-transform active:scale-95"
            data-testid="btn-replay-quiz-audio"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
            ฟังซ้ำ
          </button>
        </div>
      )}

      {/* Side-by-Side (or Vertical Stack on Mobile) Pair Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" data-testid="pair-cards-container">
        {/* Card A */}
        <div
          onClick={() => {
            if (boardMode === 'quiz') handleQuizAnswer('A');
            else playItemSound(activePair.itemA);
          }}
          className={`p-4 rounded-3xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
            boardMode === 'quiz'
              ? 'hover:border-emerald-400 bg-white hover:shadow-md'
              : 'bg-white hover:bg-blue-50/30 border-blue-200 shadow-sm'
          } ${
            quizAnswered && quizTargetItem === 'A'
              ? 'ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50/50'
              : ''
          } ${
            quizAnswered && !quizIsCorrect && quizTargetItem !== 'A'
              ? 'opacity-40'
              : ''
          }`}
          data-testid="card-pair-a"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-extrabold text-blue-700 font-mono">
                {activePair.itemA.symbol}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playItemSound(activePair.itemA);
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                title="ฟังเสียง A"
                data-testid="btn-play-a"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm font-bold text-slate-800 mb-1">
              {activePair.itemA.thaiEquivalent}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              {activePair.itemA.mouthFeature}
            </p>

            {renderAnatomicalBadges(activePair.itemA)}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">คำตัวอย่าง:</span>
            <span className="font-bold text-slate-700">
              {activePair.itemA.exampleWord.hanzi} ({activePair.itemA.exampleWord.pinyin}) ={' '}
              {activePair.itemA.exampleWord.th}
            </span>
          </div>
        </div>

        {/* Card B */}
        <div
          onClick={() => {
            if (boardMode === 'quiz') handleQuizAnswer('B');
            else playItemSound(activePair.itemB);
          }}
          className={`p-4 rounded-3xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
            boardMode === 'quiz'
              ? 'hover:border-emerald-400 bg-white hover:shadow-md'
              : 'bg-white hover:bg-rose-50/30 border-rose-200 shadow-sm'
          } ${
            quizAnswered && quizTargetItem === 'B'
              ? 'ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50/50'
              : ''
          } ${
            quizAnswered && !quizIsCorrect && quizTargetItem !== 'B'
              ? 'opacity-40'
              : ''
          }`}
          data-testid="card-pair-b"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-extrabold text-rose-600 font-mono">
                {activePair.itemB.symbol}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playItemSound(activePair.itemB);
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                title="ฟังเสียง B"
                data-testid="btn-play-b"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm font-bold text-slate-800 mb-1">
              {activePair.itemB.thaiEquivalent}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              {activePair.itemB.mouthFeature}
            </p>

            {renderAnatomicalBadges(activePair.itemB)}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">คำตัวอย่าง:</span>
            <span className="font-bold text-slate-700">
              {activePair.itemB.exampleWord.hanzi} ({activePair.itemB.exampleWord.pinyin}) ={' '}
              {activePair.itemB.exampleWord.th}
            </span>
          </div>
        </div>
      </div>

      {/* Quiz Feedback Banner */}
      {boardMode === 'quiz' && quizAnswered && (
        <div
          className={`p-3 rounded-2xl border text-xs flex items-center justify-between animate-fadeIn ${
            quizIsCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
          data-testid="quiz-result-banner"
        >
          <div className="flex items-center gap-2">
            <span>{quizIsCorrect ? '🎉' : '🤔'}</span>
            <span>
              {quizIsCorrect
                ? 'หูทองคำมากครับ! แยกแยะเสียงได้ถูกต้อง 🌟'
                : 'ยังไม่ตรงนะคนเก่ง แต่ไม่ต้องห่วง! ลองฟังซ้ำแล้วแตะใหม่ได้เลย (Safe Zone 🛡️)'}
            </span>
          </div>
          {quizIsCorrect && (
            <span className="text-xs text-emerald-700 font-bold">ต่อเนื่อง: {quizStreak}</span>
          )}
        </div>
      )}
    </div>
  );
};

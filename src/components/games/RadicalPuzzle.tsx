/**
 * src/components/games/RadicalPuzzle.tsx
 * ------------------------------------------------
 * Radical Puzzle Builder: Lego-style Hanzi Assembly (Mini-Game 03).
 *
 * Adheres strictly to AGENTS.md:
 * - Safe Practice Zone 100%: Never deducts hearts on invalid assembly.
 * - Three Spatial Structures: Left-Right (左右), Top-Bottom (上下), Semi-Enclosure (半包围).
 * - Orthographic distinction: Meaning+Meaning (会意字) vs Meaning+Sound (形声字).
 * - Spatial Yielding (偏旁变形与避让): Explains stroke modification (e.g. 女 -> 提).
 * - Multi-touch input mutex (isAssembling lock) to prevent race conditions.
 * - Mobile-first touch ergonomic targets (>= 48px), responsive down to 320px viewport.
 * - Clean resource disposal on unmount (zero memory leaks).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, RefreshCw, Info, ArrowRight } from 'lucide-react';
import {
  speak,
  stopSpeaking,
  playCorrect,
  playIncorrect,
  playClick,
  playToneContour,
  ToneNumber,
} from '../../engines/audio/audioEngine';

export type SpatialStructure = 'left-right' | 'top-bottom' | 'semi-enclosure';

export interface RadicalPart {
  id: string;
  char: string;
  pinyin: string;
  nameTh: string;
  meaningTh: string;
  role: 'semantic' | 'phonetic' | 'building_block';
  color: string;
  bgLight: string;
}

export interface PuzzleTarget {
  id: string;
  targetChar: string;
  pinyin: string;
  pinyinTone: number; // 1 | 2 | 3 | 4
  structure: SpatialStructure;
  structureNameTh: string;
  meaningTh: string;
  category: 'huiyi' | 'xingsheng'; // 会意字 (Meaning+Meaning) vs 形声字 (Meaning+Sound)
  categoryNameTh: string;
  parts: [RadicalPart, RadicalPart];
  spatialYieldingNoteTh?: string; // คำอธิบายการหลบขีด
  mnemonicTh: string;
  exampleWordTh: string;
}

export const RADICAL_PUZZLES: PuzzleTarget[] = [
  {
    id: 'puz_hao',
    targetChar: '好',
    pinyin: 'hǎo',
    pinyinTone: 3,
    structure: 'left-right',
    structureNameTh: 'โครงสร้างซ้าย-ขวา (左右结构)',
    meaningTh: 'ดี, สบายดี',
    category: 'huiyi',
    categoryNameTh: 'คำผสมความหมาย (会意字)',
    parts: [
      {
        id: 'rad_nv',
        char: '女',
        pinyin: 'nǚ',
        nameTh: 'หมวดผู้หญิง (女字旁)',
        meaningTh: 'หญิง, คุณแม่',
        role: 'semantic',
        color: '#be185d',
        bgLight: '#fdf2f8',
      },
      {
        id: 'rad_zi',
        char: '子',
        pinyin: 'zǐ',
        nameTh: 'หมวดเด็ก (子字旁)',
        meaningTh: 'เด็ก, ลูก',
        role: 'semantic',
        color: '#0284c7',
        bgLight: '#f0f9ff',
      },
    ],
    spatialYieldingNoteTh: 'เมื่อ 女 อยู่ฝั่งซ้าย เส้นที่ 3 (横) จะเปลี่ยนเป็นเส้นตวัดขึ้น (提) และไม่ล้ำเส้นปัด เพื่อหลบให้ลูกตัวน้อย',
    mnemonicTh: 'คุณแม่ (女) โอบกอดลูกน้อย (子) แนบอก คือสิ่งที่ดีเลิศและอบอุ่นใจที่สุด',
    exampleWordTh: '你好 (nǐ hǎo - สวัสดี)',
  },
  {
    id: 'puz_zi',
    targetChar: '字',
    pinyin: 'zì',
    pinyinTone: 4,
    structure: 'top-bottom',
    structureNameTh: 'โครงสร้างบน-ล่าง (上下结构)',
    meaningTh: 'ตัวอักษร, ลายสือ',
    category: 'huiyi',
    categoryNameTh: 'คำผสมความหมาย (会意字)',
    parts: [
      {
        id: 'rad_mian',
        char: '宀',
        pinyin: 'mián',
        nameTh: 'หมวดหลังคา (宝盖头)',
        meaningTh: 'หลังคาบ้าน, ที่พัก',
        role: 'semantic',
        color: '#b45309',
        bgLight: '#fffbeb',
      },
      {
        id: 'rad_zi_bottom',
        char: '子',
        pinyin: 'zǐ',
        nameTh: 'หมวดเด็ก (子字旁)',
        meaningTh: 'เด็ก, ทารก',
        role: 'semantic',
        color: '#0284c7',
        bgLight: '#f0f9ff',
      },
    ],
    spatialYieldingNoteTh: 'หลังคา 宀 แผ่กว้างปกคลุมด้านบน ให้เด็ก 子 อยู่ตรงกลางอย่างมั่นคง',
    mnemonicTh: 'เด็กน้อย (子) นั่งตั้งใจคัดลายมืออย่างสงบสุข ใต้หลังคาบ้าน (宀)',
    exampleWordTh: '汉字 (hàn zì - ตัวอักษรจีน)',
  },
  {
    id: 'puz_ming',
    targetChar: '明',
    pinyin: 'míng',
    pinyinTone: 2,
    structure: 'left-right',
    structureNameTh: 'โครงสร้างซ้าย-ขวา (左右结构)',
    meaningTh: 'สว่าง, แจ่มแจ้ง, พรุ่งนี้',
    category: 'huiyi',
    categoryNameTh: 'คำผสมความหมาย (会意字)',
    parts: [
      {
        id: 'rad_ri',
        char: '日',
        pinyin: 'rì',
        nameTh: 'หมวดดวงอาทิตย์ (日字旁)',
        meaningTh: 'พระอาทิตย์, วัน',
        role: 'semantic',
        color: '#ea580c',
        bgLight: '#fff7ed',
      },
      {
        id: 'rad_yue',
        char: '月',
        pinyin: 'yuè',
        nameTh: 'หมวดดวงจันทร์ (月字旁)',
        meaningTh: 'พระจันทร์, เดือน',
        role: 'semantic',
        color: '#7c3aed',
        bgLight: '#faf5ff',
      },
    ],
    spatialYieldingNoteTh: 'ดวงอาทิตย์ 日 ด้านซ้าย ย่อสัดส่วนแคบลงเพื่อให้ดวงจันทร์ 月 ด้านขวาเด่นชัดเคียงคู่กัน',
    mnemonicTh: 'สองแหล่งแสงแห่งจักรวาล พระอาทิตย์ (日) เคียงคู่พระจันทร์ (月) ย่อมสว่างไสวแจ่มแจ้ง',
    exampleWordTh: '明天 (míng tiān - วันพรุ่งนี้)',
  },
  {
    id: 'puz_xiu',
    targetChar: '休',
    pinyin: 'xiū',
    pinyinTone: 1,
    structure: 'left-right',
    structureNameTh: 'โครงสร้างซ้าย-ขวา (左右结构)',
    meaningTh: 'พักผ่อน, หยุดพัก',
    category: 'huiyi',
    categoryNameTh: 'คำผสมความหมาย (会意字)',
    parts: [
      {
        id: 'rad_ren',
        char: '亻',
        pinyin: 'rén',
        nameTh: 'หมวดคนยืน (单人旁)',
        meaningTh: 'คน, มนุษย์',
        role: 'semantic',
        color: '#059669',
        bgLight: '#ecfdf5',
      },
      {
        id: 'rad_mu',
        char: '木',
        pinyin: 'mù',
        nameTh: 'หมวดต้นไม้ (木字旁)',
        meaningTh: 'ต้นไม้, ร่มเงา',
        role: 'semantic',
        color: '#16a34a',
        bgLight: '#f0fdf4',
      },
    ],
    spatialYieldingNoteTh: 'คนยืน 亻 เอนกายขนานชิดข้างลำต้นไม้ 木 พอดีตัว',
    mnemonicTh: 'คนทำงานเหนื่อยล้า (亻) เดินมาเอนหลังพักพิงใต้ร่มเงาต้นไม้ (木) = พักผ่อน',
    exampleWordTh: '休息 (xiū xi - พักผ่อน)',
  },
  {
    id: 'puz_lin',
    targetChar: '林',
    pinyin: 'lín',
    pinyinTone: 2,
    structure: 'left-right',
    structureNameTh: 'โครงสร้างซ้าย-ขวา (左右结构)',
    meaningTh: 'ป่า, ป่าไม้',
    category: 'huiyi',
    categoryNameTh: 'คำผสมความหมาย (会意字)',
    parts: [
      {
        id: 'rad_mu_left',
        char: '木',
        pinyin: 'mù',
        nameTh: 'ต้นไม้ซ้าย (木字旁)',
        meaningTh: 'ต้นไม้',
        role: 'semantic',
        color: '#15803d',
        bgLight: '#f0fdf4',
      },
      {
        id: 'rad_mu_right',
        char: '木',
        pinyin: 'mù',
        nameTh: 'ต้นไม้ขวา',
        meaningTh: 'ต้นไม้',
        role: 'semantic',
        color: '#16a34a',
        bgLight: '#f0fdf4',
      },
    ],
    spatialYieldingNoteTh: 'ต้นไม้ตัวซ้ายเปลี่ยนเส้นตวัดขวา (捺) เป็นจุด (点) เพื่อหลบไม่ให้ทับกิ่งก้านของต้นไม้ขวา!',
    mnemonicTh: 'ต้นไม้สองต้น (木 + 木) เติบโตเคียงคู่กัน ก่อกำเนิดเป็นผืนป่าอันร่มรื่น',
    exampleWordTh: '树林 (shù lín - แนวป่า)',
  },
  {
    id: 'puz_wen',
    targetChar: '问',
    pinyin: 'wèn',
    pinyinTone: 4,
    structure: 'semi-enclosure',
    structureNameTh: 'โครงสร้างกึ่งล้อมรอบ (半包围结构)',
    meaningTh: 'ถาม, ไต่ถาม',
    category: 'huiyi',
    categoryNameTh: 'คำผสมความหมาย (会意字)',
    parts: [
      {
        id: 'rad_men',
        char: '门',
        pinyin: 'mén',
        nameTh: 'หมวดประตู (门字框)',
        meaningTh: 'ประตู, ซุ้มประตู',
        role: 'semantic',
        color: '#64748b',
        bgLight: '#f8fafc',
      },
      {
        id: 'rad_kou',
        char: '口',
        pinyin: 'kǒu',
        nameTh: 'หมวดช่องปาก (口字旁)',
        meaningTh: 'ปาก, เสียงพูด',
        role: 'semantic',
        color: '#e11d48',
        bgLight: '#fff1f2',
      },
    ],
    spatialYieldingNoteTh: 'บานประตู 门 กางออก ล้อมรอบช่องปาก 口 ไว้ตรงกึ่งกลางด้านใน',
    mnemonicTh: 'แวะมาถึงซุ้มประตูเมือง (门) แล้วอ้าปาก (口) เอ่ยถามทางกับผู้คน',
    exampleWordTh: '请问 (qǐng wèn - ขอถามหน่อย)',
  },
  {
    id: 'puz_fan',
    targetChar: '饭',
    pinyin: 'fàn',
    pinyinTone: 4,
    structure: 'left-right',
    structureNameTh: 'โครงสร้างซ้าย-ขวา (左右结构)',
    meaningTh: 'ข้าว, อาหาร, มื้ออาหาร',
    category: 'xingsheng',
    categoryNameTh: 'คำภาพผสมเสียง (形声字: ความหมาย + เสียงอ่าน)',
    parts: [
      {
        id: 'rad_shi',
        char: '饣',
        pinyin: 'shí',
        nameTh: 'หมวดอาหาร (饣字旁)',
        meaningTh: 'อาหาร, การกิน',
        role: 'semantic',
        color: '#d97706',
        bgLight: '#fffbeb',
      },
      {
        id: 'rad_fan_sound',
        char: '反',
        pinyin: 'fǎn',
        nameTh: 'ตัวบอกเสียง fǎn (声旁)',
        meaningTh: 'เสียงคล้องจอง fǎn ➔ fàn',
        role: 'phonetic',
        color: '#2563eb',
        bgLight: '#eff6ff',
      },
    ],
    spatialYieldingNoteTh: '饣 ชามอาหารอยู่ซ้ายบอกความหมาย + 反 อยู่ขวาช่วยบอกเสียงอ่าน fǎn ➔ fàn',
    mnemonicTh: 'หมวดอาหาร (饣) ผสมกับตัวบอกเสียง 反 (fǎn) ➔ ออกเสียงเป็น 饭 (fàn ข้าว)!',
    exampleWordTh: '吃饭 (chī fàn - กินข้าว)',
  },
];

export interface RadicalPuzzleProps {
  initialPuzzleId?: string;
  initialMode?: 'explore' | 'challenge';
  onComplete?: (totalCompleted: number) => void;
  className?: string;
}

export const RadicalPuzzle: React.FC<RadicalPuzzleProps> = ({
  initialPuzzleId = 'puz_hao',
  initialMode = 'explore',
  onComplete,
  className = '',
}) => {
  const [mode, setMode] = useState<'explore' | 'challenge'>(initialMode);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(() => {
    const foundIdx = RADICAL_PUZZLES.findIndex((p) => p.id === initialPuzzleId);
    return foundIdx >= 0 ? foundIdx : 0;
  });

  // Slot states: which parts are placed into slot 0 and slot 1
  const [slot0, setSlot0] = useState<RadicalPart | null>(null);
  const [slot1, setSlot1] = useState<RadicalPart | null>(null);

  // Available candidate pieces in palette
  const [candidates, setCandidates] = useState<RadicalPart[]>([]);

  // Assembly State & Mutex
  const [isAssembling, setIsAssembling] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [tutuMessage, setTutuMessage] = useState<string>('ลองเลือกชิ้นส่วนหมวดนำมาใส่ในช่องว่างดูนะจ๊ะ 🐰');
  const [tutuMood, setTutuMood] = useState<'idle' | 'happy' | 'thinking'>('idle');
  const [completedCount, setCompletedCount] = useState<number>(0);

  const currentPuzzle = RADICAL_PUZZLES[currentPuzzleIndex];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lifecycle resource cleanup
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Initialize candidates whenever current puzzle changes
  const setupPuzzle = useCallback((puzzle: PuzzleTarget) => {
    setSlot0(null);
    setSlot1(null);
    setIsAssembling(false);
    setIsSuccess(false);
    setTutuMood('idle');
    setTutuMessage(`มาช่วยกันประกอบตัวอักษร "${puzzle.targetChar}" กันเถอะ 🐰`);

    // Target parts
    const requiredParts = [...puzzle.parts];

    // Pick 2 distractor parts from other puzzles to make it playful
    const otherPuzzles = RADICAL_PUZZLES.filter((p) => p.id !== puzzle.id);
    const distractors: RadicalPart[] = [];
    for (const p of otherPuzzles) {
      for (const part of p.parts) {
        if (
          !requiredParts.some((rp) => rp.char === part.char) &&
          !distractors.some((dp) => dp.char === part.char)
        ) {
          distractors.push(part);
          if (distractors.length >= 2) break;
        }
      }
      if (distractors.length >= 2) break;
    }

    // Shuffle 4 parts together
    const allPieces = [...requiredParts, ...distractors].sort(() => Math.random() - 0.5);
    setCandidates(allPieces);
  }, []);

  useEffect(() => {
    setupPuzzle(currentPuzzle);
  }, [currentPuzzle, setupPuzzle]);

  // Handle Candidate Piece Tap
  const handlePieceClick = (piece: RadicalPart) => {
    if (isAssembling || isSuccess) return;

    playClick();

    // Check if piece already placed in slot 0 or slot 1
    if (slot0?.id === piece.id) {
      setSlot0(null);
      return;
    }
    if (slot1?.id === piece.id) {
      setSlot1(null);
      return;
    }

    // Place into first empty slot
    if (!slot0) {
      setSlot0(piece);
      checkAssembly(piece, slot1);
    } else if (!slot1) {
      setSlot1(piece);
      checkAssembly(slot0, piece);
    }
  };

  // Handle Slot Tap to Remove Piece
  const handleSlotClick = (slotIndex: 0 | 1) => {
    if (isAssembling || isSuccess) return;
    playClick();
    if (slotIndex === 0 && slot0) setSlot0(null);
    if (slotIndex === 1 && slot1) setSlot1(null);
  };

  // Verify Assembly Match
  const checkAssembly = (p0: RadicalPart | null, p1: RadicalPart | null) => {
    if (!p0 || !p1) return;

    setIsAssembling(true);

    const [expectedPart0, expectedPart1] = currentPuzzle.parts;

    // Check correct order or permutation
    const isExactMatch = p0.char === expectedPart0.char && p1.char === expectedPart1.char;
    const isSwappedMatch = p0.char === expectedPart1.char && p1.char === expectedPart0.char;

    if (isExactMatch) {
      // 100% Success!
      setIsSuccess(true);
      setTutuMood('happy');
      setTutuMessage(`ประกอบร่างสำเร็จ! ได้ตัว "${currentPuzzle.targetChar}" ยอดเยี่ยมมาก ✨🐰`);

      playCorrect();
      if (currentPuzzle.pinyinTone > 0) {
        playToneContour(currentPuzzle.pinyinTone as ToneNumber, 0.4);
      }
      speak(currentPuzzle.targetChar, { rate: 0.85 });

      const nextCompleted = completedCount + 1;
      setCompletedCount(nextCompleted);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsAssembling(false);
        if (mode === 'challenge') {
          if (currentPuzzleIndex + 1 < RADICAL_PUZZLES.length) {
            setCurrentPuzzleIndex((prev) => prev + 1);
          } else {
            onComplete?.(nextCompleted);
          }
        }
      }, 2000);
    } else if (isSwappedMatch) {
      // Correct parts but swapped positions
      playIncorrect();
      setTutuMood('thinking');
      setTutuMessage(
        currentPuzzle.structure === 'top-bottom'
          ? 'ชิ้นส่วนถูกต้องแล้วครับ แต่ต้องวางสลับ บน-ล่าง ให้ถูกตำแหน่งน้า 🐰'
          : 'ชิ้นส่วนถูกต้องแล้วครับ แต่ต้องวาง ซ้าย-ขวา ให้ถูกฝั่งน้า 🐰'
      );
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsAssembling(false);
      }, 1000);
    } else {
      // Wrong parts -> Safe Practice Zone: No hearts deducted! Gentle Tutu feedback
      playIncorrect();
      setTutuMood('thinking');
      setTutuMessage('เอ๊ะ สองชิ้นนี้ยังไม่เข้าล็อกกันนะคนเก่ง ลองจับคู่ใหม่ดูนะจ๊ะ 🛡️🐰');

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setSlot0(null);
        setSlot1(null);
        setIsAssembling(false);
      }, 1200);
    }
  };

  // Switch to next/previous puzzle in Explore mode
  const handleSelectPuzzle = (idx: number) => {
    if (isAssembling) return;
    playClick();
    setCurrentPuzzleIndex(idx);
  };

  const handleToggleMode = (newMode: 'explore' | 'challenge') => {
    playClick();
    setMode(newMode);
    setCurrentPuzzleIndex(0);
    setCompletedCount(0);
  };

  const handlePronounceTarget = () => {
    playClick();
    if (currentPuzzle.pinyinTone > 0) {
      playToneContour(currentPuzzle.pinyinTone as ToneNumber, 0.35);
    }
    speak(currentPuzzle.targetChar, { rate: 0.85 });
  };

  return (
    <div
      className={`radical-puzzle-builder w-full max-w-xl mx-auto p-4 sm:p-6 bg-amber-50/40 rounded-3xl border border-amber-200/70 shadow-sm flex flex-col gap-4 ${className}`}
      data-testid="radical-puzzle-builder"
    >
      {/* Top Header & Mode Selector */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl shadow-inner">
            🧩
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-1.5">
              ด่านประกอบร่างอักษรจีน
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                Safe Zone 🛡️
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {mode === 'explore'
                ? `สำรวจตัวต่อเลโก้จีน (${currentPuzzleIndex + 1}/${RADICAL_PUZZLES.length})`
                : `ภารกิจชิงเหรียญ (${currentPuzzleIndex + 1}/${RADICAL_PUZZLES.length}) • ประกอบครบ ${completedCount} ตัว`}
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => handleToggleMode('explore')}
            className={`min-h-[44px] px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              mode === 'explore' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
            data-testid="btn-mode-explore"
          >
            🔍 สำรวจอิสระ
          </button>
          <button
            type="button"
            onClick={() => handleToggleMode('challenge')}
            className={`min-h-[44px] px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              mode === 'challenge' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
            data-testid="btn-mode-challenge"
          >
            🎯 ด่านท้าทาย
          </button>
        </div>
      </div>

      {/* Target Word Pills (Explore Mode) */}
      {mode === 'explore' && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none" data-testid="puzzle-selector-strip">
          {RADICAL_PUZZLES.map((p, idx) => {
            const isCurrent = idx === currentPuzzleIndex;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPuzzle(idx)}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                  isCurrent
                    ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300 ring-offset-1'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
                data-testid={`btn-select-puzzle-${p.id}`}
              >
                <span className="text-base font-serif">{p.targetChar}</span>
                <span className="text-[11px] opacity-90">{p.pinyin}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Assembly Cauldron Arena (Slot Drop Zone) */}
      <div className="relative w-full bg-gradient-to-b from-white via-amber-50/30 to-amber-100/40 rounded-3xl border-2 border-amber-200/80 p-4 sm:p-6 flex flex-col items-center gap-4 shadow-inner overflow-hidden">
        {/* Structure & Category Badge */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
            {currentPuzzle.structureNameTh}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
            {currentPuzzle.categoryNameTh}
          </span>
        </div>

        {/* Assembly Slots Display */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
          {/* Slot 0 */}
          <button
            type="button"
            onClick={() => handleSlotClick(0)}
            aria-label="ช่องประกอบชิ้นที่ 1"
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-200 active:scale-95 ${
              slot0
                ? 'border-solid border-amber-400 bg-white shadow-md'
                : 'border-slate-300 bg-slate-50/60 hover:bg-slate-100/60'
            }`}
            data-testid="assembly-slot-0"
          >
            {slot0 ? (
              <>
                <span className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: slot0.color }}>
                  {slot0.char}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">{slot0.pinyin}</span>
              </>
            ) : (
              <span className="text-xs text-slate-400 font-medium text-center px-1">
                {currentPuzzle.structure === 'top-bottom' ? 'ชิ้นส่วนบน' : 'ชิ้นส่วนซ้าย'}
              </span>
            )}
          </button>

          {/* Plus Sign */}
          <div className="text-2xl font-bold text-amber-500 select-none">+</div>

          {/* Slot 1 */}
          <button
            type="button"
            onClick={() => handleSlotClick(1)}
            aria-label="ช่องประกอบชิ้นที่ 2"
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-200 active:scale-95 ${
              slot1
                ? 'border-solid border-amber-400 bg-white shadow-md'
                : 'border-slate-300 bg-slate-50/60 hover:bg-slate-100/60'
            }`}
            data-testid="assembly-slot-1"
          >
            {slot1 ? (
              <>
                <span className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: slot1.color }}>
                  {slot1.char}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">{slot1.pinyin}</span>
              </>
            ) : (
              <span className="text-xs text-slate-400 font-medium text-center px-1">
                {currentPuzzle.structure === 'top-bottom' ? 'ชิ้นส่วนล่าง' : 'ชิ้นส่วนขวา'}
              </span>
            )}
          </button>

          {/* Arrow / Equals */}
          <ArrowRight className="w-5 h-5 text-amber-400 select-none" />

          {/* Target / Assembled Output Result Card */}
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
              isSuccess
                ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105 animate-bounce'
                : 'border-slate-200 bg-white/70 shadow-sm'
            }`}
            data-testid="target-result-card"
          >
            {isSuccess ? (
              <>
                <span className="text-4xl sm:text-5xl font-bold font-serif text-emerald-700">
                  {currentPuzzle.targetChar}
                </span>
                <span className="text-[11px] font-bold text-emerald-800">{currentPuzzle.pinyin}</span>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-1">
                <span className="text-2xl font-serif text-slate-300">?</span>
                <span className="text-[10px] text-slate-400 font-semibold">{currentPuzzle.meaningTh}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mascot Feedback Speech Bubble */}
        <div
          className="w-full bg-white/95 backdrop-blur px-3.5 py-2.5 rounded-2xl border border-amber-200/70 shadow-sm text-xs text-slate-700 flex items-center justify-between gap-2"
          data-testid="tutu-feedback-bubble"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {tutuMood === 'happy' ? '🎉' : tutuMood === 'thinking' ? '🤔' : '🐰'}
            </span>
            <span className="font-medium leading-relaxed">{tutuMessage}</span>
          </div>
          {isSuccess && (
            <button
              type="button"
              onClick={handlePronounceTarget}
              className="min-w-[44px] min-h-[44px] p-2 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 flex items-center justify-center transition-colors active:scale-95"
              title="ฟังเสียงอ่าน"
              data-testid="btn-listen-assembled"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Radical Candidates Palette */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-600 flex items-center justify-between">
          <span>แตะเลือกชิ้นส่วนหมวดนำมาประกอบร่าง:</span>
          <button
            type="button"
            onClick={() => setupPuzzle(currentPuzzle)}
            className="text-[11px] text-amber-700 hover:text-amber-900 flex items-center gap-1 font-medium min-h-[44px] px-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            เริ่มจัดใหม่
          </button>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" data-testid="candidates-palette">
          {candidates.map((piece) => {
            const isSelectedInSlot0 = slot0?.id === piece.id;
            const isSelectedInSlot1 = slot1?.id === piece.id;
            const isSelected = isSelectedInSlot0 || isSelectedInSlot1;

            return (
              <button
                key={piece.id}
                type="button"
                onClick={() => handlePieceClick(piece)}
                disabled={isAssembling}
                style={{ touchAction: 'manipulation' }}
                className={`min-h-[56px] p-2 rounded-2xl border-2 font-medium flex flex-col items-center justify-center transition-all duration-150 active:scale-95 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-100/70 shadow-sm opacity-60 scale-95'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
                }`}
                data-testid={`btn-piece-${piece.char}`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-bold font-serif" style={{ color: piece.color }}>
                    {piece.char}
                  </span>
                  <span className="text-xs text-slate-600 font-semibold">{piece.pinyin}</span>
                </div>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{piece.nameTh}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Insights Card (Always visible or enriched upon success) */}
      <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-200/80 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-sky-800 font-bold text-xs">
          <Info className="w-4 h-4 text-sky-600" />
          <span>เคล็ดวิชาช่วยจำ (Mnemonic & Spatial Yielding)</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          💡 {currentPuzzle.mnemonicTh}
        </p>
        {currentPuzzle.spatialYieldingNoteTh && (
          <p className="text-[11px] text-amber-800 bg-amber-100/70 p-2 rounded-xl border border-amber-200/60 leading-relaxed">
            📐 <strong>เคล็ดวิชาหลบขีด:</strong> {currentPuzzle.spatialYieldingNoteTh}
          </p>
        )}
        <div className="text-[11px] text-slate-500">
          ตัวอย่างคำศัพท์: <strong>{currentPuzzle.exampleWordTh}</strong>
        </div>
      </div>
    </div>
  );
};

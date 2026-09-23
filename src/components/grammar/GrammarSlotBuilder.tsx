/**
 * src/components/grammar/GrammarSlotBuilder.tsx
 * ------------------------------------------------
 * Gamified Lego Grammar Slot Builder Component (Tier 2 Traveler Quest).
 *
 * Adheres strictly to AGENTS.md:
 * - Mobile-First Touch Ergonomics (Min 48px hitbox across all interactive tokens)
 * - Semantic Lego Block Styling (Role-specific color palettes with soft 3D borders)
 * - Tap-to-Place and Unslot interactions with Zero Layout Thrashing (60fps)
 * - Tutu's Pedagogical Guidance Hint Box for friendly constructive feedback
 * - Web Audio SFX integration (playClick, playCorrect, playIncorrect, speak)
 * - W3C ARIA accessible with zero nested button elements
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  Volume2,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  GrammarSlotProblem,
  SlotValidationResult,
  GrammarToken,
  evaluateSlotArrangement,
  getRoleColorClass,
} from '../../engines/grammar/grammarSlotEngine';
import {
  speak,
  stopSpeaking,
  playClick,
  playCorrect,
  playIncorrect,
} from '../../engines/audio/audioEngine';

export interface GrammarSlotBuilderProps {
  problem: GrammarSlotProblem;
  onSuccess?: (accuracyScore: number) => void;
  onReset?: () => void;
  className?: string;
}

export const GrammarSlotBuilder: React.FC<GrammarSlotBuilderProps> = ({
  problem,
  onSuccess,
  onReset,
  className = '',
}) => {
  // Map of tokens by ID for quick O(1) retrieval
  const tokenMap = useMemo(() => {
    return new Map<string, GrammarToken>(problem.tokens.map((t) => [t.id, t]));
  }, [problem.tokens]);

  // State: placed tokens in slot area & available tokens in pool tray
  const [placedTokenIds, setPlacedTokenIds] = useState<string[]>([]);
  const [availableTokenIds, setAvailableTokenIds] = useState<string[]>(() =>
    problem.tokens.map((t) => t.id)
  );

  const [validationResult, setValidationResult] = useState<SlotValidationResult | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const totalRequired = problem.validSequences[0]?.length ?? problem.tokens.length;

  // Sync state if problem changes
  React.useEffect(() => {
    setPlacedTokenIds([]);
    setAvailableTokenIds(problem.tokens.map((t) => t.id));
    setValidationResult(null);
    setHasChecked(false);
  }, [problem.id, problem.tokens]);

  // Unmount cleanup: cancel any ongoing speech playback
  React.useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Tap-to-Place: Move token from pool tray to slot receiver
  const handlePlaceToken = useCallback(
    (tokenId: string) => {
      setPlacedTokenIds((prev) => {
        if (prev.includes(tokenId) || prev.length >= totalRequired) {
          return prev;
        }
        playClick();
        return [...prev, tokenId];
      });
      setAvailableTokenIds((prev) => prev.filter((id) => id !== tokenId));
      setValidationResult(null);
      setHasChecked(false);
    },
    [totalRequired]
  );

  // Unslot: Remove token from slot receiver back to pool tray
  const handleUnslotToken = useCallback(
    (tokenId: string) => {
      setPlacedTokenIds((prev) => {
        if (!prev.includes(tokenId)) return prev;
        playClick();
        return prev.filter((id) => id !== tokenId);
      });
      setAvailableTokenIds((prev) => (prev.includes(tokenId) ? prev : [...prev, tokenId]));
      setValidationResult(null);
      setHasChecked(false);
    },
    []
  );

  // Reset all tokens back to available tray
  const handleReset = useCallback(() => {
    playClick();
    stopSpeaking();
    setPlacedTokenIds([]);
    setAvailableTokenIds(problem.tokens.map((t) => t.id));
    setValidationResult(null);
    setHasChecked(false);
    onReset?.();
  }, [problem.tokens, onReset]);

  // Check arranged sequence
  const handleCheck = useCallback(() => {
    const result = evaluateSlotArrangement(problem, placedTokenIds);
    setValidationResult(result);
    setHasChecked(true);

    if (result.isCorrect) {
      playCorrect();
      onSuccess?.(result.accuracyScore);
    } else {
      playIncorrect();
    }
  }, [problem, placedTokenIds, onSuccess]);

  // Pronounce arranged or canonical sentence
  const handleSpeak = useCallback((textToSpeak: string) => {
    stopSpeaking();
    setIsSpeaking(true);
    speak(textToSpeak, {
      rate: 0.85,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  }, []);

  const isAllPlaced = placedTokenIds.length === totalRequired;

  // Construct current placed Chinese text
  const currentPlacedText = placedTokenIds
    .map((id) => tokenMap.get(id)?.zh ?? '')
    .join('');

  return (
    <div
      className={`max-w-md mx-auto bg-stone-50 rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-col justify-between select-none relative ${className}`}
      role="region"
      aria-label="เครื่องมือฝึกฝนไวยากรณ์โครงสร้างประโยคซับซ้อน"
    >
      {/* 1. Header & Grammar Formula Banner */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
              ไวยากรณ์ Tier 2
            </span>
            <h3 className="text-base font-bold text-stone-800 pt-1 leading-tight">
              {problem.titleTh}
            </h3>
          </div>

          <button
            onClick={handleReset}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 active:scale-95 transition"
            title="รีเซ็ตบล็อกคำทั้งหมด"
            aria-label="รีเซ็ตบล็อกคำ"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Formula Badge */}
        <div className="bg-white p-2.5 rounded-2xl border border-stone-200/80 text-xs text-stone-600 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-800 font-semibold truncate">
            <span className="text-amber-600 font-bold">สูตร:</span>
            <span>{problem.formula}</span>
          </div>
          {isAllPlaced && (
            <button
              onClick={() => handleSpeak(currentPlacedText)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:scale-95 transition shrink-0"
              aria-label="ฟังเสียงประโยคที่เรียง"
              title="ฟังเสียงอ่าน"
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* 2. Slot Receiver Area (Drop Zone) */}
      <div className="my-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="font-semibold">ช่องเรียงประโยค:</span>
          <span className="tabular-nums">
            {placedTokenIds.length} / {totalRequired} สล็อต
          </span>
        </div>

        <div className="min-h-[110px] p-3 rounded-2xl bg-white border-2 border-dashed border-stone-300 flex flex-wrap gap-2 items-center content-start transition-all">
          {placedTokenIds.length === 0 ? (
            <div className="w-full text-center py-6 text-xs text-stone-400 font-medium">
              👆 แตะบล็อกคำจากถาดด้านล่างเพื่อเรียงลงในสล็อต
            </div>
          ) : (
            placedTokenIds.map((tokenId) => {
              const token = tokenMap.get(tokenId);
              if (!token) return null;
              const color = getRoleColorClass(token.role);

              return (
                <button
                  key={token.id}
                  onClick={() => handleUnslotToken(token.id)}
                  className={`min-h-[50px] px-3 py-1.5 rounded-xl border-2 ${color.bg} ${color.border} ${color.text} shadow-xs active:scale-95 transition flex flex-col justify-center items-center`}
                  title="แตะเพื่อถอดกลับคืนถาด"
                >
                  <span className="text-base font-bold leading-tight">{token.zh}</span>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 leading-none pt-0.5">
                    <span className="font-semibold">{token.pinyin}</span>
                    <span>·</span>
                    <span>{token.th}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 3. Tutu's Guidance Hint Box (Appears on Error) */}
      {hasChecked && !validationResult?.isCorrect && validationResult?.diagnosticHint && (
        <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1 animate-fade-in shadow-2xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <span>🐰 คำแนะนำจากพี่เลี้ยงทู่ทู่:</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            {validationResult.diagnosticHint}
          </p>
        </div>
      )}

      {/* 4. Success Completion Card */}
      {hasChecked && validationResult?.isCorrect && (
        <div className="mb-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-fade-in shadow-xs">
          <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>เก่งมาก! เรียงประโยคถูกต้องสมบูรณ์แบบ 🎉</span>
          </div>
          <div className="bg-white/80 p-2 rounded-xl text-left border border-emerald-200/60">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-stone-900">
                {problem.canonicalSentence.zh}
              </span>
              <button
                onClick={() => handleSpeak(problem.canonicalSentence.zh)}
                className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                aria-label="ฟังเสียงประโยคต้นแบบ"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold">
              {problem.canonicalSentence.pinyin}
            </p>
            <p className="text-xs text-stone-600 pt-0.5">
              {problem.canonicalSentence.th}
            </p>
          </div>
        </div>
      )}

      {/* 5. Available Tokens Pool (Pool Tray) */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-stone-500 block">
          คลังบล็อกคำศัพท์:
        </span>

        <div className="min-h-[70px] p-3 rounded-2xl bg-stone-100/80 border border-stone-200/80 flex flex-wrap gap-2 items-center">
          {availableTokenIds.length === 0 ? (
            <div className="w-full text-center text-xs text-stone-400">
              วางบล็อกครบแล้ว แตะปุ่ม "ตรวจประโยค" ด้านล่างได้เลย ✨
            </div>
          ) : (
            availableTokenIds.map((tokenId) => {
              const token = tokenMap.get(tokenId);
              if (!token) return null;
              const color = getRoleColorClass(token.role);

              return (
                <button
                  key={token.id}
                  onClick={() => handlePlaceToken(token.id)}
                  className={`min-h-[50px] px-3.5 py-1.5 rounded-xl border-2 bg-white ${color.border} hover:${color.bg} shadow-xs active:scale-95 transition flex flex-col justify-center items-center`}
                  title={`แตะเพื่อวางบล็อก (${color.nameTh})`}
                >
                  <span className="text-base font-bold text-stone-900 leading-tight">
                    {token.zh}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-stone-500 leading-none pt-0.5">
                    <span>{token.pinyin}</span>
                    <span>·</span>
                    <span>{token.th}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 6. Footer Actions: Check Button */}
      <div className="pt-4">
        <button
          onClick={handleCheck}
          disabled={placedTokenIds.length === 0}
          className={`w-full min-h-[48px] rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] ${
            placedTokenIds.length === 0
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>ตรวจคำตอบ</span>
        </button>
      </div>
    </div>
  );
};

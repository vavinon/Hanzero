/**
 * src/components/scenario/InteractiveScenarioPlayer.tsx
 * -----------------------------------------------------
 * Interactive Scenario Decision Player Component (Tier 2 Traveler Quest).
 *
 * Adheres strictly to AGENTS.md:
 * - Mobile-First 320px+ Touch Ergonomics (Min 48px hitbox on decision controls)
 * - Safe Practice Zone: Tutu's Lifeline rescue mechanism, no harsh instant failures
 * - Zen Mood Gauge: Smooth-interpolated NPC patience indicator (Jade -> Amber -> Terracotta -> Rose)
 * - Dynamic Pinyin Fading 2.0: Hold-to-Peek mechanics with multi-mode toggle
 * - Cultural Etiquette Parchment: Digital China pragmatic context (delivery, Didi, clinic)
 * - Red Team Hardened: 250ms transition lockout against rapid click spamming, audio teardown on unmount
 * - W3C ARIA Accessible with zero invalid nested buttons
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Volume2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  ScenarioTree,
  ScenarioSession,
  createScenarioSession,
  makeChoice,
  applyTutuRescue,
  validateScenarioTree,
  DecisionBranch,
  NPCMood,
} from '../../engines/scenario/branchingDialogueEngine';
import {
  speak,
  stopSpeaking,
  playClick,
  playCorrect,
  playIncorrect,
  playFanfare,
} from '../../engines/audio/audioEngine';

export type PinyinDisplayMode = 'peek' | 'always' | 'hidden';

export interface InteractiveScenarioPlayerProps {
  tree: ScenarioTree;
  initialPatience?: number;
  defaultPinyinMode?: PinyinDisplayMode;
  onComplete?: (session: ScenarioSession) => void;
  onRetry?: () => void;
  onExit?: () => void;
}

export const InteractiveScenarioPlayer: React.FC<InteractiveScenarioPlayerProps> = ({
  tree,
  initialPatience,
  defaultPinyinMode = 'peek',
  onComplete,
  onRetry,
  onExit,
}) => {
  // 1. Structural Validation with Memo
  const validationResult = useMemo(() => validateScenarioTree(tree), [tree]);

  // 2. Session & State
  const [session, setSession] = useState<ScenarioSession>(() =>
    createScenarioSession(tree, { initialPatience })
  );
  const [pinyinMode, setPinyinMode] = useState<PinyinDisplayMode>(defaultPinyinMode);
  const [isPeeking, setIsPeeking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCulturalNote, setShowCulturalNote] = useState(false);
  const [showTutuModal, setShowTutuModal] = useState(false);

  const isTransitioningRef = useRef(false);
  const peekTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync state if tree or initialPatience prop changes
  useEffect(() => {
    setSession(createScenarioSession(tree, { initialPatience }));
    setIsTransitioning(false);
    isTransitioningRef.current = false;
    setShowTutuModal(false);
  }, [tree, initialPatience]);

  // 3. Current Node
  const currentNode = tree.nodes[session.currentNodeId];

  // 4. Lifecycle & Audio Teardown Guards
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (peekTimeoutRef.current) clearTimeout(peekTimeoutRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  // Stop speech when node changes
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);

    // If current node has a cultural note, auto-expand if first time
    if (currentNode?.culturalNote) {
      setShowCulturalNote(true);
    }
  }, [session.currentNodeId, currentNode?.culturalNote]);

  // Trigger Tutu Lifeline when mood drops to awkward_flustered and not yet used
  useEffect(() => {
    if (
      session.patience < 15 &&
      !session.tutuRescueUsed &&
      !session.isFinished &&
      !showTutuModal
    ) {
      setShowTutuModal(true);
    }
  }, [session.patience, session.tutuRescueUsed, session.isFinished, showTutuModal]);

  // Handle Speech Synthesis
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

  // Hold-to-Peek handlers
  const handleHoldStart = useCallback(() => {
    if (pinyinMode !== 'peek') return;
    peekTimeoutRef.current = setTimeout(() => {
      setIsPeeking(true);
    }, 150);
  }, [pinyinMode]);

  const handleHoldEnd = useCallback(() => {
    if (peekTimeoutRef.current) {
      clearTimeout(peekTimeoutRef.current);
      peekTimeoutRef.current = null;
    }
    setIsPeeking(false);
  }, []);

  // Handle Decision Branch Selection (Red Team Hardened against 50-click spam)
  const handleSelectBranch = useCallback(
    (branch: DecisionBranch) => {
      if (isTransitioningRef.current || session.isFinished) {
        return;
      }

      isTransitioningRef.current = true;
      setIsTransitioning(true);
      playClick();

      // Audio feedback according to pragmatic type
      if (branch.pragmaticType === 'optimal') {
        playCorrect();
      } else if (branch.pragmaticType === 'impolite_awkward') {
        playIncorrect();
      }

      const nextSession = makeChoice(tree, session, branch.id);
      setSession(nextSession);

      if (nextSession.isFinished && nextSession.outcome === 'grand_pass') {
        playFanfare();
      }

      // Transition lockout cooldown (250ms)
      transitionTimeoutRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
      }, 250);
    },
    [session, tree]
  );

  // Apply Tutu Rescue
  const handleApplyRescue = useCallback(() => {
    playCorrect();
    const rescuedSession = applyTutuRescue(session);
    setSession(rescuedSession);
    setShowTutuModal(false);
  }, [session]);

  // Restart / Reset
  const handleRestart = useCallback(() => {
    stopSpeaking();
    playClick();
    const freshSession = createScenarioSession(tree, { initialPatience });
    setSession(freshSession);
    setIsTransitioning(false);
    setShowTutuModal(false);
    onRetry?.();
  }, [tree, initialPatience, onRetry]);

  // Safe Fallback UI on Corrupt Tree
  if (!validationResult.isValid) {
    return (
      <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-2xl text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-lg font-bold text-red-800">ขออภัย ข้อมูลสถานการณ์ไม่สมบูรณ์</h3>
        <p className="text-sm text-red-600">
          ระบบตรวจพบลูปวนหรือโครงสร้างที่ผิดพลาดในแผนภูมิต้นไม้บทสนทนา
        </p>
        <ul className="text-left text-xs text-red-700 bg-red-100/70 p-3 rounded-lg space-y-1">
          {validationResult.errors.map((err, idx) => (
            <li key={idx}>• {err.message}</li>
          ))}
        </ul>
        {onExit && (
          <button
            onClick={onExit}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-xl text-sm hover:bg-red-700 transition"
          >
            ย้อนกลับ
          </button>
        )}
      </div>
    );
  }

  // Node Missing Guard
  if (!currentNode) {
    return (
      <div className="max-w-md mx-auto p-6 bg-amber-50 rounded-2xl text-center space-y-3">
        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
        <p className="text-sm text-amber-800 font-medium">ไม่พบโหนดบทสนทนาเป้าหมาย</p>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-amber-600 text-white rounded-xl text-sm font-semibold"
        >
          เริ่มใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  // Patience Bar Color Mapping
  const getPatienceBarColor = (p: number): string => {
    if (p >= 80) return 'bg-emerald-500';
    if (p >= 55) return 'bg-teal-500';
    if (p >= 35) return 'bg-amber-500';
    if (p >= 15) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  const getMoodBadge = (mood: NPCMood): { label: string; emoji: string; colorClass: string } => {
    switch (mood) {
      case 'delighted':
        return { label: 'ประทับใจมาก', emoji: '😊', colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'friendly':
        return { label: 'เป็นมิตร', emoji: '🙂', colorClass: 'bg-teal-100 text-teal-800 border-teal-300' };
      case 'neutral':
        return { label: 'กระชับเวลา', emoji: '😐', colorClass: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'confused_hurried':
        return { label: 'เริ่มเร่งรีบ', emoji: '🤔', colorClass: 'bg-orange-100 text-orange-800 border-orange-300' };
      case 'awkward_flustered':
        return { label: 'ลำบากใจ', emoji: '😅', colorClass: 'bg-rose-100 text-rose-800 border-rose-300' };
    }
  };

  const moodInfo = getMoodBadge(session.currentMood);
  const shouldShowPinyin = pinyinMode === 'always' || (pinyinMode === 'peek' && isPeeking);

  return (
    <div
      className="max-w-md mx-auto bg-stone-50 min-h-[520px] rounded-3xl p-4 sm:p-5 shadow-sm border border-stone-200 flex flex-col justify-between select-none relative overflow-hidden"
      role="region"
      aria-label="เครื่องเล่นสถานการณ์จำลองบทสนทนา"
    >
      {/* 1. Header & Pinyin Mode Switcher */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {tree.title.zh} · Tier 2
            </span>
            <h2 className="text-base font-bold text-stone-800 leading-tight">
              {tree.title.th}
            </h2>
          </div>

          {/* Pinyin Mode Selector */}
          <div className="flex bg-stone-200/80 p-0.5 rounded-full text-[11px] font-medium text-stone-600">
            <button
              onClick={() => {
                playClick();
                setPinyinMode('peek');
              }}
              className={`px-2 py-1 rounded-full transition ${
                pinyinMode === 'peek'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'hover:text-stone-900'
              }`}
              title="กดค้างเพื่อแอบดูพินอิน"
            >
              แอบดู
            </button>
            <button
              onClick={() => {
                playClick();
                setPinyinMode('always');
              }}
              className={`px-2 py-1 rounded-full transition ${
                pinyinMode === 'always'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'hover:text-stone-900'
              }`}
              title="แสดงพินอินตลอดเวลา"
            >
              ตลอด
            </button>
            <button
              onClick={() => {
                playClick();
                setPinyinMode('hidden');
              }}
              className={`px-2 py-1 rounded-full transition ${
                pinyinMode === 'hidden'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'hover:text-stone-900'
              }`}
              title="ซ่อนพินอิน (ระดับเซียน)"
            >
              ซ่อน
            </button>
          </div>
        </div>

        {/* 2. Zen Mood Gauge (Patience Bar) */}
        <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-base">{tree.npc.avatar}</span>
              <span className="font-bold text-stone-700">{tree.npc.name}</span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${moodInfo.colorClass}`}
              >
                <span>{moodInfo.emoji}</span>
                <span>{moodInfo.label}</span>
              </span>
            </div>
            <span className="font-bold text-stone-500 tabular-nums">
              {session.patience}%
            </span>
          </div>

          <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-400 ease-out rounded-full ${getPatienceBarColor(
                session.patience
              )}`}
              style={{ width: `${session.patience}%` }}
              role="progressbar"
              aria-valuenow={session.patience}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      {/* 3. Main Content: Dialogue Screen or Ending Screen */}
      {!session.isFinished ? (
        <div className="my-4 space-y-4 flex-1 flex flex-col justify-center">
          {/* NPC Speech Balloon */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs relative space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentNode.speaker.avatar ?? tree.npc.avatar}</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-500">
                    {currentNode.speaker.name}
                  </h4>
                </div>
              </div>

              {/* Audio Listen Button */}
              <button
                onClick={() => handleSpeak(currentNode.text.zh)}
                className="w-10 h-10 min-w-[40px] flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:scale-95 transition"
                aria-label={`ฟังเสียงภาษาจีน: ${currentNode.text.zh}`}
                title="ฟังเสียงพูด"
              >
                {isSpeaking ? (
                  <Volume2 className="w-5 h-5 animate-pulse text-emerald-600" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Chinese Text with Hold-to-Peek Interaction */}
            <div
              onPointerDown={handleHoldStart}
              onPointerUp={handleHoldEnd}
              onPointerLeave={handleHoldEnd}
              onContextMenu={(e) => e.preventDefault()}
              className="cursor-pointer active:opacity-90 transition select-none"
            >
              <p className="text-xl font-bold text-stone-900 tracking-wide leading-relaxed">
                {currentNode.text.zh}
              </p>

              {/* Pinyin with smooth transition */}
              <div
                className={`transition-all duration-200 overflow-hidden text-emerald-800 font-semibold text-sm pt-1 leading-normal ${
                  shouldShowPinyin
                    ? 'max-h-12 opacity-100'
                    : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                {currentNode.text.displayPinyin ?? currentNode.text.pinyin}
              </div>

              {/* Thai Translation */}
              <p className="text-xs sm:text-sm text-stone-600 pt-1 leading-snug">
                {currentNode.text.th}
              </p>

              {pinyinMode === 'peek' && !isPeeking && (
                <span className="inline-block mt-2 text-[10px] text-stone-400 font-medium">
                  👆 แตะค้างที่ประโยคเพื่อแอบดูพินอิน
                </span>
              )}
            </div>
          </div>

          {/* Cultural Etiquette Note Accordion */}
          {currentNode.culturalNote && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 space-y-1.5 transition">
              <button
                onClick={() => {
                  playClick();
                  setShowCulturalNote((prev) => !prev);
                }}
                className="w-full flex items-center justify-between font-bold text-amber-900"
              >
                <div className="flex items-center gap-1.5">
                  <span>🎋</span>
                  <span>{currentNode.culturalNote.titleTh}</span>
                </div>
                {showCulturalNote ? (
                  <ChevronUp className="w-4 h-4 text-amber-700" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-amber-700" />
                )}
              </button>

              {showCulturalNote && (
                <div className="pt-1.5 space-y-2 text-[11px] leading-relaxed border-t border-amber-200/60 mt-1">
                  <p>{currentNode.culturalNote.insightTh}</p>
                  <div className="grid grid-cols-2 gap-2 pt-1 font-medium">
                    <div className="bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-200/60">
                      <span className="font-bold block">✓ ควรทำ:</span>
                      {currentNode.culturalNote.doAndDont.doTh}
                    </div>
                    <div className="bg-rose-50 text-rose-800 p-2 rounded-xl border border-rose-200/60">
                      <span className="font-bold block">✗ ไม่ควรทำ:</span>
                      {currentNode.culturalNote.doAndDont.dontTh}
                    </div>
                  </div>
                  <div className="bg-amber-100/70 p-2 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-700 font-bold block">
                        ประโยคทองคำ:
                      </span>
                      <span className="font-bold text-amber-950">
                        {currentNode.culturalNote.goldenPhrase.zh}
                      </span>
                      <span className="text-[10px] text-amber-800 block">
                        {currentNode.culturalNote.goldenPhrase.th}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleSpeak(currentNode.culturalNote!.goldenPhrase.zh)
                      }
                      className="p-1.5 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300"
                      aria-label="ฟังประโยคทองคำ"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. Decision Branches (Touch targets >= 48px) */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-stone-500 block">
              เลือกคำตอบของคุณ:
            </span>
            {currentNode.branches.map((branch) => (
              <button
                key={branch.id}
                onClick={() => handleSelectBranch(branch)}
                disabled={isTransitioning}
                className={`w-full min-h-[52px] text-left p-3.5 rounded-2xl border transition duration-150 flex flex-col justify-center ${
                  isTransitioning
                    ? 'opacity-60 cursor-not-allowed pointer-events-none'
                    : 'bg-white hover:bg-stone-50 active:scale-[0.99] border-stone-200 hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-bold text-stone-900">
                    {branch.text.zh}
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                </div>

                <div
                  className={`transition-all duration-200 overflow-hidden text-xs text-emerald-700 font-medium ${
                    shouldShowPinyin
                      ? 'max-h-8 opacity-100 pt-0.5'
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {branch.text.displayPinyin ?? branch.text.pinyin}
                </div>

                <span className="text-[11px] text-stone-500 pt-0.5">
                  {branch.text.th}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* 5. Ending Celebration & Summary Screen */
        <div className="my-6 space-y-4 text-center flex-1 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="text-4xl">
              {session.outcome === 'grand_pass'
                ? '🌟'
                : session.outcome === 'cozy_pass'
                ? '🍵'
                : '🐰'}
            </div>
            <div className="space-y-1">
              {session.outcome === 'grand_pass' && (
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                  顺利通关 - ผ่านฉลุยยอดเยี่ยม!
                </span>
              )}
              {session.outcome === 'cozy_pass' && (
                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full border border-teal-200">
                  基本通关 - สื่อสารสำเร็จอย่างอบอุ่น
                </span>
              )}
              {session.outcome === 'tutu_replay' && (
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
                  温故知新 - ทู่ทู่ชวนฝึกใหม่อีกรอบ
                </span>
              )}
              <h3 className="text-xl font-bold text-stone-900">
                {currentNode.endingTitleTh ??
                  (session.outcome === 'grand_pass'
                    ? 'ผ่านฉลุยยอดเยี่ยม!'
                    : session.outcome === 'cozy_pass'
                    ? 'สื่อสารสำเร็จอย่างอบอุ่น'
                    : 'ทู่ทู่ชวนฝึกใหม่อีกรอบ')}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
              {currentNode.endingMessageTh ??
                (session.outcome === 'grand_pass'
                  ? 'คุณสื่อสารด้วยมารยาทที่ถูกต้องและตรงจุด คู่สนทนาพึงพอใจมาก!'
                  : 'ภารกิจลุล่วงด้วยดี ลองฝึกพูดให้คล่องขึ้นอีกนิดเพื่อรับแต้มเต็มนะ')}
            </p>
          </div>

          {/* Performance Summary Card */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2 max-w-xs mx-auto w-full">
            <div className="flex justify-between items-center text-xs border-b border-stone-100 pb-2">
              <span className="text-stone-500">คะแนนภารกิจ:</span>
              <span className="font-bold text-base text-emerald-600 tabular-nums">
                +{session.score} XP
              </span>
            </div>
            <div className="flex justify-between items-center text-xs border-b border-stone-100 pb-2">
              <span className="text-stone-500">ความพึงพอใจคงเหลือ:</span>
              <span className="font-bold text-stone-700 tabular-nums">
                {session.patience}%
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500">จำนวนการตัดสินใจ:</span>
              <span className="font-bold text-stone-700 tabular-nums">
                {session.history.length} ครั้ง
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center pt-2">
            <button
              onClick={handleRestart}
              className="flex-1 max-w-[140px] min-h-[48px] px-4 py-2.5 rounded-2xl border border-stone-300 font-bold text-stone-700 text-xs flex items-center justify-center gap-1.5 hover:bg-stone-100 active:scale-95 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ลองใหม่</span>
            </button>

            {onComplete && (
              <button
                onClick={() => onComplete(session)}
                className="flex-1 max-w-[140px] min-h-[48px] px-4 py-2.5 rounded-2xl bg-emerald-600 font-bold text-white text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-700 active:scale-95 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>เสร็จสิ้น</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 6. Tutu Lifeline Rescue Modal */}
      {showTutuModal && (
        <div
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-20 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="เวลานอกกู้สถานการณ์ของน้องกระต่ายทู่ทู่"
        >
          <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-xl max-w-xs w-full space-y-3 text-center">
            <div className="text-4xl">🐰🛟</div>
            <h4 className="text-base font-bold text-amber-900">
              ทู่ทู่ชวนกู้สถานการณ์!
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              ใจเย็นๆ น้า! ดูเหมือนคู่สนทนาจะเริ่มรีบหรือสับสน ลองใช้ประโยคขออภัยและอธิบายอย่างจริงใจนี้ดูสิ:
            </p>
            <div className="bg-amber-50 p-2.5 rounded-xl text-left border border-amber-200/80">
              <span className="font-bold text-amber-950 text-xs block">
                不好意思，我的中文还在学，请稍等一下！
              </span>
              <span className="text-[10px] text-amber-800 block">
                ขอโทษด้วยครับ ภาษาจีนผมกำลังเรียนอยู่ รบกวนรอสักครู่นะครับ!
              </span>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowTutuModal(false)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:bg-stone-100"
              >
                ลองต่อเอง
              </button>
              <button
                onClick={handleApplyRescue}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
              >
                กู้สถานการณ์ (+25 🛟)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

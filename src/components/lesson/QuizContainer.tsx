/**
 * src/components/lesson/QuizContainer.tsx
 * ------------------------------------------------
 * Interactive Quiz Engine & Boss Victory Challenge (Phase 2 Slice 2.5).
 *
 * Adheres strictly to AGENTS.md §4.2 and Red Team Hardening:
 * - Pure Presentation & Resilient Audio Orchestration
 * - Strict TypeScript: Zero 'any'
 * - 4 Core Question Modes:
 *   1. Listen & Match (High-touch Audio + Silent Mode Visual Fallback)
 *   2. Word Meaning / Tone / Radical Focus Match (Tactile 3D Cards)
 *   3. Sentence Scramble / Builder (Lego Block Tokens)
 *   4. Boss Challenge (Real-world Scenario Context + Etiquette Decision)
 * - Adaptive Silent Mode: 100% SFX & speech isolation (zero audio leakage)
 * - Anti-Race Navigation Lock (prevents double-tap question skipping / double XP exploit)
 * - Speech Concurrency Lock (prevents rapid-tap WebKit audio daemon deadlock)
 * - Safe Zone Heart Recovery (refill hearts without shaming)
 * - Celebratory Victory Screen with Fanfare SFX & Shareable CheerTrophy
 * - Mobile-First Touch Ergonomics: Hitbox >= 44px on all interactive controls
 * - Zero Memory Leak Teardown (all speech and timer handles cleaned on unmount)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Volume2,
  Heart,
  VolumeX,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Trophy,
  ArrowRight,
  Share2,
  Check,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import {
  QuizQuestion,
  MultipleChoiceQuiz,
  SentenceScrambleQuiz,
  BossChallenge,
  CheerTrophy,
} from '../../types/lesson';
import {
  speak,
  stopSpeaking,
  playCorrect,
  playIncorrect,
  playFanfare,
  playClick,
} from '../../engines/audio/audioEngine';

export interface QuizResult {
  passed: boolean;
  score: number;
  totalQuestions: number;
  xpEarned: number;
  heartsLeft: number;
}

export interface QuizContainerProps {
  /** Array of quizzes for the current lesson */
  quizzes: QuizQuestion[];
  /** Optional boss challenge scenario for the final gate */
  bossChallenge?: BossChallenge;
  /** Optional trophy reward shown upon victory */
  cheerTrophy?: CheerTrophy;
  /** Initial heart count (defaults to 5) */
  initialHearts?: number;
  /** Initial silent mode state (defaults to false) */
  initialSilentMode?: boolean;
  /** Callback fired when the quiz set or boss challenge is completed */
  onComplete?: (result: QuizResult) => void;
  /** Callback fired when a heart is lost */
  onHeartLost?: (currentHearts: number) => void;
  /** Custom CSS class */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({
  quizzes,
  bossChallenge,
  cheerTrophy,
  initialHearts = 5,
  initialSilentMode = false,
  onComplete,
  onHeartLost,
  className = '',
  style,
}) => {
  // Navigation & Lifecycle
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(initialHearts);
  const [silentMode, setSilentMode] = useState<boolean>(initialSilentMode);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [showHeartRefillModal, setShowHeartRefillModal] = useState<boolean>(false);

  // Per-Question Interaction States
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Sentence Scramble Tokens State
  const [placedTokens, setPlacedTokens] = useState<Array<{ id: number; text: string }>>([]);
  const [availableTokens, setAvailableTokens] = useState<Array<{ id: number; text: string }>>([]);

  // Red Team Hardening: Guards & Timer References
  const isUnmountedRef = useRef<boolean>(false);
  const isAdvancingRef = useRef<boolean>(false);
  const shakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shareTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalQuestions = quizzes.length + (bossChallenge ? 1 : 0);
  const isBossStage = currentIndex === quizzes.length && Boolean(bossChallenge);
  const currentQuiz: QuizQuestion | undefined = !isBossStage ? quizzes[currentIndex] : undefined;

  // Red Team Defense: Safe Click SFX that strictly respects Silent Mode
  const playSafeClick = useCallback(() => {
    if (!silentMode) {
      playClick();
    }
  }, [silentMode]);

  // Teardown: Stop audio and clear pending timers on unmount
  useEffect(() => {
    isUnmountedRef.current = false;
    return () => {
      isUnmountedRef.current = true;
      stopSpeaking();
      if (shakeTimerRef.current) {
        clearTimeout(shakeTimerRef.current);
        shakeTimerRef.current = null;
      }
      if (shareTimerRef.current) {
        clearTimeout(shareTimerRef.current);
        shareTimerRef.current = null;
      }
    };
  }, []);

  // Initialize Sentence Scramble tokens whenever question changes
  useEffect(() => {
    stopSpeaking();
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCurrentCorrect(null);
    setIsShaking(false);
    setIsPlayingAudio(false);
    isAdvancingRef.current = false;

    if (currentQuiz && currentQuiz.type === 'sentence_scramble') {
      const scrambleQuiz = currentQuiz as SentenceScrambleQuiz;
      const initialTokens = scrambleQuiz.tokens.map((token, index) => ({
        id: index,
        text: token,
      }));
      setAvailableTokens(initialTokens);
      setPlacedTokens([]);
    }
  }, [currentIndex, currentQuiz]);

  // Red Team Defense: Audio Playback with Silent Mode Guard & Concurrency Lock
  const handlePlayAudio = useCallback(
    async (text: string) => {
      if (silentMode || isPlayingAudio) return;
      playSafeClick();
      setIsPlayingAudio(true);
      try {
        await speak(text, {
          rate: 0.85,
          onEnd: () => {
            if (!isUnmountedRef.current) setIsPlayingAudio(false);
          },
          onError: () => {
            if (!isUnmountedRef.current) setIsPlayingAudio(false);
          },
        });
      } catch {
        if (!isUnmountedRef.current) setIsPlayingAudio(false);
      }
    },
    [silentMode, isPlayingAudio, playSafeClick]
  );

  // Multiple Choice Option Selection
  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return;
    playSafeClick();
    setSelectedOption(index);
  };

  // Sentence Scramble Token Interactions
  const handlePickToken = (tokenObj: { id: number; text: string }) => {
    if (isAnswerChecked) return;
    playSafeClick();
    setAvailableTokens((prev) => prev.filter((item) => item.id !== tokenObj.id));
    setPlacedTokens((prev) => [...prev, tokenObj]);
  };

  const handleReturnToken = (tokenObj: { id: number; text: string }) => {
    if (isAnswerChecked) return;
    playSafeClick();
    setPlacedTokens((prev) => prev.filter((item) => item.id !== tokenObj.id));
    setAvailableTokens((prev) => [...prev, tokenObj]);
  };

  const handleResetScramble = () => {
    if (isAnswerChecked || !currentQuiz || currentQuiz.type !== 'sentence_scramble') return;
    playSafeClick();
    const scrambleQuiz = currentQuiz as SentenceScrambleQuiz;
    const initialTokens = scrambleQuiz.tokens.map((token, index) => ({
      id: index,
      text: token,
    }));
    setAvailableTokens(initialTokens);
    setPlacedTokens([]);
  };

  // Submit & Check Answer
  const handleCheckAnswer = () => {
    if (isAnswerChecked) return;

    let isCorrect = false;

    if (isBossStage && bossChallenge) {
      if (selectedOption === null) return;
      isCorrect = selectedOption === bossChallenge.correct_index;
    } else if (currentQuiz) {
      if (currentQuiz.type === 'sentence_scramble') {
        const scrambleQuiz = currentQuiz as SentenceScrambleQuiz;
        const currentSequence = placedTokens.map((t) => t.text);
        isCorrect =
          currentSequence.length === scrambleQuiz.correct_sequence.length &&
          currentSequence.every((val, idx) => val === scrambleQuiz.correct_sequence[idx]);
      } else {
        const mcQuiz = currentQuiz as MultipleChoiceQuiz;
        if (selectedOption === null) return;
        isCorrect = selectedOption === mcQuiz.correct_index;
      }
    }

    setIsAnswerChecked(true);
    setIsCurrentCorrect(isCorrect);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      if (!silentMode) {
        playCorrect();
      }
    } else {
      if (!silentMode) {
        playIncorrect();
      }
      setIsShaking(true);
      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
      shakeTimerRef.current = setTimeout(() => {
        if (!isUnmountedRef.current) setIsShaking(false);
      }, 400);

      const nextHearts = Math.max(0, hearts - 1);
      setHearts(nextHearts);
      onHeartLost?.(nextHearts);

      if (nextHearts === 0) {
        setShowHeartRefillModal(true);
      }
    }
  };

  // Red Team Defense: Multi-Touch Debounce & Navigation Guard
  const handleNextQuestion = () => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;

    playSafeClick();
    stopSpeaking();

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all questions & boss challenge!
      setIsVictory(true);
      if (!silentMode) {
        playFanfare();
      }
      const xpEarned = cheerTrophy ? cheerTrophy.xp_reward : 50;
      onComplete?.({
        passed: true,
        score: correctCount,
        totalQuestions,
        xpEarned,
        heartsLeft: hearts,
      });
    }
  };

  // Boss Retry Gate: Allows retrying boss question on wrong answer
  const handleRetryBoss = () => {
    playSafeClick();
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCurrentCorrect(null);
  };

  // Refill Hearts Friendly Action
  const handleRefillHearts = () => {
    playSafeClick();
    setHearts(5);
    setShowHeartRefillModal(false);
  };

  // Share Trophy Card with Cleared Timer
  const handleShareTrophy = () => {
    playSafeClick();
    const shareText = `🐰 Hanzero — ชนะด่านท้าทายแล้ว! ได้รับเหรียญ "${
      cheerTrophy?.badge_name || 'ยอดฝีมือภาษาจีน'
    }" +${cheerTrophy?.xp_reward || 50} XP! เริ่มจาก 0 ก็เก่งจีนได้ 🌟`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
      shareTimerRef.current = setTimeout(() => {
        if (!isUnmountedRef.current) setCopiedShare(false);
      }, 2500);
    }
  };

  // --------------------------------------------------------------------------
  // Victory Screen Rendering
  // --------------------------------------------------------------------------
  if (isVictory) {
    const trophy = cheerTrophy || {
      badge_id: 'badge_victory',
      badge_name: 'ผู้พิชิตบทเรียนภาษาจีน 🐰🏅',
      message_th: 'ยินดีด้วยนะคนเก่ง! คุณผ่านทุกแบบทดสอบและชนะด่านท้าทายได้อย่างยอดเยี่ยม!',
      xp_reward: 50,
    };

    return (
      <div
        role="region"
        aria-label="หน้าต่างฉลองชัยชนะ"
        className={`quiz-victory-screen ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: 'var(--bg-card, #FFFFFF)',
          borderRadius: 'var(--radius-lg, 24px)',
          padding: '32px 20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-card, #E2DBD0)',
          gap: '20px',
          width: '100%',
          boxSizing: 'border-box',
          ...style,
        }}
      >
        {/* Animated Trophy Icon */}
        <div className="victory-trophy-badge" aria-hidden="true">
          <Trophy size={48} color="#D97706" />
        </div>

        {/* Victory Headers */}
        <div>
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--color-jade-primary, #059669)',
              backgroundColor: 'var(--color-jade-surface, #ECFDF5)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full, 9999px)',
              marginBottom: '8px',
            }}
          >
            🎉 พิชิตด่านท้าทายสำเร็จ!
          </span>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: 'var(--text-ink-primary, #1C1E21)',
              margin: '0 0 8px 0',
            }}
          >
            {trophy.badge_name}
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--text-ink-secondary, #525866)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '340px',
            }}
          >
            {trophy.message_th}
          </p>
        </div>

        {/* Reward Stats Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '12px 20px',
            backgroundColor: '#FAF8F5',
            borderRadius: 'var(--radius-md, 16px)',
            border: '1px solid var(--border-subtle, #EAE5DE)',
            width: '100%',
            maxWidth: '320px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={18} color="var(--color-jade-primary, #059669)" />
            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-jade-primary, #059669)' }}>
              +{trophy.xp_reward} XP
            </span>
          </div>
          <div style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-subtle, #EAE5DE)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Heart size={18} color="var(--color-vermilion, #DC2626)" fill="var(--color-vermilion, #DC2626)" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-ink-primary, #1C1E21)' }}>
              เหลือ {hearts} ดวง
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px' }}>
          <button
            type="button"
            onClick={handleShareTrophy}
            className="btn-tactile-secondary"
            style={{ width: '100%', gap: '8px', minHeight: '48px' }}
            aria-label="คัดลอกเกียรติยศเพื่อแชร์"
          >
            {copiedShare ? (
              <>
                <Check size={18} color="var(--color-jade-primary, #059669)" />
                <span>คัดลอกข้อความแชร์สำเร็จ! 🐰✨</span>
              </>
            ) : (
              <>
                <Share2 size={18} />
                <span>แชร์บัตรเกียรติยศ 🏆</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              onComplete?.({
                passed: true,
                score: correctCount,
                totalQuestions,
                xpEarned: trophy.xp_reward,
                heartsLeft: hearts,
              })
            }
            className="btn-tactile-primary"
            style={{ width: '100%', gap: '8px', minHeight: '52px' }}
            aria-label="ไปต่อบทเรียนถัดไป"
          >
            <span>ไปต่อบทเรียนถัดไป</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Calculate Progress Percent
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Extract Question Info
  const questionTitle = isBossStage
    ? 'ด่านท้าทายจำลองสถานการณ์จริง 🐰⚔️'
    : currentQuiz?.question_th || 'เลือกคำตอบที่ถูกต้อง:';

  const explanationText = isBossStage
    ? bossChallenge?.explanation_th
    : currentQuiz?.explanation_th;

  const encouragementText = isBossStage
    ? bossChallenge?.encouragement
    : currentQuiz?.encouragement;

  return (
    <div
      role="region"
      aria-label="แบบทดสอบบทเรียน"
      className={`quiz-container ${isShaking ? 'hanzero-shake' : ''} ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* -------------------------------------------------------------------- */}
      {/* Top Capsule Control Bar: Progress, Silent Mode Toggle, Heart Counter */}
      {/* -------------------------------------------------------------------- */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '4px 0',
        }}
      >
        {/* Progress Bar with Question Counter */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: 'var(--text-ink-secondary)' }}>
            <span>
              {isBossStage ? 'ด่านบอสประจำบท' : `ข้อที่ ${currentIndex + 1} จาก ${totalQuestions}`}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              height: '8px',
              backgroundColor: '#EAE5DE',
              borderRadius: 'var(--radius-full, 9999px)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                backgroundColor: isBossStage ? 'var(--color-ochre, #D97706)' : 'var(--color-jade-primary, #059669)',
                borderRadius: 'var(--radius-full, 9999px)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Silent Mode Toggle Switch (Min 44px hitbox) */}
        <button
          type="button"
          onClick={() => {
            playSafeClick();
            setSilentMode(!silentMode);
          }}
          aria-label={silentMode ? 'ปิดโหมดเงียบ' : 'เปิดโหมดเงียบ'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            minHeight: '44px',
            minWidth: '44px',
            borderRadius: 'var(--radius-full, 9999px)',
            border: '1.5px solid',
            borderColor: silentMode ? '#FDE68A' : 'var(--border-subtle, #EAE5DE)',
            backgroundColor: silentMode ? '#FFFBEB' : '#FFFFFF',
            color: silentMode ? '#92400E' : 'var(--text-ink-secondary, #525866)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
          title={silentMode ? 'กำลังเปิดโหมดเงียบ (ปิดเสียง)' : 'แตะเพื่อเปิดโหมดเงียบ'}
        >
          {silentMode ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{silentMode ? 'เงียบ 🤫' : 'เสียง 🔊'}</span>
        </button>

        {/* Hearts Badge */}
        <div
          className="badge-capsule"
          style={{
            backgroundColor: 'var(--color-vermilion-surface, #FEF2F2)',
            color: 'var(--color-vermilion, #DC2626)',
            padding: '6px 12px',
            minHeight: '44px',
          }}
          aria-label={`จำนวนหัวใจคงเหลือ: ${hearts}`}
        >
          <Heart size={18} color="var(--color-vermilion, #DC2626)" fill="var(--color-vermilion, #DC2626)" />
          <span style={{ fontWeight: 800 }}>{hearts}</span>
        </div>
      </header>

      {/* -------------------------------------------------------------------- */}
      {/* Main Question Card Area */}
      {/* -------------------------------------------------------------------- */}
      <main
        style={{
          backgroundColor: 'var(--bg-card, #FFFFFF)',
          borderRadius: 'var(--radius-lg, 24px)',
          padding: '20px 16px',
          boxShadow: 'var(--shadow-card)',
          border: '1.5px solid var(--border-card, #E2DBD0)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Boss Scenario Header */}
        {isBossStage && bossChallenge && (
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              backgroundColor: '#FFFBEB',
              border: '1.5px solid #FDE68A',
              borderRadius: 'var(--radius-md, 16px)',
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B45309', fontWeight: 700, fontSize: '13px' }}>
              <ShieldCheck size={18} />
              <span>สถานการณ์จริง (Scenario)</span>
            </div>
            <p style={{ fontSize: '14px', color: '#78350F', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              {bossChallenge.scenario_th}
            </p>
          </section>
        )}

        {/* Question Title */}
        <div>
          <h3
            style={{
              fontSize: '17px',
              fontWeight: 800,
              color: 'var(--text-ink-primary, #1C1E21)',
              margin: '0 0 6px 0',
              lineHeight: 1.4,
            }}
          >
            {questionTitle}
          </h3>

          {/* Listen Match Voice Trigger & Silent Mode Visual Indicator */}
          {currentQuiz && currentQuiz.type === 'listen_match' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md, 16px)',
                backgroundColor: silentMode ? '#FFFBEB' : 'var(--color-jade-surface, #ECFDF5)',
                border: `1.5px solid ${silentMode ? '#FDE68A' : '#A7F3D0'}`,
              }}
            >
              {silentMode ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#92400E', fontWeight: 600 }}>
                  <VolumeX size={18} />
                  <span>โหมดอ่านเงียบ: ให้สังเกตจากตัวอักษรและพินอินในตัวเลือก</span>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={isPlayingAudio}
                  onClick={() => {
                    const mc = currentQuiz as MultipleChoiceQuiz;
                    const audioText = mc.target_audio || mc.question_th.match(/'([^']+)'/)?.[1] || '好';
                    handlePlayAudio(audioText);
                  }}
                  className="btn-tactile-primary"
                  style={{
                    gap: '8px',
                    padding: '8px 16px',
                    minHeight: '44px',
                    fontSize: '14px',
                    opacity: isPlayingAudio ? 0.7 : 1,
                  }}
                  aria-label="ฟังเสียงคำถาม"
                >
                  <Volume2 size={18} />
                  <span>{isPlayingAudio ? 'กำลังออกเสียง...' : 'กดฟังเสียง 🔊'}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Mode A & D: Multiple Choice & Boss Challenge Options */}
        {/* ------------------------------------------------------------------ */}
        {((currentQuiz && currentQuiz.type !== 'sentence_scramble') || isBossStage) && (
          <div
            role="radiogroup"
            aria-label="ตัวเลือกคำตอบ"
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {((isBossStage ? bossChallenge?.options : (currentQuiz as MultipleChoiceQuiz)?.options) || []).map(
              (optionText, idx) => {
                const isSelected = selectedOption === idx;
                const letter = String.fromCharCode(65 + idx); // A, B, C, D

                let statusClass = '';
                if (isAnswerChecked) {
                  const correctIdx = isBossStage
                    ? bossChallenge?.correct_index
                    : (currentQuiz as MultipleChoiceQuiz)?.correct_index;

                  if (idx === correctIdx) {
                    statusClass = 'is-correct';
                  } else if (isSelected) {
                    statusClass = 'is-wrong';
                  }
                } else if (isSelected) {
                  statusClass = 'is-selected';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectOption(idx)}
                    className={`quiz-option-card ${statusClass}`}
                  >
                    <div className="quiz-option-badge">{letter}</div>
                    <span style={{ flex: 1, lineHeight: 1.4 }}>{optionText}</span>
                    {isAnswerChecked && statusClass === 'is-correct' && (
                      <CheckCircle2 size={20} color="var(--color-jade-primary, #059669)" />
                    )}
                    {isAnswerChecked && statusClass === 'is-wrong' && (
                      <XCircle size={20} color="var(--color-vermilion, #DC2626)" />
                    )}
                  </button>
                );
              }
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Mode C: Sentence Scramble (Lego Builder) */}
        {/* ------------------------------------------------------------------ */}
        {currentQuiz && currentQuiz.type === 'sentence_scramble' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Pronunciation & Meaning Clue */}
            <div
              style={{
                fontSize: '13px',
                color: 'var(--text-ink-secondary)',
                backgroundColor: 'var(--bg-rice-paper, #FBF9F5)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm, 10px)',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '4px',
              }}
            >
              <span>พินอิน: <strong>{(currentQuiz as SentenceScrambleQuiz).pinyin}</strong></span>
              <span>ความหมาย: {(currentQuiz as SentenceScrambleQuiz).meaning_th}</span>
            </div>

            {/* Assembled Sentence Dropzone Box */}
            <div
              className="lego-scramble-dropzone"
              style={{
                borderColor: isAnswerChecked
                  ? isCurrentCorrect
                    ? 'var(--color-jade-primary)'
                    : 'var(--color-vermilion)'
                  : undefined,
                backgroundColor: isAnswerChecked
                  ? isCurrentCorrect
                    ? 'var(--color-jade-surface)'
                    : 'var(--color-vermilion-surface)'
                  : undefined,
              }}
            >
              {placedTokens.length === 0 ? (
                <div style={{ fontSize: '13px', color: 'var(--text-ink-muted)', fontStyle: 'italic' }}>
                  แตะชิ้นส่วนเลโก้ด้านล่างเพื่อเรียงประโยค...
                </div>
              ) : (
                placedTokens.map((tokenObj) => (
                  <button
                    key={`placed-${tokenObj.id}`}
                    type="button"
                    disabled={isAnswerChecked}
                    onClick={() => handleReturnToken(tokenObj)}
                    className="lego-token-btn"
                    title="แตะเพื่อดึงกลับ"
                    aria-label={`ดึงคำว่า ${tokenObj.text} กลับ`}
                  >
                    {tokenObj.text}
                  </button>
                ))
              )}
            </div>

            {/* Available Lego Bricks Pool */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
                {availableTokens.map((tokenObj) => (
                  <button
                    key={`avail-${tokenObj.id}`}
                    type="button"
                    disabled={isAnswerChecked}
                    onClick={() => handlePickToken(tokenObj)}
                    className="lego-token-btn"
                    aria-label={`เลือกคำว่า ${tokenObj.text}`}
                  >
                    {tokenObj.text}
                  </button>
                ))}
              </div>

              {/* Reset Sequence Button */}
              {placedTokens.length > 0 && !isAnswerChecked && (
                <button
                  type="button"
                  onClick={handleResetScramble}
                  className="btn-tactile-secondary"
                  style={{
                    padding: '8px 12px',
                    minHeight: '44px',
                    gap: '4px',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}
                  aria-label="เริ่มเรียงใหม่"
                >
                  <RotateCcw size={15} />
                  <span>เริ่มใหม่</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Feedback Sheet (Appears upon answer submission) */}
        {/* ------------------------------------------------------------------ */}
        {isAnswerChecked && (
          <aside
            role="alert"
            style={{
              borderRadius: 'var(--radius-md, 16px)',
              padding: '14px 16px',
              backgroundColor: isCurrentCorrect ? '#ECFDF5' : '#FEF2F2',
              border: `1.5px solid ${isCurrentCorrect ? '#A7F3D0' : '#FECACA'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 800,
                color: isCurrentCorrect ? 'var(--color-jade-primary, #059669)' : 'var(--color-vermilion, #DC2626)',
              }}
            >
              {isCurrentCorrect ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <span>{isCurrentCorrect ? 'ถูกต้องแล้วคนเก่ง! 🎉' : 'ยังไม่ถูกต้องนะ ไม่เป็นไรมาลองดูเฉลยกัน! 💖'}</span>
            </div>

            {explanationText && (
              <p
                style={{
                  fontSize: '13.5px',
                  color: isCurrentCorrect ? '#065F46' : '#991B1B',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {explanationText}
              </p>
            )}

            {encouragementText && (
              <div
                style={{
                  fontSize: '12.5px',
                  color: isCurrentCorrect ? '#047857' : '#B91C1C',
                  fontStyle: 'italic',
                  fontWeight: 600,
                }}
              >
                {encouragementText}
              </div>
            )}
          </aside>
        )}

        {/* Action Check / Next / Boss Retry Button */}
        <div style={{ marginTop: '4px' }}>
          {!isAnswerChecked ? (
            <button
              type="button"
              onClick={handleCheckAnswer}
              disabled={
                isBossStage || (currentQuiz && currentQuiz.type !== 'sentence_scramble')
                  ? selectedOption === null
                  : placedTokens.length === 0
              }
              className="btn-tactile-primary"
              style={{
                width: '100%',
                opacity:
                  (isBossStage || (currentQuiz && currentQuiz.type !== 'sentence_scramble')) && selectedOption === null
                    ? 0.5
                    : currentQuiz?.type === 'sentence_scramble' && placedTokens.length === 0
                    ? 0.5
                    : 1,
              }}
              aria-label="ตรวจคำตอบ"
            >
              <span>ตรวจคำตอบ</span>
            </button>
          ) : isBossStage && !isCurrentCorrect ? (
            <button
              type="button"
              onClick={handleRetryBoss}
              className="btn-tactile-primary"
              style={{
                width: '100%',
                backgroundColor: 'var(--color-ochre, #D97706)',
                gap: '8px',
              }}
              aria-label="ลองตอบใหม่อีกครั้ง"
            >
              <RotateCcw size={18} />
              <span>ลองตอบด่านบอสใหม่อีกครั้ง 🐰💪</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="btn-tactile-primary"
              style={{
                width: '100%',
                backgroundColor: isCurrentCorrect ? 'var(--color-jade-primary)' : 'var(--text-ink-primary)',
                gap: '8px',
              }}
              aria-label="ไปต่อข้อถัดไป"
            >
              <span>{currentIndex + 1 < totalQuestions ? 'ไปต่อข้อถัดไป' : 'ดูผลลัพธ์ชัยชนะ 🏆'}</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </main>

      {/* -------------------------------------------------------------------- */}
      {/* Friendly Hearts Depleted Modal (Zero-Punishment Recovery) */}
      {/* -------------------------------------------------------------------- */}
      {showHeartRefillModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="หน้าต่างเติมพลังใจ"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 30, 33, 0.6)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 100,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg, 24px)',
              padding: '24px 20px',
              maxWidth: '360px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px',
              boxShadow: 'var(--shadow-floating)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart size={34} color="var(--color-vermilion, #DC2626)" />
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-ink-primary)' }}>
                หัวใจหมดแล้วนะคนเก่ง 💖
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-ink-secondary)', margin: 0, lineHeight: 1.5 }}>
                การเรียนภาษาจีนต้องค่อยๆ จำ ไม่ต้องเครียดเลยนะ! น้องกระต่ายทู่ทู่เติมหัวใจให้ฟรี พร้อมลุยต่อหรือยัง?
              </p>
            </div>

            <button
              type="button"
              onClick={handleRefillHearts}
              className="btn-tactile-primary"
              style={{ width: '100%', minHeight: '48px', gap: '6px' }}
              aria-label="เติมพลังใจแล้วลุยต่อ"
            >
              <span>เติมพลังใจแล้วลุยต่อ 🐰💪</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContainer;

/**
 * src/components/lesson/LessonView.tsx
 * Encapsulated Unit 1 Lesson View: Tab navigation, VocabCard stepper,
 * HanziWriterBox canvas, DialoguePlayer, GrammarBite, and QuizContainer.
 */

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, PenTool, MessageCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { VocabCard, DialoguePlayer, GrammarBite, QuizContainer, QuizResult } from './index';
import unit01Data from '../../data/lessons/tier1/unit01_greetings.json';
import { tier0Units } from '../../data/lessons/tier0';
import { tier2Units } from '../../data/lessons/tier2';
import {
  VocabularyItem,
  DialogueLine,
  GrammarBite as GrammarBiteData,
  ToneRule,
  QuizQuestion,
  BossChallenge,
  CheerTrophy,
} from '../../types/lesson';
import { playClick } from '../../engines/audio/audioEngine';

const HanziWriterBox = React.lazy(() =>
  import('../hanzi/HanziWriterBox').then((m) => ({ default: m.HanziWriterBox }))
);

const HanziWriterSkeleton: React.FC<{ size: number }> = ({ size }) => (
  <div
    className="animate-zen-pulse"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      margin: '0 auto',
      backgroundColor: 'var(--bg-rice-paper)',
      borderRadius: 'var(--radius-md)',
      border: '1.5px dashed var(--border-card)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)',
    }}
  >
    <div style={{ fontSize: '28px', opacity: 0.8 }}>🖌️</div>
    <span style={{ fontSize: '12px', color: 'var(--text-ink-muted)', fontWeight: 500 }}>
      ฝนหมึกเตรียมกระดาษข้าว...
    </span>
  </div>
);

export interface LessonViewProps {
  lessonId: string;
  silentMode: boolean;
  onBackToMap: () => void;
  onLessonComplete: (lessonId: string, xp: number) => void;
  currentHearts?: number;
  onHeartLost?: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lessonId,
  silentMode: _silentMode,
  onBackToMap,
  onLessonComplete,
  currentHearts,
  onHeartLost,
}) => {
  // Check if this is a Tier 0 lesson
  const t0Lesson = tier0Units.flatMap((u) => u.lessons).find((l) => l.lesson_id === lessonId);
  const isTier0 = Boolean(t0Lesson) || lessonId.startsWith('t0_');

  // Check if this is a Tier 2 lesson
  const t2Lesson = tier2Units.flatMap((u) => u.lessons).find((l) => l.lesson_id === lessonId);

  // Find lesson data by id or fallback to Tier 1 lesson 0
  const lessonData = t0Lesson
    ? {
        lesson_id: t0Lesson.lesson_id,
        title: t0Lesson.title,
        vocabulary: (t0Lesson.vocabulary || []) as unknown as VocabularyItem[],
        dialogue: [] as DialogueLine[],
        grammar_bite: {
          title: t0Lesson.baby_step_goal || 'พื้นฐานเสียงพินอิน',
          explanation_th: t0Lesson.can_do.th,
          patterns: [],
        } as GrammarBiteData,
        tone_rule: null as ToneRule | null,
        quizzes: (t0Lesson.quizzes || []) as QuizQuestion[],
        boss_challenge: undefined as BossChallenge | undefined,
        cheer_trophy: undefined as CheerTrophy | undefined,
      }
    : t2Lesson
    ? {
        lesson_id: t2Lesson.lesson_id,
        title: t2Lesson.title,
        vocabulary: (t2Lesson.vocabulary || []) as unknown as VocabularyItem[],
        dialogue: (t2Lesson.dialogue || []) as DialogueLine[],
        grammar_bite: t2Lesson.grammar_bite || {
          title: t2Lesson.baby_step_goal || 'ไวยากรณ์ขั้นกลาง',
          explanation_th: t2Lesson.can_do.th,
          patterns: [],
        },
        tone_rule: (t2Lesson.tone_rule || null) as ToneRule | null,
        quizzes: (t2Lesson.quizzes || []) as QuizQuestion[],
        boss_challenge: t2Lesson.boss_challenge as BossChallenge | undefined,
        cheer_trophy: t2Lesson.cheer_trophy as CheerTrophy | undefined,
      }
    : unit01Data.lessons.find((l) => l.lesson_id === lessonId) || unit01Data.lessons[0];

  const vocabList = lessonData.vocabulary as VocabularyItem[];
  const dialogue = lessonData.dialogue as DialogueLine[];
  const grammarBite = lessonData.grammar_bite as GrammarBiteData;
  const toneRule = (lessonData.tone_rule || null) as ToneRule | null;
  const quizzes = lessonData.quizzes as QuizQuestion[];
  const boss = lessonData.boss_challenge as BossChallenge;
  const trophy = lessonData.cheer_trophy as CheerTrophy;

  const [activeTab, setActiveTab] = useState<'vocab' | 'stroke' | 'dialogue' | 'grammar' | 'quiz'>('vocab');
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const [strokeChar, setStrokeChar] = useState<string>('你');
  const [canvasSize, setCanvasSize] = useState<number>(() =>
    typeof window !== 'undefined' ? Math.min(270, Math.max(220, window.innerWidth - 64)) : 270
  );

  const currentVocab = vocabList[vocabIndex] || vocabList[0];
  const isPlayingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(Math.min(270, Math.max(220, window.innerWidth - 64)));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleQuizComplete = (result: QuizResult) => {
    onLessonComplete(lessonData.lesson_id, result.xpEarned || 40);
  };

  const tabs = [
    { id: 'vocab', label: 'คำศัพท์', icon: BookOpen },
    { id: 'stroke', label: 'คัดลายมือ', icon: PenTool },
    { id: 'dialogue', label: 'บทสนทนา', icon: MessageCircle },
    { id: 'grammar', label: 'ไวยากรณ์', icon: Sparkles },
    { id: 'quiz', label: 'แบบทดสอบ', icon: Sparkles },
  ] as const;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        padding: '12px 12px 100px 12px',
        gap: '14px',
      }}
    >
      {/* Top Header Bar with Back Button */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={onBackToMap}
          data-testid="btn-back-to-map"
          className="btn-tactile-secondary"
          style={{ padding: '8px 12px', minHeight: '44px', gap: '6px' }}
        >
          <ArrowLeft size={18} />
          <span>แผนที่</span>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-ink-muted)', fontWeight: 600 }}>
            {isTier0 ? 'Tier 0 · ปูพื้นฐานพินอิน' : `Unit 01 · ${unit01Data.title.th}`}
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-ink-primary)' }}>
            {lessonData.title.th}
          </div>
        </div>

        <div style={{ width: '44px' }} />
      </div>

      {/* Navigation Tabs Pill */}
      <nav
        role="tablist"
        aria-label="แท็บส่วนประกอบบทเรียน"
        className="scrollable-tabs-pill"
        style={{
          display: 'flex',
          gap: '6px',
          width: '100%',
          backgroundColor: '#EDE8DF',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              data-testid={`tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => {
                playClick();
                setActiveTab(tab.id);
              }}
              style={{
                flex: '1 0 auto',
                minWidth: '64px',
                minHeight: '44px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? 'var(--color-jade-dark)' : 'var(--text-ink-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Tab 1: VocabCard */}
      {activeTab === 'vocab' && (
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {/* Word Pills Selector */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '2px 0' }}>
            {vocabList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playClick();
                  setVocabIndex(idx);
                }}
                style={{
                  padding: '6px 14px',
                  minHeight: '44px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid',
                  borderColor: vocabIndex === idx ? 'var(--color-jade-primary)' : 'var(--border-subtle)',
                  backgroundColor: vocabIndex === idx ? 'var(--color-jade-surface)' : '#FFFFFF',
                  color: vocabIndex === idx ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {item.hanzi}
              </button>
            ))}
          </div>

          <VocabCard key={currentVocab.id} vocab={currentVocab} />
        </main>
      )}

      {/* Tab 2: Hanzi Stroke Practice */}
      {activeTab === 'stroke' && (
        <main
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 16px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-ink-muted)', fontWeight: 600 }}>
              เลือกตัวอักษร:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(['你', '好'] as const).map((char) => (
                <button
                  key={char}
                  type="button"
                  onClick={() => {
                    playClick();
                    setStrokeChar(char);
                  }}
                  style={{
                    padding: '8px 14px',
                    minHeight: '44px',
                    minWidth: '44px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid',
                    borderColor: strokeChar === char ? 'var(--color-jade-primary)' : 'var(--border-subtle)',
                    backgroundColor: strokeChar === char ? 'var(--color-jade-surface)' : 'transparent',
                    color: strokeChar === char ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  {char} {char === '你' ? '(nǐ)' : '(hǎo)'}
                </button>
              ))}
            </div>
          </div>

          <React.Suspense fallback={<HanziWriterSkeleton size={canvasSize} />}>
            <HanziWriterBox
              character={strokeChar}
              size={canvasSize}
              onComplete={() => {
                if (isPlayingRef.current) return;
                isPlayingRef.current = true;
                setTimeout(() => {
                  isPlayingRef.current = false;
                }, 1000);
              }}
            />
          </React.Suspense>
        </main>
      )}

      {/* Tab 3: Dialogue Player */}
      {activeTab === 'dialogue' && (
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <DialoguePlayer dialogue={dialogue} title={`บทสนทนา: ${lessonData.title.th} 🐰👋`} />
        </main>
      )}

      {/* Tab 4: Grammar Bite */}
      {activeTab === 'grammar' && (
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <GrammarBite grammarBite={grammarBite} toneRule={toneRule} />
        </main>
      )}

      {/* Tab 5: Quiz Container */}
      {activeTab === 'quiz' && (
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <QuizContainer
            quizzes={quizzes}
            bossChallenge={boss}
            cheerTrophy={trophy}
            initialHearts={currentHearts ?? 5}
            isSafeZone={isTier0 || unit01Data.tier === 0}
            onComplete={handleQuizComplete}
            onHeartLost={onHeartLost}
          />
        </main>
      )}
    </div>
  );
};

/**
 * src/components/studio/MobilePreviewFrame.tsx
 * ---------------------------------------------------------------------------
 * Live Interactive Mobile Device Preview Component for Content Studio (TASK-604).
 *
 * Capabilities:
 * 1. Realistic Hardware Simulation: Dynamic island notch, status bar, screen bezel,
 *    and home indicator bar.
 * 2. Real Component Hot Simulation:
 *    - VocabCard (with carousel pager, 3D flip, stroke animator modal, tone marks)
 *    - DialoguePlayer (with full audio, scaffolding modes, tap-to-peek, play all)
 *    - QuizContainer (interactive answer selection, SFX, instant replay reset)
 *    - AudioPreviewSandbox (live Mandarin audio laboratory)
 * 3. Auto-Sync with Studio Tabs: Automatically shifts preview mode when author
 *    navigates tabs in StudioNavbar, with manual override pills.
 * 4. Resilient Boundary & Red Team Chaos Guards:
 *    - Empty state fallbacks for 0 items (no blank screens)
 *    - Bounds clamping on deletions
 *    - Long string overflow isolation
 *    - 100% clean teardown on unmount
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Types, Zero 'any', Zero Memory Leaks.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Wifi,
  Battery,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  X,
  Smartphone,
} from 'lucide-react';
import {
  Lesson,
  VocabularyItem,
  QuizQuestion,
  MultipleChoiceQuiz,
  SentenceScrambleQuiz,
} from '../../types/lesson';
import {
  StudioLessonDraft,
  StudioVocabDraft,
  StudioQuizDraft,
} from '../../engines/studio/studioTypes';
import { StudioTab } from './StudioNavbar';
import { VocabCard } from '../lesson/VocabCard';
import { DialoguePlayer } from '../lesson/DialoguePlayer';
import { QuizContainer } from '../lesson/QuizContainer';
import { AudioPreviewSandbox } from './AudioPreviewSandbox';

export type PreviewMode = 'overview' | 'vocab' | 'dialogue' | 'quiz' | 'audio';

export interface MobilePreviewFrameProps {
  lesson: StudioLessonDraft | Lesson;
  tier?: number;
  unitNumber?: number;
  activeStudioTab?: StudioTab;
  onCloseDrawer?: () => void;
  isDrawer?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function toVocabularyItem(v: StudioVocabDraft | VocabularyItem): VocabularyItem {
  return {
    id: v.id || 'vocab-preview',
    hanzi: v.hanzi || '',
    pinyin: v.pinyin || '',
    pinyin_tone: v.pinyin_tone || '',
    meaning_th: v.meaning_th || '',
    meaning_en: v.meaning_en || '',
    radical: v.radical || '',
    radical_name_th: v.radical_name_th || '',
    stroke_count: typeof v.stroke_count === 'number' ? v.stroke_count : 1,
    mnemonic: v.mnemonic || '',
    kid_mnemonic: v.kid_mnemonic || '',
    body_gesture: v.body_gesture || '',
    display_pinyin: v.display_pinyin,
    sandhi_rule: v.sandhi_rule,
    writing_note: v.writing_note,
    example_sentence: v.example_sentence,
  };
}

function toQuizQuestions(quizzes: Array<StudioQuizDraft | QuizQuestion>): QuizQuestion[] {
  return quizzes.map((q) => {
    if (q.type === 'sentence_scramble') {
      const sq = q as Partial<SentenceScrambleQuiz>;
      return {
        type: 'sentence_scramble',
        question_th: q.question_th || 'เรียงประโยคให้ถูกต้อง',
        explanation_th: q.explanation_th || '',
        encouragement: q.encouragement || 'ยอดเยี่ยม!',
        tokens: sq.tokens || [],
        correct_sequence: sq.correct_sequence || [],
        pinyin: sq.pinyin || '',
        meaning_th: sq.meaning_th || '',
      } as SentenceScrambleQuiz;
    }
    const mq = q as Partial<MultipleChoiceQuiz>;
    return {
      type: (q.type || 'meaning_match') as MultipleChoiceQuiz['type'],
      question_th: q.question_th || '',
      explanation_th: q.explanation_th || '',
      encouragement: q.encouragement || 'ยอดเยี่ยม!',
      options: mq.options || [],
      correct_index: typeof mq.correct_index === 'number' ? mq.correct_index : 0,
      target_audio: mq.target_audio,
    } as MultipleChoiceQuiz;
  });
}

export const MobilePreviewFrame: React.FC<MobilePreviewFrameProps> = ({
  lesson,
  tier = 1,
  unitNumber = 1,
  activeStudioTab = 'metadata',
  onCloseDrawer,
  isDrawer = false,
  className = '',
  style = {},
}) => {
  // Determine initial preview mode from active studio tab
  const tabToMode = useCallback((tab: StudioTab): PreviewMode => {
    switch (tab) {
      case 'vocab':
        return 'vocab';
      case 'dialogue':
        return 'dialogue';
      case 'quiz':
        return 'quiz';
      case 'metadata':
      case 'review':
      default:
        return 'overview';
    }
  }, []);

  const [mode, setMode] = useState<PreviewMode>(() => tabToMode(activeStudioTab));
  const [activeVocabIndex, setActiveVocabIndex] = useState<number>(0);
  const [quizAttemptKey, setQuizAttemptKey] = useState<number>(0);

  // Sync mode when parent activeStudioTab changes
  useEffect(() => {
    setMode(tabToMode(activeStudioTab));
  }, [activeStudioTab, tabToMode]);

  // Clamp activeVocabIndex if items are deleted
  const vocabList = useMemo(() => lesson.vocabulary || [], [lesson.vocabulary]);
  useEffect(() => {
    if (activeVocabIndex >= vocabList.length && vocabList.length > 0) {
      setActiveVocabIndex(vocabList.length - 1);
    }
  }, [vocabList.length, activeVocabIndex]);

  const currentVocab = vocabList[activeVocabIndex] || null;

  // Handle Next / Prev Vocab
  const handleNextVocab = useCallback(() => {
    if (vocabList.length === 0) return;
    setActiveVocabIndex((prev) => (prev + 1) % vocabList.length);
  }, [vocabList.length]);

  const handlePrevVocab = useCallback(() => {
    if (vocabList.length === 0) return;
    setActiveVocabIndex((prev) => (prev - 1 + vocabList.length) % vocabList.length);
  }, [vocabList.length]);

  // Handle Reset Quiz
  const handleResetQuiz = useCallback(() => {
    setQuizAttemptKey((prev) => prev + 1);
  }, []);

  return (
    <div
      className={`mobile-preview-frame-wrapper ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        ...style,
      }}
    >
      {/* Device Frame Top Label & Drawer Close Button */}
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          padding: '0 8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Smartphone size={16} color="var(--color-jade-primary, #1B7A4E)" />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-ink-secondary, #4B5563)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Live Mobile Simulation
          </span>
          <span
            style={{
              fontSize: '10px',
              padding: '2px 6px',
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              borderRadius: '999px',
              fontWeight: 700,
            }}
          >
            60 FPS
          </span>
        </div>

        {isDrawer && onCloseDrawer && (
          <button
            type="button"
            data-testid="close-preview-drawer-btn"
            onClick={onCloseDrawer}
            aria-label="ปิดพรีวิว"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              color: '#4B5563',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Outer Smartphone Chassis */}
      <div
        data-testid="mobile-device-chassis"
        style={{
          width: '100%',
          maxWidth: '380px',
          height: '740px',
          backgroundColor: '#111827',
          borderRadius: '44px',
          padding: '10px',
          boxShadow:
            '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Inner Simulated Screen */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-rice-paper, #FAF8F5)',
            borderRadius: '34px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Hardware Notch / Dynamic Island */}
          <div
            style={{
              height: '32px',
              backgroundColor: '#FAF8F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
              userSelect: 'none',
              zIndex: 30,
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937' }}>
              9:41
            </span>
            {/* Dynamic Island pill */}
            <div
              data-testid="dynamic-island-notch"
              style={{
                width: '88px',
                height: '18px',
                backgroundColor: '#111827',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#1F2937',
                  marginRight: '24px',
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1F2937' }}>
              <Wifi size={12} />
              <Battery size={14} />
            </div>
          </div>

          {/* Mode Switcher Pills */}
          <div
            data-testid="preview-mode-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid #E5E7EB',
              padding: '6px 8px',
              gap: '4px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              zIndex: 20,
            }}
          >
            <button
              type="button"
              data-testid="preview-tab-overview"
              onClick={() => setMode('overview')}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: mode === 'overview' ? '#ECFDF5' : 'transparent',
                color: mode === 'overview' ? '#065F46' : '#6B7280',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              📖 ภาพรวม
            </button>
            <button
              type="button"
              data-testid="preview-tab-vocab"
              onClick={() => setMode('vocab')}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: mode === 'vocab' ? '#ECFDF5' : 'transparent',
                color: mode === 'vocab' ? '#065F46' : '#6B7280',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              📇 คำศัพท์ ({lesson.vocabulary?.length || 0})
            </button>
            <button
              type="button"
              data-testid="preview-tab-dialogue"
              onClick={() => setMode('dialogue')}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: mode === 'dialogue' ? '#ECFDF5' : 'transparent',
                color: mode === 'dialogue' ? '#065F46' : '#6B7280',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              💬 บทพูด ({lesson.dialogue?.length || 0})
            </button>
            <button
              type="button"
              data-testid="preview-tab-quiz"
              onClick={() => setMode('quiz')}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: mode === 'quiz' ? '#ECFDF5' : 'transparent',
                color: mode === 'quiz' ? '#065F46' : '#6B7280',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              🧩 ควิซ ({lesson.quizzes?.length || 0})
            </button>
            <button
              type="button"
              data-testid="preview-tab-audio"
              onClick={() => setMode('audio')}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: mode === 'audio' ? '#ECFDF5' : 'transparent',
                color: mode === 'audio' ? '#065F46' : '#6B7280',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              🔊 เสียง
            </button>
          </div>

          {/* Scrollable Screen Content */}
          <div
            data-testid="mobile-screen-scroll-container"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* VIEW 1: OVERVIEW */}
            {mode === 'overview' && (
              <div
                data-testid="preview-view-overview"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '8px 0',
                }}
              >
                {/* Lesson Header Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: '#ECFDF5',
                      color: '#065F46',
                      fontSize: '11px',
                      fontWeight: 700,
                      marginBottom: '8px',
                    }}
                  >
                    <Sparkles size={12} />
                    <span>
                      Tier {tier} • Unit {unitNumber}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 800,
                      color: '#111827',
                      margin: '0 0 4px 0',
                      wordBreak: 'break-word',
                    }}
                  >
                    {lesson.title?.th || 'ยังไม่มีชื่อบทเรียน'}
                  </h3>
                  <div
                    style={{
                      fontSize: '16px',
                      color: 'var(--color-jade-primary, #1B7A4E)',
                      fontFamily: '"LXGW WenKai", "Noto Sans SC", sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {lesson.title?.zh || ''}
                  </div>
                  {lesson.title?.en && (
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                      {lesson.title.en}
                    </div>
                  )}
                </div>

                {/* Content Stat Cards */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                  }}
                >
                  <div
                    onClick={() => setMode('vocab')}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '12px 8px',
                      textAlign: 'center',
                      border: '1px solid #E5E7EB',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#1B7A4E' }}>
                      {lesson.vocabulary?.length || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
                      คำศัพท์
                    </div>
                  </div>

                  <div
                    onClick={() => setMode('dialogue')}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '12px 8px',
                      textAlign: 'center',
                      border: '1px solid #E5E7EB',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563EB' }}>
                      {lesson.dialogue?.length || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
                      บทพูด
                    </div>
                  </div>

                  <div
                    onClick={() => setMode('quiz')}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '12px 8px',
                      textAlign: 'center',
                      border: '1px solid #E5E7EB',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#D97706' }}>
                      {lesson.quizzes?.length || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
                      ควิซ
                    </div>
                  </div>
                </div>

                {/* Learning Journey Preview Prompt */}
                <div
                  style={{
                    backgroundColor: '#FEF3C7',
                    borderRadius: '12px',
                    padding: '12px',
                    border: '1px solid #FDE68A',
                    fontSize: '12px',
                    color: '#92400E',
                    lineHeight: '1.4',
                  }}
                >
                  💡 <strong>พรีวิวแบบเรียลไทม์:</strong>{' '}
                  เลือกแท็บด้านบนเพื่อทดสอบการแสดงผลและเสียงของการ์ดคำศัพท์ บทสนทนา หรือแบบฝึกหัดจริง!
                </div>
              </div>
            )}

            {/* VIEW 2: VOCABULARY */}
            {mode === 'vocab' && (
              <div
                data-testid="preview-view-vocab"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '4px 0',
                }}
              >
                {vocabList.length === 0 ? (
                  <div
                    data-testid="vocab-empty-state"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '36px 16px',
                      textAlign: 'center',
                      border: '1px solid #E5E7EB',
                      color: '#6B7280',
                      marginTop: '20px',
                    }}
                  >
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>🐰</div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px 0', color: '#111827' }}>
                      ยังไม่มีคำศัพท์
                    </h4>
                    <p style={{ fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
                      เพิ่มคำศัพท์ในแบบฟอร์มด้านซ้ายเพื่อดูการ์ดคำศัพท์จำลองแบบอินเทอร์แอ็กทีฟได้ทันที
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Carousel Pager Controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '6px 12px',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      <button
                        type="button"
                        data-testid="prev-vocab-btn"
                        onClick={handlePrevVocab}
                        aria-label="คำศัพท์ก่อนหน้า"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: '#F9FAFB',
                          cursor: 'pointer',
                        }}
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <div style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#111827',
                          }}
                        >
                          คำที่ {activeVocabIndex + 1} / {vocabList.length}
                        </span>
                        <div
                          style={{
                            fontSize: '11px',
                            color: 'var(--color-jade-primary, #1B7A4E)',
                            fontWeight: 600,
                            fontFamily: '"LXGW WenKai", "Noto Sans SC", sans-serif',
                          }}
                        >
                          {currentVocab?.hanzi}
                        </div>
                      </div>

                      <button
                        type="button"
                        data-testid="next-vocab-btn"
                        onClick={handleNextVocab}
                        aria-label="คำศัพท์ถัดไป"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: '#F9FAFB',
                          cursor: 'pointer',
                        }}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    {/* Actual Real VocabCard Component */}
                    {currentVocab && (
                      <div data-testid="live-vocab-card-wrapper">
                        <VocabCard
                          vocab={toVocabularyItem(currentVocab)}
                          initialPinyinMode="full"
                          initialFlipped={false}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* VIEW 3: DIALOGUE */}
            {mode === 'dialogue' && (
              <div
                data-testid="preview-view-dialogue"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '4px 0',
                }}
              >
                {!lesson.dialogue || lesson.dialogue.length === 0 ? (
                  <div
                    data-testid="dialogue-empty-state"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '36px 16px',
                      textAlign: 'center',
                      border: '1px solid #E5E7EB',
                      color: '#6B7280',
                      marginTop: '20px',
                    }}
                  >
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>💬</div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px 0', color: '#111827' }}>
                      ยังไม่มีบทสนทนา
                    </h4>
                    <p style={{ fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
                      เพิ่มประโยคบทพูดในแบบฟอร์มด้านซ้ายเพื่อทดลองฟังและเล่นบทสนทนาโต้ตอบจำลอง
                    </p>
                  </div>
                ) : (
                  <div data-testid="live-dialogue-player-wrapper">
                    <DialoguePlayer
                      dialogue={lesson.dialogue}
                      title={lesson.title?.th || 'บทสนทนาจำลอง'}
                    />
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: QUIZ */}
            {mode === 'quiz' && (
              <div
                data-testid="preview-view-quiz"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '4px 0',
                }}
              >
                {!lesson.quizzes || lesson.quizzes.length === 0 ? (
                  <div
                    data-testid="quiz-empty-state"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '36px 16px',
                      textAlign: 'center',
                      border: '1px solid #E5E7EB',
                      color: '#6B7280',
                      marginTop: '20px',
                    }}
                  >
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>🧩</div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px 0', color: '#111827' }}>
                      ยังไม่มีแบบฝึกหัด
                    </h4>
                    <p style={{ fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
                      สร้างข้อสอบในแบบฟอร์มด้านซ้ายเพื่อทดลองทำข้อสอบและตรวจเอฟเฟกต์เฉลยสด
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Reset Quiz Controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '6px 12px',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>
                        แบบฝึกหัด ({lesson.quizzes.length} ข้อ)
                      </span>
                      <button
                        type="button"
                        data-testid="reset-quiz-preview-btn"
                        onClick={handleResetQuiz}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: '#F9FAFB',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#4B5563',
                          cursor: 'pointer',
                        }}
                      >
                        <RotateCcw size={13} />
                        <span>เริ่มใหม่</span>
                      </button>
                    </div>

                    {/* Live Real QuizContainer Component */}
                    <div data-testid="live-quiz-container-wrapper">
                      <QuizContainer
                        key={quizAttemptKey}
                        quizzes={toQuizQuestions(lesson.quizzes || [])}
                        isSafeZone={true}
                        shuffleOptions={false}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* VIEW 5: AUDIO SANDBOX */}
            {mode === 'audio' && (
              <div
                data-testid="preview-view-audio"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '4px 0',
                }}
              >
                <AudioPreviewSandbox
                  sampleWords={lesson.vocabulary?.map((v) => v.hanzi) || []}
                />
              </div>
            )}
          </div>

          {/* Bottom Home Indicator */}
          <div
            style={{
              height: '20px',
              backgroundColor: '#FAF8F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 30,
            }}
          >
            <div
              style={{
                width: '120px',
                height: '4px',
                backgroundColor: '#9CA3AF',
                borderRadius: '999px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

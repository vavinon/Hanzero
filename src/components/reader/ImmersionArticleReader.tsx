/**
 * src/components/reader/ImmersionArticleReader.tsx
 * Modern Oriental Immersion Article Reader with Intl.Segmenter,
 * HSK 3.0 Heatmap, 3-mode Dynamic Pinyin, Slide-up Bottom Sheet,
 * and Deterministic SRS Fast Bridge.
 *
 * Adheres strictly to AGENTS.md §4.2, UX/UI, Pedagogical & Technical QA standards.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Volume2,
  BookmarkCheck,
  Plus,
  X,
  BookOpen,
  CheckCircle2,
  XCircle,
  Flame,
  Award,
} from 'lucide-react';
import {
  PinyinMode,
  SegmentedToken,
} from '../../types/reader';
import {
  segmentArticleText,
  analyzeArticleHSKDistribution,
  createSRSItemFromToken,
  generateReaderCardId,
} from '../../engines/reader/immersionReaderEngine';
import { speak, stopSpeaking, playClick, playCorrect } from '../../engines/audio/audioEngine';
import { IMMERSION_ARTICLES } from '../../data/articles/immersionArticles';

export interface ImmersionArticleReaderProps {
  initialArticleId?: string;
  onBack?: () => void;
  onAddSRS?: (item: {
    word_id: string;
    hanzi: string;
    pinyin: string;
    display_pinyin?: string;
    meaning_th: string;
    meaning_en: string;
    mnemonic?: string;
  }) => Promise<void> | void;
  existingSrsCardIds?: string[];
  existingSrsHanzis?: string[];
}

export const ImmersionArticleReader: React.FC<ImmersionArticleReaderProps> = ({
  initialArticleId = 'art_tier3_01_business_contract',
  onBack,
  onAddSRS,
  existingSrsCardIds = [],
  existingSrsHanzis = [],
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(initialArticleId);
  const [pinyinMode, setPinyinMode] = useState<PinyinMode>('pure');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [selectedToken, setSelectedToken] = useState<SegmentedToken | null>(null);
  const [addedWords, setAddedWords] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isSpeakingWord, setIsSpeakingWord] = useState<boolean>(false);

  // Active article lookup
  const article = useMemo(() => {
    return (
      IMMERSION_ARTICLES.find((a) => a.id === selectedArticleId) ||
      IMMERSION_ARTICLES[0]
    );
  }, [selectedArticleId]);

  // Memoized tokenization: runs once per article change, not on UI state toggles
  const tokens = useMemo(() => {
    return segmentArticleText(article.content, {
      pinyinOverrides: article.pinyinOverrides,
    });
  }, [article.content, article.pinyinOverrides]);

  // Memoized HSK 3.0 stats
  const distribution = useMemo(() => {
    return analyzeArticleHSKDistribution(tokens);
  }, [tokens]);

  // Break tokens into paragraphs for 60fps chunking & content-visibility
  const paragraphs = useMemo(() => {
    const pList: SegmentedToken[][] = [];
    let currentP: SegmentedToken[] = [];

    for (const t of tokens) {
      if (t.text.includes('\n')) {
        const splitParts = t.text.split('\n');
        for (let i = 0; i < splitParts.length; i++) {
          if (splitParts[i]) {
            currentP.push({ ...t, text: splitParts[i] });
          }
          if (i < splitParts.length - 1) {
            if (currentP.length > 0) {
              pList.push(currentP);
              currentP = [];
            }
          }
        }
      } else {
        currentP.push(t);
      }
    }
    if (currentP.length > 0) {
      pList.push(currentP);
    }
    return pList;
  }, [tokens]);

  // Audio cleanup on unmount or article switch
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [selectedArticleId]);

  // Body scroll lock when bottom sheet is open
  useEffect(() => {
    if (selectedToken) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedToken]);

  // Check if token is already saved in SRS
  const isTokenInSRS = useCallback(
    (tokenText: string) => {
      const candidateId = generateReaderCardId(tokenText);
      return (
        addedWords.has(tokenText) ||
        existingSrsCardIds.includes(candidateId) ||
        existingSrsHanzis.includes(tokenText)
      );
    },
    [addedWords, existingSrsCardIds, existingSrsHanzis]
  );

  const handleTokenClick = (token: SegmentedToken) => {
    if (!token.isWord) return;
    playClick();
    setSelectedToken(token);
    void speak(token.text);
  };

  const handleCloseModal = () => {
    stopSpeaking();
    setSelectedToken(null);
  };

  const handleSpeakCurrent = async () => {
    if (!selectedToken) return;
    setIsSpeakingWord(true);
    await speak(selectedToken.text);
    setIsSpeakingWord(false);
  };

  const handleAddSrsCard = async () => {
    if (!selectedToken) return;
    const srsItem = createSRSItemFromToken(selectedToken);

    if (onAddSRS) {
      await onAddSRS(srsItem);
    }

    setAddedWords((prev) => new Set(prev).add(selectedToken.text));
    playCorrect();

    setToastMessage(`บันทึก "${selectedToken.text}" เข้าคลังทบทวนเรียบร้อยแล้ว 🐰✨`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    playClick();
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Helper for Muted Oriental Tint Heatmap styling
  const getTokenHeatmapStyle = (token: SegmentedToken): React.CSSProperties => {
    if (!showHeatmap || !token.isWord) return {};

    if (token.is_domain_term) {
      return {
        backgroundColor: 'rgba(241, 245, 249, 0.85)',
        color: '#0f172a',
        borderBottom: '2px solid #94a3b8',
      };
    }

    if (token.hsk_level >= 7) {
      return {
        backgroundColor: 'rgba(243, 232, 255, 0.85)',
        color: '#581c87',
        borderBottom: '2px solid #c084fc',
      };
    }

    if (token.hsk_level >= 5) {
      return {
        backgroundColor: 'rgba(254, 243, 199, 0.85)',
        color: '#78350f',
        borderBottom: '2px solid #fbbf24',
      };
    }

    if (token.hsk_level >= 3) {
      return {
        backgroundColor: 'rgba(236, 253, 245, 0.85)',
        color: '#064e3b',
        borderBottom: '2px solid #34d399',
      };
    }

    // HSK 1-2: Normal ink, no background tint
    return {};
  };

  return (
    <div
      style={{
        maxWidth: 'var(--max-app-width, 440px)',
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-rice-paper, #FBF9F5)',
        color: 'var(--text-ink-primary, #1C1E21)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        paddingBottom: '80px',
      }}
    >
      {/* Top Header Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'rgba(251, 249, 245, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--border-subtle, #EAE5DE)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {onBack && (
            <button
              onClick={() => {
                playClick();
                onBack();
              }}
              aria-label="ย้อนกลับ"
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-ink-secondary, #525866)',
              }}
            >
              ← กลับ
            </button>
          )}
          <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>
            📖 Immersion Reader
          </span>
        </div>

        {/* Article Dropdown Selector */}
        <select
          value={selectedArticleId}
          onChange={(e) => {
            playClick();
            setSelectedArticleId(e.target.value);
            setQuizAnswers({});
          }}
          aria-label="เลือกบทความ"
          style={{
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm, 10px)',
            border: '1px solid var(--border-card, #E2DBD0)',
            backgroundColor: '#FFFFFF',
            fontSize: '0.85rem',
            maxWidth: '180px',
            color: 'var(--text-ink-primary, #1C1E21)',
            cursor: 'pointer',
          }}
        >
          {IMMERSION_ARTICLES.map((art) => (
            <option key={art.id} value={art.id}>
              {art.title}
            </option>
          ))}
        </select>
      </header>

      {/* Control Strip (Pinyin Mode + HSK Heatmap Toggle) */}
      <div
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-subtle, #EAE5DE)',
        }}
      >
        {/* Pinyin Modes */}
        <div
          role="radiogroup"
          aria-label="โหมดแสดงพินอิน"
          style={{
            display: 'inline-flex',
            backgroundColor: 'var(--bg-card-subtle, #F5F1EA)',
            padding: '3px',
            borderRadius: 'var(--radius-full, 9999px)',
            gap: '2px',
          }}
        >
          {(['pure', 'ruby', 'tap'] as PinyinMode[]).map((mode) => {
            const isActive = pinyinMode === mode;
            const labels: Record<PinyinMode, string> = {
              pure: '纯 Pure',
              ruby: '拼 Ruby',
              tap: '点 Tap',
            };
            return (
              <button
                key={mode}
                onClick={() => {
                  playClick();
                  setPinyinMode(mode);
                }}
                role="radio"
                aria-checked={isActive}
                style={{
                  border: 'none',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive
                    ? 'var(--color-jade-deep, #047857)'
                    : 'var(--text-ink-secondary, #525866)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.78rem',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 150ms ease',
                }}
              >
                {labels[mode]}
              </button>
            );
          })}
        </div>

        {/* HSK Heatmap Switch */}
        <button
          onClick={() => {
            playClick();
            setShowHeatmap(!showHeatmap);
          }}
          aria-pressed={showHeatmap}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 10px',
            borderRadius: '9999px',
            border: '1px solid',
            borderColor: showHeatmap
              ? 'var(--color-ochre, #D97706)'
              : 'var(--border-subtle, #EAE5DE)',
            backgroundColor: showHeatmap
              ? 'var(--color-ochre-surface, #FFFBEB)'
              : '#FFFFFF',
            color: showHeatmap
              ? 'var(--color-ochre-accessible, #B45309)'
              : 'var(--text-ink-secondary, #525866)',
            fontSize: '0.8rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 150ms ease',
          }}
        >
          <Flame size={14} />
          <span>HSK Heatmap</span>
        </button>
      </div>

      {/* Article Stats & Readability Banner */}
      <div style={{ padding: '16px 16px 0 16px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md, 16px)',
            padding: '14px 16px',
            border: '1px solid var(--border-card, #E2DBD0)',
            boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 30, 33, 0.04))',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--color-jade-deep, #047857)',
                backgroundColor: 'var(--color-jade-surface, #ECFDF5)',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
            >
              {article.hskLevel} · {article.category}
            </span>
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-ink-secondary, #525866)',
              }}
            >
              ⏱️ ~{article.readTimeMinutes} นาที ({distribution.totalWords} คำ)
            </span>
          </div>

          <h1
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              fontFamily: 'var(--font-hanzi-hero, "Noto Sans SC", sans-serif)',
              lineHeight: 1.35,
              marginBottom: '4px',
              color: 'var(--text-ink-primary, #1C1E21)',
            }}
          >
            {article.title}
          </h1>
          <div
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-ink-secondary, #525866)',
              fontFamily: 'var(--font-thai, "Prompt", sans-serif)',
              marginBottom: '10px',
            }}
          >
            {article.title_th}
          </div>

          {/* Heatmap Legend Bar */}
          {showHeatmap && (
            <div
              style={{
                marginTop: '10px',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-subtle, #EAE5DE)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.74rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: '#34d399' }} />
                <span>HSK 3-4 ({distribution.percentages.hsk3_4}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: '#fbbf24' }} />
                <span>HSK 5-6 ({distribution.percentages.hsk5_6}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: '#c084fc' }} />
                <span>HSK 7-9 ({distribution.percentages.hsk7_9}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: '#94a3b8' }} />
                <span>Domain ({distribution.percentages.domain}%)</span>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  fontWeight: 600,
                  color: 'var(--color-ochre-accessible, #B45309)',
                }}
              >
                คะแนนความยาก: {distribution.readabilityScore}/100
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reading Canvas (Paragraph Blocks with Event Delegation) */}
      <main
        style={{
          padding: '16px',
          fontSize: '1.18rem',
          fontFamily: 'var(--font-hanzi-card, "Noto Sans SC", sans-serif)',
          lineHeight: pinyinMode === 'ruby' ? '2.55em' : '2.0em',
        }}
      >
        {paragraphs.map((pTokens, pIdx) => (
          <p
            key={pIdx}
            style={{
              marginBottom: '20px',
              textIndent: '2em',
              contentVisibility: 'auto',
              containIntrinsicSize: '150px',
            }}
          >
            {pTokens.map((token, tIdx) => {
              if (!token.isWord) {
                // Flattened punctuation / space: plain text without click wrapper
                return <span key={tIdx}>{token.text}</span>;
              }

              const isSaved = isTokenInSRS(token.text);
              const heatmapStyle = getTokenHeatmapStyle(token);

              if (pinyinMode === 'ruby' && token.pinyin) {
                return (
                  <ruby
                    key={tIdx}
                    onClick={() => handleTokenClick(token)}
                    data-testid={`token-${token.text}`}
                    style={{
                      rubyPosition: 'over',
                      rubyAlign: 'center',
                      margin: '0 2px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      padding: '2px 3px',
                      position: 'relative',
                      ...heatmapStyle,
                    }}
                  >
                    {token.text}
                    <rt
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.58em',
                        fontWeight: 500,
                        color: '#78716c',
                        userSelect: 'none',
                        lineHeight: 1.2,
                        transform: 'translateY(-2px)',
                      }}
                    >
                      {token.pinyin}
                    </rt>
                  </ruby>
                );
              }

              return (
                <span
                  key={tIdx}
                  onClick={() => handleTokenClick(token)}
                  data-testid={`token-${token.text}`}
                  style={{
                    display: 'inline-block',
                    cursor: 'pointer',
                    padding: '1px 3px',
                    margin: '1px 1px',
                    borderRadius: '4px',
                    position: 'relative',
                    transition: 'background-color 150ms ease',
                    ...heatmapStyle,
                  }}
                  title={pinyinMode === 'tap' ? 'แตะเพื่อดูพินอินและความหมาย' : undefined}
                >
                  {token.text}
                  {isSaved && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -4,
                        right: -4,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-jade-primary, #059669)',
                      }}
                    />
                  )}
                </span>
              );
            })}
          </p>
        ))}

        {/* Thai Summary Accordion */}
        <section
          style={{
            marginTop: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md, 16px)',
            border: '1px solid var(--border-card, #E2DBD0)',
            padding: '14px 16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.92rem',
              color: 'var(--text-ink-primary, #1C1E21)',
              marginBottom: '6px',
            }}
          >
            <BookOpen size={16} color="var(--color-jade-deep, #047857)" />
            <span>สรุปใจความสำคัญ (Summary)</span>
          </div>
          <p
            style={{
              fontSize: '0.85rem',
              lineHeight: 1.6,
              color: 'var(--text-ink-secondary, #525866)',
              fontFamily: 'var(--font-thai, "Prompt", sans-serif)',
            }}
          >
            {article.summary_th}
          </p>
        </section>

        {/* Comprehension Mini-Quiz Section */}
        {article.quizzes && article.quizzes.length > 0 && (
          <section
            style={{
              marginTop: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md, 16px)',
              border: '1px solid var(--border-card, #E2DBD0)',
              padding: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text-ink-primary, #1C1E21)',
                marginBottom: '12px',
              }}
            >
              <Award size={18} color="var(--color-ochre-accessible, #B45309)" />
              <span>แบบทดสอบความเข้าใจ (Mini-Quiz)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {article.quizzes.map((quiz, qIdx) => {
                const selectedOption = quizAnswers[quiz.id];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = selectedOption === quiz.correct_index;

                const categoryLabels: Record<string, string> = {
                  fact: 'ข้อเท็จจริง (Fact)',
                  inference: 'การอนุมาน (Inference)',
                  main_idea: 'ใจความหลัก (Main Idea)',
                };

                return (
                  <div
                    key={quiz.id}
                    style={{
                      padding: '12px',
                      backgroundColor: 'var(--bg-card-subtle, #F5F1EA)',
                      borderRadius: 'var(--radius-sm, 10px)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: 'var(--text-ink-muted, #9CA3AF)',
                        }}
                      >
                        ข้อ {qIdx + 1} · {categoryLabels[quiz.category] || quiz.category}
                      </span>
                      {isAnswered && (
                        <span
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: isCorrect
                              ? 'var(--color-jade-deep, #047857)'
                              : 'var(--color-vermilion, #DC2626)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 size={14} /> ถูกต้อง!
                            </>
                          ) : (
                            <>
                              <XCircle size={14} /> ยังไม่ถูกต้อง
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: 'var(--text-ink-primary, #1C1E21)',
                        fontFamily: 'var(--font-thai, "Prompt", sans-serif)',
                        marginBottom: '10px',
                      }}
                    >
                      {quiz.question_th}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {quiz.options.map((opt, oIdx) => {
                        const isChosen = selectedOption === oIdx;
                        let btnBg = '#FFFFFF';
                        let btnBorder = 'var(--border-subtle, #EAE5DE)';

                        if (isAnswered) {
                          if (oIdx === quiz.correct_index) {
                            btnBg = 'var(--color-jade-surface, #ECFDF5)';
                            btnBorder = 'var(--color-jade-primary, #059669)';
                          } else if (isChosen) {
                            btnBg = 'var(--color-vermilion-surface, #FEF2F2)';
                            btnBorder = 'var(--color-vermilion, #DC2626)';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectQuizOption(quiz.id, oIdx)}
                            disabled={isAnswered}
                            style={{
                              textAlign: 'left',
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: `1px solid ${btnBorder}`,
                              backgroundColor: btnBg,
                              fontSize: '0.82rem',
                              color: 'var(--text-ink-primary, #1C1E21)',
                              cursor: isAnswered ? 'default' : 'pointer',
                              fontFamily: 'var(--font-thai, "Prompt", sans-serif)',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '6px',
                            }}
                          >
                            <span style={{ fontWeight: 600, minWidth: '18px' }}>
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div
                        style={{
                          marginTop: '8px',
                          padding: '8px 10px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          color: 'var(--text-ink-secondary, #525866)',
                          lineHeight: 1.5,
                        }}
                      >
                        💡 <strong>คำอธิบาย:</strong> {quiz.explanation_th}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Slide-Up Bottom Sheet (Tap-to-Inspect Modal) */}
      {selectedToken && (
        <>
          {/* Backdrop */}
          <div
            onClick={handleCloseModal}
            data-testid="modal-backdrop"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(28, 25, 23, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 40,
            }}
          />

          {/* Bottom Sheet Box */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`คำศัพท์ ${selectedToken.text}`}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              margin: '0 auto',
              maxWidth: 'var(--max-app-width, 440px)',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              boxShadow: 'var(--shadow-floating, 0 16px 40px -6px rgba(44, 34, 20, 0.12))',
              zIndex: 50,
              padding: '12px 20px calc(20px + env(safe-area-inset-bottom, 16px)) 20px',
              maxHeight: '82dvh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Drag Handle Bar */}
            <div
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: 'var(--border-card, #E2DBD0)',
                borderRadius: '9999px',
                margin: '0 auto 12px auto',
              }}
            />

            {/* Header: Hanzi + Audio + Close */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2
                  style={{
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-hanzi-hero, "Noto Sans SC", sans-serif)',
                    color: 'var(--text-ink-primary, #1C1E21)',
                    margin: 0,
                  }}
                >
                  {selectedToken.text}
                </h2>

                <button
                  onClick={handleSpeakCurrent}
                  aria-label="ฟังเสียงอ่าน"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-jade-surface, #ECFDF5)',
                    border: '1px solid var(--color-jade-primary, #059669)',
                    color: 'var(--color-jade-deep, #047857)',
                    cursor: 'pointer',
                    transition: 'transform 100ms ease, opacity 150ms ease',
                    opacity: isSpeakingWord ? 0.6 : 1,
                  }}
                >
                  <Volume2 size={20} />
                </button>
              </div>

              <button
                onClick={handleCloseModal}
                aria-label="ปิดหน้าต่าง"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-ink-muted, #9CA3AF)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '50%',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Pinyin & Level Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  fontSize: '1.25rem',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--color-jade-deep, #047857)',
                  fontWeight: 600,
                }}
              >
                {selectedToken.pinyin}
              </span>

              {selectedToken.hsk_level > 0 && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-card-subtle, #F5F1EA)',
                    color: 'var(--text-ink-secondary, #525866)',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-subtle, #EAE5DE)',
                  }}
                >
                  {selectedToken.is_domain_term
                    ? 'Domain Term'
                    : selectedToken.hsk_level >= 7
                    ? 'HSK 7-9 (高等)'
                    : `HSK ${selectedToken.hsk_level}`}
                </span>
              )}
            </div>

            {/* Meanings */}
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-thai, "Prompt", sans-serif)',
                  color: 'var(--text-ink-primary, #1C1E21)',
                  marginBottom: '4px',
                }}
              >
                🇹🇭 {selectedToken.definition?.meaning_th || 'คำศัพท์จากบทความอ่าน'}
              </div>
              <div
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-ink-secondary, #525866)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                🇬🇧 {selectedToken.definition?.meaning_en || 'Reading immersion vocabulary'}
              </div>
            </div>

            {/* Radical & Example Sentence if present */}
            {selectedToken.definition?.radical && (
              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-ink-secondary, #525866)',
                  marginBottom: '10px',
                  backgroundColor: 'var(--bg-rice-paper, #FBF9F5)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                }}
              >
                หมวดนำ (Radical): <strong>{selectedToken.definition.radical}</strong>
                {selectedToken.definition.radical_name_th && ` (${selectedToken.definition.radical_name_th})`}
              </div>
            )}

            {selectedToken.definition?.example_sentence && (
              <div
                style={{
                  fontSize: '0.84rem',
                  backgroundColor: 'var(--bg-card-subtle, #F5F1EA)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--text-ink-primary, #1C1E21)' }}>
                  {selectedToken.definition.example_sentence.zh}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#78716c' }}>
                  {selectedToken.definition.example_sentence.pinyin}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-ink-secondary, #525866)' }}>
                  {selectedToken.definition.example_sentence.th}
                </div>
              </div>
            )}

            {/* Sticky Action Button: "+ บันทึกเข้าคลัง SRS" */}
            <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
              {isTokenInSRS(selectedToken.text) ? (
                <button
                  disabled
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: 'var(--radius-md, 16px)',
                    border: '1px solid var(--color-jade-primary, #059669)',
                    backgroundColor: 'var(--color-jade-surface, #ECFDF5)',
                    color: 'var(--color-jade-deep, #047857)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'default',
                  }}
                >
                  <BookmarkCheck size={18} />
                  <span>บันทึกในคลังทบทวนแล้ว 🐰</span>
                </button>
              ) : (
                <button
                  onClick={handleAddSrsCard}
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: 'var(--radius-md, 16px)',
                    border: 'none',
                    backgroundColor: 'var(--color-jade-primary, #059669)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
                    transition: 'transform 100ms ease',
                  }}
                >
                  <Plus size={18} />
                  <span>+ บันทึกเข้าคลังทบทวน (SRS)</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Capsule Toast Feedback Notification */}
      {toastMessage && (
        <div
          role="status"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(28, 30, 33, 0.92)',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 500,
            zIndex: 60,
            boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 200ms ease',
          }}
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

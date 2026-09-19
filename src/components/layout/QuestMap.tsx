/**
 * src/components/layout/QuestMap.tsx
 * Interactive Quest Map with winding path, node statuses (Locked, Active, Completed, Boss),
 * and Tier selection.
 */

import React, { useState } from 'react';
import { Lock, Star, Crown, Play, CheckCircle2 } from 'lucide-react';
import { ProgressState } from '../../engines/storage/types';
import unit01Data from '../../data/lessons/tier1/unit01_greetings.json';

export interface QuestMapProps {
  progress: ProgressState;
  onSelectLesson: (unitId: string, lessonId: string) => void;
  onOpenReviewDeck: () => void;
  dueCardsCount: number;
}

interface MapNode {
  lessonId: string;
  lessonNumber: string;
  titleTh: string;
  titleCn: string;
  isBoss: boolean;
  xpReward: number;
}

const unit01Nodes: MapNode[] = [
  {
    lessonId: 't1_u01_l01',
    lessonNumber: '1.1',
    titleTh: 'สวัสดี & ขอบคุณ',
    titleCn: '你好 · 谢谢',
    isBoss: false,
    xpReward: 30,
  },
  {
    lessonId: 't1_u01_l02',
    lessonNumber: '1.2',
    titleTh: 'ฉันชื่ออะไร?',
    titleCn: '我叫什么名字',
    isBoss: false,
    xpReward: 35,
  },
  {
    lessonId: 't1_u01_l03',
    lessonNumber: '1.3',
    titleTh: 'คนชาติไหน?',
    titleCn: '哪国人 · 泰国人',
    isBoss: false,
    xpReward: 40,
  },
  {
    lessonId: 't1_u01_l04',
    lessonNumber: '1.4',
    titleTh: 'บอส: แนะนำตัวทำงานจริง',
    titleCn: '初次见面 · 幸会',
    isBoss: true,
    xpReward: 60,
  },
];

export const QuestMap: React.FC<QuestMapProps> = ({
  progress,
  onSelectLesson,
  onOpenReviewDeck,
  dueCardsCount,
}) => {
  const [selectedTier, setSelectedTier] = useState<'tier0' | 'tier1'>(
    (progress.current_tier as 'tier0' | 'tier1') || 'tier0'
  );

  React.useEffect(() => {
    if (progress.current_tier === 'tier0' || progress.current_tier === 'tier1') {
      setSelectedTier(progress.current_tier);
    }
  }, [progress.current_tier]);

  // Completed lessons from progress state
  const completedSet = new Set(progress.completed_lessons);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        padding: '16px 12px 100px 12px',
        gap: '18px',
      }}
    >
      {/* Tier Switcher Pills */}
      <div
        style={{
          display: 'flex',
          backgroundColor: '#EDE8DF',
          borderRadius: 'var(--radius-full)',
          padding: '3px',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        <button
          onClick={() => setSelectedTier('tier0')}
          style={{
            flex: 1,
            padding: '8px 12px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: selectedTier === 'tier0' ? '#FFFFFF' : 'transparent',
            color: selectedTier === 'tier0' ? 'var(--color-jade-dark)' : 'var(--text-ink-secondary)',
            boxShadow: selectedTier === 'tier0' ? '0 2px 5px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          🌱 Tier 0: ปูพื้นพินอิน
        </button>
        <button
          onClick={() => setSelectedTier('tier1')}
          style={{
            flex: 1,
            padding: '8px 12px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: selectedTier === 'tier1' ? '#FFFFFF' : 'transparent',
            color: selectedTier === 'tier1' ? 'var(--color-jade-dark)' : 'var(--text-ink-secondary)',
            boxShadow: selectedTier === 'tier1' ? '0 2px 5px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          🌿 Tier 1: นักสำรวจ
        </button>
      </div>

      {/* Review Deck Quick Entry Banner */}
      <div
        onClick={onOpenReviewDeck}
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--border-card)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            🎴
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
              คลังทบทวนอัจฉริยะ (SRS Deck)
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>
              {dueCardsCount > 0 ? (
                <span style={{ color: 'var(--color-vermilion)', fontWeight: 600 }}>
                  มีคำศัพท์รอทบทวน {dueCardsCount} คำวันนี้
                </span>
              ) : (
                'ทบทวนตามโค้งการลืม Ebbinghaus 🛡️ ไม่หักหัวใจ'
              )}
            </div>
          </div>
        </div>
        <div
          className="btn-tactile-primary"
          style={{ padding: '6px 14px', fontSize: '12px', borderRadius: 'var(--radius-full)' }}
        >
          เข้าทบทวน
        </div>
      </div>

      {/* Tier 0 Placeholder Notice */}
      {selectedTier === 'tier0' && (
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: '24px 16px',
            textAlign: 'center',
            border: '1.5px dashed var(--border-card)',
            color: 'var(--text-ink-secondary)',
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🐰🎧</div>
          <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-ink-primary)' }}>
            Tier 0: Seed Pinyin Mastery
          </div>
          <p style={{ fontSize: '13px', marginTop: '6px', lineHeight: 1.6 }}>
            หลักสูตรปูพื้นฐานพินอิน 6 ยูนิตพร้อม Bunny Tone Coaster จะเปิดตัวใน Phase 4!
            <br />
            ในเฟสนี้ คุณสามารถเข้าเรียน Unit 1 ของ Tier 1 ได้ทันทีครับ
          </p>
          <button
            onClick={() => setSelectedTier('tier1')}
            className="btn-tactile-secondary"
            style={{ marginTop: '12px', padding: '8px 16px', minHeight: '44px' }}
          >
            กลับสู่ Tier 1: นักสำรวจ 🌿
          </button>
        </div>
      )}

      {/* Tier 1 Quest Nodes */}
      {selectedTier === 'tier1' && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Unit Header Card */}
          <div
            style={{
              backgroundColor: 'var(--color-jade-dark)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(4, 120, 87, 0.25)',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  opacity: 0.9,
                }}
              >
                Unit 01 · 初次见面
              </span>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>
                {unit01Data.title.th}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>
                {unit01Data.description}
              </div>
            </div>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}
            >
              🤝
            </div>
          </div>

          {/* Path Nodes List */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '10px 0',
            }}
          >
            {unit01Nodes.map((node, index) => {
              const isCompleted = completedSet.has(node.lessonId);
              // First lesson is always unlocked; subsequent lessons unlock if previous is completed
              const isUnlocked = index === 0 || completedSet.has(unit01Nodes[index - 1].lessonId);
              const isCurrent = isUnlocked && !isCompleted;

              // Alternating horizontal offset for curving winding path effect
              const offset = index % 2 === 0 ? '-16px' : '16px';

              return (
                <div
                  key={node.lessonId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translateX(${offset})`,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <button
                    onClick={() => {
                      if (isUnlocked) {
                        onSelectLesson('unit01', node.lessonId);
                      }
                    }}
                    disabled={!isUnlocked}
                    style={{
                      width: '100%',
                      maxWidth: '380px',
                      padding: '14px 16px',
                      minHeight: '64px',
                      borderRadius: 'var(--radius-md)',
                      border: isCurrent
                        ? '2px solid var(--color-jade-primary)'
                        : '1.5px solid var(--border-card)',
                      backgroundColor: isUnlocked ? '#FFFFFF' : '#F3F4F6',
                      cursor: isUnlocked ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isCurrent
                        ? '0 6px 16px rgba(16, 185, 129, 0.22)'
                        : 'var(--shadow-card)',
                      position: 'relative',
                    }}
                  >
                    {/* Left: Node Number & Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: isCompleted
                            ? 'var(--color-jade-primary)'
                            : isCurrent
                            ? 'var(--color-jade-dark)'
                            : '#E5E7EB',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '15px',
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={22} />
                        ) : node.isBoss ? (
                          <Crown size={22} color="#FBBF24" />
                        ) : isUnlocked ? (
                          <Play size={18} style={{ marginLeft: '2px' }} />
                        ) : (
                          <Lock size={18} color="#9CA3AF" />
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: isCurrent ? 'var(--color-jade-dark)' : 'var(--text-ink-secondary)',
                            }}
                          >
                            บทที่ {node.lessonNumber}
                          </span>
                          {node.isBoss && (
                            <span
                              style={{
                                fontSize: '10px',
                                backgroundColor: '#FEF3C7',
                                color: '#92400E',
                                padding: '1px 6px',
                                borderRadius: '6px',
                                fontWeight: 700,
                              }}
                            >
                              BOSS
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: isUnlocked ? 'var(--text-ink-primary)' : '#9CA3AF',
                          }}
                        >
                          {node.titleTh}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-ink-muted)' }}>
                          {node.titleCn}
                        </div>
                      </div>
                    </div>

                    {/* Right: Stars / Status */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                      {isCompleted ? (
                        <div style={{ display: 'flex', gap: '2px' }}>
                          <Star size={16} color="#F59E0B" fill="#F59E0B" />
                          <Star size={16} color="#F59E0B" fill="#F59E0B" />
                          <Star size={16} color="#F59E0B" fill="#F59E0B" />
                        </div>
                      ) : (
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-jade-dark)' }}>
                          +{node.xpReward} XP
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

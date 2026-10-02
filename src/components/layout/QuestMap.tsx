/**
 * src/components/layout/QuestMap.tsx
 * Interactive Quest Map with winding path, node statuses (Locked, Active, Completed, Boss),
 * and Tier selection.
 */

import React, { useState } from 'react';
import { Lock, Star, Crown, Play, CheckCircle2 } from 'lucide-react';
import { ProgressState } from '../../engines/storage/types';
import unit01Data from '../../data/lessons/tier1/unit01_greetings.json';

const HsrQuestMap = React.lazy(() =>
  import('./HsrQuestMap').then((m) => ({ default: m.HsrQuestMap }))
);

export interface QuestMapProps {
  progress: ProgressState;
  onSelectLesson: (unitId: string, lessonId: string) => void;
  onOpenReviewDeck: () => void;
  dueCardsCount: number;
  onOpenPassport?: () => void;
  onSelectTier?: (tier: 'tier0' | 'tier1' | 'tier2') => void;
  onOpenImmersionHub?: () => void;
}

interface MapNode {
  lessonId: string;
  lessonNumber: string;
  titleTh: string;
  titleCn: string;
  isBoss: boolean;
  xpReward: number;
  unitId?: string;
  icon?: string;
}

const tier0Nodes: MapNode[] = [
  {
    lessonId: 't0_u01_l01',
    lessonNumber: '0.1',
    titleTh: 'ริมฝีปาก & ปลายลิ้น',
    titleCn: '唇齿与舌尖音',
    isBoss: false,
    xpReward: 25,
    unitId: 'tier0_u01',
    icon: '👄',
  },
  {
    lessonId: 't0_u02_l01',
    lessonNumber: '0.2',
    titleTh: 'โคนลิ้น & ลิ้นแตะเพดาน',
    titleCn: '舌根与舌面前音',
    isBoss: false,
    xpReward: 30,
    unitId: 'tier0_u02',
    icon: '👅',
  },
  {
    lessonId: 't0_u03_l01',
    lessonNumber: '0.3',
    titleTh: 'รถไฟเหาะ 4 วรรณยุกต์',
    titleCn: '四声过山车',
    isBoss: false,
    xpReward: 35,
    unitId: 'tier0_u03',
    icon: '🎢',
  },
  {
    lessonId: 't0_u04_l01',
    lessonNumber: '0.4',
    titleTh: 'ลิ้นม้วน VS ลิ้นแบน',
    titleCn: '平翘舌音大决斗',
    isBoss: false,
    xpReward: 40,
    unitId: 'tier0_u04',
    icon: '⚡',
  },
  {
    lessonId: 't0_u05_l01',
    lessonNumber: '0.5',
    titleTh: 'สระผสม & นาสิกกลิ่นผลไม้',
    titleCn: '复韵母与鼻韵母',
    isBoss: false,
    xpReward: 45,
    unitId: 'tier0_u05',
    icon: '🎵',
  },
  {
    lessonId: 't0_u06_l01',
    lessonNumber: '0.6',
    titleTh: '8 เส้นขีด & รากศัพท์มหัศจรรย์',
    titleCn: '永字八法与字根',
    isBoss: true,
    xpReward: 150,
    unitId: 'tier0_u06',
    icon: '🏆',
  },
];

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
  onOpenPassport,
  onSelectTier,
  onOpenImmersionHub,
}) => {
  const [selectedTier, setSelectedTier] = useState<'tier0' | 'tier1' | 'tier2'>(
    (progress.current_tier as 'tier0' | 'tier1' | 'tier2') || 'tier0'
  );

  React.useEffect(() => {
    if (progress.current_tier === 'tier0' || progress.current_tier === 'tier1' || progress.current_tier === 'tier2') {
      setSelectedTier(progress.current_tier);
    }
  }, [progress.current_tier]);

  const handleSwitchTier = (tier: 'tier0' | 'tier1' | 'tier2') => {
    setSelectedTier(tier);
    onSelectTier?.(tier);
  };

  // Completed lessons from progress state
  const completedSet = new Set(progress.completed_lessons);

  return (
    <div className="quest-map-responsive-grid" data-testid="quest-map-container">
      {/* Primary Column: Winding Quest Path */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          maxWidth: '440px',
          gap: '2px',
        }}
      >
        <button
          data-testid="tab-tier0"
          onClick={() => handleSwitchTier('tier0')}
          style={{
            flex: 1,
            padding: '8px 4px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: 'clamp(10px, 3.2vw, 12px)',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: selectedTier === 'tier0' ? '#FFFFFF' : 'transparent',
            color: selectedTier === 'tier0' ? 'var(--color-jade-dark)' : 'var(--text-ink-secondary)',
            boxShadow: selectedTier === 'tier0' ? '0 2px 5px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          🌱 Tier 0: ปูพื้น
        </button>
        <button
          data-testid="tab-tier1"
          onClick={() => handleSwitchTier('tier1')}
          style={{
            flex: 1,
            padding: '8px 4px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: 'clamp(10px, 3.2vw, 12px)',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: selectedTier === 'tier1' ? '#FFFFFF' : 'transparent',
            color: selectedTier === 'tier1' ? 'var(--color-jade-dark)' : 'var(--text-ink-secondary)',
            boxShadow: selectedTier === 'tier1' ? '0 2px 5px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          🌿 Tier 1: นักสำรวจ
        </button>
        <button
          data-testid="tab-tier2"
          onClick={() => handleSwitchTier('tier2')}
          style={{
            flex: 1,
            padding: '8px 4px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: 'clamp(10px, 3.2vw, 12px)',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: selectedTier === 'tier2' ? '#FFFFFF' : 'transparent',
            color: selectedTier === 'tier2' ? '#0284C7' : 'var(--text-ink-secondary)',
            boxShadow: selectedTier === 'tier2' ? '0 2px 5px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          🎋 Tier 2: นักเดินทาง
        </button>
      </div>

      {/* Review Deck Quick Entry Banner */}
      <div
        data-testid="btn-open-review-banner"
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

      {/* Immersion Quest Hub Quick Entry Banner (Phase 8 TASK-806) */}
      {onOpenImmersionHub && (
        <div
          data-testid="btn-open-immersion-banner"
          onClick={onOpenImmersionHub}
          style={{
            width: '100%',
            backgroundColor: '#0F172A',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid #334155',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-card)',
            color: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}
            >
              🐉
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#F8FAFC' }}>
                หอวิชาการฮั่นหลิน 翰林院 (Tier 3-4 Hub)
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                คลังบทความ HSK 5-9 · สำนวน成语 · พอดแคสต์ · สตูดิโอฝึกพูด
              </div>
            </div>
          </div>
          <div
            className="btn-tactile-primary"
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#047857',
              color: '#FFFFFF',
              border: 'none',
            }}
          >
            เข้าสู่หอวิชา
          </div>
        </div>
      )}

      {/* Tier 0 Quest Nodes */}
      {selectedTier === 'tier0' && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Tier 0 Header Card */}
          <div
            style={{
              backgroundColor: '#1E3A8A',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
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
                Tier 0 · 汉语拼音 & 笔画
              </span>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>
                🌱 ปูพื้นฐานพินอิน & 8 เส้นขีด
              </div>
              <div style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>
                หลักสูตร 6 ยูนิตเพื่อผู้เริ่มต้นจากศูนย์เด็ดขาด 🛡️ โซนปลอดภัย ไม่หักหัวใจ
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
              🐰
            </div>
          </div>

          {/* Tier 0 Completed Celebration Banner & Passport Access */}
          {completedSet.has('t0_u06_l01') && onOpenPassport && (
            <div
              onClick={onOpenPassport}
              style={{
                width: '100%',
                backgroundColor: '#FEF3C7',
                borderRadius: 'var(--radius-md)',
                border: '2px solid #F59E0B',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
              }}
              data-testid="btn-questmap-open-passport"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>🏆</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: '#92400E' }}>
                    บัตรเกียรติยศผู้พิชิต Tier 0 (Passport)
                  </div>
                  <div style={{ fontSize: '11px', color: '#B45309' }}>
                    แตะเพื่อดูบัตรเกียรติยศและส่งต่อความสำเร็จ 🐰✨
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                ดูพาสปอร์ต
              </div>
            </div>
          )}

          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '10px 0',
              width: '100%',
              overflowX: 'hidden',
            }}
          >
            {tier0Nodes.map((node, index) => {
              const isCompleted = completedSet.has(node.lessonId);
              // First lesson always unlocked; subsequent unlocked if previous completed
              const isUnlocked = index === 0 || completedSet.has(tier0Nodes[index - 1].lessonId);
              const isCurrent = isUnlocked && !isCompleted;
              const isNarrow = typeof window !== 'undefined' && window.innerWidth <= 380;
              const offset = isNarrow
                ? index % 2 === 0 ? '-4px' : '4px'
                : index % 2 === 0 ? '-16px' : '16px';

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
                    data-testid={`lesson-node-${node.lessonId}`}
                    onClick={() => {
                      if (isUnlocked) {
                        onSelectLesson(node.unitId || `tier0_u0${index + 1}`, node.lessonId);
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
                        ? '2px solid #3B82F6'
                        : '1.5px solid var(--border-card)',
                      backgroundColor: isUnlocked ? '#FFFFFF' : '#F3F4F6',
                      cursor: isUnlocked ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isCurrent
                        ? '0 6px 16px rgba(59, 130, 246, 0.22)'
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
                            ? '#2563EB'
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

                      <div style={{ textAlign: 'left' }}>
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: isCurrent ? '#2563EB' : 'var(--text-ink-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <span>ยูนิต {node.lessonNumber}</span>
                          {node.isBoss && (
                            <span
                              style={{
                                backgroundColor: '#FEF3C7',
                                color: '#B45309',
                                fontSize: '10px',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                fontWeight: 800,
                              }}
                            >
                              GRAND BOSS
                            </span>
                          )}
                          <span
                            style={{
                              backgroundColor: 'rgba(16, 185, 129, 0.12)',
                              color: 'var(--color-jade-dark)',
                              fontSize: '10px',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              fontWeight: 700,
                            }}
                          >
                            🛡️ SAFE
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            color: isUnlocked ? 'var(--text-ink-primary)' : 'var(--text-ink-muted)',
                            marginTop: '2px',
                          }}
                        >
                          {node.icon} {node.titleTh}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: isUnlocked ? 'var(--text-ink-secondary)' : 'var(--text-ink-muted)',
                            fontFamily: 'var(--font-chinese)',
                          }}
                        >
                          {node.titleCn}
                        </div>
                      </div>
                    </div>

                    {/* Right: XP reward & status */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#D97706',
                        }}
                      >
                        <Star size={13} fill="#D97706" color="#D97706" />
                        <span>+{node.xpReward}</span>
                      </div>
                      {isCompleted && (
                        <span style={{ fontSize: '10px', color: 'var(--color-jade-dark)', fontWeight: 700, marginTop: '4px' }}>
                          พิชิตแล้ว
                        </span>
                      )}
                      {isCurrent && (
                        <span
                          style={{
                            fontSize: '10px',
                            backgroundColor: '#DBEAFE',
                            color: '#1D4ED8',
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 800,
                            marginTop: '4px',
                          }}
                        >
                          เรียนต่อ
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
              width: '100%',
              overflowX: 'hidden',
            }}
          >
            {unit01Nodes.map((node, index) => {
              const isCompleted = completedSet.has(node.lessonId);
              // First lesson is always unlocked; subsequent lessons unlock if previous is completed
              const isUnlocked = index === 0 || completedSet.has(unit01Nodes[index - 1].lessonId);
              const isCurrent = isUnlocked && !isCompleted;

              // Alternating horizontal offset for curving winding path effect
              const isNarrow = typeof window !== 'undefined' && window.innerWidth <= 380;
              const offset = isNarrow
                ? index % 2 === 0 ? '-4px' : '4px'
                : index % 2 === 0 ? '-16px' : '16px';

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
                    data-testid={`lesson-node-${node.lessonId}`}
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

      {/* Tier 2 HSR Metro Quest Map */}
      {selectedTier === 'tier2' && (
        <React.Suspense
          fallback={
            <div
              style={{
                padding: '40px 16px',
                textAlign: 'center',
                color: 'var(--text-ink-secondary, #78716C)',
                fontSize: '13px',
              }}
            >
              กำลังจัดเตรียมเส้นทางรถไฟความเร็วสูง... 🚄🐰
            </div>
          }
        >
          <HsrQuestMap
            progress={progress}
            onSelectLesson={onSelectLesson}
            onOpenReviewDeck={onOpenReviewDeck}
            dueCardsCount={dueCardsCount}
          />
        </React.Suspense>
      )}
      </div>

      {/* Secondary Column: Desktop Companion Dashboard (Sticky Right) */}
      <aside className="desktop-companion-panel" data-testid="desktop-companion-dashboard">
        {/* Daily Quests Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md, 16px)',
            border: '1.5px solid var(--border-card, #E2DBD0)',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-card, 0 8px 28px -4px rgba(44, 34, 20, 0.05))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-ink-primary, #1C1E21)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎯</span>
              <span>ภารกิจประจำวัน</span>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-jade-deep, #047857)' }}>
              +{progress.streak.count > 0 ? 50 : 25} XP
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--color-jade-primary, #059669)" />
              <div style={{ fontSize: '13px', color: 'var(--text-ink-primary, #1C1E21)' }}>
                เรียนบทเรียนอย่างน้อย 1 บท ({progress.completed_lessons.length > 0 ? '1/1' : '0/1'})
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color={dueCardsCount === 0 ? 'var(--color-jade-primary, #059669)' : 'var(--text-ink-muted, #9CA3AF)'} />
              <div style={{ fontSize: '13px', color: 'var(--text-ink-primary, #1C1E21)' }}>
                ทบทวนคลังคำศัพท์ SRS ให้ครบ
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--text-ink-muted, #9CA3AF)" />
              <div style={{ fontSize: '13px', color: 'var(--text-ink-primary, #1C1E21)' }}>
                ฝึกเขียนตัวอักษรจีน 5 ตัว
              </div>
            </div>
          </div>
        </div>

        {/* SRS Spaced Repetition Quick Widget */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md, 16px)',
            border: '1.5px solid var(--border-card, #E2DBD0)',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-card, 0 8px 28px -4px rgba(44, 34, 20, 0.05))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm, 10px)',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              🎴
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-ink-primary, #1C1E21)' }}>
                ระบบทบทวนระยะห่าง SRS
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-ink-secondary, #525866)' }}>
                อัลกอริทึม SM-2 ป้องกันการลืม
              </div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary, #525866)', lineHeight: 1.5, marginBottom: '14px' }}>
            {dueCardsCount > 0
              ? `มีคำศัพท์ถึงกำหนดทบทวน ${dueCardsCount} คำ ทบทวนตอนนี้เพื่อรักษาความจำระยะยาว!`
              : 'ยอดเยี่ยมมาก! ไม่มีคำศัพท์ค้างทบทวนในระบบแล้ว'}
          </p>
          <button
            onClick={onOpenReviewDeck}
            className="btn-tactile-primary"
            style={{ width: '100%', minHeight: '44px', fontSize: '13px', padding: '8px 16px' }}
          >
            {dueCardsCount > 0 ? `เริ่มทบทวน (${dueCardsCount} คำ)` : 'เปิดคลังทบทวนการ์ด'}
          </button>
        </div>

        {/* Learning Statistics Summary */}
        <div
          style={{
            backgroundColor: 'var(--bg-card-subtle, #F5F1EA)',
            borderRadius: 'var(--radius-md, 16px)',
            padding: '16px 20px',
            border: '1px solid var(--border-subtle, #EAE5DE)',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-ink-secondary, #525866)', marginBottom: '8px' }}>
            สถิติการเรียนรู้ปัจจุบัน
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-jade-deep, #047857)' }}>
                {progress.completed_lessons.length}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-ink-muted, #9CA3AF)' }}>บทเรียนที่ผ่านแล้ว</div>
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#B45309' }}>
                {progress.xp}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-ink-muted, #9CA3AF)' }}>ค่าประสบการณ์ XP</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

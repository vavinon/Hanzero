/**
 * src/components/layout/HsrQuestMap.tsx
 * High-Speed Rail (HSR) Metro Quest Map for Tier 2: Traveler Quest (Units 11–25).
 * Connects 4 Metropolises: Beijing ➔ Xi'an ➔ Chengdu ➔ Shanghai.
 * Features Metro Route Lines, Station Nodes, and Collectible Stamped HSR Ticket Modal.
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any', 60fps animations.
 */

import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle2, Ticket, X, ChevronRight } from 'lucide-react';
import { ProgressState } from '../../engines/storage/types';
import { METROPOLIS_HUBS, getHsrStations, HsrStation, MetropolisHub } from '../../data/lessons/tier2';
import { playClick, playCorrect, playIncorrect } from '../../engines/audio/audioEngine';

export interface HsrQuestMapProps {
  progress: ProgressState;
  onSelectLesson: (unitId: string, lessonId: string) => void;
  onOpenReviewDeck?: () => void;
  dueCardsCount?: number;
}

export const HsrQuestMap: React.FC<HsrQuestMapProps> = ({
  progress,
  onSelectLesson,
}) => {
  const [selectedHubId, setSelectedHubId] = useState<'all' | 'beijing' | 'xian' | 'chengdu' | 'shanghai'>('all');
  const [showTicketModal, setShowTicketModal] = useState<boolean>(false);
  const [activeStationModal, setActiveStationModal] = useState<HsrStation | null>(null);

  const stations = getHsrStations();
  const completedLessonsSet = new Set(progress.completed_lessons || []);

  // Determine station progress
  // A station (Unit X) is completed if its boss lesson (lesson 4: t2_uX_l04) is completed
  // or at least 1 lesson completed.
  const isStationCompleted = (unitNumber: number): boolean => {
    return (
      completedLessonsSet.has(`t2_u${unitNumber}_l04`) ||
      completedLessonsSet.has(`t2_u${unitNumber}_l01`)
    );
  };

  // Find the first uncompleted station index
  const firstUnfinishedIdx = stations.findIndex((s) => !isStationCompleted(s.unitNumber));
  const activeStationIndex = firstUnfinishedIdx === -1 ? stations.length - 1 : firstUnfinishedIdx;

  const isStationUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    // Unlocked if previous station has at least 1 lesson finished or current active
    return index <= activeStationIndex;
  };

  const completedStationsCount = stations.filter((s) => isStationCompleted(s.unitNumber)).length;
  const progressPercent = Math.round((completedStationsCount / stations.length) * 100);

  const filteredStations = selectedHubId === 'all'
    ? stations
    : stations.filter((s) => s.metropolisId === selectedHubId);

  useEffect(() => {
    if (showTicketModal || activeStationModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [showTicketModal, activeStationModal]);

  const handleOpenTicket = () => {
    playCorrect();
    setShowTicketModal(true);
  };

  const handleStationClick = (station: HsrStation, index: number) => {
    if (!isStationUnlocked(index)) {
      playIncorrect();
    } else {
      playClick();
    }
    setActiveStationModal(station);
  };

  const handleStartLesson = (unitId: string, lessonId: string) => {
    playClick();
    setActiveStationModal(null);
    onSelectLesson(unitId, lessonId);
  };

  return (
    <div
      data-testid="hsr-quest-map"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        padding: '8px 12px 100px 12px',
        gap: '16px',
      }}
    >
      {/* Traveler Header Card */}
      <div
        data-testid="hsr-header-card"
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg, 16px)',
          border: '1.5px solid var(--border-card, #EDE8DF)',
          padding: '16px',
          boxShadow: 'var(--shadow-card, 0 4px 12px rgba(0,0,0,0.05))',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Top Stripe */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #D97706, #059669, #2563EB)',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '18px' }}>🚄</span>
              <h2
                style={{
                  margin: 0,
                  fontSize: '17px',
                  fontWeight: 800,
                  color: 'var(--text-ink-primary, #1C1917)',
                }}
              >
                เส้นทางรถไฟ 4 มหานคร
              </h2>
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--text-ink-secondary, #78716C)',
                marginTop: '2px',
              }}
            >
              ปักกิ่ง ➔ ซีอาน ➔ เฉิงตู ➔ เซี่ยงไฮ้ (15 สถานี)
            </div>
          </div>

          {/* Ticket Collectible Action Button */}
          <button
            data-testid="btn-open-hsr-ticket"
            onClick={handleOpenTicket}
            className="btn-tactile-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-full, 9999px)',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: '#0284C7',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.35)',
            }}
          >
            <Ticket size={15} />
            <span>ตั๋วรถไฟความเร็วสูง</span>
          </button>
        </div>

        {/* Progress Bar & Mileage */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-ink-primary, #1C1917)',
              marginBottom: '6px',
            }}
          >
            <span>ระยะทางที่พิชิต: {completedStationsCount} / 15 สถานี</span>
            <span style={{ color: '#0284C7' }}>{progressPercent}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#EDE8DF',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #0284C7, #059669)',
                borderRadius: '9999px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Metropolis Hub Segment Filters */}
      <div
        data-testid="hsr-hub-filters"
        style={{
          display: 'flex',
          gap: '6px',
          width: '100%',
          overflowX: 'auto',
          paddingBottom: '2px',
          scrollbarWidth: 'none',
        }}
      >
        <button
          data-testid="filter-hub-all"
          onClick={() => {
            playClick();
            setSelectedHubId('all');
          }}
          style={{
            padding: '6px 12px',
            borderRadius: 'var(--radius-full, 9999px)',
            border: selectedHubId === 'all' ? '1.5px solid #1C1917' : '1.5px solid #EDE8DF',
            backgroundColor: selectedHubId === 'all' ? '#1C1917' : '#FFFFFF',
            color: selectedHubId === 'all' ? '#FFFFFF' : 'var(--text-ink-secondary, #78716C)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
        >
          🌏 ทั้งหมด (15)
        </button>

        {METROPOLIS_HUBS.map((hub: MetropolisHub) => {
          const isSelected = selectedHubId === hub.id;
          return (
            <button
              key={hub.id}
              data-testid={`filter-hub-${hub.id}`}
              onClick={() => {
                playClick();
                setSelectedHubId(hub.id);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-full, 9999px)',
                border: isSelected ? `1.5px solid ${hub.color}` : '1.5px solid #EDE8DF',
                backgroundColor: isSelected ? `${hub.color}15` : '#FFFFFF',
                color: isSelected ? hub.color : 'var(--text-ink-secondary, #78716C)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{hub.badgeIcon}</span>
              <span>{hub.nameTh}</span>
              <span style={{ fontSize: '10px', opacity: 0.8 }}>({hub.nameZh})</span>
            </button>
          );
        })}
      </div>

      {/* Metro Stations List / Route Display */}
      <div
        data-testid="hsr-station-route"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          paddingLeft: '24px',
        }}
      >
        {/* Continuous Metro Track SVG Line */}
        <div
          style={{
            position: 'absolute',
            left: '38px',
            top: '24px',
            bottom: '24px',
            width: '4px',
            backgroundColor: '#E2E8F0',
            borderRadius: '2px',
            zIndex: 0,
          }}
        />

        {filteredStations.map((station) => {
          const originalIndex = stations.findIndex((s) => s.unitNumber === station.unitNumber);
          const unlocked = isStationUnlocked(originalIndex);
          const completed = isStationCompleted(station.unitNumber);
          const isActive = originalIndex === activeStationIndex;
          const hub = METROPOLIS_HUBS.find((h) => h.id === station.metropolisId) || METROPOLIS_HUBS[0];

          return (
            <div
              key={station.unitId}
              data-testid={`hsr-station-node-${station.unitNumber}`}
              onClick={() => handleStationClick(station, originalIndex)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                margin: '8px 0',
                padding: '12px 14px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md, 12px)',
                border: isActive
                  ? `2px solid ${hub.color}`
                  : completed
                  ? '1.5px solid #10B981'
                  : '1.5px solid #EDE8DF',
                boxShadow: isActive
                  ? `0 4px 14px ${hub.color}30`
                  : '0 2px 6px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                opacity: unlocked ? 1 : 0.65,
                position: 'relative',
                zIndex: 1,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              {/* Station Node Badge / Icon */}
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: completed
                    ? '#10B981'
                    : isActive
                    ? hub.color
                    : unlocked
                    ? '#F3F4F6'
                    : '#EDE8DF',
                  color: completed || isActive ? '#FFFFFF' : '#9CA3AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '14px',
                  boxShadow: isActive ? `0 0 12px ${hub.color}` : 'none',
                  flexShrink: 0,
                }}
              >
                {completed ? (
                  <CheckCircle2 size={20} />
                ) : isActive ? (
                  <span style={{ fontSize: '18px' }}>🚅</span>
                ) : unlocked ? (
                  station.unitNumber
                ) : (
                  <Lock size={16} />
                )}
              </div>

              {/* Station Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: hub.color,
                      backgroundColor: `${hub.color}15`,
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    {hub.badgeIcon} {hub.nameTh}
                  </span>
                  {station.isHub && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#B45309',
                        backgroundColor: '#FEF3C7',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      🏆 ชุมทางหลัก
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '6px',
                    marginTop: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      color: 'var(--text-ink-primary, #1C1917)',
                    }}
                  >
                    {station.stationNameZh}
                  </span>
                  <span
                    className="pinyin-display"
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-ink-secondary, #78716C)',
                    }}
                  >
                    {station.stationNamePinyin}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-ink-secondary, #57534E)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Unit {station.unitNumber}: {station.taglineTh}
                </div>
              </div>

              {/* Action Chevron */}
              <div style={{ color: '#9CA3AF', flexShrink: 0 }}>
                <ChevronRight size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Collectible Stamped HSR Ticket Modal */}
      {showTicketModal && (
        <div
          data-testid="hsr-ticket-modal"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
          onClick={() => setShowTicketModal(false)}
        >
          <div
            data-testid="hsr-ticket-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#EFF6FF',
              borderRadius: '16px',
              border: '2px solid #93C5FD',
              boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              position: 'relative',
              animation: 'ticketPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
          >
            {/* Ticket Header Bar (China High-Speed Rail Blue) */}
            <div
              style={{
                backgroundColor: '#1E40AF',
                color: '#FFFFFF',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🚄</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.5px' }}>
                    中国铁路高速
                  </div>
                  <div style={{ fontSize: '9px', opacity: 0.8, letterSpacing: '1px' }}>
                    CHINA RAILWAY HIGH-SPEED
                  </div>
                </div>
              </div>

              <button
                data-testid="btn-close-hsr-ticket"
                onClick={() => setShowTicketModal(false)}
                aria-label="ปิดหน้าต่างตั๋วรถไฟ"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  minWidth: '44px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Ticket Body Content */}
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Origin ➔ Destination Route */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '12px',
                  borderBottom: '1px dashed #93C5FD',
                }}
              >
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#1E3A8A' }}>北京南</div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>BEIJINGNAN</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#0284C7',
                      backgroundColor: '#DBEAFE',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                    }}
                  >
                    G706 次
                  </span>
                  <span style={{ fontSize: '16px', color: '#0284C7' }}>➔➔➔</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#1E3A8A' }}>上海虹桥</div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>SHANGHAIHONGQIAO</div>
                </div>
              </div>

              {/* Passenger, Seat, and Class */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  fontSize: '12px',
                }}
              >
                <div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>ที่นั่ง (SEAT)</div>
                  <div style={{ fontWeight: 800, color: '#1E293B', fontSize: '13px' }}>07车 06F号</div>
                </div>
                <div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>ประเภท (CLASS)</div>
                  <div style={{ fontWeight: 800, color: '#1E293B', fontSize: '13px' }}>二等座 (2nd)</div>
                </div>
                <div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>ราคา (FARE)</div>
                  <div style={{ fontWeight: 800, color: '#1E293B', fontSize: '13px' }}>¥ 553.00 元</div>
                </div>
              </div>

              {/* Passenger Info & Gate */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '6px',
                  fontSize: '12px',
                  backgroundColor: '#FFFFFF',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #BFDBFE',
                }}
              >
                <div>
                  <span style={{ color: '#64748B' }}>ผู้โดยสาร: </span>
                  <span style={{ fontWeight: 700, color: '#1E293B' }}>
                    น้องกระต่ายฮั่นซีโร่ 🐰 (นักเดินทาง)
                  </span>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>ประตูขึ้นรถ: </span>
                  <span style={{ fontWeight: 700, color: '#0284C7' }}>检票口 7B</span>
                </div>
              </div>

              {/* Vermilion Stamp (Seal) Section */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  marginTop: '4px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>ความคืบหน้านักเดินทาง:</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0369A1' }}>
                    พิชิตแล้ว {completedStationsCount} / 15 สถานี
                  </div>
                </div>

                {/* Red Vermilion Digital Stamp */}
                <div
                  data-testid="ticket-vermilion-stamp"
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    border: '3px solid #DC2626',
                    color: '#DC2626',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(-12deg)',
                    boxShadow: '0 0 10px rgba(220, 38, 38, 0.25)',
                    opacity: completedStationsCount > 0 ? 0.95 : 0.4,
                    background: 'rgba(254, 226, 226, 0.4)',
                  }}
                >
                  <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '1px' }}>
                    ★ 中国高铁 ★
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 900, margin: '1px 0' }}>
                    {completedStationsCount >= 15 ? '已通关' : completedStationsCount > 0 ? '已检票' : '未检票'}
                  </div>
                  <div style={{ fontSize: '8px', fontWeight: 700 }}>
                    {completedStationsCount >= 15 ? 'CLEARED' : completedStationsCount > 0 ? 'VALIDATED' : 'UNSTAMPED'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Barcode / Tear Line */}
            <div
              style={{
                backgroundColor: '#DBEAFE',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '6px',
                fontSize: '10px',
                color: '#64748B',
                borderTop: '1px dashed #93C5FD',
              }}
            >
              <span>||||||| | ||||| |||| |||||||| |||||</span>
              <span>2026-P07-TASK-706-PASS</span>
            </div>
          </div>
        </div>
      )}

      {/* Station Details / Lesson Selection Modal */}
      {activeStationModal && (
        <div
          data-testid="station-detail-modal"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setActiveStationModal(null)}
        >
          <div
            data-testid="station-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '20px',
              boxShadow: '0 -10px 25px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            {/* Station Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#0284C7',
                      backgroundColor: '#E0F2FE',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    สถานีที่ {activeStationModal.unitNumber}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-ink-secondary, #78716C)' }}>
                    {activeStationModal.metropolisNameTh} ({activeStationModal.metropolisNameZh})
                  </span>
                </div>
                <h3
                  style={{
                    margin: '4px 0 0 0',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: 'var(--text-ink-primary, #1C1917)',
                  }}
                >
                  {activeStationModal.stationNameZh} ({activeStationModal.stationNameTh})
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--text-ink-secondary, #78716C)' }}>
                  {activeStationModal.taglineTh}
                </p>
              </div>

              <button
                data-testid="btn-close-station-modal"
                onClick={() => setActiveStationModal(null)}
                aria-label="ปิดหน้ารายละเอียดสถานี"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  minWidth: '44px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Locked Warning Banner if Station is Locked (SEC-RED-001) */}
            {(() => {
              const originalIndex = stations.findIndex((s) => s.unitNumber === activeStationModal.unitNumber);
              const isLocked = !isStationUnlocked(originalIndex);
              if (!isLocked) return null;
              return (
                <div
                  data-testid="station-locked-banner"
                  style={{
                    backgroundColor: '#FEF2F2',
                    color: '#991B1B',
                    border: '1.5px solid #FCA5A5',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Lock size={16} />
                  <span>สถานีนี้ยังไม่เปิดให้บริการ กรุณาเรียนผ่านสถานีก่อนหน้าเพื่อปลดล็อกเส้นทาง 🔒</span>
                </div>
              );
            })()}

            {/* Lessons in this station */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-ink-primary, #1C1917)' }}>
                บทเรียนย่อยประจำสถานี:
              </div>

              {activeStationModal.lessons.map((lesson) => {
                const isLessonDone = completedLessonsSet.has(lesson.lesson_id);
                const originalIndex = stations.findIndex((s) => s.unitNumber === activeStationModal.unitNumber);
                const isStationLocked = !isStationUnlocked(originalIndex);

                return (
                  <div
                    key={lesson.lesson_id}
                    data-testid={`btn-station-lesson-${lesson.lesson_id}`}
                    onClick={() => {
                      if (isStationLocked) {
                        playIncorrect();
                        return;
                      }
                      handleStartLesson(activeStationModal.unitId, lesson.lesson_id);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #EDE8DF',
                      backgroundColor: isStationLocked
                        ? '#F3F4F6'
                        : isLessonDone
                        ? '#F0FDF4'
                        : '#FAFAF9',
                      cursor: isStationLocked ? 'not-allowed' : 'pointer',
                      opacity: isStationLocked ? 0.55 : 1,
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: isLessonDone ? '#10B981' : '#E2E8F0',
                          color: isLessonDone ? '#FFFFFF' : '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        {isLessonDone ? <CheckCircle2 size={16} /> : lesson.lesson_number}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-ink-primary, #1C1917)' }}>
                          {lesson.title.zh} · {lesson.title.th}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-ink-secondary, #78716C)' }}>
                          {lesson.baby_step_goal}
                        </div>
                      </div>
                    </div>

                    <ChevronRight size={16} color="#9CA3AF" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

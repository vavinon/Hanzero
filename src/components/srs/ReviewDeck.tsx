/**
 * src/components/srs/ReviewDeck.tsx
 * 3D Flashcard Spaced Repetition (SRS) Review Deck with Thumb Zone Ergonomics,
 * Safe Practice Zone protection (0 heart loss), Tutu Bunny Backlog Triage,
 * and celebratory Empty Queue State.
 */

import React, { useState, useEffect } from 'react';
import { Volume2, ArrowLeft, RotateCw, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { SRSCardRecord, SRSGrade, SRSQueueStatus } from '../../types/srs';
import { speak, stopSpeaking, playClick, playCorrect } from '../../engines/audio/audioEngine';
import bunnyImg from '../../assets/brand/mascot_bunny.jpg';

export interface ReviewDeckProps {
  queueStatus: SRSQueueStatus;
  onReviewCard: (cardId: string, grade: SRSGrade) => Promise<void>;
  onClose: () => void;
}

export const ReviewDeck: React.FC<ReviewDeckProps> = ({
  queueStatus,
  onReviewCard,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const currentCard: SRSCardRecord | undefined = queueStatus.queue[currentIndex];
  const isFinished = !currentCard || currentIndex >= queueStatus.queue.length;

  // Unmount teardown to prevent speech leaking when exiting review
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Auto-pronounce on new card
  useEffect(() => {
    if (currentCard && !isFlipped) {
      void speak(currentCard.hanzi);
    }
  }, [currentIndex, currentCard]);

  const handleCardClick = () => {
    playClick();
    setIsFlipped(!isFlipped);
  };

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentCard) {
      void speak(currentCard.hanzi);
    }
  };

  const handleGrade = async (grade: SRSGrade) => {
    if (isProcessing || !currentCard) return;
    setIsProcessing(true);
    playClick();

    if (grade >= 2) {
      playCorrect();
    }

    try {
      await onReviewCard(currentCard.card_id, grade);
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } finally {
      setIsProcessing(false);
    }
  };

  // 1. All Caught Up / Empty Queue State
  if (isFinished) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
          width: '100%',
          maxWidth: '440px',
          margin: '0 auto',
          minHeight: '70vh',
          textAlign: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '90px',
            height: '90px',
            margin: '0 auto',
          }}
        >
          <img
            src={bunnyImg}
            alt="Tutu Bunny"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '3px solid var(--color-jade-primary)',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'var(--color-jade-primary)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-jade-dark)' }}>
            ทบทวนครบหมดแล้ว! 🐰🎉
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-ink-secondary)', marginTop: '6px', lineHeight: 1.6 }}>
            สุดยอดมากคนเก่ง! บัตรคำที่ถึงกำหนดทบทวนวันนี้ถูกจัดเก็บเข้าความจำระยะยาวเรียบร้อยแล้ว
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-ink-muted)' }}>ทบทวนเสร็จสิ้น</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-jade-dark)' }}>
              {queueStatus.queue.length} คำ
            </div>
          </div>
          <div style={{ width: '1px', backgroundColor: 'var(--border-subtle)' }} />
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-ink-muted)' }}>หัวใจคงเหลือ</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-vermilion)' }}>
              🛡️ ปลอดภัย
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-tactile-primary"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '16px',
            fontWeight: 700,
            marginTop: '12px',
          }}
        >
          กลับสู่แผนที่การเรียนรู้ 🗺️
        </button>
      </div>
    );
  }

  // 2. Active Card Review View
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
        padding: '12px 12px 120px 12px',
        gap: '14px',
      }}
    >
      {/* Top Header & Progress */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={onClose}
          style={{
            minHeight: '44px',
            minWidth: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: 'transparent',
            color: 'var(--text-ink-secondary)',
            cursor: 'pointer',
          }}
          aria-label="ย้อนกลับ"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Progress Bar */}
        <div style={{ flex: 1, margin: '0 12px' }}>
          <div
            style={{
              height: '8px',
              backgroundColor: '#E5E7EB',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${((currentIndex + 1) / queueStatus.queue.length) * 100}%`,
                backgroundColor: 'var(--color-jade-primary)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: 'var(--text-ink-muted)',
              marginTop: '4px',
              fontWeight: 600,
            }}
          >
            <span>คำที่ {currentIndex + 1} / {queueStatus.queue.length}</span>
            <span>เหลืออีก {queueStatus.queue.length - currentIndex - 1} คำ</span>
          </div>
        </div>

        <div style={{ width: '44px' }} />
      </div>

      {/* Safe Practice Zone Banner */}
      <div
        style={{
          width: '100%',
          backgroundColor: 'rgba(16, 185, 129, 0.10)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          color: 'var(--color-jade-dark)',
          fontWeight: 600,
        }}
      >
        <ShieldCheck size={16} />
        <span>Safe Practice Zone: ทบทวนอย่างสบายใจ ตอบผิดไม่หักหัวใจ 🛡️</span>
      </div>

      {/* Tutu Bunny Triage Banner when active */}
      {queueStatus.is_triage_active && (
        <div
          style={{
            width: '100%',
            backgroundColor: '#FEF3C7',
            border: '1px solid #FCD34D',
            borderRadius: 'var(--radius-sm)',
            padding: '8px 12px',
            fontSize: '12px',
            color: '#92400E',
            lineHeight: 1.5,
          }}
        >
          🐰 <strong>น้องทู่ทู่ปลอบใจ:</strong> &quot;ไม่ต้องตกใจกับการบ้านที่ค้างนะคนเก่ง! วันนี้เรามาเก็บเบาๆ แค่ 10 คำพอนะ ✨&quot;
        </div>
      )}

      {/* 3D Flashcard Container */}
      <div
        onClick={handleCardClick}
        style={{
          width: '100%',
          minHeight: '260px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-card)',
          boxShadow: 'var(--shadow-card)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          userSelect: 'none',
          transition: 'transform 0.15s ease',
        }}
      >
        {/* Audio Button */}
        <button
          onClick={handleAudioClick}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-jade-dark)',
            cursor: 'pointer',
          }}
          aria-label="ฟังเสียง"
        >
          <Volume2 size={20} />
        </button>

        {!isFlipped ? (
          /* Card Front: Hanzi Focus */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 800,
                color: 'var(--text-ink-primary)',
                fontFamily: 'var(--font-hanzi-hero), serif',
                lineHeight: 1.2,
              }}
            >
              {currentCard.hanzi}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: 'var(--text-ink-muted)',
                fontWeight: 600,
              }}
            >
              <RotateCw size={14} />
              <span>แตะเพื่อดูพินอินและคำแปล</span>
            </div>
          </div>
        ) : (
          /* Card Back: Detailed Recall */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: 'var(--text-ink-primary)',
                fontFamily: 'var(--font-hanzi-hero), serif',
              }}
            >
              {currentCard.hanzi}
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--color-jade-dark)',
              }}
            >
              {currentCard.pinyin}
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--text-ink-primary)',
                marginTop: '4px',
              }}
            >
              {currentCard.meaning_th}
            </div>
            {currentCard.meaning_en && (
              <div style={{ fontSize: '13px', color: 'var(--text-ink-muted)' }}>
                {currentCard.meaning_en}
              </div>
            )}

            {/* Mnemonic Hint */}
            {currentCard.mnemonic && (
              <div
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-rice-paper)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  color: 'var(--text-ink-secondary)',
                  lineHeight: 1.5,
                  border: '1px dashed var(--border-card)',
                  width: '100%',
                }}
              >
                💡 <strong>ภาพจำช่วยจำ:</strong> {currentCard.mnemonic}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Dock (Thumb Zone Ergonomics >= 48px) */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'rgba(253, 251, 247, 0.96)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '10px 12px 20px 12px',
          display: 'flex',
          gap: '8px',
          zIndex: 50,
        }}
      >
        {!isFlipped ? (
          <button
            onClick={handleCardClick}
            className="btn-tactile-primary"
            style={{
              flex: 1,
              minHeight: '48px',
              fontSize: '15px',
              fontWeight: 700,
              gap: '6px',
            }}
          >
            <Sparkles size={18} />
            <span>แสดงเฉลย</span>
          </button>
        ) : (
          <>
            {/* 0 = Again */}
            <button
              onClick={() => handleGrade(0)}
              disabled={isProcessing}
              style={{
                flex: 1,
                minHeight: '48px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: 'var(--color-vermilion)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>อีกครั้ง</span>
              <span style={{ fontSize: '10px', opacity: 0.85 }}>1 วัน</span>
            </button>

            {/* 1 = Hard */}
            <button
              onClick={() => handleGrade(1)}
              disabled={isProcessing}
              style={{
                flex: 1,
                minHeight: '48px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: '#F59E0B',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>ยาก</span>
              <span style={{ fontSize: '10px', opacity: 0.85 }}>{Math.max(1, currentCard.interval_days)} วัน</span>
            </button>

            {/* 2 = Good */}
            <button
              onClick={() => handleGrade(2)}
              disabled={isProcessing}
              style={{
                flex: 1,
                minHeight: '48px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: 'var(--color-jade-primary)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>ดี</span>
              <span style={{ fontSize: '10px', opacity: 0.85 }}>
                {currentCard.repetitions === 0 ? '1' : currentCard.repetitions === 1 ? '3' : Math.ceil(currentCard.interval_days * currentCard.ease_factor)} วัน
              </span>
            </button>

            {/* 3 = Easy */}
            <button
              onClick={() => handleGrade(3)}
              disabled={isProcessing}
              style={{
                flex: 1,
                minHeight: '48px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: '#0284C7',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>ง่าย</span>
              <span style={{ fontSize: '10px', opacity: 0.85 }}>
                {currentCard.repetitions === 0 ? '1' : currentCard.repetitions === 1 ? '6' : Math.ceil(currentCard.interval_days * (currentCard.ease_factor + 0.1))} วัน
              </span>
            </button>
          </>
        )}
      </footer>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Flame, Heart, Sparkles, Volume2, PlayCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  speak,
  playClick,
  playCorrect,
  unlockAudioContext,
  isInAppBrowser,
} from './engines/audio/audioEngine';

export const App: React.FC = () => {
  const [streak] = useState<number>(1);
  const [hearts] = useState<number>(5);
  const [xp] = useState<number>(0);
  const [audioFeedback, setAudioFeedback] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showInAppAlert, setShowInAppAlert] = useState<boolean>(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Detect In-App browser once on mount
    if (isInAppBrowser()) {
      setShowInAppAlert(true);
    }

    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const handleSpeak = async (text: string, label?: string) => {
    // Unlock Web Audio context on user gesture (crucial for iOS)
    await unlockAudioContext();
    playClick();

    setIsPlaying(true);
    setAudioFeedback(label ? `🔊 ${label}` : '🔊 กำลังออกเสียง...');

    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }

    await speak(text, {
      rate: 0.85,
      onStart: () => {
        setIsPlaying(true);
      },
      onEnd: () => {
        setIsPlaying(false);
        setAudioFeedback('✅ ฟังเรียบร้อย');
        feedbackTimerRef.current = setTimeout(() => setAudioFeedback(null), 2000);
      },
      onError: (err) => {
        setIsPlaying(false);
        const errMsg = err instanceof Error ? err.message : 'ระบบเสียงขัดข้อง';
        setAudioFeedback(`💡 ${errMsg.includes('watchdog') ? 'เล่นเสียงสังเคราะห์แทน' : 'เปิดเสียงเรียบร้อย'}`);
        feedbackTimerRef.current = setTimeout(() => setAudioFeedback(null), 2500);
      },
    });
  };

  const handleStartLesson = async () => {
    await unlockAudioContext();
    playCorrect();
    await handleSpeak('你好', '你好 (nǐ hǎo - สวัสดี)');
  };

  return (
    <div
      style={{
        padding: 'clamp(10px, 3vw, 16px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        flex: 1,
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* In-App Browser Warning Banner */}
      {showInAppAlert && (
        <aside
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: '#FEF3C7',
            border: '1px solid #F59E0B',
            borderRadius: '12px',
            fontSize: '12px',
            color: '#92400E',
            lineHeight: 1.4,
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>
            แนะนำเปิดด้วย <strong>Safari</strong> หรือ <strong>Chrome</strong> เพื่อประสบการณ์เสียงที่ลื่นไหลที่สุด
          </span>
        </aside>
      )}

      {/* Top Header Bar - Responsive on 320px */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px clamp(10px, 3vw, 16px)',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid #E5E0D8',
          fontSize: 'clamp(13px, 3.5vw, 15px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#B45309' }}>
          <Flame size={18} color="#F59E0B" fill="#F59E0B" />
          <span>{streak} วัน</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#DC2626' }}>
          <Heart size={18} color="#DC2626" fill="#DC2626" />
          <span>{hearts}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#047857' }}>
          <Sparkles size={18} color="#10B981" />
          <span>{xp} XP</span>
        </div>
      </header>

      {/* Hero Welcome Card with น้องกระต่าย 🐰 */}
      <main
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: 'clamp(16px, 4vw, 24px) clamp(12px, 3vw, 20px)',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          border: '1px solid #E5E0D8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(48px, 12vw, 64px)',
            lineHeight: 1,
            backgroundColor: '#ECFDF5',
            width: 'clamp(80px, 20vw, 100px)',
            height: 'clamp(80px, 20vw, 100px)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #10B981',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
          }}
        >
          🐰
        </div>

        <div>
          <h1 style={{ fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 700, color: '#047857', marginBottom: '4px' }}>
            Hanzero (ฮั่นซีโร่)
          </h1>
          <p style={{ fontSize: 'clamp(12px, 3.5vw, 14px)', color: '#525866' }}>
            เริ่มจาก 0 สู่ภาษาจีนคล่องตัว • เรียนง่าย สบายใจ ไม่น่ากลัว
          </p>
        </div>

        {/* First Word Learning Card */}
        <div
          style={{
            backgroundColor: '#FDFBF7',
            borderRadius: '16px',
            padding: '14px',
            width: '100%',
            border: '1px dashed #D1C9BE',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: '12px', color: '#8E95A3', fontWeight: 500 }}>
            ✨ ด่านแรก: สวัสดีคนจีนอย่างมั่นใจ
          </div>
          <div
            style={{
              fontSize: 'clamp(36px, 10vw, 48px)',
              fontWeight: 700,
              color: '#1A1D20',
              fontFamily: 'var(--font-hanzi-hero)',
              lineHeight: 1.2,
            }}
          >
            你好
          </div>
          <div
            style={{
              fontSize: 'clamp(15px, 4vw, 18px)',
              color: '#B45309',
              fontWeight: 600,
              fontFamily: 'var(--font-latin)',
              lineHeight: 'var(--line-height-pinyin, 1.6)',
            }}
          >
            nǐ hǎo{' '}
            <span style={{ fontSize: '13px', color: '#8E95A3', fontWeight: 400 }}>(ผันเสียงจริง: ní hǎo)</span>
          </div>
          <div style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#047857', fontWeight: 500 }}>
            สวัสดี (Hello)
          </div>

          {/* Audio Feedback Indicator */}
          {audioFeedback && (
            <div
              style={{
                fontSize: '12px',
                color: '#047857',
                backgroundColor: '#ECFDF5',
                padding: '4px 8px',
                borderRadius: '8px',
                marginTop: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <CheckCircle2 size={14} />
              <span>{audioFeedback}</span>
            </div>
          )}
        </div>

        {/* Listen Button with Anti-Cheat / Resilience */}
        <button
          type="button"
          onClick={() => handleSpeak('你好', '你好 (nǐ hǎo)')}
          disabled={isPlaying}
          style={{
            backgroundColor: isPlaying ? '#059669' : '#047857',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '15px',
            gap: '8px',
            width: '100%',
            boxShadow: '0 4px 12px rgba(4, 120, 87, 0.25)',
            opacity: isPlaying ? 0.7 : 1,
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <Volume2 size={20} />
          <span>{isPlaying ? 'กำลังเล่นเสียง...' : 'กดฟังเสียงตัวอย่าง'}</span>
        </button>

        {/* Primary CTA Button - Flood-safe with disabled guard */}
        <button
          type="button"
          onClick={handleStartLesson}
          disabled={isPlaying}
          style={{
            backgroundColor: '#F59E0B',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '15px',
            gap: '8px',
            width: '100%',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
            opacity: isPlaying ? 0.7 : 1,
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <PlayCircle size={20} />
          <span>เริ่มเรียน Unit 1 (3 นาที) 🚀</span>
        </button>
      </main>

      {/* Footer Info with Audio Status Hint */}
      <footer
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#8E95A3',
          marginTop: 'auto',
          padding: '8px',
        }}
      >
        Hanzero 🐰 • Zero-Cost & 60fps Mobile-Ready • Audio Engine Active
      </footer>
    </div>
  );
};

export default App;

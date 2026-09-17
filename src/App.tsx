import React, { useState, useRef } from 'react';
import { Flame, Heart, Sparkles, Volume2, PlayCircle, CheckCircle2 } from 'lucide-react';

// Speech GC retention set to prevent mobile browser garbage collection mid-speech
const speechUtteranceSet = new Set<SpeechSynthesisUtterance>();

export const App: React.FC = () => {
  const [streak] = useState<number>(1);
  const [hearts] = useState<number>(5);
  const [xp] = useState<number>(0);
  const [audioFeedback, setAudioFeedback] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Web Audio synth chime fallback (0 KB network, 100% resilient)
  const playSynthFallbackChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.26);
      osc.onended = () => {
        ctx.close().catch(() => {});
      };
    } catch {
      // AudioContext unavailable, silent graceful bypass
    }
  };

  const handleSpeak = (text: string) => {
    setIsPlaying(true);
    setAudioFeedback('🔊 กำลังออกเสียง...');

    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }

    const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;

    if (!hasSpeech) {
      playSynthFallbackChime();
      setAudioFeedback('💡 เบราว์เซอร์ไม่รองรับ TTS (เล่นเสียงสังเคราะห์แทน)');
      setIsPlaying(false);
      feedbackTimerRef.current = setTimeout(() => setAudioFeedback(null), 3000);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'zh-CN';
      utter.rate = 0.85;

      // Retain reference to prevent GC cutting audio mid-utterance
      speechUtteranceSet.add(utter);

      utter.onend = () => {
        speechUtteranceSet.delete(utter);
        setIsPlaying(false);
        setAudioFeedback('✅ ฟังเรียบร้อย');
        feedbackTimerRef.current = setTimeout(() => setAudioFeedback(null), 2000);
      };

      utter.onerror = () => {
        speechUtteranceSet.delete(utter);
        setIsPlaying(false);
        playSynthFallbackChime();
        setAudioFeedback('💡 เล่นเสียงสังเคราะห์ (สำรอง)');
        feedbackTimerRef.current = setTimeout(() => setAudioFeedback(null), 2500);
      };

      window.speechSynthesis.speak(utter);
    } catch {
      setIsPlaying(false);
      playSynthFallbackChime();
      setAudioFeedback('💡 กำลังเตรียมระบบเสียง');
      feedbackTimerRef.current = setTimeout(() => setAudioFeedback(null), 2500);
    }
  };

  return (
    <div
      style={{
        padding: 'clamp(10px, 3vw, 16px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        flex: 1,
        minWidth: '320px',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
    >
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
          fontSize: 'clamp(13px, 3.5vw, 15px)'
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
          gap: '14px'
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
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
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
            boxSizing: 'border-box'
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
              lineHeight: 1.2
            }}
          >
            你好
          </div>
          <div style={{ fontSize: 'clamp(15px, 4vw, 18px)', color: '#B45309', fontWeight: 600 }}>
            nǐ hǎo <span style={{ fontSize: '13px', color: '#8E95A3', fontWeight: 400 }}>(ผันเสียงจริง: ní hǎo)</span>
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
                gap: '4px'
              }}
            >
              <CheckCircle2 size={14} />
              <span>{audioFeedback}</span>
            </div>
          )}
        </div>

        {/* Listen Button with Anti-Cheat / Resilience */}
        <button
          onClick={() => handleSpeak('你好')}
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
            transition: 'all 0.15s ease'
          }}
        >
          <Volume2 size={20} />
          <span>{isPlaying ? 'กำลังพูด...' : 'กดฟังเสียงตัวอย่าง'}</span>
        </button>

        {/* Primary CTA Button */}
        <button
          onClick={() => handleSpeak('你好！很高兴认识你。')}
          style={{
            backgroundColor: '#F59E0B',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '15px',
            gap: '8px',
            width: '100%',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)'
          }}
        >
          <PlayCircle size={20} />
          <span>เริ่มเรียน Unit 1 (3 นาที) 🚀</span>
        </button>
      </main>

      {/* Footer Info */}
      <footer
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#8E95A3',
          marginTop: 'auto',
          padding: '8px'
        }}
      >
        Hanzero 🐰 • Zero-Cost & 60fps Mobile-Ready
      </footer>
    </div>
  );
};
export default App;

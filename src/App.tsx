import React, { useState } from 'react';
import { Sparkles, Heart, Flame, Volume2, CheckCircle2, BookOpen } from 'lucide-react';
import bunnyImg from '@/assets/brand/mascot_bunny.jpg';

export const App: React.FC = () => {
  const [hearts] = useState<number>(5);
  const [streak] = useState<number>(1);
  const [soundPlayed, setSoundPlayed] = useState<boolean>(false);

  const playSynthesizedTone = () => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
      setSoundPlayed(true);
      setTimeout(() => setSoundPlayed(false), 800);
    } catch {
      // Graceful fallback if AudioContext is not allowed before user gesture
    }
  };

  return (
    <div style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1rem',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-jade-dark)' }}>
            Hanzero
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              backgroundColor: 'var(--color-jade-light)',
              color: 'var(--color-jade-dark)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
            }}
          >
            Phase 1.1
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--color-ochre-dark)',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            <Flame size={18} fill="currentColor" />
            <span>{streak}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--color-vermilion-dark)',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            <Heart size={18} fill="currentColor" />
            <span>{hearts}</span>
          </div>
        </div>
      </header>

      {/* Hero Welcome Card */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border-warm)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <img
            src={bunnyImg}
            alt="Mascot Tutu the Lop-eared Bunny"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '3px solid var(--color-jade-dark)',
              boxShadow: '0 4px 16px rgba(4, 120, 87, 0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'var(--color-ochre-accent)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Sparkles size={18} />
          </div>
        </div>

        <div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--color-ink-900)',
              marginBottom: '0.25rem',
            }}
          >
            ยินดีต้อนรับสู่ Hanzero
          </h1>
          <p style={{ color: 'var(--color-ink-600)', fontSize: '0.95rem' }}>
            เริ่มจาก 0 สู่ภาษาจีนคล่องตัว 🐰
          </p>
        </div>

        {/* 3-Language Typography Preview Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'var(--color-rice-paper)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            border: '1px dashed var(--color-border-warm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <div
            className="font-hanzi"
            style={{
              fontSize: 'var(--font-hanzi-card)',
              fontWeight: 700,
              color: 'var(--color-jade-dark)',
              lineHeight: 1.1,
            }}
          >
            你好
          </div>
          <div
            className="font-pinyin"
            style={{
              fontSize: 'var(--font-pinyin-body)',
              fontWeight: 600,
              color: 'var(--color-ink-800)',
            }}
          >
            nǐ hǎo
          </div>
          <div
            style={{
              fontSize: '0.9rem',
              color: 'var(--color-ink-600)',
            }}
          >
            สวัสดี (Hello)
          </div>
        </div>

        {/* Interactive Audio SFX Test Button */}
        <button
          onClick={playSynthesizedTone}
          className="btn-spring btn-primary"
          style={{ width: '100%' }}
        >
          <Volume2 size={20} />
          <span>{soundPlayed ? 'Ding! 🎵' : 'ทดสอบ Web Audio SFX'}</span>
        </button>
      </section>

      {/* Scaffolding Status Checklist */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.85rem',
          }}
        >
          <BookOpen size={20} color="var(--color-jade-dark)" />
          <h2
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--color-ink-900)',
            }}
          >
            Phase 1.1 Ready Checklist
          </h2>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {[
            { title: 'Vite 6 + React 18 + TypeScript Strict', desc: 'Zero `any` & Path Alias @/*' },
            { title: 'Offline PWA & Manifest', desc: 'Tutu Mascot & Service Worker ready' },
            { title: 'Vitest + Testing Library', desc: 'JSDOM test runner ready' },
            { title: 'Modern Oriental Design Tokens', desc: 'Prompt + Noto Sans SC + Inter' },
          ].map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                fontSize: '0.85rem',
              }}
            >
              <CheckCircle2 size={18} color="var(--color-jade-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--color-ink-900)', display: 'block' }}>{item.title}</strong>
                <span style={{ color: 'var(--color-ink-600)' }}>{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;

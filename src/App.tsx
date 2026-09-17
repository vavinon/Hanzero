import React, { useState } from 'react';
import { Flame, Heart, Sparkles, Volume2 } from 'lucide-react';

export const App: React.FC = () => {
  const [streak] = useState<number>(1);
  const [hearts] = useState<number>(5);
  const [xp] = useState<number>(0);

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
      {/* Top Header Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid #E5E0D8'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#B45309' }}>
          <Flame size={20} color="#F59E0B" fill="#F59E0B" />
          <span>{streak} วัน</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#DC2626' }}>
          <Heart size={20} color="#DC2626" fill="#DC2626" />
          <span>{hearts}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#047857' }}>
          <Sparkles size={20} color="#10B981" />
          <span>{xp} XP</span>
        </div>
      </header>

      {/* Hero Welcome Card with น้องกระต่าย 🐰 */}
      <main
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px 20px',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          border: '1px solid #E5E0D8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <div
          style={{
            fontSize: '64px',
            lineHeight: 1,
            backgroundColor: '#ECFDF5',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #10B981'
          }}
        >
          🐰
        </div>

        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#047857', marginBottom: '4px' }}>
            Hanzero (ฮั่นซีโร่)
          </h1>
          <p style={{ fontSize: '14px', color: '#525866' }}>
            เริ่มจาก 0 สู่ภาษาจีนคล่องตัว • เรียนง่าย สบายใจ ไม่น่ากลัว
          </p>
        </div>

        {/* Bite-sized Preview Card */}
        <div
          style={{
            backgroundColor: '#FDFBF7',
            borderRadius: '16px',
            padding: '16px',
            width: '100%',
            border: '1px dashed #D1C9BE',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#8E95A3', fontWeight: 500 }}>
            ✨ คำแรกในชีวิตของผู้เริ่มต้น
          </div>
          <div style={{ fontSize: '44px', fontWeight: 700, color: '#1A1D20', fontFamily: 'var(--font-hanzi-hero)' }}>
            你好
          </div>
          <div style={{ fontSize: '18px', color: '#B45309', fontWeight: 600 }}>
            nǐ hǎo <span style={{ fontSize: '14px', color: '#8E95A3', fontWeight: 400 }}>(ออกเสียงจริง: ní hǎo)</span>
          </div>
          <div style={{ fontSize: '15px', color: '#047857', fontWeight: 500 }}>
            สวัสดี (Hello)
          </div>
        </div>

        <button
          onClick={() => {
            if ('speechSynthesis' in window) {
              const utter = new SpeechSynthesisUtterance('你好');
              utter.lang = 'zh-CN';
              utter.rate = 0.85;
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(utter);
            }
          }}
          style={{
            backgroundColor: '#047857',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '16px',
            gap: '8px',
            width: '100%',
            boxShadow: '0 4px 12px rgba(4, 120, 87, 0.25)'
          }}
        >
          <Volume2 size={20} />
          <span>กดฟังเสียงตัวอย่าง</span>
        </button>
      </main>

      {/* Footer Info */}
      <footer style={{ textAlign: 'center', fontSize: '12px', color: '#8E95A3', marginTop: 'auto', padding: '12px' }}>
        Phase 1: Web Foundation & Pure Engines 🐰
      </footer>
    </div>
  );
};
export default App;

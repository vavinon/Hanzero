/**
 * src/components/layout/ImmersionHub.tsx
 * -------------------------------------------------------------------------
 * Immersion Quest Hub (หอวิชาการฮั่นหลิน 翰林院)
 * Grand Unified Portal for Tier 3: Master & Tier 4: Legend Learners.
 *
 * Integrates:
 * 1. 📖 Smart Immersion Reader (Intl.Segmenter + HSK Heatmap + Tap-to-Inspect)
 * 2. 📜 成语 Lore & Dilemma Simulator (Historical Parchment + Crisis Cases)
 * 3. 🎧 Native Speed Audio Ladder & Commute Podcast (0.75x–1.5x + Ambient)
 * 4. 🎙️ Voice Pitching & Shadowing 2.0 Studio (Canvas 60fps Waveform)
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Modern Oriental Aesthetics (Imperial Scholar, Jade Deep, Cinnabar Red, Ochre Gold)
 * - Mobile-first ergonomic touch targets (>= 44x44px)
 * - Pure TypeScript Strict, Zero `any`
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Scroll,
  Headphones,
  Mic,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Award,
  LayoutGrid,
} from 'lucide-react';
import { ImmersionArticleReader } from '../reader/ImmersionArticleReader';
import { IdiomExplorer } from '../idiom/IdiomExplorer';
import { PodcastPlayerSheet } from '../audio/PodcastPlayerSheet';
import { VoicePitchingRecorder } from '../voice/VoicePitchingRecorder';
import { playClick } from '../../engines/audio/audioEngine';

export type ImmersionTab = 'overview' | 'reader' | 'idiom' | 'podcast' | 'voice';

export interface ImmersionHubProps {
  initialTab?: ImmersionTab;
  onBackToMap?: () => void;
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
  className?: string;
}

export const ImmersionHub: React.FC<ImmersionHubProps> = ({
  initialTab = 'overview',
  onBackToMap,
  onAddSRS,
  existingSrsCardIds = [],
  existingSrsHanzis = [],
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<ImmersionTab>(initialTab);

  const handleTabChange = (tab: ImmersionTab) => {
    playClick();
    setActiveTab(tab);
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        // Safe ignore for environments without scrollTo support
      }
    }
  };

  const navItems: Array<{ id: ImmersionTab; label: string; icon: React.ReactNode; tag: string }> = [
    { id: 'overview', label: 'ภาพรวมหอวิชา', icon: <LayoutGrid className="w-4 h-4" />, tag: 'Hub' },
    { id: 'reader', label: 'คลังบทความ', icon: <BookOpen className="w-4 h-4" />, tag: 'HSK 5-9' },
    { id: 'idiom', label: 'หอสำนวน成语', icon: <Scroll className="w-4 h-4" />, tag: 'Lore & Sim' },
    { id: 'podcast', label: 'สถานีพอดแคสต์', icon: <Headphones className="w-4 h-4" />, tag: '0.75-1.5x' },
    { id: 'voice', label: 'สตูดิโอฝึกพูด 2.0', icon: <Mic className="w-4 h-4" />, tag: 'Waveform' },
  ];

  return (
    <div
      className={`immersion-hub w-full min-h-screen bg-stone-50 text-slate-800 flex flex-col ${className}`}
      data-testid="immersion-hub"
    >
      {/* Top Banner Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onBackToMap && (
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onBackToMap();
                }}
                className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-stone-100 flex items-center justify-center transition-colors active:scale-95"
                title="กลับสู่แผนที่ผจญภัย"
                data-testid="btn-hub-back-to-map"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-serif font-bold text-slate-900 tracking-wide">
                  หอวิชาการฮั่นหลิน 翰林院
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Tier 3 & 4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                ศูนย์รวมบทความ สุภาษิต พอดแคสต์ และสตูดิโอฝึกพูดระดับ Master & Legend
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>32 Units (26–57)</span>
            </span>
          </div>
        </div>

        {/* Horizontal Scrollable Tabs */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1.5 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabChange(item.id)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all duration-150 ${
                activeTab === item.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200/80'
              }`}
              data-testid={`hub-nav-tab-${item.id}`}
            >
              {item.icon}
              <span>{item.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                  activeTab === item.id
                    ? 'bg-slate-800 text-emerald-300'
                    : 'bg-stone-200/90 text-slate-500'
                }`}
              >
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Dynamic Workspace Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8" data-testid="hub-overview-content">
            {/* Imperial Scholar Hero Greeting (Modern Oriental Aesthetic) */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-950 via-emerald-950 to-stone-900 border border-amber-900/40 p-6 sm:p-10 text-white shadow-xl">
              {/* Imperial Seal Stamp (ตราประทับราชสำนักฮั่นหลิน) */}
              <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none">
                <div
                  style={{
                    border: '3px solid rgba(220, 38, 38, 0.45)',
                    backgroundColor: 'rgba(185, 28, 28, 0.12)',
                    boxShadow: 'inset 0 0 20px rgba(220, 38, 38, 0.25)',
                    writingMode: 'vertical-rl',
                    fontFamily: 'var(--font-hanzi-hero, serif)',
                  }}
                  className="rounded-2xl p-4 sm:p-6 text-red-400/80 font-serif font-black tracking-widest text-2xl sm:text-4xl uppercase"
                >
                  翰林院印
                </div>
              </div>

              <div className="max-w-2xl flex flex-col gap-3 relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-950/70 border border-amber-600/40 px-3 py-1 rounded-full w-fit shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>หอวิชาการฮั่นหลิน · Imperial Scholar Academy (Tier 3 & 4)</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-wide leading-tight text-stone-100">
                  เริ่มจาก 0 สู่ปัญญาชนจีนระดับมืออาชีพ
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                  ยินดีต้อนรับสู่หอเกียรติยศชั้นสูง ที่ซึ่งภาษาจีนไม่ได้มีไว้เพียงเพื่อเอาตัวรอด 
                  แต่เพื่อซึมซับแก่นแท้แห่งวรรณกรรม ธุรกิจ สุภาษิต และสำเนียงธรรมชาติอย่างสง่างาม
                </p>

                {/* Academy Quick Stats Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-3 text-xs">
                  <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-emerald-300 font-semibold flex items-center gap-1.5">
                    📜 คลังบทความ HSK 5–9
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-amber-300 font-semibold flex items-center gap-1.5">
                    🏯 成语 Lore ม้วนคัมภีร์ & วิกฤต
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-teal-300 font-semibold flex items-center gap-1.5">
                    🎙️ ห้องแล็บคลื่นเสียง 60fps
                  </span>
                </div>
              </div>
            </div>

            {/* Section Heading */}
            <div className="flex items-center justify-between border-b border-stone-200/90 pb-3">
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900 tracking-wide flex items-center gap-2">
                  <span>🏛️</span>
                  <span>4 ปีกวิชาการแห่งฮั่นหลิน (Grand Scholar Portals)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  เลือกโซนการเรียนรู้ที่ต้องการศึกษาเพื่อเปิดประสบการณ์แบบเต็มผืนจอ
                </p>
              </div>
            </div>

            {/* Grand Gallery Grid (2 คอลัมน์ขนาดใหญ่พร้อม Badge & Preview ชัดเจน) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Portal 1: Smart Immersion Reader */}
              <div
                onClick={() => handleTabChange('reader')}
                className="p-6 rounded-3xl bg-white border-2 border-stone-200 hover:border-emerald-600 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                data-testid="quest-card-reader"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                      <BookOpen className="w-6 h-6" />
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                        HSK 5 · 4 นาที
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        Intl.Segmenter
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      📜 คลังบทความอรรถรสจริง (Smart Immersion Reader)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      อ่านบทความเจรจาการค้าระหว่างประเทศ, สัญญาจัดซื้อ, และสารคดีวัฒนธรรม พร้อมระบบตัดคำอัจฉริยะ แตะดูคำแปล และส่งตรงเข้าคลัง SRS
                    </p>
                  </div>

                  {/* Micro Preview Snip */}
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] text-stone-600 line-clamp-2 italic font-serif">
                    &ldquo;在跨国商务谈判中，双方本着互利共赢的原则开展合作，是促成签约的关键基石...&rdquo;
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-stone-100 text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                  <span className="flex items-center gap-1">
                    เข้าสู่ห้องอ่านบทความวิเคราะห์
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 2: 成语 Lore & Dilemma Simulator */}
              <div
                onClick={() => handleTabChange('idiom')}
                className="p-6 rounded-3xl bg-white border-2 border-stone-200 hover:border-amber-600 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                data-testid="quest-card-idiom"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-3 rounded-2xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                      <Scroll className="w-6 h-6" />
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        Visual Novel Lore
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        15+ สำนวนเอก
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      🏯 ปรัชญาและสำนวนจีนสุภาษิต (成语 Lore & Dilemma)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      เจาะลึกที่มาสำนวน 4 ตัวอักษรผ่านภาพม้วนคัมภีร์โบราณ พร้อมจำลองสถานการณ์วิกฤตทางธุรกิจและการตัดสินใจเชิงกลยุทธ์
                    </p>
                  </div>

                  {/* Micro Preview Snip */}
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-900 line-clamp-2 font-serif">
                    ⚖️ <strong>กรณีจำลอง:</strong> ซัพพลายเออร์ส่งสินค้าช้า 10 วัน คุณจะใช้วิธี &quot;破釜沉舟&quot; หรือ &quot;居安思危&quot;?
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-stone-100 text-xs font-bold text-amber-700 group-hover:text-amber-800">
                  <span className="flex items-center gap-1">
                    เปิดม้วนคัมภีร์สำนวนจีน
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 3: Commute Podcast & Native Speed Ladder */}
              <div
                onClick={() => handleTabChange('podcast')}
                className="p-6 rounded-3xl bg-white border-2 border-stone-200 hover:border-teal-600 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                data-testid="quest-card-podcast"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-3 rounded-2xl bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                      <Headphones className="w-6 h-6" />
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-300">
                        0.75x · 1.0x · 1.5x
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        Ambient Sound
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      🎙️ ห้องแล็บฝึกฟังความเร็วธรรมชาติ (Commute Podcast)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      ไต่ระดับบันไดความเร็วเสียงเพื่อความคุ้นชินสำเนียงคนจีนจริง พร้อมแทร็กจำลองบรรยากาศรอบตัว (รถไฟฟ้า, คาเฟ่, ประชุมงาน)
                    </p>
                  </div>

                  {/* Micro Preview Snip */}
                  <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-200/80 text-[11px] text-teal-900 flex items-center justify-between">
                    <span>🎵 กำลังสตรีม: บทสนทนาการทำงานประจำวัน</span>
                    <span className="font-mono font-bold text-teal-700">1.25x Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-stone-100 text-xs font-bold text-teal-700 group-hover:text-teal-800">
                  <span className="flex items-center gap-1">
                    เข้าสู่สถานีพอดแคสต์
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 4: Voice Pitching & Shadowing 2.0 Studio */}
              <div
                onClick={() => handleTabChange('voice')}
                className="p-6 rounded-3xl bg-white border-2 border-stone-200 hover:border-purple-600 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                data-testid="quest-card-voice"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="p-3 rounded-2xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                      <Mic className="w-6 h-6" />
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
                        Canvas 60fps
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        Dual Waveform
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      🗣️ เวทีฝึกออกเสียงสด (Voice Lab & Tone Matcher)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      ฝึกซ้อมนำเสนอยาว 15–30 วินาที ตรวจจับคลื่นเสียงความถี่สด และเทียบการผันเสียงวรรณยุกต์ (Tone Sandhi) อย่างแม่นยำ
                    </p>
                  </div>

                  {/* Micro Preview Snip */}
                  <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-200/80 text-[11px] text-purple-900 flex items-center justify-between">
                    <span>📊 ระบบวิเคราะห์ Pitch Waveform ความแม่นยำสูง</span>
                    <span className="font-semibold text-purple-700">พร้อมอัดเสียง</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-stone-100 text-xs font-bold text-purple-700 group-hover:text-purple-800">
                  <span className="flex items-center gap-1">
                    เข้าสู่สตูดิโอฝึกพูดสด
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Smart Immersion Reader */}
        {activeTab === 'reader' && (
          <div data-testid="hub-reader-content">
            <ImmersionArticleReader
              onBack={() => handleTabChange('overview')}
              onAddSRS={onAddSRS}
              existingSrsCardIds={existingSrsCardIds}
              existingSrsHanzis={existingSrsHanzis}
            />
          </div>
        )}

        {/* Tab 3: 成语 Lore & Dilemma Simulator */}
        {activeTab === 'idiom' && (
          <div data-testid="hub-idiom-content">
            <IdiomExplorer
              onBack={() => handleTabChange('overview')}
              onAddSRS={onAddSRS}
              existingSrsCardIds={existingSrsCardIds}
            />
          </div>
        )}

        {/* Tab 4: Commute Podcast Station */}
        {activeTab === 'podcast' && (
          <div className="max-w-xl mx-auto" data-testid="hub-podcast-content">
            <PodcastPlayerSheet onClose={() => handleTabChange('overview')} />
          </div>
        )}

        {/* Tab 5: Voice Pitching & Shadowing 2.0 Studio */}
        {activeTab === 'voice' && (
          <div data-testid="hub-voice-content">
            <VoicePitchingRecorder />
          </div>
        )}
      </main>
    </div>
  );
};

export default ImmersionHub;

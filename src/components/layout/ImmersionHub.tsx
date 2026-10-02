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
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-4 py-5">
        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6" data-testid="hub-overview-content">
            {/* Scholar Hero Greeting */}
            <div className="p-5 sm:p-7 rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-lg relative overflow-hidden">
              <div className="max-w-xl flex flex-col gap-2 relative z-10">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30 w-fit">
                  <Sparkles className="w-3.5 h-3.5" />
                  ยินดีต้อนรับสู่แดนปัญญาชน Hanzero Immersion
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide">
                  ก้าวข้ามการเอาตัวรอด สู่ภาษาจีนขั้นสูงระดับมืออาชีพ
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  ฝึกฝนทักษะการอ่านบทความวิเคราะห์เจาะลึก, ถอดรหัสสำนวนโบราณ 4 ตัวอักษร,
                  เปิดฟังพอดแคสต์สำเนียงสมจริง 0.75x–1.5x, และซ้อมพูดนำเสนอพร้อมระบบวัดคลื่นเสียง
                </p>
              </div>
              <div className="absolute right-4 bottom-2 text-7xl sm:text-8xl opacity-15 select-none font-serif">
                龍
              </div>
            </div>

            {/* 4 Quest Portals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Smart Immersion Reader */}
              <div
                onClick={() => handleTabChange('reader')}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group min-h-[160px]"
                data-testid="quest-card-reader"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Intl.Segmenter
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    คลังบทความ Smart Immersion Reader
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    อ่านบทความจีนร่วมสมัยพร้อมระบบตัดคำอัจฉริยะ, ไฮไลต์สี HSK Heatmap, แตะดูคำแปล และกดบันทึกเข้า SRS
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-semibold text-emerald-700">
                  <span>เปิดอ่านบทความ</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Idiom Lore & Dilemma Engine */}
              <div
                onClick={() => handleTabChange('idiom')}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group min-h-[160px]"
                data-testid="quest-card-idiom"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Scroll className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Visual Novel Sim
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    หอเกียรติยศสำนวนจีน 成语 Lore
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    เรียนรู้ที่มาสำนวนจีน 4 ตัวอักษรผ่านม้วนคัมภีร์โบราณ และทดสอบการตัดสินใจในสถานการณ์วิกฤตจำลอง
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-semibold text-amber-700">
                  <span>เข้าสู่หอสำนวน</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Native Speed Podcast Ladder */}
              <div
                onClick={() => handleTabChange('podcast')}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group min-h-[160px]"
                data-testid="quest-card-podcast"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <Headphones className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                      0.75x – 1.5x
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                    สถานีพอดแคสต์ & บันไดเสียงธรรมชาติ
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    ฝึกฟังบทสนทนาความเร็วสมจริง พร้อมเสียงบรรยากาศจำลอง (รถไฟใต้ดิน, คาเฟ่, ออฟฟิศ) และไฮไลต์คาราโอเกะ
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-semibold text-teal-700">
                  <span>เปิดฟังพอดแคสต์</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 4: Voice Pitching & Shadowing 2.0 */}
              <div
                onClick={() => handleTabChange('voice')}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group min-h-[160px]"
                data-testid="quest-card-voice"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Mic className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      Canvas 60fps
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                    สตูดิโอฝึกพูดนำเสนอ & จำลองวิกฤต 2.0
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    ฝึกซ้อมนำเสนอต่อเนื่อง 15–30 วิ พร้อมตรวจจับคลื่นเสียงสดบน Canvas และฟังก์ชันฟังเทียบเสียงผู้เรียนกับต้นแบบ
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-semibold text-purple-700">
                  <span>เข้าห้องอัดเสียง</span>
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

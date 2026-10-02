/**
 * src/components/idiom/IdiomExplorer.tsx
 * Modern Oriental 成语 (Idiom) Lore & Dilemma Engine Explorer.
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Modern Oriental Minimalism aesthetic (Parchment texture, ink accents)
 * - 60fps transitions & touch targets >= 44px
 * - Interactive Story Panels (Visual Novel style)
 * - Corporate & Life Dilemma Simulator integration
 * - Instant SRS Fast Bridge
 */

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Swords,
  Search,
  Filter,
  Volume2,
  ChevronLeft,
  ChevronRight,
  X,
  BookmarkCheck,
  Plus,
  Scroll,
  ArrowRight,
  Layers,
  History,
  Quote,
} from 'lucide-react';
import type {
  IdiomLoreEntry,
  IdiomCategory,
  DilemmaEvaluationResult,
} from '../../types/idiom';
import {
  searchIdioms,
  getAllDilemmas,
  createSRSItemFromIdiom,
  getIdiomById,
} from '../../engines/idiom/idiomLoreEngine';
import { IdiomDilemmaCard } from './IdiomDilemmaCard';
import { speak, playClick } from '../../engines/audio/audioEngine';

export interface IdiomExplorerProps {
  onBack?: () => void;
  onAddSRS?: (srsItem: ReturnType<typeof createSRSItemFromIdiom>) => Promise<void> | void;
  existingSrsCardIds?: string[];
  initialIdiomId?: string;
  initialMode?: 'lore' | 'dilemma';
}

const CATEGORY_TABS: Array<{ id: IdiomCategory | 'all'; labelTh: string }> = [
  { id: 'all', labelTh: 'ทั้งหมด' },
  { id: 'strategy', labelTh: 'กลยุทธ์' },
  { id: 'prudence', labelTh: 'ความรอบคอบ' },
  { id: 'perseverance', labelTh: 'ความเพียร' },
  { id: 'deception', labelTh: 'ภาพลวงตา' },
  { id: 'virtue', labelTh: 'คุณธรรม' },
  { id: 'daily_wisdom', labelTh: 'ปัญญาชีวิต' },
];

export const IdiomExplorer: React.FC<IdiomExplorerProps> = ({
  onBack,
  onAddSRS,
  existingSrsCardIds = [],
  initialIdiomId,
  initialMode = 'lore',
}) => {
  const [activeTab, setActiveTab] = useState<'lore' | 'dilemma'>(initialMode);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<IdiomCategory | 'all'>('all');
  const [selectedHsk, setSelectedHsk] = useState<number | 'all'>('all');

  // Modal / Parchment state
  const [selectedIdiom, setSelectedIdiom] = useState<IdiomLoreEntry | null>(() => {
    return initialIdiomId ? getIdiomById(initialIdiomId) || null : null;
  });
  const [storyPanelIndex, setStoryPanelIndex] = useState<number>(0);

  // Dilemma Simulator state
  const allDilemmaItems = useMemo(() => getAllDilemmas(), []);
  const [activeDilemmaIndex, setActiveDilemmaIndex] = useState<number>(0);
  const [dilemmaScores, setDilemmaScores] = useState<Record<string, number>>({});
  const [addedSrsIds, setAddedSrsIds] = useState<Set<string>>(() => new Set(existingSrsCardIds));

  // Filtered idioms
  const filteredIdioms = useMemo(() => {
    return searchIdioms(searchQuery, {
      category: selectedCategory,
      hskLevel: selectedHsk,
    });
  }, [searchQuery, selectedCategory, selectedHsk]);

  const totalScore = useMemo(() => {
    return Object.values(dilemmaScores).reduce((sum, val) => sum + val, 0);
  }, [dilemmaScores]);

  const handleOpenIdiomStory = (idiom: IdiomLoreEntry) => {
    playClick();
    setSelectedIdiom(idiom);
    setStoryPanelIndex(0);
  };

  const handleCloseStory = () => {
    playClick();
    setSelectedIdiom(null);
  };

  const handleSpeakText = (text: string) => {
    speak(text);
  };

  const handleAddSRS = async (idiom: IdiomLoreEntry) => {
    if (!onAddSRS) return;
    playClick();
    const item = createSRSItemFromIdiom(idiom);
    await onAddSRS(item);
    setAddedSrsIds((prev) => new Set(prev).add(item.word_id));
  };

  const handleAddSRSItem = async (srsItem: ReturnType<typeof createSRSItemFromIdiom>) => {
    if (!onAddSRS) return;
    await onAddSRS(srsItem);
    setAddedSrsIds((prev) => new Set(prev).add(srsItem.word_id));
  };

  const handleDilemmaSolved = (result: DilemmaEvaluationResult) => {
    setDilemmaScores((prev) => ({
      ...prev,
      [result.dilemmaId]: result.scoreAwarded,
    }));
  };

  const handleNextDilemma = () => {
    playClick();
    setActiveDilemmaIndex((prev) => (prev + 1) % allDilemmaItems.length);
  };

  const handleJumpToIdiomDilemma = (idiom: IdiomLoreEntry) => {
    playClick();
    const foundIndex = allDilemmaItems.findIndex(
      (item) => item.idiom.id === idiom.id || item.idiom.idiom === idiom.idiom
    );
    if (foundIndex !== -1) {
      setActiveDilemmaIndex(foundIndex);
      setSelectedIdiom(null);
      setActiveTab('dilemma');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="p-2 -ml-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="ย้อนกลับ"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 dark:from-amber-400 dark:to-amber-200 bg-clip-text text-transparent">
                  成语 Lore & Dilemma Engine
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50">
                  Tier 3-4
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                เรียนรู้สุภาษิตจีนผ่านนิทานประวัติศาสตร์และสถานการณ์จำลองวิกฤต
              </p>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveTab('lore');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'lore'
                  ? 'bg-white dark:bg-stone-700 text-amber-900 dark:text-amber-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Scroll className="w-4 h-4" />
              <span>ม้วนคัมภีร์</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveTab('dilemma');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'dilemma'
                  ? 'bg-white dark:bg-stone-700 text-amber-900 dark:text-amber-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>จำลองวิกฤต</span>
              {totalScore > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-bold">
                  {totalScore}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* ================= MODE 1: LORE EXPLORER ================= */}
        {activeTab === 'lore' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาสำนวนจีน พินอิน หรือความหมายภาษาไทย (เช่น 破釜沉舟, ทุบหม้อข้าว, pò fǔ)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  data-testid="idiom-search-input"
                />
              </div>

              {/* Category Pills & HSK Filter */}
              <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                  {CATEGORY_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        playClick();
                        setSelectedCategory(tab.id);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                        selectedCategory === tab.id
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                      }`}
                    >
                      {tab.labelTh}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Filter className="w-3.5 h-3.5 text-stone-400" />
                  <select
                    value={selectedHsk}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedHsk(val === 'all' ? 'all' : Number(val));
                    }}
                    className="text-xs bg-stone-100 dark:bg-stone-800 border-none rounded-lg px-2.5 py-1 text-stone-700 dark:text-stone-300 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">HSK ทุกระดับ</option>
                    <option value="4">HSK 4</option>
                    <option value="5">HSK 5</option>
                    <option value="6">HSK 6</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Idioms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredIdioms.map((idiom) => {
                const srsKey = `idiom_${idiom.id.replace('idiom-', '')}`;
                const isAdded = addedSrsIds.has(srsKey);

                return (
                  <div
                    key={idiom.id}
                    onClick={() => handleOpenIdiomStory(idiom)}
                    className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600/60 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
                    data-testid={`idiom-card-${idiom.id}`}
                  >
                    {/* Top Row */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-2xl font-bold tracking-wide text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                            {idiom.idiom}
                          </span>
                          <button
                            type="button"
                            title="ฟังเสียงสำนวน"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakText(idiom.idiom);
                            }}
                            className="p-1 rounded-full text-stone-400 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                            HSK {idiom.hskLevel}
                          </span>
                          {isAdded && (
                            <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          )}
                        </div>
                      </div>

                      {/* Pinyin */}
                      <p className="text-xs font-mono text-amber-700 dark:text-amber-400 mb-2">
                        {idiom.pinyin}
                      </p>

                      {/* Figurative Meaning */}
                      <p className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-snug mb-1">
                        {idiom.figurativeMeaningTh}
                      </p>

                      {/* Literal Meaning */}
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        ตรงตัว: {idiom.literalMeaningTh}
                      </p>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
                      <div className="flex items-center gap-1 truncate max-w-[70%]">
                        <History className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{idiom.historicalOrigin.sourceBook}</span>
                      </div>
                      <span className="text-amber-600 dark:text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>เปิดคัมภีร์</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredIdioms.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6">
                <BookOpen className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
                <p className="text-stone-600 dark:text-stone-400 text-sm">
                  ไม่พบสำนวนที่ตรงกับการค้นหา '{searchQuery}'
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= MODE 2: DILEMMA SIMULATOR ================= */}
        {activeTab === 'dilemma' && allDilemmaItems.length > 0 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Dilemma Selector & Progress Bar */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-stone-500">สถานการณ์:</span>
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {activeDilemmaIndex + 1} / {allDilemmaItems.length}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setActiveDilemmaIndex((prev) =>
                      prev === 0 ? allDilemmaItems.length - 1 : prev - 1
                    );
                  }}
                  className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                  aria-label="ด่านก่อนหน้า"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextDilemma}
                  className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                  aria-label="ด่านถัดไป"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dilemma Card Component */}
            <IdiomDilemmaCard
              key={allDilemmaItems[activeDilemmaIndex].dilemma.id}
              dilemmaCase={allDilemmaItems[activeDilemmaIndex].dilemma}
              parentIdiom={allDilemmaItems[activeDilemmaIndex].idiom}
              onSolve={handleDilemmaSolved}
              onAddSRS={handleAddSRSItem}
              isAddedToSRS={addedSrsIds.has(
                `idiom_${allDilemmaItems[activeDilemmaIndex].idiom.id.replace('idiom-', '')}`
              )}
              onNextDilemma={handleNextDilemma}
            />
          </div>
        )}
      </main>

      {/* ================= VISUAL NOVEL / PARCHMENT STORY MODAL ================= */}
      {selectedIdiom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
          data-testid="idiom-story-modal"
        >
          {/* Parchment Box */}
          <div className="bg-[#FFFDF9] dark:bg-stone-900 border-2 border-amber-800/30 dark:border-amber-700/40 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative text-stone-900 dark:text-stone-100">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#FFFDF9]/95 dark:bg-stone-900/95 backdrop-blur-md px-6 py-4 border-b border-amber-200/50 dark:border-stone-800 flex items-center justify-between gap-3 z-10">
              <div className="flex items-center gap-2">
                <Scroll className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <span className="font-semibold text-sm text-amber-900 dark:text-amber-300">
                  ม้วนคัมภีร์ประวัติศาสตร์: {selectedIdiom.historicalOrigin.sourceBook}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseStory}
                className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 transition-colors"
                aria-label="ปิดม้วนคัมภีร์"
                data-testid="close-story-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Idiom Hero Callout */}
              <div className="text-center py-4 bg-amber-50/70 dark:bg-stone-800/40 rounded-2xl border border-amber-200/60 dark:border-stone-700/60">
                <div className="flex items-center justify-center gap-3">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-widest text-amber-950 dark:text-amber-200">
                    {selectedIdiom.idiom}
                  </h2>
                  <button
                    type="button"
                    title="ฟังเสียงพากย์สำนวน"
                    onClick={() => handleSpeakText(selectedIdiom.idiom)}
                    className="p-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm font-mono text-amber-700 dark:text-amber-400 mt-1 font-medium">
                  {selectedIdiom.pinyin}
                </p>
                <p className="text-base font-semibold text-stone-800 dark:text-stone-200 mt-2 px-4">
                  {selectedIdiom.figurativeMeaningTh}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  ความหมายตรงตัว: {selectedIdiom.literalMeaningTh}
                </p>
              </div>

              {/* Historical Context Badge Row */}
              <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-stone-600 dark:text-stone-400">
                <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800">
                  ยุคสมัย: {selectedIdiom.historicalOrigin.dynastyTh}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800">
                  บุคคลสำคัญ: {selectedIdiom.historicalOrigin.keyFigures.join(', ')}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800">
                  เวลา: {selectedIdiom.historicalOrigin.periodApprox}
                </span>
              </div>

              {/* Visual Novel Story Panel Carousel */}
              {selectedIdiom.historicalOrigin.storyPanels.length > 0 && (
                <div className="bg-white dark:bg-stone-800/80 border border-amber-200 dark:border-stone-700 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                      ฉากที่ {storyPanelIndex + 1} จาก {selectedIdiom.historicalOrigin.storyPanels.length}:{' '}
                      {selectedIdiom.historicalOrigin.storyPanels[storyPanelIndex].titleTh}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={storyPanelIndex === 0}
                        onClick={() => {
                          playClick();
                          setStoryPanelIndex((prev) => Math.max(0, prev - 1));
                        }}
                        className="p-1 rounded border border-stone-200 dark:border-stone-700 disabled:opacity-30"
                        aria-label="เฟรมก่อนหน้า"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={
                          storyPanelIndex ===
                          selectedIdiom.historicalOrigin.storyPanels.length - 1
                        }
                        onClick={() => {
                          playClick();
                          setStoryPanelIndex((prev) =>
                            Math.min(
                              selectedIdiom.historicalOrigin.storyPanels.length - 1,
                              prev + 1
                            )
                          );
                        }}
                        className="p-1 rounded border border-stone-200 dark:border-stone-700 disabled:opacity-30"
                        aria-label="เฟรมถัดไป"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Classical Quote Callout */}
                  {selectedIdiom.historicalOrigin.storyPanels[storyPanelIndex].quoteZh && (
                    <div className="bg-amber-50/80 dark:bg-stone-900/60 border-l-4 border-amber-600 rounded-r-xl p-3.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                          <Quote className="w-3.5 h-3.5" />
                          <span>
                            {selectedIdiom.historicalOrigin.storyPanels[storyPanelIndex].characterName ||
                              'บันทึกพงศาวดาร'}
                          </span>
                        </span>
                        <button
                          type="button"
                          title="ฟังคำกล่าวภาษาจีนโบราณ"
                          onClick={() =>
                            handleSpeakText(
                              selectedIdiom.historicalOrigin.storyPanels[storyPanelIndex].quoteZh || ''
                            )
                          }
                          className="p-1 text-stone-400 hover:text-amber-600"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                        {selectedIdiom.historicalOrigin.storyPanels[storyPanelIndex].quoteZh}
                      </p>
                      <p className="text-xs font-mono text-amber-700 dark:text-amber-400">
                        {selectedIdiom.historicalOrigin.storyPanels[storyPanelIndex].quotePinyin}
                      </p>
                      <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                        "{selectedIdiom.historicalOrigin.storyPanels[storyPanelIndex].quoteTh}"
                      </p>
                    </div>
                  )}

                  {/* Scene Description */}
                  <p className="text-sm md:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    {selectedIdiom.historicalOrigin.storyPanels[storyPanelIndex].sceneTh}
                  </p>
                </div>
              )}

              {/* Synonym Nuance Matrix */}
              {selectedIdiom.synonymNuance && (
                <div className="bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-stone-900 dark:text-stone-100">
                    <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>
                      การจำแนกสำนวนคู่แฝด (Synonym Nuance): {selectedIdiom.idiom} vs{' '}
                      {selectedIdiom.synonymNuance.synonym}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {selectedIdiom.synonymNuance.keyDifferenceTh}
                  </p>
                  <p className="text-xs text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 p-2.5 rounded-xl">
                    💡 <strong>คำแนะนำการใช้งาน:</strong> {selectedIdiom.synonymNuance.usageAdviceTh}
                  </p>
                </div>
              )}

              {/* Bottom Actions inside Modal */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleAddSRS(selectedIdiom)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    addedSrsIds.has(`idiom_${selectedIdiom.id.replace('idiom-', '')}`)
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200'
                  }`}
                  data-testid="modal-add-srs-btn"
                >
                  {addedSrsIds.has(`idiom_${selectedIdiom.id.replace('idiom-', '')}`) ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>อยู่ในคลัง SRS แล้ว</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>+ บันทึกเข้า SRS</span>
                    </>
                  )}
                </button>

                {selectedIdiom.dilemmas && selectedIdiom.dilemmas.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleJumpToIdiomDilemma(selectedIdiom)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-sm active:scale-95"
                    data-testid="modal-solve-dilemma-btn"
                  >
                    <span>ฝึกแก้สถานการณ์</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

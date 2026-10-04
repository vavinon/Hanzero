/**
 * src/components/vocab/VocabLibraryView.tsx
 * HSK 3.0 Master Vocabulary Library & Universal Search Explorer.
 * Allows instant search, filter by Level (HSK 1-6), category tagging,
 * audio pronunciation playback (Normal/Slow), and adding to SRS.
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Volume2, BookPlus, Sparkles, Filter, X, ArrowLeft, Check, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { HSKWord, HSKLevel, VocabCategory, queryHskWords, getHskLevelCounts, allHskWords } from '../../data/hsk';
import { speak } from '../../engines/audio/audioEngine';

export interface VocabLibraryViewProps {
  onBackToDirectory?: () => void;
  onAddVocabToSrs?: (word: HSKWord) => void;
  existingSrsHanzis?: string[];
}

const ITEMS_PER_PAGE = 30;

const CATEGORY_LABELS: Record<VocabCategory, string> = {
  greetings: '👋 ทักทาย & สุภาพ',
  numbers_time: '🔢 ตัวเลข & เวลา',
  food_drinks: '🍜 อาหาร & เครื่องดื่ม',
  shopping: '🛍️ ช็อปปิ้ง & ราคา',
  travel_transit: '✈️ เดินทาง & ท่องเที่ยว',
  family_people: '👨‍👩‍👧 ครอบครัว & บุคคล',
  daily_life: '🏠 กิจวัตรประจำวัน',
  work_business: '💼 ทำงาน & ธุรกิจ',
  education: '📚 การเรียน & วิชาการ',
  emotions: '💖 อารมณ์ & ความรู้สึก',
  nature_weather: '🌤️ สภาพอากาศ',
  general: '✨ ทั่วไป',
};

export const VocabLibraryView: React.FC<VocabLibraryViewProps> = ({
  onBackToDirectory,
  onAddVocabToSrs,
  existingSrsHanzis = [],
}) => {
  const [selectedLevel, setSelectedLevel] = useState<HSKLevel | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [slowAudioMap, setSlowAudioMap] = useState<Record<string, boolean>>({});
  const [savedStatusMap, setSavedStatusMap] = useState<Record<string, boolean>>({});

  const levelCounts = useMemo(() => getHskLevelCounts(), []);

  // Reset to page 1 whenever search or filter criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLevel, selectedCategory, searchQuery]);

  const filteredWords = useMemo(() => {
    return queryHskWords({
      level: selectedLevel,
      category: selectedCategory,
      searchQuery,
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredWords.length / ITEMS_PER_PAGE));
  const paginatedWords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredWords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredWords, currentPage]);

  const handlePageChange = (newPage: number) => {
    const targetPage = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayAudio = (hanzi: string, wordId: string) => {
    const isSlow = slowAudioMap[wordId] || false;
    speak(hanzi, { rate: isSlow ? 0.75 : 1.0 });
  };

  const toggleSpeed = (wordId: string) => {
    setSlowAudioMap((prev) => ({
      ...prev,
      [wordId]: !prev[wordId],
    }));
  };

  const handleSaveToSrs = (word: HSKWord) => {
    if (onAddVocabToSrs) {
      onAddVocabToSrs(word);
      setSavedStatusMap((prev) => ({ ...prev, [word.id]: true }));
    }
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 16px 40px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onBackToDirectory && (
            <button
              onClick={onBackToDirectory}
              className="btn-tactile-secondary"
              style={{ padding: '8px 12px', minHeight: '44px', gap: '6px' }}
            >
              <ArrowLeft size={18} />
              <span>กลับสู่สารบัญ</span>
            </button>
          )}
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--text-ink-primary)' }}>
              📚 คลังคำศัพท์ HSK 3.0
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-ink-secondary)' }}>
              ค้นหาและฟังเสียงคำศัพท์มาตรฐาน HSK ระดับ 1 ถึง 6 ครบทุกหมวดหมู่
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-jade-dark)' }}>
          <Sparkles size={16} color="var(--color-jade-primary)" />
          <span>มีคำศัพท์ในคลัง {allHskWords.length} คำ</span>
        </div>
      </div>

      {/* Sticky Filter Header Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          paddingTop: '8px',
          paddingBottom: '12px',
          margin: '0 -16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 4px 12px -2px rgba(0,0,0,0.04)',
        }}
      >
        {/* Universal Search Bar */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Search
            size={20}
            color="var(--text-ink-muted)"
            style={{ position: 'absolute', left: '16px', pointerEvents: 'none' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาด้วยคำแปลไทย (เช่น รัก, ชานม), พินอิน (ai, cha) หรืออักษรจีน (爱, 茶)..."
            style={{
              width: '100%',
              minHeight: '48px',
              padding: '10px 44px 10px 48px',
              fontSize: '15px',
              borderRadius: 'var(--radius-lg, 16px)',
              border: '2px solid var(--border-subtle, #EAE5DE)',
              backgroundColor: '#FFFFFF',
              color: 'var(--text-ink-primary)',
              outline: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              transition: 'border-color 0.2s',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--text-ink-muted)',
                padding: '6px',
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* HSK Level Filter Tabs (1-6) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-ink-secondary)', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <Filter size={14} />
            <span>ระดับ:</span>
          </div>
          <button
            onClick={() => setSelectedLevel('all')}
            style={{
              padding: '6px 14px',
              minHeight: '36px',
              borderRadius: 'var(--radius-full)',
              border: selectedLevel === 'all' ? '1.5px solid var(--color-jade-primary)' : '1px solid var(--border-subtle)',
              backgroundColor: selectedLevel === 'all' ? 'var(--color-jade-surface)' : '#FFFFFF',
              color: selectedLevel === 'all' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            ทั้งหมด ({allHskWords.length})
          </button>
          {([1, 2, 3, 4, 5, 6] as HSKLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              style={{
                padding: '6px 14px',
                minHeight: '36px',
                borderRadius: 'var(--radius-full)',
                border: selectedLevel === lvl ? '1.5px solid var(--color-jade-primary)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedLevel === lvl ? 'var(--color-jade-surface)' : '#FFFFFF',
                color: selectedLevel === lvl ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              HSK {lvl} {levelCounts[lvl] > 0 ? `(${levelCounts[lvl]})` : ''}
            </button>
          ))}
        </div>

        {/* Categories Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '5px 12px',
              minHeight: '32px',
              borderRadius: 'var(--radius-sm)',
              border: selectedCategory === 'all' ? '1px solid var(--color-jade-primary)' : '1px solid #E5E7EB',
              backgroundColor: selectedCategory === 'all' ? 'var(--color-jade-surface)' : '#FAFAFA',
              color: selectedCategory === 'all' ? 'var(--color-jade-deep)' : '#6B7280',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            หมวดทั้งหมด
          </button>
          {(Object.keys(CATEGORY_LABELS) as VocabCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '5px 12px',
                minHeight: '32px',
                borderRadius: 'var(--radius-sm)',
                border: selectedCategory === cat ? '1px solid var(--color-jade-primary)' : '1px solid #E5E7EB',
                backgroundColor: selectedCategory === cat ? 'var(--color-jade-surface)' : '#FAFAFA',
                color: selectedCategory === cat ? 'var(--color-jade-deep)' : '#6B7280',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Summary & Page Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', fontWeight: 500 }}>
          พบคำศัพท์ทั้งหมด <strong style={{ color: 'var(--color-jade-dark)' }}>{filteredWords.length}</strong> คำ
          {filteredWords.length > ITEMS_PER_PAGE && (
            <span style={{ marginLeft: '8px', color: 'var(--text-ink-muted)' }}>
              (แสดงคำที่ {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredWords.length)})
            </span>
          )}
        </div>

        {totalPages > 1 && (
          <div style={{ fontSize: '12px', color: 'var(--text-ink-muted)', fontWeight: 600 }}>
            หน้า {currentPage} / {totalPages}
          </div>
        )}
      </div>

      {/* Word Cards Grid */}
      {filteredWords.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-ink-muted)' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍🐰</div>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>ไม่พบคำศัพท์ที่ตรงกับการค้นหา</div>
          <div style={{ fontSize: '13px', marginTop: '4px' }}>ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นดูนะครับ</div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {paginatedWords.map((word) => {
            const isSaved = savedStatusMap[word.id] || existingSrsHanzis.includes(word.hanzi);
            const isSlow = slowAudioMap[word.id] || false;

            return (
              <div
                key={word.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg, 16px)',
                  border: '1.5px solid var(--border-subtle, #EAE5DE)',
                  padding: '18px 20px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  position: 'relative',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
              >
                {/* Header: Level Badge & Category */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span
                      style={{
                        backgroundColor: 'rgba(5, 150, 105, 0.12)',
                        color: 'var(--color-jade-deep, #047857)',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      HSK {word.level}
                    </span>
                    {word.part_of_speech && (
                      <span
                        style={{
                          backgroundColor: '#F3F4F6',
                          color: '#4B5563',
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        {word.part_of_speech}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-ink-muted)', fontWeight: 500 }}>
                    {CATEGORY_LABELS[word.category]}
                  </span>
                </div>

                {/* Main Hanzi & Pinyin */}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-ink-primary)', lineHeight: 1 }}>
                      {word.hanzi}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-jade-primary)' }}>
                      {word.pinyin}
                    </span>
                  </div>

                  {/* Audio Play Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      onClick={() => toggleSpeed(word.id)}
                      title={isSlow ? 'โหมดช้า 0.75x' : 'โหมดปกติ 1.0x'}
                      style={{
                        border: '1px solid #E5E7EB',
                        backgroundColor: isSlow ? '#FEF3C7' : '#F9FAFB',
                        color: isSlow ? '#B45309' : '#6B7280',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '4px 6px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        minHeight: '36px',
                      }}
                    >
                      {isSlow ? '0.75x' : '1.0x'}
                    </button>
                    <button
                      onClick={() => handlePlayAudio(word.hanzi, word.id)}
                      title="กดฟังเสียงอ่าน"
                      style={{
                        border: 'none',
                        backgroundColor: 'var(--color-jade-surface)',
                        color: 'var(--color-jade-deep)',
                        borderRadius: '50%',
                        width: '38px',
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.1s',
                      }}
                    >
                      <Volume2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Meaning */}
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
                  {word.meaning_th}
                </div>

                {/* Mnemonic / Memory Story */}
                {word.mnemonic_th && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-ink-secondary)',
                      backgroundColor: 'var(--bg-card-subtle, #FAF7F2)',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      lineHeight: 1.4,
                    }}
                  >
                    💡 <strong>ภาพช่วยจำ:</strong> {word.mnemonic_th}
                  </div>
                )}

                {/* Example Sentence */}
                {word.example && (
                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '8px', fontSize: '13px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-ink-primary)' }}>{word.example.zh}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-jade-primary)', marginTop: '1px' }}>{word.example.pinyin}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', marginTop: '2px' }}>{word.example.th}</div>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => handleSaveToSrs(word)}
                    disabled={isSaved}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSaved ? '1px solid #D1D5DB' : '1px solid var(--color-jade-primary)',
                      backgroundColor: isSaved ? '#F3F4F6' : '#FFFFFF',
                      color: isSaved ? '#9CA3AF' : 'var(--color-jade-deep)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: isSaved ? 'default' : 'pointer',
                      minHeight: '36px',
                    }}
                  >
                    {isSaved ? <Check size={14} color="#059669" /> : <BookPlus size={14} />}
                    <span>{isSaved ? 'อยู่ในคลังทบทวนแล้ว' : 'เพิ่มในคลังทบทวน'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            paddingTop: '20px',
            paddingBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            title="หน้าแรก"
            style={{
              padding: '8px 12px',
              minHeight: '40px',
              borderRadius: 'var(--radius-sm, 8px)',
              border: '1px solid var(--border-subtle, #EAE5DE)',
              backgroundColor: '#FFFFFF',
              color: currentPage === 1 ? 'var(--text-ink-muted)' : 'var(--text-ink-primary)',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              fontWeight: 600,
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            <ChevronsLeft size={16} />
            <span style={{ display: 'inline' }}>หน้าแรก</span>
          </button>

          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="หน้าก่อนหน้า"
            style={{
              padding: '8px 12px',
              minHeight: '40px',
              borderRadius: 'var(--radius-sm, 8px)',
              border: '1px solid var(--border-subtle, #EAE5DE)',
              backgroundColor: '#FFFFFF',
              color: currentPage === 1 ? 'var(--text-ink-muted)' : 'var(--text-ink-primary)',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              fontWeight: 600,
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            <ChevronLeft size={16} />
            <span>ก่อนหน้า</span>
          </button>

          {/* Quick Page Jump Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && p - prev > 1;
                return (
                  <React.Fragment key={p}>
                    {showEllipsis && (
                      <span style={{ padding: '0 4px', color: 'var(--text-ink-muted)', fontSize: '13px' }}>...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(p)}
                      style={{
                        minWidth: '38px',
                        height: '38px',
                        padding: '0 8px',
                        borderRadius: 'var(--radius-sm, 8px)',
                        border: currentPage === p ? '1.5px solid var(--color-jade-primary)' : '1px solid var(--border-subtle, #EAE5DE)',
                        backgroundColor: currentPage === p ? 'var(--color-jade-surface)' : '#FFFFFF',
                        color: currentPage === p ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                        fontWeight: currentPage === p ? 800 : 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="หน้าถัดไป"
            style={{
              padding: '8px 12px',
              minHeight: '40px',
              borderRadius: 'var(--radius-sm, 8px)',
              border: '1px solid var(--border-subtle, #EAE5DE)',
              backgroundColor: '#FFFFFF',
              color: currentPage === totalPages ? 'var(--text-ink-muted)' : 'var(--text-ink-primary)',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              fontWeight: 600,
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            <span>ถัดไป</span>
            <ChevronRight size={16} />
          </button>

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="หน้าสุดท้าย"
            style={{
              padding: '8px 12px',
              minHeight: '40px',
              borderRadius: 'var(--radius-sm, 8px)',
              border: '1px solid var(--border-subtle, #EAE5DE)',
              backgroundColor: '#FFFFFF',
              color: currentPage === totalPages ? 'var(--text-ink-muted)' : 'var(--text-ink-primary)',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              fontWeight: 600,
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            <span>หน้าสุดท้าย</span>
            <ChevronsRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VocabLibraryView;

/**
 * src/components/vocab/VocabLibraryView.tsx
 * HSK 3.0 Master Vocabulary Library & Universal Search Explorer.
 * Allows instant search, filter by Level (HSK 1-9), category tagging,
 * audio pronunciation playback (Normal/Slow), and adding to SRS.
 */

import React, { useState, useMemo } from 'react';
import { Search, Volume2, BookPlus, Sparkles, Filter, X, ArrowLeft, Check } from 'lucide-react';
import { HSKWord, HSKLevel, VocabCategory, queryHskWords, getHskLevelCounts, allHskWords } from '../../data/hsk';
import { speak } from '../../engines/audio/audioEngine';

export interface VocabLibraryViewProps {
  onBackToDirectory?: () => void;
  onAddVocabToSrs?: (word: HSKWord) => void;
  existingSrsHanzis?: string[];
}

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
  const [slowAudioMap, setSlowAudioMap] = useState<Record<string, boolean>>({});
  const [savedStatusMap, setSavedStatusMap] = useState<Record<string, boolean>>({});

  const levelCounts = useMemo(() => getHskLevelCounts(), []);

  const filteredWords = useMemo(() => {
    return queryHskWords({
      level: selectedLevel,
      category: selectedCategory,
      searchQuery,
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

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
              ค้นหาและฟังเสียงคำศัพท์มาตรฐาน HSK ระดับ 1 ถึง 9 ครบทุกหมวดหมู่
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-jade-dark)' }}>
          <Sparkles size={16} color="var(--color-jade-primary)" />
          <span>มีคำศัพท์ในคลัง {allHskWords.length} คำ</span>
        </div>
      </div>

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
            minHeight: '52px',
            padding: '12px 44px 12px 48px',
            fontSize: '15px',
            borderRadius: 'var(--radius-lg, 16px)',
            border: '2px solid var(--border-subtle, #EAE5DE)',
            backgroundColor: '#FFFFFF',
            color: 'var(--text-ink-primary)',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
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

      {/* HSK Level Filter Tabs (1-9) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-ink-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={14} />
          <span>เลือกระดับ HSK 3.0:</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          <button
            onClick={() => setSelectedLevel('all')}
            style={{
              padding: '8px 16px',
              minHeight: '40px',
              borderRadius: 'var(--radius-full)',
              border: selectedLevel === 'all' ? '1.5px solid var(--color-jade-primary)' : '1px solid var(--border-subtle)',
              backgroundColor: selectedLevel === 'all' ? 'var(--color-jade-surface)' : '#FFFFFF',
              color: selectedLevel === 'all' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            ทั้งหมด ({allHskWords.length})
          </button>
          {([1, 2, 3, 4, 5, 6, 7, 8, 9] as HSKLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              style={{
                padding: '8px 16px',
                minHeight: '40px',
                borderRadius: 'var(--radius-full)',
                border: selectedLevel === lvl ? '1.5px solid var(--color-jade-primary)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedLevel === lvl ? 'var(--color-jade-surface)' : '#FFFFFF',
                color: selectedLevel === lvl ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              HSK {lvl} {levelCounts[lvl] > 0 ? `(${levelCounts[lvl]})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Filter Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '6px 12px',
            minHeight: '36px',
            borderRadius: 'var(--radius-sm)',
            border: selectedCategory === 'all' ? '1px solid var(--color-jade-primary)' : '1px solid #E5E7EB',
            backgroundColor: selectedCategory === 'all' ? 'var(--color-jade-surface)' : '#FAFAFA',
            color: selectedCategory === 'all' ? 'var(--color-jade-deep)' : '#6B7280',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          หมวดทั้งหมด
        </button>
        {(Object.keys(CATEGORY_LABELS) as VocabCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 12px',
              minHeight: '36px',
              borderRadius: 'var(--radius-sm)',
              border: selectedCategory === cat ? '1px solid var(--color-jade-primary)' : '1px solid #E5E7EB',
              backgroundColor: selectedCategory === cat ? 'var(--color-jade-surface)' : '#FAFAFA',
              color: selectedCategory === cat ? 'var(--color-jade-deep)' : '#6B7280',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Search Results Summary */}
      <div style={{ fontSize: '13px', color: 'var(--text-ink-secondary)', fontWeight: 500 }}>
        พบคำศัพท์ทั้งหมด <strong style={{ color: 'var(--color-jade-dark)' }}>{filteredWords.length}</strong> คำ
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
          {filteredWords.map((word) => {
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
    </div>
  );
};

export default VocabLibraryView;

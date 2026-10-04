/**
 * src/data/hsk/types.ts
 * Strict TypeScript types for HSK 3.0 (Levels 1-6) Vocabulary Repository.
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any'.
 */

export type HSKLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type VocabCategory =
  | 'greetings'      // ทักทาย & สุภาพ
  | 'numbers_time'   // ตัวเลข วันที่ & เวลา
  | 'food_drinks'    // อาหาร & เครื่องดื่ม
  | 'shopping'       // ช็อปปิ้ง & ราคา
  | 'travel_transit' // การเดินทาง & ท่องเที่ยว
  | 'family_people'  // ครอบครัว & บุคคล
  | 'daily_life'     // ชีวิตประจำวัน & กิจวัตร
  | 'work_business'  // การทำงาน & ธุรกิจ
  | 'education'      // การเรียน & วิชาการ
  | 'emotions'       // อารมณ์ & ความรู้สึก
  | 'nature_weather' // ธรรมชาติ & สภาพอากาศ
  | 'general';       // ทั่วไป

export interface HSKExampleSentence {
  zh: string;
  pinyin: string;
  th: string;
  en?: string;
}

export interface HSKWord {
  id: string; // e.g. "hsk1_0001"
  level: HSKLevel;
  hanzi: string;
  pinyin: string;
  meaning_th: string;
  meaning_en: string;
  category: VocabCategory;
  radical?: string;
  stroke_count?: number;
  part_of_speech?: string; // e.g. "คำนาม", "คำกริยา", "คำสรรพนาม"
  example?: HSKExampleSentence;
  mnemonic_th?: string;
}

export interface HSKFilterOptions {
  level?: HSKLevel | 'all';
  category?: VocabCategory | 'all';
  searchQuery?: string;
}

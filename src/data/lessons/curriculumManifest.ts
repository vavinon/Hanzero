/**
 * src/data/lessons/curriculumManifest.ts
 * Master Curriculum Manifest & Lightweight Index across all 63 Units (Tier 0 to Tier 4).
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any', Zero Bloat.
 */

import rawManifestData from './manifestData.json';
import { TrilingualText } from '../../types/lesson';

export interface ManifestLesson {
  lessonId: string;
  lessonNumber: number;
  unitId: string;
  tier: number;
  title: TrilingualText;
  canDo: { th: string; en: string };
  isBoss: boolean;
  vocabCount: number;
  icon?: string;
}

export interface ManifestUnit {
  unitId: string;
  unitNumber: number | string;
  tier: 0 | 1 | 2 | 3 | 4;
  tierLabel: string;
  title: TrilingualText;
  description: string;
  category: string;
  icon: string;
  hskLevel: string;
  totalLessons: number;
  lessons: ManifestLesson[];
}

export interface ManifestTier {
  tier: 0 | 1 | 2 | 3 | 4;
  nameTh: string;
  nameEn: string;
  hskLevel: string;
  badgeIcon: string;
  taglineTh: string;
  unitCount: number;
  totalLessons: number;
}

export const MANIFEST_TIERS: ManifestTier[] = [
  {
    tier: 0,
    nameTh: '🌱 Tier 0: ปูพื้นฐานพินอิน & เส้นขีด',
    nameEn: 'Tier 0: Seed (Pinyin & Strokes)',
    hskLevel: 'Pre-HSK (เริ่มจาก 0 จริง)',
    badgeIcon: '🌱',
    taglineTh: 'ออกเสียง พยัญชนะ สระ วรรณยุกต์ และ 8 เส้นขีดอักษรจีนแรกในชีวิต',
    unitCount: 6,
    totalLessons: 6,
  },
  {
    tier: 1,
    nameTh: '🌿 Tier 1: เอาตัวรอดในชีวิตประจำวัน',
    nameEn: 'Tier 1: Explorer (Survival Chinese)',
    hskLevel: 'HSK 1 - 2',
    badgeIcon: '🌿',
    taglineTh: 'ทักทาย สั่งอาหาร ชานม ช็อปปิ้ง ถามทาง ตัวเลข และเวลา',
    unitCount: 10,
    totalLessons: 40,
  },
  {
    tier: 2,
    nameTh: '🎋 Tier 2: เที่ยวจีน & ดิจิทัลไลฟ์สไตล์',
    nameEn: 'Tier 2: Traveler (Digital Living)',
    hskLevel: 'HSK 3 - 4',
    badgeIcon: '🎋',
    taglineTh: 'สแกนจ่าย WeChat/Alipay รถไฟความเร็วสูง สั่งเดลิเวอรี่ เช่าห้อง',
    unitCount: 15,
    totalLessons: 60,
  },
  {
    tier: 3,
    nameTh: '🐉 Tier 3: ทำงาน สังคม & วัฒนธรรม',
    nameEn: 'Tier 3: Master (Business & Culture)',
    hskLevel: 'HSK 5 - 6',
    badgeIcon: '🐉',
    taglineTh: 'การทำงานในออฟฟิศ เจรจาธุรกิจ ตรวจสัญญา สุภาษิต成语 และสังคมจีน',
    unitCount: 20,
    totalLessons: 80,
  },
  {
    tier: 4,
    nameTh: '👑 Tier 4: วรรณกรรม & การทูต',
    nameEn: 'Tier 4: Legend (Classical & Discourse)',
    hskLevel: 'HSK 7 - 9',
    badgeIcon: '👑',
    taglineTh: 'วรรณกรรมโบราณ วาทศิลป์การทูต ปรัชญา และเศรษฐกิจมหภาค',
    unitCount: 12,
    totalLessons: 48,
  },
];
export const MANIFEST_UNITS: ManifestUnit[] = rawManifestData as unknown as ManifestUnit[];

/**
 * Get manifest unit by ID.
 */
export function getManifestUnit(unitId: string): ManifestUnit | undefined {
  return MANIFEST_UNITS.find((u) => u.unitId === unitId);
}

/**
 * Get manifest lesson by ID.
 */
export function getManifestLesson(lessonId: string): ManifestLesson | undefined {
  for (const u of MANIFEST_UNITS) {
    const lesson = u.lessons.find((l) => l.lessonId === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

/**
 * Filter manifest units by tier.
 */
export function getManifestUnitsByTier(tier: 0 | 1 | 2 | 3 | 4): ManifestUnit[] {
  return MANIFEST_UNITS.filter((u) => u.tier === tier);
}

/**
 * Quick search across all 63 units and lessons by keyword.
 */
export function searchCurriculumManifest(query: string): ManifestUnit[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return MANIFEST_UNITS;

  return MANIFEST_UNITS.filter((u) => {
    const matchUnitTitle =
      u.title.th.toLowerCase().includes(clean) ||
      u.title.zh.includes(clean) ||
      u.title.en.toLowerCase().includes(clean) ||
      u.description.toLowerCase().includes(clean);

    if (matchUnitTitle) return true;

    // Check individual lessons
    return u.lessons.some(
      (l) =>
        l.title.th.toLowerCase().includes(clean) ||
        l.title.zh.includes(clean) ||
        l.canDo.th.toLowerCase().includes(clean)
    );
  });
}

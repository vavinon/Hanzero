/**
 * src/data/lessons/curriculumManifest.test.ts
 * Unit Tests for Master Curriculum Manifest & Lesson Loader.
 * Verifies all 63 units, 5 tiers, and full lesson loading across all tiers.
 */

import { describe, it, expect } from 'vitest';
import {
  MANIFEST_TIERS,
  MANIFEST_UNITS,
  getManifestUnit,
  getManifestLesson,
  getManifestUnitsByTier,
  searchCurriculumManifest,
} from './curriculumManifest';
import { getFullLessonData, getAdjacentLessons } from './lessonLoader';

describe('Curriculum Manifest & Universal Lesson Loader (Slice 1)', () => {
  it('contains exactly 5 curriculum tiers from Tier 0 to Tier 4', () => {
    expect(MANIFEST_TIERS.length).toBe(5);
    expect(MANIFEST_TIERS.map((t) => t.tier)).toEqual([0, 1, 2, 3, 4]);
  });

  it('contains exactly 63 curriculum units across all tiers', () => {
    expect(MANIFEST_UNITS.length).toBe(63);

    const t0 = getManifestUnitsByTier(0);
    const t1 = getManifestUnitsByTier(1);
    const t2 = getManifestUnitsByTier(2);
    const t3 = getManifestUnitsByTier(3);
    const t4 = getManifestUnitsByTier(4);

    expect(t0.length).toBe(6);
    expect(t1.length).toBe(10);
    expect(t2.length).toBe(15);
    expect(t3.length).toBe(20);
    expect(t4.length).toBe(12);
  });

  it('retrieves manifest unit and lesson by ID correctly', () => {
    const u01 = getManifestUnit('tier0_u01');
    expect(u01).toBeDefined();
    expect(u01?.tier).toBe(0);
    expect(u01?.title.th).toContain('ริมฝีปาก');

    const l01 = getManifestLesson('t0_u01_l01');
    expect(l01).toBeDefined();
    expect(l01?.unitId).toBe('tier0_u01');

    const u10 = getManifestUnit('tier1_u10');
    expect(u10).toBeDefined();
    expect(u10?.tier).toBe(1);

    const u25 = getManifestUnit('tier2_u25');
    expect(u25).toBeDefined();
    expect(u25?.tier).toBe(2);
  });

  it('searches curriculum manifest by Chinese, Thai, or English keywords', () => {
    const foodResults = searchCurriculumManifest('อาหาร');
    expect(foodResults.length).toBeGreaterThan(0);

    const pinyinResults = searchCurriculumManifest('พินอิน');
    expect(pinyinResults.length).toBeGreaterThan(0);
  });

  it('loads full lesson data for Tier 0 (Seed) with vocabulary and quizzes', () => {
    const lesson = getFullLessonData('t0_u01_l01');
    expect(lesson).not.toBeNull();
    expect(lesson?.tier).toBe(0);
    expect(lesson?.vocabulary.length).toBeGreaterThan(0);
    expect(lesson?.quizzes.length).toBeGreaterThan(0);
  });

  it('loads full lesson data for Tier 1 Units 1 and 2 (fixing prior fallback bug)', () => {
    const l1 = getFullLessonData('t1_u01_l01');
    expect(l1).not.toBeNull();
    expect(l1?.unit_id).toBe('tier1_u01');

    // Unit 2 must load unit 2 data, NOT unit 1!
    const l2 = getFullLessonData('t1_u02_l01');
    expect(l2).not.toBeNull();
    expect(l2?.unit_id).toBe('tier1_u02');
    expect(l2?.title.th).toContain('นับเลข');
  });

  it('loads full lesson data for Tier 2, Tier 3, and Tier 4', () => {
    const t2 = getFullLessonData('t2_u11_l01');
    expect(t2).not.toBeNull();
    expect(t2?.tier).toBe(2);

    const t3 = getFullLessonData('t3_u26_l01');
    expect(t3).not.toBeNull();
    expect(t3?.tier).toBe(3);

    const t4 = getFullLessonData('t4_u46_l01');
    expect(t4).not.toBeNull();
    expect(t4?.tier).toBe(4);
  });

  it('computes adjacent lessons properly for sequential step-through', () => {
    const adj = getAdjacentLessons('t0_u01_l01');
    expect(adj.prevLessonId).toBeNull();
    expect(adj.nextLessonId).toBe('t0_u02_l01');
  });
});

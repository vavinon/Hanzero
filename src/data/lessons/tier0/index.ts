/**
 * src/data/lessons/tier0/index.ts
 * Master Export & Loader for Tier 0 Seed Pinyin Mastery Curriculum (Units 0.1 - 0.6).
 * Adheres strictly to AGENTS.md §4.2: Pure TypeScript, Strict Typing, Zero 'any'.
 */

import unit01 from './unit00_01_lips_tongue.json';
import unit02 from './unit00_02_tongue_root.json';
import unit03 from './unit00_03_tone_coaster.json';
import unit04 from './unit00_04_retroflex_vs_flat.json';
import unit05 from './unit00_05_compound_nasals.json';
import unit06 from './unit00_06_strokes_radicals.json';
import { Tier0UnitData } from '../../../types/lesson';

export const tier0Units: Tier0UnitData[] = [
  unit01 as unknown as Tier0UnitData,
  unit02 as unknown as Tier0UnitData,
  unit03 as unknown as Tier0UnitData,
  unit04 as unknown as Tier0UnitData,
  unit05 as unknown as Tier0UnitData,
  unit06 as unknown as Tier0UnitData,
];

export {
  unit01 as unit00_01_lips_tongue,
  unit02 as unit00_02_tongue_root,
  unit03 as unit00_03_tone_coaster,
  unit04 as unit00_04_retroflex_vs_flat,
  unit05 as unit00_05_compound_nasals,
  unit06 as unit00_06_strokes_radicals,
};

/**
 * Retrieves a Tier 0 unit by its unit_id (e.g. 'tier0_u01').
 */
export function getTier0Unit(unitId: string): Tier0UnitData | undefined {
  return tier0Units.find((u) => u.unit_id === unitId);
}

/**
 * Returns all 6 Tier 0 units.
 */
export function getAllTier0Units(): Tier0UnitData[] {
  return tier0Units;
}

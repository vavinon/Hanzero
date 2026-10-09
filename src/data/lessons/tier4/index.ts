/**
 * src/data/lessons/tier4/index.ts
 * Master Export for Tier 4 Legend Curriculum (Units 46–57).
 * Adheres strictly to AGENTS.md §4.2: Pure TypeScript, Strict Typing, Zero 'any'.
 */

import unit46 from './unit46_classical_particles.json';
import unit47 from './unit47_sun_tzu_business.json';
import unit48 from './unit48_ancient_philosophy.json';
import unit49 from './unit49_diplomatic_rhetoric.json';
import unit50 from './unit50_macroeconomics.json';
import unit51 from './unit51_intellectual_property.json';
import unit52 from './unit52_tang_song_poetry.json';
import unit53 from './unit53_modern_literature.json';
import unit54 from './unit54_geopolitics_belt_road.json';
import unit55 from './unit55_business_crisis_mediation.json';
import unit56 from './unit56_academic_thesis_peer_review.json';
import unit57 from './unit57_legend_grand_capstone.json';
import { UnitLessonData } from '../../../types/lesson';

export const tier4Units: UnitLessonData[] = [
  unit46 as unknown as UnitLessonData,
  unit47 as unknown as UnitLessonData,
  unit48 as unknown as UnitLessonData,
  unit49 as unknown as UnitLessonData,
  unit50 as unknown as UnitLessonData,
  unit51 as unknown as UnitLessonData,
  unit52 as unknown as UnitLessonData,
  unit53 as unknown as UnitLessonData,
  unit54 as unknown as UnitLessonData,
  unit55 as unknown as UnitLessonData,
  unit56 as unknown as UnitLessonData,
  unit57 as unknown as UnitLessonData,
];

export {
  unit46,
  unit47,
  unit48,
  unit49,
  unit50,
  unit51,
  unit52,
  unit53,
  unit54,
  unit55,
  unit56,
  unit57,
};

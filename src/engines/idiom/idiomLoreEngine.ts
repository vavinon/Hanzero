/**
 * src/engines/idiom/idiomLoreEngine.ts
 * Pure TypeScript business engine for Hanzero 成语 Lore & Dilemma Simulator.
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Pure TypeScript logic (Zero-UI, no DOM/JSX dependencies)
 * - 100% testable via Vitest
 * - Strict typing, zero 'any'
 * - Resilient fallbacks & defensive checks
 */

import idiomCatalogRaw from '../../data/idioms/idiom_lore_catalog.json';
import type {
  IdiomLoreEntry,
  IdiomCategory,
  IdiomFilterOptions,
  IdiomDilemmaCase,
  DilemmaChoice,
  DilemmaEvaluationResult,
} from '../../types/idiom';

// Cast and memoize catalog
const IDIOM_CATALOG: IdiomLoreEntry[] = idiomCatalogRaw as IdiomLoreEntry[];

/**
 * Returns all idiom lore entries from the verified catalog.
 */
export function getAllIdioms(): IdiomLoreEntry[] {
  return [...IDIOM_CATALOG];
}

/**
 * Retrieves a single idiom entry by its unique slug/id.
 */
export function getIdiomById(id: string): IdiomLoreEntry | undefined {
  if (!id) return undefined;
  const cleanId = id.trim().toLowerCase();
  return IDIOM_CATALOG.find(
    (item) => item.id.toLowerCase() === cleanId || item.idiom === cleanId
  );
}

/**
 * Retrieves an idiom entry by its Chinese character representation (e.g. "破釜沉舟").
 */
export function getIdiomByText(text: string): IdiomLoreEntry | undefined {
  if (!text) return undefined;
  const cleanText = text.trim();
  return IDIOM_CATALOG.find((item) => item.idiom === cleanText);
}

/**
 * Searches idioms by query across Hanzi, Pinyin, Thai meaning, and tags.
 */
export function searchIdioms(query: string, options?: IdiomFilterOptions): IdiomLoreEntry[] {
  const q = (query || '').trim().toLowerCase();
  const categoryFilter = options?.category && options.category !== 'all' ? options.category : null;
  const hskFilter = options?.hskLevel && options.hskLevel !== 'all' ? Number(options.hskLevel) : null;

  return IDIOM_CATALOG.filter((item) => {
    // Category check
    if (categoryFilter && item.category !== categoryFilter) {
      return false;
    }

    // HSK Level check
    if (hskFilter !== null && item.hskLevel !== hskFilter) {
      return false;
    }

    // If query is empty, pass through after category/HSK filtering
    if (!q) {
      return true;
    }

    // Match Hanzi exact or substring
    if (item.idiom.includes(q)) return true;

    // Match Pinyin (raw or normalized)
    const normalizedPinyin = item.pinyin.toLowerCase().replace(/\s+/g, '');
    const cleanQ = q.replace(/\s+/g, '');
    if (normalizedPinyin.includes(cleanQ) || item.pinyin.toLowerCase().includes(q)) {
      return true;
    }

    // Match Thai literal or figurative meaning
    if (
      item.literalMeaningTh.toLowerCase().includes(q) ||
      item.figurativeMeaningTh.toLowerCase().includes(q) ||
      item.historicalOrigin.storySummaryTh.toLowerCase().includes(q)
    ) {
      return true;
    }

    // Match English meaning
    if (item.figurativeMeaningEn.toLowerCase().includes(q)) {
      return true;
    }

    // Match tags
    if (item.tags.some((tag) => tag.toLowerCase().includes(q))) {
      return true;
    }

    return false;
  });
}

/**
 * Filters idioms by category.
 */
export function filterIdiomsByCategory(category: IdiomCategory | 'all'): IdiomLoreEntry[] {
  if (category === 'all') return getAllIdioms();
  return IDIOM_CATALOG.filter((item) => item.category === category);
}

/**
 * Returns all dilemma scenarios across all catalog idioms.
 */
export function getAllDilemmas(): Array<{ idiom: IdiomLoreEntry; dilemma: IdiomDilemmaCase }> {
  const result: Array<{ idiom: IdiomLoreEntry; dilemma: IdiomDilemmaCase }> = [];
  for (const entry of IDIOM_CATALOG) {
    if (Array.isArray(entry.dilemmas)) {
      for (const dilemma of entry.dilemmas) {
        result.push({ idiom: entry, dilemma });
      }
    }
  }
  return result;
}

/**
 * Retrieves a specific dilemma scenario by its ID.
 */
export function getDilemmaById(
  dilemmaId: string
): { idiom: IdiomLoreEntry; dilemma: IdiomDilemmaCase } | undefined {
  if (!dilemmaId) return undefined;
  const cleanId = dilemmaId.trim();
  for (const entry of IDIOM_CATALOG) {
    if (Array.isArray(entry.dilemmas)) {
      const found = entry.dilemmas.find((d) => d.id === cleanId);
      if (found) {
        return { idiom: entry, dilemma: found };
      }
    }
  }
  return undefined;
}

/**
 * Evaluates the user's choice in a corporate/life dilemma scenario.
 * Returns score, strategic rationale, and nuanced feedback.
 */
export function evaluateDilemmaChoice(
  dilemmaId: string,
  selectedIdiomIdOrText: string
): DilemmaEvaluationResult {
  const dilemmaData = getDilemmaById(dilemmaId);
  if (!dilemmaData) {
    throw new Error(`Dilemma with ID '${dilemmaId}' not found in catalog.`);
  }

  const { idiom: parentIdiom, dilemma } = dilemmaData;
  const cleanSelected = (selectedIdiomIdOrText || '').trim().toLowerCase();

  // Find the matching choice
  const chosenChoice: DilemmaChoice | undefined = dilemma.choices.find(
    (c) =>
      c.idiomId.toLowerCase() === cleanSelected ||
      c.idiom === selectedIdiomIdOrText ||
      c.idiom.toLowerCase() === cleanSelected
  );

  if (!chosenChoice) {
    // Fallback default choice if user passed something out of range
    const fallbackChoice: DilemmaChoice = {
      idiomId: selectedIdiomIdOrText,
      idiom: selectedIdiomIdOrText,
      pinyin: '',
      strategyTitleTh: 'ตัวเลือกไม่ตรงกับระบบ',
      explanationTh: 'ไม่พบตัวเลือกที่ท่านระบุในแบบทดสอบนี้',
      isOptimal: false,
      scoreDelta: 0,
      outcomeType: 'misguided',
    };

    return {
      dilemmaId,
      selectedIdiomId: selectedIdiomIdOrText,
      chosenChoice: fallbackChoice,
      isOptimal: false,
      scoreAwarded: 0,
      feedbackTh: 'ตัวเลือกไม่ถูกต้อง กรุณาเลือกตัวเลือกที่กำหนดในแบบทดสอบ',
      pedagogicalAnalysisTh: 'การตัดสินใจไม่ตรงกับหลักพิชัยสงครามหรือสุภาษิตที่เกี่ยวข้อง',
    };
  }

  // Find optimal choice for comparison
  const optimalChoice = dilemma.choices.find((c) => c.isOptimal) || dilemma.choices[0];

  let feedbackTh = '';
  let pedagogicalAnalysisTh = '';

  if (chosenChoice.isOptimal) {
    feedbackTh = `ยอดเยี่ยมมาก! การนำกลยุทธ์ '${chosenChoice.idiom}' (${chosenChoice.pinyin}) มาประยุกต์ใช้ คือการตัดสินใจที่ถูกต้องที่สุด`;
    pedagogicalAnalysisTh = chosenChoice.explanationTh;
  } else if (chosenChoice.nuanceTrap) {
    feedbackTh = `เกือบจะดีแล้ว! สำนวน '${chosenChoice.idiom}' มีความหมายใกล้เคียง แต่ยังไม่ตรงกับบริบทเชิงลึกของสถานการณ์นี้`;
    pedagogicalAnalysisTh = `${chosenChoice.explanationTh} (เปรียบเทียบกับ ${optimalChoice.idiom}: ${optimalChoice.strategyTitleTh})`;
  } else {
    feedbackTh = `การตัดสินใจยังไม่เหมาะสม! การเลือก '${chosenChoice.idiom}' อาจส่งผลเสียต่อสถานการณ์ตามโจทย์`;
    pedagogicalAnalysisTh = chosenChoice.explanationTh;
  }

  // Construct nuance comparison if subtle trap or suboptimal
  let synonymNuanceComparison: DilemmaEvaluationResult['synonymNuanceComparison'];
  if (!chosenChoice.isOptimal && parentIdiom.synonymNuance) {
    synonymNuanceComparison = {
      chosenIdiom: chosenChoice.idiom,
      optimalIdiom: optimalChoice.idiom,
      distinctionTh: parentIdiom.synonymNuance.keyDifferenceTh,
    };
  }

  return {
    dilemmaId,
    selectedIdiomId: chosenChoice.idiomId,
    chosenChoice,
    isOptimal: chosenChoice.isOptimal,
    scoreAwarded: chosenChoice.scoreDelta,
    feedbackTh,
    pedagogicalAnalysisTh,
    synonymNuanceComparison,
  };
}

/**
 * Compares nuances between two idioms if synonym relationship or shared theme exists.
 */
export function compareIdiomNuance(
  idiomIdA: string,
  idiomIdB: string
): {
  idiomA: IdiomLoreEntry;
  idiomB: IdiomLoreEntry;
  distinctionTh: string;
  sharedThemeTh: string;
  adviceTh: string;
} | null {
  const a = getIdiomById(idiomIdA);
  const b = getIdiomById(idiomIdB);

  if (!a || !b) return null;

  // Direct recorded synonym nuance on A
  if (a.synonymNuance && (a.synonymNuance.synonym === b.idiom || a.synonymNuance.synonym === b.id)) {
    return {
      idiomA: a,
      idiomB: b,
      distinctionTh: a.synonymNuance.keyDifferenceTh,
      sharedThemeTh: a.synonymNuance.sharedThemeTh,
      adviceTh: a.synonymNuance.usageAdviceTh,
    };
  }

  // Direct recorded synonym nuance on B
  if (b.synonymNuance && (b.synonymNuance.synonym === a.idiom || b.synonymNuance.synonym === a.id)) {
    return {
      idiomA: a,
      idiomB: b,
      distinctionTh: b.synonymNuance.keyDifferenceTh,
      sharedThemeTh: b.synonymNuance.sharedThemeTh,
      adviceTh: b.synonymNuance.usageAdviceTh,
    };
  }

  // If both belong to the same category
  if (a.category === b.category) {
    return {
      idiomA: a,
      idiomB: b,
      distinctionTh: `${a.idiom}: ${a.figurativeMeaningTh} vs ${b.idiom}: ${b.figurativeMeaningTh}`,
      sharedThemeTh: `ทั้งสองเป็นสำนวนในหมวดหมู่ ${a.category}`,
      adviceTh: `เลือกใช้ ${a.idiom} เมื่อเน้น "${a.literalMeaningTh}" และใช้ ${b.idiom} เมื่อเน้น "${b.literalMeaningTh}"`,
    };
  }

  return null;
}

/**
 * Generates an SRS card item compatible with Hanzero SRS deck.
 */
export function createSRSItemFromIdiom(idiom: IdiomLoreEntry): {
  word_id: string;
  hanzi: string;
  pinyin: string;
  display_pinyin: string;
  meaning_th: string;
  meaning_en: string;
  mnemonic?: string;
} {
  return {
    word_id: `idiom_${idiom.id.replace('idiom-', '')}`,
    hanzi: idiom.idiom,
    pinyin: idiom.pinyin,
    display_pinyin: idiom.pinyin,
    meaning_th: `${idiom.figurativeMeaningTh} (ตรงตัว: ${idiom.literalMeaningTh})`,
    meaning_en: idiom.figurativeMeaningEn,
    mnemonic: `【ที่มา】${idiom.historicalOrigin.sourceBook} โดย ${idiom.historicalOrigin.keyFigures.join(', ')} (${idiom.historicalOrigin.dynastyTh})`,
  };
}

/**
 * Returns a random dilemma scenario, optionally excluding already completed dilemmas.
 */
export function getRandomDilemma(
  excludeIds: string[] = []
): { idiom: IdiomLoreEntry; dilemma: IdiomDilemmaCase } | undefined {
  const all = getAllDilemmas();
  const available = all.filter((item) => !excludeIds.includes(item.dilemma.id));
  if (available.length === 0) {
    // If all excluded, wrap around to all
    if (all.length === 0) return undefined;
    return all[Math.floor(Math.random() * all.length)];
  }
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

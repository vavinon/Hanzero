import { describe, it, expect } from 'vitest';
import {
  getAllIdioms,
  getIdiomById,
  getIdiomByText,
  searchIdioms,
  filterIdiomsByCategory,
  getAllDilemmas,
  getDilemmaById,
  evaluateDilemmaChoice,
  compareIdiomNuance,
  createSRSItemFromIdiom,
  getRandomDilemma,
} from './idiomLoreEngine';

describe('idiomLoreEngine - Pure Logic & Unit Tests', () => {
  it('loads all 20 idioms correctly from the catalog', () => {
    const idioms = getAllIdioms();
    expect(idioms.length).toBeGreaterThanOrEqual(20);
    // Spot check 破釜沉舟
    const pfc = idioms.find((i) => i.idiom === '破釜沉舟');
    expect(pfc).toBeDefined();
    expect(pfc?.pinyin).toBe('pò fǔ chén zhōu');
    expect(pfc?.historicalOrigin.dynastyTh).toContain('ฉิน');
  });

  it('retrieves idiom by ID and by text correctly', () => {
    const byId = getIdiomById('idiom-pofuchenzhou');
    expect(byId).toBeDefined();
    expect(byId?.idiom).toBe('破釜沉舟');

    const byText = getIdiomByText('破釜沉舟');
    expect(byText).toBeDefined();
    expect(byText?.id).toBe('idiom-pofuchenzhou');

    expect(getIdiomById('non-existent-id')).toBeUndefined();
    expect(getIdiomByText('')).toBeUndefined();
  });

  describe('searchIdioms & filtering', () => {
    it('searches by Chinese character', () => {
      const results = searchIdioms('沉舟');
      expect(results.length).toBe(1);
      expect(results[0].idiom).toBe('破釜沉舟');
    });

    it('searches by Pinyin', () => {
      const results = searchIdioms('pò fǔ');
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].idiom).toBe('破釜沉舟');
    });

    it('searches by Thai meaning or summary', () => {
      const results = searchIdioms('ทุบหม้อ');
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].idiom).toBe('破釜沉舟');
    });

    it('filters by category and HSK level', () => {
      const strategyIdioms = filterIdiomsByCategory('strategy');
      expect(strategyIdioms.length).toBeGreaterThanOrEqual(3);
      for (const item of strategyIdioms) {
        expect(item.category).toBe('strategy');
      }

      const hsk5Prudence = searchIdioms('', { category: 'prudence', hskLevel: 5 });
      expect(hsk5Prudence.length).toBeGreaterThanOrEqual(1);
      for (const item of hsk5Prudence) {
        expect(item.category).toBe('prudence');
        expect(item.hskLevel).toBe(5);
      }
    });
  });

  describe('Dilemma Scenarios & Evaluation', () => {
    it('retrieves all dilemma scenarios across all idioms', () => {
      const all = getAllDilemmas();
      expect(all.length).toBeGreaterThanOrEqual(10);
    });

    it('retrieves specific dilemma by ID', () => {
      const found = getDilemmaById('dilemma-pofuchenzhou-01');
      expect(found).toBeDefined();
      expect(found?.dilemma.id).toBe('dilemma-pofuchenzhou-01');
      expect(found?.idiom.idiom).toBe('破釜沉舟');
    });

    it('evaluates optimal choice accurately with maximum score', () => {
      const result = evaluateDilemmaChoice('dilemma-pofuchenzhou-01', 'idiom-pofuchenzhou');
      expect(result.isOptimal).toBe(true);
      expect(result.scoreAwarded).toBe(30);
      expect(result.chosenChoice.outcomeType).toBe('optimal');
      expect(result.feedbackTh).toContain('ยอดเยี่ยมมาก');
      expect(result.pedagogicalAnalysisTh).toContain('ตัดทางถอย');
    });

    it('evaluates nuance trap choice with reduced score and nuance comparison', () => {
      const result = evaluateDilemmaChoice('dilemma-pofuchenzhou-01', 'idiom-beishuiyizhan');
      expect(result.isOptimal).toBe(false);
      expect(result.scoreAwarded).toBe(10);
      expect(result.chosenChoice.outcomeType).toBe('suboptimal');
      expect(result.chosenChoice.nuanceTrap).toBe(true);
      expect(result.feedbackTh).toContain('เกือบจะดีแล้ว');
      expect(result.synonymNuanceComparison).toBeDefined();
      expect(result.synonymNuanceComparison?.optimalIdiom).toBe('破釜沉舟');
    });

    it('evaluates misguided choice with 0 score', () => {
      const result = evaluateDilemmaChoice('dilemma-pofuchenzhou-01', 'idiom-shouzhudaitu');
      expect(result.isOptimal).toBe(false);
      expect(result.scoreAwarded).toBe(0);
      expect(result.chosenChoice.outcomeType).toBe('misguided');
      expect(result.feedbackTh).toContain('ยังไม่เหมาะสม');
    });

    it('handles out-of-range invalid choice gracefully without crashing', () => {
      const result = evaluateDilemmaChoice('dilemma-pofuchenzhou-01', 'invalid-choice-id');
      expect(result.isOptimal).toBe(false);
      expect(result.scoreAwarded).toBe(0);
      expect(result.chosenChoice.strategyTitleTh).toBe('ตัวเลือกไม่ตรงกับระบบ');
    });

    it('throws error when evaluating a non-existent dilemma ID', () => {
      expect(() => {
        evaluateDilemmaChoice('non-existent-dilemma', 'idiom-pofuchenzhou');
      }).toThrowError(/not found in catalog/);
    });
  });

  describe('compareIdiomNuance', () => {
    it('compares two registered synonym idioms accurately', () => {
      const comparison = compareIdiomNuance('idiom-pofuchenzhou', 'idiom-beishuiyizhan');
      expect(comparison).not.toBeNull();
      expect(comparison?.distinctionTh).toContain('破釜沉舟');
      expect(comparison?.distinctionTh).toContain('背水一战');
      expect(comparison?.sharedThemeTh).toBeDefined();
    });

    it('compares same category idioms gracefully', () => {
      const comparison = compareIdiomNuance('idiom-tongzhougongji', 'idiom-zhijizhibi');
      expect(comparison).not.toBeNull();
      expect(comparison?.sharedThemeTh).toContain('strategy');
    });

    it('returns null if either idiom does not exist', () => {
      const comparison = compareIdiomNuance('fake-a', 'idiom-pofuchenzhou');
      expect(comparison).toBeNull();
    });
  });

  describe('createSRSItemFromIdiom', () => {
    it('converts an idiom entry into a valid SRS card object', () => {
      const idiom = getIdiomById('idiom-pofuchenzhou')!;
      const srsItem = createSRSItemFromIdiom(idiom);
      expect(srsItem.word_id).toBe('idiom_pofuchenzhou');
      expect(srsItem.hanzi).toBe('破釜沉舟');
      expect(srsItem.pinyin).toBe('pò fǔ chén zhōu');
      expect(srsItem.display_pinyin).toBe('pò fǔ chén zhōu');
      expect(srsItem.meaning_th).toContain('ตัดทางถอย');
      expect(srsItem.mnemonic).toContain('《史记·项羽本纪》');
    });
  });

  describe('getRandomDilemma', () => {
    it('returns a random dilemma and respects excludeIds', () => {
      const rand1 = getRandomDilemma();
      expect(rand1).toBeDefined();
      expect(rand1?.dilemma.id).toBeDefined();

      const all = getAllDilemmas();
      const allIds = all.map((item) => item.dilemma.id);
      // If we exclude all except the first
      const excluded = allIds.slice(1);
      const rand2 = getRandomDilemma(excluded);
      expect(rand2?.dilemma.id).toBe(allIds[0]);
    });
  });

  describe('Pedagogical & Schema Integrity Checks (QA Gate)', () => {
    it('verifies all 20 idioms have non-empty Chinese, Pinyin, Dynasty, and Source', () => {
      const idioms = getAllIdioms();
      for (const item of idioms) {
        expect(item.id).toBeTruthy();
        expect(item.idiom.length).toBe(4); // 成语 must be 4 characters
        expect(item.pinyin).toBeTruthy();
        expect(item.hskLevel).toBeGreaterThanOrEqual(4);
        expect(item.literalMeaningTh).toBeTruthy();
        expect(item.figurativeMeaningTh).toBeTruthy();
        expect(item.historicalOrigin.dynastyTh).toBeTruthy();
        expect(item.historicalOrigin.sourceBook).toBeTruthy();
        expect(item.historicalOrigin.storyPanels.length).toBeGreaterThanOrEqual(1);
        for (const panel of item.historicalOrigin.storyPanels) {
          expect(panel.order).toBeGreaterThanOrEqual(1);
          expect(panel.titleTh).toBeTruthy();
          expect(panel.sceneTh).toBeTruthy();
        }
      }
    });
  });
});

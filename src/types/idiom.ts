/**
 * src/types/idiom.ts
 * Strict TypeScript types for Hanzero Idiom (成语) Lore & Dilemma Simulator Engine.
 * Adheres strictly to AGENTS.md §4.2: Zero 'any', pure types, 100% testable.
 */

export type IdiomCategory =
  | 'strategy'        // กลยุทธ์และการทำศึก
  | 'prudence'        // ความรอบคอบและการบริหารความเสี่ยง
  | 'perseverance'    // ความเพียรและความเด็ดเดี่ยว
  | 'deception'       // ภาพลวงตาและการประเมินสถานการณ์
  | 'virtue'          // คุณธรรมและการปฏิบัติตน
  | 'daily_wisdom';   // ภูมิปัญญาการดำเนินชีวิต

export interface StoryPanel {
  order: number;
  titleTh: string;
  sceneTh: string;
  quoteZh?: string;
  quotePinyin?: string;
  quoteTh?: string;
  characterName?: string;
  characterRoleTh?: string;
}

export interface SynonymNuance {
  synonym: string;
  synonymPinyin: string;
  literalMeaningTh: string;
  figurativeMeaningTh: string;
  keyDifferenceTh: string;
  sharedThemeTh: string;
  usageAdviceTh: string;
}

export type DilemmaOutcomeType = 'optimal' | 'suboptimal' | 'misguided';

export interface DilemmaChoice {
  idiomId: string;
  idiom: string;
  pinyin: string;
  strategyTitleTh: string;
  explanationTh: string;
  isOptimal: boolean;
  nuanceTrap?: boolean;
  scoreDelta: number;
  outcomeType: DilemmaOutcomeType;
}

export type ScenarioCategory =
  | 'corporate_strategy'  // กลยุทธ์องค์กร
  | 'crisis_management'   // การบริหารวิกฤต
  | 'team_leadership'     // การนำทีมและบริหารคน
  | 'personal_dilemma'    // การตัดสินใจในชีวิต
  | 'negotiation';        // การเจรจาต่อรอง

export interface IdiomDilemmaCase {
  id: string;
  titleTh: string;
  scenarioCategory: ScenarioCategory;
  situationTh: string;
  coreDilemmaQuestionTh: string;
  choices: DilemmaChoice[];
}

export interface IdiomLoreEntry {
  id: string;
  idiom: string;
  pinyin: string;
  hskLevel: number; // 4, 5, 6
  literalMeaningTh: string;
  figurativeMeaningTh: string;
  figurativeMeaningEn: string;
  category: IdiomCategory;
  historicalOrigin: {
    dynastyTh: string;
    periodApprox: string;
    keyFigures: string[];
    sourceBook: string;
    storySummaryTh: string;
    storyPanels: StoryPanel[];
  };
  synonymNuance?: SynonymNuance;
  antonym?: {
    idiom: string;
    pinyin: string;
    meaningTh: string;
  };
  dilemmas: IdiomDilemmaCase[];
  tags: string[];
}

export interface DilemmaEvaluationResult {
  dilemmaId: string;
  selectedIdiomId: string;
  chosenChoice: DilemmaChoice;
  isOptimal: boolean;
  scoreAwarded: number;
  feedbackTh: string;
  pedagogicalAnalysisTh: string;
  synonymNuanceComparison?: {
    chosenIdiom: string;
    optimalIdiom: string;
    distinctionTh: string;
  };
}

export interface IdiomFilterOptions {
  searchQuery?: string;
  category?: IdiomCategory | 'all';
  hskLevel?: number | 'all';
}

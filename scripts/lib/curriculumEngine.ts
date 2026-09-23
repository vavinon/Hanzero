/**
 * scripts/lib/curriculumEngine.ts
 * Pure Functional Curriculum Validation & Pedagogical Linter Engine.
 * Adheres strictly to AGENTS.md §4.2: Zero DOM, Strict Typing, Zero 'any', 100% Testable.
 */

import * as fs from 'fs';
import * as path from 'path';

// --- Types & Interfaces ---

export interface ValidationOptions {
  rootDir?: string;
  tier?: '0' | '1' | '2' | '3' | 'all';
  unitId?: string;
  strict?: boolean;
  verbose?: boolean;
}

export type Severity = 'error' | 'warning';

export interface ValidationError {
  stage: 1 | 2 | 3 | 4 | 5;
  severity: Severity;
  unitId: string;
  lessonId?: string;
  vocabId?: string;
  rule: string;
  message: string;
}

export interface UnitInterleavingStat {
  unitId: string;
  rate: number;
  priorWordsMatched: string[];
  totalTokens: number;
}

export interface ValidationSummary {
  success: boolean;
  totalUnitsChecked: number;
  totalLessonsChecked: number;
  totalVocabChecked: number;
  errors: ValidationError[];
  warnings: ValidationError[];
  interleavingStats: Record<string, UnitInterleavingStat>;
  durationMs: number;
}

// --- Constants & Blacklists ---

/**
 * Traditional Chinese Blacklist (75 characters) to enforce Simplified Chinese 100%.
 */
export const TRADITIONAL_BLACKLIST = new Set([
  '國', '謝', '歡', '見', '們', '門', '個', '樣', '東', '點', '這', '買', '賣', '錢', '車',
  '飯', '時', '後', '電', '話', '學', '習', '開', '關', '飛', '機', '藥', '醫', '體', '熱',
  '氣', '雙', '邊', '麵', '飲', '館', '號', '線', '誰', '兒', '麼', '為', '會', '說', '寫',
  '讀', '聽', '語', '漢', '兩', '幾', '師', '課', '問', '間', '現', '視', '動', '經', '過',
  '讓', '給', '還', '長', '貴', '發', '燒', '壞', '預', '訂', '護', '碼', '員', '條', '塊', '歲',
  '單',
]);

/**
 * Known Tone 4 characters commonly following 不 or 一 in beginner curriculum.
 */
export const KNOWN_TONE4_CHARACTERS = new Set([
  '是', '要', '对', '客', '去', '会', '见', '快', '块', '定', '共', '次', '件', '万', '谢',
  '饭', '后', '话', '到', '叫', '看', '亮', '忘', '问', '进', '再', '下', '上', '用', '大', '太', '慢',
  '个', '错', '贵', '累', '站', '送', '换', '住', '便', '带', '算', '动', '爱', '辣', '半',
  '套', '退', '办', '试', '够', '断', '限',
]);

/**
 * Known Tone 1, 2, 3 characters commonly following 不 or 一.
 */
export const KNOWN_TONE123_CHARACTERS = new Set([
  // Tone 1
  '吃', '高', '喝', '天', '杯', '些', '新', '生', '听', '说', '多', '知', '书', '张', '家', '只', '先', '车', '包', '边', '飞', '千', '通',
  // Tone 2
  '行', '来', '年', '直', '条', '学', '常', '明', '昨', '难', '没', '同', '白', '旁', '瓶', '忙', '人', '茶', '钱', '房', '门', '提',
  // Tone 3
  '好', '买', '起', '点', '碗', '本', '想', '你', '我', '请', '早', '晚', '小', '手', '老', '给', '可', '几', '走', '打', '找', '百',
]);

/**
 * Third-tone character pairs known to trigger 3+3 Tone Sandhi.
 */
export const KNOWN_33_SANDHI_WORDS: Record<string, { basePinyin: string; displayPinyin: string }> = {
  '你好': { basePinyin: 'nǐ hǎo', displayPinyin: 'ní hǎo' },
  '可以': { basePinyin: 'kěyǐ', displayPinyin: 'kéyǐ' },
  '手表': { basePinyin: 'shǒubiǎo', displayPinyin: 'shóubiǎo' },
  '给你': { basePinyin: 'gěi nǐ', displayPinyin: 'géi nǐ' },
  '哪里': { basePinyin: 'nǎlǐ', displayPinyin: 'nálǐ' },
  '洗手': { basePinyin: 'xǐshǒu', displayPinyin: 'xíshǒu' },
  '洗手间': { basePinyin: 'xǐshǒujiān', displayPinyin: 'xíshǒujiān' },
  '我也': { basePinyin: 'wǒ yě', displayPinyin: 'wó yě' },
  '往左': { basePinyin: 'wǎng zuǒ', displayPinyin: 'wáng zuǒ' },
  '很好': { basePinyin: 'hěn hǎo', displayPinyin: 'hén hǎo' },
  '雨伞': { basePinyin: 'yǔsǎn', displayPinyin: 'yúsǎn' },
  '水饺': { basePinyin: 'shuǐjiǎo', displayPinyin: 'shuíjiǎo' },
  '米酒': { basePinyin: 'mǐjiǔ', displayPinyin: 'míjiǔ' },
  '两点': { basePinyin: 'liǎng diǎn', displayPinyin: 'liáng diǎn' },
  '几点': { basePinyin: 'jǐ diǎn', displayPinyin: 'jí diǎn' },
  '五点': { basePinyin: 'wǔ diǎn', displayPinyin: 'wú diǎn' },
  '九点': { basePinyin: 'jiǔ diǎn', displayPinyin: 'jiú diǎn' },
  '两碗': { basePinyin: 'liǎng wǎn', displayPinyin: 'liáng wǎn' },
  '老板': { basePinyin: 'lǎobǎn', displayPinyin: 'láobǎn' },
  '买礼物': { basePinyin: 'mǎi lǐwù', displayPinyin: 'mái lǐwù' },
};

// --- Pure Helper Functions ---

/**
 * Strips tone accents to normalize pinyin vowels.
 */
export function removePinyinAccents(pinyin: string): string {
  return pinyin
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Checks for illegal characters in Hanzi string.
 */
export function findTraditionalChars(hanzi: string): string[] {
  const found: string[] = [];
  for (const char of hanzi) {
    if (TRADITIONAL_BLACKLIST.has(char)) {
      found.push(char);
    }
  }
  return found;
}

/**
 * Forward Maximum Matching (FMM) Tokenizer for Chinese text using a dictionary.
 */
export function forwardMaxMatch(text: string, dictionary: Set<string>, maxLen = 4): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (let len = Math.min(maxLen, text.length - i); len > 0; len--) {
      const sub = text.substring(i, i + len);
      if (dictionary.has(sub) || len === 1) {
        tokens.push(sub);
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push(text[i]);
      i++;
    }
  }
  return tokens;
}

// --- Main Validation Engine ---

export class CurriculumEngine {
  private rootDir: string;
  private lessonsDir: string;

  constructor(rootDir?: string) {
    this.rootDir = rootDir || path.resolve(process.cwd());
    this.lessonsDir = path.join(this.rootDir, 'src', 'data', 'lessons');
  }

  /**
   * Executes the full 5-stage validation pipeline.
   */
  public async validate(options: ValidationOptions = {}): Promise<ValidationSummary> {
    const startTime = Date.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];
    const interleavingStats: Record<string, UnitInterleavingStat> = {};

    let totalUnitsChecked = 0;
    let totalLessonsChecked = 0;
    let totalVocabChecked = 0;

    const tierFilter = options.tier || 'all';
    const targetUnitId = options.unitId;

    // --- STAGE 1: Manifest & File Discovery ---
    const tier0Dir = path.join(this.lessonsDir, 'tier0');
    const tier1Dir = path.join(this.lessonsDir, 'tier1');
    const tier2Dir = path.join(this.lessonsDir, 'tier2');
    const tier3Dir = path.join(this.lessonsDir, 'tier3');

    const tier0Files = fs.existsSync(tier0Dir)
      ? fs.readdirSync(tier0Dir).filter((f) => f.startsWith('unit00_') && f.endsWith('.json'))
      : [];

    const tier1Files = fs.existsSync(tier1Dir)
      ? fs.readdirSync(tier1Dir).filter((f) => f.startsWith('unit') && f.endsWith('.json'))
      : [];

    const tier2Files = fs.existsSync(tier2Dir)
      ? fs.readdirSync(tier2Dir).filter((f) => f.startsWith('unit') && f.endsWith('.json'))
      : [];

    const tier3Files = fs.existsSync(tier3Dir)
      ? fs.readdirSync(tier3Dir).filter((f) => f.startsWith('unit') && f.endsWith('.json'))
      : [];

    if (tier0Files.length === 0 && tier1Files.length === 0 && tier2Files.length === 0 && tier3Files.length === 0) {
      errors.push({
        stage: 1,
        severity: 'error',
        unitId: 'GLOBAL',
        rule: 'FILE_DISCOVERY',
        message: `No unit JSON files found in ${this.lessonsDir}`,
      });
      return {
        success: false,
        totalUnitsChecked: 0,
        totalLessonsChecked: 0,
        totalVocabChecked: 0,
        errors,
        warnings,
        interleavingStats,
        durationMs: Date.now() - startTime,
      };
    }

    const globalUnitIds = new Set<string>();
    const globalLessonIds = new Set<string>();
    const globalVocabIds = new Set<string>();
    const cumulativeVocabLexicon = new Set<string>();

    // Pre-populate cumulative vocabulary from prior tiers if filtered
    if (tierFilter === '1' || tierFilter === '2' || tierFilter === '3') {
      for (const file of tier0Files) {
        const filePath = path.join(tier0Dir, file);
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (Array.isArray(content?.lessons)) {
            for (const l of content.lessons as Record<string, unknown>[]) {
              if (Array.isArray(l?.sound_cards)) {
                for (const sc of l.sound_cards as Record<string, unknown>[]) {
                  if (Array.isArray(sc?.example_words)) {
                    for (const ew of sc.example_words as Record<string, unknown>[]) {
                      if (typeof ew?.hanzi === 'string') cumulativeVocabLexicon.add(ew.hanzi);
                    }
                  }
                }
              }
              if (Array.isArray(l?.stroke_cards)) {
                for (const st of l.stroke_cards as Record<string, unknown>[]) {
                  if (Array.isArray(st?.example_words)) {
                    for (const ew of st.example_words as Record<string, unknown>[]) {
                      if (typeof ew?.hanzi === 'string') cumulativeVocabLexicon.add(ew.hanzi);
                    }
                  }
                }
              }
            }
          }
        } catch {}
      }
    }

    if (tierFilter === '2' || tierFilter === '3') {
      for (const file of tier1Files) {
        const filePath = path.join(tier1Dir, file);
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (Array.isArray(content?.lessons)) {
            for (const l of content.lessons as Record<string, unknown>[]) {
              if (Array.isArray(l?.vocabulary)) {
                for (const v of l.vocabulary as Record<string, unknown>[]) {
                  if (typeof v?.hanzi === 'string') cumulativeVocabLexicon.add(v.hanzi);
                }
              }
            }
          }
        } catch {}
      }
    }

    if (tierFilter === '3') {
      for (const file of tier2Files) {
        const filePath = path.join(tier2Dir, file);
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (Array.isArray(content?.lessons)) {
            for (const l of content.lessons as Record<string, unknown>[]) {
              if (Array.isArray(l?.vocabulary)) {
                for (const v of l.vocabulary as Record<string, unknown>[]) {
                  if (typeof v?.hanzi === 'string') cumulativeVocabLexicon.add(v.hanzi);
                }
              }
            }
          }
        } catch {}
      }
    }

    // 1. Process Tier 0 Files if requested
    if (tierFilter === '0' || tierFilter === 'all') {
      for (const file of tier0Files) {
        const filePath = path.join(tier0Dir, file);
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (!content || typeof content !== 'object') {
            errors.push({
              stage: 1,
              severity: 'error',
              unitId: file,
              rule: 'JSON_SCHEMA',
              message: `Empty or non-object JSON content in ${file}`,
            });
            continue;
          }

          const unitId = typeof content.unit_id === 'string' ? content.unit_id : file;

          if (targetUnitId && unitId !== targetUnitId) continue;
          totalUnitsChecked++;

          // Stage 2 & 3 for Tier 0
          this.validateTier0Unit(content, file, errors, warnings, globalUnitIds);

          // Collect vocab and track counts from Tier 0
          if (Array.isArray(content.lessons)) {
            totalLessonsChecked += content.lessons.length;
            for (const l of content.lessons as Record<string, unknown>[]) {
              if (l && typeof l === 'object') {
                if (Array.isArray(l.sound_cards)) {
                  totalVocabChecked += l.sound_cards.length;
                  for (const sc of l.sound_cards as Record<string, unknown>[]) {
                    if (sc && Array.isArray(sc.example_words)) {
                      for (const ew of sc.example_words as Record<string, unknown>[]) {
                        if (ew && typeof ew.hanzi === 'string') cumulativeVocabLexicon.add(ew.hanzi);
                      }
                    }
                  }
                }
                if (Array.isArray(l.stroke_cards)) {
                  totalVocabChecked += l.stroke_cards.length;
                  for (const st of l.stroke_cards as Record<string, unknown>[]) {
                    if (st && Array.isArray(st.example_words)) {
                      for (const ew of st.example_words as Record<string, unknown>[]) {
                        if (ew && typeof ew.hanzi === 'string') cumulativeVocabLexicon.add(ew.hanzi);
                      }
                    }
                  }
                }
              }
            }
          }
        } catch (err: unknown) {
          errors.push({
            stage: 1,
            severity: 'error',
            unitId: file,
            rule: 'JSON_SYNTAX',
            message: `JSON parse error in ${file}: ${(err as Error).message}`,
          });
        }
      }
    }

    // 2. Process Tier 1 Files if requested
    if (tierFilter === '1' || tierFilter === 'all') {
      for (const file of tier1Files) {
        const filePath = path.join(tier1Dir, file);
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (!content || typeof content !== 'object') {
            errors.push({
              stage: 1,
              severity: 'error',
              unitId: file,
              rule: 'JSON_SCHEMA',
              message: `Empty or non-object JSON content in ${file}`,
            });
            continue;
          }

          const unitId = typeof content.unit_id === 'string' ? content.unit_id : file;

          if (targetUnitId && unitId !== targetUnitId) continue;
          totalUnitsChecked++;

          // Stage 2, 3, 4 for Tier 1
          const unitVocab = this.validateTier1Unit(
            content,
            file,
            errors,
            warnings,
            globalUnitIds,
            globalLessonIds,
            globalVocabIds
          );

          totalLessonsChecked += Array.isArray(content.lessons) ? content.lessons.length : 0;
          totalVocabChecked += unitVocab.length;

          // Stage 5: Interleaving Calculator (Units >= 2)
          const unitNumber = typeof content.unit_number === 'number' ? content.unit_number : 1;
          if (unitNumber >= 2 && cumulativeVocabLexicon.size > 0) {
            const stat = this.calculateInterleaving(content, cumulativeVocabLexicon);
            interleavingStats[unitId] = stat;

            if (stat.rate < 20) {
              const msg = `Interleaving rate is ${stat.rate.toFixed(1)}% (minimum requirement is 20%). Found ${stat.priorWordsMatched.length} recycled words in ${stat.totalTokens} unique tokens.`;
              if (options.strict) {
                errors.push({
                  stage: 5,
                  severity: 'error',
                  unitId,
                  rule: 'INTERLEAVING_MINIMUM',
                  message: msg,
                });
              } else {
                warnings.push({
                  stage: 5,
                  severity: 'warning',
                  unitId,
                  rule: 'INTERLEAVING_MINIMUM',
                  message: msg,
                });
              }
            }
          }

          // Add this unit's vocab to cumulative dictionary for subsequent units
          for (const word of unitVocab) {
            cumulativeVocabLexicon.add(word);
          }
        } catch (err: unknown) {
          errors.push({
            stage: 1,
            severity: 'error',
            unitId: file,
            rule: 'JSON_SYNTAX',
            message: `JSON parse error in ${file}: ${(err as Error).message}`,
          });
        }
      }
    }

    // 3. Process Tier 2 Files if requested
    if (tierFilter === '2' || tierFilter === 'all') {
      for (const file of tier2Files) {
        const filePath = path.join(tier2Dir, file);
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (!content || typeof content !== 'object') {
            errors.push({
              stage: 1,
              severity: 'error',
              unitId: file,
              rule: 'JSON_SCHEMA',
              message: `Empty or non-object JSON content in ${file}`,
            });
            continue;
          }

          const unitId = typeof content.unit_id === 'string' ? content.unit_id : file;

          if (targetUnitId && unitId !== targetUnitId) continue;
          totalUnitsChecked++;

          // Stage 2, 3, 4 for Tier 2
          const unitVocab = this.validateTier1Unit(
            content,
            file,
            errors,
            warnings,
            globalUnitIds,
            globalLessonIds,
            globalVocabIds
          );

          totalLessonsChecked += Array.isArray(content.lessons) ? content.lessons.length : 0;
          totalVocabChecked += unitVocab.length;

          // Stage 5: Interleaving Calculator (Units >= 2)
          const unitNumber = typeof content.unit_number === 'number' ? content.unit_number : 11;
          if (unitNumber >= 2 && cumulativeVocabLexicon.size > 0) {
            const stat = this.calculateInterleaving(content, cumulativeVocabLexicon);
            interleavingStats[unitId] = stat;

            if (stat.rate < 20) {
              const msg = `Interleaving rate is ${stat.rate.toFixed(1)}% (minimum requirement is 20%). Found ${stat.priorWordsMatched.length} recycled words in ${stat.totalTokens} unique tokens.`;
              if (options.strict) {
                errors.push({
                  stage: 5,
                  severity: 'error',
                  unitId,
                  rule: 'INTERLEAVING_MINIMUM',
                  message: msg,
                });
              } else {
                warnings.push({
                  stage: 5,
                  severity: 'warning',
                  unitId,
                  rule: 'INTERLEAVING_MINIMUM',
                  message: msg,
                });
              }
            }
          }

          // Add this unit's vocab to cumulative dictionary for subsequent units
          for (const word of unitVocab) {
            cumulativeVocabLexicon.add(word);
          }
        } catch (err: unknown) {
          errors.push({
            stage: 1,
            severity: 'error',
            unitId: file,
            rule: 'JSON_SYNTAX',
            message: `JSON parse error in ${file}: ${(err as Error).message}`,
          });
        }
      }
    }

    // 4. Process Tier 3 Files if requested
    if (tierFilter === '3' || tierFilter === 'all') {
      for (const file of tier3Files) {
        const filePath = path.join(tier3Dir, file);
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (!content || typeof content !== 'object') {
            errors.push({
              stage: 1,
              severity: 'error',
              unitId: file,
              rule: 'JSON_SCHEMA',
              message: `Empty or non-object JSON content in ${file}`,
            });
            continue;
          }

          const unitId = typeof content.unit_id === 'string' ? content.unit_id : file;

          if (targetUnitId && unitId !== targetUnitId) continue;
          totalUnitsChecked++;

          // Stage 2, 3, 4 for Tier 3
          const unitVocab = this.validateTier1Unit(
            content,
            file,
            errors,
            warnings,
            globalUnitIds,
            globalLessonIds,
            globalVocabIds
          );

          totalLessonsChecked += Array.isArray(content.lessons) ? content.lessons.length : 0;
          totalVocabChecked += unitVocab.length;

          // Stage 5: Interleaving Calculator (Units >= 2)
          const unitNumber = typeof content.unit_number === 'number' ? content.unit_number : 26;
          if (unitNumber >= 2 && cumulativeVocabLexicon.size > 0) {
            const stat = this.calculateInterleaving(content, cumulativeVocabLexicon);
            interleavingStats[unitId] = stat;

            if (stat.rate < 20) {
              const msg = `Interleaving rate is ${stat.rate.toFixed(1)}% (minimum requirement is 20%). Found ${stat.priorWordsMatched.length} recycled words in ${stat.totalTokens} unique tokens.`;
              if (options.strict) {
                errors.push({
                  stage: 5,
                  severity: 'error',
                  unitId,
                  rule: 'INTERLEAVING_MINIMUM',
                  message: msg,
                });
              } else {
                warnings.push({
                  stage: 5,
                  severity: 'warning',
                  unitId,
                  rule: 'INTERLEAVING_MINIMUM',
                  message: msg,
                });
              }
            }
          }

          // Add this unit's vocab to cumulative dictionary for subsequent units
          for (const word of unitVocab) {
            cumulativeVocabLexicon.add(word);
          }
        } catch (err: unknown) {
          errors.push({
            stage: 1,
            severity: 'error',
            unitId: file,
            rule: 'JSON_SYNTAX',
            message: `JSON parse error in ${file}: ${(err as Error).message}`,
          });
        }
      }
    }

    if (targetUnitId && totalUnitsChecked === 0) {
      errors.push({
        stage: 1,
        severity: 'error',
        unitId: targetUnitId,
        rule: 'UNIT_NOT_FOUND',
        message: `Target unit_id '${targetUnitId}' was not found in curriculum files.`,
      });
    }

    const success = errors.length === 0 && (!options.strict || warnings.length === 0);

    return {
      success,
      totalUnitsChecked,
      totalLessonsChecked,
      totalVocabChecked,
      errors,
      warnings,
      interleavingStats,
      durationMs: Date.now() - startTime,
    };
  }

  // --- Tier 0 Validator ---
  private validateTier0Unit(
    content: Record<string, unknown>,
    filename: string,
    errors: ValidationError[],
    _warnings: ValidationError[],
    globalUnitIds: Set<string>
  ): void {
    const unitId = typeof content.unit_id === 'string' ? content.unit_id : filename;

    // Stage 3: ID Uniqueness
    if (globalUnitIds.has(unitId)) {
      errors.push({
        stage: 3,
        severity: 'error',
        unitId,
        rule: 'GLOBAL_ID_UNIQUE',
        message: `Duplicate unit_id detected: ${unitId}`,
      });
    } else {
      globalUnitIds.add(unitId);
    }

    // Stage 2: Schema Type Guards
    if (!content.title || typeof content.title !== 'object') {
      errors.push({
        stage: 2,
        severity: 'error',
        unitId,
        rule: 'REQUIRED_FIELD',
        message: `Tier 0 Unit missing required 'title' object`,
      });
    } else {
      const titleObj = content.title as Record<string, unknown>;
      if (typeof titleObj.zh === 'string') {
        this.checkSimplifiedAndProhibitedSyntax(titleObj.zh, unitId, undefined, 'unit title', errors);
      }
    }

    if (!Array.isArray(content.lessons) || content.lessons.length === 0) {
      errors.push({
        stage: 2,
        severity: 'error',
        unitId,
        rule: 'REQUIRED_FIELD',
        message: `Tier 0 Unit missing 'lessons' array or empty`,
      });
    } else {
      for (const lesson of content.lessons as Record<string, unknown>[]) {
        if (!lesson || typeof lesson !== 'object') {
          errors.push({
            stage: 2,
            severity: 'error',
            unitId,
            rule: 'LESSON_SCHEMA',
            message: `Tier 0 Unit contains a null or non-object lesson`,
          });
          continue;
        }

        const lessonId = typeof lesson.lesson_id === 'string' ? lesson.lesson_id : 'unknown';
        
        // Check Safe Practice Zone rule (Tier 0 must never penalize hearts)
        if (lesson.is_safe_practice_zone !== true) {
          errors.push({
            stage: 2,
            severity: 'error',
            unitId,
            lessonId,
            rule: 'SAFE_PRACTICE_ZONE',
            message: `Tier 0 Lesson ${lessonId} must have 'is_safe_practice_zone: true'`,
          });
        }

        if (!lesson.title || !lesson.can_do || !lesson.baby_step_goal) {
          errors.push({
            stage: 2,
            severity: 'error',
            unitId,
            lessonId,
            rule: 'REQUIRED_FIELD',
            message: `Tier 0 Lesson ${lessonId} missing title, can_do, or baby_step_goal`,
          });
        }

        if (lesson.title && typeof lesson.title === 'object') {
          const lTitle = lesson.title as Record<string, unknown>;
          if (typeof lTitle.zh === 'string') {
            this.checkSimplifiedAndProhibitedSyntax(lTitle.zh, unitId, lessonId, 'lesson title', errors);
          }
        }

        // Check sound cards
        if (Array.isArray(lesson.sound_cards)) {
          for (const sc of lesson.sound_cards as Record<string, unknown>[]) {
            if (sc && typeof sc === 'object') {
              if (typeof sc.sound === 'string') {
                this.checkSimplifiedAndProhibitedSyntax(sc.sound, unitId, lessonId, 'sound card', errors);
              }
              if (Array.isArray(sc.example_words)) {
                for (const ew of sc.example_words as Record<string, unknown>[]) {
                  if (ew && typeof ew === 'object' && typeof ew.hanzi === 'string') {
                    this.checkSimplifiedAndProhibitedSyntax(ew.hanzi, unitId, lessonId, 'sound card example word', errors);
                  }
                }
              }
            }
          }
        }

        // Check stroke cards
        if (Array.isArray(lesson.stroke_cards)) {
          for (const st of lesson.stroke_cards as Record<string, unknown>[]) {
            if (st && typeof st === 'object') {
              if (typeof st.stroke_name_zh === 'string') {
                this.checkSimplifiedAndProhibitedSyntax(st.stroke_name_zh, unitId, lessonId, 'stroke name', errors);
              }
              if (typeof st.example_char === 'string') {
                this.checkSimplifiedAndProhibitedSyntax(st.example_char, unitId, lessonId, 'stroke example char', errors);
              }
              if (Array.isArray(st.example_words)) {
                for (const ew of st.example_words as Record<string, unknown>[]) {
                  if (ew && typeof ew === 'object' && typeof ew.hanzi === 'string') {
                    this.checkSimplifiedAndProhibitedSyntax(ew.hanzi, unitId, lessonId, 'stroke card example word', errors);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // --- Tier 1 Validator ---
  private validateTier1Unit(
    unit: Record<string, unknown>,
    filename: string,
    errors: ValidationError[],
    warnings: ValidationError[],
    globalUnitIds: Set<string>,
    globalLessonIds: Set<string>,
    globalVocabIds: Set<string>
  ): string[] {
    const unitId = typeof unit.unit_id === 'string' ? unit.unit_id : filename;
    const unitVocabList: string[] = [];

    // Stage 3: Unit ID Uniqueness
    if (globalUnitIds.has(unitId)) {
      errors.push({
        stage: 3,
        severity: 'error',
        unitId,
        rule: 'GLOBAL_ID_UNIQUE',
        message: `Duplicate unit_id: ${unitId}`,
      });
    } else {
      globalUnitIds.add(unitId);
    }

    // Stage 2: Unit Metadata Guards
    if (!unit.title || typeof unit.title !== 'object') {
      errors.push({ stage: 2, severity: 'error', unitId, rule: 'UNIT_TITLE', message: 'Missing title object' });
    } else {
      const uTitle = unit.title as Record<string, unknown>;
      if (typeof uTitle.zh === 'string') {
        this.checkSimplifiedAndProhibitedSyntax(uTitle.zh, unitId, undefined, 'unit title', errors);
      }
    }
    if (!Array.isArray(unit.lessons) || unit.lessons.length === 0) {
      errors.push({ stage: 2, severity: 'error', unitId, rule: 'LESSONS_ARRAY', message: 'Missing lessons array' });
      return unitVocabList;
    }

    // Iterate Lessons
    for (const lesson of unit.lessons as Record<string, unknown>[]) {
      if (!lesson || typeof lesson !== 'object') continue;
      const lessonId = typeof lesson.lesson_id === 'string' ? lesson.lesson_id : 'unknown_lesson';

      // Lesson ID Uniqueness
      if (globalLessonIds.has(lessonId)) {
        errors.push({
          stage: 3,
          severity: 'error',
          unitId,
          lessonId,
          rule: 'LESSON_ID_UNIQUE',
          message: `Duplicate lesson_id: ${lessonId}`,
        });
      } else {
        globalLessonIds.add(lessonId);
      }

      // Lesson Mandatory Fields
      if (!lesson.title || !lesson.can_do || !lesson.baby_step_goal) {
        errors.push({
          stage: 2,
          severity: 'error',
          unitId,
          lessonId,
          rule: 'LESSON_FIELDS',
          message: `Lesson ${lessonId} missing title, can_do, or baby_step_goal`,
        });
      }

      if (lesson.title && typeof lesson.title === 'object') {
        const lTitle = lesson.title as Record<string, unknown>;
        if (typeof lTitle.zh === 'string') {
          this.checkSimplifiedAndProhibitedSyntax(lTitle.zh, unitId, lessonId, 'lesson title', errors);
        }
      }

      // Check Dialogue
      if (Array.isArray(lesson.dialogue)) {
        for (const d of lesson.dialogue as Record<string, unknown>[]) {
          if (d && typeof d === 'object' && typeof d.zh === 'string') {
            this.checkSimplifiedAndProhibitedSyntax(
              d.zh,
              unitId,
              lessonId,
              `dialogue line (${typeof d.speaker === 'string' ? d.speaker : 'line'})`,
              errors
            );
          }
        }
      }

      // Check Grammar Bite
      if (lesson.grammar_bite && typeof lesson.grammar_bite === 'object') {
        const gb = lesson.grammar_bite as Record<string, unknown>;
        if (typeof gb.title === 'string' && /[\u4e00-\u9fa5]/.test(gb.title)) {
          this.checkSimplifiedAndProhibitedSyntax(gb.title, unitId, lessonId, 'grammar title', errors);
        }
        if (Array.isArray(gb.patterns)) {
          for (const p of gb.patterns as Record<string, unknown>[]) {
            if (p && typeof p === 'object' && typeof p.zh === 'string') {
              this.checkSimplifiedAndProhibitedSyntax(p.zh, unitId, lessonId, 'grammar pattern', errors);
            }
          }
        }
      }

      // Check Vocabulary
      if (Array.isArray(lesson.vocabulary)) {
        for (const vocab of lesson.vocabulary as Record<string, unknown>[]) {
          if (!vocab || typeof vocab !== 'object') continue;
          const vocabId = typeof vocab.id === 'string' ? vocab.id : 'unknown_vocab';
          const hanzi = typeof vocab.hanzi === 'string' ? vocab.hanzi : '';
          const pinyin = typeof vocab.pinyin === 'string' ? vocab.pinyin : '';
          const displayPinyin = typeof vocab.display_pinyin === 'string' ? vocab.display_pinyin : pinyin;

          if (hanzi) unitVocabList.push(hanzi);

          // Vocab ID Uniqueness
          if (globalVocabIds.has(vocabId)) {
            errors.push({
              stage: 3,
              severity: 'error',
              unitId,
              lessonId,
              vocabId,
              rule: 'VOCAB_ID_UNIQUE',
              message: `Duplicate vocab id: ${vocabId}`,
            });
          } else {
            globalVocabIds.add(vocabId);
          }

          // Vocab Mandatory Fields
          const requiredVocabFields = [
            'id', 'hanzi', 'pinyin', 'pinyin_tone', 'meaning_th', 'meaning_en',
            'radical', 'radical_name_th', 'stroke_count', 'mnemonic', 'kid_mnemonic', 'body_gesture',
          ];
          for (const f of requiredVocabFields) {
            if (vocab[f] === undefined || vocab[f] === null || vocab[f] === '') {
              errors.push({
                stage: 2,
                severity: 'error',
                unitId,
                lessonId,
                vocabId,
                rule: 'VOCAB_FIELDS',
                message: `Vocab ${vocabId} (${hanzi}) missing required field '${f}'`,
              });
            }
          }

          // --- STAGE 4: Linguistic & Tone Sandhi Linter ---
          // 4.1 Traditional Chinese & Prohibited 不有 Guard on Vocab
          this.checkSimplifiedAndProhibitedSyntax(hanzi, unitId, lessonId, `vocab '${vocabId}'`, errors);

          // 4.2 Tone Sandhi for 不 (bù / bú / bu)
          this.lintBuSandhi(hanzi, pinyin, displayPinyin, unitId, lessonId, vocabId, errors, warnings);

          // 4.3 Tone Sandhi for 一 (yī / yí / yì / yi / yāo)
          this.lintYiSandhi(hanzi, pinyin, displayPinyin, unitId, lessonId, vocabId, errors, warnings);

          // 4.4 Tone Sandhi for 3+3 -> 2+3
          this.lint33Sandhi(hanzi, pinyin, displayPinyin, vocab, unitId, lessonId, vocabId, errors, warnings);
        }
      }

      // Check Quizzes
      if (Array.isArray(lesson.quizzes)) {
        for (let qIdx = 0; qIdx < lesson.quizzes.length; qIdx++) {
          const q = lesson.quizzes[qIdx] as Record<string, unknown>;
          if (!q || typeof q !== 'object') continue;
          if (!q.question_th || !q.explanation_th) {
            errors.push({
              stage: 2,
              severity: 'error',
              unitId,
              lessonId,
              rule: 'QUIZ_SCHEMA',
              message: `Quiz #${qIdx + 1} missing question_th or explanation_th`,
            });
          }
          if (typeof q.context_zh === 'string' && /[\u4e00-\u9fa5]/.test(q.context_zh)) {
            this.checkSimplifiedAndProhibitedSyntax(q.context_zh, unitId, lessonId, `quiz #${qIdx + 1} context_zh`, errors);
          }
          if (typeof q.question_th === 'string' && /[\u4e00-\u9fa5]/.test(q.question_th)) {
            this.checkSimplifiedAndProhibitedSyntax(q.question_th, unitId, lessonId, `quiz #${qIdx + 1} question_th`, errors);
          }
          if (typeof q.explanation_th === 'string' && /[\u4e00-\u9fa5]/.test(q.explanation_th)) {
            this.checkSimplifiedAndProhibitedSyntax(q.explanation_th, unitId, lessonId, `quiz #${qIdx + 1} explanation_th`, errors);
          }
          if (Array.isArray(q.options) && typeof q.correct_index === 'number') {
            if (q.correct_index < 0 || q.correct_index >= q.options.length) {
              errors.push({
                stage: 3,
                severity: 'error',
                unitId,
                lessonId,
                rule: 'QUIZ_INDEX_BOUNDS',
                message: `Quiz #${qIdx + 1} correct_index ${q.correct_index} is out of bounds (options length: ${q.options.length})`,
              });
            }
            for (const opt of q.options) {
              if (typeof opt === 'string' && /[\u4e00-\u9fa5]/.test(opt)) {
                this.checkSimplifiedAndProhibitedSyntax(opt, unitId, lessonId, `quiz #${qIdx + 1} option`, errors);
              }
            }
          }
          if (Array.isArray(q.tokens)) {
            for (const tok of q.tokens) {
              if (typeof tok === 'string' && /[\u4e00-\u9fa5]/.test(tok)) {
                this.checkSimplifiedAndProhibitedSyntax(tok, unitId, lessonId, `quiz #${qIdx + 1} token`, errors);
              }
            }
          }
        }
      }

      // Check Boss Challenge
      if (lesson.boss_challenge && typeof lesson.boss_challenge === 'object') {
        const bc = lesson.boss_challenge as Record<string, unknown>;
        if (typeof bc.scenario_th === 'string' && /[\u4e00-\u9fa5]/.test(bc.scenario_th)) {
          this.checkSimplifiedAndProhibitedSyntax(bc.scenario_th, unitId, lessonId, 'boss challenge scenario', errors);
        }
        if (Array.isArray(bc.dialogue_context)) {
          for (const d of bc.dialogue_context as Record<string, unknown>[]) {
            if (d && typeof d === 'object' && typeof d.zh === 'string') {
              this.checkSimplifiedAndProhibitedSyntax(d.zh, unitId, lessonId, 'boss challenge dialogue', errors);
            }
          }
        }
        if (Array.isArray(bc.options) && typeof bc.correct_index === 'number') {
          if (bc.correct_index < 0 || bc.correct_index >= bc.options.length) {
            errors.push({
              stage: 3,
              severity: 'error',
              unitId,
              lessonId,
              rule: 'BOSS_INDEX_BOUNDS',
              message: `Boss challenge correct_index ${bc.correct_index} out of bounds (options: ${bc.options.length})`,
            });
          }
          for (const opt of bc.options) {
            if (typeof opt === 'string' && /[\u4e00-\u9fa5]/.test(opt)) {
              this.checkSimplifiedAndProhibitedSyntax(opt, unitId, lessonId, 'boss challenge option', errors);
            }
          }
        }
      }
    }

    return unitVocabList;
  }

  // --- Linguistic Check Helper ---
  private checkSimplifiedAndProhibitedSyntax(
    text: string,
    unitId: string,
    lessonId: string | undefined,
    locationDesc: string,
    errors: ValidationError[]
  ): void {
    const tradChars = findTraditionalChars(text);
    if (tradChars.length > 0) {
      errors.push({
        stage: 4,
        severity: 'error',
        unitId,
        lessonId,
        rule: 'SIMPLIFIED_CHINESE',
        message: `Disallowed traditional Chinese character(s) detected: ${tradChars.join(', ')} in ${locationDesc} '${text}'`,
      });
    }

    if (text.includes('不有')) {
      errors.push({
        stage: 4,
        severity: 'error',
        unitId,
        lessonId,
        rule: 'SYNTAX_BAN_BUYOU',
        message: `Prohibited grammar '不有' detected in ${locationDesc} '${text}'. Use '没有' instead.`,
      });
    }
  }

  // --- Sandhi Linters ---

  private lintBuSandhi(
    hanzi: string,
    pinyin: string,
    displayPinyin: string,
    unitId: string,
    lessonId: string,
    vocabId: string,
    errors: ValidationError[],
    warnings: ValidationError[]
  ): void {
    if (!hanzi.includes('不')) return;

    // Strip trailing punctuation and modal particles: ? ! . , 呢 呀 啊 吧
    const cleanHanzi = hanzi.replace(/[？?！!。，,\s]+$/, '').replace(/(?:呢|呀|啊|吧)$/, '');

    // Check A-不-A, A-不-AB (e.g. 喜不喜欢), and AB-不-AB pattern
    const aBuMatch =
      /^([\u4e00-\u9fa5])不\1$/.test(cleanHanzi) ||
      /^([\u4e00-\u9fa5])不\1[\u4e00-\u9fa5]$/.test(cleanHanzi) ||
      /^([\u4e00-\u9fa5]{2})不\1$/.test(cleanHanzi);

    if (aBuMatch) {
      if (!displayPinyin.includes('bu')) {
        warnings.push({
          stage: 4,
          severity: 'warning',
          unitId,
          lessonId,
          vocabId,
          rule: 'SANDHI_BU_NEUTRAL',
          message: `A-不-A / A-不-AB pattern in '${hanzi}' should have neutral tone 'bu' in display_pinyin (got '${displayPinyin}')`,
        });
      }
      return;
    }

    // Potential complement negative: V-不-Result (e.g. 吃不下, 受不了, 走不动, 买不起)
    // where 不 has neutral tone 'bu'
    const isPotentialComplement = /^[\u4e00-\u9fa5]不(?:下|了|动|起|到|见|完|懂|着|出|进|回|过|开)$/.test(cleanHanzi);
    if (isPotentialComplement) {
      if (!displayPinyin.includes('bu')) {
        warnings.push({
          stage: 4,
          severity: 'warning',
          unitId,
          lessonId,
          vocabId,
          rule: 'SANDHI_BU_NEUTRAL',
          message: `Potential complement in '${hanzi}' should have neutral tone 'bu' in display_pinyin (got '${displayPinyin}')`,
        });
      }
      return;
    }

    // Check 不 before Tone 4
    for (let i = 0; i < hanzi.length - 1; i++) {
      if (hanzi[i] === '不') {
        const nextChar = hanzi[i + 1];
        if (KNOWN_TONE4_CHARACTERS.has(nextChar)) {
          // Must be bú
          if (!displayPinyin.includes('bú') && !pinyin.includes('bú')) {
            errors.push({
              stage: 4,
              severity: 'error',
              unitId,
              lessonId,
              vocabId,
              rule: 'SANDHI_BU_BEFORE_TONE4',
              message: `'不' before 4th tone character '${nextChar}' in '${hanzi}' must change to 'bú' (got '${displayPinyin}')`,
            });
          }
        } else if (KNOWN_TONE123_CHARACTERS.has(nextChar)) {
          // Must remain bù
          if (displayPinyin.includes('bú')) {
            errors.push({
              stage: 4,
              severity: 'error',
              unitId,
              lessonId,
              vocabId,
              rule: 'SANDHI_BU_REMAINS_TONE4',
              message: `'不' before non-4th tone character '${nextChar}' in '${hanzi}' must remain 'bù' (got '${displayPinyin}')`,
            });
          }
        }
      }
    }
  }

  private lintYiSandhi(
    hanzi: string,
    _pinyin: string,
    displayPinyin: string,
    unitId: string,
    lessonId: string,
    vocabId: string,
    errors: ValidationError[],
    warnings: ValidationError[]
  ): void {
    if (!hanzi.includes('一')) return;

    const cleanHanzi = hanzi.replace(/[？?！!。，,\s]+$/, '');

    // 1. Ordinals with 第: e.g. 第一, 第一天, 第一次, 第一名, 第一个, 第一百零一
    const isOrdinal = /^第[一二三四五六七八九十百千万0-9]+(?:个|只|本|张|位|条|支|双|岁|天|年|次|课|名|期|步)?$/.test(cleanHanzi);

    // 2. Standalone or compound numerals ending in 一 (>= 11) with or without measure words:
    // e.g. 十一, 二十一, 二十一个, 三十一天, 五十一岁
    const isCompoundNumeral = /^(?:[一二三四五六七八九十百零]+)?(?:十|百|零)一(?:个|只|本|张|位|条|支|双|岁|天|年|次|块|元|角|分)?$/.test(cleanHanzi);
    const isPureOne = cleanHanzi === '一';
    const isCalendarDate = /^(?:星期一|周一|礼拜一|一月|十一月|十二月|一号|一日)$/.test(cleanHanzi);

    if (isOrdinal || isCompoundNumeral || isPureOne || isCalendarDate) {
      if (displayPinyin.includes('yí') || displayPinyin.includes('yì')) {
        errors.push({
          stage: 4,
          severity: 'error',
          unitId,
          lessonId,
          vocabId,
          rule: 'SANDHI_YI_BASE_TONE',
          message: `'一' in standalone numeral/ordinal/date '${hanzi}' must retain original tone 'yī' (got '${displayPinyin}')`,
        });
      }
      return;
    }

    // A-一-A reduplication: e.g. 看一看, 试一试
    if (/(.)一\1/.test(cleanHanzi)) {
      if (!displayPinyin.includes('yi')) {
        warnings.push({
          stage: 4,
          severity: 'warning',
          unitId,
          lessonId,
          vocabId,
          rule: 'SANDHI_YI_REDUPLICATION',
          message: `A-一-A reduplication in '${hanzi}' should have neutral tone 'yi' (got '${displayPinyin}')`,
        });
      }
      return;
    }

    // Phone / Room numbers: e.g. 101 -> yāo
    if (hanzi.includes('101') || hanzi.includes('房间') || hanzi.includes('电话') || hanzi.includes('密码') || hanzi.includes('号码')) {
      return;
    }

    // Check 一 before next char
    for (let i = 0; i < hanzi.length - 1; i++) {
      if (hanzi[i] === '一') {
        const nextChar = hanzi[i + 1];
        if (KNOWN_TONE4_CHARACTERS.has(nextChar)) {
          // Must be yí (tone 2)
          if (!displayPinyin.includes('yí')) {
            errors.push({
              stage: 4,
              severity: 'error',
              unitId,
              lessonId,
              vocabId,
              rule: 'SANDHI_YI_BEFORE_TONE4',
              message: `'一' before 4th tone character '${nextChar}' in '${hanzi}' must change to 'yí' (got '${displayPinyin}')`,
            });
          }
        } else if (KNOWN_TONE123_CHARACTERS.has(nextChar)) {
          // Must be yì (tone 4)
          if (!displayPinyin.includes('yì')) {
            errors.push({
              stage: 4,
              severity: 'error',
              unitId,
              lessonId,
              vocabId,
              rule: 'SANDHI_YI_BEFORE_TONE123',
              message: `'一' before 1st/2nd/3rd tone character '${nextChar}' in '${hanzi}' must change to 'yì' (got '${displayPinyin}')`,
            });
          }
        }
      }
    }
  }

  private lint33Sandhi(
    hanzi: string,
    _pinyin: string,
    displayPinyin: string,
    vocab: Record<string, unknown>,
    unitId: string,
    lessonId: string,
    vocabId: string,
    _errors: ValidationError[],
    warnings: ValidationError[]
  ): void {
    const known33 = KNOWN_33_SANDHI_WORDS[hanzi];
    if (known33) {
      if (vocab.sandhi_rule !== '3+3') {
        warnings.push({
          stage: 4,
          severity: 'warning',
          unitId,
          lessonId,
          vocabId,
          rule: 'SANDHI_33_ANNOTATION',
          message: `Word '${hanzi}' is a 3+3 sandhi word but missing sandhi_rule: '3+3'`,
        });
      }
      if (displayPinyin !== known33.displayPinyin && !displayPinyin.includes(known33.displayPinyin)) {
        warnings.push({
          stage: 4,
          severity: 'warning',
          unitId,
          lessonId,
          vocabId,
          rule: 'SANDHI_33_DISPLAY_PINYIN',
          message: `Display pinyin for '${hanzi}' expected '${known33.displayPinyin}' but got '${displayPinyin}'`,
        });
      }
    }
  }

  // --- Stage 5: Interleaving Calculator ---

  private calculateInterleaving(
    unit: Record<string, unknown>,
    priorLexicon: Set<string>
  ): UnitInterleavingStat {
    const unitId = typeof unit.unit_id === 'string' ? unit.unit_id : 'unknown';
    const allUnitHanziTokens: string[] = [];

    const extractChineseTokens = (text: string) => {
      const chunks = text.match(/[\u4e00-\u9fa5]+/g) || [];
      for (const chunk of chunks) {
        const tokens = forwardMaxMatch(chunk, priorLexicon);
        allUnitHanziTokens.push(...tokens);
      }
    };

    if (Array.isArray(unit.lessons)) {
      for (const lesson of unit.lessons as Record<string, unknown>[]) {
        if (!lesson || typeof lesson !== 'object') continue;

        // 1. Dialogue text
        if (Array.isArray(lesson.dialogue)) {
          for (const d of lesson.dialogue as Record<string, unknown>[]) {
            if (d && typeof d === 'object' && typeof d.zh === 'string') {
              extractChineseTokens(d.zh);
            }
          }
        }

        // 2. Grammar Bite patterns
        if (lesson.grammar_bite && typeof lesson.grammar_bite === 'object') {
          const gb = lesson.grammar_bite as Record<string, unknown>;
          if (Array.isArray(gb.patterns)) {
            for (const p of gb.patterns as Record<string, unknown>[]) {
              if (p && typeof p === 'object' && typeof p.zh === 'string') {
                extractChineseTokens(p.zh);
              }
            }
          }
        }

        // 3. Quizzes text (options and tokens)
        if (Array.isArray(lesson.quizzes)) {
          for (const q of lesson.quizzes as Record<string, unknown>[]) {
            if (q && typeof q === 'object') {
              if (Array.isArray(q.options)) {
                for (const opt of q.options) {
                  if (typeof opt === 'string') extractChineseTokens(opt);
                }
              }
              if (Array.isArray(q.tokens)) {
                for (const tok of q.tokens) {
                  if (typeof tok === 'string') extractChineseTokens(tok);
                }
              }
            }
          }
        }
        // 4. Boss Challenge text (dialogue_context and options)
        if (lesson.boss_challenge && typeof lesson.boss_challenge === 'object') {
          const bc = lesson.boss_challenge as Record<string, unknown>;
          if (Array.isArray(bc.dialogue_context)) {
            for (const d of bc.dialogue_context as Record<string, unknown>[]) {
              if (d && typeof d === 'object' && typeof d.zh === 'string') {
                extractChineseTokens(d.zh);
              }
            }
          }
          if (Array.isArray(bc.options)) {
            for (const opt of bc.options) {
              if (typeof opt === 'string') extractChineseTokens(opt);
            }
          }
        }
      }
    }

    const unitTokensSet = new Set(allUnitHanziTokens);
    const matchedPriorWords = new Set<string>();

    for (const token of unitTokensSet) {
      if (priorLexicon.has(token) && token.length >= 1) {
        matchedPriorWords.add(token);
      }
    }

    const totalTokens = unitTokensSet.size;
    const rate = totalTokens > 0 ? (matchedPriorWords.size / totalTokens) * 100 : 0;

    return {
      unitId,
      rate: Math.min(rate, 100),
      priorWordsMatched: Array.from(matchedPriorWords),
      totalTokens,
    };
  }
}

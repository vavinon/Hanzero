/**
 * src/engines/studio/studioLinterEngine.ts
 * ---------------------------------------------------------------------------
 * Pure TypeScript In-Browser Pedagogical Linter & Pinyin Auto-Converter Engine.
 * Adheres strictly to AGENTS.md §4.2: Zero DOM, Strict Typing, Zero 'any', 100% Testable.
 *
 * Capabilities:
 * 1. Convert numeric pinyin to international diacritics (e.g., 'ni3 hao3' -> 'nǐ hǎo', 'lv4' -> 'lǜ')
 * 2. Real-time Tone Sandhi detection and advice ('不' bú/bù, '一' yí/yì/yī, 3+3 -> 2+3)
 * 3. Traditional Chinese Character blacklist enforcement (100% Simplified Chinese)
 * 4. Pedagogical & Grammar Rule enforcement (e.g., '不有' -> '没有')
 * 5. Comprehensive Vocab Item Linting
 */

import {
  toneNumberToMark,
  KNOWN_33_SANDHI_MAP,
} from '../pinyin/pinyinUtils';

// --- Traditional Chinese Blacklist (75 Common Traditional Variant Characters) ---
export const TRADITIONAL_BLACKLIST = new Set<string>([
  '國', '謝', '歡', '見', '們', '門', '個', '樣', '東', '點', '這', '買', '賣', '錢', '車',
  '飯', '時', '後', '電', '話', '學', '習', '開', '關', '飛', '機', '藥', '醫', '體', '熱',
  '氣', '雙', '邊', '麵', '飲', '館', '號', '線', '誰', '兒', '麼', '為', '會', '說', '寫',
  '讀', '聽', '語', '漢', '兩', '幾', '師', '課', '問', '間', '現', '視', '動', '經', '過',
  '讓', '給', '還', '長', '貴', '發', '燒', '壞', '預', '訂', '護', '碼', '員', '條', '塊', '歲',
]);

// Map of traditional character to simplified equivalent
export const TRADITIONAL_TO_SIMPLIFIED: Record<string, string> = {
  '國': '国', '謝': '谢', '歡': '欢', '見': '见', '們': '们', '門': '门', '個': '个', '樣': '样',
  '東': '东', '點': '点', '這': '这', '買': '买', '賣': '卖', '錢': '钱', '車': '车', '飯': '饭',
  '時': '时', '後': '后', '電': '电', '話': '话', '學': '学', '習': '习', '開': '开', '關': '关',
  '飛': '飞', '機': '机', '藥': '药', '醫': '医', '體': '体', '熱': '热', '氣': '气', '雙': '双',
  '邊': '边', '麵': '面', '飲': '饮', '館': '馆', '號': '号', '線': '线', '誰': '谁', '兒': '儿',
  '麼': '么', '為': '为', '會': '会', '說': '说', '寫': '写', '讀': '读', '聽': '听', '語': '语',
  '漢': '汉', '兩': '两', '幾': '几', '師': '师', '課': '课', '問': '问', '間': '间', '現': '现',
  '視': '视', '動': '动', '經': '经', '過': '过', '讓': '让', '給': '给', '還': '还', '長': '长',
  '貴': '贵', '發': '发', '燒': '烧', '壞': '坏', '預': '预', '訂': '订', '護': '护', '碼': '码',
  '員': '员', '條': '条', '塊': '块', '歲': '岁',
};

// --- Grammar & Lexical Guard Rules ---
export interface GrammarRule {
  id: string;
  pattern: RegExp;
  message: string;
  suggestion: string;
}

export const FORBIDDEN_GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'bu-you',
    pattern: /不有/,
    message: "ห้ามใช้ '不有' ในภาษาจีนกลาง (ต้องปฏิเสธ '有' ด้วย '没' เสมอ)",
    suggestion: '没有',
  },
  {
    id: 'mei-shi',
    pattern: /没是/,
    message: "ห้ามใช้ '没是' (ต้องปฏิเสธ '是' ด้วย '不' เป็น '不是')",
    suggestion: '不是',
  },
  {
    id: 'hen-bu',
    pattern: /很[不没]/,
    message: "หลีกเลี่ยงการใช้ '很不' หรือ '还没' ติดกันในโครงสร้างพื้นฐาน",
    suggestion: '不太 / 还没有',
  },
];

// --- Interfaces for Linter Reports ---

export type LintSeverity = 'error' | 'warning' | 'info';

export interface LintMessage {
  field: 'hanzi' | 'pinyin' | 'meaning_th' | 'meaning_en' | 'grammar' | 'general';
  severity: LintSeverity;
  rule: string;
  message: string;
  suggestion?: string;
}

export interface ToneSandhiHint {
  hanzi: string;
  ruleType: 'bu' | 'yi' | '3+3' | 'other';
  basePinyin: string;
  suggestedPinyin: string;
  explanation: string;
}

export interface TraditionalCharIssue {
  char: string;
  index: number;
  simplified: string;
}

export interface VocabLintReport {
  isValid: boolean;
  hasWarnings: boolean;
  convertedPinyin?: string;
  issues: LintMessage[];
  sandhiHints: ToneSandhiHint[];
  traditionalChars: TraditionalCharIssue[];
}

/**
 * Converts a string with numeric pinyin to standard diacritics.
 * e.g. "ni3 hao3" -> "nǐ hǎo"
 *      "lv4 cha2" -> "lǜ chá"
 *      "nv3 er2"  -> "nǚ ér"
 */
export function convertNumericPinyinToDiacritics(input: string): string {
  if (!input) return '';
  return toneNumberToMark(input);
}

/**
 * Checks for traditional Chinese characters in a given string.
 */
export function lintTraditionalChars(text: string): TraditionalCharIssue[] {
  if (!text) return [];
  const issues: TraditionalCharIssue[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (TRADITIONAL_BLACKLIST.has(ch)) {
      issues.push({
        char: ch,
        index: i,
        simplified: TRADITIONAL_TO_SIMPLIFIED[ch] || '?',
      });
    }
  }
  return issues;
}

/**
 * Checks for forbidden or anti-pattern Chinese grammar constructs.
 */
export function lintGrammarRules(text: string): LintMessage[] {
  if (!text) return [];
  const messages: LintMessage[] = [];
  for (const rule of FORBIDDEN_GRAMMAR_RULES) {
    if (rule.pattern.test(text)) {
      messages.push({
        field: 'grammar',
        severity: 'error',
        rule: rule.id,
        message: rule.message,
        suggestion: rule.suggestion,
      });
    }
  }
  return messages;
}

/**
 * Checks a Hanzi and Pinyin pair for standard Mandarin Tone Sandhi occurrences.
 * Detects:
 * 1. Known 3+3 sandhi phrases (e.g. 你好, 可以, 手表)
 * 2. '不' before 4th tone -> 'bú'
 * 3. '一' before 4th tone -> 'yí', before 1st/2nd/3rd tone -> 'yì'
 */
export function lintToneSandhi(hanzi: string, pinyin: string): ToneSandhiHint[] {
  if (!hanzi || !pinyin) return [];
  const hints: ToneSandhiHint[] = [];
  const normalizedPinyin = pinyin.trim().toLowerCase();

  // 1. Check known 3+3 Sandhi dictionary
  if (KNOWN_33_SANDHI_MAP[hanzi]) {
    const entry = KNOWN_33_SANDHI_MAP[hanzi];
    hints.push({
      hanzi,
      ruleType: '3+3',
      basePinyin: entry.basePinyin,
      suggestedPinyin: entry.displayPinyin,
      explanation: `กฎเสียง 3 ชน 3: ${entry.explanation}`,
    });
  }

  // 2. Check '不' Sandhi
  if (hanzi.includes('不')) {
    // Check if followed by 4th tone char
    // E.g., 不是 (bù shì -> bú shì), 不要 (bù yào -> bú yào), 不错 (bù cuò -> bú cuò)
    const buMatches = Array.from(hanzi.matchAll(/不(.)/g));
    for (const match of buMatches) {
      const nextChar = match[1];
      const subPhrase = `不${nextChar}`;
      // Check if pinyin for '不' is correctly toned
      if (normalizedPinyin.includes('bú') || normalizedPinyin.includes('bu2')) {
        hints.push({
          hanzi: subPhrase,
          ruleType: 'bu',
          basePinyin: 'bù ...',
          suggestedPinyin: 'bú ...',
          explanation: `กฎของ '不': ผันเป็นเสียง 2 (bú) เมื่อตามด้วยเสียง 4 (${nextChar})`,
        });
      } else if (normalizedPinyin.includes('bù') || normalizedPinyin.includes('bu4')) {
        hints.push({
          hanzi: subPhrase,
          ruleType: 'bu',
          basePinyin: 'bù ...',
          suggestedPinyin: 'bú ... (หากคำถัดไปเป็นเสียง 4)',
          explanation: `ข้อสังเกต: ตรวจสอบว่า ${nextChar} เป็นเสียง 4 หรือไม่ หากใช่ '不' ต้องผันเป็น 'bú'`,
        });
      }
    }
  }

  // 3. Check '一' Sandhi
  if (hanzi.includes('一')) {
    const yiMatches = Array.from(hanzi.matchAll(/一(.)/g));
    for (const match of yiMatches) {
      const nextChar = match[1];
      const subPhrase = `一${nextChar}`;
      if (normalizedPinyin.includes('yí') || normalizedPinyin.includes('yi2')) {
        hints.push({
          hanzi: subPhrase,
          ruleType: 'yi',
          basePinyin: 'yī ...',
          suggestedPinyin: 'yí ...',
          explanation: `กฎของ '一': ผันเป็นเสียง 2 (yí) เมื่อตามด้วยเสียง 4 (${nextChar})`,
        });
      } else if (normalizedPinyin.includes('yì') || normalizedPinyin.includes('yi4')) {
        hints.push({
          hanzi: subPhrase,
          ruleType: 'yi',
          basePinyin: 'yī ...',
          suggestedPinyin: 'yì ...',
          explanation: `กฎของ '一': ผันเป็นเสียง 4 (yì) เมื่อตามด้วยเสียง 1, 2 หรือ 3 (${nextChar})`,
        });
      }
    }
  }

  return hints;
}

/**
 * Validates Pinyin orthography, such as valid vowels, tone placement, and syllable apostrophe.
 */
export function lintPinyinOrthography(pinyin: string): LintMessage[] {
  if (!pinyin) return [];
  const messages: LintMessage[] = [];

  // Check numeric pinyin leftover (e.g. ni3)
  if (/[a-zA-Z][1-5]/.test(pinyin)) {
    messages.push({
      field: 'pinyin',
      severity: 'warning',
      rule: 'numeric-pinyin-detected',
      message: 'พบตัวเลขวรรณยุกต์ในพินอิน แนะนำให้แปลงเป็นเครื่องหมายวรรณยุกต์มาตรฐาน',
      suggestion: convertNumericPinyinToDiacritics(pinyin),
    });
  }

  // Check illegal characters (allow 0-9 for numeric pinyin so it is caught cleanly by the warning rule above)
  if (/[^a-zA-Z0-9āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜüÜvV\s'’\-·]/i.test(pinyin)) {
    messages.push({
      field: 'pinyin',
      severity: 'error',
      rule: 'invalid-pinyin-character',
      message: 'พบตัวอักษรที่ไม่ใช่พินอินมาตรฐาน (อนุญาตเฉพาะตัวอักษรละติน เครื่องหมายวรรณยุกต์ ขีด และเครื่องหมายแบ่งพยางค์)',
    });
  }

  return messages;
}

/**
 * Comprehensive Linting for a single Vocabulary entry.
 */
export function lintVocabItem(vocab: {
  hanzi: string;
  pinyin: string;
  meaning_th?: string;
  meaning_en?: string;
}): VocabLintReport {
  const issues: LintMessage[] = [];

  // 1. Mandatory Fields Check
  if (!vocab.hanzi || vocab.hanzi.trim().length === 0) {
    issues.push({
      field: 'hanzi',
      severity: 'error',
      rule: 'required-hanzi',
      message: 'ต้องระบุตัวอักษรจีน (Hanzi)',
    });
  }

  if (!vocab.pinyin || vocab.pinyin.trim().length === 0) {
    issues.push({
      field: 'pinyin',
      severity: 'error',
      rule: 'required-pinyin',
      message: 'ต้องระบุพินอิน (Pinyin)',
    });
  }

  if (!vocab.meaning_th || vocab.meaning_th.trim().length === 0) {
    issues.push({
      field: 'meaning_th',
      severity: 'error',
      rule: 'required-meaning-th',
      message: 'ต้องระบุคำแปลภาษาไทย (Thai Meaning)',
    });
  }

  // 2. Traditional Chinese Check
  const traditionalChars = lintTraditionalChars(vocab.hanzi || '');
  if (traditionalChars.length > 0) {
    for (const item of traditionalChars) {
      issues.push({
        field: 'hanzi',
        severity: 'error',
        rule: 'traditional-chinese-detected',
        message: `พบตัวอักษรจีนตัวเต็ม '${item.char}' แนะนำให้เปลี่ยนเป็นตัวย่อ '${item.simplified}'`,
        suggestion: item.simplified,
      });
    }
  }

  // 3. Grammar Rules Check
  const grammarIssues = lintGrammarRules(vocab.hanzi || '');
  issues.push(...grammarIssues);

  // 4. Pinyin Orthography Check
  const pinyinIssues = lintPinyinOrthography(vocab.pinyin || '');
  issues.push(...pinyinIssues);

  // 5. Tone Sandhi Check
  const sandhiHints = lintToneSandhi(vocab.hanzi || '', vocab.pinyin || '');

  // 6. Suggest Converted Pinyin if numeric
  let convertedPinyin: string | undefined;
  if (/[a-zA-Z][1-5]/.test(vocab.pinyin || '')) {
    convertedPinyin = convertNumericPinyinToDiacritics(vocab.pinyin);
  }

  const hasErrors = issues.some((i) => i.severity === 'error');
  const hasWarnings = issues.some((i) => i.severity === 'warning') || sandhiHints.length > 0;

  return {
    isValid: !hasErrors,
    hasWarnings,
    convertedPinyin,
    issues,
    sandhiHints,
    traditionalChars,
  };
}

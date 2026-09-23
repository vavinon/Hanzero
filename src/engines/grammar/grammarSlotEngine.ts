/**
 * src/engines/grammar/grammarSlotEngine.ts
 * ------------------------------------------------
 * Pure TypeScript Complex Grammar Slot Engine.
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Zero DOM / Zero UI (100% pure TypeScript logic, fully testable in Vitest)
 * - Strict Typing: Zero 'any'
 * - Syntax & Pragmatics: 把 (Disposal), 被 (Passive), and Complements (Potential/Resultative/Directional)
 * - Alternative Valid Orders matching (e.g. time adverbials before or after subject)
 * - Pedagogical Diagnostic Rules: Detects classic syntax errors and provides friendly Tutu hints
 * - Deterministic accuracy scoring
 */

export type GrammarCategory =
  | 'ba_sentence'
  | 'bei_sentence'
  | 'potential_complement'
  | 'resultative_complement'
  | 'directional_complement';

export type SlotRole =
  | 'subject'
  | 'operator'
  | 'object'
  | 'verb'
  | 'complement'
  | 'time_adverbial'
  | 'modal';

export interface GrammarToken {
  id: string;
  zh: string;
  pinyin: string;
  th: string;
  role: SlotRole;
}

export interface GrammarSlotProblem {
  id: string;
  category: GrammarCategory;
  titleTh: string;
  explanationTh: string;
  canonicalSentence: {
    zh: string;
    pinyin: string;
    th: string;
  };
  tokens: GrammarToken[];
  validSequences: string[][]; // Array of acceptable token ID arrays
  formula: string; // e.g. "[S] + 把 + [O] + [V] + [Result]"
  hintTh?: string;
}

export interface SlotValidationResult {
  isComplete: boolean;
  isCorrect: boolean;
  matchedSequenceIndex?: number;
  diagnosticHint?: string;
  accuracyScore: number; // 0 - 100
  placedCount: number;
  totalRequired: number;
}

export interface RoleColorMeta {
  bg: string;
  text: string;
  border: string;
  badge: string;
  nameTh: string;
}

/**
 * Returns color styling metadata for each grammar role (Semantic Lego Blocks).
 */
export function getRoleColorClass(role: SlotRole): RoleColorMeta {
  switch (role) {
    case 'subject':
      return {
        bg: 'bg-blue-50 hover:bg-blue-100',
        text: 'text-blue-900',
        border: 'border-blue-300',
        badge: 'bg-blue-100 text-blue-800',
        nameTh: 'ประธาน',
      };
    case 'operator':
      return {
        bg: 'bg-amber-50 hover:bg-amber-100',
        text: 'text-amber-900',
        border: 'border-amber-400',
        badge: 'bg-amber-100 text-amber-800',
        nameTh: 'คำช่วยโครงสร้าง (把/被)',
      };
    case 'object':
      return {
        bg: 'bg-purple-50 hover:bg-purple-100',
        text: 'text-purple-900',
        border: 'border-purple-300',
        badge: 'bg-purple-100 text-purple-800',
        nameTh: 'กรรม (สิ่งที่ถูกจัดการ)',
      };
    case 'verb':
      return {
        bg: 'bg-emerald-50 hover:bg-emerald-100',
        text: 'text-emerald-900',
        border: 'border-emerald-300',
        badge: 'bg-emerald-100 text-emerald-800',
        nameTh: 'กริยาหลัก',
      };
    case 'complement':
      return {
        bg: 'bg-rose-50 hover:bg-rose-100',
        text: 'text-rose-900',
        border: 'border-rose-300',
        badge: 'bg-rose-100 text-rose-800',
        nameTh: 'ส่วนเสริม (ผลลัพธ์/ทิศทาง)',
      };
    case 'time_adverbial':
      return {
        bg: 'bg-yellow-50 hover:bg-yellow-100',
        text: 'text-yellow-900',
        border: 'border-yellow-400',
        badge: 'bg-yellow-100 text-yellow-800',
        nameTh: 'คำบอกเวลา/เงื่อนไข',
      };
    case 'modal':
      return {
        bg: 'bg-sky-50 hover:bg-sky-100',
        text: 'text-sky-900',
        border: 'border-sky-300',
        badge: 'bg-sky-100 text-sky-800',
        nameTh: 'กริยาช่วย (ขอร้อง/อยาก)',
      };
  }
}

/**
 * Calculates a deterministic partial accuracy score (0-100) based on correct token positions.
 */
export function calculateSlotAccuracy(
  placedTokenIds: string[],
  targetSequence: string[]
): number {
  if (targetSequence.length === 0 || placedTokenIds.length === 0) {
    return 0;
  }

  let correctCount = 0;
  for (let i = 0; i < placedTokenIds.length && i < targetSequence.length; i++) {
    if (placedTokenIds[i] === targetSequence[i]) {
      correctCount++;
    }
  }

  return Math.round((correctCount / targetSequence.length) * 100);
}

/**
 * Deep diagnostic analyzer: inspects placed tokens against Chinese linguistic rules
 * and returns Tutu's pedagogical guidance hint in friendly Thai.
 */
export function diagnoseGrammarError(
  problem: GrammarSlotProblem,
  placedTokens: GrammarToken[]
): string | undefined {
  if (placedTokens.length === 0) {
    return undefined;
  }

  const tokenRoles = placedTokens.map((t) => t.role);
  const operatorIndex = tokenRoles.indexOf('operator');
  const verbIndex = tokenRoles.indexOf('verb');
  const objectIndex = tokenRoles.indexOf('object');
  const complementIndex = tokenRoles.indexOf('complement');

  // Rule 1: Ba-Sentence Diagnostics
  if (problem.category === 'ba_sentence') {
    // 1.1 Verb placed before 把
    if (operatorIndex !== -1 && verbIndex !== -1 && verbIndex < operatorIndex) {
      return "🐰 เอ๊ะ! ในประโยค 把 ต้อง 'คว้าสิ่งของ' ขึ้นมาก่อนนะ! วาง '把' แล้วตามด้วย '[สิ่งของ]' ให้เรียบร้อย ก่อนจะลงมือกริยาจ้า!";
    }

    // 1.2 Object placed before 把
    if (operatorIndex !== -1 && objectIndex !== -1 && objectIndex < operatorIndex) {
      return "🐰 ในประโยค 把 ต้องวางคำช่วย '把' นำหน้า '[กรรม/สิ่งของ]' เสมอน้า เพื่อบอกว่าจะจัดการกับสิ่งของชิ้นนี้จ้า!";
    }

    // 1.3 Bare verb without complement at the end
    if (
      verbIndex !== -1 &&
      complementIndex === -1 &&
      problem.tokens.some((t) => t.role === 'complement')
    ) {
      return "🐰 กริยาในประโยค 把 อยู่คนเดียวเหงาแย่เลย! ต้องมี 'ส่วนเสริมผลลัพธ์/ทิศทาง' ตบท้ายด้วยนะ เช่น '拿出来' หรือ '修好' จ้า!";
    }
  }

  // Rule 2: Bei-Sentence Diagnostics (Passive)
  if (problem.category === 'bei_sentence') {
    // 2.1 Operator (被) missing or placed before patient/object
    if (operatorIndex === 0) {
      return "🐰 ในประโยค ถูกกระทำ (被) ต้องเอา 'สิ่งของ/คนที่น่าสงสารโดนกระทำ' ขึ้นมาเป็นประธานหน้าสุดก่อน แล้วค่อยตามด้วย '被' จ้า!";
    }

    // 2.2 Verb placed before 被
    if (operatorIndex !== -1 && verbIndex !== -1 && verbIndex < operatorIndex) {
      return "🐰 ในประโยค 被 กริยาต้องอยู่ข้างหลัง '被 + ผู้กระทำ' เสมอนะจ๊ะ!";
    }
  }

  // Rule 3: Potential Complements (吃得下 vs 吃不下)
  if (problem.category === 'potential_complement') {
    // Complement before verb
    if (verbIndex !== -1 && complementIndex !== -1 && complementIndex < verbIndex) {
      return "🐰 จะบอกว่าทำไหวหรือไม่ไหว สไตล์จีนต้องเอากริยาขึ้นก่อน แล้วตามด้วย '得/不 + ผลลัพธ์' นะ เช่น '吃得下' หรือ '吃不下' จ้า!";
    }
  }

  // General fallback hint
  if (problem.hintTh) {
    return `🐰 ทู่ทู่ชวนสังเกต: ${problem.hintTh}`;
  }

  return "🐰 ลองดูตำแหน่งของประธาน กริยา และส่วนเสริมอีกครั้งน้า สู้ๆ จ้า!";
}

/**
 * Evaluates the user's arranged token IDs against the problem's valid sequences.
 */
export function evaluateSlotArrangement(
  problem: GrammarSlotProblem,
  placedTokenIds: string[]
): SlotValidationResult {
  const totalRequired = problem.validSequences[0]?.length ?? problem.tokens.length;
  const isComplete = placedTokenIds.length === totalRequired;

  // 1. Check if placed sequence exactly matches any valid sequence
  let matchedSequenceIndex: number | undefined = undefined;

  for (let idx = 0; idx < problem.validSequences.length; idx++) {
    const validSeq = problem.validSequences[idx];
    if (
      placedTokenIds.length === validSeq.length &&
      placedTokenIds.every((id, i) => id === validSeq[i])
    ) {
      matchedSequenceIndex = idx;
      break;
    }
  }

  const isCorrect = matchedSequenceIndex !== undefined;

  // 2. Calculate best partial accuracy across all acceptable sequences
  let bestAccuracy = 0;
  for (const validSeq of problem.validSequences) {
    const acc = calculateSlotAccuracy(placedTokenIds, validSeq);
    if (acc > bestAccuracy) {
      bestAccuracy = acc;
    }
  }

  // 3. Diagnose error if incomplete or incorrect
  let diagnosticHint: string | undefined = undefined;
  if (!isCorrect && placedTokenIds.length > 0) {
    const tokenMap = new Map(problem.tokens.map((t) => [t.id, t]));
    const placedTokens = placedTokenIds
      .map((id) => tokenMap.get(id))
      .filter((t): t is GrammarToken => t !== undefined);

    diagnosticHint = diagnoseGrammarError(problem, placedTokens);
  }

  return {
    isComplete,
    isCorrect,
    matchedSequenceIndex,
    diagnosticHint: isCorrect ? undefined : diagnosticHint,
    accuracyScore: isCorrect ? 100 : bestAccuracy,
    placedCount: placedTokenIds.length,
    totalRequired,
  };
}

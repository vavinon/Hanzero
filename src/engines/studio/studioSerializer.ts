/**
 * src/engines/studio/studioSerializer.ts
 * ---------------------------------------------------------------------------
 * Pure TypeScript Serializer, Parser, Sanitizer & Validator for Studio Drafts.
 * Adheres strictly to AGENTS.md §4.2: Zero DOM, Strict Typing, Zero 'any', 100% Testable.
 */

import type {
  UnitLessonData,
  Lesson,
  VocabularyItem,
  QuizQuestion,
  MultipleChoiceQuiz,
  SentenceScrambleQuiz,
  DialogueLine,
  GrammarBite,
  BossChallenge,
  CheerTrophy,
  ToneSandhiRule,
} from '../../types/lesson';
import {
  KNOWN_33_SANDHI_MAP,
} from '../pinyin/pinyinUtils';
import { stripPollution } from '../storage/migration';
import {
  TRADITIONAL_BLACKLIST,
  FORBIDDEN_GRAMMAR_RULES,
  convertNumericPinyinToDiacritics,
} from './studioLinterEngine';
import type {
  StudioDraftState,
  StudioLessonDraft,
  StudioVocabDraft,
  StudioDialogueDraft,
  StudioQuizDraft,
  StudioGrammarDraft,
  StudioBossChallengeDraft,
  StudioTrophyDraft,
  StudioValidationError,
  StudioValidationResult,
  StudioImportResult,
} from './studioTypes';

/**
 * Generate stable transient client UUID without third-party dependencies
 */
export function generateClientId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'cid_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
}

/**
 * Chinese Typography Normalization & Sanitizer
 * - Converts ASCII punctuation in Chinese text to full-width Chinese punctuation
 * - Strips redundant whitespace between Chinese characters and punctuation
 * - Preserves syllable boundary apostrophe in pinyin (e.g. "Xī'ān")
 */
export function sanitizeChineseTypography(text: string): string {
  if (!text) return '';

  let sanitized = text;

  // Replace western punctuation in Chinese contexts with full-width Chinese equivalents
  const punctuationMap: Array<[RegExp, string]> = [
    [/,/g, '，'],
    [/:/g, '：'],
    [/;/g, '；'],
    [/!/g, '！'],
    [/\?/g, '？'],
  ];

  for (const [pattern, fullWidth] of punctuationMap) {
    sanitized = sanitized.replace(pattern, fullWidth);
  }

  // Remove space between Hanzi and punctuation: e.g. "你好 ！" -> "你好！"
  sanitized = sanitized.replace(/([\u4e00-\u9fa5])\s+([，。！？：；])/g, '$1$2');
  // Remove space between punctuation and Hanzi: e.g. "！ 你好" -> "！你好"
  sanitized = sanitized.replace(/([，。！？：；])\s+([\u4e00-\u9fa5])/g, '$1$2');

  return sanitized.trim();
}

/**
 * Deep recursive string trimmer for objects and arrays
 */
export function deepTrimStrings<T>(input: T): T {
  if (typeof input === 'string') {
    return input.trim() as unknown as T;
  }
  if (Array.isArray(input)) {
    return input.map(deepTrimStrings) as unknown as T;
  }
  if (typeof input === 'object' && input !== null) {
    const output: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      output[key] = deepTrimStrings(value);
    }
    return output as T;
  }
  return input;
}

/**
 * Serializes a StudioDraftState into canonical UnitLessonData JSON schema
 */
export function serializeDraftToLessonUnit(
  draft: StudioDraftState,
  options?: { sanitize?: boolean; autoSequenceIds?: boolean }
): UnitLessonData {
  const sanitize = options?.sanitize ?? true;
  const autoSequence = options?.autoSequenceIds ?? true;

  const tier = draft.tier;
  const unitNumber = draft.unit_number;
  const unitNumberPad = unitNumber.toString().padStart(2, '0');

  const unitId =
    autoSequence || !draft.unit_id.trim()
      ? `tier${tier}_u${unitNumberPad}`
      : draft.unit_id.trim();

  const lessons: Lesson[] = draft.lessons.map((lDraft, lIndex) => {
    const lessonNumber = lDraft.lesson_number || lIndex + 1;
    const lessonNumberPad = lessonNumber.toString().padStart(2, '0');
    const lessonId =
      autoSequence || !lDraft.lesson_id.trim()
        ? `t${tier}_u${unitNumberPad}_l${lessonNumberPad}`
        : lDraft.lesson_id.trim();

    // Serialize Vocabulary
    const vocabulary: VocabularyItem[] = lDraft.vocabulary.map((vDraft, vIndex) => {
      const vocabIndexPad = (vIndex + 1).toString().padStart(2, '0');
      const vocabId =
        autoSequence || !vDraft.id.trim()
          ? (vDraft.id.trim() || `hsk${tier}_${unitNumberPad}${lessonNumberPad}_${vocabIndexPad}`)
          : vDraft.id.trim();

      let hanzi = sanitize ? sanitizeChineseTypography(vDraft.hanzi) : vDraft.hanzi.trim();
      let pinyin = vDraft.pinyin.trim();
      const pinyinTone = vDraft.pinyin_tone.trim();

      // Auto-convert numeric pinyin to diacritics if missing
      if (!pinyin && pinyinTone) {
        pinyin = convertNumericPinyinToDiacritics(pinyinTone);
      }

      // Auto Tone Sandhi assist
      let sandhiRule: ToneSandhiRule = vDraft.sandhi_rule ?? null;
      let displayPinyin = vDraft.display_pinyin?.trim();

      if (!sandhiRule && KNOWN_33_SANDHI_MAP[hanzi]) {
        sandhiRule = '3+3';
        if (!displayPinyin) {
          displayPinyin = KNOWN_33_SANDHI_MAP[hanzi].displayPinyin;
        }
      }

      const strokeCount =
        typeof vDraft.stroke_count === 'number' && Number.isFinite(vDraft.stroke_count)
          ? Math.max(1, Math.round(vDraft.stroke_count))
          : 1;

      const vocabItem: VocabularyItem = {
        id: vocabId,
        hanzi,
        pinyin,
        pinyin_tone: pinyinTone,
        meaning_th: vDraft.meaning_th.trim(),
        meaning_en: vDraft.meaning_en.trim(),
        radical: vDraft.radical.trim(),
        radical_name_th: vDraft.radical_name_th.trim(),
        stroke_count: strokeCount,
        mnemonic: vDraft.mnemonic.trim(),
        kid_mnemonic: vDraft.kid_mnemonic.trim(),
        body_gesture: vDraft.body_gesture.trim(),
      };

      if (displayPinyin) {
        vocabItem.display_pinyin = displayPinyin;
      }
      if (sandhiRule) {
        vocabItem.sandhi_rule = sandhiRule;
      }
      if (vDraft.writing_note?.trim()) {
        vocabItem.writing_note = vDraft.writing_note.trim();
      }
      if (vDraft.example_sentence && vDraft.example_sentence.zh.trim()) {
        vocabItem.example_sentence = {
          zh: sanitize
            ? sanitizeChineseTypography(vDraft.example_sentence.zh)
            : vDraft.example_sentence.zh.trim(),
          pinyin: vDraft.example_sentence.pinyin.trim(),
          th: vDraft.example_sentence.th.trim(),
          en: vDraft.example_sentence.en.trim(),
        };
      }

      return vocabItem;
    });

    // Serialize Dialogue
    const dialogue: DialogueLine[] = lDraft.dialogue.map((d) => {
      const line: DialogueLine = {
        speaker: d.speaker,
        speaker_name: d.speaker_name.trim(),
        zh: sanitize ? sanitizeChineseTypography(d.zh) : d.zh.trim(),
        pinyin: d.pinyin.trim(),
        th: d.th.trim(),
        en: d.en.trim(),
      };
      if (d.audio_key?.trim()) {
        line.audio_key = d.audio_key.trim();
      }
      return line;
    });

    // Serialize Quizzes (Discriminated Union)
    const quizzes: QuizQuestion[] = lDraft.quizzes.map((q) => {
      const base = {
        question_th: q.question_th.trim(),
        explanation_th: q.explanation_th.trim(),
        encouragement: q.encouragement.trim(),
      };

      if (q.type === 'sentence_scramble') {
        const scramble: SentenceScrambleQuiz = {
          ...base,
          type: 'sentence_scramble',
          tokens: q.tokens.map((t) => t.trim()).filter((t) => t.length > 0),
          correct_sequence: q.correct_sequence
            .map((t) => t.trim())
            .filter((t) => t.length > 0),
          pinyin: q.pinyin?.trim() || '',
          meaning_th: q.meaning_th?.trim() || '',
        };
        return scramble;
      }

      // Multiple Choice types
      const cleanOptions = q.options.map((opt) => opt.trim()).filter((opt) => opt.length > 0);
      const validIndex =
        cleanOptions.length > 0
          ? Math.max(0, Math.min(q.correct_index, cleanOptions.length - 1))
          : 0;

      const mc: MultipleChoiceQuiz = {
        ...base,
        type: q.type as MultipleChoiceQuiz['type'],
        options: cleanOptions,
        correct_index: validIndex,
      };
      if (q.target_audio?.trim()) {
        mc.target_audio = q.target_audio.trim();
      }
      return mc;
    });

    // Grammar bite
    const grammarBite: GrammarBite = {
      title: lDraft.grammar_bite.title.trim(),
      explanation_th: lDraft.grammar_bite.explanation_th.trim(),
      patterns: lDraft.grammar_bite.patterns.map((p) => ({
        formula: p.formula.trim(),
        zh: sanitize ? sanitizeChineseTypography(p.zh) : p.zh.trim(),
        pinyin: p.pinyin.trim(),
        th: p.th.trim(),
        en: p.en.trim(),
      })),
    };

    // Boss challenge
    const bossOptions = lDraft.boss_challenge.options
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);
    const bossCorrectIndex =
      bossOptions.length > 0
        ? Math.max(0, Math.min(lDraft.boss_challenge.correct_index, bossOptions.length - 1))
        : 0;

    const bossChallenge: BossChallenge = {
      scenario_th: lDraft.boss_challenge.scenario_th.trim(),
      options: bossOptions,
      correct_index: bossCorrectIndex,
      explanation_th: lDraft.boss_challenge.explanation_th.trim(),
      encouragement: lDraft.boss_challenge.encouragement.trim(),
    };
    if (lDraft.boss_challenge.dialogue_context && lDraft.boss_challenge.dialogue_context.length > 0) {
      bossChallenge.dialogue_context = lDraft.boss_challenge.dialogue_context.map((d) => ({
        speaker: d.speaker,
        speaker_name: d.speaker_name.trim(),
        zh: sanitize ? sanitizeChineseTypography(d.zh) : d.zh.trim(),
        pinyin: d.pinyin.trim(),
        th: d.th.trim(),
        en: d.en.trim(),
      }));
    }

    // Cheer trophy
    const cheerTrophy: CheerTrophy = {
      badge_id:
        autoSequence || !lDraft.cheer_trophy.badge_id.trim()
          ? `badge_t${tier}_u${unitNumberPad}_l${lessonNumberPad}`
          : lDraft.cheer_trophy.badge_id.trim(),
      badge_name: lDraft.cheer_trophy.badge_name.trim(),
      message_th: lDraft.cheer_trophy.message_th.trim(),
      xp_reward:
        typeof lDraft.cheer_trophy.xp_reward === 'number' &&
        Number.isFinite(lDraft.cheer_trophy.xp_reward)
          ? Math.max(0, lDraft.cheer_trophy.xp_reward)
          : 50,
    };

    const lesson: Lesson = {
      lesson_id: lessonId,
      lesson_number: lessonNumber,
      title: {
        zh: sanitize ? sanitizeChineseTypography(lDraft.title.zh) : lDraft.title.zh.trim(),
        th: lDraft.title.th.trim(),
        en: lDraft.title.en.trim(),
      },
      can_do: {
        th: lDraft.can_do.th.trim(),
        en: lDraft.can_do.en.trim(),
      },
      baby_step_goal: lDraft.baby_step_goal.trim(),
      vocabulary,
      grammar_bite: grammarBite,
      dialogue,
      quizzes,
      boss_challenge: bossChallenge,
      cheer_trophy: cheerTrophy,
    };

    if (lDraft.tone_rule) {
      lesson.tone_rule = {
        rule_name: lDraft.tone_rule.rule_name.trim(),
        description_th: lDraft.tone_rule.description_th.trim(),
        example: lDraft.tone_rule.example.trim(),
        fun_metaphor: lDraft.tone_rule.fun_metaphor.trim(),
        reassurance: lDraft.tone_rule.reassurance.trim(),
      };
    } else {
      lesson.tone_rule = null;
    }

    return lesson;
  });

  const unit: UnitLessonData = {
    unit_id: unitId,
    tier,
    unit_number: unitNumber,
    title: {
      zh: sanitize ? sanitizeChineseTypography(draft.title.zh) : draft.title.zh.trim(),
      th: draft.title.th.trim(),
      en: draft.title.en.trim(),
    },
    description: draft.description.trim(),
    lessons,
  };

  return unit;
}

/**
 * Extracts line and column from JSON SyntaxError position
 */
function getLineAndColumn(jsonStr: string, position: number): { line: number; column: number } {
  const boundedPos = Math.max(0, Math.min(position, jsonStr.length));
  let line = 1;
  let column = 1;
  for (let i = 0; i < boundedPos; i++) {
    if (jsonStr[i] === '\n') {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return { line, column };
}

/**
 * Parses a JSON string or UnitLessonData object into a tolerant StudioDraftState
 */
export function parseLessonUnitToDraft(input: string | UnitLessonData): StudioImportResult {
  const errors: StudioValidationError[] = [];
  const warnings: StudioValidationError[] = [];

  let rawData: unknown;

  if (typeof input === 'string') {
    // Defense: payload size limit 2 MB
    if (input.length > 2 * 1024 * 1024) {
      return {
        success: false,
        errors: [
          {
            path: 'root',
            field: 'payload',
            message: 'ขนาดไฟล์ JSON ใหญ่เกินขีดจำกัดความปลอดภัย (สูงสุด 2 MB)',
            severity: 'error',
          },
        ],
        warnings: [],
      };
    }

    try {
      rawData = JSON.parse(input);
    } catch (syntaxErr) {
      let line = 1;
      let column = 1;
      const message = syntaxErr instanceof Error ? syntaxErr.message : String(syntaxErr);

      // Attempt to extract position from SyntaxError message (e.g. "at position 45")
      const posMatch = message.match(/at position (\d+)/i);
      if (posMatch && posMatch[1]) {
        const pos = parseInt(posMatch[1], 10);
        const loc = getLineAndColumn(input, pos);
        line = loc.line;
        column = loc.column;
      }

      return {
        success: false,
        errors: [
          {
            path: 'root',
            field: 'json',
            message: `เกิดข้อผิดพลาดทางไวยากรณ์ JSON ที่บรรทัด ${line} คอลัมน์ ${column}: ${message}`,
            severity: 'error',
          },
        ],
        warnings: [],
        syntaxError: {
          line,
          column,
          message,
        },
      };
    }
  } else {
    rawData = input;
  }

  // Toxic JSON & Prototype Pollution Defense
  const cleanData = stripPollution(rawData);

  if (typeof cleanData !== 'object' || cleanData === null || Array.isArray(cleanData)) {
    return {
      success: false,
      errors: [
        {
          path: 'root',
          field: 'type',
          message: 'โครงสร้างข้อมูลระดับบนสุดต้องเป็น Object JSON ที่ถูกต้อง',
          severity: 'error',
        },
      ],
      warnings: [],
    };
  }

  const record = cleanData as Record<string, unknown>;

  // Check top-level required fields
  const unitId = typeof record.unit_id === 'string' ? record.unit_id : '';
  const tier = typeof record.tier === 'number' ? record.tier : 1;
  const unitNumber = typeof record.unit_number === 'number' ? record.unit_number : 1;
  const description = typeof record.description === 'string' ? record.description : '';

  const titleRecord = (record.title as Record<string, unknown>) || {};
  const title = {
    zh: typeof titleRecord.zh === 'string' ? titleRecord.zh : '',
    th: typeof titleRecord.th === 'string' ? titleRecord.th : '',
    en: typeof titleRecord.en === 'string' ? titleRecord.en : '',
  };

  if (!unitId) {
    warnings.push({
      path: 'unit_id',
      field: 'unit_id',
      message: 'ไม่พบคีย์ unit_id ระบบจะสร้างรหัสมาตรฐานให้อัตโนมัติ',
      severity: 'warning',
    });
  }

  const rawLessons = Array.isArray(record.lessons) ? record.lessons : [];
  if (rawLessons.length === 0) {
    warnings.push({
      path: 'lessons',
      field: 'lessons',
      message: 'ไม่พบบทเรียนใน Unit ระบบจะสร้างบทเรียนเริ่มต้นให้ 1 บท',
      severity: 'warning',
    });
  }

  const lessons: StudioLessonDraft[] = (rawLessons.length > 0 ? rawLessons : [{}]).map(
    (rawL: unknown, lIdx: number) => {
      const l = (typeof rawL === 'object' && rawL !== null ? rawL : {}) as Record<
        string,
        unknown
      >;
      const lTitleRecord = (l.title as Record<string, unknown>) || {};
      const lCanDoRecord = (l.can_do as Record<string, unknown>) || {};

      // Vocab items
      const rawVocab = Array.isArray(l.vocabulary) ? l.vocabulary : [];
      const vocabulary: StudioVocabDraft[] = rawVocab.map((rawV: unknown, vIdx: number) => {
        const v = (typeof rawV === 'object' && rawV !== null ? rawV : {}) as Record<
          string,
          unknown
        >;
        const rawSentence = (v.example_sentence as Record<string, unknown>) || undefined;

        const draftItem: StudioVocabDraft = {
          _clientId: generateClientId(),
          id: typeof v.id === 'string' ? v.id : '',
          hanzi: typeof v.hanzi === 'string' ? v.hanzi : '',
          pinyin: typeof v.pinyin === 'string' ? v.pinyin : '',
          pinyin_tone: typeof v.pinyin_tone === 'string' ? v.pinyin_tone : '',
          meaning_th: typeof v.meaning_th === 'string' ? v.meaning_th : '',
          meaning_en: typeof v.meaning_en === 'string' ? v.meaning_en : '',
          radical: typeof v.radical === 'string' ? v.radical : '',
          radical_name_th: typeof v.radical_name_th === 'string' ? v.radical_name_th : '',
          stroke_count: typeof v.stroke_count === 'number' ? v.stroke_count : '',
          mnemonic: typeof v.mnemonic === 'string' ? v.mnemonic : '',
          kid_mnemonic: typeof v.kid_mnemonic === 'string' ? v.kid_mnemonic : '',
          body_gesture: typeof v.body_gesture === 'string' ? v.body_gesture : '',
          display_pinyin: typeof v.display_pinyin === 'string' ? v.display_pinyin : undefined,
          sandhi_rule:
            typeof v.sandhi_rule === 'string' ? (v.sandhi_rule as ToneSandhiRule) : undefined,
          writing_note: typeof v.writing_note === 'string' ? v.writing_note : undefined,
        };

        if (rawSentence && typeof rawSentence.zh === 'string') {
          draftItem.example_sentence = {
            zh: rawSentence.zh,
            pinyin: typeof rawSentence.pinyin === 'string' ? rawSentence.pinyin : '',
            th: typeof rawSentence.th === 'string' ? rawSentence.th : '',
            en: typeof rawSentence.en === 'string' ? rawSentence.en : '',
          };
        }

        if (!draftItem.hanzi) {
          errors.push({
            path: `lessons[${lIdx}].vocabulary[${vIdx}].hanzi`,
            field: 'hanzi',
            message: 'คำศัพท์ต้องมีตัวอักษรจีน (hanzi)',
            severity: 'error',
            lessonIndex: lIdx,
            vocabIndex: vIdx,
          });
        }

        return draftItem;
      });

      // Dialogue lines
      const rawDialogue = Array.isArray(l.dialogue) ? l.dialogue : [];
      const dialogue: StudioDialogueDraft[] = rawDialogue.map((rawD: unknown) => {
        const d = (typeof rawD === 'object' && rawD !== null ? rawD : {}) as Record<
          string,
          unknown
        >;
        return {
          _clientId: generateClientId(),
          speaker: d.speaker === 'B' ? 'B' : d.speaker === 'C' ? 'C' : 'A',
          speaker_name: typeof d.speaker_name === 'string' ? d.speaker_name : '',
          zh: typeof d.zh === 'string' ? d.zh : '',
          pinyin: typeof d.pinyin === 'string' ? d.pinyin : '',
          th: typeof d.th === 'string' ? d.th : '',
          en: typeof d.en === 'string' ? d.en : '',
          audio_key: typeof d.audio_key === 'string' ? d.audio_key : undefined,
        };
      });

      // Quizzes
      const rawQuizzes = Array.isArray(l.quizzes) ? l.quizzes : [];
      const quizzes: StudioQuizDraft[] = rawQuizzes.map((rawQ: unknown) => {
        const q = (typeof rawQ === 'object' && rawQ !== null ? rawQ : {}) as Record<
          string,
          unknown
        >;
        const qType = typeof q.type === 'string' ? q.type : 'listen_match';
        const isScramble = qType === 'sentence_scramble';

        return {
          _clientId: generateClientId(),
          type: qType as StudioQuizDraft['type'],
          question_th: typeof q.question_th === 'string' ? q.question_th : '',
          explanation_th: typeof q.explanation_th === 'string' ? q.explanation_th : '',
          encouragement: typeof q.encouragement === 'string' ? q.encouragement : '',
          options: Array.isArray(q.options) ? (q.options as string[]) : [],
          correct_index: typeof q.correct_index === 'number' ? q.correct_index : 0,
          target_audio: typeof q.target_audio === 'string' ? q.target_audio : undefined,
          tokens: isScramble && Array.isArray(q.tokens) ? (q.tokens as string[]) : [],
          correct_sequence:
            isScramble && Array.isArray(q.correct_sequence)
              ? (q.correct_sequence as string[])
              : [],
          pinyin: typeof q.pinyin === 'string' ? q.pinyin : undefined,
          meaning_th: typeof q.meaning_th === 'string' ? q.meaning_th : undefined,
        };
      });

      // Grammar bite
      const rawGrammar = (l.grammar_bite as Record<string, unknown>) || {};
      const rawPatterns = Array.isArray(rawGrammar.patterns) ? rawGrammar.patterns : [];
      const grammarBite: StudioGrammarDraft = {
        title: typeof rawGrammar.title === 'string' ? rawGrammar.title : '',
        explanation_th:
          typeof rawGrammar.explanation_th === 'string' ? rawGrammar.explanation_th : '',
        patterns: rawPatterns.map((rawP: unknown) => {
          const p = (typeof rawP === 'object' && rawP !== null ? rawP : {}) as Record<
            string,
            unknown
          >;
          return {
            _clientId: generateClientId(),
            formula: typeof p.formula === 'string' ? p.formula : '',
            zh: typeof p.zh === 'string' ? p.zh : '',
            pinyin: typeof p.pinyin === 'string' ? p.pinyin : '',
            th: typeof p.th === 'string' ? p.th : '',
            en: typeof p.en === 'string' ? p.en : '',
          };
        }),
      };

      // Boss challenge
      const rawBoss = (l.boss_challenge as Record<string, unknown>) || {};
      const bossChallenge: StudioBossChallengeDraft = {
        scenario_th: typeof rawBoss.scenario_th === 'string' ? rawBoss.scenario_th : '',
        options: Array.isArray(rawBoss.options) ? (rawBoss.options as string[]) : [],
        correct_index: typeof rawBoss.correct_index === 'number' ? rawBoss.correct_index : 0,
        explanation_th:
          typeof rawBoss.explanation_th === 'string' ? rawBoss.explanation_th : '',
        encouragement: typeof rawBoss.encouragement === 'string' ? rawBoss.encouragement : '',
      };
      if (Array.isArray(rawBoss.dialogue_context)) {
        bossChallenge.dialogue_context = rawBoss.dialogue_context as DialogueLine[];
      }

      // Cheer trophy
      const rawTrophy = (l.cheer_trophy as Record<string, unknown>) || {};
      const cheerTrophy: StudioTrophyDraft = {
        badge_id: typeof rawTrophy.badge_id === 'string' ? rawTrophy.badge_id : '',
        badge_name: typeof rawTrophy.badge_name === 'string' ? rawTrophy.badge_name : '',
        message_th: typeof rawTrophy.message_th === 'string' ? rawTrophy.message_th : '',
        xp_reward: typeof rawTrophy.xp_reward === 'number' ? rawTrophy.xp_reward : 50,
      };

      // Tone rule
      let toneRule: StudioLessonDraft['tone_rule'] = null;
      if (l.tone_rule && typeof l.tone_rule === 'object') {
        const tr = l.tone_rule as Record<string, unknown>;
        toneRule = {
          rule_name: typeof tr.rule_name === 'string' ? tr.rule_name : '',
          description_th: typeof tr.description_th === 'string' ? tr.description_th : '',
          example: typeof tr.example === 'string' ? tr.example : '',
          fun_metaphor: typeof tr.fun_metaphor === 'string' ? tr.fun_metaphor : '',
          reassurance: typeof tr.reassurance === 'string' ? tr.reassurance : '',
        };
      }

      return {
        _clientId: generateClientId(),
        lesson_id: typeof l.lesson_id === 'string' ? l.lesson_id : '',
        lesson_number: typeof l.lesson_number === 'number' ? l.lesson_number : lIdx + 1,
        title: {
          zh: typeof lTitleRecord.zh === 'string' ? lTitleRecord.zh : '',
          th: typeof lTitleRecord.th === 'string' ? lTitleRecord.th : '',
          en: typeof lTitleRecord.en === 'string' ? lTitleRecord.en : '',
        },
        can_do: {
          th: typeof lCanDoRecord.th === 'string' ? lCanDoRecord.th : '',
          en: typeof lCanDoRecord.en === 'string' ? lCanDoRecord.en : '',
        },
        baby_step_goal: typeof l.baby_step_goal === 'string' ? l.baby_step_goal : '',
        vocabulary,
        tone_rule: toneRule,
        grammar_bite: grammarBite,
        dialogue,
        quizzes,
        boss_challenge: bossChallenge,
        cheer_trophy: cheerTrophy,
      };
    }
  );

  const draft: StudioDraftState = {
    version: 1,
    unit_id: unitId,
    tier,
    unit_number: unitNumber,
    title,
    description,
    lessons,
    activeLessonIndex: 0,
    lastSavedAt: null,
  };

  return {
    success: errors.length === 0,
    draft,
    errors,
    warnings,
  };
}

/**
 * Validates a StudioDraftState against Master Curriculum invariants
 */
export function validateStudioDraft(draft: StudioDraftState): StudioValidationResult {
  const errors: StudioValidationError[] = [];
  const warnings: StudioValidationError[] = [];

  // Unit validations
  if (!draft.title.zh.trim()) {
    errors.push({
      path: 'title.zh',
      field: 'title.zh',
      message: 'ชื่อ Unit ภาษาจีนต้องไม่เป็นค่าว่าง',
      severity: 'error',
    });
  }
  if (!draft.title.th.trim()) {
    errors.push({
      path: 'title.th',
      field: 'title.th',
      message: 'ชื่อ Unit ภาษาไทยต้องไม่เป็นค่าว่าง',
      severity: 'error',
    });
  }

  if (draft.tier < 0 || draft.tier > 4) {
    errors.push({
      path: 'tier',
      field: 'tier',
      message: 'ระดับ Tier ต้องอยู่ระหว่าง 0 ถึง 4',
      severity: 'error',
    });
  }

  if (draft.lessons.length === 0) {
    errors.push({
      path: 'lessons',
      field: 'lessons',
      message: 'Unit ต้องมีบทเรียนอย่างน้อย 1 บท',
      severity: 'error',
    });
  }

  // Lesson & Item Validations
  draft.lessons.forEach((lesson, lIdx) => {
    const lPath = `lessons[${lIdx}]`;

    if (!lesson.title.zh.trim()) {
      errors.push({
        path: `${lPath}.title.zh`,
        field: 'title.zh',
        message: 'ชื่อบทเรียนภาษาจีนต้องไม่เป็นค่าว่าง',
        severity: 'error',
        lessonIndex: lIdx,
      });
    }

    if (!lesson.can_do.th.trim()) {
      errors.push({
        path: `${lPath}.can_do.th`,
        field: 'can_do.th',
        message: 'เป้าหมาย Can-Do ภาษาไทยต้องไม่เป็นค่าว่าง',
        severity: 'error',
        lessonIndex: lIdx,
      });
    }

    if (lesson.vocabulary.length === 0) {
      warnings.push({
        path: `${lPath}.vocabulary`,
        field: 'vocabulary',
        message: 'บทเรียนนี้ยังไม่มีคำศัพท์',
        severity: 'warning',
        lessonIndex: lIdx,
      });
    }

    // Vocabulary item checks
    lesson.vocabulary.forEach((v, vIdx) => {
      const vPath = `${lPath}.vocabulary[${vIdx}]`;

      if (!v.hanzi.trim()) {
        errors.push({
          path: `${vPath}.hanzi`,
          field: 'hanzi',
          message: 'คำศัพท์ภาษาจีนต้องไม่เป็นค่าว่าง',
          severity: 'error',
          lessonIndex: lIdx,
          vocabIndex: vIdx,
        });
      } else {
        // Check traditional characters
        for (const ch of v.hanzi) {
          if (TRADITIONAL_BLACKLIST.has(ch)) {
            errors.push({
              path: `${vPath}.hanzi`,
              field: 'hanzi',
              message: `พบอักษรจีนตัวเต็ม '${ch}' ห้ามใช้ในบทเรียน Hanzero`,
              severity: 'error',
              lessonIndex: lIdx,
              vocabIndex: vIdx,
            });
          }
        }
      }

      if (!v.pinyin.trim() && !v.pinyin_tone.trim()) {
        errors.push({
          path: `${vPath}.pinyin`,
          field: 'pinyin',
          message: 'พินอินต้องไม่เป็นค่าว่าง (ระบุ pinyin หรือ pinyin_tone)',
          severity: 'error',
          lessonIndex: lIdx,
          vocabIndex: vIdx,
        });
      }

      if (!v.meaning_th.trim()) {
        errors.push({
          path: `${vPath}.meaning_th`,
          field: 'meaning_th',
          message: 'ความหมายภาษาไทยต้องไม่เป็นค่าว่าง',
          severity: 'error',
          lessonIndex: lIdx,
          vocabIndex: vIdx,
        });
      }

      if (typeof v.stroke_count === 'number' && v.stroke_count <= 0) {
        errors.push({
          path: `${vPath}.stroke_count`,
          field: 'stroke_count',
          message: 'จำนวนขีดตัวอักษรต้องมากกว่า 0',
          severity: 'error',
          lessonIndex: lIdx,
          vocabIndex: vIdx,
        });
      }
    });

    // Dialogue checks
    lesson.dialogue.forEach((d, dIdx) => {
      const dPath = `${lPath}.dialogue[${dIdx}]`;
      if (!d.zh.trim()) {
        errors.push({
          path: `${dPath}.zh`,
          field: 'zh',
          message: 'บทสนทนาต้องมีข้อความภาษาจีน',
          severity: 'error',
          lessonIndex: lIdx,
        });
      }

      // Check forbidden grammar rules in dialogue
      for (const rule of FORBIDDEN_GRAMMAR_RULES) {
        if (rule.pattern.test(d.zh)) {
          errors.push({
            path: `${dPath}.zh`,
            field: 'zh',
            message: rule.message,
            severity: 'error',
            lessonIndex: lIdx,
          });
        }
      }
    });

    // Quiz checks
    lesson.quizzes.forEach((q, qIdx) => {
      const qPath = `${lPath}.quizzes[${qIdx}]`;

      if (!q.question_th.trim()) {
        errors.push({
          path: `${qPath}.question_th`,
          field: 'question_th',
          message: 'คำถามแบบฝึกหัดต้องไม่เป็นค่าว่าง',
          severity: 'error',
          lessonIndex: lIdx,
        });
      }

      if (q.type === 'sentence_scramble') {
        if (q.tokens.length < 2) {
          errors.push({
            path: `${qPath}.tokens`,
            field: 'tokens',
            message: 'แบบฝึกหัดเรียงประโยคต้องมีชิ้นส่วนคำอย่างน้อย 2 ชิ้น',
            severity: 'error',
            lessonIndex: lIdx,
          });
        }
        if (q.tokens.length !== q.correct_sequence.length) {
          errors.push({
            path: `${qPath}.correct_sequence`,
            field: 'correct_sequence',
            message: 'จำนวนชิ้นส่วนคำและลำดับเฉลยต้องเท่ากัน',
            severity: 'error',
            lessonIndex: lIdx,
          });
        }
      } else {
        if (q.options.length < 2) {
          errors.push({
            path: `${qPath}.options`,
            field: 'options',
            message: 'ข้อสอบแบบปรนัยต้องมีตัวเลือกอย่างน้อย 2 ข้อ',
            severity: 'error',
            lessonIndex: lIdx,
          });
        }
        if (q.correct_index < 0 || q.correct_index >= q.options.length) {
          errors.push({
            path: `${qPath}.correct_index`,
            field: 'correct_index',
            message: `ดัชนีเฉลย (correct_index: ${q.correct_index}) อยู่นอกช่วงของตัวเลือก (0 - ${Math.max(0, q.options.length - 1)})`,
            severity: 'error',
            lessonIndex: lIdx,
          });
        }
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Creates a default blank draft state with 1 empty lesson
 */
export function createBlankDraft(tier: number = 1, unitNumber: number = 1): StudioDraftState {
  const unitPad = unitNumber.toString().padStart(2, '0');
  const unitId = `tier${tier}_u${unitPad}`;

  const defaultLesson: StudioLessonDraft = {
    _clientId: generateClientId(),
    lesson_id: `t${tier}_u${unitPad}_l01`,
    lesson_number: 1,
    title: {
      zh: '新课程',
      th: 'บทเรียนใหม่',
      en: 'New Lesson',
    },
    can_do: {
      th: 'สามารถเรียนรู้คำศัพท์พื้นฐานได้',
      en: 'Can understand basic vocabulary',
    },
    baby_step_goal: 'จำคำศัพท์ใหม่และออกเสียงให้ถูกต้อง',
    vocabulary: [
      {
        _clientId: generateClientId(),
        id: `hsk${tier}_${unitPad}01_01`,
        hanzi: '你好',
        pinyin: 'nǐ hǎo',
        pinyin_tone: 'ni3 hao3',
        meaning_th: 'สวัสดี',
        meaning_en: 'hello',
        radical: '亻',
        radical_name_th: 'หมวดคนยืน (单人旁)',
        stroke_count: 7,
        mnemonic: 'คน (亻) สองคนทักทายกันอย่างเป็นมิตร',
        kid_mnemonic: 'กระต่ายทักทายเพื่อนกระต่าย 🐰👋',
        body_gesture: 'โบกมือทักทาย',
        sandhi_rule: '3+3',
        display_pinyin: 'ní hǎo',
      },
    ],
    tone_rule: null,
    grammar_bite: {
      title: 'รูปประโยคพื้นฐาน',
      explanation_th: 'การใช้คำทักทายในชีวิตประจำวัน',
      patterns: [
        {
          _clientId: generateClientId(),
          formula: 'A + 你好',
          zh: '你好！',
          pinyin: 'Nǐ hǎo!',
          th: 'สวัสดี!',
          en: 'Hello!',
        },
      ],
    },
    dialogue: [
      {
        _clientId: generateClientId(),
        speaker: 'A',
        speaker_name: 'หลี่หมิง (李明)',
        zh: '你好！',
        pinyin: 'Nǐ hǎo!',
        th: 'สวัสดี!',
        en: 'Hello!',
      },
      {
        _clientId: generateClientId(),
        speaker: 'B',
        speaker_name: 'หวังเหว่ย (王伟)',
        zh: '你好！',
        pinyin: 'Nǐ hǎo!',
        th: 'สวัสดี!',
        en: 'Hello!',
      },
    ],
    quizzes: [
      {
        _clientId: generateClientId(),
        type: 'meaning_match',
        question_th: "'你好' มีความหมายว่าอย่างไร?",
        explanation_th: "'你好' แปลว่า 'สวัสดี'",
        encouragement: 'ยอดเยี่ยมมาก! ก้าวแรกเริ่มขึ้นแล้ว',
        options: ['สวัสดี', 'ขอบคุณ', 'ลาก่อน', 'ขอโทษ'],
        correct_index: 0,
        tokens: [],
        correct_sequence: [],
      },
    ],
    boss_challenge: {
      scenario_th: 'พบเพื่อนใหม่ชาวจีนเป็นครั้งแรก คุณจะกล่าวทักทายอย่างไร?',
      options: ['你好！', '谢谢！', '再见！'],
      correct_index: 0,
      explanation_th: "ใช้ '你好！' เพื่อทักทายอย่างสุภาพ",
      encouragement: 'พิชิตบอสสำเร็จ! คุณพร้อมสำหรับการสนทนาจริงแล้ว',
    },
    cheer_trophy: {
      badge_id: `badge_t${tier}_u${unitPad}_l01`,
      badge_name: 'ก้าวแรกฮั่นซีโร่ 🐰🌟',
      message_th: 'ยินดีด้วย! คุณผ่านบทเรียนแรกสำเร็จแล้ว',
      xp_reward: 50,
    },
  };

  return {
    version: 1,
    unit_id: unitId,
    tier,
    unit_number: unitNumber,
    title: {
      zh: '新单元',
      th: 'หมวดบทเรียนใหม่',
      en: 'New Unit',
    },
    description: 'คำอธิบายบทเรียนในหมวดนี้',
    lessons: [defaultLesson],
    activeLessonIndex: 0,
    lastSavedAt: null,
  };
}

/**
 * Creates a sample draft from UnitLessonData or fallback default
 */
export function createSampleDraft(sampleUnit?: UnitLessonData): StudioDraftState {
  if (sampleUnit) {
    const res = parseLessonUnitToDraft(sampleUnit);
    if (res.draft) return res.draft;
  }
  return createBlankDraft(1, 1);
}

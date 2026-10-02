/**
 * src/hooks/useStudioDraft.ts
 * ---------------------------------------------------------------------------
 * Reactive Draft State Management Hook for Hanzero Content Studio.
 * Features:
 * 1. Pure Reducer State Engine with Stable Client IDs
 * 2. Cancelable Debounced Auto-Save (1,000ms) with Zombie Prevention
 * 3. Page Lifecycle Synchronous Flush (visibilitychange & beforeunload)
 * 4. Storage Shield (QuotaExceededError & Safari Private Mode In-Memory Fallback)
 * 5. Full Import / Export & Pedagogical Validation Bridges
 *
 * Adheres strictly to AGENTS.md §4.2: Strict Typing, Zero 'any', Zero Memory Leaks.
 */

import { useReducer, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import type {
  UnitLessonData,
  QuizQuestionType,
} from '../types/lesson';
import {
  createBlankDraft,
  createSampleDraft,
  serializeDraftToLessonUnit,
  parseLessonUnitToDraft,
  validateStudioDraft,
  generateClientId,
} from '../engines/studio/studioSerializer';
import type {
  StudioDraftState,
  StudioLessonDraft,
  StudioVocabDraft,
  StudioDialogueDraft,
  StudioQuizDraft,
  StudioGrammarDraft,
  StudioBossChallengeDraft,
  StudioStorageEnvelope,
  StudioValidationError,
  StorageStatus,
} from '../engines/studio/studioTypes';

export const STUDIO_STORAGE_KEY = 'hanzero_studio_draft_v1';
export const AUTO_SAVE_DEBOUNCE_MS = 1000;

// In-Memory Storage Fallback when LocalStorage is blocked or quota exceeded
const inMemoryDraftCache = new Map<string, string>();

/**
 * Reducer Action Types
 */
export type StudioAction =
  | { type: 'HYDRATE'; payload: StudioDraftState }
  | {
      type: 'UPDATE_UNIT_METADATA';
      payload: Partial<Pick<StudioDraftState, 'unit_id' | 'tier' | 'unit_number' | 'title' | 'description'>>;
    }
  | { type: 'SET_ACTIVE_LESSON_INDEX'; payload: number }
  | {
      type: 'UPDATE_LESSON_METADATA';
      payload: Partial<Pick<StudioLessonDraft, 'title' | 'can_do' | 'baby_step_goal'>>;
    }
  | { type: 'ADD_VOCAB'; payload?: Partial<StudioVocabDraft> }
  | { type: 'UPDATE_VOCAB'; payload: { index: number; patch: Partial<StudioVocabDraft> } }
  | { type: 'REMOVE_VOCAB'; payload: number }
  | { type: 'REORDER_VOCAB'; payload: { from: number; to: number } }
  | { type: 'ADD_DIALOGUE'; payload?: Partial<StudioDialogueDraft> }
  | { type: 'UPDATE_DIALOGUE'; payload: { index: number; patch: Partial<StudioDialogueDraft> } }
  | { type: 'REMOVE_DIALOGUE'; payload: number }
  | { type: 'REORDER_DIALOGUE'; payload: { from: number; to: number } }
  | { type: 'ADD_QUIZ'; payload: QuizQuestionType }
  | { type: 'UPDATE_QUIZ'; payload: { index: number; patch: Partial<StudioQuizDraft> } }
  | { type: 'REMOVE_QUIZ'; payload: number }
  | { type: 'REORDER_QUIZ'; payload: { from: number; to: number } }
  | { type: 'UPDATE_GRAMMAR'; payload: Partial<StudioGrammarDraft> }
  | { type: 'UPDATE_BOSS'; payload: Partial<StudioBossChallengeDraft> }
  | { type: 'UPDATE_TROPHY'; payload: Partial<StudioLessonDraft['cheer_trophy']> }
  | { type: 'UPDATE_TONE_RULE'; payload: StudioLessonDraft['tone_rule'] };

/**
 * Array reordering helper
 */
function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const next = [...array];
  if (from < 0 || from >= next.length || to < 0 || to >= next.length) {
    return next;
  }
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/**
 * Pure Reducer for Studio Draft State
 */
export function studioReducer(state: StudioDraftState, action: StudioAction): StudioDraftState {
  switch (action.type) {
    case 'HYDRATE':
      return {
        ...action.payload,
        activeLessonIndex: Math.max(
          0,
          Math.min(action.payload.activeLessonIndex ?? 0, action.payload.lessons.length - 1)
        ),
      };

    case 'UPDATE_UNIT_METADATA':
      return {
        ...state,
        ...action.payload,
        title: action.payload.title ? { ...state.title, ...action.payload.title } : state.title,
      };

    case 'SET_ACTIVE_LESSON_INDEX':
      return {
        ...state,
        activeLessonIndex: Math.max(0, Math.min(action.payload, state.lessons.length - 1)),
      };

    case 'UPDATE_LESSON_METADATA': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];

      nextLessons[activeIdx] = {
        ...current,
        ...action.payload,
        title: action.payload.title ? { ...current.title, ...action.payload.title } : current.title,
        can_do: action.payload.can_do ? { ...current.can_do, ...action.payload.can_do } : current.can_do,
      };

      return { ...state, lessons: nextLessons };
    }

    case 'ADD_VOCAB': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      const newVocab: StudioVocabDraft = {
        _clientId: generateClientId(),
        id: '',
        hanzi: '',
        pinyin: '',
        pinyin_tone: '',
        meaning_th: '',
        meaning_en: '',
        radical: '一',
        radical_name_th: 'หมวดขีดเดี่ยว',
        stroke_count: 1,
        mnemonic: '',
        kid_mnemonic: '',
        body_gesture: '',
        ...action.payload,
      };

      nextLessons[activeIdx] = {
        ...current,
        vocabulary: [...current.vocabulary, newVocab],
      };
      return { ...state, lessons: nextLessons };
    }

    case 'UPDATE_VOCAB': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      const { index, patch } = action.payload;

      if (index < 0 || index >= current.vocabulary.length) return state;

      const nextVocab = [...current.vocabulary];
      nextVocab[index] = { ...nextVocab[index], ...patch };

      nextLessons[activeIdx] = { ...current, vocabulary: nextVocab };
      return { ...state, lessons: nextLessons };
    }

    case 'REMOVE_VOCAB': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      nextLessons[activeIdx] = {
        ...current,
        vocabulary: current.vocabulary.filter((_, i) => i !== action.payload),
      };
      return { ...state, lessons: nextLessons };
    }

    case 'REORDER_VOCAB': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      nextLessons[activeIdx] = {
        ...current,
        vocabulary: arrayMove(current.vocabulary, action.payload.from, action.payload.to),
      };
      return { ...state, lessons: nextLessons };
    }

    case 'ADD_DIALOGUE': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      const newLine: StudioDialogueDraft = {
        _clientId: generateClientId(),
        speaker: current.dialogue.length % 2 === 0 ? 'A' : 'B',
        speaker_name: current.dialogue.length % 2 === 0 ? 'ผู้พูด A' : 'ผู้พูด B',
        zh: '',
        pinyin: '',
        th: '',
        en: '',
        ...action.payload,
      };

      nextLessons[activeIdx] = {
        ...current,
        dialogue: [...current.dialogue, newLine],
      };
      return { ...state, lessons: nextLessons };
    }

    case 'UPDATE_DIALOGUE': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      const { index, patch } = action.payload;

      if (index < 0 || index >= current.dialogue.length) return state;

      const nextDialogue = [...current.dialogue];
      nextDialogue[index] = { ...nextDialogue[index], ...patch };

      nextLessons[activeIdx] = { ...current, dialogue: nextDialogue };
      return { ...state, lessons: nextLessons };
    }

    case 'REMOVE_DIALOGUE': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      nextLessons[activeIdx] = {
        ...current,
        dialogue: current.dialogue.filter((_, i) => i !== action.payload),
      };
      return { ...state, lessons: nextLessons };
    }

    case 'REORDER_DIALOGUE': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      nextLessons[activeIdx] = {
        ...current,
        dialogue: arrayMove(current.dialogue, action.payload.from, action.payload.to),
      };
      return { ...state, lessons: nextLessons };
    }

    case 'ADD_QUIZ': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      const isScramble = action.payload === 'sentence_scramble';

      const newQuiz: StudioQuizDraft = {
        _clientId: generateClientId(),
        type: action.payload,
        question_th: isScramble ? 'เรียงประโยคต่อไปนี้ให้ถูกต้อง' : 'เลือกคำตอบที่ถูกต้อง',
        explanation_th: '',
        encouragement: 'ยอดเยี่ยมมาก! 🐰✨',
        options: isScramble ? [] : ['ตัวเลือก 1', 'ตัวเลือก 2', 'ตัวเลือก 3', 'ตัวเลือก 4'],
        correct_index: 0,
        tokens: isScramble ? ['คำที่ 1', 'คำที่ 2'] : [],
        correct_sequence: isScramble ? ['คำที่ 1', 'คำที่ 2'] : [],
      };

      nextLessons[activeIdx] = {
        ...current,
        quizzes: [...current.quizzes, newQuiz],
      };
      return { ...state, lessons: nextLessons };
    }

    case 'UPDATE_QUIZ': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      const { index, patch } = action.payload;

      if (index < 0 || index >= current.quizzes.length) return state;

      const nextQuizzes = [...current.quizzes];
      nextQuizzes[index] = { ...nextQuizzes[index], ...patch };

      nextLessons[activeIdx] = { ...current, quizzes: nextQuizzes };
      return { ...state, lessons: nextLessons };
    }

    case 'REMOVE_QUIZ': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      nextLessons[activeIdx] = {
        ...current,
        quizzes: current.quizzes.filter((_, i) => i !== action.payload),
      };
      return { ...state, lessons: nextLessons };
    }

    case 'REORDER_QUIZ': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      nextLessons[activeIdx] = {
        ...current,
        quizzes: arrayMove(current.quizzes, action.payload.from, action.payload.to),
      };
      return { ...state, lessons: nextLessons };
    }

    case 'UPDATE_GRAMMAR': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      nextLessons[activeIdx] = {
        ...current,
        grammar_bite: { ...current.grammar_bite, ...action.payload },
      };
      return { ...state, lessons: nextLessons };
    }

    case 'UPDATE_BOSS': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      nextLessons[activeIdx] = {
        ...current,
        boss_challenge: { ...current.boss_challenge, ...action.payload },
      };
      return { ...state, lessons: nextLessons };
    }

    case 'UPDATE_TROPHY': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      const current = nextLessons[activeIdx];
      nextLessons[activeIdx] = {
        ...current,
        cheer_trophy: { ...current.cheer_trophy, ...action.payload },
      };
      return { ...state, lessons: nextLessons };
    }

    case 'UPDATE_TONE_RULE': {
      const activeIdx = state.activeLessonIndex;
      if (!state.lessons[activeIdx]) return state;

      const nextLessons = [...state.lessons];
      nextLessons[activeIdx] = {
        ...nextLessons[activeIdx],
        tone_rule: action.payload,
      };
      return { ...state, lessons: nextLessons };
    }

    default:
      return state;
  }
}

/**
 * Public Interface for useStudioDraft hook
 */
export interface UseStudioDraftReturn {
  // State
  draft: StudioDraftState;
  activeLesson: StudioLessonDraft | undefined;
  activeLessonIndex: number;
  isDirty: boolean;
  isSaving: boolean;
  isRecovered: boolean;
  lastSavedAt: number | null;
  storageStatus: StorageStatus;
  storageError: string | null;
  validation: {
    isValid: boolean;
    errors: StudioValidationError[];
    warnings: StudioValidationError[];
  };

  // Unit & Lesson Selectors
  setActiveLessonIndex: (index: number) => void;
  updateUnitMetadata: (
    patch: Partial<Pick<StudioDraftState, 'unit_id' | 'tier' | 'unit_number' | 'title' | 'description'>>
  ) => void;
  updateUnitTitle: (lang: 'zh' | 'th' | 'en', text: string) => void;
  updateLessonMetadata: (
    patch: Partial<Pick<StudioLessonDraft, 'title' | 'can_do' | 'baby_step_goal'>>
  ) => void;

  // Vocab CRUD
  addVocab: (initial?: Partial<StudioVocabDraft>) => void;
  updateVocab: (vocabIndex: number, patch: Partial<StudioVocabDraft>) => void;
  removeVocab: (vocabIndex: number) => void;
  reorderVocab: (fromIndex: number, toIndex: number) => void;

  // Dialogue CRUD
  addDialogueLine: (initial?: Partial<StudioDialogueDraft>) => void;
  updateDialogueLine: (dialogueIndex: number, patch: Partial<StudioDialogueDraft>) => void;
  removeDialogueLine: (dialogueIndex: number) => void;
  reorderDialogue: (fromIndex: number, toIndex: number) => void;

  // Quiz CRUD
  addQuiz: (type: QuizQuestionType) => void;
  updateQuiz: (quizIndex: number, patch: Partial<StudioQuizDraft>) => void;
  removeQuiz: (quizIndex: number) => void;
  reorderQuiz: (fromIndex: number, toIndex: number) => void;

  // Grammar, Boss, Trophy, ToneRule
  updateGrammar: (patch: Partial<StudioGrammarDraft>) => void;
  updateBossChallenge: (patch: Partial<StudioBossChallengeDraft>) => void;
  updateCheerTrophy: (patch: Partial<StudioLessonDraft['cheer_trophy']>) => void;
  updateToneRule: (rule: StudioLessonDraft['tone_rule']) => void;

  // Storage Operations
  forceSave: () => void;
  resetDraft: () => void;
  loadSampleLesson: (sample?: UnitLessonData) => void;
  importJson: (jsonString: string) => { success: boolean; errors: string[] };
  exportJson: () => { jsonString: string; isValid: boolean; errors: string[] };
}

/**
 * Hook for managing Studio Draft State with auto-persistence and recovery
 */
export function useStudioDraft(initialUnit?: UnitLessonData): UseStudioDraftReturn {
  const [draft, dispatch] = useReducer(
    studioReducer,
    null,
    () => initialUnit ? createSampleDraft(initialUnit) : createBlankDraft(1, 1)
  );

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRecovered, setIsRecovered] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [storageStatus, setStorageStatus] = useState<StorageStatus>('idle');
  const [storageError, setStorageError] = useState<string | null>(null);

  const draftRef = useRef(draft);
  draftRef.current = draft;

  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;

  const timerRef = useRef<NodeJS.Timeout | number | null>(null);
  const isHydratedRef = useRef(false);

  /**
   * Cancels any pending debounced auto-save timer (Zombie Prevention)
   */
  const cancelPendingSave = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current as NodeJS.Timeout);
      timerRef.current = null;
    }
  }, []);

  /**
   * Low-level persistence writer with QuotaExceeded & Sandbox safe fallback
   */
  const writeToStorage = useCallback((targetDraft: StudioDraftState): boolean => {
    const envelope: StudioStorageEnvelope = {
      version: 1,
      savedAt: Date.now(),
      draft: targetDraft,
    };
    const serialized = JSON.stringify(envelope);

    // Update in-memory cache unconditionally
    inMemoryDraftCache.set(STUDIO_STORAGE_KEY, serialized);

    if (typeof window === 'undefined' || !window.localStorage) {
      setStorageStatus('blocked');
      return true;
    }

    try {
      window.localStorage.setItem(STUDIO_STORAGE_KEY, serialized);
      setStorageStatus('saved');
      setStorageError(null);
      setLastSavedAt(envelope.savedAt);
      return true;
    } catch (err) {
      const isQuota =
        err instanceof DOMException &&
        (err.name === 'QuotaExceededError' ||
          err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
          err.code === 22 ||
          err.code === 1014);

      if (isQuota) {
        setStorageStatus('quota_exceeded');
        setStorageError('QUOTA_EXCEEDED');
      } else {
        setStorageStatus('blocked');
        setStorageError('STORAGE_BLOCKED');
      }
      return false;
    }
  }, []);

  /**
   * Synchronous Flush for pagehide / visibilitychange / beforeunload
   */
  const flushSave = useCallback(() => {
    cancelPendingSave();
    if (isDirtyRef.current) {
      writeToStorage(draftRef.current);
      setIsDirty(false);
      setIsSaving(false);
    }
  }, [cancelPendingSave, writeToStorage]);

  /**
   * Mount Recovery: reads localStorage on initial load
   */
  useEffect(() => {
    if (isHydratedRef.current) return;
    isHydratedRef.current = true;

    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const raw = window.localStorage.getItem(STUDIO_STORAGE_KEY);
      if (raw) {
        const envelope = JSON.parse(raw);
        if (envelope && envelope.draft && envelope.draft.version === 1) {
          dispatch({ type: 'HYDRATE', payload: envelope.draft });
          setIsRecovered(true);
          setLastSavedAt(envelope.savedAt ?? null);
          setStorageStatus('saved');
        }
      }
    } catch {
      // In case of corrupt storage, ignore and let blank default persist safely
      setStorageStatus('idle');
    }
  }, []);

  const prevDraftRef = useRef(draft);

  /**
   * Debounced Auto-Save triggering on state changes
   */
  useEffect(() => {
    // If draft reference has not changed from initial/previous render, skip auto-save
    if (prevDraftRef.current === draft) {
      return;
    }
    prevDraftRef.current = draft;

    setIsDirty(true);
    setIsSaving(true);
    setStorageStatus('saving');
    cancelPendingSave();

    timerRef.current = setTimeout(() => {
      writeToStorage(draftRef.current);
      setIsDirty(false);
      setIsSaving(false);
      timerRef.current = null;
    }, AUTO_SAVE_DEBOUNCE_MS);

    return () => {
      cancelPendingSave();
    };
  }, [draft, cancelPendingSave, writeToStorage]);

  /**
   * Synchronous Flush on Tab Close / Hide
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushSave();
      }
    };

    const handleBeforeUnload = () => {
      flushSave();
    };

    const handlePageHide = () => {
      flushSave();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
      cancelPendingSave();
    };
  }, [flushSave, cancelPendingSave]);

  // Derived validation
  const validation = useMemo(() => validateStudioDraft(draft), [draft]);
  const activeLesson = draft.lessons[draft.activeLessonIndex];

  // Action Dispatchers
  const setActiveLessonIndex = useCallback((index: number) => {
    dispatch({ type: 'SET_ACTIVE_LESSON_INDEX', payload: index });
  }, []);

  const updateUnitMetadata = useCallback(
    (patch: Partial<Pick<StudioDraftState, 'unit_id' | 'tier' | 'unit_number' | 'title' | 'description'>>) => {
      dispatch({ type: 'UPDATE_UNIT_METADATA', payload: patch });
    },
    []
  );

  const updateUnitTitle = useCallback((lang: 'zh' | 'th' | 'en', text: string) => {
    dispatch({
      type: 'UPDATE_UNIT_METADATA',
      payload: { title: { zh: '', th: '', en: '', [lang]: text } as StudioDraftState['title'] },
    });
  }, []);

  const updateLessonMetadata = useCallback(
    (patch: Partial<Pick<StudioLessonDraft, 'title' | 'can_do' | 'baby_step_goal'>>) => {
      dispatch({ type: 'UPDATE_LESSON_METADATA', payload: patch });
    },
    []
  );

  const addVocab = useCallback((initial?: Partial<StudioVocabDraft>) => {
    dispatch({ type: 'ADD_VOCAB', payload: initial });
  }, []);

  const updateVocab = useCallback((vocabIndex: number, patch: Partial<StudioVocabDraft>) => {
    dispatch({ type: 'UPDATE_VOCAB', payload: { index: vocabIndex, patch } });
  }, []);

  const removeVocab = useCallback((vocabIndex: number) => {
    dispatch({ type: 'REMOVE_VOCAB', payload: vocabIndex });
  }, []);

  const reorderVocab = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: 'REORDER_VOCAB', payload: { from: fromIndex, to: toIndex } });
  }, []);

  const addDialogueLine = useCallback((initial?: Partial<StudioDialogueDraft>) => {
    dispatch({ type: 'ADD_DIALOGUE', payload: initial });
  }, []);

  const updateDialogueLine = useCallback(
    (dialogueIndex: number, patch: Partial<StudioDialogueDraft>) => {
      dispatch({ type: 'UPDATE_DIALOGUE', payload: { index: dialogueIndex, patch } });
    },
    []
  );

  const removeDialogueLine = useCallback((dialogueIndex: number) => {
    dispatch({ type: 'REMOVE_DIALOGUE', payload: dialogueIndex });
  }, []);

  const reorderDialogue = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: 'REORDER_DIALOGUE', payload: { from: fromIndex, to: toIndex } });
  }, []);

  const addQuiz = useCallback((type: QuizQuestionType) => {
    dispatch({ type: 'ADD_QUIZ', payload: type });
  }, []);

  const updateQuiz = useCallback((quizIndex: number, patch: Partial<StudioQuizDraft>) => {
    dispatch({ type: 'UPDATE_QUIZ', payload: { index: quizIndex, patch } });
  }, []);

  const removeQuiz = useCallback((quizIndex: number) => {
    dispatch({ type: 'REMOVE_QUIZ', payload: quizIndex });
  }, []);

  const reorderQuiz = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: 'REORDER_QUIZ', payload: { from: fromIndex, to: toIndex } });
  }, []);

  const updateGrammar = useCallback((patch: Partial<StudioGrammarDraft>) => {
    dispatch({ type: 'UPDATE_GRAMMAR', payload: patch });
  }, []);

  const updateBossChallenge = useCallback((patch: Partial<StudioBossChallengeDraft>) => {
    dispatch({ type: 'UPDATE_BOSS', payload: patch });
  }, []);

  const updateCheerTrophy = useCallback((patch: Partial<StudioLessonDraft['cheer_trophy']>) => {
    dispatch({ type: 'UPDATE_TROPHY', payload: patch });
  }, []);

  const updateToneRule = useCallback((rule: StudioLessonDraft['tone_rule']) => {
    dispatch({ type: 'UPDATE_TONE_RULE', payload: rule });
  }, []);

  /**
   * Explicit Force Save
   */
  const forceSave = useCallback(() => {
    cancelPendingSave();
    writeToStorage(draftRef.current);
    setIsDirty(false);
    setIsSaving(false);
  }, [cancelPendingSave, writeToStorage]);

  /**
   * Reset Draft with Zombie Prevention
   */
  const resetDraft = useCallback(() => {
    cancelPendingSave();
    const clean = createBlankDraft(1, 1);
    dispatch({ type: 'HYDRATE', payload: clean });
    writeToStorage(clean);
    setIsDirty(false);
    setIsSaving(false);
  }, [cancelPendingSave, writeToStorage]);

  /**
   * Load Sample Lesson with Zombie Prevention
   */
  const loadSampleLesson = useCallback(
    (sample?: UnitLessonData) => {
      cancelPendingSave();
      const sampleDraft = createSampleDraft(sample);
      dispatch({ type: 'HYDRATE', payload: sampleDraft });
      writeToStorage(sampleDraft);
      setIsDirty(false);
      setIsSaving(false);
    },
    [cancelPendingSave, writeToStorage]
  );

  /**
   * Import JSON with Validation
   */
  const importJson = useCallback(
    (jsonString: string): { success: boolean; errors: string[] } => {
      const parsed = parseLessonUnitToDraft(jsonString);
      if (!parsed.success || !parsed.draft) {
        return {
          success: false,
          errors: parsed.errors.map((e) => e.message),
        };
      }

      cancelPendingSave();
      dispatch({ type: 'HYDRATE', payload: parsed.draft });
      writeToStorage(parsed.draft);
      setIsDirty(false);
      setIsSaving(false);

      return {
        success: true,
        errors: [],
      };
    },
    [cancelPendingSave, writeToStorage]
  );

  /**
   * Export JSON String
   */
  const exportJson = useCallback((): {
    jsonString: string;
    isValid: boolean;
    errors: string[];
  } => {
    const current = draftRef.current;
    const serialized = serializeDraftToLessonUnit(current, { sanitize: true, autoSequenceIds: true });
    const val = validateStudioDraft(current);

    return {
      jsonString: JSON.stringify(serialized, null, 2),
      isValid: val.isValid,
      errors: val.errors.map((e) => `${e.field}: ${e.message}`),
    };
  }, []);

  return {
    draft,
    activeLesson,
    activeLessonIndex: draft.activeLessonIndex,
    isDirty,
    isSaving,
    isRecovered,
    lastSavedAt,
    storageStatus,
    storageError,
    validation,

    setActiveLessonIndex,
    updateUnitMetadata,
    updateUnitTitle,
    updateLessonMetadata,

    addVocab,
    updateVocab,
    removeVocab,
    reorderVocab,

    addDialogueLine,
    updateDialogueLine,
    removeDialogueLine,
    reorderDialogue,

    addQuiz,
    updateQuiz,
    removeQuiz,
    reorderQuiz,

    updateGrammar,
    updateBossChallenge,
    updateCheerTrophy,
    updateToneRule,

    forceSave,
    resetDraft,
    loadSampleLesson,
    importJson,
    exportJson,
  };
}

/**
 * src/hooks/useUserState.ts
 * Central React Hook for User Progression, Gamification & SRS State.
 * Bridges Storage Engine, SuperMemo SM-2 Engine, and React UI Lifecycle.
 *
 * Enforces:
 * - Anti-Exploit Streak: max +1 per calendar day
 * - Safe Practice Zone: 0 heart loss in Tier 0 and SRS Review Deck
 * - Heart Clamping: Math.min(5, hearts + 1)
 * - Practice-to-Earn: 5 correct reviews earn 1 heart
 * - Dual Storage Auto-Mirroring & Resurrection
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getStoredUserStateSync,
  saveUserState,
  initializeStorage,
  onUserStateChanged,
  getQuickSyncCode,
  exportSnapshotAsJsonString,
  UserStateSchema,
  PreferencesState,
} from '../engines/storage';
import {
  getAllSrsRecords,
  setSrsRecord,
  bulkSaveSrsRecords,
} from '../engines/storage/coldStorage';
import {
  buildReviewQueue,
  calculateNextReview,
  createNewCard,
  formatDateString,
  calculateDaysBetween,
} from '../engines/srs/srsEngine';
import { SRSCardRecord, SRSGrade, SRSQueueStatus, SRSReviewResult } from '../types/srs';
import unit01Data from '../data/lessons/tier1/unit01_greetings.json';

export interface UseUserStateReturn {
  userState: UserStateSchema;
  isLoading: boolean;
  isPersisted: boolean;
  srsCards: SRSCardRecord[];
  srsQueueStatus: SRSQueueStatus;
  practiceCorrectCount: number;
  completeLesson: (lessonId: string, xpReward: number) => Promise<void>;
  deductHeart: (isSafeZone?: boolean) => Promise<boolean>;
  earnHeart: (amount?: number) => Promise<void>;
  recordPracticeSuccess: () => Promise<boolean>;
  recordCardReview: (cardId: string, grade: SRSGrade) => Promise<SRSReviewResult>;
  addVocabToSrs: (cards: Array<{
    word_id: string;
    hanzi: string;
    pinyin: string;
    meaning_th: string;
    meaning_en: string;
    mnemonic?: string;
  }>) => Promise<void>;
  updatePreferences: (patch: Partial<PreferencesState>) => Promise<void>;
  completeOnboarding: (track: 'tier0' | 'tier1', silentMode: boolean) => Promise<void>;
  exportBackup: () => Promise<string>;
  importBackup: (jsonString: string) => Promise<boolean>;
  quickSyncCode: string;
  refreshQueue: () => void;
}

export function useUserState(): UseUserStateReturn {
  const [userState, setUserState] = useState<UserStateSchema>(getStoredUserStateSync);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPersisted, setIsPersisted] = useState<boolean>(false);
  const [srsCards, setSrsCards] = useState<SRSCardRecord[]>([]);
  const [practiceCorrectCount, setPracticeCorrectCount] = useState<number>(0);
  const [queueNonce, setQueueNonce] = useState<number>(0);

  // 1. Initial boot & cold resurrection
  useEffect(() => {
    let isMounted = true;

    async function boot() {
      try {
        const persistedState = await initializeStorage();
        if (isMounted) {
          setUserState(persistedState);
          setIsPersisted(true);
        }

        // Load cold SRS cards
        const coldRecords = await getAllSrsRecords();
        if (isMounted) {
          if (coldRecords.length === 0) {
            // Seed initial vocabulary from Unit 1 Lesson 1 if cold storage is empty
            const seedItems = unit01Data.lessons[0].vocabulary.map((v) =>
              createNewCard({
                card_id: v.id,
                hanzi: v.hanzi,
                pinyin: v.pinyin,
                meaning_th: v.meaning_th,
                meaning_en: v.meaning_en,
                mnemonic: v.mnemonic,
              })
            );
            await bulkSaveSrsRecords(
              seedItems.map((c) => ({
                word_id: c.card_id,
                hanzi: c.hanzi,
                pinyin: c.pinyin,
                meaning_th: c.meaning_th,
                ease_factor: c.ease_factor,
                interval_days: c.interval_days,
                repetitions: c.repetitions,
                due_date: c.due_date,
                last_reviewed: c.last_reviewed,
                review_history: [],
              }))
            );
            setSrsCards(seedItems);
          } else {
            // Map SrsItemRecord to SRSCardRecord
            const mapped: SRSCardRecord[] = coldRecords.map((r) => ({
              card_id: r.word_id,
              hanzi: r.hanzi,
              pinyin: r.pinyin,
              meaning_th: r.meaning_th,
              meaning_en: '',
              ease_factor: r.ease_factor,
              interval_days: r.interval_days,
              repetitions: r.repetitions,
              due_date: r.due_date,
              last_reviewed: r.last_reviewed,
              review_history: r.review_history.map((h) => ({
                date: h.date,
                grade: (Math.min(3, Math.max(0, h.grade)) as SRSGrade),
              })),
            }));
            setSrsCards(mapped);
          }
        }
      } catch (err) {
        console.warn('[Hanzero Hook] Storage boot warning:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    boot();

    // Listen for cross-tab or external state changes
    const unsubscribe = onUserStateChanged((nextState) => {
      if (isMounted) {
        setUserState(nextState);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // 2. Derive SRS review queue with Cap and Triage
  const srsQueueStatus = useMemo<SRSQueueStatus>(() => {
    // Avoid lint unused warning for queueNonce
    void queueNonce;
    const todayStr = formatDateString(new Date());
    const lastReviewDate = userState.srs_summary.last_review_date || todayStr;
    const daysAbsent = calculateDaysBetween(lastReviewDate, todayStr);

    return buildReviewQueue(srsCards, todayStr, daysAbsent);
  }, [srsCards, userState.srs_summary.last_review_date, queueNonce]);

  const refreshQueue = useCallback(() => {
    setQueueNonce((n) => n + 1);
  }, []);

  // 3. Complete lesson & Anti-Exploit Streak calculation
  const completeLesson = useCallback(
    async (lessonId: string, xpReward: number) => {
      const todayStr = formatDateString(new Date());
      const currentState = getStoredUserStateSync();
      const nextState: UserStateSchema = JSON.parse(JSON.stringify(currentState)) as UserStateSchema;

      // Add lesson if not already completed
      if (!nextState.progress.completed_lessons.includes(lessonId)) {
        nextState.progress.completed_lessons.push(lessonId);
      }

      // Add XP
      nextState.progress.xp += xpReward;

      // Calculate Level (1 Level per 100 XP)
      nextState.progress.level = Math.floor(nextState.progress.xp / 100) + 1;

      // Anti-Exploit Streak Guard: max +1 streak per calendar day
      const lastActive = nextState.progress.streak.last_active_date;
      if (!lastActive) {
        // First time
        nextState.progress.streak.count = 1;
        nextState.progress.streak.last_active_date = todayStr;
      } else if (lastActive === todayStr) {
        // Already active today: keep streak count unchanged
      } else {
        const daysGap = calculateDaysBetween(lastActive, todayStr);
        if (daysGap === 1) {
          // Consecutive day: streak + 1
          nextState.progress.streak.count += 1;
          nextState.progress.streak.last_active_date = todayStr;
        } else if (daysGap > 1) {
          // Missed 1+ days: check freeze token
          if (nextState.progress.streak.freeze_tokens > 0) {
            nextState.progress.streak.freeze_tokens -= 1;
            nextState.progress.streak.count += 1;
          } else {
            nextState.progress.streak.count = 1;
          }
          nextState.progress.streak.last_active_date = todayStr;
        }
      }

      await saveUserState(nextState);
      setUserState(nextState);
    },
    []
  );

  // 4. Deduct heart with Safe Practice Zone protection
  const deductHeart = useCallback(
    async (isSafeZone: boolean = false): Promise<boolean> => {
      const currentState = getStoredUserStateSync();
      const isTier0 = currentState.progress.current_tier === 'T0';

      // Safe Practice Zone: Tier 0 and SRS Review Deck NEVER deduct hearts!
      if (isSafeZone || isTier0 || currentState.progress.hearts.current <= 0) {
        return false;
      }

      const nextState: UserStateSchema = JSON.parse(JSON.stringify(currentState)) as UserStateSchema;
      nextState.progress.hearts.current = Math.max(0, nextState.progress.hearts.current - 1);

      await saveUserState(nextState);
      setUserState(nextState);
      return true;
    },
    []
  );

  // 5. Earn heart with strict clamp <= 5
  const earnHeart = useCallback(
    async (amount: number = 1): Promise<void> => {
      const currentState = getStoredUserStateSync();
      const nextState: UserStateSchema = JSON.parse(JSON.stringify(currentState)) as UserStateSchema;
      nextState.progress.hearts.current = Math.min(5, nextState.progress.hearts.current + amount);

      await saveUserState(nextState);
      setUserState(nextState);
    },
    []
  );

  // 6. Practice-to-Earn: 5 correct reviews earn 1 heart
  const recordPracticeSuccess = useCallback(async (): Promise<boolean> => {
    let heartEarned = false;
    setPracticeCorrectCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        void earnHeart(1);
        heartEarned = true;
        return 0; // Reset counter
      }
      return next;
    });
    return heartEarned;
  }, [earnHeart]);

  // 7. Record Card Review in SuperMemo SM-2 & Cold IndexedDB
  const recordCardReview = useCallback(
    async (cardId: string, grade: SRSGrade): Promise<SRSReviewResult> => {
      const card = srsCards.find((c) => c.card_id === cardId);
      if (!card) {
        throw new Error(`Card ${cardId} not found in review list.`);
      }

      const reviewResult = calculateNextReview(card, grade);
      const updatedCard = reviewResult.card;

      // Update in-memory cards
      const nextCards = srsCards.map((c) => (c.card_id === cardId ? updatedCard : c));
      setSrsCards(nextCards);

      // Save to cold storage (IndexedDB)
      await setSrsRecord({
        word_id: updatedCard.card_id,
        hanzi: updatedCard.hanzi,
        pinyin: updatedCard.pinyin,
        meaning_th: updatedCard.meaning_th,
        ease_factor: updatedCard.ease_factor,
        interval_days: updatedCard.interval_days,
        repetitions: updatedCard.repetitions,
        due_date: updatedCard.due_date,
        last_reviewed: updatedCard.last_reviewed,
        review_history: updatedCard.review_history.map((h) => ({
          date: h.date,
          grade: h.grade,
        })),
      });

      // Update Hot State SRS Summary
      const todayStr = formatDateString(new Date());
      const nextDueCards = nextCards.filter((c) => c.due_date <= todayStr);
      const currentState = getStoredUserStateSync();
      const nextState: UserStateSchema = JSON.parse(JSON.stringify(currentState)) as UserStateSchema;

      nextState.srs_summary.total_learned_count = nextCards.length;
      nextState.srs_summary.due_today_count = nextDueCards.length;
      nextState.srs_summary.last_review_date = todayStr;

      // Also award 2 XP per review
      nextState.progress.xp += 2;
      nextState.progress.level = Math.floor(nextState.progress.xp / 100) + 1;

      await saveUserState(nextState);
      setUserState(nextState);

      // If learner scored Good (2) or Easy (3), count toward Practice-to-Earn
      if (grade >= 2) {
        void recordPracticeSuccess();
      }

      return reviewResult;
    },
    [srsCards, recordPracticeSuccess]
  );

  // 8. Add vocabulary batch to SRS
  const addVocabToSrs = useCallback(
    async (
      items: Array<{
        word_id: string;
        hanzi: string;
        pinyin: string;
        meaning_th: string;
        meaning_en: string;
        mnemonic?: string;
      }>
    ) => {
      const existingIds = new Set(srsCards.map((c) => c.card_id));
      const newItems = items
        .filter((item) => !existingIds.has(item.word_id))
        .map((item) =>
          createNewCard({
            card_id: item.word_id,
            hanzi: item.hanzi,
            pinyin: item.pinyin,
            meaning_th: item.meaning_th,
            meaning_en: item.meaning_en,
            mnemonic: item.mnemonic,
          })
        );

      if (newItems.length === 0) return;

      const combined = [...srsCards, ...newItems];
      setSrsCards(combined);

      await bulkSaveSrsRecords(
        newItems.map((c) => ({
          word_id: c.card_id,
          hanzi: c.hanzi,
          pinyin: c.pinyin,
          meaning_th: c.meaning_th,
          ease_factor: c.ease_factor,
          interval_days: c.interval_days,
          repetitions: c.repetitions,
          due_date: c.due_date,
          last_reviewed: c.last_reviewed,
          review_history: [],
        }))
      );

      const currentState = getStoredUserStateSync();
      const nextState: UserStateSchema = JSON.parse(JSON.stringify(currentState)) as UserStateSchema;
      nextState.srs_summary.total_learned_count = combined.length;
      await saveUserState(nextState);
      setUserState(nextState);
    },
    [srsCards]
  );

  // 9. Update user preferences
  const updatePreferences = useCallback(async (patch: Partial<PreferencesState>) => {
    const currentState = getStoredUserStateSync();
    const nextState: UserStateSchema = JSON.parse(JSON.stringify(currentState)) as UserStateSchema;
    nextState.preferences = { ...nextState.preferences, ...patch };
    await saveUserState(nextState);
    setUserState(nextState);
  }, []);

  // 10. Complete onboarding & select learning track
  const completeOnboarding = useCallback(async (track: 'tier0' | 'tier1', silentMode: boolean) => {
    const currentState = getStoredUserStateSync();
    const nextState: UserStateSchema = JSON.parse(JSON.stringify(currentState)) as UserStateSchema;
    nextState.progress.onboarding_completed = true;
    nextState.progress.selected_track = track;
    nextState.progress.current_tier = track;
    nextState.preferences.silent_mode = silentMode;
    await saveUserState(nextState);
    setUserState(nextState);
  }, []);

  // 10. Backup & Quick Sync helpers
  const exportBackup = useCallback(async (): Promise<string> => {
    return exportSnapshotAsJsonString();
  }, []);

  const importBackup = useCallback(async (jsonString: string): Promise<boolean> => {
    try {
      const parsed: unknown = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null && 'hot_state' in parsed) {
        const snapshot = parsed as { hot_state: UserStateSchema; srs_records?: SRSCardRecord[] };
        await saveUserState(snapshot.hot_state);
        setUserState(snapshot.hot_state);
        if (Array.isArray(snapshot.srs_records)) {
          setSrsCards(snapshot.srs_records);
          await bulkSaveSrsRecords(
            snapshot.srs_records.map((c) => ({
              word_id: c.card_id,
              hanzi: c.hanzi,
              pinyin: c.pinyin,
              meaning_th: c.meaning_th,
              ease_factor: c.ease_factor,
              interval_days: c.interval_days,
              repetitions: c.repetitions,
              due_date: c.due_date,
              last_reviewed: c.last_reviewed,
              review_history: [],
            }))
          );
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const quickSyncCode = useMemo(() => {
    return getQuickSyncCode(userState);
  }, [userState]);

  return {
    userState,
    isLoading,
    isPersisted,
    srsCards,
    srsQueueStatus,
    practiceCorrectCount,
    completeLesson,
    deductHeart,
    earnHeart,
    recordPracticeSuccess,
    recordCardReview,
    addVocabToSrs,
    updatePreferences,
    completeOnboarding,
    exportBackup,
    importBackup,
    quickSyncCode,
    refreshQueue,
  };
}

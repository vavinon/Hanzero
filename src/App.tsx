import React, { useState, useEffect } from 'react';
import {
  HeaderBar,
  QuestMap,
  DevStorageDrawer,
  DailyCompletionModal,
  WelcomeModal,
  VoiceHealthModal,
  MilestonePassportModal,
} from './components/layout';
import { useUserState } from './hooks/useUserState';
import { unlockAudioContext, isInAppBrowser } from './engines/audio/audioEngine';
import { checkStorageHealth, StorageDiagnostics, loadStrokeCache } from './engines/storage';
import { SRSGrade } from './types/srs';

const LessonView = React.lazy(() =>
  import('./components/lesson/LessonView').then((m) => ({ default: m.LessonView }))
);

const ReviewDeck = React.lazy(() =>
  import('./components/srs/ReviewDeck').then((m) => ({ default: m.ReviewDeck }))
);

const EngineTestPanel = React.lazy(() =>
  import('./components/test/EngineTestPanel').then((m) => ({ default: m.EngineTestPanel }))
);

const LessonViewSkeleton: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-ink-secondary)' }}>
    <div style={{ fontSize: '32px', marginBottom: '12px' }}>📖🐰</div>
    <div>กำลังจัดเตรียมบทเรียน...</div>
  </div>
);

export const App: React.FC = () => {
  const {
    userState,
    srsQueueStatus,
    practiceCorrectCount,
    completeLesson,
    recordCardReview,
    updatePreferences,
    completeOnboarding,
    refreshQueue,
  } = useUserState();

  // Router View: 'map' (Quest Path) | 'lesson' (Study Tabs) | 'review' (SRS Deck)
  const [currentView, setCurrentView] = useState<'map' | 'lesson' | 'review'>('map');
  const [activeLessonId, setActiveLessonId] = useState<string>('t1_u01_l01');
  const [showTestPanel, setShowTestPanel] = useState<boolean>(false);
  const [showDevDrawer, setShowDevDrawer] = useState<boolean>(false);
  const [showInAppAlert, setShowInAppAlert] = useState<boolean>(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);
  const [showVoiceHealthModal, setShowVoiceHealthModal] = useState<boolean>(false);
  const [showPassportModal, setShowPassportModal] = useState<boolean>(false);
  const [storageHealth, setStorageHealth] = useState<StorageDiagnostics | null>(null);
  const [strokeCacheStatus, setStrokeCacheStatus] = useState<string | null>(null);
  const [dailyCelebration, setDailyCelebration] = useState<{ isOpen: boolean; xp: number }>({
    isOpen: false,
    xp: 0,
  });

  // Check First-run Onboarding Need
  useEffect(() => {
    if (
      !userState.progress.onboarding_completed &&
      userState.progress.completed_lessons.length === 0
    ) {
      setShowWelcomeModal(true);
    }
  }, [userState.progress.onboarding_completed, userState.progress.completed_lessons.length]);

  // Check In-App WebView & Storage Health
  useEffect(() => {
    if (isInAppBrowser()) {
      setShowInAppAlert(true);
    }
    checkStorageHealth().then(setStorageHealth).catch(() => {});
  }, []);

  // Global First-Touch iOS Audio Unlock
  useEffect(() => {
    const handleFirstTouch = () => {
      unlockAudioContext();
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
    window.addEventListener('click', handleFirstTouch);
    window.addEventListener('touchstart', handleFirstTouch);
    return () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  const handleSelectLesson = (_unitId: string, lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLessonComplete = async (lessonId: string, xpReward: number) => {
    await completeLesson(lessonId, xpReward);
    setDailyCelebration({ isOpen: true, xp: xpReward });
    if (lessonId === 't0_u06_l01') {
      setShowPassportModal(true);
    }
    setCurrentView('map');
    refreshQueue();
  };

  const handleInspectStrokeCache = async () => {
    try {
      const cached = await loadStrokeCache('你');
      if (cached) {
        setStrokeCacheStatus(`✅ แคชเส้นขีด '你' สมบูรณ์ (${cached.strokes.length} ขีด, แคชเมื่อ: ${new Date(cached.cached_at).toLocaleTimeString('th-TH')})`);
      } else {
        setStrokeCacheStatus('ℹ️ ยังไม่มีแคชเส้นขีดใน IndexedDB');
      }
    } catch {
      setStrokeCacheStatus('❌ เกิดข้อผิดพลาดในการตรวจสอบ IndexedDB');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-rice-paper)',
        color: 'var(--text-ink-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* In-App Browser Warning Alert */}
      {showInAppAlert && (
        <div
          style={{
            backgroundColor: '#FEF3C7',
            borderBottom: '1px solid #F59E0B',
            padding: '10px 16px',
            fontSize: '12px',
            color: '#92400E',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>⚠️ แนะนำให้เปิดด้วยเบราว์เซอร์ปกติ (Safari / Chrome) เพื่อการออกเสียงและบันทึกข้อมูลที่สมบูรณ์ 100%</span>
          <button
            onClick={() => setShowInAppAlert(false)}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Top HeaderBar */}
      <HeaderBar
        progress={userState.progress}
        preferences={userState.preferences}
        practiceCorrectCount={practiceCorrectCount}
        onToggleSilentMode={() => updatePreferences({ silent_mode: !userState.preferences.silent_mode })}
        onOpenDevDrawer={() => setShowDevDrawer(!showDevDrawer)}
        onOpenReviewDeck={() => setCurrentView('review')}
        dueCardsCount={srsQueueStatus.total_due_count}
      />

      {/* View 1: Quest Map */}
      {currentView === 'map' && (
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <QuestMap
            progress={userState.progress}
            onSelectLesson={handleSelectLesson}
            onOpenReviewDeck={() => setCurrentView('review')}
            dueCardsCount={srsQueueStatus.total_due_count}
            onOpenPassport={() => setShowPassportModal(true)}
          />
        </main>
      )}

      {/* View 2: Unit 1 Lesson View */}
      {currentView === 'lesson' && (
        <main style={{ flex: 1 }}>
          <React.Suspense fallback={<LessonViewSkeleton />}>
            <LessonView
              lessonId={activeLessonId}
              silentMode={userState.preferences.silent_mode}
              onBackToMap={() => setCurrentView('map')}
              onLessonComplete={handleLessonComplete}
            />
          </React.Suspense>
        </main>
      )}

      {/* View 3: SRS Review Deck (Lazy Loaded) */}
      {currentView === 'review' && (
        <main style={{ flex: 1 }}>
          <React.Suspense
            fallback={
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-ink-secondary)' }}>
                กำลังจัดเตรียมบัตรคำทบทวน... 🎴🐰
              </div>
            }
          >
            <ReviewDeck
              queueStatus={srsQueueStatus}
              onReviewCard={async (cardId: string, grade: SRSGrade) => {
                await recordCardReview(cardId, grade);
              }}
              onClose={() => setCurrentView('map')}
            />
          </React.Suspense>
        </main>
      )}

      {/* Collapsible Storage & Dev Diagnostics Drawer */}
      {showDevDrawer && (
        <div style={{ maxWidth: '520px', width: '100%', margin: '0 auto', padding: '0 12px 24px 12px' }}>
          <DevStorageDrawer
            userState={userState}
            storageHealth={storageHealth}
            strokeCacheStatus={strokeCacheStatus}
            onInspectStrokeCache={handleInspectStrokeCache}
            onRestoreState={() => {
              window.location.reload();
            }}
            onOpenVoiceHealth={() => setShowVoiceHealthModal(true)}
            onResetOnboarding={() => setShowWelcomeModal(true)}
          />
          <button
            onClick={() => setShowTestPanel(true)}
            className="btn-tactile-secondary"
            style={{ width: '100%', marginTop: '8px', minHeight: '44px' }}
          >
            🧪 เปิด Engine Test Panel (Lab Sandbox)
          </button>
        </div>
      )}

      {/* Daily Completion Celebration Modal */}
      <DailyCompletionModal
        isOpen={dailyCelebration.isOpen}
        xpEarnedToday={dailyCelebration.xp}
        streakCount={userState.progress.streak.count}
        onClose={() => setDailyCelebration({ isOpen: false, xp: 0 })}
      />

      {/* First-Run Welcome / Onboarding Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onSelectTrack={async (track, silent) => {
          await completeOnboarding(track, silent);
          setShowWelcomeModal(false);
          if (track === 'tier0') {
            setCurrentView('map');
          } else {
            setActiveLessonId('t1_u01_l01');
          }
        }}
        onOpenVoiceHealth={() => setShowVoiceHealthModal(true)}
      />

      {/* Tutu Bunny Voice Health Modal */}
      <VoiceHealthModal
        isOpen={showVoiceHealthModal}
        onClose={() => setShowVoiceHealthModal(false)}
        isSilentMode={userState.preferences.silent_mode}
        onToggleSilentMode={(silent) => updatePreferences({ silent_mode: silent })}
      />

      {/* Tier 0 Graduation Milestone Passport Modal */}
      <MilestonePassportModal
        isOpen={showPassportModal}
        onClose={() => setShowPassportModal(false)}
        userName="นักเรียนฮั่นซีโร่ 🐰"
        streakCount={userState.progress.streak.count}
        totalXp={userState.progress.xp}
      />

      {/* Engine Test Panel Modal */}
      {showTestPanel && (
        <React.Suspense fallback={null}>
          <EngineTestPanel onClose={() => setShowTestPanel(false)} />
        </React.Suspense>
      )}
    </div>
  );
};

export default App;

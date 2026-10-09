import React, { useState, useEffect } from 'react';
import { HeaderBar } from './components/layout/HeaderBar';
import { useUserState } from './hooks/useUserState';
import { unlockAudioContext, isInAppBrowser } from './engines/audio/audioEngine';
import { checkStorageHealth, StorageDiagnostics, loadStrokeCache } from './engines/storage';
import { SRSGrade } from './types/srs';

const DesktopSidebar = React.lazy(() =>
  import('./components/layout/DesktopSidebar').then((m) => ({ default: m.DesktopSidebar }))
);

const MobileLessonDrawer = React.lazy(() =>
  import('./components/layout/MobileLessonDrawer').then((m) => ({ default: m.MobileLessonDrawer }))
);

const DevStorageDrawer = React.lazy(() =>
  import('./components/layout/DevStorageDrawer').then((m) => ({ default: m.DevStorageDrawer }))
);

const DailyCompletionModal = React.lazy(() =>
  import('./components/layout/DailyCompletionModal').then((m) => ({ default: m.DailyCompletionModal }))
);

const WelcomeModal = React.lazy(() =>
  import('./components/layout/WelcomeModal').then((m) => ({ default: m.WelcomeModal }))
);

const VoiceHealthModal = React.lazy(() =>
  import('./components/layout/VoiceHealthModal').then((m) => ({ default: m.VoiceHealthModal }))
);

const MilestonePassportModal = React.lazy(() =>
  import('./components/layout/MilestonePassportModal').then((m) => ({ default: m.MilestonePassportModal }))
);

const LessonView = React.lazy(() =>
  import('./components/lesson/LessonView').then((m) => ({ default: m.LessonView }))
);

const ReviewDeck = React.lazy(() =>
  import('./components/srs/ReviewDeck').then((m) => ({ default: m.ReviewDeck }))
);

const EngineTestPanel = React.lazy(() =>
  import('./components/test/EngineTestPanel').then((m) => ({ default: m.EngineTestPanel }))
);

const StudioLayout = React.lazy(() =>
  import('./components/studio/StudioLayout').then((m) => ({ default: m.StudioLayout }))
);

const ImmersionArticleReader = React.lazy(() =>
  import('./components/reader/ImmersionArticleReader').then((m) => ({ default: m.ImmersionArticleReader }))
);

const IdiomExplorer = React.lazy(() =>
  import('./components/idiom/IdiomExplorer').then((m) => ({ default: m.IdiomExplorer }))
);

const PodcastPlayerSheet = React.lazy(() =>
  import('./components/audio/PodcastPlayerSheet').then((m) => ({ default: m.PodcastPlayerSheet }))
);

const ImmersionHub = React.lazy(() =>
  import('./components/layout/ImmersionHub').then((m) => ({ default: m.ImmersionHub }))
);

const VocabLibraryView = React.lazy(() =>
  import('./components/vocab/VocabLibraryView').then((m) => ({ default: m.VocabLibraryView }))
);

const CourseDirectoryView = React.lazy(() =>
  import('./components/directory/CourseDirectoryView').then((m) => ({ default: m.CourseDirectoryView }))
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
    srsCards,
    addVocabToSrs,
    practiceCorrectCount,
    completeLesson,
    recordCardReview,
    updatePreferences,
    completeOnboarding,
    refreshQueue,
    deductHeart,
  } = useUserState();

  // Router View: 'vocab' (HSK 3.0 Library) | 'map' (Course Directory) | 'lesson' (Study) | 'review' (SRS Deck) | etc.
  const [currentView, setCurrentView] = useState<'map' | 'lesson' | 'review' | 'studio' | 'reader' | 'idiom' | 'podcast' | 'immersion' | 'vocab'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'vocab' || params.get('vocab') === '1') {
        return 'vocab';
      }
      if (params.get('view') === 'studio' || params.get('studio') === '1') {
        return 'studio';
      }
      if (params.get('view') === 'review') {
        return 'review';
      }
      if (params.get('view') === 'reader' || params.get('reader') === '1') {
        return 'reader';
      }
      if (params.get('view') === 'idiom' || params.get('idiom') === '1') {
        return 'idiom';
      }
      if (params.get('view') === 'podcast' || params.get('podcast') === '1') {
        return 'podcast';
      }
      if (params.get('view') === 'immersion' || params.get('immersion') === '1') {
        return 'immersion';
      }
    }
    return 'vocab'; // Start with HSK 3.0 Vocab Library or Course Directory
  });
  const [activeLessonId, setActiveLessonId] = useState<string>('t0_u01_l01');
  const [showMobileCourseDrawer, setShowMobileCourseDrawer] = useState<boolean>(false);
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
      userState.progress.completed_lessons.length === 0 &&
      currentView !== 'studio' &&
      currentView !== 'immersion'
    ) {
      setShowWelcomeModal(true);
    }
  }, [userState.progress.onboarding_completed, userState.progress.completed_lessons.length, currentView]);

  // Check In-App WebView & Storage Health
  useEffect(() => {
    if (isInAppBrowser()) {
      setShowInAppAlert(true);
    }
    checkStorageHealth().then(setStorageHealth).catch(() => {});

    // Check URL Trigger ?diagnostics=1 or ?studio=1 or ?view=studio
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('diagnostics') === '1') {
        setShowDevDrawer(true);
      }
      if (params.get('view') === 'studio' || params.get('studio') === '1') {
        setCurrentView('studio');
      }
    }
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
      className="app-shell-desktop"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-rice-paper)',
        color: 'var(--text-ink-primary)',
        width: '100%',
      }}
    >
      {/* Persistent Left Navigation Sidebar (Desktop >= 1024px) */}
      <div className="desktop-only-sidebar">
        <React.Suspense fallback={null}>
          <DesktopSidebar
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            dueCardsCount={srsQueueStatus.total_due_count}
            onOpenPassport={() => setShowPassportModal(true)}
            onOpenTestPanel={() => setShowTestPanel(true)}
            activeLessonId={activeLessonId}
            onSelectLesson={handleSelectLesson}
            completedLessons={userState.progress.completed_lessons}
          />
        </React.Suspense>
      </div>

      {/* Main Workspace Area */}
      <div className="app-main-workspace">
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
          onOpenCourseDrawer={() => setShowMobileCourseDrawer(true)}
        />

        {/* View 0: HSK 3.0 Master Vocabulary Library */}
        {currentView === 'vocab' && (
          <main style={{ flex: 1, width: '100%' }}>
            <React.Suspense
              fallback={
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-ink-secondary)' }}>
                  กำลังเปิดคลังคำศัพท์ HSK 3.0... 📚🐰
                </div>
              }
            >
              <VocabLibraryView
                onBackToDirectory={() => setCurrentView('map')}
                onAddVocabToSrs={async (word) => {
                  await addVocabToSrs([
                    {
                      word_id: word.id,
                      hanzi: word.hanzi,
                      pinyin: word.pinyin,
                      meaning_th: word.meaning_th,
                      meaning_en: word.meaning_en,
                      mnemonic: word.mnemonic_th,
                    },
                  ]);
                }}
                existingSrsHanzis={srsCards.map((c) => c.hanzi)}
              />
            </React.Suspense>
          </main>
        )}

        {/* View 1: Open Course Directory */}
        {currentView === 'map' && (
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <React.Suspense
              fallback={
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-ink-secondary)' }}>
                  กำลังเปิดสารบัญบทเรียน... 📑🐰
                </div>
              }
            >
              <CourseDirectoryView
                onSelectLesson={handleSelectLesson}
                completedLessons={userState.progress.completed_lessons}
                onOpenVocabLibrary={() => setCurrentView('vocab')}
              />
            </React.Suspense>
          </main>
        )}

      {/* View 2: Unit 1 Lesson View */}
      {currentView === 'lesson' && (
        <main style={{ flex: 1 }}>
          <React.Suspense fallback={<LessonViewSkeleton />}>
            <LessonView
              lessonId={activeLessonId}
              silentMode={userState.preferences.silent_mode}
              currentHearts={userState.progress.hearts.current}
              onHeartLost={() => deductHeart(false)}
              onBackToMap={() => setCurrentView('map')}
              onLessonComplete={handleLessonComplete}
              onSelectLesson={(newLessonId) => handleSelectLesson('', newLessonId)}
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

      {/* View 4: Content Authoring Studio (Phase 6) */}
      {currentView === 'studio' && (
        <main style={{ flex: 1 }}>
          <React.Suspense
            fallback={
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-ink-secondary)' }}>
                กำลังจัดเตรียม Hanzero Studio... 🎨🐰
              </div>
            }
          >
            <StudioLayout onExit={() => setCurrentView('map')} />
          </React.Suspense>
        </main>
      )}

      {/* View 5: Smart Immersion Reader (Phase 8 TASK-802) */}
      {currentView === 'reader' && (
        <main style={{ flex: 1 }}>
          <React.Suspense
            fallback={
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-ink-secondary)' }}>
                กำลังจัดเตรียมบทความ Immersion Reader... 📖🐰
              </div>
            }
          >
            <ImmersionArticleReader
              onBack={() => setCurrentView('map')}
              onAddSRS={async (item) => {
                await addVocabToSrs([item]);
              }}
              existingSrsCardIds={srsCards.map((c) => c.card_id)}
              existingSrsHanzis={srsCards.map((c) => c.hanzi)}
            />
          </React.Suspense>
        </main>
      )}

      {/* View 6: 成语 Lore & Dilemma Engine (Phase 8 TASK-803) */}
      {currentView === 'idiom' && (
        <main style={{ flex: 1 }}>
          <React.Suspense
            fallback={
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-ink-secondary)' }}>
                กำลังเปิดม้วนคัมภีร์สำนวนจีน... 📜🐰
              </div>
            }
          >
            <IdiomExplorer
              onBack={() => setCurrentView('map')}
              onAddSRS={async (item) => {
                await addVocabToSrs([item]);
              }}
              existingSrsCardIds={srsCards.map((c) => c.card_id)}
            />
          </React.Suspense>
        </main>
      )}

      {/* View 7: Commute Podcast Mode & Native Speed Ladder (Phase 8 TASK-804) */}
      {currentView === 'podcast' && (
        <main style={{ flex: 1, padding: '16px 12px 32px 12px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <button
            onClick={() => setCurrentView('map')}
            className="btn-tactile-secondary"
            style={{ marginBottom: '14px', minHeight: '40px', padding: '6px 14px' }}
          >
            ← กลับสู่แผนที่ผจญภัย
          </button>
          <React.Suspense
            fallback={
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-ink-secondary)' }}>
                กำลังจัดเตรียมสถานีพอดแคสต์... 🎧🐰
              </div>
            }
          >
            <PodcastPlayerSheet onClose={() => setCurrentView('map')} />
          </React.Suspense>
        </main>
      )}

      {/* View 8: Immersion Quest Hub (Phase 8 Grand Portal TASK-806) */}
      {currentView === 'immersion' && (
        <main style={{ flex: 1 }}>
          <React.Suspense
            fallback={
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-ink-secondary)' }}>
                กำลังเปิดประตูสู่หอวิชาการฮั่นหลิน... 🐉🐰
              </div>
            }
          >
            <ImmersionHub
              onBackToMap={() => setCurrentView('map')}
              onAddSRS={async (item) => {
                await addVocabToSrs([item]);
              }}
              existingSrsCardIds={srsCards.map((c) => c.card_id)}
              existingSrsHanzis={srsCards.map((c) => c.hanzi)}
            />
          </React.Suspense>
        </main>
      )}

      {/* Collapsible Storage & Dev Diagnostics Drawer */}
      {showDevDrawer && (
        <React.Suspense fallback={null}>
          <div style={{ maxWidth: '520px', width: '100%', margin: '0 auto', padding: '0 12px 24px 12px' }}>
            <DevStorageDrawer
              userState={userState}
              storageHealth={storageHealth}
              strokeCacheStatus={strokeCacheStatus}
              defaultOpen={true}
              onInspectStrokeCache={handleInspectStrokeCache}
              onRestoreState={() => {
                window.location.reload();
              }}
              onOpenVoiceHealth={() => setShowVoiceHealthModal(true)}
              onResetOnboarding={() => setShowWelcomeModal(true)}
              onOpenStudio={() => {
                setCurrentView('studio');
                setShowDevDrawer(false);
              }}
            />
            <button
              onClick={() => {
                setCurrentView('immersion');
                setShowDevDrawer(false);
              }}
              className="btn-tactile-primary"
              style={{
                width: '100%',
                marginTop: '8px',
                minHeight: '44px',
                backgroundColor: '#0F172A',
                color: '#F8FAFC',
                border: '1px solid #334155',
              }}
              data-testid="btn-open-immersion-hub"
            >
              🐉 เปิด Immersion Hub (หอวิชาการฮั่นหลิน 翰林院)
            </button>
            <button
              onClick={() => {
                setCurrentView('studio');
                setShowDevDrawer(false);
              }}
              className="btn-tactile-primary"
              style={{ width: '100%', marginTop: '8px', minHeight: '44px' }}
            >
              🎨 เปิด Content Authoring Studio (Phase 6)
            </button>
            <button
              onClick={() => {
                setCurrentView('reader');
                setShowDevDrawer(false);
              }}
              className="btn-tactile-primary"
              style={{
                width: '100%',
                marginTop: '8px',
                minHeight: '44px',
                backgroundColor: 'var(--color-jade-deep, #047857)',
                color: '#FFFFFF',
              }}
            >
              📖 เปิด Smart Immersion Reader (Phase 8)
            </button>
            <button
              onClick={() => {
                setCurrentView('idiom');
                setShowDevDrawer(false);
              }}
              className="btn-tactile-primary"
              style={{
                width: '100%',
                marginTop: '8px',
                minHeight: '44px',
                backgroundColor: 'var(--color-amber-ochre, #D97706)',
                color: '#FFFFFF',
              }}
            >
              📜 เปิด 成语 Lore & Dilemma Engine (TASK-803)
            </button>
            <button
              onClick={() => {
                setCurrentView('podcast');
                setShowDevDrawer(false);
              }}
              className="btn-tactile-primary"
              style={{
                width: '100%',
                marginTop: '8px',
                minHeight: '44px',
                backgroundColor: '#0D9488',
                color: '#FFFFFF',
              }}
            >
              🎧 เปิด Native Speed Ladder & Commute Podcast (TASK-804)
            </button>
            <button
              onClick={() => setShowTestPanel(true)}
              className="btn-tactile-secondary"
              style={{ width: '100%', marginTop: '8px', minHeight: '44px' }}
            >
              🧪 เปิด Engine Test Panel (Lab Sandbox)
            </button>
          </div>
        </React.Suspense>
      )}

      <React.Suspense fallback={null}>
        {/* Daily Completion Celebration Modal */}
        {dailyCelebration.isOpen && (
          <DailyCompletionModal
            isOpen={dailyCelebration.isOpen}
            xpEarnedToday={dailyCelebration.xp}
            streakCount={userState.progress.streak.count}
            onClose={() => setDailyCelebration({ isOpen: false, xp: 0 })}
          />
        )}

        {/* First-Run Welcome / Onboarding Modal */}
        {showWelcomeModal && (
          <WelcomeModal
            isOpen={showWelcomeModal}
            onSelectTrack={async (track, silent) => {
              await completeOnboarding(track, silent);
              setShowWelcomeModal(false);
              if (track === 'tier0') {
                setCurrentView('map');
              } else {
                setActiveLessonId('t1_u01_l01');
                setCurrentView('lesson');
              }
            }}
            onOpenVoiceHealth={() => setShowVoiceHealthModal(true)}
          />
        )}

        {/* Tutu Bunny Voice Health Modal */}
        {showVoiceHealthModal && (
          <VoiceHealthModal
            isOpen={showVoiceHealthModal}
            onClose={() => setShowVoiceHealthModal(false)}
            isSilentMode={userState.preferences.silent_mode}
            onToggleSilentMode={(silent) => updatePreferences({ silent_mode: silent })}
          />
        )}

        {/* Tier 0 Graduation Milestone Passport Modal */}
        {showPassportModal && (
          <MilestonePassportModal
            isOpen={showPassportModal}
            onClose={() => setShowPassportModal(false)}
            userName="นักเรียนฮั่นซีโร่ 🐰"
            streakCount={userState.progress.streak.count}
            totalXp={userState.progress.xp}
          />
        )}

        {/* Mobile Course Tree Drawer */}
        {showMobileCourseDrawer && (
          <MobileLessonDrawer
            isOpen={showMobileCourseDrawer}
            onClose={() => setShowMobileCourseDrawer(false)}
            activeLessonId={activeLessonId}
            onSelectLesson={handleSelectLesson}
            completedLessons={userState.progress.completed_lessons}
            onNavigateView={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </React.Suspense>

      {/* Engine Test Panel Modal */}
      {showTestPanel && (
        <React.Suspense fallback={null}>
          <EngineTestPanel onClose={() => setShowTestPanel(false)} />
        </React.Suspense>
      )}
      </div>
    </div>
  );
};

export default App;

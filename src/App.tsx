import React, { useState, useRef, useEffect } from 'react';
import {
  Flame,
  Heart,
  Sparkles,
  Play,
  ChevronDown,
  ChevronUp,
  Database,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  PenTool,
  BookOpen,
  MessageCircle,
  Award,
} from 'lucide-react';
import bunnyImg from './assets/brand/mascot_bunny.jpg';
import {
  speak,
  playClick,
  playCorrect,
  unlockAudioContext,
  isInAppBrowser,
} from './engines/audio/audioEngine';
import {
  initializeStorage,
  getStoredUserStateSync,
  saveUserState,
  onUserStateChanged,
  getQuickSyncCode,
  restoreFromQuickSyncCode,
  exportSnapshotAsJsonString,
  checkStorageHealth,
  StorageDiagnostics,
  UserStateSchema,
} from './engines/storage';
import { getStrokeCache } from './engines/storage/coldStorage';
import { HanziWriterBox } from './components/hanzi';
import { VocabCard, DialoguePlayer, GrammarBite, QuizContainer, QuizResult } from './components/lesson';
import unit01Data from './data/lessons/tier1/unit01_greetings.json';
import {
  VocabularyItem,
  DialogueLine,
  GrammarBite as GrammarBiteData,
  ToneRule,
  QuizQuestion,
  BossChallenge,
  CheerTrophy,
} from './types/lesson';

const lesson1VocabList = unit01Data.lessons[0].vocabulary as VocabularyItem[];
const lesson1Dialogue = unit01Data.lessons[0].dialogue as DialogueLine[];
const lesson1GrammarBite = unit01Data.lessons[0].grammar_bite as GrammarBiteData;
const lesson1ToneRule = (unit01Data.lessons[0].tone_rule || null) as ToneRule | null;
const lesson1Quizzes = unit01Data.lessons[0].quizzes as QuizQuestion[];
const lesson1Boss = unit01Data.lessons[0].boss_challenge as BossChallenge;
const lesson1Trophy = unit01Data.lessons[0].cheer_trophy as CheerTrophy;

const EngineTestPanel = React.lazy(() =>
  import('./components/test/EngineTestPanel').then((m) => ({ default: m.EngineTestPanel }))
);

export const App: React.FC = () => {
  // Real Storage Engine Integration (Synchronous Fast Boot)
  const [userState, setUserState] = useState<UserStateSchema>(getStoredUserStateSync);
  const [showTestPanel, setShowTestPanel] = useState<boolean>(false);
  const [showInAppAlert, setShowInAppAlert] = useState<boolean>(false);
  const [showDevDrawer, setShowDevDrawer] = useState<boolean>(false);
  const [storageHealth, setStorageHealth] = useState<StorageDiagnostics | null>(null);
  const [copiedSyncCode, setCopiedSyncCode] = useState<boolean>(false);
  const [quickSyncInput, setQuickSyncInput] = useState<string>('');
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Slice 1.4 - 2.5: Interactive Study Tabs
  const [activeTab, setActiveTab] = useState<'vocab' | 'stroke' | 'dialogue' | 'grammar' | 'quiz'>('vocab');
  const [strokeChar, setStrokeChar] = useState<string>('你');
  const [strokeCacheStatus, setStrokeCacheStatus] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState<number>(() =>
    typeof window !== 'undefined'
      ? Math.min(270, Math.max(220, window.innerWidth - 64))
      : 270
  );

  // Slice 2.2: Trilingual VocabCard Stepper Integration
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const currentVocab = lesson1VocabList[vocabIndex] || lesson1VocabList[0];

  const isPlayingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(Math.min(270, Math.max(220, window.innerWidth - 64)));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // 1. In-App browser check
    if (isInAppBrowser()) {
      setShowInAppAlert(true);
    }

    // 2. Initialize storage lifecycle (checks cold mirror & persistent storage)
    initializeStorage().then((state) => {
      setUserState(state);
      checkStorageHealth().then(setStorageHealth);
    });

    // 3. Subscribe to real-time storage changes (cross-tab sync)
    const unsubscribe = onUserStateChanged((newState) => {
      setUserState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Quick State Selectors
  const streak = userState.progress.streak.count;
  const hearts = userState.progress.hearts.current;
  const xp = userState.progress.xp;

  const handleStartLesson = async () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;

    try {
      await unlockAudioContext();
      playCorrect();

      // Award 10 XP on finishing first phrase and persist safely
      const updatedState = {
        ...userState,
        progress: {
          ...userState.progress,
          xp: userState.progress.xp + 10,
          streak: {
            ...userState.progress.streak,
            count: Math.max(userState.progress.streak.count, 1),
            last_active_date: new Date().toISOString().slice(0, 10),
          },
        },
      };

      await saveUserState(updatedState);
      setUserState(updatedState);

      await speak('你好', {
        rate: 0.85,
        onEnd: () => {
          isPlayingRef.current = false;
        },
        onError: () => {
          isPlayingRef.current = false;
        },
      });
    } catch {
      isPlayingRef.current = false;
    }
  };

  const handleCopyQuickSync = () => {
    const code = getQuickSyncCode(userState);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedSyncCode(true);
      setTimeout(() => setCopiedSyncCode(false), 2000);
    }
  };

  const handleRestoreQuickSync = async () => {
    if (!quickSyncInput.trim()) return;
    const res = await restoreFromQuickSyncCode(quickSyncInput.trim());
    if (res.success) {
      setSyncFeedback('✅ กู้คืนข้อมูลสำเร็จ!');
      setQuickSyncInput('');
      setTimeout(() => setSyncFeedback(null), 3000);
    } else {
      setSyncFeedback(`❌ ${res.error ?? 'รหัสไม่ถูกต้อง'}`);
      setTimeout(() => setSyncFeedback(null), 4000);
    }
  };

  const handleDownloadSnapshot = async () => {
    const jsonStr = await exportSnapshotAsJsonString();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hanzero_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStrokeComplete = async () => {
    // Award 10 XP on finishing full character handwriting quiz
    const updatedState = {
      ...userState,
      progress: {
        ...userState.progress,
        xp: userState.progress.xp + 10,
        streak: {
          ...userState.progress.streak,
          count: Math.max(userState.progress.streak.count, 1),
          last_active_date: new Date().toISOString().slice(0, 10),
        },
      },
    };
    await saveUserState(updatedState);
    setUserState(updatedState);
  };

  const handleQuizComplete = async (result: QuizResult) => {
    if (result.passed && result.xpEarned > 0) {
      const updatedState = {
        ...userState,
        progress: {
          ...userState.progress,
          xp: userState.progress.xp + result.xpEarned,
          streak: {
            ...userState.progress.streak,
            count: Math.max(userState.progress.streak.count, 1),
            last_active_date: new Date().toISOString().slice(0, 10),
          },
        },
      };
      await saveUserState(updatedState);
      setUserState(updatedState);
    }
  };

  const handleInspectStrokeCache = async () => {
    const ni = await getStrokeCache('你');
    const hao = await getStrokeCache('好');
    const parts: string[] = [];
    if (ni) parts.push(`"你": ${ni.strokes.length} ขีด (แคช IDB สำเร็จ ✅)`);
    else parts.push('"你": ยังไม่ได้แคช ⏳');
    if (hao) parts.push(`"好": ${hao.strokes.length} ขีด (แคช IDB สำเร็จ ✅)`);
    else parts.push('"好": ยังไม่ได้แคช ⏳');
    setStrokeCacheStatus(parts.join(' | '));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
        padding: '16px 16px calc(90px + env(safe-area-inset-bottom, 0px)) 16px',
        boxSizing: 'border-box',
        gap: '20px',
      }}
    >
      {/* In-App Browser Warning Alert */}
      {showInAppAlert && (
        <aside
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: '#FFFBEB',
            border: '1px solid #F59E0B',
            borderRadius: 'var(--radius-md)',
            fontSize: '12px',
            color: '#92400E',
            lineHeight: 1.4,
          }}
        >
          <AlertTriangle size={16} style={{ flexShrink: 0 }} />
          <span>
            แนะนำเปิดด้วย <strong>Safari</strong> หรือ <strong>Chrome</strong> เพื่อประสบการณ์เสียงที่สมบูรณ์ที่สุด
          </span>
        </aside>
      )}

      {/* Top Capsule Header - Clean Zen Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 8px',
          borderRadius: 'var(--radius-full)',
          flexWrap: 'wrap',
          gap: '6px',
        }}
      >
        {/* Streak Capsule */}
        <div
          className="badge-capsule"
          style={{ backgroundColor: 'var(--color-ochre-surface)', color: 'var(--color-ochre)' }}
        >
          <Flame size={17} color="var(--color-ochre)" fill="var(--color-ochre)" />
          <span>{streak} วัน</span>
        </div>

        {/* Brand Center */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-jade-primary)' }}>
            Hanzero
          </span>
          <span
            style={{
              fontSize: '13px',
              color: 'var(--text-ink-muted)',
              fontWeight: 500,
            }}
          >
            (ฮั่นซีโร่)
          </span>
        </div>

        {/* Stats Right (Hearts, XP & Lab Switch) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            className="badge-capsule"
            style={{ backgroundColor: 'var(--color-vermilion-surface)', color: 'var(--color-vermilion)' }}
          >
            <Heart size={16} color="var(--color-vermilion)" fill="var(--color-vermilion)" />
            <span>{hearts}</span>
          </div>

          <div
            className="badge-capsule"
            style={{ backgroundColor: 'var(--color-jade-surface)', color: 'var(--color-jade-primary)' }}
          >
            <Sparkles size={16} color="var(--color-jade-primary)" />
            <span>{xp}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              setShowTestPanel(true);
            }}
            className="badge-capsule"
            style={{
              backgroundColor: '#F5F1EA',
              color: 'var(--text-ink-secondary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              fontSize: '11px',
              padding: '6px 10px',
              minHeight: '44px',
              minWidth: '44px',
            }}
            title="เปิดห้องทดลองเครื่องยนต์ฮั่นซีโร่ (Engine Test Panel)"
            aria-label="เปิดห้องทดลองเครื่องยนต์"
          >
            <span>🛠️ Lab</span>
          </button>
        </div>
      </header>

      {/* Mascot Companion Greeting */}
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '4px 8px',
        }}
      >
        <img
          src={bunnyImg}
          alt="น้องกระต่ายฮั่นซีโร่"
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 6px 16px rgba(44, 34, 20, 0.08)',
            border: '2px solid #FFFFFF',
            flexShrink: 0,
          }}
        />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-jade-primary)' }}>
            น้องกระต่ายทู่ทู่ (Tùtu) 🐰
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-ink-secondary)', margin: '2px 0 0 0' }}>
            "เริ่มจาก 0 ก็เก่งจีนได้ มาฟังคำแรกกันเถอะ!"
          </p>
        </div>
      </section>

      {/* Interactive Mode Segmented Tabs */}
      <nav
        aria-label="โหมดการเรียนรู้"
        style={{
          display: 'flex',
          backgroundColor: '#EFEBE4',
          borderRadius: 'var(--radius-full)',
          padding: '4px',
          gap: '4px',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('vocab');
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '8px 10px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: activeTab === 'vocab' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'vocab' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
            boxShadow: activeTab === 'vocab' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <BookOpen size={14} />
          <span>คำศัพท์</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('stroke');
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '8px 10px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: activeTab === 'stroke' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'stroke' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
            boxShadow: activeTab === 'stroke' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <PenTool size={14} />
          <span>คัดลายมือ</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('dialogue');
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '8px 10px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: activeTab === 'dialogue' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'dialogue' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
            boxShadow: activeTab === 'dialogue' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <MessageCircle size={14} />
          <span>บทสนทนา</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('grammar');
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '8px 10px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: activeTab === 'grammar' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'grammar' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
            boxShadow: activeTab === 'grammar' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <Sparkles size={14} />
          <span>ไวยากรณ์</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('quiz');
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '8px 10px',
            minHeight: '44px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: activeTab === 'quiz' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'quiz' ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
            boxShadow: activeTab === 'quiz' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <Award size={14} />
          <span>แบบทดสอบ</span>
        </button>
      </nav>

      {/* Main Study Area: Strictly Single Active Tab (No Component Collision) */}

      {/* Tab 1: Vocab Card */}
      {activeTab === 'vocab' && (
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {/* Word Selector Capsule Tabs (Unit 1 Lesson 1 Vocabulary) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexWrap: 'wrap',
              padding: '2px 4px',
            }}
          >
            <span style={{ fontSize: '12px', color: 'var(--text-ink-muted)', fontWeight: 600 }}>
              เลือกคำศัพท์:
            </span>
            {lesson1VocabList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playClick();
                  setVocabIndex(idx);
                }}
                style={{
                  padding: '6px 12px',
                  minHeight: '44px',
                  minWidth: '44px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid',
                  borderColor:
                    vocabIndex === idx ? 'var(--color-jade-primary)' : 'var(--border-subtle)',
                  backgroundColor:
                    vocabIndex === idx ? 'var(--color-jade-surface)' : '#FFFFFF',
                  color:
                    vocabIndex === idx ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {item.hanzi}
              </button>
            ))}
          </div>

          {/* Trilingual VocabCard Component (Golden Template) */}
          <VocabCard
            key={currentVocab.id}
            vocab={currentVocab}
          />
        </main>
      )}

      {/* Tab 2: Hanzi Stroke Practice */}
      {activeTab === 'stroke' && (
        <main
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 16px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Character Switcher Capsule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-ink-muted)', fontWeight: 600 }}>
              เลือกตัวอักษร:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(['你', '好'] as const).map((char) => (
                <button
                  key={char}
                  type="button"
                  onClick={() => {
                    playClick();
                    setStrokeChar(char);
                  }}
                  style={{
                    padding: '8px 14px',
                    minHeight: '44px',
                    minWidth: '44px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid',
                    borderColor: strokeChar === char ? 'var(--color-jade-primary)' : 'var(--border-subtle)',
                    backgroundColor: strokeChar === char ? 'var(--color-jade-surface)' : 'transparent',
                    color: strokeChar === char ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {char} {char === '你' ? '(nǐ)' : '(hǎo)'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Hanzi Writer Canvas in 米字格 (Responsive canvasSize) */}
          <HanziWriterBox
            character={strokeChar}
            size={canvasSize}
            onComplete={handleStrokeComplete}
          />
        </main>
      )}

      {/* Tab 3: Interactive Dialogue Player */}
      {activeTab === 'dialogue' && (
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <DialoguePlayer
            dialogue={lesson1Dialogue}
            title="บทสนทนา 1.1: ทักทายแรกพบ 🐰👋"
          />
        </main>
      )}

      {/* Tab 4: 1-Minute Grammar Bite & Tone Rule */}
      {activeTab === 'grammar' && (
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <GrammarBite
            grammarBite={lesson1GrammarBite}
            toneRule={lesson1ToneRule}
          />
        </main>
      )}

      {/* Tab 5: Interactive Quiz Engine & Boss Challenge */}
      {activeTab === 'quiz' && (
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <QuizContainer
            quizzes={lesson1Quizzes}
            bossChallenge={lesson1Boss}
            cheerTrophy={lesson1Trophy}
            onComplete={handleQuizComplete}
          />
        </main>
      )}

      {/* Collapsible Developer & Diagnostics Sandbox Drawer */}
      <section
        style={{
          marginTop: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          fontSize: '13px',
        }}
      >
        <button
          onClick={() => setShowDevDrawer(!showDevDrawer)}
          style={{
            width: '100%',
            padding: '12px 16px',
            minHeight: '44px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'var(--text-ink-secondary)',
            fontWeight: 600,
            backgroundColor: '#FAFAF9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={16} color="var(--color-jade-primary)" />
            <span>ระบบจัดเก็บข้อมูล & แผงทดสอบ (Tiered Storage)</span>
          </div>
          {showDevDrawer ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showDevDrawer && (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Storage Status */}
            <div
              style={{
                backgroundColor: 'var(--bg-rice-paper)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-jade-primary)', fontWeight: 600 }}>
                <ShieldCheck size={16} />
                <span>สถานะระบบ: {storageHealth?.activeStorageTier.toUpperCase()} TIER READY</span>
              </div>
              <div style={{ color: 'var(--text-ink-secondary)' }}>
                LocalStorage: {storageHealth?.isLocalStorageAvailable ? '✅ ทำงานปกติ' : '❌ ปิดกั้น'} | IndexedDB: {storageHealth?.isIndexedDbAvailable ? '✅ เชื่อมต่อแล้ว' : '❌ ปิดกั้น'}
              </div>
              <div style={{ color: 'var(--text-ink-muted)' }}>
                Safari 7-day ITP Protection: {storageHealth?.isPersisted ? '✅ ป้องกันแล้ว (Persisted)' : 'รอสิทธิ์เบราว์เซอร์'}
              </div>
            </div>

            {/* Quick Sync 1-Tap Code */}
            <div>
              <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
                Emergency Quick Sync Code (รหัสกู้คืนแบบกระชับ)
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  readOnly
                  value={getQuickSyncCode(userState)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-card)',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                <button
                  onClick={handleCopyQuickSync}
                  className="btn-tactile-secondary"
                  style={{ padding: '8px 14px', minHeight: '44px', minWidth: '44px' }}
                >
                  {copiedSyncCode ? <Check size={16} color="var(--color-jade-primary)" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Quick Sync Code Restore */}
            <div>
              <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
                กู้คืนสถานะด้วยรหัส
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="วางรหัส เช่น HZ1-T1-U01..."
                  value={quickSyncInput}
                  onChange={(e) => setQuickSyncInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-card)',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                <button
                  onClick={handleRestoreQuickSync}
                  className="btn-tactile-secondary"
                  style={{ padding: '8px 14px', minHeight: '44px', minWidth: '44px' }}
                >
                  กู้คืน
                </button>
              </div>
              {syncFeedback && (
                <div style={{ fontSize: '12px', marginTop: '4px', color: syncFeedback.startsWith('✅') ? 'var(--color-jade-primary)' : 'var(--color-vermilion)' }}>
                  {syncFeedback}
                </div>
              )}
            </div>

            {/* 1-Click Snapshot JSON */}
            <div>
              <button
                onClick={handleDownloadSnapshot}
                className="btn-tactile-secondary"
                style={{ width: '100%', minHeight: '44px', gap: '6px' }}
              >
                <span>💾 ดาวน์โหลด Full Backup (.JSON)</span>
              </button>
            </div>

            {/* Slice 1.4: IndexedDB Stroke Cache Diagnostics */}
            <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px' }}>
              <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--text-ink-primary)' }}>
                IndexedDB Hanzi Stroke Cache (`hanzi_strokes`)
              </div>
              <button
                onClick={handleInspectStrokeCache}
                className="btn-tactile-secondary"
                style={{ width: '100%', minHeight: '44px', gap: '6px' }}
              >
                <span>🔍 ตรวจสอบสถานะแคชเส้นขีดใน IndexedDB</span>
              </button>
              {strokeCacheStatus && (
                <div
                  style={{
                    marginTop: '6px',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-rice-paper)',
                    fontSize: '11px',
                    color: 'var(--text-ink-secondary)',
                    fontFamily: 'monospace',
                  }}
                >
                  {strokeCacheStatus}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Bottom Sticky Action Dock (Thumb Zone Ergonomics) */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '440px',
          padding: '12px 16px calc(16px + env(safe-area-inset-bottom, 0px)) 16px',
          backgroundColor: 'rgba(251, 249, 245, 0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--border-subtle)',
          boxSizing: 'border-box',
          zIndex: 50,
        }}
      >
        <button
          onClick={handleStartLesson}
          className="btn-tactile-primary"
          style={{ width: '100%', gap: '8px' }}
        >
          <Play size={18} fill="#FFFFFF" />
          <span>เริ่มบทเรียนก้าวแรก (+10 XP)</span>
        </button>
      </footer>

      {/* Engine Test Panel (Lazy Loaded Diagnostics Workbench) */}
      {showTestPanel && (
        <React.Suspense
          fallback={
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'var(--bg-rice-paper)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                gap: '12px',
              }}
            >
              <div className="spinner" />
              <div style={{ fontSize: '14px', color: 'var(--text-ink-secondary)', fontWeight: 600 }}>
                กำลังเปิดห้องทดลองเครื่องยนต์ฮั่นซีโร่ 🐰🔬...
              </div>
            </div>
          }
        >
          <EngineTestPanel onClose={() => setShowTestPanel(false)} />
        </React.Suspense>
      )}
    </div>
  );
};

export default App;

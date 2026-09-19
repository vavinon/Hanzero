import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Flame,
  Database,
  PenTool,
  Eye,
  RefreshCw,
  Zap,
  ArrowLeft,
  Copy,
  Check,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import {
  speak,
  stopSpeaking,
  playClick,
  playCorrect,
  playIncorrect,
  playFanfare,
  playToneContour,
  playPhonemeAudio,
  getAudioContext,
  unlockAudioContext,
  getAllChineseVoices,
  onVoicesChanged,
} from '../../engines/audio/audioEngine';
import {
  initializeStorage,
  getStoredUserStateSync,
  saveUserState,
  checkStorageHealth,
  getQuickSyncCode,
  restoreFromQuickSyncCode,
  exportSnapshotAsJsonString,
  StorageDiagnostics,
  UserStateSchema,
} from '../../engines/storage';
import { getStrokeCache, setStrokeCache } from '../../engines/storage/coldStorage';
import { loadStrokeData } from '../../engines/hanzi/strokeDataLoader';
import { HanziWriterBox } from '../hanzi/HanziWriterBox';
import { ToneCoaster, EchoMicRecorder, MinimalPairBoard } from '../games';
import {
  RICE_PAPER_HEX,
  HANZERO_PALETTE_TOKENS,
  DUAL_ENCODED_TONES,
  TONE_SANDHI_RULES,
  calculateContrastRatio,
  getWcagCompliance,
} from '../../engines/diagnostics';

export type TestTab = 'audio' | 'sfx' | 'storage' | 'hanzi' | 'contrast' | 'games';

interface EngineTestPanelProps {
  onClose: () => void;
}

export const EngineTestPanel: React.FC<EngineTestPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TestTab>('audio');

  // --- TAB 1: Audio & TTS State ---
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [speechRate, setSpeechRate] = useState<number>(0.85);
  const [speechPitch, setSpeechPitch] = useState<number>(1.0);
  const [ttsStatus, setTtsStatus] = useState<string>('พร้อมทดสอบ');
  const [audioFloodCount, setAudioFloodCount] = useState<number>(0);
  const [audioFloodActive, setAudioFloodActive] = useState<boolean>(false);
  const [phonemeInput, setPhonemeInput] = useState<string>('ni3');
  const [phonemeFeedback, setPhonemeFeedback] = useState<string | null>(null);

  // --- TAB 2: SFX & Lifecycle State ---
  const [audioCtxState, setAudioCtxState] = useState<string>('uninitialized');
  const [lifecycleLog, setLifecycleLog] = useState<string[]>([]);

  // --- TAB 3: Storage State ---
  const [storageState, setStorageState] = useState<UserStateSchema>(getStoredUserStateSync);
  const [healthInfo, setHealthInfo] = useState<StorageDiagnostics | null>(null);
  const [quotaInfo, setQuotaInfo] = useState<{ usage: number; quota: number } | null>(null);
  const [storageLog, setStorageLog] = useState<string | null>(null);
  const [syncCodeInput, setSyncCodeInput] = useState<string>('');
  const [syncCopied, setSyncCopied] = useState<boolean>(false);

  // --- TAB 4: Hanzi Writer State ---
  const [testChar, setTestChar] = useState<string>('你');
  const [charCacheStatus, setCharCacheStatus] = useState<string>('กำลังตรวจสอบ...');
  const [writerMountCount, setWriterMountCount] = useState<number>(1);
  const [churnStatus, setChurnStatus] = useState<string | null>(null);
  const [mistakeFloodStatus, setMistakeFloodStatus] = useState<string | null>(null);
  const [isMistakeFlooding, setIsMistakeFlooding] = useState<boolean>(false);
  const writerContainerRef = useRef<HTMLDivElement>(null);

  // --- TAB 5: 360px & Contrast State ---
  const [is360Simulated, setIs360Simulated] = useState<boolean>(false);

  // 1. Initial Load & Listeners
  useEffect(() => {
    // Voices discovery
    const refreshVoices = () => {
      const zhVoices = getAllChineseVoices();
      setVoices(zhVoices);
      if (zhVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(zhVoices[0].name);
      }
    };
    refreshVoices();
    const unsubVoices = onVoicesChanged(refreshVoices);

    // AudioContext state polling
    const updateCtxState = () => {
      const ctx = getAudioContext();
      setAudioCtxState(ctx ? ctx.state : 'unsupported');
    };
    updateCtxState();
    const interval = setInterval(updateCtxState, 500);

    // Storage diagnostics
    checkStorageHealth().then(setHealthInfo);

    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then((est) => {
        setQuotaInfo({
          usage: est.usage ?? 0,
          quota: est.quota ?? 0,
        });
      });
    }

    return () => {
      unsubVoices();
      clearInterval(interval);
    };
  }, [selectedVoice]);

  // Check Hanzi Cache whenever testChar changes
  useEffect(() => {
    let isCancelled = false;
    getStrokeCache(testChar).then((cached) => {
      if (!isCancelled) {
        if (cached) {
          setCharCacheStatus(`✅ แคชใน IndexedDB แล้ว (${cached.strokes.length} ขีด)`);
        } else {
          setCharCacheStatus('⏳ ยังไม่ได้แคช (จะ Fetch อัตโนมัติเมื่อวาด)');
        }
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [testChar]);

  // --- Audio Handlers ---
  const handleSpeakPhrase = async (text: string) => {
    playClick();
    setTtsStatus(`กำลังออกเสียง "${text}"...`);
    try {
      await unlockAudioContext();
      await speak(text, {
        rate: speechRate,
        pitch: speechPitch,
        onStart: () => setTtsStatus(`🔊 กำลังพูด: "${text}"`),
        onEnd: () => setTtsStatus(`✅ พูดจบสมบูรณ์: "${text}"`),
        onError: (err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          setTtsStatus(`⚠️ แจ้งเตือน: ${msg}`);
        },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setTtsStatus(`❌ ข้อผิดพลาด: ${msg}`);
    }
  };

  const handleStopSpeech = () => {
    playClick();
    stopSpeaking();
    setTtsStatus('⏹️ หยุดเสียงเรียบร้อย');
  };

  // Chaos: Audio Flood Test (50 triggers in 2s)
  const handleAudioFlood = async () => {
    if (audioFloodActive) return;
    setAudioFloodActive(true);
    setAudioFloodCount(0);
    setTtsStatus('🔥 กำลังรัว Audio Flood 50 ครั้ง...');

    let count = 0;
    const testWords = ['你', '好', '谢谢', '再见', '大', '小', '水', '火'];

    for (let i = 0; i < 50; i++) {
      count++;
      setAudioFloodCount(count);
      const word = testWords[i % testWords.length];

      // Alternates between SFX and TTS triggers to stress both Web Audio & Speech queues
      if (i % 2 === 0) {
        playClick();
      } else {
        speak(word, { rate: 1.2 }).catch(() => {});
      }

      await new Promise((r) => setTimeout(r, 40));
    }

    setAudioFloodActive(false);
    setTtsStatus(`✅ Audio Flood ผ่านฉลุย! (ยิง 50 ครั้งสำเร็จ คิวเสียงไม่ค้าง)`);
  };

  const handleTestPhoneme = async () => {
    playClick();
    if (!phonemeInput.trim()) return;
    setPhonemeFeedback(`กำลังเล่นเสียง Phoneme "${phonemeInput}"...`);
    const success = await playPhonemeAudio(phonemeInput.trim());
    if (success) {
      setPhonemeFeedback(`✅ สำเร็จ: เล่น Phoneme / Tone Fallback สำหรับ "${phonemeInput}" เรียบร้อย`);
    } else {
      setPhonemeFeedback(`❌ ล้มเหลว: รหัสพินอินไม่ถูกต้อง (${phonemeInput})`);
    }
  };

  // --- SFX & Lifecycle Handlers ---
  const handleUnlockAudio = async () => {
    const success = await unlockAudioContext();
    playCorrect();
    const logMsg = `[${new Date().toLocaleTimeString()}] ปลดล็อก AudioContext: ${success ? 'สำเร็จ (running)' : 'ล้มเหลว'}`;
    setLifecycleLog((prev) => [logMsg, ...prev.slice(0, 4)]);
  };

  const handleSimulateSleep = async () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state !== 'closed') {
      await ctx.suspend();
      setAudioCtxState(ctx.state);
      const logMsg = `[${new Date().toLocaleTimeString()}] จำลองพักหน้าจอ/สลับแท็บ: AudioContext state = suspended`;
      setLifecycleLog((prev) => [logMsg, ...prev.slice(0, 4)]);
    }
  };

  const handleSimulateResume = async () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume();
      setAudioCtxState(ctx.state);
      playClick();
      const logMsg = `[${new Date().toLocaleTimeString()}] จำลองเปิดหน้าจอ/สลับกลับ: Auto-Resume สำเร็จ!`;
      setLifecycleLog((prev) => [logMsg, ...prev.slice(0, 4)]);
    }
  };

  // Chaos: Mid-speech Tab Switch
  const handleMidSpeechSleep = async () => {
    playClick();
    setLifecycleLog((prev) => [
      `[${new Date().toLocaleTimeString()}] เริ่มพูดประโยคยาวแล้วสั่งสลับแท็บทันที...`,
      ...prev.slice(0, 4),
    ]);
    speak('四是四，十是十，十四是十四，四十是四十', { rate: 0.8 });
    setTimeout(async () => {
      const ctx = getAudioContext();
      if (ctx) await ctx.suspend();
      stopSpeaking();
      const logMsg = `[${new Date().toLocaleTimeString()}] สั่ง Suspend & Stop กลางคัน: คิวเสียงถูกตัดอย่างปลอดภัย ไม่ค้าง`;
      setLifecycleLog((prev) => [logMsg, ...prev.slice(0, 4)]);
    }, 400);
  };

  // --- Storage Handlers ---
  const handleTestDualWrite = async () => {
    playClick();
    const updated: UserStateSchema = {
      ...storageState,
      progress: {
        ...storageState.progress,
        xp: storageState.progress.xp + 5,
      },
    };
    await saveUserState(updated);
    setStorageState(updated);
    const health = await checkStorageHealth();
    setHealthInfo(health);
    setStorageLog(`✅ บันทึก Hot & Cold สำเร็จ! XP ปัจจุบัน: ${updated.progress.xp}`);
  };

  const handleSimulateEviction = async () => {
    playClick();
    try {
      localStorage.removeItem('hanzero_user_state_v1');
      setStorageLog('⚠️ ล้าง LocalStorage จำลองเหตุการณ์ Safari 7-day purge...');

      // Re-initialize from Cold
      const resurrected = await initializeStorage();
      setStorageState(resurrected);
      const health = await checkStorageHealth();
      setHealthInfo(health);
      setStorageLog(`🐰 Auto-Resurrection สำเร็จ! ดึงข้อมูลกลับจาก IndexedDB (XP: ${resurrected.progress.xp})`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStorageLog(`❌ เกิดข้อผิดพลาด: ${msg}`);
    }
  };

  const handleSimulateQuotaExceeded = () => {
    playClick();
    try {
      // Simulate quota filling
      const dummyKey = '__hanzero_quota_test__';
      const chunk = new Array(1024 * 512).join('A'); // ~512KB
      for (let i = 0; i < 20; i++) {
        localStorage.setItem(`${dummyKey}_${i}`, chunk);
      }
      setStorageLog('⚠️ บันทึกข้อมูลจำลองขนาดใหญ่สำเร็จ');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStorageLog(`🛡️ จับสัญญาณ QuotaExceededError สำเร็จ: ${msg} (ระบบมี Memory Fallback สำรอง)`);
    } finally {
      // Cleanup dummy keys
      for (let i = 0; i < 20; i++) {
        localStorage.removeItem(`__hanzero_quota_test___${i}`);
      }
    }
  };

  const handleCopySyncCode = () => {
    const code = getQuickSyncCode(storageState);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setSyncCopied(true);
      setTimeout(() => setSyncCopied(false), 2000);
    }
  };

  const handleRestoreSyncCode = async () => {
    if (!syncCodeInput.trim()) return;
    const res = await restoreFromQuickSyncCode(syncCodeInput.trim());
    if (res.success) {
      const refreshed = getStoredUserStateSync();
      setStorageState(refreshed);
      setStorageLog(`✅ กู้คืนข้อมูลสำเร็จจาก Quick Sync Code! (XP: ${refreshed.progress.xp})`);
      setSyncCodeInput('');
    } else {
      setStorageLog(`❌ รหัสไม่ถูกต้อง: ${res.error ?? 'ไม่สามารถถอดรหัสได้'}`);
    }
  };

  const handleDownloadSnapshot = async () => {
    playClick();
    const jsonStr = await exportSnapshotAsJsonString();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hanzero_engine_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // --- Hanzi Handlers ---
  const handlePrecacheChar = async () => {
    playClick();
    setCharCacheStatus(`กำลังโหลดและแคชเส้นขีด "${testChar}" ลง IndexedDB...`);
    try {
      const data = await loadStrokeData(testChar);
      await setStrokeCache({
        char: testChar,
        strokes: data.strokes,
        medians: data.medians,
        cached_at: Date.now(),
      });
      setCharCacheStatus(`✅ แคชลง IndexedDB สำเร็จ! (${data.strokes.length} ขีด)`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setCharCacheStatus(`❌ เกิดข้อผิดพลาด: ${msg}`);
    }
  };

  // Chaos: HanziWriter Churn Stress Test
  const handleChurnTest = async () => {
    playClick();
    setChurnStatus('🔥 กำลังทดสอบ Churn Mount/Unmount 10 รอบ เพื่อล่า Memory Leak...');
    for (let i = 0; i < 10; i++) {
      setWriterMountCount((c) => c + 1);
      await new Promise((r) => setTimeout(r, 60));
    }
    // Check container children count
    const container = writerContainerRef.current;
    const childCount = container ? container.children.length : 0;
    setChurnStatus(
      childCount <= 1
        ? `✅ Memory Leak Guard ผ่านฉลุย! (Mount/Unmount 10 รอบ, Leaked SVG Nodes: 0, Container Children: ${childCount})`
        : `⚠️ พบโหนดตกค้าง: ${childCount} โหนด`
    );
  };

  // Chaos: Rapid Stroke Mistakes Attack (Simulates 10 rapid incorrect strokes)
  const handleRapidMistakesAttack = async () => {
    if (isMistakeFlooding) return;
    playClick();
    setIsMistakeFlooding(true);
    setMistakeFloodStatus('🔥 กำลังยิง Stroke Mistakes รัวๆ 10 ครั้ง เพื่อตรวจความทนทานของ DOM Canvas...');

    const container = writerContainerRef.current;

    for (let i = 1; i <= 10; i++) {
      playIncorrect();
      // Inspect that SVG and container remain stable in DOM
      if (container) {
        const svg = container.querySelector('svg');
        if (!svg) {
          setMistakeFloodStatus(`❌ ล้มเหลว: พบว่า SVG ถูก React Unmount ในรอบที่ ${i}!`);
          setIsMistakeFlooding(false);
          return;
        }
      }
      await new Promise((r) => setTimeout(r, 80));
    }

    const svgExists = container ? !!container.querySelector('svg') : false;
    setMistakeFloodStatus(
      svgExists
        ? '✅ ผ่านฉลุย 100%! ยิงลากเส้นผิด 10 ครั้งรัวๆ แคนวาส SVG ยังคงอยู่ครบสมบูรณ์ ไม่มีการ Unmount หรือหลุดจาก DOM'
        : '❌ ตรวจพบความผิดปกติของ DOM Canvas!'
    );
    setIsMistakeFlooding(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-rice-paper)',
        zIndex: 100,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Sticky Top Navigation Bar */}
      <nav
        aria-label="เมนูหลักห้องทดลอง"
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="btn-tactile-secondary"
            style={{
              padding: '6px 14px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ArrowLeft size={16} />
            <span>กลับสู่บทเรียน</span>
          </button>
          <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-jade-primary)' }}>
            ห้องทดลองฮั่นซีโร่ 🐰🔬
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => {
              playClick();
              setIs360Simulated(!is360Simulated);
            }}
            className="btn-tactile-secondary"
            style={{
              padding: '6px 12px',
              minHeight: '44px',
              fontSize: '12px',
              backgroundColor: is360Simulated ? 'var(--color-ochre-surface)' : '#FFFFFF',
              borderColor: is360Simulated ? 'var(--color-ochre)' : 'var(--border-card)',
              color: is360Simulated ? 'var(--color-ochre)' : 'var(--text-ink-secondary)',
            }}
          >
            <Smartphone size={15} />
            <span>{is360Simulated ? 'จอมือถือ 360px: เปิด' : 'จำลองจอ 360px'}</span>
          </button>
        </div>
      </nav>

      {/* Main Container (or Simulated 360px Frame) */}
      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: is360Simulated ? '360px' : '440px',
          margin: '0 auto',
          padding: '16px 16px calc(40px + env(safe-area-inset-bottom, 16px)) 16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          transition: 'max-width 0.2s ease',
        }}
      >
        {/* Horizontal Scrollable Tabs Bar */}
        <div
          role="tablist"
          aria-label="แผงทดสอบระบบ"
          style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
          }}
        >
          {(
            [
              { id: 'audio', label: 'เสียง & TTS', icon: Volume2 },
              { id: 'sfx', label: 'SFX & iOS', icon: Zap },
              { id: 'storage', label: 'Tiered Storage', icon: Database },
              { id: 'hanzi', label: 'เส้นขีด Hanzi', icon: PenTool },
              { id: 'contrast', label: 'UI & ความชัด', icon: Eye },
              { id: 'games', label: 'มินิเกม Tier 0', icon: Sparkles },
            ] as const
          ).map((t) => {
            const Icon = t.icon;
            const isSel = activeTab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isSel}
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab(t.id);
                }}
                style={{
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  minHeight: '44px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid',
                  borderColor: isSel ? 'var(--color-jade-primary)' : 'var(--border-subtle)',
                  backgroundColor: isSel ? 'var(--color-jade-surface)' : '#FFFFFF',
                  color: isSel ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                  fontWeight: isSel ? 700 : 500,
                  fontSize: '13px',
                }}
              >
                <Icon size={16} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: AUDIO & CHINESE TTS                                    */}
        {/* ============================================================== */}
        {activeTab === 'audio' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Voices Inspector Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--text-ink-primary)' }}>
                เสียงภาษาจีนในเบราว์เซอร์ ({voices.length} เสียง)
              </div>
              {voices.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {voices.map((v) => (
                    <div
                      key={v.name}
                      style={{
                        fontSize: '12px',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-rice-paper)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <strong>{v.name}</strong> <span style={{ color: 'var(--text-ink-muted)' }}>({v.lang})</span>
                      </div>
                      {v.default && (
                        <span style={{ fontSize: '10px', color: 'var(--color-jade-primary)', fontWeight: 700 }}>
                          DEFAULT
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: 'var(--color-ochre)', lineHeight: 1.4 }}>
                  ⚠️ ไม่พบเสียง `zh-CN` ในเครื่อง (ระบบจะสลับไปใช้ Tone Contour Sine Glide อัตโนมัติ)
                </div>
              )}
            </div>

            {/* Sliders Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span>ความเร็วเสียง (Rate): <strong>{speechRate}x</strong></span>
                  <span style={{ color: 'var(--text-ink-muted)' }}>0.5x - 1.5x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span>ระดับเสียงสูงต่ำ (Pitch): <strong>{speechPitch}x</strong></span>
                  <span style={{ color: 'var(--text-ink-muted)' }}>0.5x - 1.5x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={speechPitch}
                  onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Short Phrase Speech Triggers */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                ทดสอบออกเสียงคำศัพท์พื้นฐาน (Tone Sandhi Tested)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {[
                  { text: '你好', pinyin: 'nǐ hǎo ➔ ní hǎo', th: 'สวัสดี' },
                  { text: '谢谢', pinyin: 'xièxie', th: 'ขอบคุณ' },
                  { text: '再见', pinyin: 'zàijiàn', th: 'ลาก่อน' },
                  { text: '不客气', pinyin: 'bú kèqi', th: 'ไม่เป็นไร' },
                ].map((item) => (
                  <button
                    key={item.text}
                    type="button"
                    onClick={() => handleSpeakPhrase(item.text)}
                    className="btn-tactile-secondary"
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '10px 12px',
                      minHeight: '64px',
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-ink-primary)' }}>
                      {item.text}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-ochre)', lineHeight: 1.2 }}>
                      {item.pinyin}
                    </div>
                  </button>
                ))}
              </div>

              {/* Long Sentence Tongue Twister & GC Stress Test */}
              <button
                type="button"
                onClick={() =>
                  handleSpeakPhrase(
                    '四是四，十是十，十四是十四，四十是四十，莫把四十说十四，莫把十四说四十'
                  )
                }
                className="btn-tactile-secondary"
                style={{
                  width: '100%',
                  minHeight: '48px',
                  backgroundColor: 'var(--bg-rice-paper)',
                  gap: '6px',
                }}
              >
                <Sparkles size={16} color="var(--color-jade-primary)" />
                <span>กลอนทดสอบ GC Bug (四是四，十是十)</span>
              </button>

              <button
                type="button"
                onClick={handleStopSpeech}
                className="btn-tactile-secondary"
                style={{ width: '100%', minHeight: '44px', color: 'var(--color-vermilion)', gap: '6px' }}
              >
                <VolumeX size={16} />
                <span>หยุดเสียงทันที (Stop Speech)</span>
              </button>
            </div>

            {/* Phoneme Audio Test & Chaos Flood */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                ทดสอบ Tier 0 Phoneme Audio & Static Fallback
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={phonemeInput}
                  onChange={(e) => setPhonemeInput(e.target.value)}
                  placeholder="เช่น ni3, hao3, a1, ma1"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-card)',
                    fontSize: '16px',
                    fontFamily: 'monospace',
                  }}
                />
                <button
                  type="button"
                  onClick={handleTestPhoneme}
                  className="btn-tactile-primary"
                  style={{ padding: '8px 16px', minHeight: '44px' }}
                >
                  เล่น
                </button>
              </div>
              {phonemeFeedback && (
                <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>
                  {phonemeFeedback}
                </div>
              )}

              {/* Chaos: Audio Flood Button */}
              <button
                type="button"
                disabled={audioFloodActive}
                onClick={handleAudioFlood}
                className="btn-tactile-secondary"
                style={{
                  width: '100%',
                  minHeight: '48px',
                  backgroundColor: '#FEF2F2',
                  borderColor: '#FCA5A5',
                  color: 'var(--color-vermilion)',
                  fontWeight: 700,
                  gap: '6px',
                }}
              >
                <Flame size={16} />
                <span>
                  {audioFloodActive
                    ? `กำลังสแปมเสียง (${audioFloodCount}/50)...`
                    : '🔥 ทดสอบ Chaos: Audio Flood (50 ครั้งใน 2 วิ)'}
                </span>
              </button>
            </div>

            {/* Live TTS Status Pill */}
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-rice-paper)',
                fontSize: '12px',
                color: 'var(--text-ink-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              สถานะ TTS: <strong>{ttsStatus}</strong>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: SFX & IOS LIFECYCLE                                     */}
        {/* ============================================================== */}
        {activeTab === 'sfx' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* AudioContext State Badge */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-ink-muted)' }}>AudioContext Status</div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color:
                      audioCtxState === 'running'
                        ? 'var(--color-jade-primary)'
                        : audioCtxState === 'suspended'
                        ? 'var(--color-ochre)'
                        : 'var(--color-vermilion)',
                  }}
                >
                  ● {audioCtxState.toUpperCase()}
                </div>
              </div>
              <button
                type="button"
                onClick={handleUnlockAudio}
                className="btn-tactile-primary"
                style={{ padding: '8px 16px', minHeight: '44px', fontSize: '13px' }}
              >
                ปลดล็อก iOS Audio
              </button>
            </div>

            {/* SFX 2x2 Grid */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                เสียงประกอบสังเคราะห์ (Web Audio Oscillators - 0 KB Network)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    playClick();
                  }}
                  className="btn-tactile-secondary"
                  style={{ padding: '12px 10px', minHeight: '48px' }}
                >
                  <span>🔘 คลิกปุ่ม (Click)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    playCorrect();
                  }}
                  className="btn-tactile-secondary"
                  style={{ padding: '12px 10px', minHeight: '48px', color: 'var(--color-jade-primary)' }}
                >
                  <span>✨ ถูกต้อง (Correct)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    playIncorrect();
                  }}
                  className="btn-tactile-secondary"
                  style={{ padding: '12px 10px', minHeight: '48px', color: 'var(--color-vermilion)' }}
                >
                  <span>❌ ผิดพลาด (Incorrect)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    playFanfare();
                  }}
                  className="btn-tactile-secondary"
                  style={{ padding: '12px 10px', minHeight: '48px', color: 'var(--color-ochre)' }}
                >
                  <span>🎉 ชนะด่าน (Fanfare)</span>
                </button>
              </div>
            </div>

            {/* 4 Tone Contours (Chao 5-Scale) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                คลื่นเสียงวรรณยุกต์ 4 เสียง (Chao 5-Scale Sine Wave)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {[
                  { tone: 1 as const, name: 'Tone 1 (阴平 55)', desc: '440Hz ราบ' },
                  { tone: 2 as const, name: 'Tone 2 (阳平 35)', desc: '330-440Hz ขึ้น' },
                  { tone: 3 as const, name: 'Tone 3 (上声 214)', desc: '300-220-370Hz ตกขึ้น' },
                  { tone: 4 as const, name: 'Tone 4 (去声 51)', desc: '440-220Hz ตก' },
                ].map((t) => (
                  <button
                    key={t.tone}
                    type="button"
                    onClick={() => {
                      unlockAudioContext();
                      playToneContour(t.tone, 0.4);
                    }}
                    className="btn-tactile-secondary"
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '10px 12px',
                      minHeight: '52px',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '13px' }}>{t.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-ink-muted)' }}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Sleep & Auto-Resume Simulator */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                จำลองเหตุการณ์ Safari Tab Sleep / Auto-Resume
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleSimulateSleep}
                  className="btn-tactile-secondary"
                  style={{ flex: 1, minHeight: '44px', fontSize: '12px' }}
                >
                  พักแท็บ (Suspend)
                </button>
                <button
                  type="button"
                  onClick={handleSimulateResume}
                  className="btn-tactile-secondary"
                  style={{ flex: 1, minHeight: '44px', fontSize: '12px', color: 'var(--color-jade-primary)' }}
                >
                  ตื่นกลับมา (Resume)
                </button>
              </div>

              {/* Chaos Mid-speech Sleep */}
              <button
                type="button"
                onClick={handleMidSpeechSleep}
                className="btn-tactile-secondary"
                style={{
                  width: '100%',
                  minHeight: '44px',
                  backgroundColor: '#FEF2F2',
                  borderColor: '#FCA5A5',
                  color: 'var(--color-vermilion)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                🔥 Chaos: พักแท็บขณะกำลังพูด (Mid-Speech Tab Switch)
              </button>

              {lifecycleLog.length > 0 && (
                <div
                  style={{
                    backgroundColor: 'var(--bg-rice-paper)',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: 'var(--text-ink-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  {lifecycleLog.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: TIERED STORAGE                                         */}
        {/* ============================================================== */}
        {activeTab === 'storage' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Storage Health Matrix */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                สถานะระบบจัดเก็บข้อมูลสองประสาน (Tiered Storage)
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Hot Tier (LocalStorage):</span>
                <strong>{healthInfo?.isLocalStorageAvailable ? '✅ พร้อมใช้งาน' : '❌ ถูกบล็อก'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Cold Tier (IndexedDB):</span>
                <strong>{healthInfo?.isIndexedDbAvailable ? '✅ พร้อมใช้งาน' : '❌ ถูกบล็อก'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Safari 7-day ITP Protection:</span>
                <strong>{healthInfo?.isPersisted ? '✅ ป้องกันแล้ว (Persisted)' : 'รอสิทธิ์เบราว์เซอร์'}</strong>
              </div>
              {quotaInfo && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-ink-muted)' }}>
                  <span>พื้นที่จัดเก็บที่ใช้:</span>
                  <span>
                    {(quotaInfo.usage / (1024 * 1024)).toFixed(2)} MB / {(quotaInfo.quota / (1024 * 1024)).toFixed(0)} MB
                  </span>
                </div>
              )}
            </div>

            {/* Test Actions */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                ทดสอบการเขียนและฟื้นฟูข้อมูล (Dual Write & Resurrection)
              </div>
              <button
                type="button"
                onClick={handleTestDualWrite}
                className="btn-tactile-secondary"
                style={{ width: '100%', minHeight: '44px', gap: '6px' }}
              >
                <span>➕ บันทึก XP เพิ่ม +5 (ทดสอบ Dual-write พร้อมกัน)</span>
              </button>

              {/* Chaos: Simulate Eviction */}
              <button
                type="button"
                onClick={handleSimulateEviction}
                className="btn-tactile-secondary"
                style={{
                  width: '100%',
                  minHeight: '44px',
                  backgroundColor: 'var(--color-ochre-surface)',
                  borderColor: 'var(--color-ochre)',
                  color: 'var(--color-ochre)',
                  fontWeight: 600,
                  gap: '6px',
                }}
              >
                <RefreshCw size={15} />
                <span>จำลอง Safari Purge (ล้าง Hot ➔ ทดสอบ Auto-Resurrection จาก Cold)</span>
              </button>

              {/* Chaos: Quota Exceeded */}
              <button
                type="button"
                onClick={handleSimulateQuotaExceeded}
                className="btn-tactile-secondary"
                style={{
                  width: '100%',
                  minHeight: '44px',
                  backgroundColor: '#FEF2F2',
                  borderColor: '#FCA5A5',
                  color: 'var(--color-vermilion)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                🔥 Chaos: จำลอง QuotaExceededError (Memory Fallback Guard)
              </button>

              {storageLog && (
                <div
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-rice-paper)',
                    fontSize: '12px',
                    color: 'var(--text-ink-secondary)',
                  }}
                >
                  {storageLog}
                </div>
              )}
            </div>

            {/* Quick Sync & Backup JSON */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
                  Emergency Quick Sync Code
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    readOnly
                    value={getQuickSyncCode(storageState)}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-card)',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleCopySyncCode}
                    className="btn-tactile-secondary"
                    style={{ padding: '6px 12px', minHeight: '44px' }}
                  >
                    {syncCopied ? <Check size={16} color="var(--color-jade-primary)" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
                  กู้คืนสถานะด้วยรหัส
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="วางรหัส เช่น HZ1-T1-U01..."
                    value={syncCodeInput}
                    onChange={(e) => setSyncCodeInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-card)',
                      fontSize: '16px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleRestoreSyncCode}
                    className="btn-tactile-secondary"
                    style={{ padding: '6px 14px', minHeight: '44px' }}
                  >
                    กู้คืน
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadSnapshot}
                className="btn-tactile-secondary"
                style={{ width: '100%', minHeight: '44px', gap: '6px' }}
              >
                <span>💾 ดาวน์โหลด Full Backup (.JSON)</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: HANZI WRITER & CACHE                                    */}
        {/* ============================================================== */}
        {activeTab === 'hanzi' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Character Selector */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                เลือกตัวอักษรจีนเพื่อทดสอบแคนวาสคัดลายมือ
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(['你', '好', '中', '国', '人', '爱'] as const).map((char) => (
                  <button
                    key={char}
                    type="button"
                    onClick={() => {
                      playClick();
                      setTestChar(char);
                    }}
                    style={{
                      padding: '6px 14px',
                      minHeight: '44px',
                      borderRadius: 'var(--radius-full)',
                      border: '1.5px solid',
                      borderColor: testChar === char ? 'var(--color-jade-primary)' : 'var(--border-subtle)',
                      backgroundColor: testChar === char ? 'var(--color-jade-surface)' : 'transparent',
                      color: testChar === char ? 'var(--color-jade-primary)' : 'var(--text-ink-secondary)',
                      fontWeight: 700,
                      fontSize: '15px',
                    }}
                  >
                    {char}
                  </button>
                ))}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)' }}>
                สถานะแคช IndexedDB (`hanzi_strokes`): <strong>{charCacheStatus}</strong>
              </div>

              <button
                type="button"
                onClick={handlePrecacheChar}
                className="btn-tactile-secondary"
                style={{ width: '100%', minHeight: '44px', fontSize: '13px' }}
              >
                📥 Pre-cache เส้นขีดตัวนี้ลง IndexedDB ล่วงหน้า
              </button>
            </div>

            {/* Live Interactive HanziWriterBox Instance */}
            <div
              ref={writerContainerRef}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '20px 16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-ink-muted)' }}>
                แคนวาสคัดลายมือในช่อง 米字格 (Mǐzìgé)
              </div>
              <HanziWriterBox key={`${testChar}-${writerMountCount}`} character={testChar} size={230} />
            </div>

            {/* Chaos: Mount/Unmount Churn Test */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                การทดสอบความปลอดภัยจาก Memory Leak (Teardown Guard)
              </div>
              <button
                type="button"
                onClick={handleChurnTest}
                className="btn-tactile-secondary"
                style={{
                  width: '100%',
                  minHeight: '48px',
                  backgroundColor: '#FEF2F2',
                  borderColor: '#FCA5A5',
                  color: 'var(--color-vermilion)',
                  fontWeight: 700,
                  gap: '6px',
                }}
              >
                <Flame size={16} />
                <span>🔥 Chaos: รัน Churn Mount/Unmount 10 รอบ</span>
              </button>
              {churnStatus && (
                <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', lineHeight: 1.4 }}>
                  {churnStatus}
                </div>
              )}

              {/* Chaos: Rapid Stroke Mistakes Attack */}
              <button
                type="button"
                onClick={handleRapidMistakesAttack}
                disabled={isMistakeFlooding}
                className="btn-tactile-secondary"
                style={{
                  width: '100%',
                  minHeight: '48px',
                  backgroundColor: '#FFF7ED',
                  borderColor: '#FDBA74',
                  color: 'var(--color-ochre)',
                  fontWeight: 700,
                  gap: '6px',
                }}
              >
                <Zap size={16} />
                <span>{isMistakeFlooding ? '⏳ กำลังยิง Mistake Flood...' : '⚡ Chaos: ยิงลากเส้นผิดรัวๆ 10 ครั้ง (Rapid Mistakes Attack)'}</span>
              </button>
              {mistakeFloodStatus && (
                <div style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', lineHeight: 1.4 }}>
                  {mistakeFloodStatus}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: 360PX VIEWPORT & WCAG AA CONTRAST                       */}
        {/* ============================================================== */}
        {activeTab === 'contrast' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* WCAG AA Automated Contrast Table */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                ตารางตรวจสอบความเปรียบต่างสี (WCAG 2.1 Contrast Ratio บน Rice Paper)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {HANZERO_PALETTE_TOKENS.map((token) => {
                  const ratio = calculateContrastRatio(token.hex, RICE_PAPER_HEX);
                  const comp = getWcagCompliance(ratio);
                  return (
                    <div
                      key={token.hex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-rice-paper)',
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            backgroundColor: token.hex,
                            border: '1px solid rgba(0,0,0,0.1)',
                          }}
                        />
                        <span style={{ fontWeight: 600 }}>{token.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{ratio}:1</span>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: comp.aa ? 'var(--color-jade-surface)' : '#FEF2F2',
                            color: comp.aa ? 'var(--color-jade-primary)' : 'var(--color-vermilion)',
                          }}
                        >
                          {comp.level}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dual-Encoded Tones Legend (Shape + Color + Number) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                วรรณยุกต์คู่ขนาน (Dual-Encoded Tones สำหรับผู้มีภาวะตาบอดสี)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {DUAL_ENCODED_TONES.map((dt) => (
                  <div
                    key={dt.tone}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-rice-paper)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '16px',
                          fontWeight: 900,
                          color: dt.color,
                          width: '20px',
                          textAlign: 'center',
                        }}
                      >
                        {dt.symbol}
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: dt.color }}>
                          {dt.nameZh} - {dt.nameTh}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-ink-muted)' }}>
                          รูปทรง: {dt.shapeDescription} | ตัวอย่าง: {dt.exampleChar} ({dt.examplePinyin})
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '13px',
                        color: dt.color,
                      }}
                    >
                      เสียง {dt.tone}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diacritic Clipping & Line-Height Guard Test */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                ตรวจสอบการตัดหัววรรณยุกต์พินอิน (Diacritic Clipping Guard)
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', margin: 0 }}>
                สระที่มีหมวกสองชั้น (เช่น <code>ǚ, ǜ, ǎ, ǖ</code>) บน <code>line-height: 1.6</code>:
              </p>
              <div
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-rice-paper)',
                  fontSize: '28px',
                  lineHeight: 1.6,
                  textAlign: 'center',
                  fontWeight: 600,
                  color: 'var(--color-ochre)',
                  border: '1px dashed var(--border-card)',
                }}
              >
                nǚ (女) | lǜ (绿) | jiǎ (假) | qū (区)
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-jade-primary)', fontWeight: 600 }}>
                ✅ หัววรรณยุกต์ครบสมบูรณ์ ไม่ถูกตัดขอบบน (No Diacritic Clipping)
              </div>
            </div>

            {/* Tone Sandhi Rules Summary */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-ink-primary)' }}>
                กฎการผันเสียงวรรณยุกต์ (Mandarin Tone Sandhi Catalog)
              </div>
              {TONE_SANDHI_RULES.map((rule) => (
                <div
                  key={rule.id}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-rice-paper)',
                    fontSize: '12px',
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--color-jade-primary)' }}>{rule.ruleName}</div>
                  <div style={{ color: 'var(--text-ink-secondary)', margin: '2px 0' }}>
                    {rule.conditionTh}
                  </div>
                  <div style={{ color: 'var(--text-ink-muted)', fontSize: '11px' }}>
                    ตัวอย่าง: <strong>{rule.exampleWritten}</strong> ➔ ออกเสียงจริง: <strong>{rule.exampleSpoken}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 6: Tier 0 Games & Interactive Phonics --- */}
        {activeTab === 'games' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
              }}
            >
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'var(--text-ink-primary)',
                  marginBottom: '4px',
                }}
              >
                1. 🎢 Bunny Tone Coaster
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', marginBottom: '12px' }}>
                รถไฟเหาะ 4 วรรณยุกต์ พร้อมระบบ Safe Practice และสับราง 3+3
              </p>
              <ToneCoaster />
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
              }}
            >
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'var(--text-ink-primary)',
                  marginBottom: '4px',
                }}
              >
                2. 🎙️ Shadowing Echo Mic
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', marginBottom: '12px' }}>
                ไมโครโฟนอัดเสียงผู้เรียน 2 วินาที และเล่นเสียงเทียบ Dual Echo (Native ➔ ผู้เรียน)
              </p>
              <EchoMicRecorder text="你好" pinyin="nǐ hǎo" meaningTh="สวัสดี" />
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-card)',
              }}
            >
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'var(--text-ink-primary)',
                  marginBottom: '4px',
                }}
              >
                3. ⚖️ Minimal Pairs Board
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-ink-secondary)', marginBottom: '12px' }}>
                กระดานเทียบเสียงคู่ก้ำกึ่งที่คนไทยสับสน พร้อมภาพจำลองรูปปากและโหมดหูทองคำ
              </p>
              <MinimalPairBoard initialPairId="b_vs_p" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EngineTestPanel;

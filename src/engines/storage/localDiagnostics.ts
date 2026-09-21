/**
 * src/engines/storage/localDiagnostics.ts
 * -----------------------------------------------------------------------------
 * Pure TypeScript Telemetry Engine for Hanzero Local Diagnostics.
 * Zero-Cost, Privacy-First, 100% Client-Side.
 *
 * Implements Bounded Memory & QuotaExceeded Protection:
 * - Max 50 Bottleneck items
 * - Max 50 Recent Error records (FIFO Ring-Buffer)
 * - Safe error handling: never throws, never blocks the main learning UI
 * -----------------------------------------------------------------------------
 */

import { STORAGE_KEYS } from './types';
import type {
  QuestionErrorRecord,
  LearningBottleneckItem,
  DiagnosticsSnapshot,
  UserStateSchema,
} from './types';
import { readHotItemSync, writeHotItemSync, removeHotItemSync } from './hotStorage';

const MAX_BOTTLENECKS = 50;
const MAX_RECENT_ERRORS = 50;

function createDefaultSnapshot(): DiagnosticsSnapshot {
  return {
    schema_version: 1,
    created_at: Date.now(),
    total_errors_recorded: 0,
    bottlenecks: {},
    recent_errors: [],
    audio_usage: {
      silent_mode_toggles: 0,
      normal_plays: 0,
      slow_plays: 0,
    },
  };
}

// In-Memory Cache for fast synchronous telemetry
let cachedSnapshot: DiagnosticsSnapshot | null = null;

/**
 * Loads current telemetry snapshot from Hot Storage with memory fallback
 */
function loadSnapshotSync(): DiagnosticsSnapshot {
  if (cachedSnapshot) {
    return cachedSnapshot;
  }

  const raw = readHotItemSync(STORAGE_KEYS.DIAGNOSTICS);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as DiagnosticsSnapshot;
      if (
        parsed &&
        parsed.schema_version === 1 &&
        typeof parsed.bottlenecks === 'object' &&
        Array.isArray(parsed.recent_errors) &&
        typeof parsed.audio_usage === 'object'
      ) {
        cachedSnapshot = parsed;
        return cachedSnapshot;
      }
    } catch {
      // Corrupted snapshot: fallback to default
    }
  }

  cachedSnapshot = createDefaultSnapshot();
  return cachedSnapshot;
}

/**
 * Persists the current telemetry snapshot to storage with defensive failure handling
 */
function saveSnapshotSync(snapshot: DiagnosticsSnapshot): void {
  cachedSnapshot = snapshot;
  try {
    writeHotItemSync(STORAGE_KEYS.DIAGNOSTICS, JSON.stringify(snapshot));
  } catch (err) {
    console.warn('[Hanzero Diagnostics] Failed to write diagnostics to storage:', err);
  }
}

/**
 * Records a mistake made by the user in a quiz or challenge.
 */
export function recordQuestionError(
  error: Omit<QuestionErrorRecord, 'timestamp'>
): void {
  try {
    const snapshot = loadSnapshotSync();
    const timestamp = Date.now();
    const fullRecord: QuestionErrorRecord = {
      ...error,
      timestamp,
    };

    snapshot.total_errors_recorded += 1;

    // 1. Update or create Bottleneck Entry
    const currentBottleneck = snapshot.bottlenecks[error.question_id];
    if (currentBottleneck) {
      currentBottleneck.error_count += 1;
      currentBottleneck.last_wrong_answer = error.user_wrong_answer;
      currentBottleneck.prompt = error.prompt;
      currentBottleneck.correct_answer = error.correct_answer;
    } else {
      // Check Capacity Guard
      const keys = Object.keys(snapshot.bottlenecks);
      if (keys.length >= MAX_BOTTLENECKS) {
        // Prune the bottleneck item with the lowest error count
        let minKey = keys[0];
        let minCount = snapshot.bottlenecks[minKey].error_count;
        for (const k of keys) {
          if (snapshot.bottlenecks[k].error_count < minCount) {
            minCount = snapshot.bottlenecks[k].error_count;
            minKey = k;
          }
        }
        delete snapshot.bottlenecks[minKey];
      }

      snapshot.bottlenecks[error.question_id] = {
        question_id: error.question_id,
        prompt: error.prompt,
        correct_answer: error.correct_answer,
        error_count: 1,
        last_wrong_answer: error.user_wrong_answer,
      };
    }

    // 2. FIFO Ring Buffer for Recent Errors
    snapshot.recent_errors.push(fullRecord);
    if (snapshot.recent_errors.length > MAX_RECENT_ERRORS) {
      snapshot.recent_errors.shift();
    }

    saveSnapshotSync(snapshot);
  } catch (err) {
    console.warn('[Hanzero Diagnostics] Error recording question error:', err);
  }
}

/**
 * Records an audio usage action (Silent mode toggle, Normal audio play, Slow play).
 */
export function recordAudioModeUsage(
  type: 'silent_toggle' | 'normal_play' | 'slow_play'
): void {
  try {
    const snapshot = loadSnapshotSync();
    if (type === 'silent_toggle') {
      snapshot.audio_usage.silent_mode_toggles += 1;
    } else if (type === 'normal_play') {
      snapshot.audio_usage.normal_plays += 1;
    } else if (type === 'slow_play') {
      snapshot.audio_usage.slow_plays += 1;
    }
    saveSnapshotSync(snapshot);
  } catch (err) {
    console.warn('[Hanzero Diagnostics] Error recording audio mode usage:', err);
  }
}

/**
 * Retrieves the Top N most frequent question bottlenecks.
 */
export function getTopLearningBottlenecks(limit: number = 3): LearningBottleneckItem[] {
  const snapshot = loadSnapshotSync();
  const items = Object.values(snapshot.bottlenecks);
  items.sort((a, b) => b.error_count - a.error_count);
  return items.slice(0, Math.max(1, limit));
}

/**
 * Returns a complete clone of the current diagnostics snapshot.
 */
export function getDiagnosticsSnapshot(): DiagnosticsSnapshot {
  const snapshot = loadSnapshotSync();
  return JSON.parse(JSON.stringify(snapshot)) as DiagnosticsSnapshot;
}

/**
 * Exports current diagnostics as a friendly Markdown summary for Alpha Playtesters (LINE / Discord).
 */
export function exportDiagnosticsMarkdown(userState?: UserStateSchema): string {
  const snapshot = loadSnapshotSync();
  const topBottlenecks = getTopLearningBottlenecks(3);
  const totalAudioPlays = snapshot.audio_usage.normal_plays + snapshot.audio_usage.slow_plays;
  const slowRatio = totalAudioPlays > 0
    ? Math.round((snapshot.audio_usage.slow_plays / totalAudioPlays) * 100)
    : 0;

  const dateStr = new Date(snapshot.created_at).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  let md = `## 🐰📊 [Hanzero Alpha Test Report]\n\n`;
  md += `* **วันที่บันทึก:** ${dateStr}\n`;

  if (userState) {
    md += `* **ระดับผู้เรียน:** Lv.${userState.progress.level} (XP: ${userState.progress.xp})\n`;
    md += `* **เรียนติดต่อกัน (Streak):** ${userState.progress.streak.count} วัน\n`;
    md += `* **บทเรียนที่จบ:** ${userState.progress.completed_lessons.length} บทย่อย\n`;
    md += `* **หัวใจคงเหลือ:** ${userState.progress.hearts.current}/5 ดวง\n`;
  }

  md += `\n### 🎧 สถิติการใช้งานระบบเสียง (Audio Metrics)\n`;
  md += `- สลับโหมดเงียบ (Silent Mode Toggles): ${snapshot.audio_usage.silent_mode_toggles} ครั้ง\n`;
  md += `- ฟังเสียงปกติ: ${snapshot.audio_usage.normal_plays} ครั้ง | ฟังเสียงช้า: ${snapshot.audio_usage.slow_plays} ครั้ง (${slowRatio}%)\n`;

  md += `\n### 🚨 Top 3 จุดติดขัด (Learning Bottlenecks)\n`;
  if (topBottlenecks.length === 0) {
    md += `*ยังไม่มีประวัติการตอบผิด ยอดเยี่ยมมาก! ✨🐰*\n`;
  } else {
    topBottlenecks.forEach((b, idx) => {
      md += `${idx + 1}. **โจทย์:** "${b.prompt}" (ผิด ${b.error_count} ครั้ง)\n`;
      md += `   - เฉลยที่ถูกต้อง: \`${b.correct_answer}\`\n`;
      md += `   - ตอบผิดล่าสุด: \`${b.last_wrong_answer}\`\n`;
    });
  }

  md += `\n---\n*Generated by Hanzero Client-Side Diagnostics Engine* 🐰🌱\n`;
  return md;
}

/**
 * Exports current diagnostics as JSON string for bug attachments.
 */
export function exportDiagnosticsJson(): string {
  const snapshot = loadSnapshotSync();
  return JSON.stringify(snapshot, null, 2);
}

/**
 * Resets diagnostics data completely (for test runs or user account wipe).
 */
export function resetDiagnostics(): void {
  cachedSnapshot = createDefaultSnapshot();
  removeHotItemSync(STORAGE_KEYS.DIAGNOSTICS);
}

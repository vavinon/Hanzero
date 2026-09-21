import { describe, it, expect, beforeEach } from 'vitest';
import {
  recordQuestionError,
  recordAudioModeUsage,
  getTopLearningBottlenecks,
  getDiagnosticsSnapshot,
  exportDiagnosticsMarkdown,
  exportDiagnosticsJson,
  resetDiagnostics,
} from './localDiagnostics';
import { createDefaultUserState } from './types';

describe('Local Diagnostics Engine (Pure Telemetry)', () => {
  beforeEach(() => {
    resetDiagnostics();
  });

  it('initializes with clean default snapshot', () => {
    const snapshot = getDiagnosticsSnapshot();
    expect(snapshot.schema_version).toBe(1);
    expect(snapshot.total_errors_recorded).toBe(0);
    expect(Object.keys(snapshot.bottlenecks).length).toBe(0);
    expect(snapshot.recent_errors.length).toBe(0);
    expect(snapshot.audio_usage.silent_mode_toggles).toBe(0);
  });

  it('records question mistakes and aggregates bottlenecks', () => {
    recordQuestionError({
      question_id: 'q_t1_u01_01',
      unit_id: 'tier1_u01',
      lesson_id: 't1_u01_l01',
      prompt: '你好 แปลว่าอะไร?',
      user_wrong_answer: 'ลาก่อน',
      correct_answer: 'สวัสดี',
      error_type: 'meaning',
    });

    recordQuestionError({
      question_id: 'q_t1_u01_01',
      unit_id: 'tier1_u01',
      lesson_id: 't1_u01_l01',
      prompt: '你好 แปลว่าอะไร?',
      user_wrong_answer: 'ขอบคุณ',
      correct_answer: 'สวัสดี',
      error_type: 'meaning',
    });

    recordQuestionError({
      question_id: 'q_t1_u01_02',
      unit_id: 'tier1_u01',
      lesson_id: 't1_u01_l01',
      prompt: '谢谢 มีวรรณยุกต์เสียงใด?',
      user_wrong_answer: 'เสียง 2',
      correct_answer: 'เสียง 4 + เสียงเบา',
      error_type: 'tone',
    });

    const snapshot = getDiagnosticsSnapshot();
    expect(snapshot.total_errors_recorded).toBe(3);
    expect(snapshot.recent_errors.length).toBe(3);

    const top = getTopLearningBottlenecks(2);
    expect(top.length).toBe(2);
    expect(top[0].question_id).toBe('q_t1_u01_01');
    expect(top[0].error_count).toBe(2);
    expect(top[0].last_wrong_answer).toBe('ขอบคุณ');
    expect(top[1].question_id).toBe('q_t1_u01_02');
    expect(top[1].error_count).toBe(1);
  });

  it('records audio usage stats correctly', () => {
    recordAudioModeUsage('silent_toggle');
    recordAudioModeUsage('silent_toggle');
    recordAudioModeUsage('normal_play');
    recordAudioModeUsage('slow_play');

    const snapshot = getDiagnosticsSnapshot();
    expect(snapshot.audio_usage.silent_mode_toggles).toBe(2);
    expect(snapshot.audio_usage.normal_plays).toBe(1);
    expect(snapshot.audio_usage.slow_plays).toBe(1);
  });

  it('enforces bounded capacity of max 50 recent errors (FIFO Ring Buffer)', () => {
    for (let i = 0; i < 60; i++) {
      recordQuestionError({
        question_id: `q_bulk_${i}`,
        unit_id: 'tier1_u01',
        lesson_id: 't1_u01_l01',
        prompt: `Prompt ${i}`,
        user_wrong_answer: `Wrong ${i}`,
        correct_answer: `Correct ${i}`,
      });
    }

    const snapshot = getDiagnosticsSnapshot();
    expect(snapshot.total_errors_recorded).toBe(60);
    // Recent errors should be capped at 50
    expect(snapshot.recent_errors.length).toBe(50);
    // First element in recent errors should be item #10 (0..9 shifted out)
    expect(snapshot.recent_errors[0].question_id).toBe('q_bulk_10');
    expect(snapshot.recent_errors[49].question_id).toBe('q_bulk_59');
  });

  it('exports valid Markdown and JSON reports', () => {
    recordQuestionError({
      question_id: 'q_t1_u03_01',
      unit_id: 'tier1_u03',
      lesson_id: 't1_u03_l01',
      prompt: '米饭 แปลว่าอะไร?',
      user_wrong_answer: 'บะหมี่',
      correct_answer: 'ข้าวสวย',
    });

    const userState = createDefaultUserState();
    userState.progress.level = 2;
    userState.progress.xp = 150;

    const md = exportDiagnosticsMarkdown(userState);
    expect(md).toContain('🐰📊 [Hanzero Alpha Test Report]');
    expect(md).toContain('Lv.2 (XP: 150)');
    expect(md).toContain('米饭 แปลว่าอะไร?');
    expect(md).toContain('ข้าวสวย');

    const jsonStr = exportDiagnosticsJson();
    const parsed = JSON.parse(jsonStr);
    expect(parsed.total_errors_recorded).toBe(1);
    expect(parsed.schema_version).toBe(1);
  });

  it('resets diagnostics completely', () => {
    recordAudioModeUsage('silent_toggle');
    resetDiagnostics();

    const snapshot = getDiagnosticsSnapshot();
    expect(snapshot.total_errors_recorded).toBe(0);
    expect(snapshot.audio_usage.silent_mode_toggles).toBe(0);
  });
});

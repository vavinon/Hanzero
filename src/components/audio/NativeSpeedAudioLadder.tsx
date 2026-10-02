/**
 * src/components/audio/NativeSpeedAudioLadder.tsx
 * Interactive Speed Ladder & Ambient Soundscape Control Bar.
 *
 * Adheres strictly to AGENTS.md §4 (Warm Modern Oriental Minimalism & Tactile UX).
 */

import React, { useState, useEffect } from 'react';
import { SpeedStep, AmbientSoundscapeId } from '../../types/audio';
import {
  SPEED_STEPS,
  getSpeedStepInfo,
  getGlobalSpeed,
  setGlobalSpeed,
  onSpeedChanged,
  AMBIENT_PRESETS,
  startAmbientSoundscape,
  stopAmbientSoundscape,
  setAmbientVolume,
  getAmbientSoundscapeState,
} from '../../engines/audio/nativeSpeedEngine';
import { playClick } from '../../engines/audio/audioEngine';

export interface NativeSpeedAudioLadderProps {
  currentSpeed?: SpeedStep;
  onSpeedSelect?: (speed: SpeedStep) => void;
  showAmbientControls?: boolean;
  showTagline?: boolean;
  compact?: boolean;
  className?: string;
}

export const NativeSpeedAudioLadder: React.FC<NativeSpeedAudioLadderProps> = ({
  currentSpeed,
  onSpeedSelect,
  showAmbientControls = true,
  showTagline = true,
  compact = false,
  className = '',
}) => {
  const [activeSpeed, setActiveSpeed] = useState<SpeedStep>(currentSpeed || getGlobalSpeed());
  const [ambientPreset, setAmbientPreset] = useState<AmbientSoundscapeId>('none');
  const [ambientVol, setAmbientVol] = useState<number>(0.3);
  const [showAmbientDrawer, setShowAmbientDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (currentSpeed !== undefined) {
      setActiveSpeed(currentSpeed);
    }
  }, [currentSpeed]);

  useEffect(() => {
    const unsub = onSpeedChanged((speed) => {
      setActiveSpeed(speed);
    });

    const ambientState = getAmbientSoundscapeState();
    setAmbientPreset(ambientState.currentPresetId);
    setAmbientVol(ambientState.volume);

    return () => {
      unsub();
    };
  }, []);

  const handleSpeedChange = (step: SpeedStep) => {
    playClick();
    setActiveSpeed(step);
    setGlobalSpeed(step);
    onSpeedSelect?.(step);
  };

  const handleAmbientPresetChange = (presetId: AmbientSoundscapeId) => {
    playClick();
    setAmbientPreset(presetId);
    if (presetId === 'none') {
      stopAmbientSoundscape();
    } else {
      startAmbientSoundscape(presetId, ambientVol);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setAmbientVol(vol);
    setAmbientVolume(vol);
  };

  const currentInfo = getSpeedStepInfo(activeSpeed);

  return (
    <div
      className={`rounded-2xl border border-stone-200/80 bg-white/95 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 ${className}`}
      data-testid="native-speed-ladder"
    >
      {/* Top row: Label & Ambient Trigger */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-stone-500">
            ความเร็วเสียงสมจริง
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
            {currentInfo.label}
          </span>
        </div>

        {showAmbientControls && (
          <button
            type="button"
            onClick={() => {
              playClick();
              setShowAmbientDrawer(!showAmbientDrawer);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all active:scale-95 ${
              ambientPreset !== 'none'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
            title="ตั้งค่าเสียงบรรยากาศ (Ambient Soundscapes)"
            aria-label="ตั้งค่าเสียงบรรยากาศ"
          >
            <span>
              {AMBIENT_PRESETS.find((p) => p.id === ambientPreset)?.icon || '☕'}
            </span>
            <span className="text-[11px]">
              {ambientPreset !== 'none'
                ? AMBIENT_PRESETS.find((p) => p.id === ambientPreset)?.labelZh
                : 'บรรยากาศ'}
            </span>
          </button>
        )}
      </div>

      {/* 4-Step Speed Ladder Segmented Control */}
      <div
        role="group"
        aria-label="เลือกระดับความเร็วเสียง"
        className="grid grid-cols-4 gap-1.5 rounded-xl bg-stone-100/90 p-1"
      >
        {SPEED_STEPS.map((step) => {
          const info = getSpeedStepInfo(step);
          const isSelected = activeSpeed === step;
          return (
            <button
              key={step}
              type="button"
              onClick={() => handleSpeedChange(step)}
              className={`relative flex min-h-[44px] flex-col items-center justify-center rounded-lg px-2 py-1 text-center transition-all active:scale-95 ${
                isSelected
                  ? 'bg-white font-bold text-stone-900 shadow-sm ring-1 ring-stone-900/5'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
              }`}
              style={{
                borderBottom: isSelected ? `2.5px solid ${info.color}` : '2.5px solid transparent',
              }}
              data-testid={`speed-step-${step}`}
              aria-pressed={isSelected}
            >
              <span className="text-sm tracking-tight">{info.label}</span>
              {!compact && (
                <span className="text-[10px] text-stone-600 line-clamp-1">
                  {info.tagline}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Pedagogical Focus Tagline */}
      {showTagline && (
        <div className="mt-2.5 flex items-start gap-1.5 rounded-lg bg-stone-50 px-2.5 py-1.5 text-[11px] text-stone-600">
          <span className="mt-0.5 text-xs text-amber-600">💡</span>
          <p className="leading-relaxed">
            <strong className="text-stone-800 font-semibold">{currentInfo.tagline}: </strong>
            {currentInfo.descriptionTh}
          </p>
        </div>
      )}

      {/* Ambient Soundscapes Drawer */}
      {showAmbientControls && showAmbientDrawer && (
        <div
          className="mt-3 pt-3 border-t border-stone-200/80 transition-all animate-fadeIn"
          data-testid="ambient-drawer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-700">
              เสียงบรรยากาศจำลอง (Ambient Soundscapes)
            </span>
            {ambientPreset !== 'none' && (
              <span className="text-[11px] text-stone-500 font-mono">
                {Math.round(ambientVol * 100)}%
              </span>
            )}
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {AMBIENT_PRESETS.map((preset) => {
              const isCurrent = ambientPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleAmbientPresetChange(preset.id)}
                  className={`flex min-h-[44px] items-center gap-2 rounded-xl p-2 text-left transition-all active:scale-95 ${
                    isCurrent
                      ? 'bg-amber-500/10 text-amber-950 font-semibold ring-1 ring-amber-500/40'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                  data-testid={`ambient-preset-${preset.id}`}
                >
                  <span className="text-lg">{preset.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs truncate">{preset.labelZh}</p>
                    <p className="text-[10px] text-stone-600 truncate">{preset.labelTh}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Ambient Volume Slider */}
          {ambientPreset !== 'none' && (
            <div className="mt-2.5 flex items-center gap-3 px-1">
              <span className="text-xs text-stone-600">ความดัง</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={ambientVol}
                onChange={handleVolumeChange}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-amber-600"
                aria-label="ปรับระดับเสียงบรรยากาศ"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

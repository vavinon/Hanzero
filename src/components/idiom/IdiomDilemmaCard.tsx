/**
 * src/components/idiom/IdiomDilemmaCard.tsx
 * Interactive Corporate & Life Dilemma Simulator Card for 成语 (Chinese Idioms).
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Pure Presentation with decoupled Engine logic
 * - Touch-friendly hit target (>= 48px)
 * - 60fps responsive CSS animations
 * - Multi-sensory feedback (AudioEngine + Visual cues)
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  Briefcase,
  Users,
  Compass,
  Handshake,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Volume2,
  BookmarkCheck,
  Plus,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import type {
  IdiomDilemmaCase,
  IdiomLoreEntry,
  DilemmaEvaluationResult,
  ScenarioCategory,
} from '../../types/idiom';
import {
  evaluateDilemmaChoice,
  createSRSItemFromIdiom,
  getIdiomById,
} from '../../engines/idiom/idiomLoreEngine';
import { speak, playClick, playCorrect, playIncorrect } from '../../engines/audio/audioEngine';

export interface IdiomDilemmaCardProps {
  dilemmaCase: IdiomDilemmaCase;
  parentIdiom?: IdiomLoreEntry;
  onSolve?: (result: DilemmaEvaluationResult) => void;
  onAddSRS?: (srsItem: ReturnType<typeof createSRSItemFromIdiom>) => Promise<void> | void;
  isAddedToSRS?: boolean;
  onNextDilemma?: () => void;
}

const CATEGORY_META: Record<ScenarioCategory, { labelTh: string; icon: React.ComponentType<{ className?: string }> }> = {
  corporate_strategy: { labelTh: 'กลยุทธ์องค์กร', icon: Briefcase },
  crisis_management: { labelTh: 'การบริหารวิกฤต', icon: ShieldAlert },
  team_leadership: { labelTh: 'การนำทีมและบริหารคน', icon: Users },
  personal_dilemma: { labelTh: 'การตัดสินใจในชีวิต', icon: Compass },
  negotiation: { labelTh: 'การเจรจาต่อรอง', icon: Handshake },
};

export const IdiomDilemmaCard: React.FC<IdiomDilemmaCardProps> = ({
  dilemmaCase,
  parentIdiom,
  onSolve,
  onAddSRS,
  isAddedToSRS = false,
  onNextDilemma,
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [evalResult, setEvalResult] = useState<DilemmaEvaluationResult | null>(null);
  const [hasAddedSrs, setHasAddedSrs] = useState<boolean>(isAddedToSRS);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const categoryMeta = CATEGORY_META[dilemmaCase.scenarioCategory] || {
    labelTh: 'สถานการณ์จำลอง',
    icon: Compass,
  };
  const CategoryIcon = categoryMeta.icon;

  const handleSelectChoice = (choiceIdiomId: string) => {
    if (evalResult) return; // Prevent re-selection once submitted
    playClick();
    setSelectedChoiceId(choiceIdiomId);
  };

  const handleSubmit = () => {
    if (!selectedChoiceId) return;

    const result = evaluateDilemmaChoice(dilemmaCase.id, selectedChoiceId);
    setEvalResult(result);

    if (result.isOptimal) {
      playCorrect();
    } else {
      playIncorrect();
    }

    if (onSolve) {
      onSolve(result);
    }
  };

  const handleReset = () => {
    setSelectedChoiceId(null);
    setEvalResult(null);
  };

  const handleSpeakIdiom = (idiomText: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    speak(idiomText, {
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleAddSRS = async () => {
    const idiomEntry = parentIdiom || getIdiomById(selectedChoiceId || '') || getIdiomById(evalResult?.selectedIdiomId || '');
    if (!idiomEntry || !onAddSRS || hasAddedSrs) return;

    playClick();
    const srsItem = createSRSItemFromIdiom(idiomEntry);
    await onAddSRS(srsItem);
    setHasAddedSrs(true);
  };

  return (
    <div
      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 md:p-6 shadow-sm transition-all"
      data-testid="idiom-dilemma-card"
    >
      {/* Category & Badge Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
          <CategoryIcon className="w-3.5 h-3.5" />
          <span>{categoryMeta.labelTh}</span>
        </div>

        {evalResult && (
          <div
            className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold ${
              evalResult.isOptimal
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : evalResult.chosenChoice.nuanceTrap
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
            }`}
          >
            {evalResult.isOptimal ? (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>+30 XP ยอดเยี่ยม</span>
              </>
            ) : evalResult.chosenChoice.nuanceTrap ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>+10 XP ใกล้เคียง</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" />
                <span>0 XP ลองใหม่</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Dilemma Title */}
      <h3 className="text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 mb-3">
        {dilemmaCase.titleTh}
      </h3>

      {/* Situation Parchment Box */}
      <div className="bg-amber-50/60 dark:bg-stone-800/40 border-l-4 border-amber-500 rounded-r-xl p-4 mb-4 text-stone-700 dark:text-stone-300 leading-relaxed text-sm md:text-base">
        <p className="font-sans">{dilemmaCase.situationTh}</p>
      </div>

      {/* Core Question Prompt */}
      <div className="flex items-start gap-2 mb-4 text-stone-800 dark:text-stone-200">
        <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="font-semibold text-sm md:text-base">{dilemmaCase.coreDilemmaQuestionTh}</p>
      </div>

      {/* Choice Options List */}
      <div className="space-y-3 mb-5" role="radiogroup" aria-label="ตัวเลือกกลยุทธ์">
        {dilemmaCase.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.idiomId;
          const isOptimalChoice = choice.isOptimal;

          let choiceStyle = 'border-stone-200 dark:border-stone-700 hover:border-amber-400 bg-white dark:bg-stone-800/70';

          if (evalResult) {
            if (isOptimalChoice) {
              choiceStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium ring-2 ring-emerald-500/20';
            } else if (isSelected && choice.nuanceTrap) {
              choiceStyle = 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 ring-2 ring-amber-500/20';
            } else if (isSelected && !choice.isOptimal) {
              choiceStyle = 'border-rose-400 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
            } else {
              choiceStyle = 'border-stone-200 dark:border-stone-800 opacity-60 bg-stone-50 dark:bg-stone-900/40';
            }
          } else if (isSelected) {
            choiceStyle = 'border-amber-600 bg-amber-50/70 dark:bg-amber-950/40 ring-2 ring-amber-500/30';
          }

          return (
            <div
              key={choice.idiomId}
              role="radio"
              aria-checked={isSelected}
              tabIndex={evalResult ? -1 : 0}
              onClick={() => handleSelectChoice(choice.idiomId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectChoice(choice.idiomId);
                }
              }}
              className={`w-full text-left p-3.5 md:p-4 rounded-xl border transition-all flex items-start gap-3 min-h-[52px] cursor-pointer ${choiceStyle}`}
              data-testid={`choice-${choice.idiomId}`}
            >
              {/* Radio Indicator / Result Icon */}
              <div className="mt-0.5 shrink-0">
                {evalResult ? (
                  isOptimalChoice ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : isSelected && choice.nuanceTrap ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-600" />
                  )
                ) : (
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-stone-300 dark:border-stone-600'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 tracking-wide">
                    {choice.idiom}
                  </span>
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                    {choice.pinyin}
                  </span>
                  <button
                    type="button"
                    title={`ฟังเสียง ${choice.idiom}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakIdiom(choice.idiom);
                    }}
                    className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-snug">
                  {choice.strategyTitleTh}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action / Submit Button (Before Eval) */}
      {!evalResult && (
        <div className="flex justify-end">
          <button
            type="button"
            disabled={!selectedChoiceId}
            onClick={handleSubmit}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm flex items-center gap-2 ${
              selectedChoiceId
                ? 'bg-amber-600 hover:bg-amber-700 active:scale-95 text-white'
                : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
            }`}
            data-testid="submit-dilemma-btn"
          >
            <span>ยืนยันการตัดสินใจ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Result Panel (After Eval) */}
      {evalResult && (
        <div
          className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 animate-fadeIn space-y-4"
          data-testid="dilemma-eval-result"
        >
          {/* Main Feedback Banner */}
          <div
            className={`p-4 rounded-xl border ${
              evalResult.isOptimal
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50'
                : evalResult.chosenChoice.nuanceTrap
                ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50'
            }`}
          >
            <p className="font-semibold text-sm md:text-base text-stone-900 dark:text-stone-100 mb-1">
              {evalResult.feedbackTh}
            </p>
            <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {evalResult.pedagogicalAnalysisTh}
            </p>
          </div>

          {/* Synonym Nuance Comparison Box */}
          {evalResult.synonymNuanceComparison && (
            <div className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl p-3.5 text-xs md:text-sm space-y-1.5">
              <div className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>
                  จุดต่างเชิงนัยยะ: {evalResult.synonymNuanceComparison.optimalIdiom} vs{' '}
                  {evalResult.synonymNuanceComparison.chosenIdiom}
                </span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {evalResult.synonymNuanceComparison.distinctionTh}
              </p>
            </div>
          )}

          {/* Bottom Actions Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap pt-2">
            {/* SRS Button */}
            {onAddSRS && (
              <button
                type="button"
                onClick={handleAddSRS}
                disabled={hasAddedSrs}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  hasAddedSrs
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 cursor-default'
                    : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 active:scale-95'
                }`}
                data-testid="add-srs-btn"
              >
                {hasAddedSrs ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>บันทึกเข้า SRS แล้ว</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>+ บันทึกสำนวนเข้า SRS</span>
                  </>
                )}
              </button>
            )}

            {/* Next / Try Again Actions */}
            <div className="flex items-center gap-2 ml-auto">
              {!evalResult.isOptimal && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  ลองเลือกใหม่
                </button>
              )}

              {onNextDilemma && (
                <button
                  type="button"
                  onClick={onNextDilemma}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white transition-all active:scale-95 shadow-sm"
                  data-testid="next-dilemma-btn"
                >
                  <span>สถานการณ์ถัดไป</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

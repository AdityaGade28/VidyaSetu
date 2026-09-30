import React from 'react';
import { ApplicationStage } from '../../types';
import { Check, Clock, AlertTriangle, Sparkles, FileSearch, CheckCircle2, Award, XCircle, Users } from 'lucide-react';

interface PipelineTrackerProps {
  currentStage: ApplicationStage;
  className?: string;
}

export const PipelineTracker: React.FC<PipelineTrackerProps> = ({ currentStage, className = '' }) => {
  // 7 core stages requested in prompt:
  // Draft → Submitted → AI Review → Deficient/Under Verification → Verified → Selection → Final Decision
  const stages = [
    { key: 'draft', label: '1. Draft', icon: Clock },
    { key: 'submitted', label: '2. Submitted', icon: Clock },
    { key: 'ai_review', label: '3. AI Review', icon: Sparkles },
    { 
      key: 'under_verification', 
      label: currentStage === 'deficient' ? '4. Deficient / Correction' : '4. Verification', 
      icon: currentStage === 'deficient' ? AlertTriangle : FileSearch 
    },
    { key: 'verified', label: '5. Verified', icon: CheckCircle2 },
    { key: 'under_selection', label: '6. Selection', icon: Users },
    { key: 'selected', label: '7. Final Decision', icon: Award }
  ];

  const getStageIndex = (stage: ApplicationStage) => {
    switch (stage) {
      case 'draft': return 0;
      case 'submitted': return 1;
      case 'ai_review': return 2;
      case 'deficient':
      case 'under_verification': return 3;
      case 'verified': return 4;
      case 'under_selection': return 5;
      case 'selected':
      case 'rejected': return 6;
      default: return 0;
    }
  };

  const currentIndex = getStageIndex(currentStage);
  const isRejected = currentStage === 'rejected';

  return (
    <div className={`w-full bg-white border border-slate-200 rounded-lg p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            End-to-End Application Lifecycle
          </h4>
          <p className="text-sm font-semibold text-slate-900 mt-0.5">
            Progress Tracking Pipeline
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Stage <span className="text-blue-700 font-bold">{currentIndex + 1}</span> of {stages.length}
        </div>
      </div>

      <div className="relative">
        {/* Background track line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 hidden md:block" />
        <div 
          className="absolute top-4 left-4 h-0.5 bg-blue-600 transition-all duration-300 hidden md:block"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 95}%` }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 relative z-10">
          {stages.map((st, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isDeficient = isCurrent && currentStage === 'deficient';
            const Icon = isRejected && isCurrent ? XCircle : st.icon;

            return (
              <div 
                key={st.key}
                className="flex flex-col items-center text-center group"
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isRejected && isCurrent
                      ? 'bg-rose-600 text-white ring-4 ring-rose-100'
                      : isDeficient
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <span 
                  className={`mt-2 text-xs font-semibold leading-tight ${
                    isRejected && isCurrent
                      ? 'text-rose-700 font-bold'
                      : isDeficient
                      ? 'text-amber-700 font-bold'
                      : isCurrent
                      ? 'text-blue-700 font-bold'
                      : isCompleted
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {st.label}
                </span>

                <span className="text-[10px] text-slate-500 mt-0.5">
                  {isCompleted ? 'Completed' : isCurrent ? (isDeficient ? 'Correction Required' : 'Active') : 'Upcoming'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

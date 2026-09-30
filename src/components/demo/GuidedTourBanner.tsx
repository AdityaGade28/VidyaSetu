import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ArrowLeft, X, CheckCircle, Info } from 'lucide-react';

export const GuidedTourBanner: React.FC = () => {
  const { 
    guidedTourStep, 
    nextGuidedTourStep, 
    prevGuidedTourStep, 
    exitGuidedTour,
    jumpToTourStep 
  } = useApp();

  if (guidedTourStep === null) return null;

  const tourSteps = [
    {
      title: 'Step 1: Applicant Profile & Deficiency Alert',
      summary: 'Applicant Rahul Patil notices a deficiency flagged on his ST Community Certificate (initial abbreviation "Rahul P.").',
      actionPrompt: 'Click "Next" to navigate to the Deficiency & Correction screen to see the student resolution workflow.',
      roleBadge: 'Applicant View'
    },
    {
      title: 'Step 2: Deficiency & Resubmission Workflow',
      summary: 'Student reviews officer query, uploads SDM Gazette clarification affidavit, and clicks "Submit Corrected Document".',
      actionPrompt: 'Click "Next" to switch to the Verification Officer Command Center.',
      roleBadge: 'Applicant View'
    },
    {
      title: 'Step 3: AI Document Intelligence Engine',
      summary: 'Side-by-side OCR entity extraction, comparison between application declaration and document text, and explainability reasoning.',
      actionPrompt: 'Click "Next" to view the Verification Officer Queue & Decision Desk.',
      roleBadge: 'Verification Officer'
    },
    {
      title: 'Step 4: Verification Officer Clearance',
      summary: 'Officer inspects the resolution, applies eligibility checklist, and clicks "Verify Application". Notice: "AI assists verification. Authorized officers make final decisions."',
      actionPrompt: 'Click "Next" to transition into the Selection Committee Bench.',
      roleBadge: 'Verification Officer'
    },
    {
      title: 'Step 5: Selection Committee Deliberation',
      summary: 'Transparent merit scoring based on NIRF rank, academic score, and research proposal without black-box opaque AI ranking.',
      actionPrompt: 'Click "Next" to access the National Ministry Administration Dashboard.',
      roleBadge: 'Selection Committee'
    },
    {
      title: 'Step 6: Ministry Executive Monitoring & Analytics',
      summary: 'High-level synthetic KPI metrics, state-wise tribal allocation, deficiency categories, and audit trail of all platform actors.',
      actionPrompt: 'Click "Next" to inspect Scheme Configuration.',
      roleBadge: 'Ministry Admin'
    },
    {
      title: 'Step 7: Configurable Scheme Management',
      summary: 'Administrators configure eligibility rules, required documents, quota slots, and grace periods with zero code changes.',
      actionPrompt: 'End of tour! You can now freely explore or switch roles anytime.',
      roleBadge: 'Ministry Admin'
    }
  ];

  const currentStepData = tourSteps[guidedTourStep];

  return (
    <div className="bg-slate-900 border-b border-indigo-500/40 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Step Progress & Info */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shrink-0 mt-0.5 shadow-xs">
            <Sparkles className="w-5 h-5 text-indigo-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Product Story Tour · Stage {guidedTourStep + 1} of {tourSteps.length}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-700/60 text-indigo-200 font-medium">
                {currentStepData.roleBadge}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              {currentStepData.title}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              {currentStepData.summary} <span className="text-indigo-200 font-medium">{currentStepData.actionPrompt}</span>
            </p>
          </div>
        </div>

        {/* Step Navigation Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          
          {/* Quick jump dots */}
          <div className="hidden sm:flex items-center gap-1 mr-2">
            {tourSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => jumpToTourStep(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  guidedTourStep === idx ? 'bg-indigo-400 w-6' : 'bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Jump to stage ${idx + 1}`}
              />
            ))}
          </div>

          {guidedTourStep > 0 && (
            <button
              onClick={prevGuidedTourStep}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          <button
            onClick={nextGuidedTourStep}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-900 bg-indigo-300 hover:bg-indigo-200 rounded-md shadow-xs transition-colors"
          >
            <span>{guidedTourStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Stage'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={exitGuidedTour}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            title="Exit Tour"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};

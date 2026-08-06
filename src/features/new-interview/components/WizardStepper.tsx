import { Check } from 'lucide-react';
import { useNewInterviewWizard } from '../context/NewInterviewWizardContext';
import { cn } from '../../../lib/utils';

export const WIZARD_STEPS = [
  { id: 0, title: 'Resume Upload', description: 'Upload PDF / DOCX' },
  { id: 1, title: 'Target JD',      description: 'Requirements & Role' },
  { id: 2, title: 'Parameters',     description: 'Rigor & Skills' },
  { id: 3, title: 'Review & Launch',description: 'Mission Briefing' },
];

export function WizardStepper() {
  const { currentStep, setCurrentStep } = useNewInterviewWizard();

  return (
    <div className="w-full">
      {/* Step Indicator Row */}
      <nav aria-label="Progress" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {WIZARD_STEPS.map((step) => {
          const isComplete = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isClickable = isComplete || isActive;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => isClickable && setCurrentStep(step.id)}
              disabled={!isClickable}
              className={cn(
                'group flex items-center gap-3 p-3 rounded-xl border text-left transition-all',
                isActive
                  ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/20'
                  : isComplete
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-[var(--border)] bg-[var(--surface-raised)] opacity-60 cursor-not-allowed',
              )}
            >
              <div
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-mono font-bold transition-all',
                  isComplete
                    ? 'bg-emerald-500 text-white'
                    : isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-[var(--border)] text-[var(--text-muted)]',
                )}
              >
                {isComplete ? <Check className="h-4 w-4 stroke-[3]" /> : step.id + 1}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[var(--text-primary)] truncate">{step.title}</p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">{step.description}</p>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useNewInterviewWizard } from '../context/NewInterviewWizardContext';
import { WIZARD_STEPS } from './WizardStepper';

interface WizardFooterProps {
  canProceed: boolean;
  onNext?: () => void;
}

export function WizardFooter({ canProceed, onNext }: WizardFooterProps) {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, resetWizard } = useNewInterviewWizard();

  const handleCancel = () => {
    resetWizard();
    navigate('/dashboard');
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isFinalStep = currentStep === WIZARD_STEPS.length - 1;

  return (
    <div className="card-content p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Left side: Cancel & Previous */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCancel}
          className="flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-all"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>

        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--border-strong)] transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>
      </div>

      {/* Right side: Step counter & Next Step button */}
      <div className="flex items-center gap-4 justify-between sm:justify-end">
        <span className="text-xs font-mono text-[var(--text-muted)]">
          Step <span className="font-bold text-[var(--text-primary)]">{currentStep + 1}</span> of {WIZARD_STEPS.length}
        </span>

        {!isFinalStep && (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/25 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <span>Next Step</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useWizard } from '../contexts/WizardContext';

interface WizardNavigationProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onCancel?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  showPrevious?: boolean;
}

export function WizardNavigation({
  onNext,
  onPrevious,
  onCancel,
  nextLabel = 'Next Step',
  previousLabel = 'Previous',
  showPrevious = true,
}: WizardNavigationProps) {
  const navigate = useNavigate();
  const { state, nextStep, previousStep } = useWizard();
  const isFirstStep = state.currentStep === 1;

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      previousStep();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-700">
      {/* Left side - Cancel / Previous */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleCancel}
          variant="ghost"
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          Cancel
        </Button>
        
        {showPrevious && !isFirstStep && (
          <Button
            onClick={handlePrevious}
            variant="ghost"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {previousLabel}
          </Button>
        )}
      </div>

      {/* Right side - Next */}
      <Button
        onClick={handleNext}
        disabled={!state.isValid}
        className="min-w-[120px]"
      >
        {nextLabel}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
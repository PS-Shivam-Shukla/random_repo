import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  NewInterviewWizardProvider,
  useNewInterviewWizard,
} from './context/NewInterviewWizardContext';
import { StepResume } from './components/StepResume';
import { StepJobDescription } from './components/StepJobDescription';
import { StepConfiguration } from './components/StepConfiguration';
import { StepReview } from './components/StepReview';
import { WizardStepper } from './components/WizardStepper';
import { WizardFooter } from './components/WizardFooter';

function NewInterviewWizardContent() {
  const {
    currentStep,
    resumeUploadSuccess,
    resumeId,
    jdUploadSuccess,
    jdId,
    config,
  } = useNewInterviewWizard();

  const stepComponent = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <StepResume />;
      case 1:
        return <StepJobDescription />;
      case 2:
        return <StepConfiguration />;
      case 3:
        return <StepReview />;
      default:
        return <StepResume />;
    }
  }, [currentStep]);

  const canProceed = useMemo(() => {
    if (currentStep === 0) {
      return Boolean(resumeUploadSuccess || resumeId);
    }
    if (currentStep === 1) {
      return Boolean(jdUploadSuccess || jdId);
    }
    if (currentStep === 2) {
      return Boolean(
        (config.role || 'Staff Frontend Architect') &&
          (config.experienceLevel || 'Senior') &&
          (config.difficulty || 'Standard') &&
          (config.rounds?.length ?? 0) > 0,
      );
    }
    return true;
  }, [currentStep, resumeUploadSuccess, resumeId, jdUploadSuccess, jdId, config]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <PageHeader
        title="Create New AI Interview Session"
        description="Walk through the 4-step setup wizard to upload your resume, define target job requirements, and configure your simulation."
      />

      {/* Stepper Card */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/90">
        <WizardStepper />
      </div>

      {/* Step Content Area with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {stepComponent}
        </motion.div>
      </AnimatePresence>

      {/* Footer Actions */}
      <WizardFooter canProceed={canProceed} />
    </div>
  );
}

export function NewInterviewPage() {
  return (
    <NewInterviewWizardProvider>
      <NewInterviewWizardContent />
    </NewInterviewWizardProvider>
  );
}

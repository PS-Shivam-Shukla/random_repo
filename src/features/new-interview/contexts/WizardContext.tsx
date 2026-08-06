import { createContext, useContext, useReducer, type ReactNode } from 'react';

// Wizard Step Definition
export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

// Wizard State
export interface WizardState {
  currentStep: number;
  steps: WizardStep[];
  resumeFile: File | null;
  jobDescription: string;
  configuration: {
    role?: string;
    experience?: string;
    difficulty?: string;
    duration?: number;
    interviewType?: string;
    company?: string;
    language?: string;
  };
  isValid: boolean;
}

// Wizard Actions
type WizardAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SET_RESUME_FILE'; file: File | null }
  | { type: 'SET_JOB_DESCRIPTION'; text: string }
  | { type: 'SET_CONFIGURATION'; config: Partial<WizardState['configuration']> }
  | { type: 'MARK_STEP_COMPLETE'; step: number }
  | { type: 'SET_STEP_VALIDITY'; isValid: boolean };

// Initial State
const initialSteps: WizardStep[] = [
  { id: 1, title: 'Resume', description: 'Upload your resume', isComplete: false, isActive: true },
  { id: 2, title: 'Job Description', description: 'Provide job details', isComplete: false, isActive: false },
  { id: 3, title: 'Configuration', description: 'Interview settings', isComplete: false, isActive: false },
  { id: 4, title: 'Review', description: 'Final review', isComplete: false, isActive: false },
];

const initialState: WizardState = {
  currentStep: 1,
  steps: initialSteps,
  resumeFile: null,
  jobDescription: '',
  configuration: {},
  isValid: false,
};

// Reducer
function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'NEXT_STEP': {
      if (state.currentStep >= state.steps.length) return state;
      
      const newStep = state.currentStep + 1;
      const updatedSteps = state.steps.map(step => ({
        ...step,
        isComplete: step.id < newStep,
        isActive: step.id === newStep,
      }));

      return {
        ...state,
        currentStep: newStep,
        steps: updatedSteps,
        isValid: false, // Reset validity for new step
      };
    }

    case 'PREVIOUS_STEP': {
      if (state.currentStep <= 1) return state;
      
      const newStep = state.currentStep - 1;
      const updatedSteps = state.steps.map(step => ({
        ...step,
        isComplete: step.id < newStep,
        isActive: step.id === newStep,
      }));

      return {
        ...state,
        currentStep: newStep,
        steps: updatedSteps,
        isValid: true, // Previous steps are assumed valid
      };
    }

    case 'GO_TO_STEP': {
      const newStep = Math.max(1, Math.min(action.step, state.steps.length));
      const updatedSteps = state.steps.map(step => ({
        ...step,
        isComplete: step.id < newStep,
        isActive: step.id === newStep,
      }));

      return {
        ...state,
        currentStep: newStep,
        steps: updatedSteps,
      };
    }

    case 'SET_RESUME_FILE':
      return {
        ...state,
        resumeFile: action.file,
        isValid: action.file !== null,
      };

    case 'SET_JOB_DESCRIPTION':
      return {
        ...state,
        jobDescription: action.text,
        isValid: action.text.trim().length > 0,
      };

    case 'SET_CONFIGURATION':
      return {
        ...state,
        configuration: { ...state.configuration, ...action.config },
      };

    case 'MARK_STEP_COMPLETE': {
      const updatedSteps = state.steps.map(step =>
        step.id === action.step ? { ...step, isComplete: true } : step
      );
      return { ...state, steps: updatedSteps };
    }

    case 'SET_STEP_VALIDITY':
      return { ...state, isValid: action.isValid };

    default:
      return state;
  }
}

// Context
interface WizardContextValue {
  state: WizardState;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  setResumeFile: (file: File | null) => void;
  setJobDescription: (text: string) => void;
  setConfiguration: (config: Partial<WizardState['configuration']>) => void;
  markStepComplete: (step: number) => void;
  setStepValidity: (isValid: boolean) => void;
}

const WizardContext = createContext<WizardContextValue | undefined>(undefined);

// Provider
export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const value: WizardContextValue = {
    state,
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    previousStep: () => dispatch({ type: 'PREVIOUS_STEP' }),
    goToStep: (step) => dispatch({ type: 'GO_TO_STEP', step }),
    setResumeFile: (file) => dispatch({ type: 'SET_RESUME_FILE', file }),
    setJobDescription: (text) => dispatch({ type: 'SET_JOB_DESCRIPTION', text }),
    setConfiguration: (config) => dispatch({ type: 'SET_CONFIGURATION', config }),
    markStepComplete: (step) => dispatch({ type: 'MARK_STEP_COMPLETE', step }),
    setStepValidity: (isValid) => dispatch({ type: 'SET_STEP_VALIDITY', isValid }),
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

// Hook
export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider');
  }
  return context;
}
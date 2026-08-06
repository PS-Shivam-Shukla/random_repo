import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export interface InterviewConfig {
  role: string;
  experienceLevel: string;
  difficulty: string;
  interviewType: string;
  duration: string;
  rounds: string[];
  selectedSkills: string[];
}

export interface ParsedResumeData {
  skills: string[];
  senioritySignal: string;
  rawTextPreview?: string;
}

interface WizardState {
  currentStep: number;
  resumeFile: File | null;
  resumeFileName: string;
  resumeFileSize: number | null;
  resumeId: string | null;
  resumeUploadSuccess: boolean;
  parsedResume: ParsedResumeData | null;
  jdText: string;
  jdFileName: string;
  jdId: string | null;
  jdUploadSuccess: boolean;
  config: InterviewConfig;
}

interface WizardContextValue extends WizardState {
  setCurrentStep: (step: number) => void;
  setResumeFile: (file: File | null, name?: string, size?: number) => void;
  setResumeId: (id: string | null) => void;
  setResumeUploadSuccess: (value: boolean) => void;
  setParsedResume: (data: ParsedResumeData | null) => void;
  removeResumeFile: () => void;
  setJobDescription: (text: string, fileName?: string) => void;
  setJdId: (id: string | null) => void;
  setJdUploadSuccess: (value: boolean) => void;
  updateConfig: (changes: Partial<InterviewConfig>) => void;
  resetWizard: () => void;
}

const initialConfig: InterviewConfig = {
  role: 'Senior Backend Engineer',
  experienceLevel: 'Senior',
  difficulty: 'Standard',
  interviewType: 'Technical Architecture',
  duration: '45',
  rounds: ['HR Round', 'Technical Round', 'System Design Round'],
  selectedSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Asyncio', 'Redis', 'System Architecture'],
};

const initialState: WizardState = {
  currentStep: 0,
  resumeFile: null,
  resumeFileName: '',
  resumeFileSize: null,
  resumeId: null,
  resumeUploadSuccess: false,
  parsedResume: null,
  jdText: '',
  jdFileName: '',
  jdId: null,
  jdUploadSuccess: false,
  config: initialConfig,
};

const WizardContext = createContext<WizardContextValue | undefined>(undefined);

export function NewInterviewWizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(initialState);

  const value = useMemo<WizardContextValue>(
    () => ({
      ...state,
      setCurrentStep: (step) => setState((prev) => ({ ...prev, currentStep: step })),
      setResumeFile: (file, name, size) =>
        setState((prev) => ({
          ...prev,
          resumeFile: file,
          resumeFileName: name ?? (file?.name || prev.resumeFileName),
          resumeFileSize: size ?? (file?.size || prev.resumeFileSize),
          resumeUploadSuccess: false,
          resumeId: null,
          parsedResume: null,
        })),
      setResumeId: (id) => setState((prev) => ({ ...prev, resumeId: id })),
      setResumeUploadSuccess: (value) => setState((prev) => ({ ...prev, resumeUploadSuccess: value })),
      setParsedResume: (data) => setState((prev) => ({ ...prev, parsedResume: data })),
      removeResumeFile: () =>
        setState((prev) => ({
          ...prev,
          resumeFile: null,
          resumeFileName: '',
          resumeFileSize: null,
          resumeId: null,
          resumeUploadSuccess: false,
          parsedResume: null,
        })),
      setJobDescription: (text, fileName) =>
        setState((prev) => ({
          ...prev,
          jdText: text,
          jdFileName: fileName ?? prev.jdFileName,
          jdUploadSuccess: false,
          jdId: null,
        })),
      setJdId: (id) => setState((prev) => ({ ...prev, jdId: id })),
      setJdUploadSuccess: (value) => setState((prev) => ({ ...prev, jdUploadSuccess: value })),
      updateConfig: (changes) =>
        setState((prev) => ({
          ...prev,
          config: { ...prev.config, ...changes },
        })),
      resetWizard: () => setState(initialState),
    }),
    [state],
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useNewInterviewWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useNewInterviewWizard must be used inside NewInterviewWizardProvider');
  }
  return context;
}

import { create } from 'zustand';
import { AIState, Interview, LiveInterviewMetrics, TranscriptEntry } from '../types/interview.types';

export type MicStatus = 'OFF' | 'REQUESTING' | 'ON' | 'ERROR';

interface InterviewState {
  activeInterview: Interview | null;
  aiState: AIState;
  isMuted: boolean;
  isPaused: boolean;
  micStatus: MicStatus;
  micLevel: number;
  wsConnected: boolean;
  latencyMs: number;
  transcriptEntries: TranscriptEntry[];
  metrics: LiveInterviewMetrics;

  setActiveInterview: (interview: Interview | null) => void;
  setAIState: (aiState: AIState) => void;
  setIsMuted: (isMuted: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setMicStatus: (status: MicStatus) => void;
  setMicLevel: (micLevel: number) => void;
  setWsConnected: (wsConnected: boolean) => void;
  setLatencyMs: (latencyMs: number) => void;
  addTranscriptEntry: (entry: TranscriptEntry) => void;
  setTranscriptEntries: (entries: TranscriptEntry[]) => void;
  updateMetrics: (metrics: Partial<LiveInterviewMetrics>) => void;
  resetSession: () => void;
}

const initialMetrics: LiveInterviewMetrics = {
  wpm: 145,
  silenceSeconds: 1.2,
  latencyMs: 120,
  speechQualityScore: 94,
  answerQualityScore: 92,
  technicalScore: 95,
  communicationScore: 90,
  confidenceScore: 94,
  currentDifficulty: 'ADAPTIVE',
  currentCompetency: 'System Architecture & Concurrency',
  timeElapsedSeconds: 0,
};

export const useInterviewStore = create<InterviewState>((set) => ({
  activeInterview: null,
  aiState: 'IDLE',
  isMuted: false,
  isPaused: false,
  micStatus: 'OFF',
  micLevel: 0,
  wsConnected: false,
  latencyMs: 120,
  transcriptEntries: [],
  metrics: initialMetrics,

  setActiveInterview: (activeInterview) => set({ activeInterview }),
  setAIState: (aiState) => set({ aiState }),
  setIsMuted: (isMuted) => set({ isMuted }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setMicStatus: (micStatus) => set({ micStatus }),
  setMicLevel: (micLevel) => set({ micLevel }),
  setWsConnected: (wsConnected) => set({ wsConnected }),
  setLatencyMs: (latencyMs) => set({ latencyMs }),

  addTranscriptEntry: (entry) =>
    set((state) => ({
      transcriptEntries: [...state.transcriptEntries, entry],
    })),

  setTranscriptEntries: (transcriptEntries) => set({ transcriptEntries }),

  updateMetrics: (newMetrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics },
    })),

  resetSession: () =>
    set({
      activeInterview: null,
      aiState: 'IDLE',
      isMuted: false,
      isPaused: false,
      micStatus: 'OFF',
      micLevel: 0,
      wsConnected: false,
      latencyMs: 120,
      transcriptEntries: [],
      metrics: initialMetrics,
    }),
}));

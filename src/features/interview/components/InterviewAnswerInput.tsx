import React, { useState } from 'react';
import {
  Send,
  Loader2,
  MessageSquare,
  AlertCircle,
  Mic,
  Square,
  Edit3,
  Volume2,
  WifiOff,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../lib/utils';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useInterviewWebSocket } from '../hooks/useInterviewWebSocket';
import { useInterviewStore } from '../store/InterviewStore';
import { WaveformVisualizer } from './WaveformVisualizer';

export interface InterviewAnswerInputProps {
  onSubmit: (answerText: string) => void;
  isSubmitting: boolean;
  isDisabled?: boolean;
  error?: string | null;
  className?: string;
  interviewId?: string;
}

export const InterviewAnswerInput: React.FC<InterviewAnswerInputProps> = ({
  onSubmit,
  isSubmitting,
  isDisabled = false,
  error,
  className,
  interviewId,
}) => {
  const [inputMode, setInputMode] = useState<'TEXT' | 'VOICE'>('TEXT');
  const [answer, setAnswer] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { aiState, wsConnected, setAIState } = useInterviewStore();
  const { sendAudioChunk, endCandidateSpeech } = useInterviewWebSocket(interviewId);

  const {
    isRecording,
    isStopping,
    micStatus,
    micLevel,
    error: micError,
    startRecording,
    stopRecordingPromise,
  } = useAudioRecorder({
    onAudioChunk: (chunk) => {
      sendAudioChunk(chunk);
    },
  });

  // Handle Text Mode Submission
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      setValidationError('Please enter a response before submitting.');
      return;
    }
    setValidationError(null);
    onSubmit(answer.trim());
    setAnswer('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleTextSubmit(e);
    }
  };

  // Handle Voice Recording Start
  const handleStartVoiceTurn = async () => {
    if (isStopping || isSubmitting || aiState === 'THINKING' || aiState === 'SPEAKING') return;

    if (!wsConnected) {
      setValidationError('Voice WebSocket connection is unavailable. Please check backend connection.');
      return;
    }
    setValidationError(null);
    setAIState('LISTENING');
    await startRecording();
  };

  // Handle Voice Recording Stop
  const handleStopVoiceTurn = async () => {
    if (isStopping || isSubmitting || aiState === 'THINKING' || aiState === 'SPEAKING') return;

    setAIState('THINKING');
    try {
      await stopRecordingPromise();
      endCandidateSpeech();
    } catch (err) {
      console.warn('Error flushing final audio chunk:', err);
      endCandidateSpeech();
    }
  };

  const isControlsDisabled =
    isDisabled || isSubmitting || aiState === 'THINKING' || aiState === 'SPEAKING';

  return (
    <div
      className={cn(
        'p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl backdrop-blur-md',
        className
      )}
    >
      {/* Mode Selector Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-sm font-semibold text-slate-200">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <span>Response Mode</span>
        </div>

        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setInputMode('TEXT')}
            disabled={isRecording || isControlsDisabled}
            aria-pressed={inputMode === 'TEXT'}
            aria-label="Switch to Text Answer Mode"
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5',
              inputMode === 'TEXT'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900',
              (isRecording || isControlsDisabled) && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Text Mode</span>
          </button>
          <button
            type="button"
            onClick={() => setInputMode('VOICE')}
            disabled={isRecording || isControlsDisabled}
            aria-pressed={inputMode === 'VOICE'}
            aria-label="Switch to Voice Interview Mode"
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5',
              inputMode === 'VOICE'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900',
              (isRecording || isControlsDisabled) && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Mode</span>
          </button>
        </div>
      </div>

      {/* Error Alert Message */}
      {(validationError || error || micError) && (
        <div className="flex items-center space-x-2 text-rose-400 text-xs font-medium bg-rose-950/40 border border-rose-900/50 p-3.5 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError || error || micError}</span>
        </div>
      )}

      {/* Mode 1: Text Mode Interface */}
      {inputMode === 'TEXT' && (
        <form onSubmit={handleTextSubmit} className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Type your detailed technical response</span>
            <span>{answer.length} characters | Ctrl+Enter to submit</span>
          </div>

          <textarea
            id="candidate-answer-input"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (validationError) setValidationError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Explain system design choices, algorithms, and trade-offs clearly..."
            disabled={isControlsDisabled}
            rows={4}
            className={cn(
              'w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none text-sm leading-relaxed',
              isControlsDisabled && 'opacity-60 cursor-not-allowed bg-slate-900'
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isControlsDisabled || !answer.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 px-6 py-2.5 rounded-xl transition-all flex items-center space-x-2"
            >
              {isSubmitting || aiState === 'THINKING' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Answer...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Text Answer</span>
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Mode 2: Voice Mode Interface */}
      {inputMode === 'VOICE' && (
        <div className="py-6 px-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center justify-center space-y-6 text-center">
          {/* WebSocket Availability Check */}
          {!wsConnected && (
            <div className="flex items-center space-x-2 text-amber-400 bg-amber-950/40 border border-amber-900/50 px-4 py-2 rounded-xl text-xs">
              <WifiOff className="w-4 h-4" />
              <span>Voice WebSocket connection offline. Waiting to connect...</span>
            </div>
          )}

          {/* Real Audio Waveform Visualizer */}
          <div className="py-2">
            <WaveformVisualizer micLevel={micLevel} isActive={isRecording} width={260} height={44} />
          </div>

          {/* Dynamic Record Button Control */}
          <div className="space-y-3">
            {isRecording ? (
              <Button
                type="button"
                onClick={handleStopVoiceTurn}
                aria-label="Stop recording answer"
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-rose-600/40 transition-all flex items-center space-x-3 text-sm animate-pulse"
              >
                <Square className="w-5 h-5 fill-current" />
                <span>Stop Recording & Submit Speech</span>
              </Button>
            ) : aiState === 'THINKING' || isSubmitting ? (
              <Button
                type="button"
                disabled
                className="bg-amber-600/80 text-white font-semibold px-8 py-3.5 rounded-2xl cursor-not-allowed flex items-center space-x-3 text-sm opacity-90"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Evaluating Candidate Speech...</span>
              </Button>
            ) : aiState === 'SPEAKING' ? (
              <Button
                type="button"
                disabled
                className="bg-indigo-600/80 text-white font-semibold px-8 py-3.5 rounded-2xl cursor-not-allowed flex items-center space-x-3 text-sm opacity-90"
              >
                <Volume2 className="w-5 h-5 animate-pulse" />
                <span>AI Interviewer Speaking...</span>
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleStartVoiceTurn}
                disabled={isControlsDisabled || !wsConnected}
                aria-label="Start recording answer"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/40 transition-all flex items-center space-x-3 text-sm"
              >
                <Mic className="w-5 h-5" />
                <span>Start Recording Speech Answer</span>
              </Button>
            )}

            <div className="text-xs font-mono text-slate-400">
              {micStatus === 'REQUESTING' && 'Requesting microphone permission...'}
              {micStatus === 'ON' && 'Microphone active — speak your response clearly'}
              {micStatus === 'OFF' && 'Click microphone button to begin voice response'}
              {micStatus === 'ERROR' && 'Microphone error — verify permission settings'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

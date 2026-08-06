import React from 'react';
import { Mic, MicOff, Pause, Play, PhoneOff, Wifi } from 'lucide-react';
import { WaveformVisualizer } from './WaveformVisualizer';
import { useVoiceStream } from '../hooks/useVoiceStream';
import { useInterviewStore } from '../store/InterviewStore';
import { cn } from '../../../lib/utils';

export interface VoiceControlsProps {
  onEndInterview: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({ onEndInterview }) => {
  const { isPaused, setIsPaused, micLevel, wsConnected, latencyMs } = useInterviewStore();
  const { micStatus, toggleMicrophone, isMicActive } = useVoiceStream();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl w-full">
      {/* Mic Level & Connection Status */}
      <div className="flex items-center space-x-3">
        <WaveformVisualizer micLevel={isMicActive ? micLevel : 0} isActive={isMicActive && !isPaused} />
        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono">
          <Wifi className={cn('w-4 h-4', wsConnected ? 'text-emerald-400' : 'text-rose-400')} />
          <span className="text-slate-300">{wsConnected ? 'Connected' : 'Disconnected'}</span>
          {wsConnected && <span className="text-slate-500">({latencyMs}ms)</span>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Explicit ChatGPT-style Microphone Toggle Button */}
        <button
          onClick={toggleMicrophone}
          disabled={micStatus === 'REQUESTING'}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl font-medium transition-all shadow-md relative',
            isMicActive
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-400/50 animate-pulse'
              : micStatus === 'REQUESTING'
              ? 'bg-amber-600 text-white opacity-70 cursor-wait'
              : micStatus === 'ERROR'
              ? 'bg-rose-950 text-rose-400 border border-rose-800'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
          )}
          title={isMicActive ? 'Stop Microphone' : 'Start Microphone'}
          aria-label={isMicActive ? 'Stop Microphone' : 'Start Microphone'}
        >
          {isMicActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-slate-400" />}
        </button>

        {/* Pause Toggle */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl font-medium transition-all shadow-md',
            isPaused
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
          )}
          title={isPaused ? 'Resume Session' : 'Pause Session'}
          aria-label={isPaused ? 'Resume Session' : 'Pause Session'}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>

        {/* End Interview Button */}
        <button
          onClick={onEndInterview}
          className="flex h-11 items-center space-x-2 px-4 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 shadow-md transition-all text-xs"
          aria-label="End Session"
        >
          <PhoneOff className="w-4 h-4" />
          <span>End Session</span>
        </button>
      </div>
    </div>
  );
};

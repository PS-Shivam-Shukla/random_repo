import React, { useState } from 'react';
import { Mic, Volume2, Video, Wifi, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { WaveformVisualizer } from './WaveformVisualizer';
import { useVoiceStream } from '../hooks/useVoiceStream';

export const SetupPermissionsCheck: React.FC = () => {
  const [isTestingSpeaker, setIsTestingSpeaker] = useState(false);
  const { micStatus, startMicrophone, isMicActive } = useVoiceStream();

  const handleSpeakerTest = () => {
    setIsTestingSpeaker(true);
    const audio = new Audio('https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg');
    audio.volume = 0.5;
    audio.play().catch(() => {});
    setTimeout(() => setIsTestingSpeaker(false), 2500);
  };

  return (
    <Card className="border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Mic className="w-4 h-4 text-indigo-400" />
          Hardware & Diagnostics Check
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4 text-xs">
        {/* Mic Check */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center space-x-3">
            <Mic className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="font-bold text-slate-100">Microphone Access</p>
              <p className="text-[11px] text-slate-400">Click to request microphone permission and test audio meter</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <WaveformVisualizer micLevel={isMicActive ? 50 : 0} isActive={isMicActive} />
            {isMicActive ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Active
              </span>
            ) : micStatus === 'ERROR' ? (
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Denied
              </span>
            ) : (
              <Button size="sm" variant="outline" onClick={startMicrophone}>
                Test Mic
              </Button>
            )}
          </div>
        </div>

        {/* Speaker Test */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="font-bold text-slate-100">Speaker & Output Audio</p>
              <p className="text-[11px] text-slate-400">Play test audio chime</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleSpeakerTest} isLoading={isTestingSpeaker}>
            Test Speaker
          </Button>
        </div>

        {/* Network & Camera */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <Wifi className="w-4 h-4 text-indigo-400" /> Network SLA
            </span>
            <span className="text-emerald-400 font-bold">12ms (Optimal)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <Video className="w-4 h-4 text-indigo-400" /> Camera Feed
            </span>
            <span className="text-slate-400 font-bold">Optional Mode</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

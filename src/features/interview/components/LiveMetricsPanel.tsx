import React from 'react';
import { Activity, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { Progress } from '../../../components/Progress';
import { LiveInterviewMetrics } from '../types/interview.types';
import { formatSecondsToTimer } from '../utils/interviewHelpers';

export interface LiveMetricsPanelProps {
  metrics: LiveInterviewMetrics;
}

export const LiveMetricsPanel: React.FC<LiveMetricsPanelProps> = ({ metrics }) => {
  return (
    <Card className="border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            Live Speech & Technical Metrics
          </CardTitle>
          <span className="font-mono text-xs text-indigo-400 font-semibold flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Clock className="w-3.5 h-3.5" /> {formatSecondsToTimer(metrics.timeElapsedSeconds)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Top 3 Metric Badges */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Pacing (WPM)</p>
            <p className="text-sm font-black text-slate-100 mt-0.5">{metrics.wpm}</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Pause Time</p>
            <p className="text-sm font-black text-emerald-400 mt-0.5">{metrics.silenceSeconds}s</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Latency</p>
            <p className="text-sm font-black text-indigo-400 mt-0.5">{metrics.latencyMs}ms</p>
          </div>
        </div>

        {/* Progress Scores */}
        <div className="space-y-3 pt-1">
          <Progress value={metrics.technicalScore} showValue label="Technical Accuracy Score" />
          <Progress value={metrics.communicationScore} showValue label="Communication Clarity Score" />
          <Progress value={metrics.confidenceScore} showValue label="Confidence & Vocal Quality" />
        </div>
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';

export interface ATSScoreCardProps {
  resumeQualityScore?: number;
  atsScore?: number;
  overallScore?: number;
  previousAtsScore?: number;
  industryPercentile?: number;
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({
  resumeQualityScore,
  atsScore,
  overallScore,
  industryPercentile = 85,
}) => {
  const scoreToDisplay = resumeQualityScore ?? atsScore ?? overallScore ?? 85;

  const chartData = [
    { name: 'Score', value: scoreToDisplay },
    { name: 'Remaining', value: Math.max(0, 100 - scoreToDisplay) },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return ['#10b981', '#1e293b'];
    if (score >= 70) return ['#6366f1', '#1e293b'];
    return ['#f59e0b', '#1e293b'];
  };

  const colors = getScoreColor(scoreToDisplay);

  return (
    <Card className="border-indigo-900/40 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/20 shadow-xl">
      <CardHeader className="pb-2 border-b border-slate-800/80">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Resume Quality & Structure Score
          </CardTitle>
          <span className="rounded-full bg-emerald-950 px-3 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-800/50 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> AI Evaluated
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Gauge Chart */}
          <div className="h-40 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={62}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={colors[0]} />
                  <Cell fill={colors[1]} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
              <span className="text-3xl font-black text-slate-100">{scoreToDisplay}%</span>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Quality Score</p>
            </div>
          </div>

          {/* Metrics Column */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Resume Quality</span>
              <span className="text-sm font-bold text-slate-100">{scoreToDisplay} / 100</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Industry Benchmark</span>
              <span className="text-xs font-bold text-indigo-400">Top {industryPercentile}% Candidate</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

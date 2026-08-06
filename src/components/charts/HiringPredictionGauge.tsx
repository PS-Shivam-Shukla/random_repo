import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Award, TrendingUp, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

export interface HiringPredictionGaugeProps {
  hireProbability?: number;
  confidenceScore?: number;
  recommendation?: 'STRONG HIRE' | 'HIRE' | 'LEAN HIRE' | 'NO HIRE';
  previousDelta?: number;
}

export const HiringPredictionGauge: React.FC<HiringPredictionGaugeProps> = ({
  hireProbability = 94,
  confidenceScore = 92,
  recommendation = 'STRONG HIRE',
  previousDelta = 6,
}) => {
  const chartData = [
    { name: 'Probability', value: hireProbability },
    { name: 'Remaining', value: 100 - hireProbability },
  ];

  const COLORS = ['#10b981', '#1e293b'];

  return (
    <Card className="border-indigo-900/40 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/20 shadow-xl">
      <CardHeader className="pb-2 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            AI Hiring Outcome Prediction
          </CardTitle>
          <span className="rounded-full bg-emerald-950 px-3 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-800/50 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> High Precision Audit
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Animated Gauge Chart */}
          <div className="h-40 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={64}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={COLORS[0]} />
                  <Cell fill={COLORS[1]} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
              <span className="text-3xl font-black text-slate-100">{hireProbability}%</span>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Hire Odds</p>
            </div>
          </div>

          {/* Metric Details Column */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium">Recommendation</span>
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/50"
              >
                {recommendation}
              </motion.span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium">Model Confidence</span>
              <span className="text-xs font-bold text-indigo-400">{confidenceScore}% Confidence</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium">Historical Delta</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +{previousDelta}% vs baseline
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

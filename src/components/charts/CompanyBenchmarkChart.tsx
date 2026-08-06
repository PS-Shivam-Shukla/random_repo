import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

export interface CompanyBenchmarkItem {
  company: string;
  requiredScore: number;
  candidateScore: number;
}

export interface CompanyBenchmarkChartProps {
  benchmarks?: CompanyBenchmarkItem[];
}

const defaultBenchmarks: CompanyBenchmarkItem[] = [
  { company: 'Google (L5 Senior Staff)', requiredScore: 90, candidateScore: 94 },
  { company: 'Amazon (L6 Principal)', requiredScore: 88, candidateScore: 94 },
  { company: 'Meta (E5 Senior)', requiredScore: 86, candidateScore: 94 },
  { company: 'Microsoft (L64 Senior)', requiredScore: 84, candidateScore: 94 },
];

export const CompanyBenchmarkChart: React.FC<CompanyBenchmarkChartProps> = ({
  benchmarks = defaultBenchmarks,
}) => {
  return (
    <Card className="border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-indigo-400" />
          FAANG & Tier-1 Company Hiring Benchmark
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {benchmarks.map((item, idx) => {
          const isPassing = item.candidateScore >= item.requiredScore;
          return (
            <div key={item.company} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{item.company}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Req: {item.requiredScore}%</span>
                  <span className={`font-bold ${isPassing ? 'text-emerald-400' : 'text-amber-400'}`}>
                    You: {item.candidateScore}% {isPassing && '✓'}
                  </span>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="h-3 w-full rounded-full bg-slate-950 p-0.5 border border-slate-800 relative overflow-hidden">
                {/* Required Benchmark Notch Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 z-20 shadow-sm shadow-amber-400"
                  style={{ left: `${item.requiredScore}%` }}
                  title={`Company threshold: ${item.requiredScore}%`}
                />
                {/* Candidate Fill Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.candidateScore}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`h-full rounded-full ${
                    isPassing ? 'bg-gradient-to-r from-indigo-500 to-emerald-400' : 'bg-gradient-to-r from-amber-500 to-rose-400'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

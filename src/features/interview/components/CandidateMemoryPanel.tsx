import React from 'react';
import { Brain, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';

export const CandidateMemoryPanel: React.FC = () => {
  return (
    <Card className="border-indigo-900/30 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-400" />
          Candidate Memory Graph Context
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3 text-xs">
        <div>
          <h4 className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Verified Known Strengths
          </h4>
          <div className="flex flex-wrap gap-1">
            <span className="rounded bg-indigo-950 px-2 py-0.5 text-[10px] text-indigo-300 border border-indigo-800/50">
              FastAPI Async Routing
            </span>
            <span className="rounded bg-indigo-950 px-2 py-0.5 text-[10px] text-indigo-300 border border-indigo-800/50">
              PostgreSQL Saver
            </span>
            <span className="rounded bg-indigo-950 px-2 py-0.5 text-[10px] text-indigo-300 border border-indigo-800/50">
              React 19 Hooks
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            Active Learning Roadmap Focus
          </h4>
          <p className="text-slate-400 leading-relaxed">
            Targeting deeper evaluation on multi-region database failover policies & distributed lock management.
          </p>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>Multi-interview state graph automatically synchronized.</span>
        </div>
      </CardContent>
    </Card>
  );
};

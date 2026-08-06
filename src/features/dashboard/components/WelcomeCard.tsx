import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDashboardSummary } from '../../../hooks/useDashboard';
import { Skeleton } from '../../../components/ui/Skeleton';

export function WelcomeCard() {
  const navigate = useNavigate();
  const { data: summary, isLoading } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="card-hero p-6 sm:p-8 flex items-center justify-between min-h-[180px]">
        <div className="space-y-3 flex-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-9 w-36 rounded-xl" />
        </div>
      </div>
    );
  }

  const firstName = summary?.user_first_name || 'Alex';
  const score = Math.round(summary?.average_score || 87);

  // SVG Gauge calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left content */}
        <div className="space-y-3.5 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>AI Interview Intelligence Hub</span>
            <span className="h-1 w-1 rounded-full bg-indigo-400" />
            <span className="text-[10px] text-indigo-300/70 font-mono">v1.0.0</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
              Ready for your next round, {firstName}? 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
              Your AI coach recommends practicing <span className="font-semibold text-indigo-200">System Architecture</span> today to boost your overall interview readiness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => navigate('/new-interview')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Zap className="h-4 w-4 fill-white/20" />
              <span>Start Mock Interview</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => navigate('/career-coach')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Target className="h-4 w-4 text-violet-400" />
              <span>View Career Plan</span>
            </button>
          </div>
        </div>

        {/* Right readiness gauge ring */}
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 shrink-0">
          <div className="relative flex items-center justify-center">
            <svg className="h-24 w-24 -rotate-90 transform">
              {/* Track */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Progress */}
              <motion.circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-indigo-500"
                strokeWidth="6"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black tracking-tight text-white">{score}%</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-300">Ready</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-200">Readiness Score</p>
            <p className="text-[11px] text-slate-400">Based on 24 metrics</p>
            <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ai-pulse-ring" />
              <span>Top 8% candidate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
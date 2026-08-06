import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Cpu, Sparkles } from 'lucide-react';
import { useSkillsOverview } from '../../../hooks/useDashboard';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { ErrorState } from '../../../components/shared/ErrorState';

interface SkillScore {
  name: string;
  score: number;
  category: string;
}

const defaultScores: SkillScore[] = [
  { name: 'System Design',           score: 92, category: 'Architecture' },
  { name: 'React 19 & Frontend Architecture', score: 88, category: 'Frontend' },
  { name: 'Behavioral (STAR Method)', score: 85, category: 'Soft Skills' },
  { name: 'Distributed Caching',     score: 64, category: 'Backend' },
  { name: 'Concurrency & Locks',     score: 58, category: 'System CS' },
];

export function SkillsOverview() {
  const { data: skills, isLoading, isError, refetch } = useSkillsOverview();

  if (isLoading) {
    return (
      <div className="card-content p-6">
        <SkeletonBlock count={3} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card-content p-6">
        <ErrorState message="Failed to load skills overview" onRetry={refetch} className="py-4" />
      </div>
    );
  }

  const strengths = skills?.strengths?.length
    ? skills.strengths
    : ['System Design', 'React 19 & Hooks', 'TypeScript Strict', 'API Architecture'];

  const needsImprovement = skills?.needs_improvement?.length
    ? skills.needs_improvement
    : ['Distributed Caching', 'Concurrency / Async Locks', 'STAR Behavioral Impact'];

  return (
    <div className="card-content p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-violet-500/10 p-2 text-violet-600 dark:text-violet-400">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)] font-display">
              Skill Competency Matrix
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Evaluated by AI Agent across 24 recent rounds
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-500">
          <Sparkles className="h-3 w-3" />
          <span>Real-time Sync</span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3">
        {defaultScores.map((s, i) => (
          <div key={s.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--text-primary)]">{s.name}</span>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[10px] text-[var(--text-muted)]">{s.category}</span>
                <span className={`font-bold ${s.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : s.score >= 70 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {s.score}%
                </span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--surface-raised)] border border-[var(--border)] overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  s.score >= 80
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : s.score >= 70
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                    : 'bg-gradient-to-r from-amber-500 to-rose-400'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${s.score}%` }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Strengths & Improvement Tags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {/* Strengths */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Top Strengths</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {strengths.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Needs Improvement */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Focus Areas</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {needsImprovement.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 px-2.5 py-1 text-[11px] font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
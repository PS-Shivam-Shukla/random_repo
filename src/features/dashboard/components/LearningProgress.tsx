import { BookOpen, Target, GraduationCap } from 'lucide-react';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { ErrorState } from '../../../components/shared/ErrorState';
import { useLearningProgress } from '../../../hooks/useDashboard';

export function LearningProgress() {
  const { data: progress, isLoading, isError, refetch } = useLearningProgress();

  if (isLoading) {
    return (
      <div className="card-content p-6 space-y-3">
        <SkeletonBlock count={2} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card-content p-6">
        <ErrorState message="Failed to load learning progress" onRetry={refetch} className="py-4" />
      </div>
    );
  }

  const completionPercent = progress?.completion_percentage ?? 74;
  const currentModule = progress?.current_module ?? 'System Design & Tradeoffs';
  const nextMilestone = progress?.next_milestone ?? 'Complete Mock Session #5';

  return (
    <div className="card-content p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-violet-500/10 p-2 text-violet-600 dark:text-violet-400">
            <GraduationCap className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[var(--text-primary)] font-display">
            Learning Progress
          </h2>
        </div>
        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
          {completionPercent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>Overall Plan Track</span>
          <span className="font-semibold text-[var(--text-primary)]">{completionPercent} / 100%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-raised)] border border-[var(--border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500 ease-out"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Short Notes */}
      <div className="space-y-2 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-3.5">
        <div className="flex items-start gap-2.5">
          <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Active Focus
            </span>
            <p className="text-xs font-bold text-[var(--text-primary)] truncate">
              {currentModule}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-2 border-t border-[var(--border-subtle)]">
          <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Next Goal
            </span>
            <p className="text-xs font-bold text-[var(--text-primary)] truncate">
              {nextMilestone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
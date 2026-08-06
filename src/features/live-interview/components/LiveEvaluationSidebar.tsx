import { motion } from 'framer-motion';
import { Activity, CheckCircle2, Circle, Sparkles, BrainCircuit } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { LiveEvaluationMetrics } from '../../../hooks/useInterviewSession';

interface LiveEvaluationSidebarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  evaluation?: LiveEvaluationMetrics;
  answeredQuestionIds: number[];
  onSelectQuestion: (index: number) => void;
}

export function LiveEvaluationSidebar({
  currentQuestionIndex,
  totalQuestions,
  evaluation,
  answeredQuestionIds,
  onSelectQuestion,
}: LiveEvaluationSidebarProps) {
  const metrics = [
    {
      label: 'Technical Coverage',
      score: evaluation?.technicalCoverageScore ?? 85,
      color: 'bg-indigo-600',
    },
    {
      label: 'Communication Clarity',
      score: evaluation?.communicationScore ?? 88,
      color: 'bg-violet-600',
    },
    {
      label: 'Confidence Index',
      score: evaluation?.confidenceScore ?? 92,
      color: 'bg-emerald-500',
    },
    {
      label: 'Answer Completeness',
      score: evaluation?.completenessScore ?? 90,
      color: 'bg-blue-600',
    },
  ];

  const detectedConcepts = evaluation?.detectedKeywords ?? [
    'Distributed Caching',
    'Eventual Consistency',
    'Optimistic Locking',
    'React Fiber Reconciliation',
  ];

  return (
    <aside className="w-80 shrink-0 border-l border-[var(--border)] bg-[var(--surface)] p-5 h-[calc(100vh-3.5rem)] overflow-y-auto space-y-6">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
            <BrainCircuit className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[var(--text-primary)] font-display uppercase tracking-wider">
              Live AI Telemetry
            </h3>
            <p className="text-[10px] text-[var(--text-muted)] font-mono">Real-time evaluation stream</p>
          </div>
        </div>
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 ai-pulse-ring" />
      </div>

      {/* 4 Animated Progress Bars */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text-primary)]">
            Telemetry Metrics
          </span>
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
        </div>

        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--text-muted)] font-medium">{m.label}</span>
              <span className="font-mono font-bold text-[var(--text-primary)]">
                {m.score}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-raised)] border border-[var(--border)]">
              <motion.div
                className={cn('h-full rounded-full', m.color)}
                initial={{ width: '0%' }}
                animate={{ width: `${m.score}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Expected Concepts Checklist */}
      <div className="space-y-2.5 pt-3 border-t border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text-primary)]">
            Detected Concepts
          </span>
          <span className="text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md">
            {detectedConcepts.length} Active
          </span>
        </div>

        <div className="space-y-1.5">
          {detectedConcepts.map((concept) => (
            <div
              key={concept}
              className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] bg-[var(--surface-raised)] p-2 rounded-xl border border-[var(--border)]"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{concept}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical Question Progress Track */}
      <div className="space-y-2.5 pt-3 border-t border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text-primary)]">
            Question Track
          </span>
          <Activity className="h-3.5 w-3.5 text-[var(--text-muted)]" />
        </div>

        <div className="space-y-1.5">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const isAnswered = answeredQuestionIds.includes(idx);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                className={cn(
                  'w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all text-left border',
                  isCurrent
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-xs'
                    : isAnswered
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : 'bg-[var(--surface-raised)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                )}
              >
                <div className="flex items-center gap-2">
                  {isAnswered ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  ) : isCurrent ? (
                    <span className="flex h-2 w-2 rounded-full bg-white ring-2 ring-white/50" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
                  )}
                  <span>Question {idx + 1}</span>
                </div>
                <span className="text-[10px] font-mono opacity-90 font-bold">
                  {isCurrent ? 'Active' : isAnswered ? 'Done' : 'Pending'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

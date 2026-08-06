import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Pause, LogOut, Clock, ShieldAlert } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface InterviewTopBarProps {
  currentRound?: string;
  questionNumber?: number;
  totalQuestions?: number;
  difficulty?: string;
  currentSkill?: string;
  durationMinutes?: number;
  onPause?: () => void;
}

export function InterviewTopBar({
  currentRound = 'Technical Round',
  questionNumber = 1,
  totalQuestions = 4,
  difficulty = 'Hard',
  currentSkill = 'System Architecture & Caching',
  durationMinutes = 45,
}: InterviewTopBarProps) {
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(durationMinutes * 60);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = secondsRemaining <= 300;
  const isCriticalTime = secondsRemaining <= 120;

  const difficultyColor =
    difficulty === 'Easy'
      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
      : difficulty === 'Medium'
      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';

  return (
    <>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Left: Brand & Round Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-indigo-500/10 p-1.5 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)] font-display hidden sm:inline">
              Live Simulation <span className="text-indigo-500 font-mono">Arena</span>
            </span>
          </div>

          <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 text-xs font-bold border border-indigo-500/20">
              {currentRound}
            </span>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              Question <span className="font-bold text-[var(--text-primary)]">{questionNumber}</span> of {totalQuestions}
            </span>
          </div>
        </div>

        {/* Center: Difficulty & Current Skill */}
        <div className="hidden md:flex items-center gap-2">
          <span className={cn('rounded-lg border px-2.5 py-0.5 text-xs font-bold', difficultyColor)}>
            {difficulty} Rigor
          </span>
          <span className="text-xs text-[var(--text-muted)]">•</span>
          <span className="text-xs font-semibold text-[var(--text-secondary)] bg-[var(--surface-raised)] px-2.5 py-0.5 rounded-lg border border-[var(--border)]">
            {currentSkill}
          </span>
        </div>

        {/* Right: Monospace Countdown & Pause/Exit */}
        <div className="flex items-center gap-3">
          {/* Live Monospace Timer */}
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-colors border',
              isCriticalTime
                ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse'
                : isLowTime
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                : 'bg-[var(--surface-raised)] text-[var(--text-primary)] border-[var(--border)]',
            )}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>{formattedTime}</span>
          </div>

          {/* Pause / Exit Trigger */}
          <button
            type="button"
            onClick={() => setShowExitModal(true)}
            className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all"
          >
            <Pause className="h-3.5 w-3.5" />
            <span>Pause</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-500/10 p-2.5 text-amber-500">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Pause Interview Session?
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Your timer and progress will be saved. You can resume anytime from the dashboard.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-1.5 text-xs font-bold text-[var(--text-primary)]"
              >
                Resume Exam
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1 rounded-xl bg-rose-600 text-white px-3 py-1.5 text-xs font-bold shadow-sm"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Exit to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

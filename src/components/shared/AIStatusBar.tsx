/**
 * AIStatusBar — Global persistent AI agent activity bar
 *
 * Sits between the top navbar and page content.
 * Communicates to the user that intelligent agents are alive.
 * This is the single most important "AI presence" element in the app.
 *
 * Design: 28px bar, monospace text, live status dot, dismissible.
 */
import { useState, useEffect } from 'react';
import { Brain, X, Zap } from 'lucide-react';
import { ThinkingDots } from './ThinkingDots';
import { cn } from '../../lib/utils';

interface AgentStatus {
  name: string;
  task: string;
  active: boolean;
}

// Simulated rotating agent activity messages
// In production: these would be driven by WebSocket / SSE from the backend
const AGENT_ACTIVITY: AgentStatus[] = [
  { name: 'Supervisor Agent',   task: 'Orchestrating interview pipeline',   active: true },
  { name: 'Technical Agent',    task: 'Synthesizing question bank',          active: true },
  { name: 'Resume Agent',       task: 'Parsing candidate profile signals',   active: true },
  { name: 'JD Agent',           task: 'Extracting role requirements',        active: true },
  { name: 'Evaluation Agent',   task: 'Scoring response competencies',       active: true },
  { name: 'Career Coach',       task: 'Building learning recommendations',   active: true },
  { name: 'ATS Agent',          task: 'Calculating resume-JD alignment',     active: true },
  { name: 'HR Agent',           task: 'Preparing behavioral questions',      active: true },
  { name: 'Planner Agent',      task: 'Scheduling interview rounds',         active: true },
];

const ACTIVE_AGENT_COUNT = 9;

interface AIStatusBarProps {
  className?: string;
}

export function AIStatusBar({ className }: AIStatusBarProps) {
  const [dismissed, setDismissed] = useState(() =>
    sessionStorage.getItem('ai-bar-dismissed') === 'true'
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate through agent activity messages every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AGENT_ACTIVITY.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('ai-bar-dismissed', 'true');
  };

  if (dismissed) return null;

  const current = AGENT_ACTIVITY[currentIndex];

  return (
    <div
      className={cn(
        'ai-status-bar flex items-center justify-between px-4 sm:px-6',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="AI agent activity status"
    >
      {/* Left: Agent count + active indicator */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Active agents count */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="ai-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {ACTIVE_AGENT_COUNT} Agents Active
          </span>
        </div>

        {/* Divider */}
        <span className="h-3 w-px bg-[var(--border)] shrink-0" aria-hidden="true" />

        {/* Current agent activity — cycles through agents */}
        <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
          <Brain className="h-3 w-3 text-violet-500 dark:text-violet-400 shrink-0" aria-hidden="true" />
          <span
            key={currentIndex}
            className="text-[11px] font-mono text-[var(--text-secondary)] truncate animate-fade-in-up"
          >
            <span className="font-semibold text-[var(--text-primary)]">{current.name}:</span>{' '}
            {current.task}
          </span>
          <ThinkingDots className="ml-1 shrink-0" color="bg-violet-400 dark:bg-violet-500" />
        </div>
      </div>

      {/* Right: Platform health + dismiss */}
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <div className="hidden sm:flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5">
          <Zap className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span className="text-[10px] font-semibold font-mono text-emerald-700 dark:text-emerald-400">
            ALL SYSTEMS OP
          </span>
        </div>

        <button
          onClick={handleDismiss}
          className="rounded p-0.5 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]"
          aria-label="Dismiss AI status bar"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

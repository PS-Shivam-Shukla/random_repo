import { Play, RotateCcw, Activity } from 'lucide-react';
import { PageHeader } from '../../../components/shared/PageHeader';
import { cn } from '../../../lib/utils';

interface WorkflowHeaderProps {
  isLiveMode: boolean;
  onToggleLiveMode: (isLive: boolean) => void;
  runStatus: string;
}

export function WorkflowHeader({
  isLiveMode,
  onToggleLiveMode,
  runStatus,
}: WorkflowHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
      <PageHeader
        title="LangGraph Multi-Agent Engine"
        description="Real-time execution DAG tracing agent state transitions, prompt inputs, and telemetry outputs."
        badge={
          <span
            className={cn(
              'text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5',
              runStatus === 'RUNNING'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
            )}
          >
            <Activity className="h-3 w-3 animate-pulse" />
            LangGraph / {runStatus}
          </span>
        }
      />

      <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl shrink-0">
        <button
          type="button"
          onClick={() => onToggleLiveMode(true)}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
            isLiveMode
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white',
          )}
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          Live Tracing Mode
        </button>

        <button
          type="button"
          onClick={() => onToggleLiveMode(false)}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
            !isLiveMode
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white',
          )}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Replay Mode
        </button>
      </div>
    </div>
  );
}

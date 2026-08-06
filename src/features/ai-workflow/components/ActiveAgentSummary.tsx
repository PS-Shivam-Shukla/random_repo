import { useEffect, useRef } from 'react';
import { Terminal, Clock, Activity, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import type { WorkflowLogMessage, WorkflowNode } from '../../../hooks/useWorkflowStatus';

interface ActiveAgentSummaryProps {
  activeNode?: WorkflowNode;
  elapsedSeconds: number;
  logs: WorkflowLogMessage[];
  isLiveMode: boolean;
}

export function ActiveAgentSummary({
  activeNode,
  elapsedSeconds,
  logs,
  isLiveMode,
}: ActiveAgentSummaryProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
      <CardHeader className="p-0 pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <Activity className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
                  Active Execution Agent: {activeNode?.name || 'Supervisor Orchestrator'}
                </CardTitle>
                <span className="rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-2.5 py-0.5 text-xs font-mono font-bold">
                  {isLiveMode ? 'Executing Node' : 'Pipeline Completed'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Category: <strong className="text-neutral-700 dark:text-neutral-300 font-semibold">{activeNode?.category || 'Execution'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-xl shrink-0">
            <Clock className="h-3.5 w-3.5 text-neutral-400" />
            <span>Elapsed: <strong>{elapsedSeconds}s</strong></span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Monospace Live Execution Log Terminal */}
        <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800 font-mono text-xs text-emerald-400 space-y-2">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5 font-bold">
              <Terminal className="h-3.5 w-3.5 text-blue-400" />
              LangGraph Live Log Stream
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> Auto-Scroll Active
            </span>
          </div>

          <div
            ref={logContainerRef}
            className="max-h-36 overflow-y-auto space-y-1.5 pt-1 text-[11px] leading-relaxed scrollbar-thin"
          >
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2">
                <span className="text-neutral-500 shrink-0">[{log.timestamp}]</span>
                <span
                  className={
                    log.level === 'SUCCESS'
                      ? 'text-emerald-400 font-semibold'
                      : log.level === 'WARN'
                        ? 'text-amber-400 font-semibold'
                        : log.level === 'ERROR'
                          ? 'text-rose-400 font-semibold'
                          : 'text-neutral-300'
                  }
                >
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Clock, Layers } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { useWorkflowTimeline } from '../../../hooks/useAgentMonitoring';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

interface WorkflowTimelineChartProps {
  range: string;
}

export function WorkflowTimelineChart({ range }: WorkflowTimelineChartProps) {
  const { data: windows, isLoading } = useWorkflowTimeline(range);

  if (isLoading || !windows) {
    return <SkeletonBlock count={1} className="h-64 rounded-2xl" />;
  }

  const totalPipelineTimeMs = 6500;

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Workflow Execution Gantt Windows (Run #101)
            </CardTitle>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Parallel and sequential execution time windows across agent state transitions
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        <div className="space-y-3">
          {windows.map((win) => {
            const leftPercent = (win.startOffsetMs / totalPipelineTimeMs) * 100;
            const widthPercent = Math.max(5, (win.durationMs / totalPipelineTimeMs) * 100);

            return (
              <div key={win.agentName} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300 font-medium">
                  <span className="font-semibold">{win.agentName}</span>
                  <span className="font-mono text-[11px] text-neutral-400">
                    +{win.startOffsetMs}ms ({win.durationMs}ms)
                  </span>
                </div>

                {/* Horizontal Gantt Bar Container */}
                <div className="relative h-4 w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-md bg-blue-600 dark:bg-blue-500 shadow-xs transition-all duration-500"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-neutral-100 dark:border-neutral-800">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> 0ms (Pipeline Start)
          </span>
          <span>6,500ms (Total Run Time)</span>
        </div>
      </CardContent>
    </Card>
  );
}

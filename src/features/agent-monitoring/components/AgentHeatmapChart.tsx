import { Flame } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { useExecutionHeatmap } from '../../../hooks/useAgentMonitoring';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

interface AgentHeatmapChartProps {
  range: string;
}

export function AgentHeatmapChart({ range }: AgentHeatmapChartProps) {
  const { data: cells, isLoading } = useExecutionHeatmap(range);

  if (isLoading || !cells) {
    return <SkeletonBlock count={1} className="h-64 rounded-2xl" />;
  }

  const agents = Array.from(new Set(cells.map((c) => c.agentName)));
  const hours = Array.from(new Set(cells.map((c) => c.hour)));

  const getHeatmapColor = (intensity: number) => {
    if (intensity >= 80) return 'bg-blue-700 text-white font-bold';
    if (intensity >= 60) return 'bg-blue-600/80 text-white font-semibold';
    if (intensity >= 45) return 'bg-blue-400/60 text-blue-950 font-medium';
    return 'bg-blue-200/50 text-blue-900';
  };

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Cluster Execution Load Heatmap
            </CardTitle>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Agent load & request intensity distribution matrix (Agent x Time Window)
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-mono">
                <th className="pb-3 pt-1 font-semibold">Agent Node</th>
                {hours.map((h) => (
                  <th key={h} className="pb-3 pt-1 text-center font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {agents.map((ag) => (
                <tr key={ag}>
                  <td className="py-3 font-bold text-neutral-900 dark:text-white pr-4">
                    {ag}
                  </td>
                  {hours.map((h) => {
                    const cell = cells.find((c) => c.agentName === ag && c.hour === h);
                    const val = cell ? cell.intensity : 40;

                    return (
                      <td key={h} className="py-2 px-1 text-center">
                        <span
                          className={`inline-block w-12 py-1.5 rounded-lg text-xs font-mono transition-transform hover:scale-105 ${getHeatmapColor(
                            val,
                          )}`}
                        >
                          {val}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

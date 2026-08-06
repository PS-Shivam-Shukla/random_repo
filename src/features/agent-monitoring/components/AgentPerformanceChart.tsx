import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { useAgentPerformanceChart } from '../../../hooks/useAgentMonitoring';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { BarChart3 } from 'lucide-react';

interface AgentPerformanceChartProps {
  range: string;
}

export function AgentPerformanceChart({ range }: AgentPerformanceChartProps) {
  const { data, isLoading } = useAgentPerformanceChart(range);

  if (isLoading || !data) {
    return <SkeletonBlock count={1} className="h-64 rounded-2xl" />;
  }

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Cluster Agent Performance Benchmarks
            </CardTitle>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Comparative success rate % and latency ms across all 9 deployed agents
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 min-h-[260px]">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" />
            <XAxis dataKey="agentName" tick={{ fontSize: 10, fill: '#64748b' }} />
            <YAxis yAxisId="left" domain={[80, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Bar yAxisId="left" dataKey="successRate" name="Success Rate (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="latencyMs" name="Avg Latency (ms)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

import { Calendar } from 'lucide-react';
import { PageHeader } from '../../../components/shared/PageHeader';

interface MonitoringHeaderProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function MonitoringHeader({ selectedRange, onRangeChange }: MonitoringHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
      <PageHeader
        title="Cluster Observability & Telemetry"
        description="Datadog-style metrics dashboard tracking multi-agent cluster latency, token budgets, error rates, and load heatmaps."
        badge={
          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Stream Connected
          </span>
        }
      />

      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200/90 bg-white px-3 py-2 text-xs font-semibold shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
          <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-neutral-500 dark:text-neutral-400">Time Window:</span>
          <select
            value={selectedRange}
            onChange={(e) => onRangeChange(e.target.value)}
            className="bg-transparent font-bold text-neutral-900 focus:outline-none dark:text-white"
          >
            <option value="1h">Last 1 Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
}

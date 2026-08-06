import { Calendar } from 'lucide-react';
import { PageHeader } from '../../../components/shared/PageHeader';

interface AnalyticsHeaderProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function AnalyticsHeader({ selectedRange, onRangeChange }: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
      <PageHeader
        title="Analytics & Skills Deep-Dive"
        description="Granular performance analytics, technical stack heatmaps, difficulty coverage, and comparative benchmarks."
      />

      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200/90 bg-white px-3 py-2 text-xs font-semibold shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
          <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-neutral-500 dark:text-neutral-400">Time Range:</span>
          <select
            value={selectedRange}
            onChange={(e) => onRangeChange(e.target.value)}
            className="bg-transparent font-bold text-neutral-900 focus:outline-none dark:text-white"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
    </div>
  );
}

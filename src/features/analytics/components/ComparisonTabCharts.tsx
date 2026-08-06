import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { ChartCard } from './ChartCard';
import { useTrendsComparison } from '../../../hooks/useAnalyticsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

interface ComparisonTabChartsProps {
  range: string;
}

export function ComparisonTabCharts({ range }: ComparisonTabChartsProps) {
  const { data, isLoading } = useTrendsComparison(range);

  if (isLoading || !data) {
    return <SkeletonBlock count={2} className="h-64 rounded-2xl" />;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Chart 1: Peer Group Comparison Bar Chart */}
      <ChartCard
        title="Candidate Score vs Peer Benchmarks"
        subtitle="Comparing your scores against Average Applicants and Top 10% Percentile Candidates"
      >
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data.peerComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" />
            <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip />
            <Bar dataKey="candidateScore" name="Your Score" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar dataKey="top10Percentile" name="Top 10% Benchmark" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="averageApplicant" name="Average Applicant" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

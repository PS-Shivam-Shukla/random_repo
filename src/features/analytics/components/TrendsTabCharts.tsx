import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { ChartCard } from './ChartCard';
import { useTrendsComparison } from '../../../hooks/useAnalyticsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

interface TrendsTabChartsProps {
  range: string;
}

export function TrendsTabCharts({ range }: TrendsTabChartsProps) {
  const { data, isLoading } = useTrendsComparison(range);

  if (isLoading || !data) {
    return <SkeletonBlock count={2} className="h-64 rounded-2xl" />;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Chart 1: Improvement Trajectory Composed Chart */}
      <ChartCard
        title="Improvement Trajectory vs Study Investment"
        subtitle="Weekly score growth overlaid with weekly study hours"
      >
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data.trajectory}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis yAxisId="left" domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip />
            <Bar yAxisId="right" dataKey="studyHours" name="Study Hours" fill="#93c5fd" radius={[6, 6, 0, 0]} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="score"
              name="Overall Score"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5, fill: '#2563eb' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

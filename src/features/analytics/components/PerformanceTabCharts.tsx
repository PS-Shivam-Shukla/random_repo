import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { ChartCard } from './ChartCard';
import { usePerformanceMetrics } from '../../../hooks/useAnalyticsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

interface PerformanceTabChartsProps {
  range: string;
}

export function PerformanceTabCharts({ range }: PerformanceTabChartsProps) {
  const { data, isLoading } = usePerformanceMetrics(range);

  if (isLoading || !data) {
    return <SkeletonBlock count={3} className="h-64 rounded-2xl" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Competency Radar vs Benchmark */}
      <ChartCard
        title="Competency Radar Matrix"
        subtitle="Your ratings across 5 domains vs target role benchmark"
      >
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={data.competency}>
            <PolarGrid stroke="var(--border, #e2e8f0)" />
            <PolarAngleAxis dataKey="competency" tick={{ fontSize: 11, fill: '#64748b' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Candidate" dataKey="userScore" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
            <Radar name="Benchmark" dataKey="benchmarkScore" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Chart 2: Question Difficulty Solved Ratio */}
      <ChartCard
        title="Question Difficulty Distribution"
        subtitle="Solved vs attempted questions broken down by difficulty"
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.difficulty}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" />
            <XAxis dataKey="difficulty" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip />
            <Bar dataKey="solved" name="Solved" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="total" name="Total Attempted" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Chart 3: Monthly Performance Growth Area Chart */}
      <ChartCard
        title="Monthly Average Score Trajectory"
        subtitle="Month-over-month score improvement"
        className="lg:col-span-2"
      >
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data.monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              name="Average Score"
              stroke="#2563eb"
              fill="#bfdbfe"
              fillOpacity={0.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

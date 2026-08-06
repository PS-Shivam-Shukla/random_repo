import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { ChartCard } from './ChartCard';
import {
  useScoreTrend,
  useScoreDistribution,
  useWeeklyActivity,
} from '../../../hooks/useAnalyticsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

interface OverviewTabChartsProps {
  range: string;
}

export function OverviewTabCharts({ range }: OverviewTabChartsProps) {
  const { data: scoreTrend, isLoading: loadingTrend } = useScoreTrend(range);
  const { data: scoreDist, isLoading: loadingDist } = useScoreDistribution(range);
  const { data: weeklyAct, isLoading: loadingAct } = useWeeklyActivity(range);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Historical Score Trend */}
      <ChartCard
        title="Score Trajectory Trend"
        subtitle="Historical mock interview scores over time vs platform average"
      >
        {loadingTrend ? (
          <SkeletonBlock count={1} className="h-64 w-full rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={scoreTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                name="Your Score"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4, fill: '#2563eb' }}
              />
              <Line
                type="monotone"
                dataKey="avgScore"
                name="Platform Avg"
                stroke="#94a3b8"
                strokeDasharray="4 4"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Chart 2: Score Bucket Distribution */}
      <ChartCard
        title="Score Bucket Distribution"
        subtitle="Breakdown of completed simulations by score tier"
      >
        {loadingDist ? (
          <SkeletonBlock count={1} className="h-64 w-full rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={scoreDist}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {scoreDist?.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Chart 3: Weekly Activity Breakdown */}
      <ChartCard
        title="Weekly Practice Frequency"
        subtitle="Simulations completed per day of the week"
        className="lg:col-span-2"
      >
        {loadingAct ? (
          <SkeletonBlock count={1} className="h-64 w-full rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyAct}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="interviews" name="Completed Sessions" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { ErrorState } from '../../../components/shared/ErrorState';
import { useLatestReport } from '../../../hooks/useDashboard';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export function LatestReport() {
  const navigate = useNavigate();
  const { data: report, isLoading, isError, refetch } = useLatestReport();

  if (isLoading) {
    return (
      <div className="card-content p-6 flex flex-col items-center space-y-4">
        <SkeletonBlock count={2} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card-content p-6">
        <ErrorState message="Failed to load latest report" onRetry={refetch} className="py-4" />
      </div>
    );
  }

  const overallScore = report?.overall_score ?? 91;
  const roleTitle = report?.role ?? 'Staff Frontend Architect';
  const company = report?.company ?? 'InterviewSage AI';

  const chartData = [
    {
      name: 'Score',
      value: overallScore,
      fill: overallScore >= 85 ? '#6366f1' : overallScore >= 70 ? '#3b82f6' : '#f59e0b',
    },
  ];

  return (
    <div className="card-content p-6 flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
            <Award className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[var(--text-primary)] font-display">
            Latest Report
          </h2>
        </div>
        <button
          onClick={() => navigate('/reports')}
          className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold px-2 py-1 rounded-lg hover:bg-indigo-500/10 transition-colors"
        >
          <span>View</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-col items-center py-2">
        {/* Recharts Radial Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="72%"
              outerRadius="95%"
              startAngle={90}
              endAngle={-270}
              data={chartData}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill={chartData[0].fill}
                background={{ fill: 'var(--border)' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black tracking-tight text-[var(--text-primary)] font-display">
              {overallScore}%
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Overall Score
            </span>
          </div>
        </div>

        <div className="mt-2 text-center space-y-0.5">
          <p className="text-xs font-bold text-[var(--text-primary)] truncate max-w-[200px]">
            {roleTitle}
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">
            Target: <span className="font-semibold text-[var(--text-secondary)]">{company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
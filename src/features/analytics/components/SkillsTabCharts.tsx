import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChartCard } from './ChartCard';
import { useSkillsAnalytics } from '../../../hooks/useAnalyticsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

interface SkillsTabChartsProps {
  range: string;
}

export function SkillsTabCharts({ range }: SkillsTabChartsProps) {
  const { data, isLoading } = useSkillsAnalytics(range);

  if (isLoading || !data) {
    return <SkeletonBlock count={3} className="h-64 rounded-2xl" />;
  }

  const getHeatmapColor = (score: number) => {
    if (score >= 90) return 'bg-blue-600 text-white font-bold';
    if (score >= 80) return 'bg-blue-500/80 text-white font-semibold';
    if (score >= 70) return 'bg-blue-400/60 text-blue-950 font-medium';
    return 'bg-blue-200/50 text-blue-900';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Skills Matrix Grid Heatmap */}
      <ChartCard
        title="Skills Proficiency Matrix Heatmap"
        subtitle="Weekly score progression across core technical skills"
        className="lg:col-span-2"
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-mono">
                <th className="pb-3 pt-1 font-semibold">Technical Domain / Skill</th>
                <th className="pb-3 pt-1 text-center font-semibold">Week 1</th>
                <th className="pb-3 pt-1 text-center font-semibold">Week 2</th>
                <th className="pb-3 pt-1 text-center font-semibold">Week 3</th>
                <th className="pb-3 pt-1 text-center font-semibold">Week 4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {data.heatmap.map((row) => (
                <tr key={row.skill}>
                  <td className="py-3 font-bold text-neutral-900 dark:text-white pr-4">
                    {row.skill}
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span className={`inline-block w-14 py-1.5 rounded-lg text-xs font-mono ${getHeatmapColor(row.week1)}`}>
                      {row.week1}%
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span className={`inline-block w-14 py-1.5 rounded-lg text-xs font-mono ${getHeatmapColor(row.week2)}`}>
                      {row.week2}%
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span className={`inline-block w-14 py-1.5 rounded-lg text-xs font-mono ${getHeatmapColor(row.week3)}`}>
                      {row.week3}%
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span className={`inline-block w-14 py-1.5 rounded-lg text-xs font-mono ${getHeatmapColor(row.week4)}`}>
                      {row.week4}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Chart 2: Top Skills Horizontal Bar */}
      <ChartCard
        title="Top Skills Breakdown"
        subtitle="Ranked technical proficiency levels"
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.topSkills} layout="vertical" margin={{ left: 40 }}>
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis type="category" dataKey="skill" tick={{ fontSize: 10, fill: '#64748b' }} width={120} />
            <Tooltip />
            <Bar dataKey="proficiency" fill="#2563eb" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Chart 3: Technology Domain Share */}
      <ChartCard
        title="Technology Domain Focus"
        subtitle="Distribution of questions by engineering domain"
      >
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data.techDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={85}
            >
              {data.techDistribution.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

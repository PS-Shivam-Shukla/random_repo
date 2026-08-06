import { Flame, Trophy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { useWeeklyGoal } from '../../../hooks/useLearningHub';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

export function WeeklyGoalWidget() {
  const { data: goal, isLoading } = useWeeklyGoal();

  if (isLoading || !goal) {
    return <SkeletonBlock count={1} className="h-56 w-full rounded-2xl" />;
  }

  const chartData = [
    {
      name: 'Weekly Goal',
      value: goal.percent,
      fill: '#2563eb',
    },
  ];

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
      <CardHeader className="p-0 pb-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-amber-500/10 p-2 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
              <Trophy className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Weekly Learning Goal
            </CardTitle>
          </div>
          <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-full">
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            4-Day Streak
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col items-center justify-center text-center space-y-2">
        {/* Recharts Circular Progress Ring */}
        <div className="relative h-36 w-36 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="100%"
              barSize={10}
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar background={{ fill: 'var(--border, #e2e8f0)' }} dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black font-display text-neutral-900 dark:text-white">
              {goal.completedTopics}/{goal.targetTopics}
            </span>
            <span className="text-[10px] font-mono text-neutral-400">Topics Done</span>
          </div>
        </div>

        {/* Encouraging Caption */}
        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
          {goal.encouragingText}
        </p>
      </CardContent>
    </Card>
  );
}

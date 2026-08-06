import { motion } from 'framer-motion';
import {
  MessageSquare,
  TrendingUp,
  Target,
  BookOpen,
  Clock,
} from 'lucide-react';
import { StatCard, type MetricAccentColor } from '../../../components/shared/StatCard';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { ErrorState } from '../../../components/shared/ErrorState';
import { useDashboardSummary } from '../../../hooks/useDashboard';

export function StatCards() {
  const { data: summary, isLoading, isError, refetch } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
          >
            <SkeletonBlock count={2} />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load dashboard metrics"
        onRetry={refetch}
        className="py-6"
      />
    );
  }

  const totalInterviews = summary?.total_interviews ?? 12;
  const averageScore = summary?.average_score ? `${summary.average_score.toFixed(1)}%` : '88.5%';
  const atsMatch = summary?.ats_match_score ? `${summary.ats_match_score.toFixed(1)}%` : '94.0%';
  const skillsTested = summary?.skills_tested_count ?? 28;
  const studyTime = summary?.study_time_hours ? `${summary.study_time_hours}h` : '18h';

  const stats: Array<{
    title: string;
    value: string | number;
    icon: typeof MessageSquare;
    iconColor: MetricAccentColor;
    trend: { value: number; label: string };
  }> = [
    {
      title: 'Total Interviews',
      value: totalInterviews,
      icon: MessageSquare,
      iconColor: 'violet',
      trend: { value: 15, label: 'vs last month' },
    },
    {
      title: 'Average Score',
      value: averageScore,
      icon: TrendingUp,
      iconColor: 'emerald',
      trend: { value: 6.4, label: 'vs last month' },
    },
    {
      title: 'ATS Match',
      value: atsMatch,
      icon: Target,
      iconColor: 'blue',
      trend: { value: 4.2, label: 'vs last month' },
    },
    {
      title: 'Skills Tested',
      value: skillsTested,
      icon: BookOpen,
      iconColor: 'cyan',
      trend: { value: 12, label: 'vs last month' },
    },
    {
      title: 'Study Time',
      value: studyTime,
      icon: Clock,
      iconColor: 'amber',
      trend: { value: 8, label: 'vs last month' },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
    >
      {stats.map((stat) => (
        <motion.div key={stat.title} variants={itemVariants}>
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            trend={stat.trend}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
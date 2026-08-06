import { useState } from 'react';
import { StatCard } from '../../components/shared/StatCard';
import { SkeletonBlock } from '../../components/shared/SkeletonBlock';
import { AnalyticsHeader } from './components/AnalyticsHeader';
import { OverviewTabCharts } from './components/OverviewTabCharts';
import { PerformanceTabCharts } from './components/PerformanceTabCharts';
import { SkillsTabCharts } from './components/SkillsTabCharts';
import { TrendsTabCharts } from './components/TrendsTabCharts';
import { ComparisonTabCharts } from './components/ComparisonTabCharts';

import { useAnalyticsSummary } from '../../hooks/useAnalyticsData';
import { Award, Video, Target, Clock, PieChart, Activity, BookOpen, TrendingUp, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'performance' | 'skills' | 'trends' | 'comparison'
  >('overview');

  const { data: summary, isLoading: summaryLoading } = useAnalyticsSummary(selectedRange);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header & Range Dropdown */}
      <AnalyticsHeader
        selectedRange={selectedRange}
        onRangeChange={(range) => setSelectedRange(range)}
      />

      {/* 4 StatCards Row */}
      {summaryLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonBlock count={1} className="h-28 rounded-2xl" />
          <SkeletonBlock count={1} className="h-28 rounded-2xl" />
          <SkeletonBlock count={1} className="h-28 rounded-2xl" />
          <SkeletonBlock count={1} className="h-28 rounded-2xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Average Simulation Score"
            value={`${summary?.avgScore || 84.5} / 100`}
            icon={Award}
            trend={{ value: summary?.scoreDelta || 6.2, label: 'vs last period' }}
          />
          <StatCard
            title="Total Interviews Completed"
            value={summary?.totalInterviews || 24}
            icon={Video}
            trend={{ value: summary?.interviewsDelta || 4, label: 'sessions this period' }}
          />
          <StatCard
            title="ATS Role Match Rating"
            value={`${summary?.atsMatch || 92}%`}
            icon={Target}
            trend={{ value: summary?.atsDelta || 5.0, label: 'vs target role' }}
          />
          <StatCard
            title="Cumulative Study Time"
            value={summary?.studyTime || '48.5 hrs'}
            icon={Clock}
            trend={{ value: summary?.studyTimeDelta || 12.0, label: 'hours invested' }}
          />
        </div>
      )}

      {/* 5 Sub-Navigation Tab Switcher */}
      <div className="border-b border-[var(--border)]">
        <div className="flex items-center gap-2 overflow-x-auto pb-px scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap',
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            <PieChart className="h-4 w-4" />
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('performance')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap',
              activeTab === 'performance'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            <Activity className="h-4 w-4" />
            Performance
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap',
              activeTab === 'skills'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            <BookOpen className="h-4 w-4" />
            Skills Matrix
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trends')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap',
              activeTab === 'trends'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            <TrendingUp className="h-4 w-4" />
            Trends & Growth
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comparison')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap',
              activeTab === 'comparison'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            <Users className="h-4 w-4" />
            Peer Comparison
          </button>
        </div>
      </div>

      {/* Tab Chart Views */}
      <div className="pt-2">
        {activeTab === 'overview' && <OverviewTabCharts range={selectedRange} />}
        {activeTab === 'performance' && <PerformanceTabCharts range={selectedRange} />}
        {activeTab === 'skills' && <SkillsTabCharts range={selectedRange} />}
        {activeTab === 'trends' && <TrendsTabCharts range={selectedRange} />}
        {activeTab === 'comparison' && <ComparisonTabCharts range={selectedRange} />}
      </div>
    </div>
  );
}

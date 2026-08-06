import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SkeletonBlock } from '../../components/shared/SkeletonBlock';
import { ErrorState } from '../../components/shared/ErrorState';
import { useInterviewReport } from '../../hooks/useInterviewReport';

import { ReportHeader } from './components/ReportHeader';
import { ReportSummaryCards } from './components/ReportSummaryCards';
import { OverviewTab } from './components/OverviewTab';
import { QuestionsTab } from './components/QuestionsTab';
import { SkillsTab } from './components/SkillsTab';
import { FeedbackTab } from './components/FeedbackTab';
import { TimelineTab } from './components/TimelineTab';

import { PieChart, HelpCircle, BookOpen, Sparkles, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ReportsPage() {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('reportId') || 'rep-101';

  const [activeTab, setActiveTab] = useState<
    'overview' | 'questions' | 'skills' | 'feedback' | 'timeline'
  >('overview');

  const { data: report, isLoading, isError, refetch } = useInterviewReport(reportId);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        <SkeletonBlock count={1} className="h-16 w-full rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SkeletonBlock count={1} className="h-28 rounded-2xl" />
          <SkeletonBlock count={1} className="h-28 rounded-2xl" />
          <SkeletonBlock count={1} className="h-28 rounded-2xl" />
        </div>
        <SkeletonBlock count={1} className="h-96 rounded-2xl" />
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <ErrorState
          message="Failed to load interview performance report."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <ReportHeader
        reportId={report.id}
        reportTitle={report.reportTitle}
        candidateRole={report.candidateRole}
        completionDate={report.completionDate}
      />

      {/* Top 3 Summary Cards */}
      <ReportSummaryCards
        overallScore={report.overallScore}
        atsMatchScore={report.atsMatchScore}
        percentileRank={report.percentileRank}
      />

      {/* 5 Tab Navigation Switcher */}
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
            onClick={() => setActiveTab('questions')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap',
              activeTab === 'questions'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            <HelpCircle className="h-4 w-4" />
            Questions Review ({report.questions.length})
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
            Skills Breakdown ({report.skills.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('feedback')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap',
              activeTab === 'feedback'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            <Sparkles className="h-4 w-4" />
            AI Feedback & Roadmap
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap',
              activeTab === 'timeline'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            )}
          >
            <Activity className="h-4 w-4" />
            Telemetry Timeline
          </button>
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="pt-2">
        {activeTab === 'overview' && <OverviewTab report={report} />}
        {activeTab === 'questions' && <QuestionsTab report={report} />}
        {activeTab === 'skills' && <SkillsTab report={report} />}
        {activeTab === 'feedback' && <FeedbackTab report={report} />}
        {activeTab === 'timeline' && <TimelineTab report={report} />}
      </div>
    </div>
  );
}

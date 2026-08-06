import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { SkeletonBlock } from './SkeletonBlock';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import { cn } from '../../lib/utils';
import { LucideIcon, BarChart2 } from 'lucide-react';

export interface ChartCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: 'blue' | 'violet' | 'emerald' | 'amber' | 'cyan' | 'indigo' | 'rose';
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  onRetry?: () => void;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ChartCard({
  title,
  description,
  icon: Icon,
  iconColor = 'blue',
  isLoading = false,
  isError = false,
  isEmpty = false,
  emptyTitle = 'No data available',
  emptyMessage = 'Complete an interview session to display metrics here.',
  onRetry,
  headerAction,
  children,
  className,
  contentClassName,
}: ChartCardProps) {
  return (
    <Card
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800/90 dark:bg-neutral-950',
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-2">
        <div className="flex items-center gap-3">
          {Icon && (
            <div
              className={cn(
                'rounded-xl p-2 shrink-0',
                iconColor === 'blue' && 'bg-blue-500/10 text-blue-600 dark:bg-blue-400/15 dark:text-blue-400',
                iconColor === 'violet' && 'bg-violet-500/10 text-violet-600 dark:bg-violet-400/15 dark:text-violet-400',
                iconColor === 'emerald' && 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400',
                iconColor === 'amber' && 'bg-amber-500/10 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400',
                iconColor === 'cyan' && 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/15 dark:text-cyan-400',
                iconColor === 'indigo' && 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-400',
                iconColor === 'rose' && 'bg-rose-500/10 text-rose-600 dark:bg-rose-400/15 dark:text-rose-400',
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
        {headerAction && <div className="flex items-center gap-2">{headerAction}</div>}
      </CardHeader>

      <CardContent className={cn('flex-1 p-5 pt-2', contentClassName)}>
        {isLoading ? (
          <div className="h-64 flex flex-col justify-end gap-2 pt-4">
            <SkeletonBlock className="h-full w-full rounded-xl" />
          </div>
        ) : isError ? (
          <ErrorState
            message="Failed to load analytics metrics from server."
            onRetry={onRetry}
          />
        ) : isEmpty ? (
          <EmptyState
            icon={BarChart2}
            title={emptyTitle}
            description={emptyMessage}
          />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

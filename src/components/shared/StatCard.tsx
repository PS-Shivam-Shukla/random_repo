import { cn } from '../../lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export type MetricAccentColor = 'blue' | 'violet' | 'emerald' | 'amber' | 'cyan' | 'indigo' | 'rose';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: { value: number; label: string };
  iconColor?: MetricAccentColor | string;
  accentBorder?: boolean;
  className?: string;
}

const colorStyles: Record<MetricAccentColor, { badge: string; icon: string }> = {
  blue: {
    badge: 'bg-blue-500/10 dark:bg-blue-400/15',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  violet: {
    badge: 'bg-violet-500/10 dark:bg-violet-400/15',
    icon: 'text-violet-600 dark:text-violet-400',
  },
  emerald: {
    badge: 'bg-emerald-500/10 dark:bg-emerald-400/15',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  amber: {
    badge: 'bg-amber-500/10 dark:bg-amber-400/15',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  cyan: {
    badge: 'bg-cyan-500/10 dark:bg-cyan-400/15',
    icon: 'text-cyan-600 dark:text-cyan-400',
  },
  indigo: {
    badge: 'bg-indigo-500/10 dark:bg-indigo-400/15',
    icon: 'text-indigo-600 dark:text-indigo-400',
  },
  rose: {
    badge: 'bg-rose-500/10 dark:bg-rose-400/15',
    icon: 'text-rose-600 dark:text-rose-400',
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  iconColor = 'blue',
  accentBorder = false,
  className,
}: StatCardProps) {
  const isPositive = trend && trend.value >= 0;
  const colorScheme = colorStyles[iconColor as MetricAccentColor] || colorStyles.blue;

  return (
    <div
      className={cn(
        'group card-metric relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--border-strong)]',
        accentBorder && 'border-l-4 border-l-indigo-600 dark:border-l-indigo-400',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {title}
          </p>
          <p className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] font-display">
            {value}
          </p>
        </div>
        <div
          className={cn(
            'rounded-xl p-2.5 shrink-0 transition-transform duration-200 group-hover:scale-105',
            colorScheme.badge,
            colorScheme.icon,
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {(trend || description) && (
        <div className="mt-3 flex items-center gap-2 pt-2.5 border-t border-[var(--border-subtle)] text-[11px]">
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-bold rounded-md px-1.5 py-0.5 font-mono text-[10px]',
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositive ? '+' : ''}
              {trend.value}%
            </span>
          )}
          <span className="text-[var(--text-muted)] truncate font-medium">
            {trend ? trend.label : description}
          </span>
        </div>
      )}
    </div>
  );
}

import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-gradient-to-br from-neutral-50 to-white px-6 py-10 text-center dark:border-neutral-800 dark:from-neutral-900/60 dark:to-neutral-900', className)}>
      <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 shadow-sm shadow-blue-100 dark:bg-blue-950/40 dark:text-blue-400">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-6">
          {action.label}
        </Button>
      )}
    </div>
  );
}

import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ message = 'Something went wrong', onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/70 px-6 py-10 text-center dark:border-red-950/40 dark:bg-red-950/20', className)}>
      <div className="rounded-2xl bg-red-100 p-4 text-red-600 dark:bg-red-950/40 dark:text-red-400">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">Error</h3>
      <p className="mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-6">
          Try Again
        </Button>
      )}
    </div>
  );
}

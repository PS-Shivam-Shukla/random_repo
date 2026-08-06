import { Skeleton } from '../ui/Skeleton';
import { cn } from '../../lib/utils';

interface SkeletonBlockProps {
  count?: number;
  className?: string;
}

export function SkeletonBlock({ count = 1, className }: SkeletonBlockProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

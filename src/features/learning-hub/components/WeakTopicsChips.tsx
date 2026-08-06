import { AlertCircle, Check } from 'lucide-react';
import { useWeakTopics } from '../../../hooks/useLearningHub';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { cn } from '../../../lib/utils';

interface WeakTopicsChipsProps {
  selectedTopic: string | null;
  onSelectTopic: (topicName: string | null) => void;
}

export function WeakTopicsChips({ selectedTopic, onSelectTopic }: WeakTopicsChipsProps) {
  const { data: topics, isLoading } = useWeakTopics();

  if (isLoading || !topics) {
    return <SkeletonBlock count={1} className="h-16 w-full rounded-2xl" />;
  }

  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-display">
            Target Focus Areas (Weak Topics)
          </h3>
        </div>
        {selectedTopic && (
          <button
            type="button"
            onClick={() => onSelectTopic(null)}
            className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {topics.map((t) => {
          const isSelected = selectedTopic === t.name;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTopic(isSelected ? null : t.name)}
              className={cn(
                'flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all shadow-2xs',
                isSelected
                  ? 'border-blue-600 bg-blue-600 text-white font-semibold shadow-xs'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-blue-400 hover:bg-blue-50/50 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300 dark:hover:bg-neutral-800',
              )}
            >
              {isSelected && <Check className="h-3 w-3" />}
              <span>{t.name}</span>
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold',
                  isSelected
                    ? 'bg-blue-800 text-blue-100'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
                )}
              >
                {t.count} miss
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

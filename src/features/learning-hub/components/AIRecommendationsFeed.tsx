import { Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { useAIRecommendations } from '../../../hooks/useLearningHub';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

export function AIRecommendationsFeed() {
  const { data: recs, isLoading } = useAIRecommendations();

  if (isLoading || !recs) {
    return <SkeletonBlock count={1} className="h-44 w-full rounded-2xl" />;
  }

  return (
    <Card className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-5 shadow-sm dark:border-blue-950/40 dark:bg-blue-950/20 space-y-3">
      <CardHeader className="p-0 pb-1">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
            AI Agent Suggestions Feed
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        {recs.map((rec) => (
          <div
            key={rec.id}
            className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-blue-100 dark:border-neutral-800 space-y-1.5 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                {rec.topic}
              </span>
              <span className="text-[10px] font-mono font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 px-2 py-0.2 rounded-md">
                {rec.priority} Priority
              </span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {rec.reason}
            </p>

            <button
              type="button"
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 pt-1"
            >
              <span>{rec.suggestedAction}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

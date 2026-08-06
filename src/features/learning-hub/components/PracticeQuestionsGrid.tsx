import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Filter, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { usePracticeQuestions } from '../../../hooks/useLearningHub';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

interface PracticeQuestionsGridProps {
  activeTopicFilter: string | null;
}

export function PracticeQuestionsGrid({ activeTopicFilter }: PracticeQuestionsGridProps) {
  const navigate = useNavigate();
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const { data: questions, isLoading } = usePracticeQuestions(activeTopicFilter || undefined);

  if (isLoading || !questions) {
    return <SkeletonBlock count={2} className="h-40 rounded-2xl" />;
  }

  const filtered = questions.filter((q) => {
    if (difficultyFilter === 'All') return true;
    return q.difficulty === difficultyFilter;
  });

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
      <CardHeader className="p-0 pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Targeted Practice Exercises
            </CardTitle>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {activeTopicFilter
                ? `Filtered by topic: "${activeTopicFilter}"`
                : 'Solve quick 10-20 minute practice scenarios'}
            </p>
          </div>

          {/* Difficulty Filter Switcher */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl shrink-0">
            <Filter className="h-3.5 w-3.5 text-neutral-400 ml-1.5" />
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setDifficultyFilter(diff)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  difficultyFilter === diff
                    ? 'bg-white text-blue-600 shadow-2xs dark:bg-neutral-900 dark:text-blue-400'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-3">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-neutral-100 bg-neutral-50/60 dark:border-neutral-800 dark:bg-neutral-800/40 hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant={q.difficulty === 'Hard' ? 'danger' : q.difficulty === 'Medium' ? 'warning' : 'success'}
                    className="text-[10px] px-2 py-0.2 font-semibold"
                  >
                    {q.difficulty}
                  </Badge>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase bg-neutral-200/60 dark:bg-neutral-700/60 px-1.5 py-0.5 rounded">
                    {q.type}
                  </span>
                  <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                    {q.topic}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-neutral-900 dark:text-white leading-snug">
                  {q.title}
                </h4>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {q.estimatedMins}m
                </span>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => navigate('/interview-session')}
                  className="h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3"
                >
                  <Play className="mr-1 h-3 w-3 fill-current" /> Practice Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

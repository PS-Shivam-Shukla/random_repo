import { CheckCircle2, Lock, Clock, Map } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { useLearningPath } from '../../../hooks/useLearningHub';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { cn } from '../../../lib/utils';

export function LearningPathRoadmap() {
  const { data: pathSteps, isLoading } = useLearningPath();

  if (isLoading || !pathSteps) {
    return <SkeletonBlock count={1} className="h-64 w-full rounded-2xl" />;
  }

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Map className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Personalized Learning Roadmap Path
            </CardTitle>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Step-by-step competency trajectory to reach Senior/Staff readiness
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-neutral-200 dark:before:bg-neutral-800">
          {pathSteps.map((step) => {
            const isCompleted = step.status === 'Completed';
            const isInProgress = step.status === 'In Progress';

            return (
              <div key={step.stepNumber} className="relative space-y-1">
                {/* Status Icon Node */}
                <div
                  className={cn(
                    'absolute -left-[27px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ring-4 ring-white dark:ring-neutral-950 transition-all',
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isInProgress
                        ? 'bg-blue-600 text-white ring-blue-600/20 animate-pulse'
                        : 'bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400',
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : isInProgress ? (
                    <span>{step.stepNumber}</span>
                  ) : (
                    <Lock className="h-3 w-3" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    Step {step.stepNumber}: {step.title}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md',
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : isInProgress
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400',
                    )}
                  >
                    {step.status}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-1 flex items-center gap-2 text-[11px] text-neutral-400">
                  <Clock className="h-3 w-3" />
                  <span>Est. time: {step.estimatedTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

import { BookOpen, Server, Code2, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useRecommendedCourses } from '../../../hooks/useLearningHub';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

const ICON_MAP = {
  BookOpen,
  Server,
  Code2,
  Sparkles,
};

export function RecommendedCourses() {
  const { data: courses, isLoading } = useRecommendedCourses();

  if (isLoading || !courses) {
    return <SkeletonBlock count={3} className="h-44 rounded-2xl" />;
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-display">
            Recommended for You
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Tailored learning modules synthesized from your recent interview evaluations
          </p>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
        >
          View All Library <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => {
          const IconComponent = (ICON_MAP as any)[course.iconName] || BookOpen;

          return (
            <Card
              key={course.id}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 flex flex-col justify-between"
            >
              <CardContent className="p-0 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-xl bg-blue-600/10 p-3 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded-md">
                    {course.progressPercent}% Completed
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    {course.category}
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 text-[11px] font-mono">
                    {course.durationMinutes} mins
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 p-0"
                  >
                    <Play className="mr-1 h-3 w-3 fill-current" /> Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

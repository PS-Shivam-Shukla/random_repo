import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { BookOpen } from 'lucide-react';
import type { ComprehensiveInterviewReport } from '../../../hooks/useInterviewReport';

interface SkillsTabProps {
  report: ComprehensiveInterviewReport;
}

export function SkillsTab({ report }: SkillsTabProps) {
  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Detailed Per-Skill Evaluation Breakdown
            </CardTitle>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Diagnostic ratings for technical stack competencies and soft skills
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {report.skills.map((s) => {
            const badgeVariant =
              s.label === 'Expert'
                ? 'success'
                : s.label === 'Proficient'
                  ? 'secondary'
                  : 'warning';

            return (
              <div
                key={s.skillName}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      {s.skillName}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                      {s.category}
                    </span>
                  </div>
                  <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800 mt-2">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                    {s.score} / 100
                  </span>
                  <Badge variant={badgeVariant} className="text-xs font-semibold">
                    {s.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

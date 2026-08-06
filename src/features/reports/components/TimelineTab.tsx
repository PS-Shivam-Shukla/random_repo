import { Activity, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import type { ComprehensiveInterviewReport } from '../../../hooks/useInterviewReport';

interface TimelineTabProps {
  report: ComprehensiveInterviewReport;
}

export function TimelineTab({ report }: TimelineTabProps) {
  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Live Evaluation Telemetry Timeline
            </CardTitle>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Turn-by-turn trajectory of technical coverage, communication, and confidence scores
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200 dark:before:bg-neutral-800">
          {report.timeline.map((item) => (
            <div key={item.turnNumber} className="relative space-y-2">
              {/* Timeline Node Bullet */}
              <div className="absolute -left-[27px] top-0.5 h-4 w-4 rounded-full border-2 border-blue-600 bg-white dark:bg-neutral-900 dark:border-blue-400 ring-4 ring-white dark:ring-neutral-950" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  Turn #{item.turnNumber}: {item.questionTitle}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.timestamp}
                </span>
              </div>

              {/* 4 Score Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block">Technical</span>
                  <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">
                    {item.technicalCoverage}%
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block">Communication</span>
                  <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">
                    {item.communication}%
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block">Confidence</span>
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {item.confidence}%
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/30">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block">Completeness</span>
                  <span className="text-xs font-bold font-mono text-violet-600 dark:text-violet-400">
                    {item.completeness}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertTriangle, GraduationCap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import type { ComprehensiveInterviewReport } from '../../../hooks/useInterviewReport';

interface FeedbackTabProps {
  report: ComprehensiveInterviewReport;
}

export function FeedbackTab({ report }: FeedbackTabProps) {
  const { feedback } = report;

  return (
    <div className="space-y-6">
      {/* AI Synthesis Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths Synthesis */}
        <Card className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-5 dark:border-emerald-950/40 dark:bg-emerald-950/20">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <CardTitle className="text-base font-bold text-emerald-900 dark:text-emerald-300 font-display">
                Core Candidate Strengths
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="space-y-2 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              {feedback.strengthsSummary.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Growth Areas Synthesis */}
        <Card className="rounded-2xl border border-amber-200/80 bg-amber-50/30 p-5 dark:border-amber-950/40 dark:bg-amber-950/20">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-base font-bold text-amber-900 dark:text-amber-300 font-display">
                Key Growth Opportunities
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="space-y-2 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              {feedback.growthSummary.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Learning Roadmap List */}
      <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                <GraduationCap className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
                Personalized Learning Roadmap
              </CardTitle>
            </div>

            <Link
              to="/learning-hub"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
            >
              Explore Learning Hub
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-3">
          {feedback.learningRoadmap.map((module) => (
            <div
              key={module.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-neutral-100 bg-neutral-50/60 dark:border-neutral-800 dark:bg-neutral-800/40"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    {module.topic}
                  </span>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded">
                    {module.targetSkill}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {module.description}
                </p>
              </div>

              <Link
                to="/learning-hub"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline shrink-0"
              >
                <span>Practice Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

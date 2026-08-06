import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, User, BookOpen } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import type { ComprehensiveInterviewReport } from '../../../hooks/useInterviewReport';

interface QuestionsTabProps {
  report: ComprehensiveInterviewReport;
}

export function QuestionsTab({ report }: QuestionsTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    report.questions[0]?.id || null,
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {report.questions.map((q) => {
        const isExpanded = expandedId === q.id;

        return (
          <Card
            key={q.id}
            className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 transition-all"
          >
            {/* Header row (Click to toggle) */}
            <div
              onClick={() => toggleExpand(q.id)}
              className="flex items-start justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                    Question #{q.questionNumber}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {q.difficulty}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug">
                  {q.questionText}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge
                  variant={q.score >= 85 ? 'success' : q.score >= 70 ? 'warning' : 'danger'}
                  className="text-xs font-bold font-mono px-2.5 py-0.5"
                >
                  {q.score} / 100
                </Badge>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                )}
              </div>
            </div>

            {/* Expandable Accordion Body */}
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                {/* Candidate Answer */}
                <div className="rounded-xl border border-neutral-200/60 bg-neutral-50/70 p-3.5 dark:border-neutral-800 dark:bg-neutral-950/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <User className="h-3.5 w-3.5 text-blue-600" />
                    Candidate Submitted Answer
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {q.candidateAnswer}
                  </p>
                </div>

                {/* Expected Ideal Answer */}
                <div className="rounded-xl border border-neutral-200/60 bg-blue-50/30 p-3.5 dark:border-neutral-800 dark:bg-blue-950/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 dark:text-blue-300">
                    <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                    Expected Ideal Answer Benchmark
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {q.expectedAnswer}
                  </p>
                </div>

                {/* AI Evaluator Feedback Callout Box */}
                <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5 dark:border-emerald-950/40 dark:bg-emerald-950/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    AI Evaluator Feedback & Diagnostic
                  </div>
                  <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                    {q.aiFeedback}
                  </p>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

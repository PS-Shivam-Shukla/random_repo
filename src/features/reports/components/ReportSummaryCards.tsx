import { Award, Target, Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

interface ReportSummaryCardsProps {
  overallScore: number;
  atsMatchScore: number;
  percentileRank: number;
}

export function ReportSummaryCards({
  overallScore,
  atsMatchScore,
  percentileRank,
}: ReportSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Card 1: Overall Score */}
      <Card className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
        <CardContent className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Overall Evaluation Score
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-display">
                  {overallScore}
                </span>
                <span className="text-sm font-semibold text-neutral-400">/ 100</span>
              </div>
            </div>
            <div className="rounded-xl bg-blue-600/10 p-3 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 shrink-0">
              <Award className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="inline-flex items-center gap-1 font-semibold rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5">
              <TrendingUp className="h-3 w-3" /> Good Performance
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">Strong Candidate Verdict</span>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: ATS Match % */}
      <Card className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
        <CardContent className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                ATS Role Match Rating
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-display">
                  {atsMatchScore}%
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-emerald-600/10 p-3 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 shrink-0">
              <Target className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="inline-flex items-center gap-1 font-semibold rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5">
              Excellent Match
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">Aligned with Job Spec</span>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Percentile Ranking */}
      <Card className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
        <CardContent className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Candidate Peer Percentile
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-display">
                  Top {percentileRank}%
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-violet-600/10 p-3 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 shrink-0">
              <Trophy className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">
              Better than <strong className="text-neutral-900 dark:text-white font-bold">{100 - percentileRank}%</strong> of applicants
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { CheckCircle2, AlertTriangle, ShieldCheck, PieChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import type { ComprehensiveInterviewReport } from '../../../hooks/useInterviewReport';

interface OverviewTabProps {
  report: ComprehensiveInterviewReport;
}

export function OverviewTab({ report }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Top Grid: Radar Chart + Round Scores Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Competency Chart */}
        <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                <PieChart className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
                Competency Radar Breakdown
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex items-center justify-center min-h-[280px]">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={report.radarCompetencies}>
                <PolarGrid stroke="var(--border, #e2e8f0)" />
                <PolarAngleAxis
                  dataKey="competency"
                  tick={{ fill: 'var(--text-secondary, #64748b)', fontSize: 11, fontWeight: 500 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Candidate"
                  dataKey="score"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Section / Round Scores List */}
        <Card className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
                Round-Level Diagnostic Scores
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            {report.roundScores.map((r) => {
              const percent = Math.round((r.score / r.maxScore) * 100);
              return (
                <div key={r.roundName} className="space-y-1.5 p-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-neutral-800 dark:text-neutral-200">{r.roundName}</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {r.score} / {r.maxScore}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid: Strengths vs Areas to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths Panel (Green) */}
        <Card className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-5 dark:border-emerald-950/40 dark:bg-emerald-950/20">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <CardTitle className="text-base font-bold text-emerald-900 dark:text-emerald-300 font-display">
                Key Performance Strengths
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="space-y-2 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              {report.strengths.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Areas to Improve Panel (Amber) */}
        <Card className="rounded-2xl border border-amber-200/80 bg-amber-50/30 p-5 dark:border-amber-950/40 dark:bg-amber-950/20">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-base font-bold text-amber-900 dark:text-amber-300 font-display">
                Areas for Growth & Improvement
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="space-y-2 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              {report.areasToImprove.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

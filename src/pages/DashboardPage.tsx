import { useDashboard } from "../features/dashboard/hooks/useDashboard";
import { Award, BarChart3, Clock, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const { summary, trends, competencies } = useDashboard();

  if (summary.isLoading || trends.isLoading || competencies.isLoading) {
    return (
      <div className="flex h-64 items-center justify-center p-8 text-neutral-400">
        <div className="flex items-center gap-3 font-medium">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          Loading analytics dashboard...
        </div>
      </div>
    );
  }

  if (summary.isError || trends.isError || competencies.isError) {
    return (
      <div className="p-8">
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-400">
          Failed to load dashboard metrics from backend.
        </div>
      </div>
    );
  }

  const summaryData = summary.data;
  const trendList = trends.data || [];
  const compList = competencies.data || [];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-display">Candidate Overview</h1>
        <p className="text-xs text-neutral-400">
          Real-time performance analytics aggregated directly from your interview simulations.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Interviews</span>
            <BarChart3 className="h-4 w-4 text-blue-400" />
          </div>
          <p className="mt-3 text-3xl font-bold text-white font-mono">
            {summaryData?.total_interviews ?? 0}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Score</span>
            <Award className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 text-3xl font-bold text-white font-mono">
            {summaryData?.average_score != null ? `${summaryData.average_score.toFixed(1)}%` : "N/A"}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Completion Rate</span>
            <CheckCircle className="h-4 w-4 text-purple-400" />
          </div>
          <p className="mt-3 text-3xl font-bold text-white font-mono">
            {summaryData?.completion_rate != null
              ? `${(summaryData.completion_rate * 100).toFixed(0)}%`
              : "0%"}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-3 text-3xl font-bold text-white font-mono">
            {summaryData?.in_progress_count ?? 0}
          </p>
        </div>
      </div>

      {/* Weak Competencies Alert Card */}
      {summaryData?.weak_competencies && summaryData.weak_competencies.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <h2 className="text-sm font-bold">Recommended Areas for Improvement</h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {summaryData.weak_competencies.map((area) => (
              <span
                key={area}
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Score Trend & Competencies Panels */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Score Trend Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white">Score Trends Over Time</h2>
          </div>
          {trendList.length === 0 ? (
            <p className="text-xs text-neutral-500 py-6 text-center">
              No interview score history recorded yet. Complete a session to see performance trends.
            </p>
          ) : (
            <div className="space-y-3">
              {trendList.map((item, idx) => (
                <div key={item.interview_id || idx} className="flex items-center justify-between text-xs border-b border-neutral-800/60 pb-2">
                  <span className="text-neutral-400 font-mono">{item.date}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${Math.min(item.score, 100)}%` }}
                      />
                    </div>
                    <span className="font-bold text-white font-mono w-10 text-right">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Competencies Progress Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Competency Breakdown</h2>
          </div>
          {compList.length === 0 ? (
            <p className="text-xs text-neutral-500 py-6 text-center">
              No competency evaluation metrics available yet.
            </p>
          ) : (
            <div className="space-y-4">
              {compList.map((comp) => (
                <div key={comp.competency} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-neutral-300">{comp.competency}</span>
                    <span className="font-mono text-emerald-400 font-bold">{comp.avg_score.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${Math.min(comp.avg_score, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
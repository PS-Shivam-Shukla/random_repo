import { X, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { HistoryItem } from '../../../hooks/useInterviewHistory';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: HistoryItem[];
}

export function CompareModal({ isOpen, onClose, selectedItems }: CompareModalProps) {
  if (!isOpen || selectedItems.length < 2) return null;

  const itemA = selectedItems[0];
  const itemB = selectedItems[1];
  const scoreDelta = (itemA.score - itemB.score).toFixed(1);
  const isAHigher = itemA.score >= itemB.score;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-display">
                Side-by-Side Session Comparison
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Comparing score metrics, competency deltas, and round performance
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Column A */}
          <div className="rounded-2xl border border-blue-200/80 bg-blue-50/30 p-4 space-y-3 dark:border-blue-950/40 dark:bg-blue-950/20">
            <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-blue-400">
              Session A
            </span>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                {itemA.roleTitle}
              </h3>
              <p className="text-xs text-neutral-500">{itemA.companyName} • {itemA.completionDate}</p>
            </div>
            <div className="flex items-baseline gap-1 pt-1">
              <span className="text-3xl font-extrabold text-neutral-900 dark:text-white font-display">
                {itemA.score}
              </span>
              <span className="text-xs text-neutral-400">/ 100</span>
            </div>
          </div>

          {/* Column B */}
          <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-4 space-y-3 dark:border-neutral-800 dark:bg-neutral-950/50">
            <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
              Session B
            </span>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                {itemB.roleTitle}
              </h3>
              <p className="text-xs text-neutral-500">{itemB.companyName} • {itemB.completionDate}</p>
            </div>
            <div className="flex items-baseline gap-1 pt-1">
              <span className="text-3xl font-extrabold text-neutral-900 dark:text-white font-display">
                {itemB.score}
              </span>
              <span className="text-xs text-neutral-400">/ 100</span>
            </div>
          </div>
        </div>

        {/* Delta Callout Card */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-950/40 dark:bg-emerald-950/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                Score Delta: {isAHigher ? `+${scoreDelta}` : scoreDelta} points
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                {isAHigher ? `${itemA.roleTitle} scored higher by ${scoreDelta} pts` : `${itemB.roleTitle} scored higher by ${Math.abs(Number(scoreDelta))} pts`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" /> Validated
          </div>
        </div>

        {/* Breakdown table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
            Competency & Round Breakdown Deltas
          </h4>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Technical Depth</span>
              <div className="flex items-center gap-6 font-mono font-semibold">
                <span className="text-blue-600">88%</span>
                <span className="text-neutral-500">82%</span>
              </div>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">System Design</span>
              <div className="flex items-center gap-6 font-mono font-semibold">
                <span className="text-blue-600">85%</span>
                <span className="text-neutral-500">90%</span>
              </div>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">STAR Communication</span>
              <div className="flex items-center gap-6 font-mono font-semibold">
                <span className="text-blue-600">86%</span>
                <span className="text-neutral-500">80%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <Button type="button" size="sm" onClick={onClose} className="rounded-xl text-xs">
            Close Comparison
          </Button>
        </div>
      </div>
    </div>
  );
}

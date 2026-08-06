import { Sparkles, X, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface CompareFloatingBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onOpenCompareModal: () => void;
}

export function CompareFloatingBar({
  selectedCount,
  onClearSelection,
  onOpenCompareModal,
}: CompareFloatingBarProps) {
  if (selectedCount < 2) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between gap-4 rounded-2xl border border-blue-200 bg-neutral-900 px-5 py-3 text-white shadow-2xl backdrop-blur-xl dark:border-neutral-800 animate-in fade-in slide-in-from-bottom-6 max-w-lg w-[calc(100%-2rem)]">
      <div className="flex items-center gap-2 text-xs font-semibold">
        <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
        <span>
          Selected <strong className="text-blue-400 font-bold">{selectedCount}</strong> interviews
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClearSelection}
          className="text-xs text-neutral-400 hover:text-white p-1"
        >
          <X className="h-4 w-4" />
        </button>

        <Button
          type="button"
          size="sm"
          onClick={onOpenCompareModal}
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4"
        >
          Compare Side-by-Side
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

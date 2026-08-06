import { Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { HistoryItem } from '../../../hooks/useInterviewHistory';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: HistoryItem | null;
  isDeleting?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  item,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
            <Trash2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Delete Interview Record?
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              This action will permanently delete <strong className="text-neutral-900 dark:text-white font-semibold">"{item.roleTitle}"</strong> ({item.completionDate}).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl text-xs"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
          >
            {isDeleting ? 'Deleting...' : 'Delete Record'}
          </Button>
        </div>
      </div>
    </div>
  );
}

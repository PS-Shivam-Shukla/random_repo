import React from 'react';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';

export interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fileName?: string;
  isDeleting?: boolean;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  fileName,
  isDeleting = false,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Resume"
      description="Are you sure you want to delete this resume? This action cannot be undone."
    >
      {fileName && (
        <div className="rounded-lg bg-slate-950 p-3 text-xs font-mono text-slate-300 border border-slate-800 my-3">
          {fileName}
        </div>
      )}
      <div className="flex items-center justify-end space-x-3 mt-6">
        <Button variant="outline" size="sm" onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="destructive" size="sm" onClick={onConfirm} isLoading={isDeleting}>
          Delete Resume
        </Button>
      </div>
    </Dialog>
  );
};

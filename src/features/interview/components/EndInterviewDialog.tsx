import React from 'react';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';

export interface EndInterviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EndInterviewDialog: React.FC<EndInterviewDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="End Interview Session"
      description="Are you sure you want to end this live interview session? All recorded questions, transcript entries, and live scores will be finalized."
    >
      <div className="flex items-center justify-end space-x-3 mt-6">
        <Button variant="outline" size="sm" onClick={onClose}>
          Resume Session
        </Button>
        <Button variant="destructive" size="sm" onClick={onConfirm}>
          End & Save Results
        </Button>
      </div>
    </Dialog>
  );
};

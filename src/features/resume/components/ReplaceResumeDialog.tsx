import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';
import { DragDropUploader } from './DragDropUploader';

export interface ReplaceResumeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReplace: (file: File) => void;
  isReplacing?: boolean;
}

export const ReplaceResumeDialog: React.FC<ReplaceResumeDialogProps> = ({
  isOpen,
  onClose,
  onReplace,
  isReplacing = false,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleConfirm = () => {
    if (selectedFile) {
      onReplace(selectedFile);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Replace Resume File"
      description="Upload a new resume file to replace the existing parsed content."
    >
      <div className="py-4">
        <DragDropUploader onFileSelected={setSelectedFile} disabled={isReplacing} />
        {selectedFile && (
          <p className="mt-3 text-xs text-indigo-400 font-medium">Selected file: {selectedFile.name}</p>
        )}
      </div>
      <div className="flex items-center justify-end space-x-3 mt-4">
        <Button variant="outline" size="sm" onClick={onClose} disabled={isReplacing}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleConfirm} disabled={!selectedFile} isLoading={isReplacing}>
          Upload & Replace
        </Button>
      </div>
    </Dialog>
  );
};

import React, { useState } from 'react';
import { Eye, RefreshCw, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { DeleteDialog } from './DeleteDialog';
import { ReplaceResumeDialog } from './ReplaceResumeDialog';
import { useDeleteResume } from '../hooks/useDeleteResume';
import { useReplaceResume } from '../hooks/useReplaceResume';
import { useNotification } from '../../../hooks/useNotification';
import { Resume } from '../types/resume.types';

export interface ResumeActionsProps {
  resume: Resume;
}

export const ResumeActions: React.FC<ResumeActionsProps> = ({ resume }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isReplaceOpen, setIsReplaceOpen] = useState(false);
  const navigate = useNavigate();
  const notify = useNotification();

  const deleteMutation = useDeleteResume();
  const replaceMutation = useReplaceResume();

  const handleDelete = () => {
    deleteMutation.mutate(resume.id, {
      onSuccess: () => {
        notify.success('Resume Deleted', `"${resume.file_path}" removed.`);
        setIsDeleteOpen(false);
      },
      onError: (err) => {
        notify.error('Delete Failed', err.message);
      },
    });
  };

  const handleReplace = (file: File) => {
    replaceMutation.mutate(
      { resumeId: resume.id, file },
      {
        onSuccess: () => {
          notify.success('Resume Replaced', `New file "${file.name}" uploaded and parsed.`);
          setIsReplaceOpen(false);
        },
        onError: (err) => {
          notify.error('Replace Failed', err.message);
        },
      }
    );
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/resumes/${resume.id}`)}
          leftIcon={<Eye className="w-3.5 h-3.5" />}
        >
          View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsReplaceOpen(true)}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Replace
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
          onClick={() => setIsDeleteOpen(true)}
          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
        >
          Delete
        </Button>
      </div>

      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        fileName={resume.file_path}
        isDeleting={deleteMutation.isPending}
      />

      <ReplaceResumeDialog
        isOpen={isReplaceOpen}
        onClose={() => setIsReplaceOpen(false)}
        onReplace={handleReplace}
        isReplacing={replaceMutation.isPending}
      />
    </>
  );
};

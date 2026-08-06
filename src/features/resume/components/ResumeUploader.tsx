import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropUploader } from './DragDropUploader';
import { UploadProgress } from './UploadProgress';
import { useUploadResume } from '../hooks/useUploadResume';
import { useNotification } from '../../../hooks/useNotification';

export const ResumeUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const notify = useNotification();
  const navigate = useNavigate();

  const uploadMutation = useUploadResume((progress) => setUploadProgress(progress));

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setUploadProgress(0);
    setUploadError(null);

    uploadMutation.mutate(file, {
      onSuccess: (data) => {
        notify.success('Resume Uploaded!', `File "${file.name}" parsed successfully.`);
        // Redirect directly to Resume Analysis Page as required by Sprint 0.1
        navigate(`/resumes/${data.id}/analysis`);
      },
      onError: (err) => {
        setUploadError(err.message || 'Upload failed.');
        notify.error('Upload Failed', err.message);
      },
    });
  };

  const handleRetry = () => {
    if (selectedFile) {
      handleFileSelected(selectedFile);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      <DragDropUploader onFileSelected={handleFileSelected} disabled={uploadMutation.isPending} />

      {selectedFile && (
        <UploadProgress
          file={selectedFile}
          progress={uploadProgress}
          isUploading={uploadMutation.isPending}
          error={uploadError}
          onRetry={handleRetry}
          onCancel={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

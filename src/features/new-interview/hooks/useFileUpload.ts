import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resumesApi } from '../../../services/resumes.api';

export interface UploadState {
  progress: number;
  isUploading: boolean;
  isComplete: boolean;
  error: string | null;
  uploadedFile: File | null;
}

export interface UploadedResume {
  id: string;
  filename: string;
  size: number;
  uploadedAt: string;
}

const ACCEPTED_FILE_TYPES = ['.pdf', '.doc', '.docx'] as const;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export function validateFile(file: File): { isValid: boolean; error?: string } {
  // Check file type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!ACCEPTED_FILE_TYPES.includes(fileExtension as any)) {
    return {
      isValid: false,
      error: 'Please upload a PDF, DOC, or DOCX file',
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File size must be less than 10MB',
    };
  }

  return { isValid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function useFileUpload() {
  const [uploadState, setUploadState] = useState<UploadState>({
    progress: 0,
    isUploading: false,
    isComplete: false,
    error: null,
    uploadedFile: null,
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File): Promise<UploadedResume> => {
      // Validate file before upload
      const validation = validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Set uploading state
      setUploadState(prev => ({
        ...prev,
        isUploading: true,
        error: null,
        progress: 0,
      }));

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 30, 90),
        }));
      }, 200);

      try {
        // Make API call with the raw File (API creates FormData internally)
        const response = await resumesApi.upload(file);

        // Clear progress interval
        clearInterval(progressInterval);

        // Set complete state
        setUploadState(prev => ({
          ...prev,
          progress: 100,
          isUploading: false,
          isComplete: true,
          uploadedFile: file,
        }));

        return {
          id: response.id,
          filename: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
      } catch (error) {
        clearInterval(progressInterval);
        
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        
        setUploadState(prev => ({
          ...prev,
          isUploading: false,
          error: errorMessage,
          progress: 0,
        }));
        
        throw error;
      }
    },
    onError: (error) => {
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      }));
    },
  });

  const resetUpload = () => {
    setUploadState({
      progress: 0,
      isUploading: false,
      isComplete: false,
      error: null,
      uploadedFile: null,
    });
  };

  const uploadFile = (file: File) => {
    resetUpload();
    return uploadMutation.mutateAsync(file);
  };

  return {
    uploadState,
    uploadFile,
    resetUpload,
    isLoading: uploadMutation.isPending,
    error: uploadMutation.error,
  };
}
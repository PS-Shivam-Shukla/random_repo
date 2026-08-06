import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Check, AlertCircle, X, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useFileUpload, validateFile, formatFileSize } from '../hooks/useFileUpload';
import { useWizard } from '../contexts/WizardContext';
import { cn } from '../../../lib/utils';

interface FileUploadZoneProps {
  onFileUpload?: (file: File) => void;
  className?: string;
}

export function FileUploadZone({ onFileUpload, className }: FileUploadZoneProps) {
  const { uploadState, uploadFile, resetUpload } = useFileUpload();
  const { setResumeFile, setStepValidity } = useWizard();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validation = validateFile(file);
    
    if (!validation.isValid) {
      // Handle validation error - you might want to show a toast here
      return;
    }

    setSelectedFile(file);
    
    try {
      await uploadFile(file);
      setResumeFile(file);
      setStepValidity(true);
      onFileUpload?.(file);
    } catch (error) {
      // Error is handled by the hook
      setStepValidity(false);
    }
  }, [uploadFile, setResumeFile, setStepValidity, onFileUpload]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setResumeFile(null);
    setStepValidity(false);
    resetUpload();
  }, [setResumeFile, setStepValidity, resetUpload]);

  const handleRetry = useCallback(() => {
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  }, [selectedFile, uploadFile]);

  // Show file preview if file is selected or upload is complete
  if (selectedFile || uploadState.uploadedFile) {
    const file = selectedFile || uploadState.uploadedFile!;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn('w-full max-w-md mx-auto', className)}
      >
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm">
          {/* File Info */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                uploadState.isComplete 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : uploadState.error 
                  ? 'bg-red-100 dark:bg-red-900/30'
                  : 'bg-blue-100 dark:bg-blue-900/30'
              )}>
                {uploadState.isComplete ? (
                  <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : uploadState.error ? (
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                ) : (
                  <File className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                )}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {file.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {formatFileSize(file.size)}
              </p>
              
              {/* Status */}
              <div className="mt-2">
                {uploadState.isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-600 dark:text-blue-400">Uploading...</span>
                      <span className="text-neutral-500">{Math.round(uploadState.progress)}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
                      <motion.div
                        className="bg-blue-600 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadState.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
                
                {uploadState.isComplete && (
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <Check className="h-3 w-3" />
                    <span>Uploaded successfully</span>
                  </div>
                )}
                
                {uploadState.error && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      <span>{uploadState.error}</span>
                    </div>
                    <Button
                      onClick={handleRetry}
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Remove Button */}
            <Button
              onClick={handleRemoveFile}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-neutral-500 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Show upload zone
  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer group',
          dragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
            : 'border-neutral-300 dark:border-neutral-600 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/10'
        )}
      >
        <input
          type="file"
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload resume file"
        />
        
        {/* Upload Icon */}
        <motion.div
          animate={{ 
            y: dragActive ? -4 : 0,
            scale: dragActive ? 1.1 : 1 
          }}
          transition={{ duration: 0.2 }}
          className="mx-auto w-12 h-12 mb-4"
        >
          <div className={cn(
            'w-full h-full rounded-xl flex items-center justify-center transition-colors',
            dragActive 
              ? 'bg-blue-600 text-white' 
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50'
          )}>
            <Upload className="h-6 w-6" />
          </div>
        </motion.div>
        
        {/* Upload Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {dragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            PDF, DOC, or DOCX up to 10MB
          </p>
        </div>
        
        {/* Choose File Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            className="pointer-events-none"
          >
            Choose File
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
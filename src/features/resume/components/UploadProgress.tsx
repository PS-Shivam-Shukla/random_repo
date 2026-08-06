import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, XCircle, RotateCcw, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Progress } from '../../../components/Progress';
import { formatFileSize } from '../utils/resumeHelpers';

export interface UploadProgressProps {
  file: File;
  progress: number;
  isUploading: boolean;
  error?: string | null;
  onCancel?: () => void;
  onRetry?: () => void;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  file,
  progress,
  isUploading,
  error,
  onCancel,
  onRetry,
}) => {
  const [stage, setStage] = useState<'uploading' | 'parsing' | 'evaluating' | 'complete'>('uploading');

  useEffect(() => {
    if (isUploading) {
      if (progress < 40) setStage('uploading');
      else if (progress < 80) setStage('parsing');
      else setStage('evaluating');
    } else if (!error && progress >= 100) {
      setStage('complete');
    }
  }, [progress, isUploading, error]);

  const getStageLabel = () => {
    switch (stage) {
      case 'uploading':
        return 'Uploading file stream to FastAPI storage...';
      case 'parsing':
        return 'Extracting text tokens & raw document layout...';
      case 'evaluating':
        return 'Multi-agent skill dictionary & ATS scoring audit...';
      case 'complete':
        return 'Processing complete!';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="rounded-xl bg-indigo-950/80 p-2.5 text-indigo-400 border border-indigo-800/50 shadow-inner">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 truncate max-w-sm">{file.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{formatFileSize(file.size)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {error && onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
              Retry
            </Button>
          )}
          {isUploading && onCancel && (
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
              title="Cancel Upload"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} showValue label={getStageLabel()} />
          <div className="flex items-center space-x-4 text-[11px] text-slate-400 pt-1">
            <span className={`flex items-center gap-1 ${stage === 'uploading' ? 'text-indigo-400 font-semibold' : 'text-slate-500'}`}>
              <FileText className="w-3 h-3" /> Upload
            </span>
            <span className={`flex items-center gap-1 ${stage === 'parsing' ? 'text-indigo-400 font-semibold' : 'text-slate-500'}`}>
              <Cpu className="w-3 h-3" /> Parsing
            </span>
            <span className={`flex items-center gap-1 ${stage === 'evaluating' ? 'text-indigo-400 font-semibold' : 'text-slate-500'}`}>
              <Sparkles className="w-3 h-3" /> AI Audit
            </span>
          </div>
        </div>
      )}

      {!isUploading && !error && progress >= 100 && (
        <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/50">
          <CheckCircle2 className="w-4 h-4" />
          <span className="font-semibold">Resume parsed and evaluated successfully!</span>
        </div>
      )}

      {error && (
        <div className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-xl border border-rose-800/50 font-medium">
          Upload Error: {error}
        </div>
      )}
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mic, Sparkles, Brain, Award, AlertCircle, Plus } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  variant?: 'resume' | 'interview' | 'transcript' | 'replay' | 'memory' | 'roadmap' | 'analytics' | 'default';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  variant = 'default',
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'resume':
        return <FileText className="w-8 h-8 text-indigo-400" />;
      case 'interview':
        return <Mic className="w-8 h-8 text-emerald-400" />;
      case 'transcript':
        return <FileText className="w-8 h-8 text-amber-400" />;
      case 'replay':
        return <Award className="w-8 h-8 text-indigo-400" />;
      case 'memory':
        return <Sparkles className="w-8 h-8 text-indigo-400" />;
      case 'roadmap':
        return <Brain className="w-8 h-8 text-emerald-400" />;
      case 'analytics':
        return <Award className="w-8 h-8 text-indigo-400" />;
      case 'default':
      default:
        return <AlertCircle className="w-8 h-8 text-slate-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 my-4 space-y-4"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
        {icon || getDefaultIcon()}
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-bold text-slate-100">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {actionLabel && onAction && (
            <Button size="sm" onClick={onAction} leftIcon={<Plus className="w-4 h-4" />}>
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button size="sm" variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

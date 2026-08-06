import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  onClose?: () => void;
  onUndo?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({ type = 'info', title, message, onClose, onUndo, className }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    info: <Info className="w-5 h-5 text-indigo-400" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={cn(
        'flex items-start space-x-3 p-4 bg-slate-900/95 border border-slate-800 text-slate-100 rounded-2xl shadow-2xl backdrop-blur-md max-w-md w-full',
        type === 'success' && 'border-emerald-800/60 shadow-emerald-950/20',
        type === 'error' && 'border-rose-800/60 shadow-rose-950/20',
        className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 text-xs">
        <h4 className="font-bold text-slate-100">{title}</h4>
        {message && <p className="text-slate-300 mt-0.5 leading-relaxed">{message}</p>}
      </div>

      <div className="flex items-center space-x-1">
        {onUndo && (
          <button
            onClick={onUndo}
            className="flex items-center space-x-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/40"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Undo</span>
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

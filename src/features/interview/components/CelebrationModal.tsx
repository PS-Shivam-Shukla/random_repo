import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';

export interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewResults: () => void;
  technicalScore?: number;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  onViewResults,
  technicalScore = 94,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="rounded-full bg-gradient-to-tr from-indigo-600 to-emerald-500 p-4 text-white shadow-2xl"
        >
          <Trophy className="w-12 h-12" />
        </motion.div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-100">Interview Session Completed!</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Congratulations! You completed your AI technical interview session with a high competency evaluation.
          </p>
        </div>

        <div className="w-full rounded-2xl bg-slate-950 p-4 border border-slate-800 flex items-center justify-between text-xs my-2">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" /> Overall Technical Rating
          </span>
          <span className="text-base font-extrabold text-emerald-400">{technicalScore} / 100</span>
        </div>

        <div className="flex items-center space-x-3 w-full pt-2">
          <Button variant="outline" className="w-1/2" onClick={onClose}>
            Close
          </Button>
          <Button className="w-1/2" onClick={onViewResults} rightIcon={<ArrowRight className="w-4 h-4" />}>
            View Analytics
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { InterviewDifficulty } from '../types/interview.types';

export interface AdaptiveDifficultyMeterProps {
  level?: number;
  difficultyLabel?: InterviewDifficulty | string;
}

export const AdaptiveDifficultyMeter: React.FC<AdaptiveDifficultyMeterProps> = ({
  level = 8,
  difficultyLabel = 'ADAPTIVE',
}) => {
  return (
    <Card className="border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-2 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Dynamic Adaptive Difficulty Level
          </CardTitle>
          <span className="rounded-full bg-amber-950 px-3 py-0.5 text-xs font-bold text-amber-300 border border-amber-800/50">
            {difficultyLabel}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Difficulty Level Scale (1 - 10)</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={level}
              initial={{ opacity: 0, y: -10, scale: 1.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-lg font-black text-indigo-400"
            >
              Level {level} / 10
            </motion.span>
          </AnimatePresence>
        </div>

        {/* 10 Segment Level Gauge */}
        <div className="grid grid-cols-10 gap-1.5 h-4 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {[...Array(10)].map((_, i) => {
            const stepLevel = i + 1;
            const isActive = stepLevel <= level;

            return (
              <motion.div
                key={stepLevel}
                initial={false}
                animate={{
                  backgroundColor: isActive
                    ? stepLevel >= 8
                      ? '#rose-500'
                      : stepLevel >= 5
                      ? '#6366f1'
                      : '#10b981'
                    : '#1e293b',
                  scaleY: isActive ? 1 : 0.7,
                }}
                className={`h-full rounded-sm transition-colors ${
                  isActive
                    ? stepLevel >= 8
                      ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                      : stepLevel >= 5
                      ? 'bg-indigo-500 shadow-sm shadow-indigo-500/50'
                      : 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                    : 'bg-slate-800'
                }`}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

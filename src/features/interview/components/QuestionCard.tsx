import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Target, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { AdaptiveDifficultyBadge } from './AdaptiveDifficultyBadge';
import { InterviewQuestion } from '../types/interview.types';

export interface QuestionCardProps {
  question?: InterviewQuestion;
  questionIndex: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
}) => {
  if (!question) {
    return (
      <Card className="border-indigo-900/30 bg-slate-900/90 shadow-xl">
        <CardContent className="p-6 text-center text-xs text-slate-400">
          Interview session initializing question blueprint...
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-indigo-900/40 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/20 shadow-xl">
        <CardHeader className="pb-3 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              <CardTitle className="text-sm font-bold text-slate-100">
                Question {questionIndex + 1} of {totalQuestions}
              </CardTitle>
            </div>
            <AdaptiveDifficultyBadge difficulty={question.difficulty as any} />
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          <p className="text-base font-semibold text-slate-100 leading-relaxed tracking-tight">
            "{question.text}"
          </p>

          {question.competency_focus && (
            <div className="flex items-center space-x-2 text-xs text-indigo-300 bg-indigo-950/50 p-2.5 rounded-xl border border-indigo-800/40">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Competency Focus: {question.competency_focus}</span>
            </div>
          )}

          {question.expected_skills && question.expected_skills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 font-medium mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Key Skills Tested:
              </span>
              {question.expected_skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

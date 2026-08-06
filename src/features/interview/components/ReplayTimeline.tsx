import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, User, Bot, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { InterviewReplayItem } from '../types/interview.types';

export interface ReplayTimelineProps {
  replayItems: InterviewReplayItem[];
}

export const ReplayTimeline: React.FC<ReplayTimelineProps> = ({ replayItems }) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({ 'rep-1': true });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          Interactive Turn-by-Turn Interview Replay
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {replayItems.map((item, idx) => {
          const isExpanded = !!expandedIds[item.id];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <div className="rounded-lg bg-indigo-950 p-1.5 text-indigo-400 border border-indigo-800/50 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Q{idx + 1}: {item.question_text}</h4>
                    <div className="flex items-center space-x-2 text-[10px] mt-1">
                      <span className="text-emerald-400 font-semibold">Tech: {item.technical_score}%</span>
                      <span className="text-indigo-400 font-semibold">Comm: {item.communication_score}%</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Candidate Answer */}
              <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/30 text-xs text-slate-200 leading-relaxed flex items-start space-x-2">
                <User className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <p>"{item.candidate_answer}"</p>
              </div>

              {/* AI Feedback Comment */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-2"
                  >
                    <div className="flex items-start space-x-2 text-indigo-300">
                      <Bot className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <p className="italic">"{item.ai_comment}"</p>
                    </div>

                    {item.strengths && item.strengths.length > 0 && (
                      <div className="pt-2 border-t border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Strengths Highlighted:</span>
                        <ul className="space-y-0.5">
                          {item.strengths.map((s, sIdx) => (
                            <li key={sIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { ExperienceItem } from '../types/resume.types';

export interface ExperienceTimelineProps {
  experience: ExperienceItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({ 'exp-1': true });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          Work Experience Timeline & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        {experience.length > 0 ? (
          <div className="relative border-l-2 border-indigo-900/50 ml-4 space-y-6">
            {experience.map((item, idx) => {
              const isExpanded = !!expandedIds[item.id];
              const initials = item.company
                .split(' ')
                .map((word) => word[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8"
                >
                  {/* Timeline Dot Avatar */}
                  <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border-2 border-indigo-500 text-[10px] font-extrabold text-indigo-400 shadow-md">
                    {initials}
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-slate-700">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                        <p className="text-xs font-semibold text-indigo-400 mt-0.5">{item.company}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {item.period}
                        </span>
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{item.description}</p>

                    <AnimatePresence>
                      {isExpanded && item.highlights && item.highlights.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5"
                        >
                          <h5 className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">Key Impact Highlights</h5>
                          <ul className="space-y-1.5">
                            {item.highlights.map((h, hIdx) => (
                              <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/60">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic py-2">No work experience entries extracted.</p>
        )}
      </CardContent>
    </Card>
  );
};

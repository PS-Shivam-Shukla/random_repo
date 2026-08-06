import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { ProjectItem } from '../types/resume.types';

export interface ProjectCardsProps {
  projects: ProjectItem[];
}

export const ProjectCards: React.FC<ProjectCardsProps> = ({ projects }) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          Extracted Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {projects.length > 0 ? (
          projects.map((proj, idx) => {
            const isExpanded = !!expandedIds[proj.id];

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{proj.title}</h4>
                    {proj.role && <p className="text-xs text-indigo-400 font-medium mt-0.5">{proj.role}</p>}
                  </div>
                  <div className="flex items-center space-x-2">
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 hover:bg-indigo-900/60 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="font-medium">Repository</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                    <button
                      onClick={() => toggleExpand(proj.id)}
                      className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <p className="text-slate-300 mt-2 leading-relaxed">{proj.description}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-2 border-t border-slate-800/80 text-slate-400"
                    >
                      <p>{proj.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          <p className="text-xs text-slate-500 italic py-2">No key projects extracted.</p>
        )}
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { SkillBreakdown } from '../types/resume.types';

export interface SkillCloudProps {
  skills: SkillBreakdown;
}

export const SkillCloud: React.FC<SkillCloudProps> = ({ skills }) => {
  const hasTechnical = skills?.technical && skills.technical.length > 0;

  return (
    <Card className="flex flex-col border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          Extracted Skill Stack
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-5">
        {/* Technical & Core Skills */}
        <div>
          <h4 className="text-xs font-semibold text-slate-300 mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Extracted Technical Stack ({skills?.technical?.length || 0})
          </h4>
          {hasTechnical ? (
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, idx) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.08, y: -2 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="inline-flex items-center space-x-1.5 rounded-xl bg-indigo-950/70 px-3 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-800/60 shadow-sm cursor-default hover:border-indigo-500 hover:shadow-indigo-500/20"
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>{skill}</span>
                </motion.span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic py-1">No technical skills extracted.</p>
          )}
        </div>

        {/* Soft Skills */}
        {skills?.soft && skills.soft.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-2">Soft Skills & Competencies</h4>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center rounded-lg bg-slate-800/90 px-3 py-1 text-xs font-medium text-slate-300 border border-slate-700 hover:border-slate-500 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Missing / Recommended Skills */}
        {skills?.missing && skills.missing.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Recommended Skills to Highlight
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.missing.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center rounded-lg bg-amber-950/40 px-3 py-1 text-xs font-medium text-amber-300 border border-amber-800/50 hover:bg-amber-900/50 transition-colors"
                >
                  + {skill}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

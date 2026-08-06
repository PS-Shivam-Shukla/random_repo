import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Sparkles } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/Card';
import { ResumeActions } from './ResumeActions';
import { ResumeStatus } from './ResumeStatus';
import { formatDate } from '../../../utils/dateFormatter';
import { Resume } from '../types/resume.types';

export interface ResumeCardProps {
  resume: Resume;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <Card className="flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-indigo-950/60 p-3 text-indigo-400 border border-indigo-800/50">
              <FileText className="w-6 h-6" />
            </div>
            <ResumeStatus senioritySignal={resume.seniority_signal} skillCount={resume.parsed_skills.length} />
          </div>
          <CardTitle className="text-base font-bold text-slate-100 truncate mt-3 group-hover:text-indigo-400 transition-colors">
            {resume.file_path}
          </CardTitle>
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Uploaded {formatDate(resume.created_at)}</span>
          </div>
        </CardHeader>

        <CardContent className="py-2">
          {resume.parsed_skills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {resume.parsed_skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/50"
                >
                  {skill}
                </span>
              ))}
              {resume.parsed_skills.length > 4 && (
                <span className="text-[11px] text-slate-500 font-medium align-middle self-center">
                  +{resume.parsed_skills.length - 4} more
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-xs text-slate-500 italic">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Parsing text content...</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-3">
          <ResumeActions resume={resume} />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

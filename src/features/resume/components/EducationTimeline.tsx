import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { EducationItem } from '../types/resume.types';

export interface EducationTimelineProps {
  education: EducationItem[];
}

export const EducationTimeline: React.FC<EducationTimelineProps> = ({ education }) => {
  return (
    <Card>
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          Education & Credentials
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {education.length > 0 ? (
          education.map((item) => (
            <div key={item.id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-100">{item.degree}</h4>
                <span className="font-mono text-slate-400">{item.graduation_year}</span>
              </div>
              <p className="text-indigo-400 font-medium mt-0.5">{item.institution}</p>
              {item.gpa && <p className="text-slate-400 mt-1">GPA: {item.gpa}</p>}
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-500 italic">No education entries extracted.</p>
        )}
      </CardContent>
    </Card>
  );
};

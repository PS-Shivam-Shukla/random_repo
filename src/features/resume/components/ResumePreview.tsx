import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { Resume } from '../types/resume.types';

export interface ResumePreviewProps {
  resume: Resume;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <CardTitle className="text-base font-bold text-slate-100">{resume.file_path}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-4 overflow-y-auto max-h-[600px] font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
        {resume.raw_text || 'No raw text available for this document file.'}
      </CardContent>
    </Card>
  );
};

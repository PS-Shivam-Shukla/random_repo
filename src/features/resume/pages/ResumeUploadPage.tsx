import React from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/Card';
import { Topbar } from '../../../layouts/Topbar';
import { ResumeUploader } from '../components/ResumeUploader';

export const ResumeUploadPage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <Topbar
        title="Upload Resume"
        description="Upload candidate resume file (PDF, DOCX, TXT) for real-time AI parsing and ATS evaluation."
      />

      <div className="max-w-3xl mx-auto w-full">
        <Card className="border-indigo-900/30 bg-slate-900 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800/50 mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl font-bold">Resume Upload & Parsing Engine</CardTitle>
            <CardDescription>
              Our backend instantly extracts skills, seniority signals, experience timelines, and ATS scoring.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ResumeUploader />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

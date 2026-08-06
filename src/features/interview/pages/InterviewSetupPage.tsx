import React, { useState } from 'react';
import { Play, Sparkles, Building, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { Topbar } from '../../../layouts/Topbar';
import { CandidateMemoryPanel } from '../components/CandidateMemoryPanel';
import { SetupPermissionsCheck } from '../components/SetupPermissionsCheck';
import { useCreateInterview } from '../hooks/useCreateInterview';
import { useNotification } from '../../../hooks/useNotification';
import { InterviewDifficulty, InterviewMode } from '../types/interview.types';

export const InterviewSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const notify = useNotification();
  const createMutation = useCreateInterview();

  const [company, setCompany] = useState('InterviewSage Inc.');
  const [role, setRole] = useState('Senior AI & Full-Stack Architect');
  const [mode, setMode] = useState<InterviewMode>('VOICE');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('ADAPTIVE');
  const [language, setLanguage] = useState('en-US');

  const handleStartInterview = () => {
    createMutation.mutate(
      {
        target_company: company,
        target_role: role,
        interview_mode: mode,
        difficulty: difficulty,
        language: language,
      },
      {
        onSuccess: (data) => {
          notify.success('Interview Initialized!', `Session created ID: ${data.id}`);
          if (mode === 'VOICE') {
            navigate(`/interviews/${data.id}/voice`);
          } else {
            navigate(`/interviews/${data.id}/session`);
          }
        },
        onError: (err) => {
          notify.error('Setup Failed', err.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-5xl mx-auto">
      <Topbar
        title="AI Interview Setup & Parameters"
        description="Configure target company, role specs, hardware permissions, and evaluation settings."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Form Setup */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-slate-800 bg-slate-900 shadow-xl">
            <CardHeader className="pb-3 border-b border-slate-800">
              <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Target Role & Session Settings
              </CardTitle>
              <CardDescription>Customize parameters for the multi-agent AI interviewer</CardDescription>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <Input
                label="Target Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                leftIcon={<Building className="w-4 h-4 text-slate-400" />}
              />

              <Input
                label="Target Job Role Title"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                leftIcon={<Briefcase className="w-4 h-4 text-slate-400" />}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Interview Mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value as any)}
                  options={[
                    { value: 'VOICE', label: '100% Real-Time Voice Mode' },
                    { value: 'TEXT', label: 'Interactive Text Chat' },
                    { value: 'HYBRID', label: 'Hybrid Voice & Code' },
                  ]}
                />

                <Select
                  label="Difficulty Level"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  options={[
                    { value: 'ADAPTIVE', label: 'Dynamic Adaptive' },
                    { value: 'HARD', label: 'Hard (Staff / Architect)' },
                    { value: 'MEDIUM', label: 'Medium (Senior)' },
                    { value: 'EASY', label: 'Easy (Junior)' },
                  ]}
                />
              </div>

              <Select
                label="Evaluation Language & Accent"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={[
                  { value: 'en-US', label: 'English (US Neutral)' },
                  { value: 'en-GB', label: 'English (UK Executive)' },
                  { value: 'en-IN', label: 'English (Global Tech)' },
                ]}
              />

              <div className="pt-2">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleStartInterview}
                  isLoading={createMutation.isPending}
                  leftIcon={<Play className="w-5 h-5" />}
                >
                  Start AI Interview Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 5 Columns: Diagnostics & Memory */}
        <div className="lg:col-span-5 space-y-6">
          <SetupPermissionsCheck />
          <CandidateMemoryPanel />
        </div>
      </div>
    </div>
  );
};

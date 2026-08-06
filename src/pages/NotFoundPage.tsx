import React from 'react';
import { FileQuestion } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
      <div className="rounded-full bg-slate-900 p-4 text-indigo-400 border border-slate-800 mb-4">
        <FileQuestion className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">404 - Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md mt-2 mb-6">
        The route or resource you are looking for does not exist on InterviewSage AI.
      </p>
      <Button onClick={() => navigate('/dashboard')}>Return Home</Button>
    </div>
  );
};

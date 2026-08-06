import React from 'react';
import { ServerCrash } from 'lucide-react';
import { Button } from '../components/Button';

export const ServerErrorPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
      <div className="rounded-full bg-rose-950 p-4 text-rose-400 border border-rose-800 mb-4">
        <ServerCrash className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">500 - Internal Server Error</h1>
      <p className="text-sm text-slate-400 max-w-md mt-2 mb-6">
        InterviewSage AI server encountered an unexpected failure. The system monitors logs and recovers automatically.
      </p>
      <Button onClick={() => window.location.reload()}>Reload Application</Button>
    </div>
  );
};

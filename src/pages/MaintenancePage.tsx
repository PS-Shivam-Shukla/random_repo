import React from 'react';
import { Wrench } from 'lucide-react';

export const MaintenancePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
      <div className="rounded-full bg-indigo-950 p-4 text-indigo-400 border border-indigo-800 mb-4">
        <Wrench className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">System Under Maintenance</h1>
      <p className="text-sm text-slate-400 max-w-md mt-2">
        InterviewSage AI is undergoing scheduled upgrade procedures. Please check back shortly.
      </p>
    </div>
  );
};

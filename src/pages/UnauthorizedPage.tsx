import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
      <div className="rounded-full bg-rose-950 p-4 text-rose-400 border border-rose-800 mb-4">
        <ShieldAlert className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">403 - Access Forbidden</h1>
      <p className="text-sm text-slate-400 max-w-md mt-2 mb-6">
        You do not have the required permissions or role to access this area. Contact your system administrator if you believe this is an error.
      </p>
      <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
    </div>
  );
};

import React from 'react';
import { WifiOff } from 'lucide-react';
import { Button } from '../components/Button';

export const OfflinePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
      <div className="rounded-full bg-amber-950 p-4 text-amber-400 border border-amber-800 mb-4">
        <WifiOff className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">You Are Offline</h1>
      <p className="text-sm text-slate-400 max-w-md mt-2 mb-6">
        Network connection lost. Please check your internet or local network connection.
      </p>
      <Button onClick={() => window.location.reload()}>Retry Connection</Button>
    </div>
  );
};

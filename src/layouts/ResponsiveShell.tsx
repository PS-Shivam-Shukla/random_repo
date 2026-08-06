import React from 'react';
import { useNavigationStore } from '../stores/NavigationStore';
import { cn } from '../lib/utils';

export const ResponsiveShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sidebarOpen } = useNavigationStore();

  return (
    <div
      className={cn(
        'min-h-screen bg-slate-950 text-slate-100 transition-all duration-300 ease-in-out flex flex-col',
        sidebarOpen ? 'pl-0 lg:pl-64' : 'pl-0 lg:pl-20'
      )}
    >
      {children}
    </div>
  );
};

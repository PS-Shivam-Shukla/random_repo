import React from 'react';
import { Outlet } from 'react-router-dom';
import { CommandPalette } from '../components/CommandPalette';
import { KeyboardShortcutsModal } from '../components/KeyboardShortcutsModal';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { PageContainer } from './PageContainer';
import { ResponsiveShell } from './ResponsiveShell';
import { Sidebar } from './Sidebar';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans antialiased text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Sidebar />
      <ResponsiveShell>
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>
        <Footer />
      </ResponsiveShell>
      <CommandPalette />
      <KeyboardShortcutsModal />
    </div>
  );
};

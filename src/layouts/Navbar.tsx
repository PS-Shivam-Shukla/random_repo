import React from 'react';
import { Menu, Command, Sun, Moon } from 'lucide-react';
import { NotificationBell } from '../components/NotificationBell';
import { ProfileMenu } from '../components/ProfileMenu';
import { useTheme } from '../hooks/useTheme';
import { useAppStore } from '../stores/AppStore';
import { useNavigationStore } from '../stores/NavigationStore';

export const Navbar: React.FC = () => {
  const { toggleSidebar, setMobileMenuOpen } = useNavigationStore();
  const { setCommandPaletteOpen } = useAppStore();
  const { resolvedTheme, setTheme } = useTheme();

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(true);
    } else {
      toggleSidebar();
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleMenuClick}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-700 transition-colors"
        >
          <Command className="w-3.5 h-3.5" />
          <span>Search or type command...</span>
          <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono">Ctrl K</kbd>
        </button>
      </div>

      <div className="flex items-center space-x-3">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          aria-label="Toggle Theme"
        >
          {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <NotificationBell />
        <ProfileMenu />
      </div>
    </header>
  );
};

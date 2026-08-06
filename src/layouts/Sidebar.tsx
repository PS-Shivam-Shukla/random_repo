import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  UserCheck,
  Upload,
  X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigationStore } from '../stores/NavigationStore';
import { cn } from '../lib/utils';
import { hasAnyRole } from '../utils/roleHelpers';

interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles?: any[];
}

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { sidebarOpen, mobileMenuOpen, setMobileMenuOpen } = useNavigationStore();

  const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { title: '1. Upload Resume', href: '/resumes/upload', icon: Upload },
    { title: 'Resume Library', href: '/resumes', icon: UserCheck },
    { title: 'Settings', href: '/settings', icon: Settings },
  ];

  const filteredNav = navItems.filter((item) => !item.roles || hasAnyRole(user?.role, item.roles as any));

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Main Navigation Sidebar"
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col',
          // Desktop & Tablet positioning
          'hidden lg:flex',
          sidebarOpen ? 'w-64' : 'w-20',
          // Mobile Drawer overlay behavior
          mobileMenuOpen && 'flex w-64 translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-bold shadow-md flex-shrink-0">
              S
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-100 tracking-tight">InterviewSage</span>
                <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">Sprint 0.1 Pipeline</span>
              </div>
            )}
          </div>
          {mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
              aria-label="Close Mobile Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {filteredNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-500/20'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  )
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Footer Info */}
        {sidebarOpen && (
          <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Sprint 0.1 Active</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        )}
      </aside>
    </>
  );
};

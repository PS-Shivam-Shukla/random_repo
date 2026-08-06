import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { AIStatusBar } from '../components/shared/AIStatusBar';
import { cn } from '../lib/utils';

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Seed demo token
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('access_token')) {
      localStorage.setItem('access_token', 'demo_interview_sage_jwt_token');
    }
  }, []);

  // Distraction-free mode for live interview
  const isDistractionFree = location.pathname.startsWith('/interview-session');

  if (isDistractionFree) {
    return (
      <div className="min-h-dvh bg-[var(--canvas)] text-[var(--text-primary)] font-sans selection:bg-indigo-600/20">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="layout-with-sidebar bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed((prev) => !prev)}
        onMobileToggle={() => setMobileOpen((prev) => !prev)}
      />

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}

      {/* Main Content Column */}
      <div
        className={cn(
          'main-content flex-1 min-w-0',
          collapsed ? 'md:ml-[var(--sidebar-w-collapsed)]' : 'md:ml-[var(--sidebar-w)]',
        )}
      >
        {/* Fixed top: Navbar + AIStatusBar */}
        <div
          className={cn(
            'fixed top-0 right-0 z-30 flex flex-col',
            'border-b border-[var(--border)]',
            'bg-[var(--surface)]/90 backdrop-blur-xl',
            collapsed ? 'left-0 md:left-[var(--sidebar-w-collapsed)]' : 'left-0 md:left-[var(--sidebar-w)]',
            'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          )}
        >
          <Navbar
            sidebarCollapsed={collapsed}
            onMobileMenuToggle={() => setMobileOpen((prev) => !prev)}
          />
          <AIStatusBar />
        </div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="px-4 py-6 sm:px-6 lg:px-8 max-w-[1400px] mx-auto"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}

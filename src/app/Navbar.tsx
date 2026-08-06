/**
 * Navbar — Focused top bar (56px)
 *
 * Design: Clean, minimal. Breadcrumb left, search center, actions right.
 * Notifications now have a dedicated page (/notifications) — the bell icon routes there.
 * No dropdown here — keeps the bar focused and uncluttered.
 */
import { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  Moon,
  Sun,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/Avatar';
import { cn } from '../lib/utils';
import { useTheme } from './ThemeProvider';

const ROUTE_LABELS: Record<string, string> = {
  dashboard:           'Dashboard',
  'new-interview':     'New Interview',
  'interview-session': 'Interview Session',
  reports:             'Reports',
  analytics:           'Analytics',
  'learning-hub':      'Learning Hub',
  'interview-history': 'Interview History',
  'ai-workflow':       'AI Workflow',
  'agent-monitoring':  'Agent Monitor',
  settings:            'Settings',
  notifications:       'Notifications',
  profile:             'Profile',
  'career-coach':      'Career Coach',
  resumes:             'Resume Library',
  'job-descriptions':  'JD Library',
  admin:               'Admin Dashboard',
};

interface NavbarProps {
  sidebarCollapsed?: boolean;
  onMobileMenuToggle?: () => void;
}

export function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Breadcrumbs from pathname
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((seg, i) => ({
    url: `/${pathSegments.slice(0, i + 1).join('/')}`,
    label: ROUTE_LABELS[seg] || seg.replace(/-/g, ' '),
  }));

  // Mock unread notification count
  const unreadCount = 2;

  return (
    <header
      className="flex h-[var(--topbar-h)] items-center justify-between px-4 sm:px-6"
      role="banner"
    >
      {/* ── Left: Mobile hamburger + Breadcrumbs ──────────────── */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors md:hidden focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]"
          onClick={onMobileMenuToggle}
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-[13px] min-w-0">
          <Link
            to="/dashboard"
            className="font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
          >
            InterviewSage
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.url} className="flex items-center gap-1.5 min-w-0">
              <span className="text-[var(--border-strong)]" aria-hidden="true">/</span>
              {i === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-[var(--text-primary)] capitalize truncate">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.url}
                  className="font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] capitalize transition-colors truncate"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* ── Right: Search + Notifications + Theme + Profile ───── */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Global Search */}
        <div className="relative hidden lg:block">
          <Search
            className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search interviews, reports…"
            className={cn(
              'h-8 w-56 rounded-xl pl-8 pr-10 text-xs',
              'border border-[var(--border)] bg-[var(--surface-raised)]',
              'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
              'transition-all duration-200',
              'focus:w-72 focus:border-[var(--border-focus)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
            )}
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-[var(--border)] bg-[var(--surface-raised)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
            ⌘K
          </kbd>
        </div>

        {/* Notifications (routes to /notifications page) */}
        <Link
          to="/notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]"
          aria-label={`Notifications, ${unreadCount} unread`}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-[var(--surface)]"
              aria-hidden="true"
            />
          )}
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-2 py-1 transition-colors',
              'border border-[var(--border)] bg-[var(--surface-raised)]',
              'hover:bg-[var(--surface-elevated)]',
              'focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]',
            )}
            aria-label="User menu"
            aria-expanded={profileOpen}
          >
            <Avatar className="h-6 w-6 ring-1 ring-indigo-600/25">
              <AvatarFallback className="bg-indigo-600 text-white text-[10px] font-bold">
                AJ
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-xs font-semibold text-[var(--text-primary)] sm:block">
              Alex J.
            </span>
            <ChevronDown
              className={cn(
                'h-3 w-3 text-[var(--text-muted)] transition-transform duration-150',
                profileOpen && 'rotate-180',
              )}
            />
          </button>

          {/* Profile Dropdown Panel */}
          {profileOpen && (
            <div
              className={cn(
                'absolute right-0 mt-2 w-56',
                'rounded-2xl border border-[var(--border)] bg-[var(--overlay)]',
                'shadow-xl p-1.5',
                'animate-in fade-in zoom-in-95 duration-150',
              )}
              role="menu"
            >
              {/* User info */}
              <div className="px-3 py-2.5 border-b border-[var(--border)] mb-1">
                <p className="text-xs font-semibold text-[var(--text-primary)]">Alex Johnson</p>
                <p className="text-[11px] text-[var(--text-muted)] truncate">alex@interviewsage.ai</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Senior Staff Plan
                  </span>
                </div>
              </div>

              {/* Links */}
              {[
                { to: '/profile',   icon: User,     label: 'View Profile' },
                { to: '/settings',  icon: Settings, label: 'Settings' },
              ].map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              ))}

              <div className="my-1 h-px bg-[var(--border)]" aria-hidden="true" />

              <button
                role="menuitem"
                onClick={() => {
                  localStorage.removeItem('access_token');
                  setProfileOpen(false);
                  navigate('/sign-in');
                }}
                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

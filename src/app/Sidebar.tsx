/**
 * Sidebar — Grouped Navigation
 *
 * Design philosophy:
 * - Navigation communicates the USER JOURNEY, not a feature list.
 * - 5 semantic journey sections: PREPARE → PERFORM → REVIEW → GROW → INTELLIGENCE
 * - User identity footer at bottom
 * - Animated collapse with width spring
 * - Active state: colored left-border accent, NOT just background fill
 * - Notification badge on Notifications link
 */
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Video,
  FileText,
  BarChart3,
  History,
  Workflow,
  Activity,
  Settings,
  ChevronLeft,
  Sparkles,
  X,
  Brain,
  Bell,
  UserCheck,
  Briefcase,
  GraduationCap,
  LogOut,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback } from '../components/ui/Avatar';

// ─── Navigation Structure ───────────────────────────────────────────
type NavItem = {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
};

type NavSection = {
  id: string;
  label: string;
  items: NavItem[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'prepare',
    label: 'PREPARE',
    items: [
      { to: '/dashboard',        icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/new-interview',    icon: PlusCircle,      label: 'New Interview' },
      { to: '/resumes',          icon: UserCheck,        label: 'Resume Library' },
      { to: '/job-descriptions', icon: Briefcase,       label: 'JD Library' },
    ],
  },
  {
    id: 'perform',
    label: 'PERFORM',
    items: [
      { to: '/interview-session', icon: Video,  label: 'Interview Session' },
    ],
  },
  {
    id: 'review',
    label: 'REVIEW',
    items: [
      { to: '/reports',           icon: FileText,  label: 'Reports' },
      { to: '/analytics',         icon: BarChart3, label: 'Analytics' },
      { to: '/interview-history', icon: History,   label: 'History' },
    ],
  },
  {
    id: 'grow',
    label: 'GROW',
    items: [
      { to: '/learning-hub',   icon: GraduationCap, label: 'Learning Hub' },
      { to: '/career-coach',   icon: Brain,         label: 'Career Coach' },
    ],
  },
  {
    id: 'intelligence',
    label: 'INTELLIGENCE',
    items: [
      { to: '/ai-workflow',      icon: Workflow, label: 'AI Workflow' },
      { to: '/agent-monitoring', icon: Activity, label: 'Agent Monitor' },
    ],
  },
];

const BOTTOM_ITEMS: NavItem[] = [
  { to: '/notifications', icon: Bell,     label: 'Notifications', badge: 2 },
  { to: '/settings',      icon: Settings, label: 'Settings' },
];

// ─── Props ──────────────────────────────────────────────────────────
interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileToggle: () => void;
}

// ─── Single NavLink Item ────────────────────────────────────────────
function NavItem({
  to,
  icon: Icon,
  label,
  badge,
  collapsed,
  onMobileClose,
}: NavItem & { collapsed: boolean; onMobileClose: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onMobileClose}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        cn(
          'relative flex items-center gap-2.5 rounded-xl transition-all duration-150',
          'text-sm font-medium focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]',
          collapsed ? 'justify-center px-0 py-2.5 mx-auto w-10 h-10' : 'px-3 py-2',
          isActive
            ? [
                'bg-indigo-600/10 dark:bg-indigo-500/15',
                'text-indigo-600 dark:text-indigo-400',
                'border-l-[3px] border-indigo-600 dark:border-indigo-400',
                !collapsed && 'pl-[calc(12px_-_3px)]', // compensate for border
              ]
            : [
                'text-[var(--text-secondary)]',
                'hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]',
                'dark:hover:bg-[var(--surface-elevated)]',
                'border-l-[3px] border-transparent',
              ],
        )
      }
    >
      <Icon className={cn('shrink-0', collapsed ? 'h-5 w-5' : 'h-4 w-4')} />
      {!collapsed && (
        <>
          <span className="truncate">{label}</span>
          {badge != null && badge > 0 && (
            <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
              {badge > 9 ? '9+' : badge}
            </span>
          )}
        </>
      )}
      {/* Collapsed badge dot */}
      {collapsed && badge != null && badge > 0 && (
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-[var(--surface)]" />
      )}
    </NavLink>
  );
}

// ─── Main Sidebar Component ─────────────────────────────────────────
export function Sidebar({ collapsed, mobileOpen, onToggle, onMobileToggle }: SidebarProps) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    navigate('/sign-in');
  };

  return (
    <aside
      className={cn(
        // Base
        'fixed left-0 top-0 z-40 h-screen',
        'flex flex-col',
        'border-r border-[var(--border)] bg-[var(--surface)]',
        'dark:bg-[var(--surface)]',
        // Transition
        'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        // Width
        collapsed ? 'w-[var(--sidebar-w-collapsed)]' : 'w-[var(--sidebar-w)]',
        // Mobile
        mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full md:translate-x-0',
      )}
    >
      {/* ── Logo Header ──────────────────────────────────────────── */}
      <div
        className={cn(
          'flex h-[var(--topbar-h)] shrink-0 items-center border-b border-[var(--border)]',
          collapsed ? 'justify-center px-3' : 'justify-between px-4',
        )}
      >
        {collapsed ? (
          <div className="rounded-xl bg-indigo-600/10 p-2 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-5 w-5" />
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-indigo-600/10 p-2 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[13px] font-bold tracking-tight text-[var(--text-primary)]">
                InterviewSage{' '}
                <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">AI</span>
              </p>
              <p className="text-[10px] text-[var(--text-muted)] font-medium leading-none mt-0.5">
                Interview Intelligence
              </p>
            </div>
          </div>
        )}

        {/* Toggle buttons */}
        <button
          onClick={onToggle}
          className="hidden md:inline-flex rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            className={cn('h-4 w-4 transition-transform duration-300', collapsed && 'rotate-180')}
          />
        </button>
        <button
          onClick={onMobileToggle}
          className="inline-flex md:hidden rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Scrollable Nav ────────────────────────────────────────── */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-none"
        aria-label="Main navigation"
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.id} className="mb-1">
            {/* Section label — hidden when collapsed */}
            {!collapsed && (
              <p className="nav-section-label">{section.label}</p>
            )}

            {/* Collapsed: small divider line between sections */}
            {collapsed && (
              <div className="mx-3 my-2 h-px bg-[var(--border-subtle)]" aria-hidden="true" />
            )}

            <div className={cn('flex flex-col gap-0.5', collapsed ? 'px-2' : 'px-2')}>
              {section.items.map((item) => (
                <NavItem
                  key={item.to}
                  {...item}
                  collapsed={collapsed}
                  onMobileClose={onMobileToggle}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Bottom Section: Notifications + Settings + User ───────── */}
      <div className="shrink-0 border-t border-[var(--border)]">
        {/* Utility nav items */}
        <div className={cn('flex flex-col gap-0.5 px-2 py-2')}>
          {BOTTOM_ITEMS.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              collapsed={collapsed}
              onMobileClose={onMobileToggle}
            />
          ))}
        </div>

        {/* User identity footer */}
        <div
          className={cn(
            'mx-2 mb-2 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)]',
            'transition-all duration-200',
            collapsed ? 'p-2 flex justify-center' : 'p-3',
          )}
        >
          {collapsed ? (
            /* Collapsed: just avatar */
            <button
              onClick={() => navigate('/profile')}
              className="rounded-full ring-2 ring-indigo-600/20 focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]"
              aria-label="View profile"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-indigo-600 text-white text-xs font-bold">
                  AJ
                </AvatarFallback>
              </Avatar>
            </button>
          ) : (
            /* Expanded: avatar + name + role + actions */
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate('/profile')}
                className="rounded-full ring-2 ring-indigo-600/20 shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]"
                aria-label="View profile"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-indigo-600 text-white text-xs font-bold">
                    AJ
                  </AvatarFallback>
                </Avatar>
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                  Alex Johnson
                </p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">
                  Senior Engineer
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="shrink-0 rounded-lg p-1.5 text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard,
  Plus,
  Video,
  FileText,
  BarChart3,
  BookOpen,
  History,
  Workflow,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Briefcase,
  Target,
  Bell,
  User,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarGroup {
  category: string;
  items: {
    id: string;
    label: string;
    icon: React.ElementType;
    path: string;
    badge?: number | string;
  }[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    category: "PREPARE",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { id: "new-interview", label: "New Interview", icon: Plus, path: "/new-interview" },
      { id: "resumes", label: "Resumes Vault", icon: UserCheck, path: "/resumes" },
      { id: "job-descriptions", label: "Target Roles", icon: Briefcase, path: "/job-descriptions" },
    ],
  },
  {
    category: "PERFORM",
    items: [
      { id: "interview-session", label: "Live Arena", icon: Video, path: "/interview-session", badge: "LIVE" },
    ],
  },
  {
    category: "REVIEW",
    items: [
      { id: "reports", label: "Reports & Debrief", icon: FileText, path: "/reports" },
      { id: "interview-history", label: "Interview History", icon: History, path: "/interview-history" },
    ],
  },
  {
    category: "GROW",
    items: [
      { id: "career-coach", label: "AI Career Coach", icon: Target, path: "/career-coach" },
      { id: "learning-hub", label: "Learning Hub", icon: BookOpen, path: "/learning-hub" },
      { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
    ],
  },
  {
    category: "INTELLIGENCE",
    items: [
      { id: "ai-workflow", label: "AI Workflow", icon: Workflow, path: "/ai-workflow" },
      { id: "agent-monitoring", label: "Agent Monitoring", icon: Activity, path: "/agent-monitoring" },
    ],
  },
  {
    category: "ACCOUNT",
    items: [
      { id: "profile", label: "Profile", icon: User, path: "/profile" },
      { id: "notifications", label: "Notifications", icon: Bell, path: "/notifications", badge: 3 },
      { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
      { id: "admin", label: "Admin Console", icon: ShieldAlert, path: "/admin" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "sticky top-0 h-[calc(100vh-1.75rem)] shrink-0 bg-[var(--surface)] border-r border-[var(--border)] transition-all duration-300 ease-in-out flex flex-col justify-between shadow-sm z-30",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="font-display font-black text-sm tracking-tight text-[var(--text-primary)] block leading-none">
                  InterviewSage
                </span>
                <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-wider">
                  AI Platform
                </span>
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8 rounded-xl hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] shrink-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Grouped Navigation */}
        <nav className="px-3 py-3 overflow-y-auto max-h-[calc(100vh-8rem)] space-y-4 scrollbar-thin">
          {sidebarGroups.map((group) => (
            <div key={group.category} className="space-y-1">
              {!collapsed && (
                <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  {group.category}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150",
                          isActive
                            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-[var(--text-muted)]")} />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.badge && (
                              <span
                                className={cn(
                                  "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md leading-none shrink-0",
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : typeof item.badge === "string"
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                    : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--surface-raised)] rounded-b-2xl">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 ai-pulse-ring" />
              <span>Agents Active</span>
            </span>
            <span className="font-bold">v1.0.0</span>
          </div>
        </div>
      )}
    </aside>
  );
}
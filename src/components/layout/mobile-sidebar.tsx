import { Link, useLocation } from "react-router-dom"
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
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SidebarItem {
  id: string
  label: string
  icon: React.ElementType
  path: string
  badge?: number
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    id: 'new-interview',
    label: 'New Interview',
    icon: Plus,
    path: '/new-interview',
  },
  {
    id: 'interview-session',
    label: 'Interview Session',
    icon: Video,
    path: '/interview-session',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    path: '/reports',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
  },
  {
    id: 'learning-hub',
    label: 'Learning Hub',
    icon: BookOpen,
    path: '/learning-hub',
  },
  {
    id: 'interview-history',
    label: 'Interview History',
    icon: History,
    path: '/interview-history',
  },
  {
    id: 'ai-workflow',
    label: 'AI Workflow',
    icon: Workflow,
    path: '/ai-workflow',
  },
  {
    id: 'agent-monitoring',
    label: 'Agent Monitoring',
    icon: Activity,
    path: '/agent-monitoring',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
  },
]

interface MobileSidebarProps {
  open: boolean
  onClose: () => void
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const location = useLocation()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IS</span>
            </div>
            <span className="font-display font-semibold text-lg">InterviewSage</span>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            InterviewSage AI v1.0
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
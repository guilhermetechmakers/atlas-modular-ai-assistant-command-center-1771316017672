import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  BookOpen,
  Calendar,
  Wallet,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Shield,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems: { to: string; label: string; icon: React.ElementType }[] = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/dashboard/content', label: 'Content', icon: FileText },
  { to: '/dashboard/research', label: 'Research', icon: BookOpen },
  { to: '/dashboard/calendar', label: 'Calendar & Travel', icon: Calendar },
  { to: '/dashboard/finance', label: 'Finance', icon: Wallet },
  { to: '/dashboard/agents', label: 'Agent Builder', icon: Bot },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
]

const bottomItems: { to: string; label: string; icon: React.ElementType }[] = [
  { to: '/dashboard/admin', label: 'Admin', icon: Shield },
  { to: '/help', label: 'Help & Docs', icon: HelpCircle },
]

export function DashboardLayout(): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          'flex flex-col border-r border-border bg-panel transition-all duration-300 ease-in-out',
          collapsed ? 'w-[72px]' : 'w-[260px]'
        )}
      >
        <div className="flex h-14 items-center border-b border-border px-3">
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
              <span className="text-primary">Atlas</span>
            </Link>
          )}
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-2">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to))
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-3 rounded-button px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary border-l-2 border-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-border p-2">
          {bottomItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-button px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground',
                location.pathname === to && 'text-primary'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </div>
        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((c) => !c)}
            className="w-full"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-panel px-6">
          <div className="flex flex-1 items-center gap-2 rounded-button border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Search repos, notes, events...</span>
          </div>
          <Link to="/dashboard/audit" className="text-sm text-muted-foreground hover:text-foreground">
            Audit
          </Link>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

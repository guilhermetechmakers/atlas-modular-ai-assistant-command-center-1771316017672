import { useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const titles: Record<string, string> = {
  projects: 'Projects (GitHub)',
  content: 'Content Pipeline',
  research: 'Research & Knowledge Base',
  calendar: 'Calendar & Travel',
  finance: 'Finance Cockpit',
  agents: 'Agent Builder / Skills Registry',
  settings: 'Settings',
  admin: 'Admin Dashboard',
  audit: 'Audit Logs',
}

export function DashboardPlaceholderPage(): React.ReactElement {
  const pathname = useLocation().pathname
  const section = pathname.split('/').filter(Boolean).pop() ?? ''
  const title = titles[section] ?? (section || 'Dashboard')

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-display font-bold text-foreground">{title}</h1>
        <p className="mt-1 text-muted-foreground">This section is under construction.</p>
      </div>
      <Card className="border-border bg-card-surface">
        <CardHeader>
          <CardTitle className="text-foreground">Coming soon</CardTitle>
          <CardDescription>
            Full functionality for {title} will be available in a future release.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Refer to the Atlas Development Blueprint for planned features and components.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

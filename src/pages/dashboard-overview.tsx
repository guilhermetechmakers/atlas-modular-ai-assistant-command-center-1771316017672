import { Link } from 'react-router-dom'
import { FolderGit2, FileText, Calendar, Wallet, Bot, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardOverviewPage(): React.ReactElement {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-display font-bold text-foreground">Today</h1>
        <p className="mt-1 text-muted-foreground">Your daily summary and quick actions.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick glance</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover border-border bg-card-surface">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                GitHub
              </CardTitle>
              <FolderGit2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">—</div>
              <p className="text-xs text-muted-foreground">Open issues across repos</p>
              <Button variant="ghost" size="sm" className="mt-2 px-0" asChild>
                <Link to="/dashboard/projects">View projects <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="card-hover border-border bg-card-surface">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Content
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">—</div>
              <p className="text-xs text-muted-foreground">Drafts in pipeline</p>
              <Button variant="ghost" size="sm" className="mt-2 px-0" asChild>
                <Link to="/dashboard/content">Content pipeline <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="card-hover border-border bg-card-surface">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Calendar
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">—</div>
              <p className="text-xs text-muted-foreground">Events today</p>
              <Button variant="ghost" size="sm" className="mt-2 px-0" asChild>
                <Link to="/dashboard/calendar">Calendar <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="card-hover border-border bg-card-surface">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Finance
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">—</div>
              <p className="text-xs text-muted-foreground">Runway / budget</p>
              <Button variant="ghost" size="sm" className="mt-2 px-0" asChild>
                <Link to="/dashboard/finance">Finance <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card-surface">
          <CardHeader>
            <CardTitle className="text-foreground">Agent activity</CardTitle>
            <CardDescription>Recent suggestions and completed actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
              <Bot className="h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">No recent agent activity.</p>
              <p className="text-xs text-muted-foreground">Ask &quot;What should I do today?&quot; in the search bar.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card-surface">
          <CardHeader>
            <CardTitle className="text-foreground">Today&apos;s panel</CardTitle>
            <CardDescription>Tasks and events for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

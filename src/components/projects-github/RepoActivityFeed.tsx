import { useState } from 'react'
import { GitCommit, GitPullRequest, AlertCircle, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ActivityItem } from '@/types/projects-github'

export interface RepoActivityFeedProps {
  activity: ActivityItem[]
  isLoading?: boolean
  className?: string
}

type FilterType = 'all' | 'commit' | 'pr' | 'issue'

export function RepoActivityFeed({
  activity,
  isLoading = false,
  className,
}: RepoActivityFeedProps): React.ReactElement {
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered =
    filter === 'all'
      ? activity
      : activity.filter((a) => a.type === filter)

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    if (diff < 60 * 1000) return 'Just now'
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / 3600000)}h ago`
    return d.toLocaleDateString()
  }

  if (isLoading) {
    return (
      <Card className={cn('border-border bg-card-surface', className)}>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('border-border bg-card-surface transition-all duration-200 hover:shadow-card-hover', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Activity</CardTitle>
            <CardDescription>Commits, PRs, and issues</CardDescription>
          </div>
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-9">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="commit" className="text-xs">Commits</TabsTrigger>
            <TabsTrigger value="pr" className="text-xs">PRs</TabsTrigger>
            <TabsTrigger value="issue" className="text-xs">Issues</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[320px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Filter className="h-10 w-10 mb-2 opacity-50" />
              <p className="text-sm">No activity in this filter.</p>
            </div>
          ) : (
            filtered.map((item) => {
              if (item.type === 'commit') {
                const { data } = item
                return (
                  <div
                    key={data.id}
                    className="flex items-start gap-3 rounded-button border border-border bg-background/50 p-3 transition-colors hover:bg-secondary/50"
                  >
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <GitCommit className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{data.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {data.author} · {data.repoName} · {formatDate(data.date)}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 font-mono text-xs">{data.sha.slice(0, 7)}</Badge>
                  </div>
                )
              }
              if (item.type === 'pr') {
                const { data } = item
                return (
                  <div
                    key={data.id}
                    className="flex items-start gap-3 rounded-button border border-border bg-background/50 p-3 transition-colors hover:bg-secondary/50"
                  >
                    <div className="rounded-full bg-cyan-500/10 p-1.5">
                      <GitPullRequest className="h-4 w-4 text-cyan-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">#{data.number} {data.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {data.author} · {data.repoName} · {formatDate(data.createdAt)}
                      </p>
                    </div>
                    <Badge variant={data.state === 'open' ? 'default' : 'secondary'}>{data.state}</Badge>
                  </div>
                )
              }
              const { data } = item
              return (
                <div
                  key={data.id}
                  className="flex items-start gap-3 rounded-button border border-border bg-background/50 p-3 transition-colors hover:bg-secondary/50"
                >
                  <div className="rounded-full bg-orange-500/10 p-1.5">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">#{data.number} {data.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {data.author} · {data.repoName} · {formatDate(data.updatedAt)}
                    </p>
                  </div>
                  <Badge variant={data.state === 'open' ? 'default' : 'secondary'}>{data.state}</Badge>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}

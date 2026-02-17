import { useState } from 'react'
import { GitBranch, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { GitHubRepo } from '@/types/projects-github'

export interface RepoSelectorProps {
  connected: boolean
  repos: GitHubRepo[]
  selectedRepoId: string | null
  onSelectRepo: (repoId: string | null) => void
  onConnect: () => void
  isLoading?: boolean
  className?: string
}

export function RepoSelector({
  connected,
  repos,
  selectedRepoId,
  onSelectRepo,
  onConnect,
  isLoading = false,
  className,
}: RepoSelectorProps): React.ReactElement {
  const [connecting, setConnecting] = useState(false)

  const handleConnect = () => {
    setConnecting(true)
    onConnect()
    setTimeout(() => setConnecting(false), 800)
  }

  if (!connected) {
    return (
      <Card className={cn('border-border bg-card-surface transition-all duration-200 hover:shadow-card-hover', className)}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <GitBranch className="h-5 w-5 text-primary" />
            Connect GitHub
          </CardTitle>
          <CardDescription>
            Connect your GitHub account to select repos and sync issues, PRs, and commits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleConnect}
            disabled={connecting}
            className="bg-primary text-primary-foreground hover:scale-[1.02] hover:shadow-lg"
          >
            {connecting ? (
              <span className="animate-pulse">Connecting…</span>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Connect account
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('border-border bg-card-surface transition-all duration-200 hover:shadow-card-hover', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GitBranch className="h-5 w-5 text-primary" />
          Repository
        </CardTitle>
        <CardDescription>Choose a repository to view activity and issues.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-10 w-full rounded-button" />
        ) : (
          <Select
            value={selectedRepoId ?? 'all'}
            onValueChange={(v) => onSelectRepo(v === 'all' ? null : v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select repo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All repos</SelectItem>
              {repos.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  <span className="flex items-center gap-2">
                    {r.fullName}
                    <span className="text-muted-foreground text-xs">({r.openIssuesCount} open)</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardContent>
    </Card>
  )
}

import { useState, useMemo } from 'react'
import { Search, Plus, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { GitHubIssue, GitHubRepo } from '@/types/projects-github'

export interface IssueListDetailPanelProps {
  issues: GitHubIssue[]
  repos: GitHubRepo[]
  selectedRepoId: string | null
  selectedIssueId: string | null
  onSelectIssue: (issue: GitHubIssue | null) => void
  onCreateIssue: (payload: { title: string; body?: string; repoId: string }) => void
  isLoading?: boolean
  createIssueLoading?: boolean
  className?: string
}

export function IssueListDetailPanel({
  issues,
  repos,
  selectedIssueId,
  onSelectIssue,
  onCreateIssue,
  isLoading = false,
  createIssueLoading = false,
  className,
}: IssueListDetailPanelProps): React.ReactElement {
  const [search, setSearch] = useState('')
  const [stateFilter, setStateFilter] = useState<string>('all')
  const [createOpen, setCreateOpen] = useState(false)
  const [createTitle, setCreateTitle] = useState('')
  const [createBody, setCreateBody] = useState('')
  const [createRepoId, setCreateRepoId] = useState(repos[0]?.id ?? '')

  const filtered = useMemo(() => {
    let list = issues
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((i) => i.title.toLowerCase().includes(q) || (i.body?.toLowerCase().includes(q)))
    }
    if (stateFilter === 'open') list = list.filter((i) => i.state === 'open')
    if (stateFilter === 'closed') list = list.filter((i) => i.state === 'closed')
    return list
  }, [issues, search, stateFilter])

  const selectedIssue = issues.find((i) => i.id === selectedIssueId) ?? null

  const handleCreate = () => {
    if (!createTitle.trim() || !createRepoId) return
    onCreateIssue({ title: createTitle.trim(), body: createBody.trim() || undefined, repoId: createRepoId })
    setCreateTitle('')
    setCreateBody('')
    setCreateRepoId(repos[0]?.id ?? '')
    setCreateOpen(false)
  }

  return (
    <div className={cn('grid gap-4 lg:grid-cols-[1fr,1fr]', className)}>
      <Card className="border-border bg-card-surface transition-all duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Issues</CardTitle>
            <Button
              size="sm"
              onClick={() => setCreateOpen(true)}
              className="hover:scale-[1.02]"
            >
              <Plus className="h-4 w-4" />
              New issue
            </Button>
          </div>
          <CardDescription>Search and filter, then select to view details.</CardDescription>
          <div className="flex gap-2 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search issues…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <AlertCircle className="h-12 w-12 mb-2 opacity-50" />
              <p className="text-sm">No issues match your filters.</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setCreateOpen(true)}>
                Create first issue
              </Button>
            </div>
          ) : (
            <ul className="space-y-1 max-h-[400px] overflow-y-auto">
              {filtered.map((issue) => (
                <li key={issue.id}>
                  <button
                    type="button"
                    onClick={() => onSelectIssue(selectedIssueId === issue.id ? null : issue)}
                    className={cn(
                      'w-full rounded-button border p-3 text-left transition-all duration-200 hover:shadow-sm',
                      selectedIssueId === issue.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-background/50 hover:bg-secondary/50'
                    )}
                  >
                    <p className="text-sm font-medium truncate">#{issue.number} {issue.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{issue.repoName}</span>
                      <Badge variant={issue.state === 'open' ? 'default' : 'secondary'} className="text-xs">
                        {issue.state}
                      </Badge>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="border-border bg-card-surface transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-lg">Detail</CardTitle>
          <CardDescription>Issue description and metadata.</CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedIssue ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <AlertCircle className="h-12 w-12 mb-2 opacity-50" />
              <p className="text-sm">Select an issue to view details.</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="font-semibold text-foreground">#{selectedIssue.number} {selectedIssue.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedIssue.repoName} · {selectedIssue.author} · {new Date(selectedIssue.createdAt).toLocaleString()}
                </p>
              </div>
              {selectedIssue.body && (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedIssue.body}</p>
              )}
              {selectedIssue.labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selectedIssue.labels.map((l) => (
                    <Badge key={l} variant="secondary">{l}</Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent showClose className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create issue</DialogTitle>
            <DialogDescription>Create a new issue (mapped to github.create_issue when connected).</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="create-repo">Repository</Label>
              <Select value={createRepoId} onValueChange={setCreateRepoId}>
                <SelectTrigger id="create-repo">
                  <SelectValue placeholder="Select repo" />
                </SelectTrigger>
                <SelectContent>
                  {repos.map((r) => (
                    <SelectItem key={r.id} value={r.id}>{r.fullName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-title">Title</Label>
              <Input
                id="create-title"
                placeholder="Issue title"
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-body">Description (optional)</Label>
              <Textarea
                id="create-body"
                placeholder="Body"
                value={createBody}
                onChange={(e) => setCreateBody(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button
              onClick={handleCreate}
              disabled={!createTitle.trim() || createIssueLoading}
            >
              {createIssueLoading ? 'Creating…' : 'Create issue'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

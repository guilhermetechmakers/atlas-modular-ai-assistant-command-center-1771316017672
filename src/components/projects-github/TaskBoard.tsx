import { useState, useCallback, useMemo } from 'react'
import { GripVertical } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { GitHubIssue } from '@/types/projects-github'

type ColumnId = 'open' | 'in_progress' | 'done' | 'closed'

const COLUMNS: { id: ColumnId; label: string }[] = [
  { id: 'open', label: 'Open' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'done', label: 'Done' },
  { id: 'closed', label: 'Closed' },
]

function issueToColumn(issue: GitHubIssue): ColumnId {
  if (issue.state === 'closed') return 'closed'
  return 'open'
}

export interface TaskBoardProps {
  issues: GitHubIssue[]
  onMoveIssue?: (issueId: string, state: 'open' | 'closed') => void
  isLoading?: boolean
  className?: string
}

export function TaskBoard({
  issues,
  onMoveIssue,
  isLoading = false,
  className,
}: TaskBoardProps): React.ReactElement {
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [overColumn, setOverColumn] = useState<ColumnId | null>(null)

  const issuesByColumn = useMemo(() => {
    const map: Record<ColumnId, GitHubIssue[]> = { open: [], in_progress: [], done: [], closed: [] }
    issues.forEach((i) => {
      const col = issueToColumn(i)
      map[col].push(i)
    })
    return map
  }, [issues])

  const handleDragStart = useCallback((e: React.DragEvent, issueId: string) => {
    setDraggedId(issueId)
    e.dataTransfer.setData('text/plain', issueId)
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedId(null)
    setOverColumn(null)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, colId: ColumnId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverColumn(colId)
  }, [])

  const handleDragLeave = useCallback(() => {
    setOverColumn(null)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, targetCol: ColumnId) => {
      e.preventDefault()
      setOverColumn(null)
      const issueId = e.dataTransfer.getData('text/plain')
      if (!issueId || !onMoveIssue) return
      if (targetCol === 'closed') onMoveIssue(issueId, 'closed')
      else if (targetCol === 'open') onMoveIssue(issueId, 'open')
    },
    [onMoveIssue]
  )

  if (isLoading) {
    return (
      <Card className={cn('border-border bg-card-surface', className)}>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('border-border bg-card-surface transition-all duration-200', className)}>
      <CardHeader>
        <CardTitle className="text-lg">Task board</CardTitle>
        <CardDescription>Kanban mapped to GitHub issue states. Drag issues between columns.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2">
          {COLUMNS.map((col) => {
            const columnIssues = col.id === 'open' ? issuesByColumn.open
              : col.id === 'in_progress' ? issuesByColumn.in_progress
              : col.id === 'done' ? issuesByColumn.done
              : issuesByColumn.closed
            const isOver = overColumn === col.id
            return (
              <div
                key={col.id}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.id)}
                className={cn(
                  'min-w-[200px] rounded-card border-2 border-dashed p-3 transition-colors',
                  isOver ? 'border-primary bg-primary/5' : 'border-border bg-panel/50'
                )}
              >
                <h3 className="text-sm font-semibold text-foreground mb-2 sticky top-0 bg-panel/95 py-1">
                  {col.label}
                  <span className="ml-2 text-muted-foreground font-normal">({columnIssues.length})</span>
                </h3>
                <ul className="space-y-2 min-h-[80px]">
                  {columnIssues.map((issue) => (
                    <li
                      key={issue.id}
                      draggable={!!onMoveIssue}
                      onDragStart={(e) => handleDragStart(e, issue.id)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        'rounded-button border border-border bg-card-surface p-3 transition-all duration-200 hover:shadow-sm',
                        onMoveIssue && 'cursor-grab active:cursor-grabbing',
                        draggedId === issue.id && 'opacity-50'
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {onMoveIssue && <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">#{issue.number} {issue.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{issue.repoName}</p>
                          {issue.labels.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {issue.labels.slice(0, 2).map((l) => (
                                <Badge key={l} variant="secondary" className="text-xs">{l}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

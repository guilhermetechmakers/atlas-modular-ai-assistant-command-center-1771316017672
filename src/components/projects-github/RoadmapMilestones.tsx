import { useState } from 'react'
import { Calendar, Flag, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Milestone } from '@/types/projects-github'

export interface RoadmapMilestonesProps {
  milestones: Milestone[]
  onCreateMilestone?: (payload: { title: string; description?: string; dueDate?: string }) => void
  isLoading?: boolean
  className?: string
}

export function RoadmapMilestones({
  milestones,
  onCreateMilestone,
  isLoading = false,
  className,
}: RoadmapMilestonesProps): React.ReactElement {
  const [createOpen, setCreateOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleCreate = () => {
    if (!title.trim()) return
    onCreateMilestone?.({ title: title.trim(), description: description.trim() || undefined, dueDate: dueDate || undefined })
    setTitle('')
    setDescription('')
    setDueDate('')
    setCreateOpen(false)
  }

  if (isLoading) {
    return (
      <Card className={cn('border-border bg-card-surface', className)}>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className={cn('border-border bg-card-surface transition-all duration-200 hover:shadow-card-hover', className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flag className="h-5 w-5 text-primary" />
                Roadmap & Milestones
              </CardTitle>
              <CardDescription>Timeline view with epics and milestones.</CardDescription>
            </div>
            {onCreateMilestone && (
              <Button size="sm" onClick={() => setCreateOpen(true)} className="hover:scale-[1.02]">
                <Plus className="h-4 w-4" />
                New milestone
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden />
            <ul className="space-y-6">
              {milestones.length === 0 ? (
                <li className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mb-2 opacity-50" />
                  <p className="text-sm">No milestones yet.</p>
                  {onCreateMilestone && (
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setCreateOpen(true)}>
                      Create first milestone
                    </Button>
                  )}
                </li>
              ) : (
                milestones.map((m) => (
                  <li key={m.id} className="relative flex gap-4 pl-10 animate-fade-in">
                    <div className="absolute left-2 top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                    <div className="flex-1 rounded-card border border-border bg-background/50 p-4 transition-all duration-200 hover:shadow-sm">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{m.title}</h3>
                          {m.description && (
                            <p className="text-sm text-muted-foreground mt-1">{m.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {m.dueDate && (
                            <Badge variant="secondary" className="text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(m.dueDate).toLocaleDateString()}
                            </Badge>
                          )}
                          <Badge variant={m.state === 'open' ? 'default' : 'secondary'}>{m.state}</Badge>
                        </div>
                      </div>
                      <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                        <span>{m.openIssues} open</span>
                        <span>{m.closedIssues} closed</span>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent showClose className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create milestone / epic</DialogTitle>
            <DialogDescription>Add a milestone to your roadmap.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="milestone-title">Title</Label>
              <Input
                id="milestone-title"
                placeholder="e.g. Q1 Launch"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="milestone-desc">Description (optional)</Label>
              <Textarea
                id="milestone-desc"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="milestone-due">Due date (optional)</Label>
              <Input
                id="milestone-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!title.trim()}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

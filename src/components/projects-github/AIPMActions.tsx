import { useState } from 'react'
import { Sparkles, FileText, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface AIPMActionsProps {
  onSummarize?: () => void
  onCreateFromGoal?: () => void
  isLoading?: boolean
  className?: string
}

export function AIPMActions({
  onSummarize,
  onCreateFromGoal,
  isLoading = false,
  className,
}: AIPMActionsProps): React.ReactElement {
  const [summarizing, setSummarizing] = useState(false)
  const [creating, setCreating] = useState(false)

  const handleSummarize = () => {
    setSummarizing(true)
    onSummarize?.()
    setTimeout(() => setSummarizing(false), 1500)
  }

  const handleCreateFromGoal = () => {
    setCreating(true)
    onCreateFromGoal?.()
    setTimeout(() => setCreating(false), 1500)
  }

  return (
    <Card className={cn('border-border bg-card-surface transition-all duration-200 hover:shadow-card-hover', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          AI PM Actions
        </CardTitle>
        <CardDescription>Summarize activity or generate issues from a goal.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="default"
          onClick={handleSummarize}
          disabled={isLoading || summarizing}
          className="hover:scale-[1.02] hover:shadow-md"
        >
          <FileText className="h-4 w-4" />
          {summarizing ? 'Summarizing…' : 'Summarize recent activity'}
        </Button>
        <Button
          variant="outline"
          size="default"
          onClick={handleCreateFromGoal}
          disabled={isLoading || creating}
          className="hover:scale-[1.02] hover:shadow-md"
        >
          <Target className="h-4 w-4" />
          {creating ? 'Creating…' : 'Create issues from goal'}
        </Button>
      </CardContent>
    </Card>
  )
}

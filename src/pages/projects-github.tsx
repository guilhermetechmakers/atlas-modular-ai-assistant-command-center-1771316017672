import { useState, useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import { RepoSelector } from '@/components/projects-github/RepoSelector'
import { RepoActivityFeed } from '@/components/projects-github/RepoActivityFeed'
import { IssueListDetailPanel } from '@/components/projects-github/IssueListDetailPanel'
import { RoadmapMilestones } from '@/components/projects-github/RoadmapMilestones'
import { TaskBoard } from '@/components/projects-github/TaskBoard'
import { AIPMActions } from '@/components/projects-github/AIPMActions'
import {
  useRepos,
  useActivity,
  useIssues,
  useMilestones,
  useCreateIssue,
  useUpdateIssueState,
} from '@/hooks/use-projects-github'

export function ProjectsGitHubPage(): React.ReactElement {
  const [githubConnected, setGithubConnected] = useState(true)
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null)
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null)

  const { data: repos = [], isLoading: reposLoading } = useRepos(githubConnected)
  const { data: activity = [], isLoading: activityLoading } = useActivity(selectedRepoId, githubConnected)
  const { data: issues = [], isLoading: issuesLoading } = useIssues(selectedRepoId, undefined, githubConnected)
  const { data: milestones = [], isLoading: milestonesLoading } = useMilestones(selectedRepoId, githubConnected)

  const createIssue = useCreateIssue()
  const updateIssueState = useUpdateIssueState()

  const handleConnect = useCallback(() => {
    setGithubConnected(true)
    toast.success('GitHub connected')
  }, [])

  const handleCreateIssue = useCallback(
    (payload: { title: string; body?: string; repoId: string }) => {
      createIssue.mutate(
        { title: payload.title, body: payload.body, repoId: payload.repoId },
        {
          onError: () => {
            toast.error('Could not create issue. Ensure backend or MCP github.create_issue is configured.')
          },
        }
      )
    },
    [createIssue]
  )

  const handleMoveIssue = useCallback(
    (issueId: string, state: 'open' | 'closed') => {
      updateIssueState.mutate({ issueId, state })
    },
    [updateIssueState]
  )

  const handleSummarize = useCallback(() => {
    toast.success('Summary: Recent activity includes commits, open PRs, and issues. Connect an AI backend for full summaries.')
  }, [])

  const handleCreateFromGoal = useCallback(() => {
    toast.success('Create issues from goal: Connect an AI backend to generate issues from a goal.')
  }, [])

  useEffect(() => {
    document.title = 'Projects (GitHub) | Atlas'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Project explorer: GitHub repos, issues, PRs, commits, roadmaps, and task board.')
  }, [])

  return (
    <div className="space-y-8 animate-fade-in">
        <header>
          <h1 className="text-display font-bold text-foreground">Projects (GitHub)</h1>
          <p className="mt-1 text-muted-foreground">
            Connect repos, view activity, manage issues, and plan with roadmaps and boards.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <RepoSelector
            connected={githubConnected}
            repos={repos}
            selectedRepoId={selectedRepoId}
            onSelectRepo={setSelectedRepoId}
            onConnect={handleConnect}
            isLoading={reposLoading}
          />
          <AIPMActions
            onSummarize={handleSummarize}
            onCreateFromGoal={handleCreateFromGoal}
          />
        </section>

        <section>
          <RepoActivityFeed activity={activity} isLoading={activityLoading} />
        </section>

        <section>
          <IssueListDetailPanel
            issues={issues}
            repos={repos}
            selectedRepoId={selectedRepoId}
            selectedIssueId={selectedIssueId}
            onSelectIssue={(issue) => setSelectedIssueId(issue?.id ?? null)}
            onCreateIssue={handleCreateIssue}
            isLoading={issuesLoading}
            createIssueLoading={createIssue.isPending}
          />
        </section>

        <section>
          <RoadmapMilestones
            milestones={milestones}
            onCreateMilestone={(payload) => toast.success(`Milestone "${payload.title}" created. Wire to API when ready.`)}
            isLoading={milestonesLoading}
          />
        </section>

        <section>
          <TaskBoard
            issues={issues}
            onMoveIssue={handleMoveIssue}
            isLoading={issuesLoading}
          />
        </section>
      </div>
  )
}

export default ProjectsGitHubPage

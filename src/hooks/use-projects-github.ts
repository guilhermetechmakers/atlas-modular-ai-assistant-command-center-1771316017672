import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type {
  GitHubRepo,
  GitHubIssue,
  Milestone,
  ActivityItem,
} from '@/types/projects-github'
import * as api from '@/api/projects-github'

const PROJECTS_KEY = ['projects-github'] as const
const REPOS_KEY = ['projects-github', 'repos'] as const
const ACTIVITY_KEY = (repoId: string | null) => ['projects-github', 'activity', repoId] as const
const ISSUES_KEY = (repoId: string | null, filters?: { state?: string }) =>
  ['projects-github', 'issues', repoId, filters] as const
const MILESTONES_KEY = (repoId: string | null) => ['projects-github', 'milestones', repoId] as const

/** Mock repos when no backend connected */
function mockRepos(): GitHubRepo[] {
  return [
    { id: 'r1', name: 'atlas', fullName: 'org/atlas', private: false, defaultBranch: 'main', openIssuesCount: 12, stargazersCount: 0 },
    { id: 'r2', name: 'docs', fullName: 'org/docs', private: false, defaultBranch: 'main', openIssuesCount: 3, stargazersCount: 0 },
  ]
}

/** Mock activity (commits, PRs, issues) */
function mockActivity(repoId: string | null): ActivityItem[] {
  const repoName = repoId === 'r1' ? 'atlas' : repoId === 'r2' ? 'docs' : 'all'
  const items: ActivityItem[] = [
    { type: 'commit', data: { id: 'c1', sha: 'a1b2c3d', message: 'feat: add projects GitHub page', author: 'dev', date: new Date().toISOString(), repoId: repoId ?? 'r1', repoName } },
    { type: 'pr', data: { id: 'p1', number: 42, title: 'Add dashboard widgets', state: 'open', author: 'dev', createdAt: new Date().toISOString(), repoId: repoId ?? 'r1', repoName, baseBranch: 'main', headBranch: 'feat/widgets' } },
    { type: 'issue', data: { id: 'i1', number: 101, title: 'Improve loading states', body: null, state: 'open', repoId: repoId ?? 'r1', repoName, author: 'dev', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), labels: ['enhancement'] } },
  ]
  return items
}

/** Mock issues */
function mockIssues(repoId: string | null): GitHubIssue[] {
  const repoName = repoId === 'r1' ? 'atlas' : repoId === 'r2' ? 'docs' : 'repo'
  return [
    { id: 'i1', number: 101, title: 'Improve loading states', body: 'Add skeletons', state: 'open', repoId: repoId ?? 'r1', repoName, author: 'dev', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), labels: ['enhancement'] },
    { id: 'i2', number: 100, title: 'Fix nav highlight', body: null, state: 'closed', repoId: repoId ?? 'r1', repoName, author: 'dev', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), labels: [] },
  ]
}

/** Mock milestones */
function mockMilestones(repoId: string | null): Milestone[] {
  return [
    { id: 'm1', title: 'Q1 Launch', description: 'Ship core features', dueDate: '2025-03-31', state: 'open', openIssues: 5, closedIssues: 2, repoId: repoId ?? undefined },
    { id: 'm2', title: 'Q2 Polish', dueDate: null, state: 'open', openIssues: 0, closedIssues: 0, repoId: repoId ?? undefined },
  ]
}

export function useProjects() {
  return useQuery({
    queryKey: PROJECTS_KEY,
    queryFn: api.fetchProjects,
    placeholderData: [],
  })
}

export function useRepos(connected: boolean) {
  return useQuery({
    queryKey: REPOS_KEY,
    queryFn: async () => (connected ? mockRepos() : []),
    enabled: connected,
    placeholderData: [],
  })
}

export function useActivity(repoId: string | null, connected: boolean) {
  return useQuery({
    queryKey: ACTIVITY_KEY(repoId),
    queryFn: async () => mockActivity(repoId),
    enabled: connected,
    placeholderData: [],
  })
}

export function useIssues(repoId: string | null, filters: { state?: string } | undefined, connected: boolean) {
  return useQuery({
    queryKey: ISSUES_KEY(repoId, filters),
    queryFn: async () => mockIssues(repoId),
    enabled: connected,
    placeholderData: [],
  })
}

export function useMilestones(repoId: string | null, connected: boolean) {
  return useQuery({
    queryKey: MILESTONES_KEY(repoId),
    queryFn: async () => mockMilestones(repoId),
    enabled: connected,
    placeholderData: [],
  })
}

export function useCreateIssue() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.createIssue,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects-github'] })
      toast.success('Issue created')
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message ?? 'Failed to create issue')
    },
  })
}

export function useUpdateIssueState() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ issueId, state }: { issueId: string; state: 'open' | 'closed' }) =>
      api.updateIssueState(issueId, state),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects-github'] })
    },
  })
}

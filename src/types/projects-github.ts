/** Projects (GitHub) – DB and UI types */

export interface ProjectsGithub {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: string
  name: string
  fullName: string
  private: boolean
  defaultBranch: string
  openIssuesCount: number
  stargazersCount: number
}

export interface GitHubIssue {
  id: string
  number: number
  title: string
  body: string | null
  state: 'open' | 'closed'
  repoId: string
  repoName: string
  author: string
  createdAt: string
  updatedAt: string
  labels: string[]
}

export interface GitHubCommit {
  id: string
  sha: string
  message: string
  author: string
  date: string
  repoId: string
  repoName: string
  url?: string
}

export interface GitHubPR {
  id: string
  number: number
  title: string
  state: 'open' | 'closed' | 'merged'
  author: string
  createdAt: string
  repoId: string
  repoName: string
  baseBranch: string
  headBranch: string
}

export type ActivityItem =
  | { type: 'commit'; data: GitHubCommit }
  | { type: 'pr'; data: GitHubPR }
  | { type: 'issue'; data: GitHubIssue }

export interface Milestone {
  id: string
  title: string
  description?: string
  dueDate: string | null
  state: 'open' | 'closed'
  openIssues: number
  closedIssues: number
  repoId?: string
}

export interface CreateIssuePayload {
  title: string
  body?: string
  repoId: string
  labels?: string[]
}

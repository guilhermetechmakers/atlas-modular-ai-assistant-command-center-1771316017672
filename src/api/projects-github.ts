import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  type ApiError,
} from '@/lib/api'
import type {
  ProjectsGithub,
  CreateIssuePayload,
  GitHubIssue,
} from '@/types/projects-github'

const PROJECTS_BASE = '/projects-github'

export async function fetchProjects(): Promise<ProjectsGithub[]> {
  try {
    return await apiGet<ProjectsGithub[]>(PROJECTS_BASE)
  } catch {
    return []
  }
}

export async function createProject(
  payload: Pick<ProjectsGithub, 'title' | 'description' | 'status'>
): Promise<ProjectsGithub> {
  return apiPost<ProjectsGithub>(PROJECTS_BASE, payload)
}

export async function updateProject(
  id: string,
  payload: Partial<Pick<ProjectsGithub, 'title' | 'description' | 'status'>>
): Promise<ProjectsGithub> {
  return apiPut<ProjectsGithub>(`${PROJECTS_BASE}/${id}`, payload)
}

export async function deleteProject(id: string): Promise<void> {
  await apiDelete(`${PROJECTS_BASE}/${id}`)
}

/** Create issue – maps to github.create_issue when backend is configured */
export async function createIssue(payload: CreateIssuePayload): Promise<GitHubIssue> {
  return apiPost<GitHubIssue>('/github/issues', payload)
}

/** Update issue state (e.g. for Kanban drag) */
export async function updateIssueState(
  issueId: string,
  state: 'open' | 'closed'
): Promise<{ issueId: string; state: string }> {
  return apiPut<{ issueId: string; state: string }>(`/github/issues/${issueId}`, { state })
}

export type { ApiError }

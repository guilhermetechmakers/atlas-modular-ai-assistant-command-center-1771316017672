const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export interface ApiError {
  message: string
  code?: string
  status?: number
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('atlas_token') : null
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`
  const headers = await getAuthHeaders()
  const res = await fetch(url, {
    ...options,
    headers: { ...headers, ...options.headers },
  })
  if (!res.ok) {
    const err: ApiError = {
      message: (await res.json().catch(() => ({}))).message ?? res.statusText,
      status: res.status,
    }
    throw err
  }
  return res.json() as Promise<T>
}

export const apiGet = <T>(endpoint: string) =>
  api<T>(endpoint, { method: 'GET' })
export const apiPost = <T>(endpoint: string, body?: unknown) =>
  api<T>(endpoint, { method: 'POST', body: body ? JSON.stringify(body) : undefined })
export const apiPut = <T>(endpoint: string, body?: unknown) =>
  api<T>(endpoint, { method: 'PUT', body: body ? JSON.stringify(body) : undefined })
export const apiDelete = <T>(endpoint: string) =>
  api<T>(endpoint, { method: 'DELETE' })

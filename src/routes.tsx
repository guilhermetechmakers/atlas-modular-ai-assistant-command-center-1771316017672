import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { LandingPage } from '@/pages/landing'
import { LoginPage } from '@/pages/login'
import { SignupPage } from '@/pages/signup'
import { ResetPasswordPage } from '@/pages/reset-password'
import { DashboardOverviewPage } from '@/pages/dashboard-overview'
import { DashboardPlaceholderPage } from '@/pages/dashboard-placeholder'
import { ProjectsGitHubPage } from '@/pages/projects-github'
import { HelpPage } from '@/pages/help'
import { LegalPage } from '@/pages/legal'
import { NotFoundPage } from '@/pages/not-found'
import { ServerErrorPage } from '@/pages/server-error'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverviewPage /> },
      { path: 'projects', element: <ProjectsGitHubPage /> },
      { path: 'projects-github', element: <ProjectsGitHubPage /> },
      { path: 'content', element: <DashboardPlaceholderPage /> },
      { path: 'research', element: <DashboardPlaceholderPage /> },
      { path: 'calendar', element: <DashboardPlaceholderPage /> },
      { path: 'finance', element: <DashboardPlaceholderPage /> },
      { path: 'agents', element: <DashboardPlaceholderPage /> },
      { path: 'settings', element: <DashboardPlaceholderPage /> },
      { path: 'admin', element: <DashboardPlaceholderPage /> },
      { path: 'audit', element: <DashboardPlaceholderPage /> },
    ],
  },
  { path: '/help', element: <HelpPage /> },
  { path: '/privacy', element: <LegalPage title="Privacy Policy" slug="privacy" /> },
  { path: '/terms', element: <LegalPage title="Terms of Service" slug="terms" /> },
  { path: '/500', element: <ServerErrorPage /> },
  { path: '/404', element: <NotFoundPage /> },
  { path: '*', element: <Navigate to="/404" replace /> },
])

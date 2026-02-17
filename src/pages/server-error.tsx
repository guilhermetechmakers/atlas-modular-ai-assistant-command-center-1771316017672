import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ServerErrorPage(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <AlertTriangle className="h-16 w-16 text-destructive" />
      <h1 className="mt-6 text-2xl font-bold text-foreground">Something went wrong</h1>
      <p className="mt-2 text-center text-muted-foreground">
        We’re sorry. An error occurred. Please try again or contact support.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/help">Report issue</Link>
        </Button>
      </div>
    </div>
  )
}

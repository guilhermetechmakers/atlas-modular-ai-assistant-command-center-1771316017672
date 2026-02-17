import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundPage(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />
      <h1 className="mt-6 text-2xl font-bold text-foreground">Page not found</h1>
      <p className="mt-2 text-center text-muted-foreground">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/help">Help</Link>
        </Button>
      </div>
    </div>
  )
}

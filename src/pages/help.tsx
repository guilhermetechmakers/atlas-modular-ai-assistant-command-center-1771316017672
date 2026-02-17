import { Link } from 'react-router-dom'
import { BookOpen, MessageCircle, FileCode } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function HelpPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-panel">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/dashboard" className="font-semibold text-primary">Atlas</Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            Back to Dashboard
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-display font-bold text-foreground">Help & Docs</h1>
        <p className="mt-2 text-muted-foreground">
          Onboarding, documentation, and support for self-host and daily use.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Card className="card-hover border-border bg-card-surface">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary" />
              <CardTitle className="text-foreground">Documentation</CardTitle>
              <CardDescription>Guides, API reference, and self-host setup.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link to="#">Browse docs</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="card-hover border-border bg-card-surface">
            <CardHeader>
              <FileCode className="h-10 w-10 text-cyan" />
              <CardTitle className="text-foreground">Self-host Guide</CardTitle>
              <CardDescription>Docker, env vars, and deployment.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link to="#">Read guide</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8 border-border bg-card-surface">
          <CardHeader>
            <MessageCircle className="h-10 w-10 text-primary" />
            <CardTitle className="text-foreground">Contact</CardTitle>
            <CardDescription>Send a message or report an issue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Message</label>
              <Input placeholder="Your question or feedback" className="bg-background" />
            </div>
            <Button>Send</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

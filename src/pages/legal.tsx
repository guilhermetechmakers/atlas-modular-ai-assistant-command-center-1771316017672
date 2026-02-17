import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type LegalPageProps = { title: string; slug: string }

export function LegalPage({ title, slug }: LegalPageProps): React.ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-panel">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="font-semibold text-primary">Atlas</Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Card className="border-border bg-card-surface">
          <CardHeader>
            <CardTitle className="text-foreground">{title}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">
              This is a placeholder for the {title} page. Full content will be added for compliance and trust.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: —. Document slug: {slug}.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { ArrowRight, Github, Calendar, FileText, Wallet, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LandingPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-panel/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <span className="text-xl font-bold text-primary">Atlas</span>
          <nav className="flex items-center gap-6">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgb(var(--orange) / 0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgb(var(--cyan) / 0.15), transparent)',
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1
            className={cn(
              'text-hero font-bold tracking-tight text-white md:text-5xl lg:text-6xl',
              'animate-fade-in-up'
            )}
          >
            Your unified command center
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
            Projects, content, research, calendar, and finance in one searchable workspace—powered by domain-specific AI agents you control.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            <Button size="lg" asChild className="min-w-[160px]">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-w-[160px]">
              <Link to="/help">Self-host Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-panel/50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-display font-bold text-foreground text-center mb-12">
            One workspace, every domain
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Github, title: 'Projects', desc: 'GitHub-first PM with issues, roadmaps, and AI summaries.' },
              { icon: FileText, title: 'Content Pipeline', desc: 'Ideas → drafts → schedule → publish with repurpose tools.' },
              { icon: Calendar, title: 'Calendar & Travel', desc: 'Events, tasks, trip planning, and focus blocks.' },
              { icon: Wallet, title: 'Finance Cockpit', desc: 'Ledger, budgets, runway, and AI-powered analysis.' },
              { icon: Bot, title: 'Agents & Skills', desc: 'Custom agents, skill registry, and human-in-the-loop approvals.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-card border border-border bg-card-surface p-6 shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-cyan/30"
              >
                <Icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-foreground">Ready to unify your workflow?</h2>
          <p className="mt-2 text-muted-foreground">Self-hostable. Secure. Your data, your control.</p>
          <Button size="lg" className="mt-6" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border bg-panel py-8 px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© Atlas. Self-host first.</span>
          <div className="flex gap-6">
            <Link to="/help" className="hover:text-foreground">Docs</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

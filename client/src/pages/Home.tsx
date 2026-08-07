import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const stats = [
  { value: '10,000+', label: 'Resumes reviewed' },
  { value: '94%', label: 'ATS pass rate*' },
  { value: '3.2x', label: 'More interviews*' },
];

export default function Home() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge variant="highlight" className="gap-1.5">
            <Sparkles className="h-3 w-3" />
            AI-Powered Resume Intelligence
          </Badge>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Turn any resume into an <span className="mark-highlight">interview magnet.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            ResumeAI reads your resume the way a recruiter and an ATS both do, then shows you
            exactly what to fix — line by line, keyword by keyword.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/features">
                Explore features
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">View pricing</Link>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold tracking-tight">{stat.value}</dd>
                <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-muted-foreground/70">
            *Illustrative figures for this design preview.
          </p>
        </div>

        {/* Signature element: a stylized "annotated resume" card */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-highlight/10 blur-2xl" />
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="font-display text-sm font-semibold">Jordan Ellis — Resume.pdf</p>
                <p className="text-xs text-muted-foreground">Scanned just now</p>
              </div>
              <Badge variant="secondary" className="gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Preview
              </Badge>
            </div>

            <div className="mt-5 space-y-3">
              <div className="h-3 w-4/5 rounded bg-muted" />
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-11/12 rounded bg-muted" />

              <p className="pt-2 text-sm leading-relaxed text-foreground">
                Led a team to redesign the{' '}
                <span className="mark-highlight font-medium">customer onboarding pipeline</span>,
                reducing time-to-value by{' '}
                <span className="mark-highlight font-medium">38% across 12,000 accounts</span> using{' '}
                <span className="mark-highlight font-medium">React and Python</span>.
              </p>

              <div className="h-3 w-3/4 rounded bg-muted" />
              <div className="h-3 w-5/6 rounded bg-muted" />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
              {['Keyword match', 'ATS format', 'Impact metrics'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

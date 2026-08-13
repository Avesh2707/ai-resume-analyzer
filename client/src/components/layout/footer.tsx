import { Link } from 'react-router-dom';
import { FileSearch } from 'lucide-react';
import { primaryNav } from '@/config/nav';

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileSearch className="h-[18px] w-[18px]" strokeWidth={2.25} />
              </span>
              <span>ResumeAI</span>
            </Link>
            <p className="text-sm font-medium text-muted-foreground">
              Analyze smarter. Apply better.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
            {primaryNav.map((item) => (
              <Link key={item.href} to={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/80 pt-8 text-xs font-medium text-muted-foreground/70 md:flex-row md:items-center">
          <p>© 2026 ResumeAI. All rights reserved.</p>
          <p>AI-powered resume analysis & job matching.</p>
        </div>
      </div>
    </footer>
  );
}

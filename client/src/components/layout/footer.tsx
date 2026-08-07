import { Link } from 'react-router-dom';
import { FileSearch } from 'lucide-react';
import { primaryNav } from '@/config/nav';

export function Footer() {
  return (
    <footer className="border-t border-border/80">
      <div className="flex flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link to="/" className="flex items-center gap-2 font-display text-base font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FileSearch className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <span>ResumeAI</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {primaryNav.map((item) => (
              <Link key={item.href} to={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/80 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          <p>Application shell UI — not a live product yet.</p>
        </div>
      </div>
    </footer>
  );
}

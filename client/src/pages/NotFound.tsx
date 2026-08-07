import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
        <FileQuestion className="h-8 w-8" />
      </span>
      <p className="mt-6 font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        This page didn&apos;t make the cut.
      </h1>
      <p className="mt-3 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back
        on track.
      </p>
      <Button className="mt-8" asChild>
        <Link to="/">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to home
        </Link>
      </Button>
    </div>
  );
}

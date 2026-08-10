import { FileSearch } from 'lucide-react';

export function AuthLoadingScreen() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-muted-foreground">
      <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileSearch className="h-6 w-6" />
      </div>
      <p className="text-sm font-medium animate-pulse">Loading secure session...</p>
    </div>
  );
}

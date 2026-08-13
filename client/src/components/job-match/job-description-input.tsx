import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Briefcase } from 'lucide-react';

interface JobDescriptionInputProps {
  onAnalyze: (jobDescription: string) => Promise<void>;
  loading: boolean;
}

export function JobDescriptionInput({ onAnalyze, loading }: JobDescriptionInputProps) {
  const [jobDescription, setJobDescription] = useState('');
  const maxLength = 10000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim() || jobDescription.length > maxLength) return;
    onAnalyze(jobDescription);
  };

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <span>Job Description Match</span>
        </CardTitle>
        <CardDescription>
          Paste the job description you want to apply for. Our AI will analyze how well your resume matches the role and provide actionable feedback.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <textarea
              className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={loading}
              maxLength={maxLength}
            />
            <div className="flex justify-end text-xs text-muted-foreground">
              {jobDescription.length} / {maxLength} characters
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full sm:w-auto min-h-[44px]"
            disabled={loading || !jobDescription.trim() || jobDescription.length > maxLength}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Match...
              </>
            ) : (
              'Analyze Job Match'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

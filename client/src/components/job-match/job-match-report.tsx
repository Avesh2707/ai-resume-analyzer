import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type JobMatchData } from '@/lib/api';
import { Target, CheckCircle2, XCircle, AlertTriangle, TrendingUp, Lightbulb, Briefcase, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobMatchReportProps {
  jobMatch: JobMatchData;
  onReset: () => void;
}

export function JobMatchReport({ jobMatch, onReset }: JobMatchReportProps) {
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 75) return 'Strong Match';
    if (score >= 60) return 'Moderate Match';
    return 'Low Match';
  };

  return (
    <Card className="border-primary/20 shadow-sm overflow-hidden">
      <div className="bg-primary/5 p-6 border-b border-primary/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
              <Target className="h-6 w-6" />
              Job Match Results
            </h3>
            <p className="text-muted-foreground mt-1 text-sm max-w-2xl">
              {jobMatch.summary}
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-background rounded-lg p-4 shadow-sm min-w-[140px] border">
            <div className={`text-4xl font-black ${getScoreColor(jobMatch.matchScore)}`}>
              {jobMatch.matchScore}
            </div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
              {getScoreLabel(jobMatch.matchScore)}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b">
          
          {/* Matched & Strengths */}
          <div className="p-6 space-y-6">
            <div>
              <h4 className="flex items-center text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Matched Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {jobMatch.matchedSkills.length > 0 ? (
                  jobMatch.matchedSkills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No matching skills found.</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="flex items-center text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                Strengths For This Role
              </h4>
              <ul className="space-y-2">
                {jobMatch.strengthsForRole.length > 0 ? (
                  jobMatch.strengthsForRole.map((strength, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="text-blue-500 mr-2 mt-0.5">•</span>
                      <span>{strength}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground">No specific strengths identified.</li>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="flex items-center text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                <Briefcase className="h-4 w-4 mr-2 text-indigo-500" />
                Experience Match
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {jobMatch.experienceMatch}
              </p>
            </div>
          </div>

          {/* Missing & Gaps */}
          <div className="p-6 space-y-6">
            <div>
              <h4 className="flex items-center text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {jobMatch.missingSkills.length > 0 ? (
                  jobMatch.missingSkills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="border-red-200 text-red-600 dark:border-red-900/50 dark:text-red-400">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No essential skills missing!</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="flex items-center text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                Gaps For This Role
              </h4>
              <ul className="space-y-2">
                {jobMatch.gapsForRole.length > 0 ? (
                  jobMatch.gapsForRole.map((gap, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="text-amber-500 mr-2 mt-0.5">•</span>
                      <span>{gap}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground">No specific gaps identified.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Keywords and Recommendations */}
        <div className="p-6 bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <h4 className="flex items-center text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  Matched Keywords
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {jobMatch.matchedKeywords.length > 0 ? (
                    jobMatch.matchedKeywords.map((kw, i) => (
                      <Badge key={i} variant="secondary" className="text-xs font-normal">
                        {kw}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">None</span>
                  )}
                </div>
                
                <h4 className="flex items-center text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {jobMatch.missingKeywords.length > 0 ? (
                    jobMatch.missingKeywords.map((kw, i) => (
                      <Badge key={i} variant="outline" className="text-xs font-normal border-dashed">
                        {kw}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">None</span>
                  )}
                </div>
             </div>
             
             <div>
                <h4 className="flex items-center text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                  Recommendations
                </h4>
                <ul className="space-y-3">
                  {jobMatch.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm flex items-start bg-background p-3 rounded-md border shadow-sm">
                      <span className="text-yellow-500 mr-2 shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </CardContent>
      
      <div className="p-4 border-t bg-muted/10 flex justify-end">
        <Button variant="outline" size="sm" onClick={onReset} className="text-muted-foreground hover:text-foreground">
          <Trash2 className="h-4 w-4 mr-2" />
          Re-Analyze with New Job Description
        </Button>
      </div>
    </Card>
  );
}

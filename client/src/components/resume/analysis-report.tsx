import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type AnalysisData } from '@/lib/api';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, Briefcase, Star, LayoutTemplate } from 'lucide-react';

interface AnalysisReportProps {
  analysis: AnalysisData;
}

export function AnalysisReport({ analysis }: AnalysisReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="border-t-4 border-t-primary shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">AI Analysis Report</CardTitle>
              <CardDescription className="mt-1">
                Experience Level: <span className="font-semibold text-foreground">{analysis.experienceLevel}</span>
              </CardDescription>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">ATS Score</span>
              <div className={`text-4xl font-black ${getScoreColor(analysis.atsScore)}`}>
                {analysis.atsScore}<span className="text-xl text-muted-foreground">/100</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{analysis.summary}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Strengths */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.strengths.length > 0 ? (
                analysis.strengths.map((item, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <span className="mr-2 text-green-500">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">None identified.</li>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <XCircle className="mr-2 h-5 w-5 text-red-500" />
              Weaknesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.weaknesses.length > 0 ? (
                analysis.weaknesses.map((item, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <span className="mr-2 text-red-500">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">None identified.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Skills */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Star className="mr-2 h-5 w-5 text-blue-500" />
              Skills Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.length > 0 ? (
                analysis.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary">{skill}</Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">None identified.</span>
              )}
            </div>
            
            {analysis.missingSkills.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-semibold mb-2 flex items-center text-amber-600">
                  <AlertTriangle className="mr-1 h-4 w-4" /> Recommended Skills to Add
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-muted-foreground border-dashed">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Briefcase className="mr-2 h-5 w-5 text-indigo-500" />
              Keywords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.length > 0 ? (
                analysis.keywords.map((kw, i) => (
                  <Badge key={i} variant="default" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">{kw}</Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">None identified.</span>
              )}
            </div>
            
            {analysis.missingKeywords.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-semibold mb-2 flex items-center text-amber-600">
                  <AlertTriangle className="mr-1 h-4 w-4" /> Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((kw, i) => (
                    <Badge key={i} variant="outline" className="text-muted-foreground border-dashed">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Formatting Issues */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <LayoutTemplate className="mr-2 h-5 w-5 text-orange-500" />
              Formatting Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.formattingIssues.length > 0 ? (
                analysis.formattingIssues.map((item, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <span className="mr-2 text-orange-500">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  No formatting issues detected.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              Actionable Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.suggestions.length > 0 ? (
                analysis.suggestions.map((item, i) => (
                  <li key={i} className="text-sm flex items-start bg-yellow-50/50 p-2 rounded border border-yellow-100">
                    <span className="mr-2 mt-0.5 text-yellow-600 font-bold">{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">None at this time.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

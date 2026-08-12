import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResumeUploader } from '@/components/resume/resume-uploader';
import { getDashboardStats, type DashboardStats, type RecentResume, type RecentAnalysis } from '@/lib/api';
import { 
  FileText, Bot, Target, TrendingUp, AlertCircle, 
  Upload, ChevronRight, Activity, Clock
} from 'lucide-react';
import axios from 'axios';

export default function Overview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploader, setShowUploader] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardStats();
      setStats(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to load dashboard.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getAtsScoreInfo = (score: number) => {
    if (score >= 85) return { label: 'Excellent', color: 'text-green-500', bg: 'bg-green-500', badge: 'bg-green-100 text-green-800' };
    if (score >= 70) return { label: 'Strong', color: 'text-emerald-500', bg: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-800' };
    if (score >= 50) return { label: 'Fair', color: 'text-amber-500', bg: 'bg-amber-500', badge: 'bg-amber-100 text-amber-800' };
    return { label: 'Needs Improvement', color: 'text-red-500', bg: 'bg-red-500', badge: 'bg-red-100 text-red-800' };
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full animate-pulse">
        <div className="h-10 w-48 bg-muted rounded"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="h-32 bg-muted/50"></Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="h-64 bg-muted/50"></Card>
          <Card className="h-64 bg-muted/50"></Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-destructive h-[60vh]">
        <AlertCircle className="mb-4 h-12 w-12" />
        <h2 className="text-xl font-semibold mb-2">Unable to load dashboard</h2>
        <p className="mb-6">{error}</p>
        <Button variant="outline" onClick={fetchStats}>Retry</Button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto w-full pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Track your resume performance and job readiness.
          </p>
        </div>
        <Button onClick={() => setShowUploader(!showUploader)}>
          <Upload className="h-4 w-4 mr-2" />
          {showUploader ? 'Close Uploader' : 'Upload Resume'}
        </Button>
      </div>

      {showUploader && (
        <Card className="border-primary/20 shadow-sm animate-in fade-in slide-in-from-top-4">
          <CardHeader>
            <CardTitle>Upload New Resume</CardTitle>
            <CardDescription>Upload a PDF resume to extract its text and begin analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResumeUploader onUploadSuccess={() => {
              setShowUploader(false);
              fetchStats();
            }} />
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResumes}</div>
            <p className="text-xs text-muted-foreground mt-1">PDFs uploaded</p>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">AI Analyses</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAnalyses}</div>
            <p className="text-xs text-muted-foreground mt-1">Detailed reviews</p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobMatches}</div>
            <p className="text-xs text-muted-foreground mt-1">ATS comparisons</p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average ATS Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
               <div className={`text-2xl font-bold ${stats.averageAtsScore > 0 ? getAtsScoreInfo(stats.averageAtsScore).color : ''}`}>
                  {stats.averageAtsScore > 0 ? stats.averageAtsScore : '--'}
               </div>
               {stats.averageAtsScore > 0 && (
                 <span className="text-xs font-semibold text-muted-foreground">/ 100</span>
               )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all analyses</p>
          </CardContent>
        </Card>
      </div>

      {/* ATS Performance & Empty States logic */}
      {stats.totalResumes === 0 ? (
        <Card className="border-dashed bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Upload your first resume to start analyzing your profile and matching with jobs.
            </p>
            <Button onClick={() => setShowUploader(true)}>Upload Resume</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Recent Resumes */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Recent Resumes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                {stats.recentResumes.map((resume: RecentResume) => (
                  <div key={resume.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="bg-primary/10 p-2 rounded text-primary shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="truncate">
                        <p className="truncate text-sm font-medium">
                          {resume.originalName}
                        </p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                          <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{(resume.fileSize / 1024).toFixed(1)} KB</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0 ml-2">
                      {resume.hasAnalysis ? (
                        <Badge variant="secondary" className="hidden sm:inline-flex bg-primary/10 text-primary">Analyzed</Badge>
                      ) : (
                        <Badge variant="outline" className="hidden sm:inline-flex">Not Analyzed</Badge>
                      )}
                      <Button variant="ghost" size="sm" asChild className="shrink-0 h-8">
                        <Link to={`/dashboard/resumes/${resume.id}`}>
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Analyses & ATS Performance */}
          <div className="space-y-6">
             
             {/* ATS Performance Card */}
             {stats.totalAnalyses > 0 && (
               <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>ATS Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                       <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                          <div className="flex items-center space-x-2">
                            <span className={`text-3xl font-black ${getAtsScoreInfo(stats.averageAtsScore).color}`}>
                               {stats.averageAtsScore}
                            </span>
                            <Badge className={getAtsScoreInfo(stats.averageAtsScore).badge} variant="secondary">
                               {getAtsScoreInfo(stats.averageAtsScore).label}
                            </Badge>
                          </div>
                       </div>
                       <div className="space-y-1 text-right">
                          <p className="text-sm font-medium text-muted-foreground">Best Score</p>
                          <div className="text-2xl font-bold">{stats.bestAtsScore}</div>
                       </div>
                    </div>
                    
                    {/* Visual Progress Bar for Average */}
                    <div className="mt-4 space-y-2">
                       <div className="flex justify-between text-xs text-muted-foreground">
                         <span>0</span>
                         <span>50</span>
                         <span>70</span>
                         <span>85</span>
                         <span>100</span>
                       </div>
                       <div className="h-2 w-full bg-secondary rounded-full overflow-hidden flex">
                          <div className="h-full bg-red-500" style={{ width: '50%' }}></div>
                          <div className="h-full bg-amber-500" style={{ width: '20%' }}></div>
                          <div className="h-full bg-emerald-500" style={{ width: '15%' }}></div>
                          <div className="h-full bg-green-500" style={{ width: '15%' }}></div>
                       </div>
                       <div 
                         className="relative w-full" 
                         style={{ height: '4px' }}
                       >
                         <div 
                           className="absolute top-0 -mt-3 h-3 w-1 bg-foreground rounded-full shadow-sm"
                           style={{ left: `${stats.averageAtsScore}%` }}
                         />
                       </div>
                    </div>
                  </CardContent>
               </Card>
             )}

             {/* Recent Analyses List */}
             {stats.totalAnalyses === 0 ? (
                <Card className="border-dashed bg-muted/30">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
                    <Bot className="h-8 w-8 text-muted-foreground mb-3 opacity-50" />
                    <h3 className="text-md font-semibold mb-1">No AI analyses yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Analyze a resume to see your ATS score and insights.
                    </p>
                  </CardContent>
                </Card>
             ) : (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">Recent AI Analyses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.recentAnalyses.map((analysis: RecentAnalysis, i: number) => (
                        <Link 
                          key={i} 
                          to={`/dashboard/resumes/${analysis.resumeId}`}
                          className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/30 transition-all group"
                        >
                          <div className="truncate">
                            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                              {analysis.resumeName || 'Unknown Resume'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {analysis.experienceLevel} • {new Date(analysis.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3 shrink-0 ml-2">
                            <span className={`font-bold text-sm ${getAtsScoreInfo(analysis.atsScore).color}`}>
                              {analysis.atsScore}
                            </span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
             )}
          </div>
        </div>
      )}
    </div>
  );
}

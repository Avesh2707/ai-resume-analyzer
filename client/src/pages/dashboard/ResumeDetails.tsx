import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getResume, deleteResume, analyzeResume, getResumeAnalysis, analyzeJobMatch, getJobMatch, deleteJobMatch, type ResumeData, type AnalysisData, type JobMatchData } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, FileText, Loader2, AlertCircle, Bot } from 'lucide-react';
import { AnalysisReport } from '@/components/resume/analysis-report';
import { JobDescriptionInput } from '@/components/job-match/job-description-input';
import { JobMatchReport } from '@/components/job-match/job-match-report';
import axios from 'axios';

export default function ResumeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [jobMatch, setJobMatch] = useState<JobMatchData | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [matching, setMatching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumeAndAnalysis = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch resume
        const resumeData = await getResume(id);
        setResume(resumeData);
        
        // Try to fetch existing analysis
        try {
          const analysisData = await getResumeAnalysis(id);
          setAnalysis(analysisData);
        } catch (err: unknown) {
          // It's okay if analysis doesn't exist yet (404)
          if (axios.isAxiosError(err) && err.response?.status !== 404) {
            console.error('Failed to load analysis:', err);
          }
        }

        // Try to fetch existing job match
        try {
          const jobMatchData = await getJobMatch(id);
          setJobMatch(jobMatchData);
        } catch (err: unknown) {
          if (axios.isAxiosError(err) && err.response?.status !== 404) {
            console.error('Failed to load job match:', err);
          }
        }
        
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to load resume details.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResumeAndAnalysis();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      await deleteResume(id);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      alert('Failed to delete resume.');
    }
  };

  const handleAnalyze = async () => {
    if (!id) return;
    
    try {
      setAnalyzing(true);
      const data = await analyzeResume(id);
      setAnalysis(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Failed to analyze resume.');
      } else {
        alert('Failed to analyze resume.');
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAnalyzeJobMatch = async (jobDescription: string) => {
    if (!id) return;
    
    try {
      setMatching(true);
      const data = await analyzeJobMatch(id, jobDescription);
      setJobMatch(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Failed to analyze job match.');
      } else {
        alert('Failed to analyze job match.');
      }
    } finally {
      setMatching(false);
    }
  };

  const handleResetJobMatch = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this job match?')) return;
    try {
      await deleteJobMatch(id);
      setJobMatch(null);
    } catch (err) {
      alert('Failed to delete job match.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-destructive">
        <AlertCircle className="mb-4 h-8 w-8" />
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p className="mb-6">{error || 'Resume not found'}</p>
        <Button variant="outline" asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-5xl mx-auto w-full">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight truncate max-w-md" title={resume.originalName}>
              {resume.originalName}
            </h2>
            <p className="text-muted-foreground text-sm flex items-center space-x-2 mt-1">
              <span>{formatFileSize(resume.fileSize)}</span>
              <span>•</span>
              <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={handleAnalyze} 
            disabled={analyzing}
            className="border-primary text-primary hover:bg-primary/10"
          >
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                {analysis ? 'Re-analyze Resume' : 'Analyze Resume'}
              </>
            )}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      
      {analysis ? (
        <AnalysisReport analysis={analysis} />
      ) : (
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Bot className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No AI Analysis Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Unlock powerful insights, ATS scoring, and feedback by running our AI analyzer on this resume.
            </p>
            <Button onClick={handleAnalyze} disabled={analyzing}>
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Run AI Analysis'
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {jobMatch ? (
        <JobMatchReport jobMatch={jobMatch} onReset={handleResetJobMatch} />
      ) : (
        <JobDescriptionInput onAnalyze={handleAnalyzeJobMatch} loading={matching} />
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Extracted Text</span>
          </CardTitle>
          <CardDescription>
            Raw text extracted from your PDF ({resume.textLength || resume.extractedText?.length || 0} characters).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border bg-muted/30 p-4 min-h-[200px] max-h-[400px] overflow-y-auto font-mono text-sm whitespace-pre-wrap">
            {resume.extractedText}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

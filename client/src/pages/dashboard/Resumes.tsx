import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  FileText, Upload, AlertCircle, Clock, Trash2, Eye 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResumeUploader } from '@/components/resume/resume-uploader';
import { getResumes, deleteResume, type ResumeData } from '@/lib/api';

export default function Resumes() {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getResumes();
      setResumes(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to load resumes.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resume? This cannot be undone.')) {
      return;
    }
    try {
      setIsDeleting(id);
      await deleteResume(id);
      await fetchResumes();
    } catch (err: unknown) {
      alert('Failed to delete resume. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  const getAtsScoreInfo = (score: number) => {
    if (score >= 85) return { color: 'text-green-500' };
    if (score >= 70) return { color: 'text-emerald-500' };
    if (score >= 50) return { color: 'text-amber-500' };
    return { color: 'text-red-500' };
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-6 max-w-7xl mx-auto w-full animate-pulse">
        <div className="h-10 w-48 bg-muted rounded"></div>
        <div className="h-4 w-64 bg-muted rounded mt-2 mb-8"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-48 bg-muted/50"></Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-destructive h-[60vh]">
        <AlertCircle className="mb-4 h-12 w-12" />
        <h2 className="text-xl font-semibold mb-2">Unable to load resumes</h2>
        <p className="mb-6">{error}</p>
        <Button variant="outline" onClick={fetchResumes}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resumes</h2>
          <p className="text-muted-foreground mt-1">
            Manage your uploaded resumes and review your previous analyses.
          </p>
        </div>
        <Button onClick={() => setShowUploader(!showUploader)}>
          <Upload className="h-4 w-4 mr-2" />
          {showUploader ? 'Close Uploader' : 'Upload Resume'}
        </Button>
      </div>

      {showUploader && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle>Upload New Resume</CardTitle>
              <CardDescription>Upload a PDF resume to extract its text and begin analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResumeUploader onUploadSuccess={() => {
                setShowUploader(false);
                fetchResumes();
              }} />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {resumes.length === 0 ? (
        <Card className="border-dashed bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Upload your first resume to get an ATS score, AI feedback, and job matching insights.
            </p>
            <Button onClick={() => setShowUploader(true)}>Upload Resume</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <Card key={resume.id} className="flex flex-col hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 overflow-hidden pr-2">
                    <div className="bg-primary/10 p-2 rounded text-primary shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base truncate leading-tight" title={resume.originalName}>
                      {resume.originalName}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      {(resume.fileSize / 1024).toFixed(1)} KB
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground mb-1">Status</span>
                      {resume.hasAnalysis ? (
                        <Badge variant="secondary" className="bg-primary/10 text-primary w-fit text-[10px] leading-tight">Analyzed</Badge>
                      ) : (
                        <Badge variant="outline" className="w-fit text-[10px] leading-tight">Not Analyzed</Badge>
                      )}
                    </div>
                    
                    {resume.hasAnalysis && resume.atsScore !== undefined && resume.atsScore !== null && (
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground mb-1">ATS Score</span>
                        <span className={`font-bold text-sm ${getAtsScoreInfo(resume.atsScore).color}`}>
                          {resume.atsScore} / 100
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 pt-4 border-t">
                  <Button variant="secondary" className="flex-1 h-9" asChild>
                    <Link to={`/dashboard/resumes/${resume.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 shrink-0"
                    onClick={() => handleDelete(resume.id)}
                    disabled={isDeleting === resume.id}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

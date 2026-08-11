import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResumeUploader } from '@/components/resume/resume-uploader';
import { getResumes, deleteResume, type ResumeData } from '@/lib/api';
import { FileText, Trash2, Eye, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Overview() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getResumes();
      setResumes(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to fetch resumes.');
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

  const handleUploadSuccess = (newResume: ResumeData) => {
    setResumes((prev) => [newResume, ...prev]);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert('Failed to delete resume.');
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
            <CardDescription>Upload a PDF resume to extract its text.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResumeUploader onUploadSuccess={handleUploadSuccess} />
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Your Resumes</CardTitle>
            <CardDescription>View and manage your uploaded resumes.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="flex h-32 flex-col items-center justify-center text-destructive">
                <AlertCircle className="mb-2 h-6 w-6" />
                <p className="text-sm">{error}</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={fetchResumes}>Try Again</Button>
              </div>
            ) : resumes.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                <FileText className="mb-2 h-6 w-6 opacity-50" />
                <p className="text-sm">No resumes uploaded yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div key={resume.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3 truncate">
                      <div className="bg-primary/10 p-2 rounded text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="truncate">
                        <p className="truncate text-sm font-medium">{resume.originalName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(resume.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/dashboard/resumes/${resume.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(resume.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

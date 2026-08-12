import axios from 'axios';

/**
 * Pre-configured Axios instance for talking to the backend API.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // Crucial for sending/receiving HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept 401s globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 errors that are not from the /api/auth/me endpoint (which we expect to fail sometimes)
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config.url?.includes('/auth/me') &&
      !error.config.url?.includes('/auth/login')
    ) {
      // You can dispatch a custom event here that the AuthContext listens to,
      // or directly invoke a callback if you pass it in, but a custom event is decoupled.
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

// --- Resume API Helpers ---

export interface ResumeData {
  id: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  textLength?: number;
  extractedText?: string;
  hasAnalysis?: boolean;
  atsScore?: number | null;
}

export const uploadResume = async (formData: FormData): Promise<ResumeData> => {
  const response = await api.post('/resumes/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const getResumes = async (): Promise<ResumeData[]> => {
  const response = await api.get('/resumes');
  return response.data.data;
};

export const getResume = async (id: string): Promise<ResumeData> => {
  const response = await api.get(`/resumes/${id}`);
  return response.data.data;
};

export const deleteResume = async (id: string): Promise<void> => {
  await api.delete(`/resumes/${id}`);
};

// --- Analysis API Helpers ---

export interface JobMatch {
  score: number;
  explanation: string;
}

export interface AnalysisData {
  _id: string;
  userId: string;
  resumeId: string;
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skills: string[];
  missingSkills: string[];
  keywords: string[];
  missingKeywords: string[];
  experienceLevel: string;
  formattingIssues: string[];
  suggestions: string[];
  jobMatch?: JobMatch;
  createdAt: string;
  updatedAt: string;
}

export const analyzeResume = async (id: string): Promise<AnalysisData> => {
  const response = await api.post(`/resumes/${id}/analyze`);
  return response.data.data;
};

export const getResumeAnalysis = async (id: string): Promise<AnalysisData> => {
  const response = await api.get(`/resumes/${id}/analysis`);
  return response.data.data;
};

export const deleteResumeAnalysis = async (id: string): Promise<void> => {
  await api.delete(`/resumes/${id}/analysis`);
};

// --- Job Match API Helpers ---

export interface JobMatchData {
  _id: string;
  userId: string;
  resumeId: string;
  jobDescription: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  strengthsForRole: string[];
  gapsForRole: string[];
  recommendations: string[];
  experienceMatch: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export const analyzeJobMatch = async (id: string, jobDescription: string): Promise<JobMatchData> => {
  const response = await api.post(`/resumes/${id}/job-match`, { jobDescription });
  return response.data.data;
};

export const getJobMatch = async (id: string): Promise<JobMatchData> => {
  const response = await api.get(`/resumes/${id}/job-match`);
  return response.data.data;
};

export const deleteJobMatch = async (id: string): Promise<void> => {
  await api.delete(`/resumes/${id}/job-match`);
};

// --- Dashboard API Helpers ---

export interface RecentResume {
  id: string;
  originalName: string;
  fileSize: number;
  createdAt: string;
  atsScore: number | null;
  hasAnalysis: boolean;
}

export interface RecentAnalysis {
  resumeId: string;
  resumeName: string;
  atsScore: number;
  experienceLevel: string;
  createdAt: string;
}

export interface DashboardStats {
  totalResumes: number;
  totalAnalyses: number;
  totalJobMatches: number;
  averageAtsScore: number;
  bestAtsScore: number;
  recentResumes: RecentResume[];
  recentAnalyses: RecentAnalysis[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get('/dashboard/stats');
  return response.data.data;
};

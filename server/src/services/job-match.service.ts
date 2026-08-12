import { GoogleGenAI, Type, Schema } from '@google/genai';
import { env } from '@/config/env';

let ai: GoogleGenAI | null = null;
if (env.geminiApiKey) {
  ai = new GoogleGenAI({ apiKey: env.geminiApiKey });
}

export interface JobMatchAIResult {
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
}

const jobMatchSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.INTEGER,
      description: 'Overall match score between 0 and 100 based on how well the resume fits the job description.',
    },
    matchedSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of skills found in both the resume and the job description.',
    },
    missingSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of essential skills required by the job description but missing from the resume.',
    },
    matchedKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Important keywords or domain terms found in both.',
    },
    missingKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Important keywords or domain terms required by the job description but missing from the resume.',
    },
    strengthsForRole: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Specific strengths the candidate has for this specific role.',
    },
    gapsForRole: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Specific gaps or shortcomings the candidate has for this specific role.',
    },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Actionable recommendations for tailoring the resume to this specific job description.',
    },
    experienceMatch: {
      type: Type.STRING,
      description: 'An assessment of how well the candidate\'s experience level matches the role\'s required experience.',
    },
    summary: {
      type: Type.STRING,
      description: 'A brief overall summary of the candidate\'s fit for the role.',
    },
  },
  required: [
    'matchScore',
    'matchedSkills',
    'missingSkills',
    'matchedKeywords',
    'missingKeywords',
    'strengthsForRole',
    'gapsForRole',
    'recommendations',
    'experienceMatch',
    'summary',
  ],
};

export const analyzeJobMatch = async (resumeText: string, jobDescription: string): Promise<JobMatchAIResult> => {
  if (!ai) {
    throw new Error('Gemini API key is not configured.');
  }

  if (!resumeText || resumeText.trim().length === 0) {
    throw new Error('Resume text is empty.');
  }

  if (!jobDescription || jobDescription.trim().length === 0) {
    throw new Error('Job description is empty.');
  }

  const safeResumeText = resumeText.substring(0, 50000);
  const safeJobDescription = jobDescription.substring(0, 10000);

  const prompt = `
You are an expert Applicant Tracking System (ATS) and Technical Recruiter.
Analyze the following extracted resume text against the provided job description and output a structured assessment.

Do not hallucinate skills that are not present in the resume.
Do not assume experience that is not explicitly present.
Base your analysis only on the resume text and job description.

RESUME:
"""
${safeResumeText}
"""

JOB DESCRIPTION:
"""
${safeJobDescription}
"""
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: jobMatchSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    const json = JSON.parse(text) as JobMatchAIResult;
    return json;
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Gemini API Error (Job Match):', err?.message || err);
    throw new Error('Failed to analyze job match with AI.');
  }
};

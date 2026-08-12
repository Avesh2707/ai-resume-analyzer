import { GoogleGenAI, Type, Schema } from '@google/genai';
import { env } from '@/config/env';

// Initialize Gemini Client
// We ensure we only initialize if the key is present to avoid immediate crashes on import if not used,
// but handle missing key during service calls.
let ai: GoogleGenAI | null = null;
if (env.geminiApiKey) {
  ai = new GoogleGenAI({ apiKey: env.geminiApiKey });
}

export interface AIAnalysisResult {
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
}

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    atsScore: {
      type: Type.INTEGER,
      description: 'ATS compatibility score between 0 and 100',
    },
    summary: {
      type: Type.STRING,
      description: 'A brief overall summary of the resume quality and fit.',
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of strong points in the resume.',
    },
    weaknesses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of weak points or areas lacking in the resume.',
    },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of technical and soft skills found in the resume.',
    },
    missingSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of common skills expected but missing from the resume based on the implied role.',
    },
    keywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Key industry terms found.',
    },
    missingKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Important industry terms that are missing.',
    },
    experienceLevel: {
      type: Type.STRING,
      description: 'The inferred experience level (e.g., Entry Level, Mid Level, Senior).',
    },
    formattingIssues: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Any formatting or readability issues detected from the extracted text structure.',
    },
    suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Actionable suggestions for improving the resume.',
    },
  },
  required: [
    'atsScore',
    'summary',
    'strengths',
    'weaknesses',
    'skills',
    'missingSkills',
    'keywords',
    'missingKeywords',
    'experienceLevel',
    'formattingIssues',
    'suggestions',
  ],
};

export const analyzeResumeText = async (extractedText: string): Promise<AIAnalysisResult> => {
  if (!ai) {
    throw new Error('Gemini API key is not configured.');
  }

  if (!extractedText || extractedText.trim().length === 0) {
    throw new Error('Resume text is empty.');
  }

  // Truncate text if it's excessively long to prevent token limits (e.g., 50k chars is well within limits but safe)
  const safeText = extractedText.substring(0, 50000);

  const prompt = `
You are an expert Applicant Tracking System (ATS) and professional resume reviewer.
Analyze the following extracted resume text and provide a structured assessment.

Provide an ATS score (0-100), an overall summary, strengths, weaknesses, found skills, 
suggested missing skills, found keywords, missing keywords, inferred experience level, 
any formatting/readability issues, and actionable suggestions for improvement.

Resume Text:
"""
${safeText}
"""
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    const json = JSON.parse(text) as AIAnalysisResult;
    return json;
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Gemini API Error:', err?.message || err);
    throw new Error('Failed to analyze resume with AI.');
  }
};

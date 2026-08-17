import { GoogleGenAI, Type, Schema } from '@google/genai';
import { env } from '@/config/env';

let ai: GoogleGenAI | null = null;

if (env.geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: env.geminiApiKey,
  });
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
      description:
        'Overall match score between 0 and 100 based on how well the resume fits the job description.',
    },

    matchedSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description:
        'List of skills found in both the resume and the job description.',
    },

    missingSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description:
        'List of essential skills required by the job description but missing from the resume.',
    },

    matchedKeywords: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description:
        'Important keywords or domain terms found in both the resume and job description.',
    },

    missingKeywords: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description:
        'Important keywords or domain terms required by the job description but missing from the resume.',
    },

    strengthsForRole: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description:
        'Specific strengths the candidate has for this specific role.',
    },

    gapsForRole: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description:
        'Specific gaps or shortcomings the candidate has for this specific role.',
    },

    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description:
        'Actionable recommendations for tailoring the resume to this specific job description.',
    },

    experienceMatch: {
      type: Type.STRING,
      description:
        "An assessment of how well the candidate's experience level matches the role's required experience.",
    },

    summary: {
      type: Type.STRING,
      description:
        "A brief overall summary of the candidate's fit for the role.",
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

export const analyzeJobMatch = async (
  resumeText: string,
  jobDescription: string
): Promise<JobMatchAIResult> => {
  if (!ai) {
    throw new Error('Gemini API key is not configured.');
  }

  if (!resumeText || resumeText.trim().length === 0) {
    throw new Error('Resume text is empty.');
  }

  if (!jobDescription || jobDescription.trim().length === 0) {
    throw new Error('Job description is empty.');
  }

  // Limit input size to keep Gemini requests fast and reliable.
  const safeResumeText = resumeText.trim().substring(0, 30000);
  const safeJobDescription = jobDescription.trim().substring(0, 8000);

  const prompt = `
You are an expert ATS and technical recruiter.

Compare the resume against the job description.

Rules:
- Only use information explicitly present in the resume.
- Do not invent skills, experience, projects, or qualifications.
- Identify matched and missing skills.
- Identify important matched and missing keywords.
- Evaluate the candidate's experience for this role.
- Give practical recommendations for improving the resume.
- Return only the requested JSON structure.

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

        // Allow enough time for Gemini to complete the request.
        httpOptions: {
          timeout: 120000,
        },
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

    console.error('Gemini API Error (Job Match):', {
      message: err?.message,
      name: err?.name,
    });

    throw new Error('Failed to analyze job match with AI.');
  }
};
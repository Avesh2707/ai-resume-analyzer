import type { Response } from 'express';
import type { AuthRequest } from '@/middleware/auth.middleware';
import { Resume } from '@/models/Resume.model';
import { JobMatch } from '@/models/JobMatch.model';
import { analyzeJobMatch } from '@/services/job-match.service';

export const analyzeMatch = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id: resumeId } = req.params;
    const { jobDescription } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Job description is required.' });
    }

    if (jobDescription.length > 10000) {
      return res.status(400).json({ success: false, message: 'Job description exceeds maximum length of 10,000 characters.' });
    }

    // 1. Verify Resume ownership
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (!resume.extractedText) {
      return res.status(400).json({ success: false, message: 'Resume has no extracted text to analyze' });
    }

    // 2. Analyze using Gemini
    const aiResult = await analyzeJobMatch(resume.extractedText, jobDescription);

    // 3. Save or update the JobMatch in DB
    const jobMatch = await JobMatch.findOneAndUpdate(
      { userId, resumeId },
      {
        userId,
        resumeId,
        jobDescription,
        ...aiResult,
      },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: jobMatch,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Analyze Job Match Error:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Failed to analyze job match',
    });
  }
};

export const getMatch = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id: resumeId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Verify ownership of the resume first
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
       return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    const jobMatch = await JobMatch.findOne({ userId, resumeId });
    if (!jobMatch) {
      return res.status(404).json({ success: false, message: 'Job match not found for this resume' });
    }

    return res.status(200).json({
      success: true,
      data: jobMatch,
    });
  } catch (error: unknown) {
    console.error('Get Job Match Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve job match',
    });
  }
};

export const deleteMatch = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id: resumeId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const result = await JobMatch.findOneAndDelete({ userId, resumeId });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Job match not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Job match deleted successfully',
    });
  } catch (error: unknown) {
    console.error('Delete Job Match Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete job match',
    });
  }
};

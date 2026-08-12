import type { Response } from 'express';
import type { AuthRequest } from '@/middleware/auth.middleware';
import { Resume } from '@/models/Resume.model';
import { Analysis } from '@/models/Analysis.model';
import { analyzeResumeText } from '@/services/gemini.service';

export const analyzeResume = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id: resumeId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
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
    const aiResult = await analyzeResumeText(resume.extractedText);

    // 3. Save or update the Analysis in DB
    const analysis = await Analysis.findOneAndUpdate(
      { userId, resumeId },
      {
        userId,
        resumeId,
        ...aiResult,
      },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Analyze Resume Error:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Failed to analyze resume',
    });
  }
};

export const getAnalysis = async (req: AuthRequest, res: Response) => {
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

    const analysis = await Analysis.findOne({ userId, resumeId });
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis not found for this resume' });
    }

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error: unknown) {
    console.error('Get Analysis Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve analysis',
    });
  }
};

export const deleteAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id: resumeId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const result = await Analysis.findOneAndDelete({ userId, resumeId });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Analysis not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully',
    });
  } catch (error: unknown) {
    console.error('Delete Analysis Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete analysis',
    });
  }
};

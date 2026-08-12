import type { Response } from 'express';
import type { AuthRequest } from '@/middleware/auth.middleware';
import { Resume } from '@/models/Resume.model';
import { Analysis } from '@/models/Analysis.model';
import { extractTextFromPDF } from '@/services/pdf.service';

export const uploadResume = async (req: AuthRequest, res: Response) => {
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (file.mimetype !== 'application/pdf') {
    return res.status(400).json({ message: 'Only PDF files are allowed' });
  }

  try {
    const extractedText = await extractTextFromPDF(file.buffer);

    if (extractedText.length < 50) {
      return res.status(400).json({ message: 'Extracted text is too short or PDF is unreadable' });
    }

    const resume = await Resume.create({
      userId: req.user!.userId,
      originalName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      extractedText,
    });

    res.status(201).json({
      success: true,
      data: {
        id: resume._id,
        originalName: resume.originalName,
        fileSize: resume.fileSize,
        mimeType: resume.mimeType,
        textLength: resume.extractedText.length,
        createdAt: resume.createdAt,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error processing PDF' });
  }
};

export const getResumes = async (req: AuthRequest, res: Response) => {
  const resumes = await Resume.find({ userId: req.user!.userId })
    .sort({ createdAt: -1 })
    .select('-extractedText'); // Do not return full text in list

  // Fetch all analyses for the user to join the data
  const analyses = await Analysis.find({ userId: req.user!.userId });
  const analysisMap = new Map();
  analyses.forEach(a => analysisMap.set(a.resumeId.toString(), a));

  const mappedResumes = resumes.map(r => {
    const analysis = analysisMap.get(r._id.toString());
    return {
      id: r._id,
      originalName: r.originalName,
      fileSize: r.fileSize,
      mimeType: r.mimeType,
      createdAt: r.createdAt,
      hasAnalysis: !!analysis,
      atsScore: analysis ? analysis.atsScore : null,
    };
  });

  res.status(200).json({
    success: true,
    data: mappedResumes,
  });
};

export const getResumeById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const resume = await Resume.findOne({ _id: id, userId: req.user!.userId });

  if (!resume) {
    return res.status(404).json({ message: 'Resume not found' });
  }

  res.status(200).json({
    success: true,
    data: {
      id: resume._id,
      originalName: resume.originalName,
      fileSize: resume.fileSize,
      mimeType: resume.mimeType,
      textLength: resume.extractedText.length,
      extractedText: resume.extractedText,
      createdAt: resume.createdAt,
    },
  });
};

export const deleteResume = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const resume = await Resume.findOneAndDelete({ _id: id, userId: req.user!.userId });

  if (!resume) {
    return res.status(404).json({ message: 'Resume not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Resume deleted successfully',
  });
};

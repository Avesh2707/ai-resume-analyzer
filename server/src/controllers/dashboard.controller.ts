import type { Response } from 'express';
import type { AuthRequest } from '@/middleware/auth.middleware';
import mongoose from 'mongoose';
import { Resume } from '@/models/Resume.model';
import { Analysis } from '@/models/Analysis.model';
import { JobMatch } from '@/models/JobMatch.model';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // 1. Concurrent Counts
    const [totalResumes, totalAnalyses, totalJobMatches] = await Promise.all([
      Resume.countDocuments({ userId: userObjectId }),
      Analysis.countDocuments({ userId: userObjectId }),
      JobMatch.countDocuments({ userId: userObjectId }),
    ]);

    // 2. Aggregate ATS Scores (Average & Best)
    let averageAtsScore = 0;
    let bestAtsScore = 0;

    if (totalAnalyses > 0) {
      const scoreAggregation = await Analysis.aggregate([
        { $match: { userId: userObjectId } },
        { 
          $group: { 
            _id: null, 
            avgScore: { $avg: '$atsScore' }, 
            maxScore: { $max: '$atsScore' } 
          } 
        }
      ]);

      if (scoreAggregation.length > 0) {
        averageAtsScore = Math.round(scoreAggregation[0].avgScore || 0);
        bestAtsScore = scoreAggregation[0].maxScore || 0;
      }
    }

    // 3. Recent Resumes (Last 5)
    // We use aggregation to join with Analysis to get hasAnalysis & atsScore
    const recentResumes = await Resume.aggregate([
      { $match: { userId: userObjectId } },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'analyses', // Mongoose usually lowercases and pluralizes the model name
          localField: '_id',
          foreignField: 'resumeId',
          as: 'analysisData'
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          originalName: 1,
          fileSize: 1,
          createdAt: 1,
          hasAnalysis: { $gt: [{ $size: '$analysisData' }, 0] },
          atsScore: {
             $cond: {
                if: { $gt: [{ $size: '$analysisData' }, 0] },
                then: { $arrayElemAt: ['$analysisData.atsScore', 0] },
                else: null
             }
          }
        }
      }
    ]);

    // 4. Recent Analyses (Last 5)
    const recentAnalysesAgg = await Analysis.aggregate([
      { $match: { userId: userObjectId } },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'resumes',
          localField: 'resumeId',
          foreignField: '_id',
          as: 'resumeData'
        }
      },
      {
        $project: {
          _id: 0,
          resumeId: 1,
          atsScore: 1,
          experienceLevel: 1,
          createdAt: 1,
          resumeName: { $arrayElemAt: ['$resumeData.originalName', 0] }
        }
      }
    ]);

    // Construct lightweight response
    return res.status(200).json({
      success: true,
      data: {
        totalResumes,
        totalAnalyses,
        totalJobMatches,
        averageAtsScore,
        bestAtsScore,
        recentResumes,
        recentAnalyses: recentAnalysesAgg
      }
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Get Dashboard Stats Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard stats',
    });
  }
};

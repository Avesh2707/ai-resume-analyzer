import { Router } from 'express';

import {
  analyzeResume,
  getAnalysis,
  deleteAnalysis,
} from '@/controllers/analysis.controller';

import { requireAuth } from '@/middleware/auth.middleware';
import { aiRateLimiter } from '@/middleware/ai-rate-limit.middleware';

const router = Router();

// All analysis routes require authentication
router.use(requireAuth);

// AI analysis endpoint is rate limited
router.post('/:id/analyze', aiRateLimiter, analyzeResume);

router.get('/:id/analysis', getAnalysis);

router.delete('/:id/analysis', deleteAnalysis);

export default router;
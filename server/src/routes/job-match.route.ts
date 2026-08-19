import { Router } from 'express';

import {
  analyzeMatch,
  getMatch,
  deleteMatch,
} from '@/controllers/job-match.controller';

import { requireAuth } from '@/middleware/auth.middleware';
import { aiRateLimiter } from '@/middleware/ai-rate-limit.middleware';

const router = Router();

// All job match routes require authentication
router.use(requireAuth);

// AI job matching endpoint is rate limited
router.post('/:id/job-match', aiRateLimiter, analyzeMatch);

router.get('/:id/job-match', getMatch);

router.delete('/:id/job-match', deleteMatch);

export default router;
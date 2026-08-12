import { Router } from 'express';
import { analyzeMatch, getMatch, deleteMatch } from '@/controllers/job-match.controller';
import { requireAuth } from '@/middleware/auth.middleware';

const router = Router();

// All job match routes require authentication
router.use(requireAuth);

router.post('/:id/job-match', analyzeMatch);
router.get('/:id/job-match', getMatch);
router.delete('/:id/job-match', deleteMatch);

export default router;

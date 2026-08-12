import { Router } from 'express';
import { analyzeResume, getAnalysis, deleteAnalysis } from '@/controllers/analysis.controller';
import { requireAuth } from '@/middleware/auth.middleware';

const router = Router();

// All analysis routes require authentication
router.use(requireAuth);

router.post('/:id/analyze', analyzeResume);
router.get('/:id/analysis', getAnalysis);
router.delete('/:id/analysis', deleteAnalysis);

export default router;

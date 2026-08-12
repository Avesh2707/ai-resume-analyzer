import { Router } from 'express';
import { getDashboardStats } from '@/controllers/dashboard.controller';
import { requireAuth } from '@/middleware/auth.middleware';

const router = Router();

// All dashboard routes require authentication
router.use(requireAuth);

router.get('/stats', getDashboardStats);

export default router;

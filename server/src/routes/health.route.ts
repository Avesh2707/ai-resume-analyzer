import { Router, type Request, type Response } from 'express';
import type { HealthResponse } from '@shared/types';

const router = Router();

/**
 * GET /api/health
 * Simple health check endpoint used to verify the server is running.
 */
router.get('/health', (_req: Request, res: Response<HealthResponse>) => {
  res.status(200).json({ status: 'ok' });
});

export default router;

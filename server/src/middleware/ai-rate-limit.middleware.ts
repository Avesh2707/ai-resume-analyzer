import rateLimit from 'express-rate-limit';
import type { Request } from 'express';
import type { AuthRequest } from '@/middleware/auth.middleware';

export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 10,

  keyGenerator: (req: Request) => {
    const authReq = req as AuthRequest;

    return authReq.user?.userId || req.ip || 'unknown';
  },

  standardHeaders: 'draft-7',
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many AI requests. Please try again after a few minutes.',
  },
});
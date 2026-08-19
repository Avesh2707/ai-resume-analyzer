import rateLimit from 'express-rate-limit';

export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Maximum 10 AI requests per IP in 15 minutes

  standardHeaders: 'draft-7',
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many AI requests. Please try again after a few minutes.',
  },
});
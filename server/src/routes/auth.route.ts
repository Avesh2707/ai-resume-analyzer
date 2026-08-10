import { Router } from 'express';
import { register, login, logout, getMe } from '@/controllers/auth.controller';
import { requireAuth } from '@/middleware/auth.middleware';
import { registerSchema, loginSchema } from '@/schemas/auth.schema';
import type { Request, Response, NextFunction } from 'express';

const router = Router();

// Zod validation middleware generator
const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    next(err);
  }
};

// Error handling wrapper for async controllers
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.post('/logout', logout);
router.get('/me', requireAuth, asyncHandler(getMe));

export default router;

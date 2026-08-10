import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies[env.authCookieName];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

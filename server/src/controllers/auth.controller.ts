import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User.model';
import { env } from '@/config/env';
import type { AuthRequest } from '@/middleware/auth.middleware';
import type { RegisterInput, LoginInput } from '@/schemas/auth.schema';

const setAuthCookie = (res: Response, token: string) => {
  res.cookie(env.authCookieName, token, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matches our 7d jwt expiration)
  });
};

export const register = async (req: Request<{}, {}, RegisterInput>, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  const token = jwt.sign({ userId: user._id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as any,
  });

  setAuthCookie(res, token);

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
};

export const login = async (req: Request<{}, {}, LoginInput>, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as any,
  });

  setAuthCookie(res, token);

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie(env.authCookieName);
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const user = await User.findById(req.user.userId).select('-passwordHash');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
};

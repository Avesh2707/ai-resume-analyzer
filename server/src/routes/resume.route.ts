import { Router } from 'express';
import multer from 'multer';
import { requireAuth } from '@/middleware/auth.middleware';
import { uploadResume, getResumes, getResumeById, deleteResume } from '@/controllers/resume.controller';
import type { Request, Response, NextFunction } from 'express';

const router = Router();

// Configure multer for memory storage and 5MB limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

// Wrapper to handle async errors in controllers
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Wrapper to handle multer errors gracefully
const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const uploadSingle = upload.single('file');
  uploadSingle(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File is too large. Max size is 5MB.' });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

// All resume routes are protected
router.use(requireAuth);

router.post('/upload', uploadMiddleware, asyncHandler(uploadResume));
router.get('/', asyncHandler(getResumes));
router.get('/:id', asyncHandler(getResumeById));
router.delete('/:id', asyncHandler(deleteResume));

export default router;

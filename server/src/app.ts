import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from '@/config/env';
import healthRoute from '@/routes/health.route';
import authRoute from '@/routes/auth.route';
import { errorHandler } from '@/middleware/error.middleware';

const app: Application = express();

app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', healthRoute);
app.use('/api/auth', authRoute);

app.use(errorHandler);

export default app;

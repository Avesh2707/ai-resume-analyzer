import express, { type Application } from 'express';
import cors from 'cors';
import { env } from '@/config/env';
import healthRoute from '@/routes/health.route';

const app: Application = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());

app.use('/api', healthRoute);

export default app;

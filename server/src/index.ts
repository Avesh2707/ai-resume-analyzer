import app from '@/app';
import { env } from '@/config/env';
import { connectDB } from '@/config/db';

connectDB().then(() => {
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`✅ Server running in ${env.nodeEnv} mode on http://localhost:${env.port}`);
  });
});

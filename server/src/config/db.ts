import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async () => {
  try {
    if (!env.mongoUri) {
      throw new Error('MONGO_URI environment variable is not defined.');
    }
    const conn = await mongoose.connect(env.mongoUri);
    // eslint-disable-next-line no-console
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

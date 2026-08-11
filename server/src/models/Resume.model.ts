import { Schema, model, Document, Types } from 'mongoose';

export interface IResume extends Document {
  userId: Types.ObjectId;
  originalName: string;
  fileSize: number;
  mimeType: string;
  extractedText: string;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index to quickly fetch a user's resumes sorted by creation date
resumeSchema.index({ userId: 1, createdAt: -1 });

export const Resume = model<IResume>('Resume', resumeSchema);

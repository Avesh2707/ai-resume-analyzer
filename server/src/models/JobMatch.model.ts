import { Schema, model, Document, Types } from 'mongoose';

export interface IJobMatch extends Document {
  userId: Types.ObjectId;
  resumeId: Types.ObjectId;
  jobDescription: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  strengthsForRole: string[];
  gapsForRole: string[];
  recommendations: string[];
  experienceMatch: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobMatchSchema = new Schema<IJobMatch>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
      maxlength: 10000,
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    matchedSkills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    matchedKeywords: {
      type: [String],
      default: [],
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    strengthsForRole: {
      type: [String],
      default: [],
    },
    gapsForRole: {
      type: [String],
      default: [],
    },
    recommendations: {
      type: [String],
      default: [],
    },
    experienceMatch: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

jobMatchSchema.index({ userId: 1, resumeId: 1 }, { unique: true });

export const JobMatch = model<IJobMatch>('JobMatch', jobMatchSchema);

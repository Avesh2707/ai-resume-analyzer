import { Schema, model, Document, Types } from 'mongoose';

export interface IJobMatch {
  score: number;
  explanation: string;
}

export interface IAnalysis extends Document {
  userId: Types.ObjectId;
  resumeId: Types.ObjectId;
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skills: string[];
  missingSkills: string[];
  keywords: string[];
  missingKeywords: string[];
  experienceLevel: string;
  formattingIssues: string[];
  suggestions: string[];
  jobMatch?: IJobMatch;
  createdAt: Date;
  updatedAt: Date;
}

const analysisSchema = new Schema<IAnalysis>(
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
      unique: true, // One analysis per resume
    },
    atsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    summary: {
      type: String,
      required: true,
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    keywords: {
      type: [String],
      default: [],
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    formattingIssues: {
      type: [String],
      default: [],
    },
    suggestions: {
      type: [String],
      default: [],
    },
    jobMatch: {
      score: { type: Number, min: 0, max: 100 },
      explanation: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

analysisSchema.index({ userId: 1, resumeId: 1 });

export const Analysis = model<IAnalysis>('Analysis', analysisSchema);

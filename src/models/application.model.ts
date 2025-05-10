import mongoose, { Document } from 'mongoose';

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  resumeUrl: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const applicationSchema = new mongoose.Schema<IApplication>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  resumeUrl: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IApplication>('Application', applicationSchema);

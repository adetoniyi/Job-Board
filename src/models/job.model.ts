import mongoose, { Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  companyName: string;
  description: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract';
  salaryRange?: string;
  deadline: Date;
  createdBy: mongoose.Types.ObjectId;
}

const jobSchema = new mongoose.Schema<IJob>({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
  salaryRange: { type: String },
  deadline: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<IJob>('Job', jobSchema);

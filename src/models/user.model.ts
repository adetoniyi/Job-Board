import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  resumeUrl?: string;
  profilePicUrl?: string;
  experience?: string;
  skills?: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  resumeUrl: { type: String },
  profilePicUrl: { type: String },
  experience: { type: String },
  skills: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
import mongoose, { Schema, Document } from 'mongoose';

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
  professionalSummary?: string;
  education?: string[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    resumeUrl: { type: String },
    profilePicUrl: { type: String },
    experience: { type: String },
    skills: [{ type: String }],
    professionalSummary: { type: String },
    education: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
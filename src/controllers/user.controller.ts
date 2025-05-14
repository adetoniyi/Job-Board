import { Request, Response } from 'express';
import User from '../models/user.model';

export const getProfile = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, phone, experience, skills } = req.body;
  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.experience = experience || user.experience;
  user.skills = skills ? skills.split(',') : user.skills;

  if (req.files) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.resume) user.resumeUrl = files.resume[0].path;
    if (files.profilePic) user.profilePicUrl = files.profilePic[0].path;
  }

  const updatedUser = await user.save();
  res.json(updatedUser);
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, phone } = req.body;
    if (name) user.name = name;
    if (phone) user.phone = phone;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files?.profilePicture) user.profilePicUrl = files.profilePicture[0].path;
    if (files?.resume) user.resumeUrl = files.resume[0].path;

    await user.save();
    res.status(200).json({ message: 'Profile updated', user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
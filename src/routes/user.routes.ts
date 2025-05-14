import express from 'express';
import { getProfile } from '../controllers/user.controller';
import User from '../models/user.model';
import { upload } from '../utils/upload';
import { updateProfile as updateUserProfile } from '../controllers/user.controller';

const router = express.Router();

import { RequestHandler, Request, Response, NextFunction } from 'express';

export const localProtect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  // Additional logic
  next();
};

export const getUserProfile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

  async (req: Request, res: Response): Promise<void> => {
  // Your existing logic
  res.status(200).json({ message: 'Profile updated successfully' });
}

router.get('/me', getUserProfile);
// Upload profilePicture and resume
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  // Your existing logic
  res.status(200).json({ message: 'Profile updated successfully' });
};

router.put('/me', upload.fields([{ name: 'resume' }, { name: 'profilePic' }]), updateProfile);

router.put(
  '/profile',
  localProtect,
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]),
  updateProfile
);


// Route to get user profile

export default router;

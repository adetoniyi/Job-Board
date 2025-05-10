import express from 'express';
import { getProfile, updateProfile as updateUserProfile } from '../controllers/user.controller';
import User from '../models/user.model';
import { protect } from '../middlewares/auth.middleware';
import { upload } from '../utils/upload';

const router = express.Router();

import { RequestHandler } from 'express';

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

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    // Your existing logic
    res.status(200).json({ message: 'Profile updated successfully' });
    return; // Ensure no Response object is returned
  } catch (error) {
    next(error);
  }
};

router.get('/me', getUserProfile);
router.put('/me', upload.fields([{ name: 'resume' }, { name: 'profilePic' }]), updateUserProfile);

export default router;

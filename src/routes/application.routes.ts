import express, { Request, Response, NextFunction } from 'express';
import {
  applyForJob,
} from '../controllers/application.controller';
import Application from '../models/application.model'; // Import the Application model
import { protect } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';
import { upload } from '../utils/upload';

const router = express.Router();

export const handleJobApplication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Your existing logic
    res.status(200).json({ message: 'Application submitted successfully' });
    return;
  } catch (error) {
    next(error);
  }
};

export const getApplicationsForJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

router.post('/:jobId', upload.single('resume'), handleJobApplication);
router.get('/job/:jobId', getApplicationsForJob);

export default router;

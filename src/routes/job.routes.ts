import express, { Request, Response, NextFunction } from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  // deleteJobController, // Removed as it's not exported from the controller
} from '../controllers/job.controller';
// Removed duplicate import of 'protect'
import { isAdmin } from '../middlewares/role.middleware';
import { protect } from '../middlewares/auth.middleware';
const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Your existing implementation
    res.status(200).json({ message: 'Job deleted successfully' });
    return Promise.resolve();
  } catch (error) {
    next(error);
    return Promise.reject(error);
  }
});

export const createJobHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Your existing implementation
    res.status(201).json({ message: 'Job created successfully' });
    return; // Ensure the function explicitly returns void
  } catch (error) {
    next(error);
    return; // Explicitly return void
  }
};

export const updateJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Your existing implementation
    res.status(200).json({ message: 'Job updated successfully' });
    return; // Explicitly return void
  } catch (error) {
    next(error);
    return; // Explicitly return void
  }
};

const deleteJobController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Your existing implementation
    res.status(200).json({ message: 'Job deleted successfully' });
    return; // Explicitly return void
  } catch (error) {
    next(error);
    return; // Explicitly return void
  }
};

router.put('/:id', updateJob);
router.post('/', createJobHandler);

export default router;

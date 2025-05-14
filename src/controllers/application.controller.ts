import { Request, Response } from 'express';
import '../types/express'; // Import the extended type definition for Request
import * as applicationService from '../services/application.service';

import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const applyForJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const jobId = req.params.jobId;
    const resumeUrl = req.file?.path;

    if (!userId || !resumeUrl) {
      return res.status(400).json({ message: 'User ID or resume not provided' });
    }

    const application = await applicationService.applyForJob(userId, jobId, resumeUrl);
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
};

export const getApplicationsForJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;
    const applications = await applicationService.getApplicationsForJob(jobId);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
};

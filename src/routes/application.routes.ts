import express, { Request, Response, NextFunction } from 'express';
import Application from '../models/application.model'; // Import the Application model
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

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job Applications
 */

/**
 * @swagger
 * /api/applications/{jobId}:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: jobId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the job to apply for
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "I am interested in this job."
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: You already applied or bad data
 */

/**
 * @swagger
 * /api/applications/job/{jobId}:
 *   get:
 *     summary: Get all applicants for a job (Admin only)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: jobId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the job
 *     responses:
 *       200:
 *         description: List of applicants
 *       403:
 *         description: Forbidden – not the job owner
 */

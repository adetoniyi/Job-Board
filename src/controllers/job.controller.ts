import { Request, Response } from 'express';
import * as jobService from '../services/job.service';

export const createJob = async (req: Request, res: Response) => {
  try {
    const jobData = req.body;
    const job = await jobService.createJob(jobData);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await jobService.getJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const updatedJob = await jobService.updateJob(req.params.id, req.body);
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const deletedJob = await jobService.deleteJob(req.params.id);
    res.status(200).json(deletedJob);
  } catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
};

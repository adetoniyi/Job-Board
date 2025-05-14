import Job from '../models/job.model';

export const createJob = async (jobData: any) => {
  const job = await Job.create(jobData);
  return job;
};

export const getJobs = async (filter: any = {}) => {
  const jobs = await Job.find(filter);
  return jobs;
};

export const getJobById = async (id: string) => {
  const job = await Job.findById(id);
  if (!job) throw new Error('Job not found');
  return job;
};

export const updateJob = async (id: string, jobData: any) => {
  const job = await Job.findByIdAndUpdate(id, jobData, { new: true });
  if (!job) throw new Error('Job not found');
  return job;
};

export const deleteJob = async (id: string) => {
  const job = await Job.findByIdAndDelete(id);
  if (!job) throw new Error('Job not found');
  return job;
};

import Job from '../models/job.model';

const createJob = async (jobData: any) => {
  const job = new Job(jobData);
  await job.save();
  return job;
};

const getAllJobs = async () => {
  const jobs = await Job.find();
  return jobs;
};

export default { createJob, getAllJobs };

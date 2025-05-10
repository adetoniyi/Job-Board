import Application from '../models/application.model';
import Job from '../models/job.model';

const apply = async (userId: string, jobId: string, resumeUrl: string) => {
  const job = await Job.findById(jobId);
  if (!job) throw new Error('Job not found');
  const application = new Application({ userId, jobId, resumeUrl });
  await application.save();
  return application;
};

const getApplicationsForJob = async (jobId: string) => {
  const applications = await Application.find({ jobId }).populate('userId');
  return applications;
};

export default { apply, getApplicationsForJob };

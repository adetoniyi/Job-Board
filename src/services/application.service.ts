import Application from '../models/application.model';

export const applyForJob = async (userId: string, jobId: string, resumeUrl: string) => {
  const application = await Application.create({
    user: userId,
    job: jobId,
    resumeUrl,
  });
  return application;
};

export const getApplicationsForJob = async (jobId: string) => {
  const applications = await Application.find({ job: jobId }).populate('user', 'name email phone');
  return applications;
};

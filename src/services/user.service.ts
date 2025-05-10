import User, { IUser } from '../models/user.model';

export const getUserProfile = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select('-password');
};

export const updateUserProfile = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

import User from '../models/user.model';

export const createUser = async (userData: any) => {
  const user = await User.create(userData);
  return user;
};

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return user;
};

export const updateUser = async (userId: string, userData: any) => {
  const user = await User.findByIdAndUpdate(userId, userData, { new: true });
  if (!user) throw new Error('User not found');
  return user;
};

export const getUsers = async () => {
  const users = await User.find();
  return users;
};

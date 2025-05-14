import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { generateToken } from '../utils/generateToken';

export const register = async (data: any) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken((user._id as string).toString(), user.role);
  return { token, user };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = generateToken((user._id as string).toString(), user.role);
  return { token, user };
}; 



/*
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const signup = async (userData: any) => {
  const { email, password } = userData;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists');

  // Hash password before saving to DB
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // Generate JWT token
  const token = generateToken(user.id);

  return { token, user };
};

export const protect = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { id: string };
  } catch (error) {
    throw new Error('Not authorized');
  }
};
*/
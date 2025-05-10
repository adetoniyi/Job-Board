import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user.model';
import { generateToken } from '../utils/generateToken';

export interface ILocalUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  _id: string; // Explicitly define the type of _id
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    name, email, password: hashedPassword, phone, role,
  }) as IUser & { _id: string }; // Explicitly define _id as a string

  const user: ILocalUser = {
    name: createdUser.name,
    email: createdUser.email,
    password: createdUser.password,
    phone: createdUser.phone,
    role: createdUser.role,
    _id: createdUser._id.toString(),
  };

  res.status(201).json({
    _id: user._id,
    name: user.name,
    token: generateToken((user._id as string).toString(), user.role),
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }) as ILocalUser | null;
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  res.json({
    _id: user._id,
    name: user.name,
    token: generateToken((user._id as string).toString(), user.role),
  });
};

/*
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
*/
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email already used' });

  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await User.create({ name, email, password: hashedPassword, phone, role });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  res.status(201).json({ token });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
  res.status(200).json({ token });
}

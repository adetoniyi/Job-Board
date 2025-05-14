"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, role } = req.body;
    const userExists = yield user_model_1.default.findOne({ email });
    if (userExists)
        return res.status(400).json({ message: 'Email already used' });
    const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
    const user = yield user_model_1.default.create({ name, email, password: hashedPassword, phone, role });
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    res.status(201).json({ token });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    res.status(200).json({ token });
});
exports.loginUser = loginUser;

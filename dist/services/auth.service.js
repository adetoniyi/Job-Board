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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generateToken_1 = require("../utils/generateToken");
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = data;
    const existingUser = yield user_model_1.default.findOne({ email });
    if (existingUser)
        throw new Error('User already exists');
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield user_model_1.default.create({
        name,
        email,
        password: hashedPassword,
        role,
    });
    const token = (0, generateToken_1.generateToken)(user._id.toString(), user.role);
    return { token, user };
});
exports.register = register;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        throw new Error('Invalid email or password');
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid email or password');
    const token = (0, generateToken_1.generateToken)(user._id.toString(), user.role);
    return { token, user };
});
exports.login = login;
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

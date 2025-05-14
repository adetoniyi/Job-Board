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
exports.updateUserProfile = exports.updateProfile = exports.getProfile = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select('-password');
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    res.json(user);
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    const { name, phone, experience, skills } = req.body;
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.experience = experience || user.experience;
    user.skills = skills ? skills.split(',') : user.skills;
    if (req.files) {
        const files = req.files;
        if (files.resume)
            user.resumeUrl = files.resume[0].path;
        if (files.profilePic)
            user.profilePicUrl = files.profilePic[0].path;
    }
    const updatedUser = yield user.save();
    res.json(updatedUser);
});
exports.updateProfile = updateProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: 'Unauthorized' });
        const user = yield user_model_1.default.findById(req.user.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const { name, phone } = req.body;
        if (name)
            user.name = name;
        if (phone)
            user.phone = phone;
        const files = req.files;
        if (files === null || files === void 0 ? void 0 : files.profilePicture)
            user.profilePicUrl = files.profilePicture[0].path;
        if (files === null || files === void 0 ? void 0 : files.resume)
            user.resumeUrl = files.resume[0].path;
        yield user.save();
        res.status(200).json({ message: 'Profile updated', user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUserProfile = updateUserProfile;

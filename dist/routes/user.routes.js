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
exports.updateProfile = exports.getUserProfile = exports.localProtect = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const upload_1 = require("../utils/upload");
const router = express_1.default.Router();
const localProtect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    // Additional logic
    next();
});
exports.localProtect = localProtect;
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = yield user_model_1.default.findById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserProfile = getUserProfile;
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Your existing logic
    res.status(200).json({ message: 'Profile updated successfully' });
});
router.get('/me', exports.getUserProfile);
// Upload profilePicture and resume
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Your existing logic
    res.status(200).json({ message: 'Profile updated successfully' });
});
exports.updateProfile = updateProfile;
router.put('/me', upload_1.upload.fields([{ name: 'resume' }, { name: 'profilePic' }]), exports.updateProfile);
router.put('/profile', exports.localProtect, upload_1.upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
]), exports.updateProfile);
// Route to get user profile
exports.default = router;

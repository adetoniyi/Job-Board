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
exports.getApplicationsForJob = exports.applyForJob = void 0;
const application_model_1 = __importDefault(require("../models/application.model"));
const applyForJob = (userId, jobId, resumeUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const application = yield application_model_1.default.create({
        user: userId,
        job: jobId,
        resumeUrl,
    });
    return application;
});
exports.applyForJob = applyForJob;
const getApplicationsForJob = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
    const applications = yield application_model_1.default.find({ job: jobId }).populate('user', 'name email phone');
    return applications;
});
exports.getApplicationsForJob = getApplicationsForJob;

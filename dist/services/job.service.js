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
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const job_model_1 = __importDefault(require("../models/job.model"));
const createJob = (jobData) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield job_model_1.default.create(jobData);
    return job;
});
exports.createJob = createJob;
const getJobs = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}) {
    const jobs = yield job_model_1.default.find(filter);
    return jobs;
});
exports.getJobs = getJobs;
const getJobById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield job_model_1.default.findById(id);
    if (!job)
        throw new Error('Job not found');
    return job;
});
exports.getJobById = getJobById;
const updateJob = (id, jobData) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield job_model_1.default.findByIdAndUpdate(id, jobData, { new: true });
    if (!job)
        throw new Error('Job not found');
    return job;
});
exports.updateJob = updateJob;
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield job_model_1.default.findByIdAndDelete(id);
    if (!job)
        throw new Error('Job not found');
    return job;
});
exports.deleteJob = deleteJob;

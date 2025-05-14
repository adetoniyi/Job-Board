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
exports.getApplicationsForJob = exports.handleJobApplication = void 0;
const express_1 = __importDefault(require("express"));
const application_model_1 = __importDefault(require("../models/application.model")); // Import the Application model
const upload_1 = require("../utils/upload");
const router = express_1.default.Router();
const handleJobApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing logic
        res.status(200).json({ message: 'Application submitted successfully' });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.handleJobApplication = handleJobApplication;
const getApplicationsForJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield application_model_1.default.find({ jobId: req.params.jobId });
        res.status(200).json(applications);
    }
    catch (error) {
        next(error);
    }
});
exports.getApplicationsForJob = getApplicationsForJob;
router.post('/:jobId', upload_1.upload.single('resume'), exports.handleJobApplication);
router.get('/job/:jobId', exports.getApplicationsForJob);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job Applications
 */
/**
 * @swagger
 * /api/applications/{jobId}:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: jobId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the job to apply for
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "I am interested in this job."
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: You already applied or bad data
 */
/**
 * @swagger
 * /api/applications/job/{jobId}:
 *   get:
 *     summary: Get all applicants for a job (Admin only)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: jobId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the job
 *     responses:
 *       200:
 *         description: List of applicants
 *       403:
 *         description: Forbidden – not the job owner
 */

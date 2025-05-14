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
exports.updateJob = exports.createJobHandler = void 0;
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controllers/job.controller");
// Removed duplicate import of 'protect'
const router = express_1.default.Router();
router.get('/', job_controller_1.getJobs);
router.get('/:id', job_controller_1.getJobById);
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing implementation
        res.status(200).json({ message: 'Job deleted successfully' });
        return Promise.resolve();
    }
    catch (error) {
        next(error);
        return Promise.reject(error);
    }
}));
const createJobHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing implementation
        res.status(201).json({ message: 'Job created successfully' });
        return; // Ensure the function explicitly returns void
    }
    catch (error) {
        next(error);
        return; // Explicitly return void
    }
});
exports.createJobHandler = createJobHandler;
const updateJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing implementation
        res.status(200).json({ message: 'Job updated successfully' });
        return; // Explicitly return void
    }
    catch (error) {
        next(error);
        return; // Explicitly return void
    }
});
exports.updateJob = updateJob;
const deleteJobController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing implementation
        res.status(200).json({ message: 'Job deleted successfully' });
        return; // Explicitly return void
    }
    catch (error) {
        next(error);
        return; // Explicitly return void
    }
});
router.put('/:id', exports.updateJob);
router.post('/', exports.createJobHandler);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job Listings
 */
/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - companyName
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               companyName:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               jobType:
 *                 type: string
 *               salary:
 *                 type: string
 *               applicationDeadline:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all job listings
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 */

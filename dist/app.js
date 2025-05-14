"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./config/db"));
// Connect to MongoDB
(0, db_1.default)();
// Initialize dotenv to load environment variables
// Ensure that the MONGODB_URL is defined in the environment variables
if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined in environment variables');
}
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});
// Initialize dotenv to load environment variables
// Ensure that the JWT_SECRET is defined in the environment variables
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}
// Initialize dotenv to load environment variables
// Ensure that the JWT_SECRET is defined in the environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/jobs', job_routes_1.default);
app.use('/api/applications', application_routes_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;

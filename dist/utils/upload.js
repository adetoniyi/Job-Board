"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.default.v2.config({
    cloud_name: 'your-cloud-name',
    api_key: 'your-api-key',
    api_secret: 'your-api-secret',
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default.v2, // Use v2 here
    params: {
        public_id: (req, file) => `job-board-api/${file.originalname}`,
        // Removed the 'format' property as it is not valid in 'Params'
        // resource_type is not a valid property of Params and has been removed
    },
});
// Define the upload variable using multer with the configured storage
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;

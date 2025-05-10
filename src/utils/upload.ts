import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.v2.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2, // Use v2 here
  params: {
    public_id: (req, file) => `job-board-api/${file.originalname}`,
    // Removed the 'format' property as it is not valid in 'Params'
    // resource_type is not a valid property of Params and has been removed
  },
});


// Define the upload variable using multer with the configured storage
import multer from 'multer';
const upload = multer({ storage });

export { upload };

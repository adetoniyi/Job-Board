import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'job-board',
      public_id: `${Date.now()}-${file.originalname}`,
      allowed_formats: ['jpg', 'png', 'pdf', 'docx'],
    };
  },
});

const upload = multer({ storage });
export default upload;
// This middleware will handle file uploads and store them in Cloudinary
// using the specified folder and public ID format.
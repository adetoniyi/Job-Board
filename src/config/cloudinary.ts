import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
if (!process.env.CLOUDINARY_URL) {
  throw new Error('CLOUDINARY_URL is not defined in environment variables');
}
// Check if the required environment variables are defined

export default cloudinary;

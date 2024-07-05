import { CLOUDINARY } from '../constants/cloudinaryConstants.js';
import { env } from '../env.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const photoUploadDestination = async (photo) => {
  if (!photo) return;

  if (env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
    return await saveFileToCloudinary(photo);
  } else {
    return await saveFileToUploadDir(photo);
  }
};

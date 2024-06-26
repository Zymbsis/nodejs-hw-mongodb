import { CLOUDINARY } from '../constants/cloudinaryConstants.js';
import { env } from '../env.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const photoUploadDestination = async (photo) => {
  let photoUrl;
  if (photo) {
    if (env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  return photoUrl;
};

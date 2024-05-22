import mongoose from 'mongoose';
import { db, pwd, url, user } from '../constants/envConstants.js';

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};

import { env } from '../env.js';

export const PORT = Number(env('PORT', '3000'));

const DBCREDENTIALS = {
  user: env('MONGODB_USER'),
  pwd: env('MONGODB_PASSWORD'),
  url: env('MONGODB_URL'),
  db: env('MONGODB_DB'),
};
export const { user, pwd, url, db } = DBCREDENTIALS;

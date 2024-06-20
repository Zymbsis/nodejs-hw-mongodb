import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/sessionConstants.js';
import { SessionModel } from '../db/sessionModel.js';
import { randomBytes } from 'crypto';

export const createSession = ({ id }) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionModel.create({
    userId: id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  });
};

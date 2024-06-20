import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UserModel } from '../db/userModel.js';
import { SessionModel } from '../db/sessionModel.js';
import { createSession } from '../utils/createSession.js';

export const registerUser = async (credentials) => {
  const user = await UserModel.findOne({
    email: credentials.email,
  });
  if (user) throw createHttpError(409, 'Email in use');
  const encryptedPassword = await bcrypt.hash(credentials.password, 10);
  return await UserModel.create({
    ...credentials,
    password: encryptedPassword,
  });
};

export const loginUser = async (credentials) => {
  const user = await UserModel.findOne({
    email: credentials.email,
  });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  const isEqual = await bcrypt.compare(credentials.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Wrong password');
  }

  await SessionModel.deleteOne({ userId: user._id });
  return await createSession({ id: user._id });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionModel.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  await SessionModel.deleteOne({ _id: sessionId, refreshToken });

  return await createSession({ id: session.userId });
};

export const logoutUser = async (sessionId) => {
  await SessionModel.deleteOne({ _id: sessionId });
};

import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UserModel } from '../db/userModel.js';
import { SessionModel } from '../db/sessionModel.js';
import { createSession } from '../utils/createSession.js';
import jwt from 'jsonwebtoken';
import { env } from '../env.js';
import { sendEmail } from '../utils/sendMail.js';
import { SMTP } from '../constants/smtpConstants.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constants/index.js';

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

export const requestResetToken = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetEmailToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'resetPasswordEmail.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetEmailToken}`,
  });

  try {
    await sendEmail({
      from: env(SMTP.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    if (error instanceof Error)
      throw createHttpError(
        500,
        'Failed to send the email, please try again later.',
      );
    throw error;
  }
};

export const resetPassword = async (payload) => {
  const { token, password } = payload;
  let entries;
  try {
    entries = jwt.verify(token, env('JWT_SECRET'));
    console.log(entries);
  } catch (error) {
    if (error instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw error;
  }
  const user = await UserModel.findOne({
    email: entries.email,
    _id: entries.sub,
  });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  await UserModel.updateOne({ _id: user._id }, { password: encryptedPassword });
  await SessionModel.deleteOne({ userId: entries.sub });
};

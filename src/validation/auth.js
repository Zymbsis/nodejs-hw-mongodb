import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'name should be a string',
    'string.min': 'name should have at least 3 characters',
    'string.max': 'name should have at most 20 characters',
    'any.required': 'name is required',
  }),
  email: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      'string.base': 'email should be a string',
      'string.min': 'email should have at least 3 characters',
      'string.max': 'email should have at most 50 characters',
      'string.pattern.base': 'Invalid email format',
      'any.required': 'email is required',
    }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.base': 'password should be a string',
    'string.min': 'password should have at least 6 characters',
    'string.max': 'password should have at most 20 characters',
    'any.required': 'password is required',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      'string.base': 'email should be a string',
      'string.min': 'email should have at least 3 characters',
      'string.max': 'email should have at most 50 characters',
      'string.pattern.base': 'Invalid email format',
      'any.required': 'email is required',
    }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.base': 'password should be a string',
    'string.min': 'password should have at least 6 characters',
    'string.max': 'password should have at most 20 characters',
    'any.required': 'password is required',
  }),
});

export const requestResetPasswordSchema = Joi.object({
  email: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      'string.base': 'email should be a string',
      'string.min': 'email should have at least 3 characters',
      'string.max': 'email should have at most 50 characters',
      'string.pattern.base': 'Invalid email format',
      'any.required': 'email is required',
    }),
});
export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).max(20).required().messages({
    'string.base': 'password should be a string',
    'string.min': 'password should have at least 6 characters',
    'string.max': 'password should have at most 20 characters',
    'any.required': 'password is required',
  }),
  token: Joi.string().required(),
});

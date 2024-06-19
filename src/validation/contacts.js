import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'name should be a string',
    'string.min': 'name should have at least 3 characters',
    'string.max': 'name should have at most 20 characters',
    'any.required': 'name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'phoneNumber should be a string',
    'string.min': 'phoneNumber should have at least 3 characters',
    'string.max': 'phoneNumber should have at most 20 characters',
    'any.required': 'phoneNumber is required',
  }),
  email: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.base': 'email should be a string',
      'string.min': 'email should have at least 3 characters',
      'string.max': 'email should have at most 50 characters',
      'string.pattern.base': 'Invalid email format',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Favourite status should be a "true" or a "false"',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'contactType should be a string',
    'any.only': 'contactType should be one of [work, home, personal]',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'name should be a string',
    'string.min': 'name should have at least 3 characters',
    'string.max': 'name should have at most 20 characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'phoneNumber should be a string',
    'string.min': 'phoneNumber should have at least 3 characters',
    'string.max': 'phoneNumber should have at most 20 characters',
  }),
  email: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.base': 'email should be a string',
      'string.min': 'email should have at least 3 characters',
      'string.max': 'email should have at most 50 characters',
      'string.pattern.base': 'Invalid email format',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite status should be a "true" or a "false"',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'contactType should be a string',
    'any.only': 'contactType should be one of [work, home, personal]',
  }),
});

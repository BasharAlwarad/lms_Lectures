import Joi from 'joi';
import { CustomError } from '../utils/errorHandler.js';

// Function to validate request body with Joi schema
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(
        new CustomError(`Validation Error: ${error.details[0].message}`, 400)
      );
    }
    next(); // Proceed to the next middleware or route handler
  };
};

// Joi schema for signup validation
export const signUpSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  age: Joi.number().integer().min(1).max(120).required(),
  user_email: Joi.string().email().required(),
  user_password: Joi.string().min(6).max(100).required(),
});

// Joi schema for login validation
export const loginSchema = Joi.object({
  user_email: Joi.string().email().required(),
  user_password: Joi.string().min(6).max(100).required(),
});

// Joi schema for creating an order
export const createOrderSchema = Joi.object({
  user_id: Joi.number().integer().required(), // Assuming user_id is part of order data
  product_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().precision(2).required(),
  status: Joi.string().valid('pending', 'completed', 'shipped').required(),
});

// Joi schema for updating an order
export const updateOrderSchema = Joi.object({
  product_id: Joi.number().integer().optional(),
  quantity: Joi.number().integer().min(1).optional(),
  price: Joi.number().precision(2).optional(),
  status: Joi.string().valid('pending', 'completed', 'shipped').optional(),
});

// Export the validation middleware
export const validateSignUp = validate(signUpSchema);
export const validateLogin = validate(loginSchema);
export const validateCreateOrder = validate(createOrderSchema);
export const validateUpdateOrder = validate(updateOrderSchema);

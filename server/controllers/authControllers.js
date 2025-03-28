import User from '../models/user.js';
import { CustomError } from '../utils/errorHandler.js';

// Create new user
export const signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body); // Create a new user
    res.status(201).json(user); // Respond with the created user and status 201 (Created)
  } catch (err) {
    next(new CustomError('Failed to create user', 500)); // Pass error to the error handler
  }
};

export const login = async (req, res, next) => {
  try {
    const { user_email, user_password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { user_email } });
    if (!user) {
      return next(new CustomError('User not found', 404)); // User not found
    }

    // Compare passwords
    if (user_password !== user.user_password) {
      return next(new CustomError('Invalid credentials', 401)); // Invalid credentials
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, email: user.user_email },
    });
  } catch (error) {
    console.error('Login error:', error);
    next(new CustomError('Internal server error', 500)); // Pass error to the error handler
  }
};

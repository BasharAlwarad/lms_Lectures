import User from '../models/user.js';
import { CustomError } from '../utils/errorHandler.js';

// Signup new user
export const signUp = async (req, res, next) => {
  try {
    // Extract user details from request body
    const { first_name, last_name, age, user_email, user_password } = req.body;

    // Save the file path if an image was uploaded
    const user_image = req.file ? req.file.filename : null;

    // Create a new user in the database (without the image path)
    const newUser = await User.create({
      first_name,
      last_name,
      age,
      user_email,
      user_password,
      user_image,
    });

    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (err) {
    next(new CustomError('Failed to create user', 500));
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

import { User } from '../models/index.js';
import { CustomError } from '../utils/errorHandler.js';
import { Op } from 'sequelize';

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database.
    res.status(200).json(users); // Respond with the user data and status 200 (OK).
  } catch (err) {
    next(new CustomError('Failed to fetch users', 500)); // Handle server error.
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id); // Find a user by primary key (ID).
    if (!user) {
      return next(new CustomError('User not found', 404)); // User does not exist.
    }
    res.status(200).json(user); // Respond with the user data and status 200 (OK).
  } catch (err) {
    next(new CustomError('Failed to retrieve user', 500)); // Handle server error.
  }
};

// Create a new user
export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body); // Create a new user using request body data.
    res.status(201).json(user); // Respond with the created user data and status 201 (Created).
  } catch (err) {
    next(new CustomError('Invalid user data', 400)); // Validation error (bad request).
  }
};

// Update user by ID
export const updateUser = async (req, res, next) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    }); // Update user data.
    if (!updated) {
      return next(new CustomError('User not found', 404)); // User does not exist.
    }
    const updatedUser = await User.findByPk(req.params.id); // Fetch the updated user data.
    res.status(200).json(updatedUser); // Respond with the updated user data and status 200 (OK).
  } catch (err) {
    next(new CustomError('Failed to update user', 500)); // Handle server error.
  }
};

// Delete user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id); // Find the user by ID.
    if (!user) {
      return next(new CustomError('User not found', 404)); // User does not exist.
    }
    await user.destroy(); // Delete the user.
    res.status(200).json({ message: 'User deleted successfully' }); // Success response.
  } catch (err) {
    next(new CustomError('Failed to delete user', 500)); // Handle server error.
  }
};

// Search users by first name, last name, or email
export const searchUsers = async (req, res, next) => {
  try {
    const { first_name, last_name, user_email } = req.query; // Extract search parameters

    const whereClause = {};
    if (first_name) whereClause.first_name = { [Op.iLike]: `%${first_name}%` };
    if (last_name) whereClause.last_name = { [Op.iLike]: `%${last_name}%` };
    if (user_email) whereClause.user_email = { [Op.iLike]: `%${user_email}%` };

    const users = await User.findAll({ where: whereClause });

    res.status(200).json(users);
  } catch (err) {
    next(new CustomError('Failed to search users', 500));
  }
};

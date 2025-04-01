import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
} from '../controllers/userControllers.js';

import { validateSignUp } from '../middlewares/validationMiddleware.js'; // Import validation middleware
import { auth } from '../middlewares/authMiddleware.js'; // Import your auth middleware

const router = express.Router();

// User Routes with validation

// Get all users
router.get('/', getUsers);

// Get user by ID
router.get('/user/:id', getUserById);

// Create a new user with validation
router.post('/', validateSignUp, createUser); // Apply validateSignUp schema validation here

// Update user by ID with validation
router.put('/user/:id', validateSignUp, updateUser); // Apply validateSignUp schema validation here

// Delete user by ID
router.delete('/user/:id', deleteUser);

// Search users by name or email
router.get('/search', searchUsers);

export default router;

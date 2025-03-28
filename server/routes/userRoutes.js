import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userControllers.js';

import { auth } from '../middlewares/authMiddleware.js'; // Import your auth middleware

const router = express.Router();

// User Routes
router.get('/', auth, getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

import express from 'express';
import {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
} from './controller.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getUserById).delete(deleteUserById);

export default router;

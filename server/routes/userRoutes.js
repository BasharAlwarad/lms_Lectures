import multer from 'multer';
import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} from '../controllers/userControllers.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.get('/', getAllUsers);
router.post('/', upload.single('image'), createUser);
router.post('/login', login);

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

import express from 'express';
import { signUp, login } from '../controllers/authControllers.js'; // Import your auth controllers
import {
  validateSignUp,
  validateLogin,
} from '../middlewares/validationMiddleware.js';
import { uploadFile } from '../middlewares/multerMiddleware.js'; // Import your multer middleware

const router = express.Router();

// Apply validation middleware to the signup route
router.post('/signup', uploadFile, validateSignUp, signUp);

// Apply validation middleware to the login route
router.post('/login', validateLogin, login);

export default router;

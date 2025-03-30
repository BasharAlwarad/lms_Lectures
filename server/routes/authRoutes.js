import express from 'express';
import { login, signUp } from '../controllers/authControllers.js'; // Import your auth controllers

import { auth } from '../middlewares/authMiddleware.js'; // Import your auth middleware

import { uploadFile } from '../middlewares/multerMiddleware.js';

const router = express.Router();

// User Routes
router.post('/login', auth, login); // Login route
router.post('/signup', uploadFile, signUp); // signup route

export default router;

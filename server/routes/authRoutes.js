import express from 'express';
import { login, signUp } from '../controllers/authControllers.js'; // Import your auth controllers

const router = express.Router();

// User Routes
router.post('/login', login); // Login route
router.post('/signup', signUp); // signup route

export default router;

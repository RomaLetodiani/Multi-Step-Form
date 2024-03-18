import express from 'express';
import AuthController from '../controllers/AuthController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();
const authController = new AuthController();
// Register a user (No Authentication required)
router.post('/register', authController.registerUser);

// Login a user (No Authentication required)
router.post('/login', authController.loginUser);

// Logout a user (Authentication required)
router.post('/logout', authenticateUser, authController.logoutUser);

export default router;

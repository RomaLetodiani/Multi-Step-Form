import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();
const authController = new AuthController();
// Get user details (Authentication required)
router.post('/register', authController.registerUser);

// Update a user (Authentication required)
router.post('/login', authController.loginUser);

// Delete a user (Authentication required)
router.post('/logout', authController.logoutUser);

export default router;

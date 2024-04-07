import express from 'express'
import AuthController from '../controllers/AuthController'
import { authenticateUser } from '../middlewares/authMiddleware'

const router = express.Router()
// Register a user (No Authentication required)
router.post('/register', AuthController.registerUser)

// Login a user (No Authentication required)
router.post('/login', AuthController.loginUser)

// Logout a user (Authentication required)
router.post('/logout', authenticateUser, AuthController.logoutUser)

export default router

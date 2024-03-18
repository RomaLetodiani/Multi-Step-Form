import express from 'express'
import UserController from '../controllers/UserController'
import { emailVerificationRateLimiter } from '../middlewares/emailVerificationRateLimiter'
import { authenticateUser } from '../middlewares/authMiddleware'

const router = express.Router()
const userController = new UserController()

// Get user details (Authentication required)
router.get('/details', authenticateUser, userController.getUserDetails)

// Update a user (Authentication required)
router.put('/update', authenticateUser, userController.updateUser)

// Delete a user (Authentication required)
router.delete('/', authenticateUser, userController.deleteUser)

// Send an verification email (Authentication required)
router.post('/sendEmail', emailVerificationRateLimiter, authenticateUser, userController.sendEmail)

export default router

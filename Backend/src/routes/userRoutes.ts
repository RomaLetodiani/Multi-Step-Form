import express from 'express'
import UserController from '../controllers/UserController'
import { emailVerificationRateLimiter } from '../middlewares/emailVerificationRateLimiter'
import { verificationCheckRateLimiter } from '../middlewares/verificationCheckRateLimiter'
import { authenticateUser } from '../middlewares/authMiddleware'

const router = express.Router()

// Get user details (Authentication required)
router.get('/details', authenticateUser, UserController.getUserDetails)

// Update a user (Authentication required)
router.put('/update', authenticateUser, UserController.updateUser)

// Delete a user (Authentication required)
router.delete('/', authenticateUser, UserController.deleteUser)

// Send an verification email (Authentication required)
router.post('/sendEmail', emailVerificationRateLimiter, authenticateUser, UserController.sendEmail)
router.post(
  '/verifyEmail',
  verificationCheckRateLimiter,
  authenticateUser,
  UserController.verifyEmail,
)

export default router

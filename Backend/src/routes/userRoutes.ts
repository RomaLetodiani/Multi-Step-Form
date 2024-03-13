// routes/userRoutes.ts
import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
  getUserDetails,
} from '../controllers/UserController';
import { authenticateUser } from '../middlewares/authentication';

const router = express.Router();

router.post('/create', createUser);

// Login user
router.post('/login', loginUser);

// Logout user (if needed)
router.post('/logout', authenticateUser, logoutUser);

// Get user details
router.get('/details', authenticateUser, getUserDetails);

export default router;

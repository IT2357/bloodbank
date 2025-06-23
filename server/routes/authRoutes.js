// server/routes/authRoutes.js

import express from 'express';
import {
  registerDonor,
  registerHospital,
  registerAdmin,
  loginUser,
} from '../controllers/authController.js';
import { authMiddleware, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register/donor', registerDonor);
router.post('/register/hospital', registerHospital);
router.post('/register/admin', authMiddleware, restrictTo('admin'), registerAdmin);
router.post('/login', loginUser);

export default router;
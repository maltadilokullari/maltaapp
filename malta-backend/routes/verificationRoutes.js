import express from 'express';
import {
  getVerification,
  getVerificationAdmin,
  createOrUpdateVerification,
  deleteVerification
} from '../controllers/verificationController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - get verification for frontend
router.get('/', getVerification);

// Protected routes (admin only)
router.get('/admin', authenticate, getVerificationAdmin);
router.post('/', authenticate, createOrUpdateVerification);
router.put('/', authenticate, createOrUpdateVerification);
router.delete('/', authenticate, deleteVerification);

export default router;

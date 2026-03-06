import express from 'express';
import {
  createFormSubmission,
  getAllFormSubmissions,
  getFormSubmission,
  deleteFormSubmission,
  getFormStatistics
} from '../controllers/formController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', createFormSubmission);

// Protected routes (admin only)
router.get('/', authenticate, getAllFormSubmissions);
router.get('/statistics', authenticate, getFormStatistics);
router.get('/:id', authenticate, getFormSubmission);
router.delete('/:id', authenticate, deleteFormSubmission);

export default router;

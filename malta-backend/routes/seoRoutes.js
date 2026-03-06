import express from 'express';
import {
  getSEOByPage,
  getAllSEO,
  createOrUpdateSEO,
  deleteSEO
} from '../controllers/seoController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - get SEO for a page
router.get('/page/:page', getSEOByPage);

// Protected routes (admin only)
router.get('/', authenticate, getAllSEO);
router.post('/:page', authenticate, createOrUpdateSEO);
router.put('/:page', authenticate, createOrUpdateSEO);
router.delete('/:page', authenticate, deleteSEO);

export default router;

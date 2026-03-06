import express from 'express';
import {
  detectEmptyPages,
  markEmptyPagesAs404,
  removeEmptyPagesFromSitemap,
} from '../controllers/emptyPageController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (admin only) - READ-ONLY
router.get('/detect', authenticate, detectEmptyPages);
router.post('/mark-404', authenticate, markEmptyPagesAs404);
router.post('/remove-from-sitemap', authenticate, removeEmptyPagesFromSitemap);

export default router;

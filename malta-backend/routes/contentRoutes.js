import express from 'express';
import {
  getAllContent,
  getContentById,
  getContentBySlug,
  createContent,
  updateContent,
  deleteContent,
  publishContent,
  getContentVersions,
  restoreContentVersion,
} from '../controllers/contentController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/slug/:slug', getContentBySlug);

// Protected routes (admin only)
router.get('/', authenticate, getAllContent);
router.get('/:id', authenticate, getContentById);
router.post('/', authenticate, createContent);
router.put('/:id', authenticate, updateContent);
router.delete('/:id', authenticate, deleteContent);
router.post('/:id/publish', authenticate, publishContent);
router.get('/:id/versions', authenticate, getContentVersions);
router.post('/:id/versions/:version/restore', authenticate, restoreContentVersion);

export default router;

import express from 'express';
import {
  getAllMedia,
  uploadMedia,
  updateMedia,
  deleteMedia,
  upload,
} from '../controllers/mediaController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (admin only)
router.get('/', authenticate, getAllMedia);
router.post('/upload', authenticate, upload.single('file'), uploadMedia);
router.put('/:id', authenticate, updateMedia);
router.delete('/:id', authenticate, deleteMedia);

export default router;

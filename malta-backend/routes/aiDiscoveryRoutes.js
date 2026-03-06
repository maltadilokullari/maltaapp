import express from 'express';
import {
  getAIDiscovery,
  getAITopics,
  getAIAnswer,
  clearAICache,
} from '../controllers/aiDiscoveryController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/ai-discovery.json', getAIDiscovery);
router.get('/ai-topics.json', getAITopics);
router.get('/ai-answers/:topic', getAIAnswer);

// Protected route (admin only) - Cache temizleme
router.post('/cache/clear', authenticate, (req, res) => {
  clearAICache();
  res.json({
    success: true,
    message: 'AI Discovery cache temizlendi',
  });
});

export default router;

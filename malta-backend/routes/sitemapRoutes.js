import express from 'express';
import {
  getSitemapIndex,
  getSitemapPages,
  getSitemapPosts,
  getSitemapServices,
  getSitemapStats,
  clearSitemapCache,
} from '../controllers/sitemapController.js';
import {
  getRobots,
  getRobotsSettings,
  updateRobotsSettings,
} from '../controllers/robotsController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes - Sitemap
router.get('/sitemap.xml', getSitemapIndex);
router.get('/sitemap-pages.xml', getSitemapPages);
router.get('/sitemap-posts.xml', getSitemapPosts);
router.get('/sitemap-services.xml', getSitemapServices);

// Public route - Robots.txt
router.get('/robots.txt', getRobots);

// Protected routes (admin only)
router.get('/stats', authenticate, getSitemapStats);
router.get('/robots/settings', authenticate, getRobotsSettings);
router.put('/robots/settings', authenticate, updateRobotsSettings);
router.post('/cache/clear', authenticate, (req, res) => {
  clearSitemapCache();
  res.json({
    success: true,
    message: 'Sitemap cache temizlendi',
  });
});

export default router;

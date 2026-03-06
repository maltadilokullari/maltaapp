import express from 'express';
import {
  performSchemaAudit,
  validateSchemaData,
} from '../controllers/schemaAuditController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (admin only)
router.get('/audit', authenticate, performSchemaAudit);
router.post('/validate', authenticate, validateSchemaData);

export default router;

import express from 'express';
import cors from 'cors';
import config from './config/env.js';
import { connectDB, closeDB } from './db/mongodb.js';
import formRoutes from './routes/formRoutes.js';
import seoRoutes from './routes/seoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import sitemapRoutes from './routes/sitemapRoutes.js';

const app = express();
const PORT = config.port;

// Middleware
app.use(cors({
  origin: [
    config.frontendUrl,
    config.adminPanelUrl,
    'http://localhost:3000', // Eski frontend portu (fallback)
    'http://localhost:3001', // Yeni frontend portu
    'http://localhost:5173'  // Admin panel portu
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
(async () => {
  try {
    await connectDB();
  } catch (err) {
    if (config.isDevelopment()) {
      console.error('\n⚠️  Development modunda çalışıyor - Server durduruluyor...');
      process.exit(1);
    } else {
      console.error('\n⚠️  Production modunda - Server çalışmaya devam ediyor (MongoDB olmadan)');
    }
  }
})();

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/sitemap', sitemapRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server çalışıyor' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Sunucu hatası', 
    error: config.isDevelopment() ? err.message : undefined 
  });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM sinyali alındı, bağlantılar kapatılıyor...');
  await closeDB();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT sinyali alındı, bağlantılar kapatılıyor...');
  await closeDB();
  process.exit(0);
});

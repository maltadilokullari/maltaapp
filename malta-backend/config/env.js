import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory (ES modules için)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env dosyasını proje kök dizininden yükle
dotenv.config({ path: join(__dirname, '../.env') });

export const config = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // MongoDB
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/malta-db',
  
  // CORS
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
  adminPanelUrl: process.env.ADMIN_PANEL_URL || 'http://localhost:5173',
  
  // Admin Credentials
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  
  // Authentication
  staticToken: process.env.STATIC_TOKEN || 'static-token-for-now',
  
  // Helper functions
  isDevelopment: () => config.nodeEnv === 'development',
  isProduction: () => config.nodeEnv === 'production',
};

// Debug: Environment değişkenlerinin yüklendiğini kontrol et
if (config.isDevelopment()) {
  console.log('=== Environment Variables ===');
  console.log('PORT:', config.port);
  console.log('NODE_ENV:', config.nodeEnv);
  console.log('MONGODB_URI:', config.mongodbUri ? `${config.mongodbUri.substring(0, 20)}...` : 'NOT SET');
  console.log('FRONTEND_URL:', config.frontendUrl);
  console.log('ADMIN_PANEL_URL:', config.adminPanelUrl);
  console.log('ADMIN_USERNAME:', config.adminUsername);
  console.log('ADMIN_PASSWORD:', config.adminPassword ? '***' : 'NOT SET');
  console.log('STATIC_TOKEN:', config.staticToken ? '***' : 'NOT SET');
  console.log('============================');
}

export default config;

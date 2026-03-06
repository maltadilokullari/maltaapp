// Environment değişkenlerini test etmek için script
import config from './config/env.js';

console.log('\n=== Environment Variables Test ===\n');
console.log('✅ Config dosyası yüklendi\n');

console.log('Değişkenler:');
console.log('  PORT:', config.port);
console.log('  NODE_ENV:', config.nodeEnv);
console.log('  MONGODB_URI:', config.mongodbUri);
console.log('  FRONTEND_URL:', config.frontendUrl);
console.log('  ADMIN_PANEL_URL:', config.adminPanelUrl);
console.log('  ADMIN_USERNAME:', config.adminUsername);
console.log('  ADMIN_PASSWORD:', config.adminPassword ? '***' : 'NOT SET');
console.log('  STATIC_TOKEN:', config.staticToken ? '***' : 'NOT SET');

console.log('\n=== Test Tamamlandı ===\n');

// MongoDB URI format kontrolü
if (config.mongodbUri) {
  if (config.mongodbUri.startsWith('mongodb+srv://')) {
    console.log('ℹ️  MongoDB Atlas SRV formatı kullanılıyor');
    console.log('   IP whitelist ve kullanıcı bilgilerini kontrol edin');
  } else if (config.mongodbUri.startsWith('mongodb://')) {
    console.log('ℹ️  Standart MongoDB formatı kullanılıyor');
  } else {
    console.log('⚠️  MongoDB URI formatı tanınmadı');
  }
} else {
  console.log('⚠️  MONGODB_URI tanımlı değil!');
}

// MongoDB bağlantısını test etmek için script
import { connectDB, closeDB } from './db/mongodb.js';
import config from './config/env.js';

console.log('\n=== MongoDB Bağlantı Testi ===\n');
console.log('Environment Variables:');
console.log('  MONGODB_URI:', config.mongodbUri ? `${config.mongodbUri.substring(0, 30)}...` : 'NOT SET');
console.log('  NODE_ENV:', config.nodeEnv);
console.log('');

if (!config.mongodbUri) {
  console.error('❌ MONGODB_URI tanımlı değil!');
  console.error('   .env dosyasında MONGODB_URI değişkenini kontrol edin.');
  process.exit(1);
}

// URI formatını kontrol et
console.log('URI Format Kontrolü:');
if (config.mongodbUri.startsWith('mongodb+srv://')) {
  console.log('  ✅ SRV formatı kullanılıyor');
  
  if (!config.mongodbUri.includes('.mongodb.net')) {
    console.error('  ❌ HATA: URI\'de .mongodb.net eksik!');
    console.error('     Örnek: mongodb+srv://user:pass@cluster.mongodb.net/dbname');
    process.exit(1);
  }
  
  const uriMatch = config.mongodbUri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)/);
  if (uriMatch) {
    console.log('  ✅ URI formatı doğru');
    console.log('     Host:', uriMatch[3]);
    console.log('     Database:', uriMatch[4]);
  } else {
    console.error('  ❌ HATA: URI formatı hatalı!');
    console.error('     Beklenen: mongodb+srv://username:password@cluster.mongodb.net/dbname');
    process.exit(1);
  }
} else if (config.mongodbUri.startsWith('mongodb://')) {
  console.log('  ✅ Standart format kullanılıyor');
} else {
  console.error('  ❌ HATA: Geçersiz URI formatı!');
  console.error('     mongodb:// veya mongodb+srv:// ile başlamalı');
  process.exit(1);
}

console.log('\nBağlantı deneniyor...\n');

try {
  await connectDB();
  console.log('\n✅ Bağlantı başarılı!\n');
  await closeDB();
  process.exit(0);
} catch (error) {
  console.error('\n❌ Bağlantı başarısız!\n');
  console.error('Hata:', error.message);
  process.exit(1);
}

import { MongoClient } from 'mongodb';
import dns from 'node:dns/promises';
import config from '../config/env.js';

let client = null;
let db = null;

// DNS sunucularını ayarla (MongoDB Atlas bağlantı sorunları için)
dns.setServers(['1.1.1.1', '8.8.8.8']);

export async function connectDB() {
  try {
    if (client) {
      return db;
    }

    const uri = config.mongodbUri;
    
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    console.log('MongoDB bağlantısı kuruluyor...');
    
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    
    // Database adını URI'den çıkar
    const urlMatch = uri.match(/\/\/(?:[^:]+:[^@]+@)?[^/]+\/([^?]+)/);
    let dbName = urlMatch ? urlMatch[1] : 'malta_db';
    
    // Database adında geçersiz karakterler varsa temizle
    dbName = dbName.replace(/[^a-zA-Z0-9_-]/g, '');
    
    // Eğer database adı boşsa veya geçersizse varsayılan kullan
    if (!dbName || dbName.length === 0) {
      dbName = 'malta_db';
      console.warn('⚠️  Database adı URI\'den çıkarılamadı, varsayılan kullanılıyor:', dbName);
    }
    
    db = client.db(dbName);
    
    // Bağlantıyı test et
    await db.admin().ping();
    
    console.log(`✅ MongoDB bağlantısı başarılı! Database: ${dbName}`);
    
    return db;
  } catch (error) {
    console.error('\n❌ MongoDB bağlantı hatası:', error.message);
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('querySrv')) {
      console.error('\n🔍 TROUBLESHOOTING İPUÇLARI:');
      console.error('1. MongoDB Atlas IP Whitelist kontrolü:');
      console.error('   - Atlas Dashboard > Network Access > IP Access List');
      console.error('   - "Allow Access from Anywhere" (0.0.0.0/0) ekleyin');
      console.error('2. MongoDB Atlas Cluster durumu:');
      console.error('   - Cluster\'ın çalıştığından emin olun');
      console.error('3. Connection String formatı:');
      console.error('   - mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority');
      console.error('4. Database kullanıcı bilgileri:');
      console.error('   - Kullanıcı adı ve şifrenin doğru olduğundan emin olun');
      console.error('5. Yerel MongoDB kullanıyorsanız:');
      console.error('   - mongodb://localhost:27017/malta_db');
    }
    
    throw error;
  }
}

export async function getDB() {
  if (!db) {
    await connectDB();
  }
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB bağlantısı kapatıldı');
  }
}

// Collections
export async function getFormSubmissionsCollection() {
  const database = await getDB();
  return database.collection('formsubmissions');
}

export async function getSEOCollection() {
  const database = await getDB();
  return database.collection('seos');
}

export async function getVerificationCollection() {
  const database = await getDB();
  return database.collection('verifications');
}

export async function getSitemapCollection() {
  const database = await getDB();
  return database.collection('sitemap_settings');
}

// CMS Collections
export async function getContentCollection() {
  const database = await getDB();
  return database.collection('contents');
}

export async function getMediaCollection() {
  const database = await getDB();
  return database.collection('media');
}

export async function getContentVersionsCollection() {
  const database = await getDB();
  return database.collection('content_versions');
}

# Environment Variables Kurulumu

Backend projesinde tüm environment değişkenleri merkezi olarak `config/env.js` dosyasında yönetilmektedir.

## .env Dosyası Oluşturma

1. Proje kök dizininde `.env` dosyası oluşturun
2. `.env.example` dosyasındaki değerleri kopyalayın veya aşağıdaki template'i kullanın:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/malta-db

# CORS Configuration
FRONTEND_URL=http://localhost:3000
ADMIN_PANEL_URL=http://localhost:5173

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Authentication Token
STATIC_TOKEN=static-token-for-now
```

## Environment Variables Açıklamaları

### Server Configuration
- **PORT**: Backend sunucusunun çalışacağı port (varsayılan: 5000)
- **NODE_ENV**: Ortam tipi (`development` veya `production`)

### MongoDB Configuration
- **MONGODB_URI**: MongoDB bağlantı string'i

### CORS Configuration
- **FRONTEND_URL**: Frontend uygulamasının URL'i (CORS için)
- **ADMIN_PANEL_URL**: Admin panel URL'i (CORS için)

### Admin Credentials
- **ADMIN_USERNAME**: Admin panel kullanıcı adı
- **ADMIN_PASSWORD**: Admin panel şifresi

### Authentication
- **STATIC_TOKEN**: Statik authentication token (production'da JWT kullanılmalı)

## Kullanım

Kod içinde environment değişkenlerini kullanmak için:

```javascript
import config from './config/env.js';

// Değişken kullanımı
const port = config.port;
const isDev = config.isDevelopment();

// Helper fonksiyonlar
if (config.isDevelopment()) {
  // Development kodları
}
```

## Production Notları

⚠️ **ÖNEMLİ**: Production ortamında mutlaka:
- `ADMIN_PASSWORD` değerini güçlü bir şifre ile değiştirin
- `STATIC_TOKEN` değerini güvenli bir token ile değiştirin
- `MONGODB_URI` değerini production MongoDB bağlantı string'i ile değiştirin
- `NODE_ENV=production` olarak ayarlayın
- JWT token sistemi kullanmayı düşünün (statik token yerine)

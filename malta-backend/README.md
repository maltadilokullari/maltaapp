# Malta Backend API

Node.js, Express.js ve MongoDB kullanılarak geliştirilmiş backend API.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. `.env` dosyası oluşturun:
```bash
# .env.example dosyasını kopyalayın
cp .env.example .env
```

Veya manuel olarak `.env` dosyası oluşturup şu değişkenleri ekleyin:
```bash
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

3. MongoDB'nin çalıştığından emin olun.

4. Sunucuyu başlatın:
```bash
npm run dev
```

## Environment Variables

Tüm environment değişkenleri `config/env.js` dosyasında merkezi olarak yönetilmektedir. Yeni bir environment değişkeni eklemek için:

1. `.env.example` dosyasına ekleyin
2. `config/env.js` dosyasına ekleyin
3. Kod içinde `config` objesinden kullanın

## API Endpoints

### Form Endpoints
- `POST /api/forms` - Form gönderimi (public)
- `GET /api/forms` - Tüm form kayıtları (admin)
- `GET /api/forms/statistics` - Form istatistikleri (admin)
- `GET /api/forms/:id` - Tek form kaydı (admin)
- `DELETE /api/forms/:id` - Form kaydı sil (admin)

### SEO Endpoints
- `GET /api/seo/page/:page` - Sayfa SEO verisi (public)
- `GET /api/seo` - Tüm SEO verileri (admin)
- `POST /api/seo/:page` - SEO verisi oluştur/güncelle (admin)
- `PUT /api/seo/:page` - SEO verisi güncelle (admin)
- `DELETE /api/seo/:page` - SEO verisi sil (admin)

### Auth Endpoints
- `POST /api/auth/login` - Admin girişi
- `GET /api/auth/verify` - Token doğrulama

## Admin Giriş Bilgileri

- Kullanıcı Adı: `admin`
- Şifre: `admin123`

**Not:** Production ortamında mutlaka değiştirin!

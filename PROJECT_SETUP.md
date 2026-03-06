# Malta Projesi Kurulum Rehberi

Bu proje üç ana bileşenden oluşmaktadır:
1. **Backend** (malta-backend) - Node.js + Express + MongoDB
2. **Frontend** (malta) - Next.js
3. **Admin Panel** (malta/admin-panel) - Vite + React

## Kurulum Adımları

### 1. Backend Kurulumu

```bash
cd malta-backend
npm install
```

`.env` dosyası oluşturun:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/malta-db
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_PANEL_URL=http://localhost:5173
```

MongoDB'nin çalıştığından emin olun, ardından:
```bash
npm run dev
```

Backend `http://localhost:5000` adresinde çalışacaktır.

### 2. Frontend Kurulumu

```bash
cd malta
npm install
```

`.env.local` dosyası oluşturun (opsiyonel):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Frontend `http://localhost:3000` adresinde çalışacaktır.

### 3. Admin Panel Kurulumu

```bash
cd malta/admin-panel
npm install
```

```bash
npm run dev
```

Admin panel `http://localhost:5173` adresinde çalışacaktır.

## Admin Panel Giriş Bilgileri

- **Kullanıcı Adı:** `admin`
- **Şifre:** `admin123`

**ÖNEMLİ:** Production ortamında mutlaka değiştirin!

## Özellikler

### Backend API

- ✅ Form gönderimi endpoint'i
- ✅ Form kayıtlarını görüntüleme (admin)
- ✅ SEO verilerini yönetme (admin)
- ✅ İstatistikler
- ✅ Basit authentication (statik)

### Frontend

- ✅ Ana sayfa formu API'ye bağlı
- ✅ İletişim sayfası formu API'ye bağlı
- ✅ SEO verilerini dinamik olarak algılama
- ✅ Form gönderim mesajları

### Admin Panel

- ✅ Dashboard (istatistikler)
- ✅ Form kayıtlarını görüntüleme ve silme
- ✅ SEO yönetimi (sayfa bazlı)
- ✅ Login sistemi

## API Endpoints

### Form Endpoints
- `POST /api/forms` - Form gönderimi
- `GET /api/forms` - Tüm form kayıtları (admin)
- `GET /api/forms/statistics` - İstatistikler (admin)
- `GET /api/forms/:id` - Tek form kaydı (admin)
- `DELETE /api/forms/:id` - Form kaydı sil (admin)

### SEO Endpoints
- `GET /api/seo/page/:page` - Sayfa SEO verisi
- `GET /api/seo` - Tüm SEO verileri (admin)
- `POST /api/seo/:page` - SEO oluştur/güncelle (admin)
- `PUT /api/seo/:page` - SEO güncelle (admin)
- `DELETE /api/seo/:page` - SEO sil (admin)

### Auth Endpoints
- `POST /api/auth/login` - Admin girişi
- `GET /api/auth/verify` - Token doğrulama

## SEO Yönetimi

Admin panelden her sayfa için SEO ayarları yapılabilir:
- Title ve Description
- Keywords
- Canonical URL
- Open Graph ayarları
- Twitter Card ayarları
- Robots ayarları

Frontend otomatik olarak bu verileri algılar ve sayfa meta tag'lerine uygular.

## Form Yapısı

Formlar şu alanları içerir:
- Ad Soyad (zorunlu)
- Telefon (zorunlu)
- E-posta (zorunlu)
- Süre Seçimi (opsiyonel)
- Ne Zaman (opsiyonel)
- Gizlilik onayı (zorunlu)
- KVKK onayı (zorunlu)

## Notlar

- Backend'de authentication şu an statik token kullanıyor. Production'da JWT kullanılmalı.
- Admin şifresi production'da mutlaka değiştirilmeli.
- MongoDB bağlantı string'i production'da güvenli bir şekilde yapılandırılmalı.
- CORS ayarları production'da sadece izin verilen domain'ler için yapılmalı.

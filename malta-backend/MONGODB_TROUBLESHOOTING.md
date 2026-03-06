# MongoDB Bağlantı Sorunları Giderme Rehberi

## Sorun: ECONNREFUSED Hatası

Eğer `ECONNREFUSED` veya `querySrv ECONNREFUSED` hatası alıyorsanız, bu genellikle **MongoDB Atlas IP Whitelist** sorunudur. Aşağıdaki adımları takip edin:

## 1. Environment Değişkenlerini Kontrol Edin

Önce `.env` dosyasının doğru yüklendiğini kontrol edin:

```bash
npm run test-env
```

Bu komut tüm environment değişkenlerini gösterir.

## 2. .env Dosyasının Konumu

`.env` dosyası **malta-backend** klasörünün **kök dizininde** olmalıdır:

```
malta-backend/
  ├── .env          ← Burada olmalı
  ├── config/
  ├── server.js
  └── ...
```

## 3. MongoDB Atlas Bağlantı String Formatı

### SRV Formatı (Önerilen)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### Standart Format
```env
MONGODB_URI=mongodb://username:password@cluster-shard-00-00.xxxxx.mongodb.net:27017/dbname?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
```

## 4. MongoDB Atlas Kontrolleri

### a) IP Whitelist (EN ÖNEMLİSİ!)
MongoDB Atlas'ta **Network Access** bölümünden:
1. **Add IP Address** butonuna tıklayın
2. **Add Current IP Address** seçeneğini kullanın VEYA
3. Geçici test için: `0.0.0.0/0` (tüm IP'ler) ekleyin ⚠️ (Production'da kullanmayın!)
4. **Confirm** butonuna tıklayın
5. Değişikliğin aktif olması 1-2 dakika sürebilir

**Not:** IP whitelist olmadan MongoDB Atlas'a bağlanamazsınız!

### b) Database User
- Kullanıcı adı ve şifrenin doğru olduğundan emin olun
- Kullanıcının database erişim izni olduğundan emin olun

### c) Cluster Durumu
- Cluster'ın aktif olduğundan emin olun
- Cluster'ın pause edilmediğinden emin olun

## 5. Local MongoDB Kullanımı

Eğer MongoDB Atlas yerine local MongoDB kullanmak istiyorsanız:

```env
MONGODB_URI=mongodb://localhost:27017/malta-db
```

Local MongoDB'nin çalıştığından emin olun:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
# veya
brew services start mongodb-community
```

## 6. Bağlantı String'inde Özel Karakterler

Eğer şifrenizde özel karakterler varsa (örn: `@`, `#`, `%`), URL encode edin:

- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `:` → `%3A`
- `/` → `%2F`
- `?` → `%3F`
- `=` → `%3D`
- `&` → `%26`

Örnek:
```
Şifre: p@ssw#rd
Encoded: p%40ssw%23rd
```

## 7. Debug Modu

Server'ı başlattığınızda şu bilgileri göreceksiniz:
- MongoDB URI (ilk 30 karakter)
- Bağlantı durumu
- Hata mesajları

## 8. Test Komutu

Environment değişkenlerini test etmek için:
```bash
npm run test-env
```

## Örnek .env Dosyası

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/malta-db

# VEYA MongoDB Atlas (SRV)
# MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/malta-db?retryWrites=true&w=majority

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_PANEL_URL=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
STATIC_TOKEN=static-token-for-now
```

## Hala Sorun Varsa

1. `.env` dosyasının doğru konumda olduğundan emin olun
2. `.env` dosyasında yorum satırı (`#`) kullanmayın değişken satırlarında
3. Değişken isimlerinin büyük/küçük harf duyarlı olduğunu unutmayın
4. Boşluk karakterlerine dikkat edin (değerlerin başında/sonunda olmamalı)
5. `npm run test-env` komutu ile değişkenlerin yüklendiğini doğrulayın

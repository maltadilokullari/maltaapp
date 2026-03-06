# MongoDB Atlas Bağlantı Sorunu - Hızlı Çözüm

## ❌ Hata: `ECONNREFUSED _mongodb._tcp.project.znvvuql.mongodb.net`

Bu hata **MongoDB Atlas IP Whitelist** sorunudur.

## ✅ Hızlı Çözüm (3 Adım)

### 1. MongoDB Atlas'a Giriş Yapın
https://cloud.mongodb.com/

### 2. Network Access (IP Whitelist) Ayarları
1. Sol menüden **Network Access** seçin
2. **Add IP Address** butonuna tıklayın
3. **Add Current IP Address** seçeneğini seçin (otomatik IP ekler)
4. VEYA **Allow Access from Anywhere** seçeneğini seçin (`0.0.0.0/0`)
5. **Confirm** butonuna tıklayın

### 3. Bekleyin ve Tekrar Deneyin
- Değişiklik 1-2 dakika içinde aktif olur
- Server'ı yeniden başlatın: `npm run dev`

## 🔍 URI Formatı Kontrolü

`.env` dosyanızda MongoDB URI şu formatta olmalı:

```env
# MongoDB Atlas SRV (Önerilen)
MONGODB_URI=mongodb+srv://ofky75_db_user:Malta1453@project.znvvuql.mongodb.net/malta?retryWrites=true&w=majority

# appName parametresini kaldırın (gerekli değil)
# ❌ YANLIŞ: ...?appName=Project
# ✅ DOĞRU: ...?retryWrites=true&w=majority
```

## 📝 Örnek .env Dosyası

```env
PORT=8080
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://ofky75_db_user:Malta1453@project.znvvuql.mongodb.net/malta?retryWrites=true&w=majority

FRONTEND_URL=http://localhost:3000
ADMIN_PANEL_URL=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
STATIC_TOKEN=static-token-for-now
```

## ⚠️ Önemli Notlar

1. **IP Whitelist olmadan bağlanamazsınız!** (En sık karşılaşılan sorun)
2. Şifrede özel karakter varsa URL encode edin:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`
3. `appName` parametresi gerekli değil, kaldırabilirsiniz
4. Cluster'ın aktif olduğundan emin olun (pause edilmemiş)

## 🧪 Test

Environment değişkenlerini test etmek için:
```bash
npm run test-env
```

import { getVerificationCollection } from '../db/mongodb.js';
import config from '../config/env.js';

// XSS ve HTML injection koruması için sanitize fonksiyonu
function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }
  // Sadece alfanumerik karakterler, tire, alt çizgi ve nokta izin ver
  // Meta verification kodları genellikle bu karakterleri içerir
  return input.trim().replace(/[^a-zA-Z0-9\-_.]/g, '');
}

// Get verification data (public - for frontend)
export const getVerification = async (req, res) => {
  try {
    const collection = await getVerificationCollection();
    const verification = await collection.findOne({ isActive: true });

    if (!verification) {
      return res.json({
        success: true,
        data: {
          google_site_verification: '',
          bing_site_verification: '',
          yandex_verification: '',
          facebook_domain_verification: '',
          pinterest_verification: '',
          isActive: false
        }
      });
    }

    // Hassas bilgileri temizle (sadece aktif olanları döndür)
    const response = {
      google_site_verification: verification.google_site_verification || '',
      bing_site_verification: verification.bing_site_verification || '',
      yandex_verification: verification.yandex_verification || '',
      facebook_domain_verification: verification.facebook_domain_verification || '',
      pinterest_verification: verification.pinterest_verification || '',
      isActive: verification.isActive || false
    };

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Get verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Doğrulama verisi getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Get verification data (admin - with all fields)
export const getVerificationAdmin = async (req, res) => {
  try {
    const collection = await getVerificationCollection();
    const verification = await collection.findOne({});

    if (!verification) {
      return res.json({
        success: true,
        data: {
          google_site_verification: '',
          bing_site_verification: '',
          yandex_verification: '',
          facebook_domain_verification: '',
          pinterest_verification: '',
          isActive: true
        }
      });
    }

    res.json({
      success: true,
      data: verification
    });
  } catch (error) {
    console.error('Get verification admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Doğrulama verisi getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Create or update verification data
export const createOrUpdateVerification = async (req, res) => {
  try {
    const {
      google_site_verification,
      bing_site_verification,
      yandex_verification,
      facebook_domain_verification,
      pinterest_verification,
      isActive
    } = req.body;

    // Input sanitization
    const sanitizedData = {
      google_site_verification: sanitizeInput(google_site_verification),
      bing_site_verification: sanitizeInput(bing_site_verification),
      yandex_verification: sanitizeInput(yandex_verification),
      facebook_domain_verification: sanitizeInput(facebook_domain_verification),
      pinterest_verification: sanitizeInput(pinterest_verification),
      isActive: isActive !== false, // Default true
      updatedAt: new Date()
    };

    const collection = await getVerificationCollection();
    
    // Tek bir kayıt olacak şekilde upsert
    const result = await collection.findOneAndUpdate(
      {}, // Boş filter - her zaman tek kayıt
      { 
        $set: sanitizedData,
        $setOnInsert: { createdAt: new Date() }
      },
      { 
        upsert: true,
        returnDocument: 'after'
      }
    );

    res.json({
      success: true,
      message: 'Arama motoru doğrulama verileri başarıyla kaydedildi',
      data: result.value
    });
  } catch (error) {
    console.error('Create/Update verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Doğrulama verisi kaydedilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Delete verification data
export const deleteVerification = async (req, res) => {
  try {
    const collection = await getVerificationCollection();
    const result = await collection.deleteOne({});

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Doğrulama verisi bulunamadı'
      });
    }

    res.json({
      success: true,
      message: 'Doğrulama verisi başarıyla silindi'
    });
  } catch (error) {
    console.error('Delete verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Doğrulama verisi silinirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

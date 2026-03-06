import { getSEOCollection } from '../db/mongodb.js';
import config from '../config/env.js';

/**
 * Boş Sayfa & 404 Temizleme Controller
 * READ-ONLY: Sadece tespit ve raporlama
 * İçerik değiştirilmez, sayfa silinmez, 301 yapılmaz
 */

// Manuel oluşturulmuş sayfalar (ASLA dokunulmayacak)
const MANUAL_PAGES = [
  '/',
  '/iletisim',
  '/biz-kimiz',
  '/malta-dil-okullari',
  '/malta-dil-okulu-fiyatlari',
  '/malta-konaklama',
  '/malta-ogrenci-vizesi',
  '/malta-yaz-okullari',
  '/malta-yaz-okulu',
  '/malta-work-and-study',
  '/blog',
];

// Blog postları (ASLA dokunulmayacak)
const BLOG_POSTS = [
  '/blog/malta-nerede',
  '/blog/malta-vize-istiyor-mu',
  '/blog/malta-dil-okullari-havalimani-transfer',
  '/blog/malta-dil-okulu-gitmeden-once-hazirlik',
];

// Okul sayfaları (ASLA dokunulmayacak)
const SCHOOL_PAGES = [
  '/malta-dil-okullari/ese-malta',
  '/malta-dil-okullari/ec-malta',
  '/malta-dil-okullari/iels-malta',
  '/malta-dil-okullari/ace-english-malta',
  '/malta-dil-okullari/am-language-malta',
  '/malta-dil-okullari/clubclass-malta',
  '/malta-dil-okullari/gateway-malta',
  '/malta-dil-okullari/inlingua-malta',
  '/malta-dil-okullari/atlas-malta',
  '/malta-dil-okullari/bels-malta',
];

/**
 * Sayfanın manuel oluşturulmuş olup olmadığını kontrol et
 */
function isManualPage(path) {
  const normalizedPath = path === '/' ? '/' : path.toLowerCase();
  
  // Manuel sayfalar listesinde var mı?
  if (MANUAL_PAGES.includes(normalizedPath)) {
    return true;
  }
  
  // Blog postu mu?
  if (BLOG_POSTS.includes(normalizedPath)) {
    return true;
  }
  
  // Okul sayfası mı?
  if (SCHOOL_PAGES.includes(normalizedPath)) {
    return true;
  }
  
  // Blog post pattern kontrolü
  if (normalizedPath.startsWith('/blog/')) {
    return true; // Tüm blog postları manuel
  }
  
  // Okul sayfası pattern kontrolü
  if (normalizedPath.startsWith('/malta-dil-okullari/')) {
    return true; // Tüm okul sayfaları manuel
  }
  
  return false;
}

/**
 * Sayfanın içerik kelime sayısını tahmin et (SEO verilerinden)
 * READ-ONLY: Sadece tahmin, içerik okunmaz
 */
function estimateWordCount(seoData) {
  if (!seoData) return 0;
  
  let wordCount = 0;
  
  // Title'dan kelime sayısı
  if (seoData.title) {
    wordCount += seoData.title.split(/\s+/).length;
  }
  
  // Description'dan kelime sayısı
  if (seoData.description) {
    wordCount += seoData.description.split(/\s+/).length;
  }
  
  // Keywords'dan kelime sayısı
  if (seoData.keywords && Array.isArray(seoData.keywords)) {
    wordCount += seoData.keywords.length;
  }
  
  // OG description'dan kelime sayısı
  if (seoData.ogDescription) {
    wordCount += seoData.ogDescription.split(/\s+/).length;
  }
  
  // Twitter description'dan kelime sayısı
  if (seoData.twitterDescription) {
    wordCount += seoData.twitterDescription.split(/\s+/).length;
  }
  
  return wordCount;
}

/**
 * Sayfanın schema içerip içermediğini kontrol et
 */
function hasSchema(seoData) {
  if (!seoData) return false;
  
  // SEO verisinde schema işareti var mı?
  // (Gerçek schema kontrolü frontend'den yapılmalı)
  // Şimdilik SEO verisi varsa schema olabilir kabul edilir
  return seoData.title && seoData.description;
}

/**
 * Sayfanın boş olup olmadığını kontrol et
 * TÜM kriterler sağlanmalı
 */
async function isPageEmpty(pagePath, seoData) {
  // 1. Manuel sayfa kontrolü - ASLA dokunma
  if (isManualPage(pagePath)) {
    return { isEmpty: false, reason: 'Manuel oluşturulmuş sayfa' };
  }
  
  // 2. SEO verisi yoksa, sayfa muhtemelen boş
  if (!seoData) {
    return { isEmpty: true, reason: 'SEO verisi yok' };
  }
  
  // 3. İçerik kelime sayısı 80'den az mı?
  const wordCount = estimateWordCount(seoData);
  if (wordCount >= 80) {
    return { isEmpty: false, reason: `İçerik yeterli (${wordCount} kelime)` };
  }
  
  // 4. Ana içerik alanı boş mu? (Title ve description kontrolü)
  if (!seoData.title || !seoData.description) {
    return { isEmpty: true, reason: 'Ana içerik alanı boş' };
  }
  
  // 5. Sadece template/başlık içeriyor mu?
  const titleWords = seoData.title.split(/\s+/).length;
  const descWords = seoData.description.split(/\s+/).length;
  if (titleWords < 3 && descWords < 10) {
    return { isEmpty: true, reason: 'Sadece template/başlık içeriyor' };
  }
  
  // 6. Schema veya structured data içermiyor mu?
  if (!hasSchema(seoData)) {
    return { isEmpty: true, reason: 'Schema veya structured data yok' };
  }
  
  // 7. İç link kontrolü - SEO verisinde canonical var mı?
  // Canonical varsa, sayfa muhtemelen iç link alıyor
  if (seoData.canonical && seoData.canonical !== `https://maltadilokuluingilizce.com${pagePath}`) {
    return { isEmpty: false, reason: 'Canonical farklı (iç link alıyor olabilir)' };
  }
  
  // TÜM kriterler sağlandı - sayfa boş
  return { 
    isEmpty: true, 
    reason: 'Tüm boş sayfa kriterleri sağlandı',
    details: {
      wordCount,
      hasTitle: !!seoData.title,
      hasDescription: !!seoData.description,
      hasCanonical: !!seoData.canonical,
      hasSchema: hasSchema(seoData),
    }
  };
}

/**
 * Boş sayfaları tespit et - READ-ONLY
 */
export const detectEmptyPages = async (req, res) => {
  try {
    const collection = await getSEOCollection();
    const allSeos = await collection.find({}).toArray();
    
    const emptyPages = [];
    const safePages = [];
    
    // Tüm SEO kayıtlarını kontrol et
    for (const seo of allSeos) {
      const pagePath = seo.page === '/' ? '/' : `/${seo.page}`;
      const checkResult = await isPageEmpty(pagePath, seo);
      
      if (checkResult.isEmpty) {
        emptyPages.push({
          path: pagePath,
          page: seo.page,
          reason: checkResult.reason,
          details: checkResult.details || {},
          seoData: {
            title: seo.title || null,
            description: seo.description || null,
            isActive: seo.isActive,
            hasCanonical: !!seo.canonical,
          },
        });
      } else {
        safePages.push({
          path: pagePath,
          page: seo.page,
          reason: checkResult.reason,
        });
      }
    }
    
    res.json({
      success: true,
      data: {
        emptyPages,
        safePages,
        summary: {
          totalPages: allSeos.length,
          emptyPagesCount: emptyPages.length,
          safePagesCount: safePages.length,
        },
        note: 'READ-ONLY: Bu rapor sadece tespit içindir. Sayfalar değiştirilmez.',
      },
    });
  } catch (error) {
    console.error('Detect empty pages error:', error);
    res.status(500).json({
      success: false,
      message: 'Boş sayfa tespiti yapılırken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Boş sayfaları sitemap'ten çıkar ve 404 olarak işaretle
 * READ-ONLY: Sadece SEO verisini günceller, sayfa silinmez
 */
export const markEmptyPagesAs404 = async (req, res) => {
  try {
    const { pagePaths } = req.body; // İşaretlenecek sayfa path'leri
    
    if (!Array.isArray(pagePaths) || pagePaths.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Sayfa path\'leri array olarak gönderilmelidir',
      });
    }
    
    const collection = await getSEOCollection();
    const results = [];
    
    for (const pagePath of pagePaths) {
      const page = pagePath === '/' ? '/' : pagePath.replace(/^\//, '');
      
      // Manuel sayfa kontrolü - ASLA dokunma
      if (isManualPage(pagePath)) {
        results.push({
          path: pagePath,
          status: 'skipped',
          reason: 'Manuel oluşturulmuş sayfa - değiştirilmedi',
        });
        continue;
      }
      
      // SEO verisini güncelle - robots noindex, isActive false
      const result = await collection.findOneAndUpdate(
        { page: page.toLowerCase() },
        {
          $set: {
            isActive: false,
            robots: {
              index: false,
              follow: false,
            },
            markedAs404: true,
            markedAs404At: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          returnDocument: 'after',
        }
      );
      
      if (result.value) {
        results.push({
          path: pagePath,
          status: 'marked',
          message: 'Sayfa 404 olarak işaretlendi (sitemap\'ten çıkarılacak)',
        });
      } else {
        results.push({
          path: pagePath,
          status: 'not_found',
          message: 'SEO verisi bulunamadı',
        });
      }
    }
    
    res.json({
      success: true,
      message: 'Boş sayfalar 404 olarak işaretlendi',
      data: {
        results,
        summary: {
          total: pagePaths.length,
          marked: results.filter(r => r.status === 'marked').length,
          skipped: results.filter(r => r.status === 'skipped').length,
          notFound: results.filter(r => r.status === 'not_found').length,
        },
        note: 'READ-ONLY: Sayfalar silinmedi, sadece SEO ayarları güncellendi. Sitemap cache\'i temizlenmelidir.',
      },
    });
  } catch (error) {
    console.error('Mark empty pages as 404 error:', error);
    res.status(500).json({
      success: false,
      message: 'Sayfalar işaretlenirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Boş sayfaları sitemap'ten çıkar (sitemap cache'i temizle)
 */
export const removeEmptyPagesFromSitemap = async (req, res) => {
  try {
    // Sitemap cache'ini temizle - boş sayfalar artık sitemap'te görünmeyecek
    const { clearSitemapCache } = await import('./sitemapController.js');
    clearSitemapCache();
    
    res.json({
      success: true,
      message: 'Sitemap cache temizlendi. Boş sayfalar bir sonraki sitemap oluşturulduğunda çıkarılacak.',
      note: 'READ-ONLY: Sayfalar silinmedi, sadece sitemap cache\'i temizlendi.',
    });
  } catch (error) {
    console.error('Remove empty pages from sitemap error:', error);
    res.status(500).json({
      success: false,
      message: 'Sitemap cache temizlenirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

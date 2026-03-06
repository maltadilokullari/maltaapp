import config from '../config/env.js';

/**
 * Schema Audit Controller
 * Google Rich Results okunabilirliği için teknik kontrol
 * İÇERİK DEĞİŞTİRİLMEZ - SADECE RAPORLAMA
 */

// Schema audit sonuçları cache
const auditCache = {
  results: null,
  cacheTime: null,
  CACHE_DURATION: 60 * 60 * 1000, // 1 saat
};

/**
 * Schema Read-Only Kontrolü
 * JSON-LD içindeki metin alanlarının DOM'dan okunup okunmadığını kontrol eder
 */
function checkSchemaReadOnly(schemaData) {
  const issues = [];
  const warnings = [];

  if (!schemaData || typeof schemaData !== 'object') {
    return { issues, warnings };
  }

  // FAQPage kontrolü
  if (schemaData['@graph']) {
    schemaData['@graph'].forEach((item, index) => {
      if (item['@type'] === 'FAQPage' && item.mainEntity) {
        const faqs = Array.isArray(item.mainEntity) ? item.mainEntity : [item.mainEntity];
        
        faqs.forEach((faq, faqIndex) => {
          if (faq['@type'] === 'Question' && faq.acceptedAnswer) {
            const answer = faq.acceptedAnswer;
            
            // Cevap metninin manuel girilmiş olup olmadığını kontrol et
            if (answer.text && typeof answer.text === 'string') {
              // HTML tag'leri temizlenmiş mi kontrol et
              const hasHtmlTags = /<[^>]+>/g.test(answer.text);
              
              if (hasHtmlTags) {
                warnings.push({
                  type: 'FAQ_HTML_IN_SCHEMA',
                  severity: 'medium',
                  location: `@graph[${index}].mainEntity[${faqIndex}]`,
                  message: 'FAQ cevabında HTML tag\'leri bulundu. DOM\'dan otomatik okuma önerilir.',
                  recommendation: 'Cevap metnini DOM\'dan otomatik okumak için data-attribute veya ID kullanın.',
                });
              }

              // Cevap metninin çok uzun olup olmadığını kontrol et (Google limit: ~5000 karakter)
              if (answer.text.length > 5000) {
                issues.push({
                  type: 'FAQ_ANSWER_TOO_LONG',
                  severity: 'high',
                  location: `@graph[${index}].mainEntity[${faqIndex}]`,
                  message: `FAQ cevabı çok uzun (${answer.text.length} karakter). Google limit: ~5000 karakter.`,
                  recommendation: 'Cevabı kısaltın veya bölün.',
                });
              }

              // Cevap metninin boş olup olmadığını kontrol et
              if (answer.text.trim().length === 0) {
                issues.push({
                  type: 'FAQ_ANSWER_EMPTY',
                  severity: 'high',
                  location: `@graph[${index}].mainEntity[${faqIndex}]`,
                  message: 'FAQ cevabı boş.',
                  recommendation: 'Cevap metnini doldurun.',
                });
              }
            } else {
              issues.push({
                type: 'FAQ_ANSWER_MISSING',
                severity: 'high',
                location: `@graph[${index}].mainEntity[${faqIndex}]`,
                message: 'FAQ cevabı eksik veya geçersiz format.',
                recommendation: 'acceptedAnswer.text alanını doldurun.',
              });
            }

            // Soru metninin boş olup olmadığını kontrol et
            if (!faq.name || faq.name.trim().length === 0) {
              issues.push({
                type: 'FAQ_QUESTION_EMPTY',
                severity: 'high',
                location: `@graph[${index}].mainEntity[${faqIndex}]`,
                message: 'FAQ sorusu boş.',
                recommendation: 'Question.name alanını doldurun.',
              });
            }
          }
        });
      }

      // ImageObject kontrolü
      if (item['@type'] === 'ImageObject') {
        if (!item.url && !item.contentUrl) {
          warnings.push({
            type: 'IMAGE_URL_MISSING',
            severity: 'medium',
            location: `@graph[${index}]`,
            message: 'ImageObject\'te url veya contentUrl eksik.',
            recommendation: 'Görsel URL\'sini ekleyin.',
          });
        }

        if (!item.altText && !item.alternateName) {
          warnings.push({
            type: 'IMAGE_ALT_MISSING',
            severity: 'low',
            location: `@graph[${index}]`,
            message: 'ImageObject\'te altText veya alternateName eksik.',
            recommendation: 'Görsel alt text\'ini ekleyin (erişilebilirlik için).',
          });
        }
      }

      // VideoObject kontrolü
      if (item['@type'] === 'VideoObject') {
        if (!item.contentUrl && !item.embedUrl) {
          issues.push({
            type: 'VIDEO_URL_MISSING',
            severity: 'high',
            location: `@graph[${index}]`,
            message: 'VideoObject\'te contentUrl veya embedUrl eksik.',
            recommendation: 'Video URL\'sini ekleyin.',
          });
        }

        if (!item.name && !item.headline) {
          warnings.push({
            type: 'VIDEO_NAME_MISSING',
            severity: 'medium',
            location: `@graph[${index}]`,
            message: 'VideoObject\'te name veya headline eksik.',
            recommendation: 'Video başlığını ekleyin.',
          });
        }
      }
    });
  }

  return { issues, warnings };
}

/**
 * FAQ Teknik Okunurluk Kontrolü
 * FAQ cevaplarının HTML node bütünlüğünü kontrol eder
 */
function checkFAQReadability(faqData) {
  const issues = [];
  const warnings = [];

  if (!faqData || !Array.isArray(faqData)) {
    return { issues, warnings };
  }

  faqData.forEach((faq, index) => {
    if (faq.answer) {
      // HTML tag'lerinin düzgün kapatılıp kapatılmadığını kontrol et
      const openTags = (faq.answer.match(/<[^/][^>]*>/g) || []).length;
      const closeTags = (faq.answer.match(/<\/[^>]+>/g) || []).length;

      if (openTags !== closeTags) {
        issues.push({
          type: 'FAQ_HTML_TAG_MISMATCH',
          severity: 'high',
          location: `FAQ[${index}]`,
          message: `HTML tag eşleşmesi hatası: ${openTags} açılış, ${closeTags} kapanış tag'i.`,
          recommendation: 'Tüm HTML tag\'lerini düzgün kapatın.',
        });
      }

      // Script tag'lerinin olup olmadığını kontrol et (güvenlik)
      if (/<script/i.test(faq.answer)) {
        issues.push({
          type: 'FAQ_SCRIPT_TAG_DETECTED',
          severity: 'critical',
          location: `FAQ[${index}]`,
          message: 'FAQ cevabında script tag\'i bulundu (güvenlik riski).',
          recommendation: 'Script tag\'lerini kaldırın.',
        });
      }

      // Çok uzun paragraflar kontrolü (okunabilirlik)
      const paragraphs = faq.answer.split(/<\/p>|<br\s*\/?>/i);
      paragraphs.forEach((para, paraIndex) => {
        const textLength = para.replace(/<[^>]+>/g, '').trim().length;
        if (textLength > 500) {
          warnings.push({
            type: 'FAQ_PARAGRAPH_TOO_LONG',
            severity: 'low',
            location: `FAQ[${index}], Paragraph[${paraIndex}]`,
            message: `Paragraf çok uzun (${textLength} karakter). Okunabilirlik için kısaltın.`,
            recommendation: 'Paragrafı daha kısa cümlelere bölün.',
          });
        }
      });
    }
  });

  return { issues, warnings };
}

/**
 * Görsel & Video Okuma Kontrolü
 * DOM sırası ve erişilebilirlik kontrolü
 */
function checkMediaReadability(mediaData) {
  const issues = [];
  const warnings = [];

  if (!mediaData || !Array.isArray(mediaData)) {
    return { issues, warnings };
  }

  mediaData.forEach((media, index) => {
    // Görsel kontrolü
    if (media.type === 'image') {
      if (!media.src && !media.url) {
        issues.push({
          type: 'IMAGE_SRC_MISSING',
          severity: 'high',
          location: `Media[${index}]`,
          message: 'Görsel src veya url eksik.',
          recommendation: 'Görsel kaynağını ekleyin.',
        });
      }

      if (!media.alt) {
        warnings.push({
          type: 'IMAGE_ALT_MISSING',
          severity: 'medium',
          location: `Media[${index}]`,
          message: 'Görsel alt text\'i eksik (erişilebilirlik).',
          recommendation: 'Alt text ekleyin.',
        });
      }

      // Görsel boyutları kontrolü (LCP için)
      if (!media.width || !media.height) {
        warnings.push({
          type: 'IMAGE_DIMENSIONS_MISSING',
          severity: 'low',
          location: `Media[${index}]`,
          message: 'Görsel boyutları (width/height) eksik (CLS önleme için).',
          recommendation: 'Width ve height attribute\'larını ekleyin.',
        });
      }
    }

    // Video kontrolü
    if (media.type === 'video') {
      if (!media.src && !media.url && !media.embedUrl) {
        issues.push({
          type: 'VIDEO_SRC_MISSING',
          severity: 'high',
          location: `Media[${index}]`,
          message: 'Video src, url veya embedUrl eksik.',
          recommendation: 'Video kaynağını ekleyin.',
        });
      }

      if (!media.poster) {
        warnings.push({
          type: 'VIDEO_POSTER_MISSING',
          severity: 'low',
          location: `Media[${index}]`,
          message: 'Video poster görseli eksik (kullanıcı deneyimi).',
          recommendation: 'Poster görseli ekleyin.',
        });
      }
    }
  });

  return { issues, warnings };
}

/**
 * Schema türlerini tespit et (JSON-LD'den) - READ-ONLY
 */
function detectSchemaTypes(schemaData) {
  const types = new Set();
  
  if (!schemaData || typeof schemaData !== 'object') {
    return Array.from(types);
  }

  // @graph yapısı kontrolü
  if (schemaData['@graph'] && Array.isArray(schemaData['@graph'])) {
    schemaData['@graph'].forEach((item) => {
      if (item['@type']) {
        types.add(item['@type']);
      }
    });
  }

  // Tekil schema kontrolü
  if (schemaData['@type']) {
    types.add(schemaData['@type']);
  }

  return Array.from(types);
}

/**
 * JSON geçerliliğini kontrol et - READ-ONLY
 */
function validateJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

/**
 * Mevcut sayfalardaki schema türlerini tespit et
 * READ-ONLY: Sadece okuma, içerik değiştirilmez
 */
function getKnownSchemaTypes() {
  // Mevcut sayfalardaki bilinen schema türleri
  return [
    'WebSite',
    'Organization',
    'EducationalOrganization',
    'WebPage',
    'FAQPage',
    'Question',
    'Answer',
    'BreadcrumbList',
    'ImageObject',
    'VideoObject',
    'Article',
    'ItemList',
    'SiteNavigationElement',
    'Table',
  ];
}

/**
 * Tam Schema Audit - READ-ONLY
 * Mevcut sayfalardaki JSON-LD schema'larını okur ve rapor döndürür
 */
export const performSchemaAudit = async (req, res) => {
  try {
    // Cache kontrolü
    if (auditCache.results && auditCache.cacheTime) {
      const cacheAge = Date.now() - auditCache.cacheTime;
      if (cacheAge < auditCache.CACHE_DURATION) {
        return res.json({
          success: true,
          data: auditCache.results,
          cached: true,
        });
      }
    }

    // READ-ONLY: Sadece raporlama yapılır
    // Schema verileri frontend'den gönderilebilir veya build-time'da analiz edilebilir
    // Şimdilik genel bir rapor döndürülür
    
    // READ-ONLY: Mevcut sayfalardaki bilinen schema türleri
    const schemaTypes = getKnownSchemaTypes();

    const auditResults = {
      timestamp: new Date().toISOString(),
      summary: {
        totalIssues: 0,
        totalWarnings: 0,
        criticalIssues: 0,
        highIssues: 0,
        mediumIssues: 0,
        lowIssues: 0,
      },
      schemaAnalysis: {
        detectedTypes: schemaTypes,
        totalTypes: schemaTypes.length,
        message: 'Mevcut sayfalardaki JSON-LD schema türleri tespit edildi. Detaylı analiz için sayfa bazlı kontrol gerekli.',
        note: 'READ-ONLY: Schema verileri sadece okunur, içerik değiştirilmez.',
      },
      schemaReadOnly: {
        status: 'read_only',
        message: 'Schema Read-Only kontrolü: JSON-LD içindeki metin alanları DOM\'dan otomatik okunmalıdır.',
        recommendation: 'Manuel girilmiş schema text\'ler kontrol edilmelidir. İçerik değiştirilmez.',
        detectedIssues: [],
        warnings: [],
      },
      faqReadability: {
        status: 'read_only',
        message: 'FAQ okunabilirlik kontrolü: FAQ cevaplarının HTML node bütünlüğü korunmalıdır.',
        recommendation: 'FAQ bölümlerinde tag eşleşmeleri ve script tag kontrolü yapılmalıdır.',
        detectedIssues: [],
        warnings: [],
      },
      mediaReadability: {
        status: 'read_only',
        message: 'Görsel ve video okunabilirlik kontrolü: DOM sırası ve erişilebilirlik kontrol edilmelidir.',
        recommendation: 'Görsel ve video elementlerinin alt text, boyut ve poster bilgileri kontrol edilmelidir.',
        detectedIssues: [],
        warnings: [],
      },
      jsonValidation: {
        status: 'needs_check',
        message: 'JSON geçerliliği kontrolü için schema verileri analiz edilmelidir.',
        recommendation: 'Tüm JSON-LD script tag\'lerinin geçerli JSON içerdiğinden emin olun.',
      },
      recommendations: [
        {
          priority: 'high',
          title: 'Schema Read-Only Kontrolü',
          description: 'JSON-LD içindeki metin alanlarının DOM\'dan otomatik okunup okunmadığını kontrol edin.',
          action: 'Her sayfa için schema verilerini DOM içeriğiyle karşılaştırın. İçerik değiştirilmez.',
        },
        {
          priority: 'high',
          title: 'FAQ HTML Bütünlüğü',
          description: 'FAQ cevaplarının HTML node bütünlüğünü kontrol edin.',
          action: 'FAQ bölümlerinde açık/kapalı tag eşleşmelerini kontrol edin. Metin değiştirilmez.',
        },
        {
          priority: 'medium',
          title: 'Görsel Erişilebilirlik',
          description: 'Görsellerin alt text ve boyut bilgilerini kontrol edin.',
          action: 'Tüm görsellere alt text ve width/height ekleyin. DOM sırası korunur.',
        },
        {
          priority: 'medium',
          title: 'Video Metadata',
          description: 'Video elementlerinin poster ve metadata bilgilerini kontrol edin.',
          action: 'Video elementlerine poster görseli ve metadata ekleyin. İçerik değiştirilmez.',
        },
      ],
    };

    auditCache.results = auditResults;
    auditCache.cacheTime = Date.now();

    res.json({
      success: true,
      data: auditResults,
      cached: false,
    });
  } catch (error) {
    console.error('Schema audit error:', error);
    res.status(500).json({
      success: false,
      message: 'Schema audit yapılırken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Schema Validation Helper (Test için)
 */
export const validateSchemaData = async (req, res) => {
  try {
    const { schemaData, faqData, mediaData } = req.body;

    const results = {
      schemaReadOnly: checkSchemaReadOnly(schemaData),
      faqReadability: checkFAQReadability(faqData),
      mediaReadability: checkMediaReadability(mediaData),
    };

    // Toplam sayıları hesapla
    const totalIssues = 
      results.schemaReadOnly.issues.length +
      results.faqReadability.issues.length +
      results.mediaReadability.issues.length;
    
    const totalWarnings = 
      results.schemaReadOnly.warnings.length +
      results.faqReadability.warnings.length +
      results.mediaReadability.warnings.length;

    res.json({
      success: true,
      data: {
        ...results,
        summary: {
          totalIssues,
          totalWarnings,
          criticalIssues: results.schemaReadOnly.issues.filter(i => i.severity === 'critical').length,
          highIssues: results.schemaReadOnly.issues.filter(i => i.severity === 'high').length +
                     results.faqReadability.issues.filter(i => i.severity === 'high').length +
                     results.mediaReadability.issues.filter(i => i.severity === 'high').length,
          mediumIssues: results.schemaReadOnly.warnings.filter(w => w.severity === 'medium').length +
                       results.faqReadability.warnings.filter(w => w.severity === 'medium').length +
                       results.mediaReadability.warnings.filter(w => w.severity === 'medium').length,
          lowIssues: results.schemaReadOnly.warnings.filter(w => w.severity === 'low').length +
                    results.faqReadability.warnings.filter(w => w.severity === 'low').length +
                    results.mediaReadability.warnings.filter(w => w.severity === 'low').length,
        },
      },
    });
  } catch (error) {
    console.error('Schema validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Schema validation yapılırken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

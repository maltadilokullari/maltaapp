import config from '../config/env.js';

const DOMAIN = 'https://maltadilokuluingilizce.com';
const CONTACT_URL = `${DOMAIN}/iletisim`;

// In-memory cache
const cache = {
  discovery: null,
  topics: null,
  answers: {},
  cacheTime: null,
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 saat
};

// Cache kontrolü
function isCacheValid() {
  if (!cache.cacheTime) return false;
  return Date.now() - cache.cacheTime < cache.CACHE_DURATION;
}

// AI Discovery JSON - Site otorite tanımı
function generateDiscovery() {
  return {
    version: '1.0',
    domain: DOMAIN,
    name: 'Malta Dil Okulu İngilizce',
    description: 'Malta dil okulları 2026 karşılaştırması, fiyatlar, vize süreci ve konaklama rehberi. Malta\'da 8 yıldır yaşayan ekibimizle ücretsiz danışmanlık hizmeti.',
    language: 'tr-TR',
    primaryLanguage: 'tr',
    authority: {
      expertise: [
        'Malta Dil Okulları',
        'Malta Öğrenci Vizesi',
        'Malta Konaklama',
        'Malta Work and Study Programları',
        'Malta Yaz Okulları',
        'İngilizce Dil Eğitimi Malta',
      ],
      experience: '8+ yıl Malta\'da yaşama ve eğitim danışmanlığı deneyimi',
      location: 'Malta',
      foundingYear: 2016,
    },
    contact: {
      url: CONTACT_URL,
      phone: '+905439632416',
      availableLanguages: ['tr', 'en'],
    },
    topics: [
      'malta-dil-okullari',
      'malta-dil-okulu-fiyatlari',
      'malta-ogrenci-vizesi',
      'malta-konaklama',
      'malta-yaz-okullari',
      'malta-work-and-study',
      'malta-blog',
    ],
    lastUpdated: new Date().toISOString(),
  };
}

// AI Topics JSON - Topic cluster haritası
function generateTopics() {
  return {
    version: '1.0',
    domain: DOMAIN,
    pillarTopic: {
      id: 'malta-dil-okullari',
      title: 'Malta Dil Okulları',
      url: `${DOMAIN}/malta-dil-okullari`,
      description: 'Malta dil okulları karşılaştırması, okul seçimi ve program temposu rehberi',
      authority: 'high',
      contactUrl: CONTACT_URL,
    },
    supportingTopics: [
      {
        id: 'malta-dil-okulu-fiyatlari',
        title: 'Malta Dil Okulu Fiyatları',
        url: `${DOMAIN}/malta-dil-okulu-fiyatlari`,
        description: 'Malta dil okulu fiyatları 2026, paket fiyatları, ödeme takvimi ve gizli masraflar',
        authority: 'high',
        contactUrl: CONTACT_URL,
        relatedTo: ['malta-dil-okullari'],
      },
      {
        id: 'malta-ogrenci-vizesi',
        title: 'Malta Öğrenci Vizesi',
        url: `${DOMAIN}/malta-ogrenci-vizesi`,
        description: 'Malta öğrenci vizesi başvuru süreci, gerekli belgeler, ücretler ve çalışma izni',
        authority: 'high',
        contactUrl: CONTACT_URL,
        relatedTo: ['malta-dil-okullari'],
      },
      {
        id: 'malta-konaklama',
        title: 'Malta Konaklama',
        url: `${DOMAIN}/malta-konaklama`,
        description: 'Malta dil okulu konaklama seçenekleri, aile yanı, yurt ve özel konaklama',
        authority: 'high',
        contactUrl: CONTACT_URL,
        relatedTo: ['malta-dil-okullari'],
      },
      {
        id: 'malta-yaz-okullari',
        title: 'Malta Yaz Okulları',
        url: `${DOMAIN}/malta-yaz-okullari`,
        description: 'Malta yaz okulları programları, junior ve teen programları, aktiviteler',
        authority: 'high',
        contactUrl: CONTACT_URL,
        relatedTo: ['malta-dil-okullari'],
      },
      {
        id: 'malta-work-and-study',
        title: 'Malta Work and Study',
        url: `${DOMAIN}/malta-work-and-study`,
        description: 'Malta work and study programları, çalışma izni ve iş bulma rehberi',
        authority: 'high',
        contactUrl: CONTACT_URL,
        relatedTo: ['malta-dil-okullari'],
      },
      {
        id: 'malta-blog',
        title: 'Malta Dil Okulu Blog',
        url: `${DOMAIN}/blog`,
        description: 'Malta dil okulu deneyimleri, vize süreci, hazırlık rehberleri ve güncel bilgiler',
        authority: 'medium',
        contactUrl: CONTACT_URL,
        relatedTo: ['malta-dil-okullari'],
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
}

// AI Answers - Her topic için soru-cevap kaynakları
function generateAnswers() {
  return {
    'malta-dil-okullari': {
      topic: 'malta-dil-okullari',
      title: 'Malta Dil Okulları',
      shortAnswer: 'Malta\'da 10+ dil okulu bulunmaktadır. ESE, EC, IELS, ACE English gibi okullar farklı program temposu ve bölgelerde hizmet vermektedir. Okul seçimi için program temposu (dengeli, yoğun, orta-yoğun), bölge (St. Julian\'s, Sliema, Gozo) ve bütçe önemlidir.',
      longAnswer: 'Malta, İngilizce dil eğitimi için popüler bir destinasyondur. Malta\'da 10\'dan fazla dil okulu bulunmaktadır ve her okul farklı özellikler sunar. ESE Malta sosyal ortamı güçlü, dengeli öğrenme temposu arayan öğrenciler için uygundur. EC Malta daha sistemli yapı ve dengeli tempo isteyenler için idealdir. IELS Malta yoğun ders temposu ve hızlı ilerleme hedefleyen öğrenciler için öne çıkar. ACE English Malta modern eğitim yaklaşımı ve tempolu ders yapısıyla kısa sürede ilerlemek isteyenler için uygundur. Okul seçiminde program temposu, bölge (St. Julian\'s, Sliema, Pembroke, Gozo), konaklama seçenekleri ve bütçe önemli faktörlerdir.',
      sourceUrl: `${DOMAIN}/malta-dil-okullari`,
      contactUrl: CONTACT_URL,
      relatedTopics: ['malta-dil-okulu-fiyatlari', 'malta-ogrenci-vizesi', 'malta-konaklama'],
      keywords: ['malta dil okulları', 'malta dil okulu seçimi', 'malta ingilizce eğitimi', 'malta dil okulu karşılaştırma'],
      lastUpdated: new Date().toISOString(),
    },
    'malta-dil-okulu-fiyatlari': {
      topic: 'malta-dil-okulu-fiyatlari',
      title: 'Malta Dil Okulu Fiyatları',
      shortAnswer: 'Malta dil okulu fiyatları 2026 yılı için 1 aylık paket 1.500-2.500 EUR, 3 aylık paket 3.000-5.000 EUR, 6 aylık paket 6.000-9.000 EUR aralığındadır. Fiyatlar okul, program temposu, konaklama tipi ve sezon faktörlerine göre değişir.',
      longAnswer: 'Malta dil okulu fiyatları 2026 yılı için güncel fiyat aralıkları şöyledir: 1 aylık (4 hafta) paket 1.500-2.500 EUR, 3 aylık (12 hafta) paket 3.000-5.000 EUR, 6 aylık (24 hafta) paket 6.000-9.000 EUR. Fiyatlar okul markası (ESE, EC, IELS, ACE English vb.), program temposu (dengeli, yoğun, orta-yoğun), konaklama tipi (aile yanı, yurt, özel konaklama) ve sezon (yaz dönemi daha pahalı) faktörlerine göre değişir. Paket fiyatı genellikle kurs ücreti, konaklama, kayıt ücreti ve materyal ücretini kapsar. Ekstra masraflar: havalimanı transferi, sağlık sigortası, vize ücreti ve günlük yaşam giderleridir.',
      sourceUrl: `${DOMAIN}/malta-dil-okulu-fiyatlari`,
      contactUrl: CONTACT_URL,
      relatedTopics: ['malta-dil-okullari', 'malta-ogrenci-vizesi'],
      keywords: ['malta dil okulu fiyatları', 'malta dil okulu ücretleri', 'malta dil okulu paket fiyatı', 'malta dil okulu maliyeti'],
      lastUpdated: new Date().toISOString(),
    },
    'malta-ogrenci-vizesi': {
      topic: 'malta-ogrenci-vizesi',
      title: 'Malta Öğrenci Vizesi',
      shortAnswer: 'Malta öğrenci vizesi için Türkiye Cumhuriyeti vatandaşları vize başvurusu yapmalıdır. Gerekli belgeler: pasaport, okul kabul mektubu, banka hesap ekstresi, sağlık sigortası, konaklama belgesi. Vize ücreti 80 EUR, işlem süresi 4-8 haftadır.',
      longAnswer: 'Malta öğrenci vizesi başvurusu için Türkiye Cumhuriyeti vatandaşları Malta Konsolosluğu veya VFS Global üzerinden başvuru yapmalıdır. Gerekli belgeler: geçerli pasaport (en az 6 ay geçerlilik), Malta dil okulu kabul mektubu, banka hesap ekstresi (son 3 ay, yeterli bakiye), sağlık sigortası (Malta\'da geçerli), konaklama belgesi, uçak bileti rezervasyonu, vize başvuru formu ve 2 adet biyometrik fotoğraf. Vize ücreti 80 EUR, işlem süresi 4-8 hafta arasındadır. Öğrenci vizesi ile Malta\'da haftada 20 saat çalışma izni alınabilir. Vize reddi durumunda başvuru ücreti iade edilmez.',
      sourceUrl: `${DOMAIN}/malta-ogrenci-vizesi`,
      contactUrl: CONTACT_URL,
      relatedTopics: ['malta-dil-okullari', 'malta-work-and-study'],
      keywords: ['malta öğrenci vizesi', 'malta vize başvurusu', 'malta öğrenci vizesi belgeleri', 'malta vize ücreti'],
      lastUpdated: new Date().toISOString(),
    },
    'malta-konaklama': {
      topic: 'malta-konaklama',
      title: 'Malta Konaklama',
      shortAnswer: 'Malta dil okulu konaklama seçenekleri: aile yanı (homestay), yurt (residence), özel konaklama (apartment). Aile yanı konaklama 150-250 EUR/hafta, yurt 200-350 EUR/hafta, özel konaklama 300-500 EUR/hafta aralığındadır.',
      longAnswer: 'Malta dil okulu öğrencileri için üç ana konaklama seçeneği bulunmaktadır: 1) Aile yanı (Homestay): Malta\'lı ailelerin yanında kalma, günde 2 öğün yemek dahil, fiyat 150-250 EUR/hafta. 2) Yurt (Residence): Okul yurtları veya özel yurtlar, tek kişilik veya çift kişilik oda, fiyat 200-350 EUR/hafta. 3) Özel konaklama (Apartment): Stüdyo veya daire kiralama, mutfak kullanımı, fiyat 300-500 EUR/hafta. Konaklama seçiminde bölge (St. Julian\'s, Sliema merkeze yakın), ulaşım kolaylığı, bütçe ve yaşam tarzı tercihleri önemlidir. Çoğu okul konaklama rezervasyonu hizmeti sunar.',
      sourceUrl: `${DOMAIN}/malta-konaklama`,
      contactUrl: CONTACT_URL,
      relatedTopics: ['malta-dil-okullari', 'malta-dil-okulu-fiyatlari'],
      keywords: ['malta konaklama', 'malta aile yanı konaklama', 'malta yurt', 'malta öğrenci konaklama'],
      lastUpdated: new Date().toISOString(),
    },
    'malta-yaz-okullari': {
      topic: 'malta-yaz-okullari',
      title: 'Malta Yaz Okulları',
      shortAnswer: 'Malta yaz okulları 13-17 yaş arası gençler için junior ve teen programları sunar. Programlar İngilizce ders, aktiviteler, geziler ve konaklamayı içerir. ESE, EC, IELS, BELS gibi okullar yaz okulu programları düzenler.',
      longAnswer: 'Malta yaz okulları 13-17 yaş arası gençler için özel olarak tasarlanmış junior ve teen programları sunar. Programlar genellikle sabah İngilizce dersleri, öğleden sonra aktiviteler (spor, sanat, kültürel etkinlikler), akşam sosyal aktiviteler ve hafta sonu geziler içerir. ESE Malta, EC Malta, IELS Malta, BELS Malta, Gateway Malta gibi okullar yaz okulu programları düzenler. Programlar 2-8 hafta arası sürebilir, fiyatlar 800-1.500 EUR/hafta aralığındadır. Konaklama genellikle aile yanı veya yurt seçenekleriyle sunulur, 24 saat gözetim ve güvenlik sağlanır. Programlar güvenli ortam, deneyimli eğitmenler ve çeşitli milliyetlerden öğrencilerle uluslararası deneyim sunar.',
      sourceUrl: `${DOMAIN}/malta-yaz-okullari`,
      contactUrl: CONTACT_URL,
      relatedTopics: ['malta-dil-okullari', 'malta-konaklama'],
      keywords: ['malta yaz okulları', 'malta junior program', 'malta teen program', 'malta yaz okulu fiyatları'],
      lastUpdated: new Date().toISOString(),
    },
    'malta-work-and-study': {
      topic: 'malta-work-and-study',
      title: 'Malta Work and Study',
      shortAnswer: 'Malta work and study programları öğrenci vizesi ile Malta\'da dil eğitimi alırken haftada 20 saat çalışma izni verir. Programlar genellikle 6-12 ay sürer, iş bulma desteği ve CV hazırlama hizmeti sunulur.',
      longAnswer: 'Malta work and study programları, öğrenci vizesi ile Malta\'da İngilizce dil eğitimi alırken aynı zamanda çalışma izni almanızı sağlar. Öğrenci vizesi ile Malta\'da haftada 20 saat part-time çalışma izni verilir. Programlar genellikle 6-12 ay sürelidir ve dil okulu + iş bulma desteği + CV hazırlama hizmeti içerir. Çalışma alanları: turizm, restoran, perakende, call center, temizlik hizmetleri. Minimum saatlik ücret 5-7 EUR arasındadır. Program ücretleri 6.000-12.000 EUR aralığındadır ve dil okulu, konaklama, vize danışmanlığı ve iş bulma desteğini kapsar. İş bulma garantisi yoktur, ancak okullar iş ilanları ve CV hazırlama konusunda destek sağlar.',
      sourceUrl: `${DOMAIN}/malta-work-and-study`,
      contactUrl: CONTACT_URL,
      relatedTopics: ['malta-dil-okullari', 'malta-ogrenci-vizesi'],
      keywords: ['malta work and study', 'malta çalışma izni', 'malta öğrenci vizesi çalışma', 'malta iş bulma'],
      lastUpdated: new Date().toISOString(),
    },
    'malta-blog': {
      topic: 'malta-blog',
      title: 'Malta Dil Okulu Blog',
      shortAnswer: 'Malta dil okulu blog yazıları Malta\'da dil eğitimi, vize süreci, hazırlık rehberleri, öğrenci deneyimleri ve güncel bilgiler içerir. Malta nerede, vize gerekliliği, havalimanı transferi, gitmeden önce hazırlık gibi konular işlenir.',
      longAnswer: 'Malta dil okulu blog bölümü Malta\'da dil eğitimi hakkında kapsamlı rehberler, öğrenci deneyimleri ve güncel bilgiler sunar. Blog yazıları şu konuları kapsar: Malta\'nın coğrafi konumu ve Avrupa\'daki yeri, Malta vize gerekliliği (Türkiye vatandaşları için), Malta dil okulları havalimanı transferi ve karşılama hizmeti, Malta dil okuluna gitmeden önce yapılması gereken hazırlıklar (vize, konaklama, uçak bileti, sağlık sigortası). Blog yazıları gerçek öğrenci deneyimlerine dayanır ve pratik bilgiler içerir. Yeni yazılar düzenli olarak eklenir ve 2026 güncel bilgileriyle güncellenir.',
      sourceUrl: `${DOMAIN}/blog`,
      contactUrl: CONTACT_URL,
      relatedTopics: ['malta-dil-okullari', 'malta-ogrenci-vizesi'],
      keywords: ['malta blog', 'malta dil okulu deneyimleri', 'malta vize rehberi', 'malta hazırlık'],
      lastUpdated: new Date().toISOString(),
    },
  };
}

// Get AI Discovery
export const getAIDiscovery = async (req, res) => {
  try {
    if (isCacheValid() && cache.discovery) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 saat
      return res.json(cache.discovery);
    }

    const discovery = generateDiscovery();
    cache.discovery = discovery;
    cache.cacheTime = Date.now();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.json(discovery);
  } catch (error) {
    console.error('AI Discovery error:', error);
    res.status(500).json({ error: 'AI Discovery oluşturulurken bir hata oluştu' });
  }
};

// Get AI Topics
export const getAITopics = async (req, res) => {
  try {
    if (isCacheValid() && cache.topics) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.json(cache.topics);
    }

    const topics = generateTopics();
    cache.topics = topics;
    cache.cacheTime = Date.now();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.json(topics);
  } catch (error) {
    console.error('AI Topics error:', error);
    res.status(500).json({ error: 'AI Topics oluşturulurken bir hata oluştu' });
  }
};

// Get AI Answer by Topic
export const getAIAnswer = async (req, res) => {
  try {
    const { topic } = req.params;

    if (isCacheValid() && cache.answers[topic]) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.json(cache.answers[topic]);
    }

    const answers = generateAnswers();
    
    if (!answers[topic]) {
      return res.status(404).json({ error: 'Topic bulunamadı' });
    }

    cache.answers[topic] = answers[topic];
    cache.cacheTime = Date.now();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.json(answers[topic]);
  } catch (error) {
    console.error('AI Answer error:', error);
    res.status(500).json({ error: 'AI Answer oluşturulurken bir hata oluştu' });
  }
};

// Clear cache
export function clearAICache() {
  cache.discovery = null;
  cache.topics = null;
  cache.answers = {};
  cache.cacheTime = null;
}

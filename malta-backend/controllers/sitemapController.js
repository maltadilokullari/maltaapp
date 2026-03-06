import { getSEOCollection } from '../db/mongodb.js';
import config from '../config/env.js';

// In-memory cache (production'da Redis kullanılabilir)
const cache = {
  sitemapIndex: null,
  sitemapPages: null,
  sitemapPosts: null,
  sitemapServices: null,
  cacheTime: null,
  CACHE_DURATION: 12 * 60 * 60 * 1000, // 12 saat (milisaniye)
};

const DOMAIN = 'https://maltadilokuluingilizce.com';

// Statik sayfalar listesi
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/iletisim', priority: '0.8', changefreq: 'monthly' },
  { path: '/biz-kimiz', priority: '0.7', changefreq: 'monthly' },
  { path: '/gizlilik-politikasi', priority: '0.6', changefreq: 'monthly' },
  { path: '/kvkk', priority: '0.6', changefreq: 'monthly' },
  { path: '/malta-dil-okullari', priority: '0.9', changefreq: 'weekly' },
  { path: '/malta-dil-okulu-fiyatlari', priority: '0.9', changefreq: 'weekly' },
  { path: '/malta-konaklama', priority: '0.8', changefreq: 'weekly' },
  { path: '/malta-ogrenci-vizesi', priority: '0.8', changefreq: 'weekly' },
  { path: '/malta-yaz-okullari', priority: '0.8', changefreq: 'weekly' },
  { path: '/malta-yaz-okulu', priority: '0.8', changefreq: 'weekly' },
  { path: '/malta-work-and-study', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
];

// Blog postları (mockPosts'dan - gerçek uygulamada veritabanından gelecek)
const BLOG_POSTS = [
  { slug: 'malta-nerede', publishedAt: '2026-01-20' },
  { slug: 'malta-vize-istiyor-mu', publishedAt: '2026-01-22' },
  { slug: 'malta-dil-okullari-havalimani-transfer', publishedAt: '2026-01-25' },
  { slug: 'malta-dil-okulu-gitmeden-once-hazirlik', publishedAt: '2026-01-28' },
];

// Okul sayfaları (schools.ts'den - gerçek uygulamada veritabanından gelecek)
const SCHOOL_SLUGS = [
  'ese-malta',
  'ec-malta',
  'iels-malta',
  'ace-english-malta',
  'am-language-malta',
  'clubclass-malta',
  'gateway-malta',
  'inlingua-malta',
  'atlas-malta',
  'bels-malta',
];

// Özel okul sayfaları (alt route'lar)
const SPECIAL_SCHOOL_PAGES = [
  'ese-malta',
  'ec-malta',
  'ace-english-malta',
  'am-language-malta',
  'atlas-malta',
  'bels-malta',
  'clubclass-malta',
  'gateway-malta',
  'iels-malta',
  'inlingua-malta',
];

// Cache kontrolü
function isCacheValid() {
  if (!cache.cacheTime) return false;
  return Date.now() - cache.cacheTime < cache.CACHE_DURATION;
}

// Cache'i temizle
export function clearSitemapCache() {
  cache.sitemapIndex = null;
  cache.sitemapPages = null;
  cache.sitemapPosts = null;
  cache.sitemapServices = null;
  cache.cacheTime = null;
}

// SEO verilerinden noindex kontrolü
async function isPageIndexable(path) {
  try {
    const collection = await getSEOCollection();
    const seo = await collection.findOne({ page: path === '/' ? '/' : path });
    
    if (!seo) return true; // SEO verisi yoksa indexable
    if (!seo.isActive) return false; // SEO aktif değilse noindex
    if (seo.robots && seo.robots.index === false) return false; // robots.index false ise noindex
    if (seo.markedAs404) return false; // 404 olarak işaretlenmişse noindex
    
    return true;
  } catch (error) {
    console.error('SEO check error:', error);
    return true; // Hata durumunda indexable kabul et
  }
}

// URL normalizasyonu (trailing slash, canonical kontrolü)
function normalizeUrl(path) {
  // Trailing slash ekle (root hariç)
  if (path !== '/' && !path.endsWith('/')) {
    path = path + '/';
  }
  // Root için trailing slash kaldır
  if (path === '/') {
    return DOMAIN + path;
  }
  return DOMAIN + path;
}

// Sitemap URL entry oluştur
function createSitemapUrl(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Sitemap Pages oluştur
async function generateSitemapPages() {
  const urls = [];
  const now = new Date().toISOString().split('T')[0];

  for (const page of STATIC_PAGES) {
    const isIndexable = await isPageIndexable(page.path);
    if (!isIndexable) continue;

    const url = normalizeUrl(page.path);
    urls.push(createSitemapUrl(url, now, page.changefreq, page.priority));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// Sitemap Posts oluştur
async function generateSitemapPosts() {
  const urls = [];
  const now = new Date().toISOString().split('T')[0];

  for (const post of BLOG_POSTS) {
    const path = `/blog/${post.slug}`;
    const isIndexable = await isPageIndexable(path);
    if (!isIndexable) continue;

    const url = normalizeUrl(path);
    const lastmod = post.publishedAt || now;
    urls.push(createSitemapUrl(url, lastmod, 'weekly', '0.7'));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// Sitemap Services oluştur (okul sayfaları)
async function generateSitemapServices() {
  const urls = [];
  const now = new Date().toISOString().split('T')[0];

  // Ana okul listesi sayfası
  const listPath = '/malta-dil-okullari';
  const isListIndexable = await isPageIndexable(listPath);
  if (isListIndexable) {
    const url = normalizeUrl(listPath);
    urls.push(createSitemapUrl(url, now, 'weekly', '0.9'));
  }

  // Dinamik okul detay sayfaları
  for (const slug of SCHOOL_SLUGS) {
    const path = `/malta-dil-okullari/${slug}`;
    const isIndexable = await isPageIndexable(path);
    if (!isIndexable) continue;

    const url = normalizeUrl(path);
    urls.push(createSitemapUrl(url, now, 'weekly', '0.8'));
  }

  // Özel okul sayfaları
  for (const slug of SPECIAL_SCHOOL_PAGES) {
    const path = `/malta-dil-okullari/${slug}`;
    const isIndexable = await isPageIndexable(path);
    if (!isIndexable) continue;

    const url = normalizeUrl(path);
    urls.push(createSitemapUrl(url, now, 'monthly', '0.7'));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// Sitemap Index oluştur
async function generateSitemapIndex() {
  const sitemaps = [
    { loc: `${DOMAIN}/sitemap-pages.xml`, lastmod: new Date().toISOString().split('T')[0] },
    { loc: `${DOMAIN}/sitemap-posts.xml`, lastmod: new Date().toISOString().split('T')[0] },
    { loc: `${DOMAIN}/sitemap-services.xml`, lastmod: new Date().toISOString().split('T')[0] },
  ];

  const sitemapEntries = sitemaps.map(
    (sitemap) => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

// Get Sitemap Index
export const getSitemapIndex = async (req, res) => {
  try {
    // Cache kontrolü
    if (isCacheValid() && cache.sitemapIndex) {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=43200'); // 12 saat
      return res.send(cache.sitemapIndex);
    }

    // Cache'den oku veya oluştur
    const sitemapIndex = await generateSitemapIndex();
    cache.sitemapIndex = sitemapIndex;
    cache.cacheTime = Date.now();

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=43200');
    res.send(sitemapIndex);
  } catch (error) {
    console.error('Sitemap index error:', error);
    res.status(500).send('Sitemap oluşturulurken bir hata oluştu');
  }
};

// Get Sitemap Pages
export const getSitemapPages = async (req, res) => {
  try {
    if (isCacheValid() && cache.sitemapPages) {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=43200');
      return res.send(cache.sitemapPages);
    }

    const sitemapPages = await generateSitemapPages();
    cache.sitemapPages = sitemapPages;
    cache.cacheTime = Date.now();

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=43200');
    res.send(sitemapPages);
  } catch (error) {
    console.error('Sitemap pages error:', error);
    res.status(500).send('Sitemap oluşturulurken bir hata oluştu');
  }
};

// Get Sitemap Posts
export const getSitemapPosts = async (req, res) => {
  try {
    if (isCacheValid() && cache.sitemapPosts) {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=43200');
      return res.send(cache.sitemapPosts);
    }

    const sitemapPosts = await generateSitemapPosts();
    cache.sitemapPosts = sitemapPosts;
    cache.cacheTime = Date.now();

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=43200');
    res.send(sitemapPosts);
  } catch (error) {
    console.error('Sitemap posts error:', error);
    res.status(500).send('Sitemap oluşturulurken bir hata oluştu');
  }
};

// Get Sitemap Services
export const getSitemapServices = async (req, res) => {
  try {
    if (isCacheValid() && cache.sitemapServices) {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=43200');
      return res.send(cache.sitemapServices);
    }

    const sitemapServices = await generateSitemapServices();
    cache.sitemapServices = sitemapServices;
    cache.cacheTime = Date.now();

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=43200');
    res.send(sitemapServices);
  } catch (error) {
    console.error('Sitemap services error:', error);
    res.status(500).send('Sitemap oluşturulurken bir hata oluştu');
  }
};

// Get Sitemap Statistics (Admin için)
export const getSitemapStats = async (req, res) => {
  try {
    // Cache'den sayıları hesapla
    let pagesCount = 0;
    let postsCount = 0;
    let servicesCount = 0;

    // Pages count
    for (const page of STATIC_PAGES) {
      const isIndexable = await isPageIndexable(page.path);
      if (isIndexable) pagesCount++;
    }

    // Posts count
    for (const post of BLOG_POSTS) {
      const path = `/blog/${post.slug}`;
      const isIndexable = await isPageIndexable(path);
      if (isIndexable) postsCount++;
    }

    // Services count
    const listPath = '/malta-dil-okullari';
    const isListIndexable = await isPageIndexable(listPath);
    if (isListIndexable) servicesCount++;

    for (const slug of SCHOOL_SLUGS) {
      const path = `/malta-dil-okullari/${slug}`;
      const isIndexable = await isPageIndexable(path);
      if (isIndexable) servicesCount++;
    }

    for (const slug of SPECIAL_SCHOOL_PAGES) {
      const path = `/malta-dil-okullari/${slug}`;
      const isIndexable = await isPageIndexable(path);
      if (isIndexable) servicesCount++;
    }

    const total = pagesCount + postsCount + servicesCount;

    res.json({
      success: true,
      data: {
        pages: pagesCount,
        posts: postsCount,
        services: servicesCount,
        total,
        cacheStatus: isCacheValid() ? 'active' : 'expired',
        cacheTime: cache.cacheTime ? new Date(cache.cacheTime).toISOString() : null,
      },
    });
  } catch (error) {
    console.error('Sitemap stats error:', error);
    res.status(500).json({
      success: false,
      message: 'İstatistikler getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

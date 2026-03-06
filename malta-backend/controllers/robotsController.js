import { getSitemapCollection } from '../db/mongodb.js';
import config from '../config/env.js';

const DOMAIN = 'https://maltadilokuluingilizce.com';

// Robots.txt oluştur
export const getRobots = async (req, res) => {
  try {
    // Veritabanından robots.txt ayarlarını al
    let robotsEnabled = true;
    let sitemapEnabled = true;

    try {
      const collection = await getSitemapCollection();
      const settings = await collection.findOne({ type: 'robots' });
      
      if (settings) {
        robotsEnabled = settings.enabled !== false;
        sitemapEnabled = settings.sitemapEnabled !== false;
      }
    } catch (error) {
      console.warn('Robots settings fetch error, using defaults:', error);
    }

    // Robots.txt devre dışıysa boş döndür
    if (!robotsEnabled) {
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.send('');
    }

    // Robots.txt içeriği
    let robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /panel
Disallow: /preview
Disallow: /*?*
Disallow: /*&*
`;

    // Sitemap ekle
    if (sitemapEnabled) {
      robotsContent += `\nSitemap: ${DOMAIN}/sitemap.xml\n`;
    }

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 saat
    res.send(robotsContent);
  } catch (error) {
    console.error('Robots.txt error:', error);
    res.status(500).send('Robots.txt oluşturulurken bir hata oluştu');
  }
};

// Get Robots Settings (Admin)
export const getRobotsSettings = async (req, res) => {
  try {
    const collection = await getSitemapCollection();
    const settings = await collection.findOne({ type: 'robots' });

    if (!settings) {
      return res.json({
        success: true,
        data: {
          enabled: true,
          sitemapEnabled: true,
        },
      });
    }

    res.json({
      success: true,
      data: {
        enabled: settings.enabled !== false,
        sitemapEnabled: settings.sitemapEnabled !== false,
      },
    });
  } catch (error) {
    console.error('Get robots settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Ayarlar getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

// Update Robots Settings (Admin)
export const updateRobotsSettings = async (req, res) => {
  try {
    const { enabled, sitemapEnabled } = req.body;

    const collection = await getSitemapCollection();
    
    const result = await collection.findOneAndUpdate(
      { type: 'robots' },
      {
        $set: {
          enabled: enabled !== false,
          sitemapEnabled: sitemapEnabled !== false,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      {
        upsert: true,
        returnDocument: 'after',
      }
    );

    res.json({
      success: true,
      message: 'Robots.txt ayarları başarıyla güncellendi',
      data: result.value,
    });
  } catch (error) {
    console.error('Update robots settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Ayarlar güncellenirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

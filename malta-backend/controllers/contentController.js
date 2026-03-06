import { getContentCollection, getContentVersionsCollection, getSEOCollection } from '../db/mongodb.js';
import config from '../config/env.js';
import {
  validateContent,
  sanitizeContent,
  calculateContentStats,
  ALLOWED_BLOCKS,
} from '../models/Content.js';

/**
 * Get all content (pages or posts)
 */
export const getAllContent = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;
    const collection = await getContentCollection();

    const query = {};
    if (type && ['page', 'post'].includes(type)) {
      query.type = type;
    }
    if (status && ['draft', 'published'].includes(status)) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await collection.countDocuments(query);

    const contents = await collection
      .find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    res.json({
      success: true,
      data: contents,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get all content error:', error);
    res.status(500).json({
      success: false,
      message: 'İçerikler getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Get single content by ID
 */
export const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await getContentCollection();

    const content = await collection.findOne({ _id: id });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'İçerik bulunamadı',
      });
    }

    res.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error('Get content by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'İçerik getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Get content by slug
 */
export const getContentBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const collection = await getContentCollection();

    const content = await collection.findOne({
      slug: slug.toLowerCase(),
      status: 'published',
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'İçerik bulunamadı',
      });
    }

    res.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error('Get content by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'İçerik getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Create new content
 */
export const createContent = async (req, res) => {
  try {
    const contentData = req.body;

    // Sanitize content
    const sanitized = sanitizeContent(contentData);

    // Validate content
    const validation = validateContent(sanitized);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'İçerik doğrulama hatası',
        errors: validation.errors,
      });
    }

    // Check if slug already exists
    const collection = await getContentCollection();
    const existing = await collection.findOne({
      slug: sanitized.slug.toLowerCase(),
      type: sanitized.type,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Bu slug zaten kullanılıyor',
      });
    }

    // Calculate stats
    const stats = calculateContentStats(sanitized);

    // Create content document
    const newContent = {
      ...sanitized,
      slug: sanitized.slug.toLowerCase(),
      status: sanitized.status || 'draft',
      stats,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user?.id || 'system',
    };

    // Insert content
    const result = await collection.insertOne(newContent);

    // Create initial version
    const versionsCollection = await getContentVersionsCollection();
    await versionsCollection.insertOne({
      contentId: result.insertedId,
      version: 1,
      content: newContent,
      createdAt: new Date(),
      createdBy: req.user?.id || 'system',
    });

    res.status(201).json({
      success: true,
      message: 'İçerik başarıyla oluşturuldu',
      data: {
        ...newContent,
        _id: result.insertedId,
      },
    });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({
      success: false,
      message: 'İçerik oluşturulurken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Update content
 */
export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const contentData = req.body;

    const collection = await getContentCollection();
    const existing = await collection.findOne({ _id: id });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'İçerik bulunamadı',
      });
    }

    // Sanitize content
    const sanitized = sanitizeContent(contentData);

    // Validate content
    const validation = validateContent(sanitized);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'İçerik doğrulama hatası',
        errors: validation.errors,
      });
    }

    // Check slug uniqueness (if changed)
    if (sanitized.slug && sanitized.slug.toLowerCase() !== existing.slug) {
      const slugExists = await collection.findOne({
        slug: sanitized.slug.toLowerCase(),
        type: sanitized.type,
        _id: { $ne: id },
      });

      if (slugExists) {
        return res.status(400).json({
          success: false,
          message: 'Bu slug zaten kullanılıyor',
        });
      }
    }

    // Calculate stats
    const stats = calculateContentStats(sanitized);

    // Preserve protected fields (SEO, schema, etc.)
    const updateData = {
      ...sanitized,
      slug: sanitized.slug ? sanitized.slug.toLowerCase() : existing.slug,
      stats,
      updatedAt: new Date(),
      // Preserve SEO-related fields from existing content
      canonical: existing.canonical, // READ-ONLY
      schemaType: existing.schemaType, // READ-ONLY
      sitemapStatus: existing.sitemapStatus, // READ-ONLY
      indexStatus: existing.indexStatus, // READ-ONLY
    };

    // Update content
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    // Create new version
    const versionsCollection = await getContentVersionsCollection();
    const versionCount = await versionsCollection.countDocuments({ contentId: id });
    await versionsCollection.insertOne({
      contentId: id,
      version: versionCount + 1,
      content: result.value,
      createdAt: new Date(),
      createdBy: req.user?.id || 'system',
    });

    res.json({
      success: true,
      message: 'İçerik başarıyla güncellendi',
      data: result.value,
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'İçerik güncellenirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Delete content
 */
export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await getContentCollection();

    const result = await collection.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'İçerik bulunamadı',
      });
    }

    // Also delete versions
    const versionsCollection = await getContentVersionsCollection();
    await versionsCollection.deleteMany({ contentId: id });

    res.json({
      success: true,
      message: 'İçerik başarıyla silindi',
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'İçerik silinirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Publish content
 */
export const publishContent = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await getContentCollection();

    const content = await collection.findOne({ _id: id });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'İçerik bulunamadı',
      });
    }

    // Validate before publishing
    const validation = validateContent(content);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Yayınlamadan önce içerik doğrulaması başarısız',
        errors: validation.errors,
      });
    }

    // Update status
    const result = await collection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          status: 'published',
          publishedAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    // Auto-create SEO entry if not exists
    const seoCollection = await getSEOCollection();
    const pagePath = content.type === 'page' 
      ? `/${content.slug}` 
      : `/blog/${content.slug}`;
    
    const existingSEO = await seoCollection.findOne({ page: pagePath });
    if (!existingSEO) {
      await seoCollection.insertOne({
        page: pagePath,
        title: content.title,
        description: content.excerpt || content.title,
        isActive: true,
        robots: {
          index: true,
          follow: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    res.json({
      success: true,
      message: 'İçerik başarıyla yayınlandı',
      data: result.value,
    });
  } catch (error) {
    console.error('Publish content error:', error);
    res.status(500).json({
      success: false,
      message: 'İçerik yayınlanırken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Get content versions
 */
export const getContentVersions = async (req, res) => {
  try {
    const { id } = req.params;
    const versionsCollection = await getContentVersionsCollection();

    const versions = await versionsCollection
      .find({ contentId: id })
      .sort({ version: -1 })
      .toArray();

    res.json({
      success: true,
      data: versions,
    });
  } catch (error) {
    console.error('Get content versions error:', error);
    res.status(500).json({
      success: false,
      message: 'Versiyonlar getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Restore content version
 */
export const restoreContentVersion = async (req, res) => {
  try {
    const { id, version } = req.params;
    const versionsCollection = await getContentVersionsCollection();
    const collection = await getContentCollection();

    const versionDoc = await versionsCollection.findOne({
      contentId: id,
      version: parseInt(version),
    });

    if (!versionDoc) {
      return res.status(404).json({
        success: false,
        message: 'Versiyon bulunamadı',
      });
    }

    // Restore content
    const restoredContent = {
      ...versionDoc.content,
      updatedAt: new Date(),
    };

    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: restoredContent },
      { returnDocument: 'after' }
    );

    res.json({
      success: true,
      message: 'Versiyon başarıyla geri yüklendi',
      data: result.value,
    });
  } catch (error) {
    console.error('Restore content version error:', error);
    res.status(500).json({
      success: false,
      message: 'Versiyon geri yüklenirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

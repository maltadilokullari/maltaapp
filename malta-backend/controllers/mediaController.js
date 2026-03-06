import { getMediaCollection } from '../db/mongodb.js';
import config from '../config/env.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Media upload directory
const UPLOAD_DIR = path.join(__dirname, '../../uploads/media');
const PUBLIC_DIR = path.join(__dirname, '../../public/media');

// Serve static media files
export const serveMedia = express.static(PUBLIC_DIR, {
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
});

// Ensure directories exist
(async () => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.mkdir(PUBLIC_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating media directories:', error);
  }
})();

// Multer configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).toLowerCase().replace(/[^a-z0-9]/g, '-');
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Sadece görsel dosyaları yüklenebilir (JPEG, PNG, WebP, GIF)'));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});

/**
 * Get all media
 */
export const getAllMedia = async (req, res) => {
  try {
    const { page = 1, limit = 50, type } = req.query;
    const collection = await getMediaCollection();

    const query = {};
    if (type) {
      query.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await collection.countDocuments(query);

    const media = await collection
      .find(query)
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    res.json({
      success: true,
      data: media,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get all media error:', error);
    res.status(500).json({
      success: false,
      message: 'Medya dosyaları getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Upload media
 */
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Dosya yüklenmedi',
      });
    }

    const file = req.file;
    const { alt, caption } = req.body;

    // Validate alt text (required)
    if (!alt || alt.trim().length === 0) {
      // Delete uploaded file
      await fs.unlink(file.path).catch(() => {});
      return res.status(400).json({
        success: false,
        message: 'Alt text zorunludur',
      });
    }

    // Move file to public directory
    const publicPath = `/media/${file.filename}`;
    const publicFilePath = path.join(PUBLIC_DIR, file.filename);
    
    try {
      await fs.rename(file.path, publicFilePath);
    } catch (error) {
      console.error('Error moving file:', error);
      await fs.unlink(file.path).catch(() => {});
      return res.status(500).json({
        success: false,
        message: 'Dosya kaydedilirken bir hata oluştu',
      });
    }

    // Get image dimensions (if possible)
    let width = null;
    let height = null;
    // In production, use sharp or similar library to get dimensions

    // Save to database
    const collection = await getMediaCollection();
    const mediaDoc = {
      filename: file.filename,
      originalName: file.originalname,
      path: publicPath,
      mimeType: file.mimetype,
      size: file.size,
      alt: alt.trim(),
      caption: caption ? caption.trim() : '',
      width,
      height,
      uploadedAt: new Date(),
      uploadedBy: req.user?.id || 'system',
    };

    const result = await collection.insertOne(mediaDoc);

    res.status(201).json({
      success: true,
      message: 'Medya başarıyla yüklendi',
      data: {
        ...mediaDoc,
        _id: result.insertedId,
      },
    });
  } catch (error) {
    console.error('Upload media error:', error);
    
    // Clean up file if exists
    if (req.file && req.file.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    res.status(500).json({
      success: false,
      message: 'Medya yüklenirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Update media metadata
 */
export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { alt, caption } = req.body;

    const collection = await getMediaCollection();

    if (!alt || alt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Alt text zorunludur',
      });
    }

    const result = await collection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          alt: alt.trim(),
          caption: caption ? caption.trim() : '',
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({
        success: false,
        message: 'Medya bulunamadı',
      });
    }

    res.json({
      success: true,
      message: 'Medya başarıyla güncellendi',
      data: result.value,
    });
  } catch (error) {
    console.error('Update media error:', error);
    res.status(500).json({
      success: false,
      message: 'Medya güncellenirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

/**
 * Delete media
 */
export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await getMediaCollection();

    const media = await collection.findOne({ _id: id });

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Medya bulunamadı',
      });
    }

    // Delete file
    const filePath = path.join(PUBLIC_DIR, media.filename);
    await fs.unlink(filePath).catch((error) => {
      console.warn('Error deleting file:', error);
    });

    // Delete from database
    await collection.deleteOne({ _id: id });

    res.json({
      success: true,
      message: 'Medya başarıyla silindi',
    });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({
      success: false,
      message: 'Medya silinirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined,
    });
  }
};

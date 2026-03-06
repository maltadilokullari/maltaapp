import { getSEOCollection } from '../db/mongodb.js';
import config from '../config/env.js';

// Get SEO data for a page
export const getSEOByPage = async (req, res) => {
  try {
    const { page } = req.params;
    const collection = await getSEOCollection();
    const seo = await collection.findOne({ 
      page: page.toLowerCase(), 
      isActive: true 
    });

    if (!seo) {
      return res.status(404).json({
        success: false,
        message: 'SEO verisi bulunamadı'
      });
    }

    res.json({
      success: true,
      data: seo
    });
  } catch (error) {
    console.error('Get SEO error:', error);
    res.status(500).json({
      success: false,
      message: 'SEO verisi getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Get all SEO data (for admin)
export const getAllSEO = async (req, res) => {
  try {
    const collection = await getSEOCollection();
    const seos = await collection.find({}).sort({ page: 1 }).toArray();
    
    res.json({
      success: true,
      data: seos
    });
  } catch (error) {
    console.error('Get all SEO error:', error);
    res.status(500).json({
      success: false,
      message: 'SEO verileri getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Create or update SEO data
export const createOrUpdateSEO = async (req, res) => {
  try {
    const { page } = req.params;
    const seoData = req.body;
    const pageLower = page.toLowerCase();

    const collection = await getSEOCollection();
    
    const updateData = {
      ...seoData,
      page: pageLower,
      updatedAt: new Date()
    };

    // Upsert işlemi
    const result = await collection.findOneAndUpdate(
      { page: pageLower },
      { 
        $set: updateData,
        $setOnInsert: { createdAt: new Date() }
      },
      { 
        upsert: true,
        returnDocument: 'after'
      }
    );

    res.json({
      success: true,
      message: 'SEO verisi başarıyla kaydedildi',
      data: result.value
    });
  } catch (error) {
    console.error('Create/Update SEO error:', error);
    res.status(500).json({
      success: false,
      message: 'SEO verisi kaydedilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Delete SEO data
export const deleteSEO = async (req, res) => {
  try {
    const { page } = req.params;
    const collection = await getSEOCollection();
    const result = await collection.deleteOne({ page: page.toLowerCase() });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'SEO verisi bulunamadı'
      });
    }

    res.json({
      success: true,
      message: 'SEO verisi başarıyla silindi'
    });
  } catch (error) {
    console.error('Delete SEO error:', error);
    res.status(500).json({
      success: false,
      message: 'SEO verisi silinirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

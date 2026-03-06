import { getFormSubmissionsCollection } from '../db/mongodb.js';
import config from '../config/env.js';
import { ObjectId } from 'mongodb';

// Create form submission
export const createFormSubmission = async (req, res) => {
  try {
    const { fullName, phone, email, duration, when, source, privacyAccepted, kvkkRead } = req.body;

    // Get IP address and user agent
    const ipAddress = req.ip || req.connection.remoteAddress || '';
    const userAgent = req.get('user-agent') || '';

    const formSubmission = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      duration: duration || '',
      when: when || '',
      source: source || 'other',
      privacyAccepted: privacyAccepted || false,
      kvkkRead: kvkkRead || false,
      ipAddress,
      userAgent,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const collection = await getFormSubmissionsCollection();
    const result = await collection.insertOne(formSubmission);

    res.status(201).json({
      success: true,
      message: 'Form başarıyla gönderildi',
      data: {
        id: result.insertedId,
        fullName: formSubmission.fullName,
        email: formSubmission.email
      }
    });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Form gönderilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Get all form submissions (for admin)
export const getAllFormSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const collection = await getFormSubmissionsCollection();
    
    const submissions = await collection
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments();

    res.json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Form kayıtları getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Get single form submission
export const getFormSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Geçersiz ID formatı'
      });
    }

    const collection = await getFormSubmissionsCollection();
    const submission = await collection.findOne({ _id: new ObjectId(id) });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Form kaydı bulunamadı'
      });
    }

    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Form kaydı getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Delete form submission
export const deleteFormSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Geçersiz ID formatı'
      });
    }

    const collection = await getFormSubmissionsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Form kaydı bulunamadı'
      });
    }

    res.json({
      success: true,
      message: 'Form kaydı başarıyla silindi'
    });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Form kaydı silinirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Get statistics
export const getFormStatistics = async (req, res) => {
  try {
    const collection = await getFormSubmissionsCollection();
    
    const total = await collection.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await collection.countDocuments({ createdAt: { $gte: today } });
    
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    const thisMonthCount = await collection.countDocuments({ createdAt: { $gte: thisMonth } });

    const sourceStats = await collection.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    res.json({
      success: true,
      data: {
        total,
        today: todayCount,
        thisMonth: thisMonthCount,
        bySource: sourceStats
      }
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'İstatistikler getirilirken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

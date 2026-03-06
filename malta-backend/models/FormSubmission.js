import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  duration: {
    type: String,
    enum: ['2-4-hafta', '5-8-hafta', '9-12-hafta', '13-24-hafta', '25-hafta-ve-uzeri', ''],
    default: ''
  },
  when: {
    type: String,
    enum: ['hemen', '1-3-ay', '3-6-ay', '6-ay-ve-uzeri', ''],
    default: ''
  },
  source: {
    type: String,
    enum: ['hero', 'contact-page', 'blog-sidebar', 'other'],
    default: 'other'
  },
  privacyAccepted: {
    type: Boolean,
    required: true,
    default: false
  },
  kvkkRead: {
    type: Boolean,
    required: true,
    default: false
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
formSubmissionSchema.index({ createdAt: -1 });
formSubmissionSchema.index({ email: 1 });

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

export default FormSubmission;

import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  keywords: {
    type: [String],
    default: []
  },
  canonical: {
    type: String,
    trim: true
  },
  ogTitle: {
    type: String,
    trim: true
  },
  ogDescription: {
    type: String,
    trim: true
  },
  ogImage: {
    type: String,
    trim: true
  },
  ogUrl: {
    type: String,
    trim: true
  },
  twitterTitle: {
    type: String,
    trim: true
  },
  twitterDescription: {
    type: String,
    trim: true
  },
  twitterImage: {
    type: String,
    trim: true
  },
  schemaMarkup: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  robots: {
    index: {
      type: Boolean,
      default: true
    },
    follow: {
      type: Boolean,
      default: true
    },
    maxImagePreview: {
      type: String,
      enum: ['none', 'standard', 'large'],
      default: 'large'
    },
    maxSnippet: {
      type: Number,
      default: -1
    },
    maxVideoPreview: {
      type: Number,
      default: -1
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
seoSchema.index({ page: 1 });
seoSchema.index({ isActive: 1 });

const SEO = mongoose.model('SEO', seoSchema);

export default SEO;

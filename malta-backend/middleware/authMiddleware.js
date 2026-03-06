import config from '../config/env.js';

// Simple auth middleware (for now)
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (token === config.staticToken) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'Yetkilendirme gerekli'
    });
  }
};

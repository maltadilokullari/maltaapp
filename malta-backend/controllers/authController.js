import config from '../config/env.js';

// Admin credentials from environment variables
const ADMIN_CREDENTIALS = {
  username: config.adminUsername,
  password: config.adminPassword
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // In production, use JWT tokens
      res.json({
        success: true,
        message: 'Giriş başarılı',
        data: {
          username: ADMIN_CREDENTIALS.username,
          token: config.staticToken // Replace with JWT in production
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Kullanıcı adı veya şifre hatalı'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Giriş yapılırken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

// Verify token (simple check for now)
export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const validToken = process.env.STATIC_TOKEN || 'static-token-for-now';

    if (token === validToken) {
      res.json({
        success: true,
        message: 'Token geçerli'
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Token geçersiz'
      });
    }
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({
      success: false,
      message: 'Token doğrulanırken bir hata oluştu',
      error: config.isDevelopment() ? error.message : undefined
    });
  }
};

import express from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export const authRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dooroomi_super_secret_jwt_key_2026';
const EXPECTED_USER = process.env.ADMIN_USERNAME || 'dooroomi';
const EXPECTED_PASS = process.env.ADMIN_PASSWORD || 'dooroomi@123';

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // Clean inputs
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Verify against required credentials: dooroomi / dooroomi@123
    const isValid = (cleanUser === EXPECTED_USER.toLowerCase() && cleanPass === EXPECTED_PASS);

    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid administrator credentials. Access restricted to authorized personnel.' 
      });
    }

    // Ensure admin document exists in MongoDB Atlas
    try {
      let admin = await Admin.findOne({ username: EXPECTED_USER });
      if (!admin) {
        admin = await Admin.create({
          username: EXPECTED_USER,
          password: cleanPass, // In production could be hashed
          name: 'Dooroomi Global Administrator',
          role: 'admin',
          lastLogin: new Date()
        });
      } else {
        admin.lastLogin = new Date();
        await admin.save();
      }
    } catch (dbErr) {
      console.warn('MongoDB admin sync notice (continuing auth):', dbErr.message);
    }

    // Generate JWT Token (valid for 7 days)
    const token = jwt.sign(
      { username: EXPECTED_USER, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Authentication successful. Welcome to Dooroomi Admin Portal.',
      token,
      user: {
        username: EXPECTED_USER,
        role: 'admin',
        name: 'Dooroomi Global Administrator'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error during authentication' 
    });
  }
});

// GET /api/auth/verify
authRouter.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No authorization token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({
      success: true,
      valid: true,
      user: decoded
    });
  } catch (err) {
    return res.status(401).json({ success: false, valid: false, message: 'Invalid or expired token' });
  }
});

// Middleware for verifying admin token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};


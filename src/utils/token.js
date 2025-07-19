const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const ACCESS_TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRES_IN || '24h';

// 🔐 Generate Access Token (for auth header)
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.type, name: `${user.firstName} ${user.lastName}` },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

// 🔁 Generate Refresh Token (for renewing access token)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
};

// 🔍 Verify Access Token
const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// 🔍 Verify Refresh Token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

// Function to generate random password
const generateRandomPassword = (length = 12) => {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
}

module.exports = {generateToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, generateRandomPassword, hashPassword, verifyPassword};

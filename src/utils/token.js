const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

module.exports = {generateToken, generateRandomPassword, hashPassword, verifyPassword};

const User = require("../models/userModel");
const TOKEN_DATA = require("../utils/token");

const loginUser = async (req, res) => {
  const { email, password, encryptedIv, encryptedKey } = req.body;

  try {
    const user = await User.findOne({ email });
    const isMatch = await TOKEN_DATA.verifyPassword(password, user.password);
    if (!user || !isMatch) {
      // In a real app, hash the password
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = TOKEN_DATA.generateToken(user);
    const refreshToken = TOKEN_DATA.generateRefreshToken(user);
    res.status(200).json({ token, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: 'Missing refresh token' });

  try {
    const decoded = TOKEN_DATA.verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = TOKEN_DATA.generateToken(user);
    const refreshToken = TOKEN_DATA.generateRefreshToken(user);
    res.status(200).json({ token, refreshToken});

  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

module.exports = { loginUser, refreshTokenHandler };

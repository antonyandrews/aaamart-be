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

    const token = TOKEN_DATA.generateToken(user._id);
    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser };

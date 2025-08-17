const express = require("express");
const { loginUser, refreshTokenHandler } = require("../controllers/authController");
const { paramsDecryptionMiddleware } = require("../middleware/paramsDecryption");
const { googleAuth } = require("../controllers/oAuthController");
const path = require('path');
const fs = require('fs');

const router = express.Router();

// GET public key
router.get("/public-key", (req, res) => {
  const pubKey = fs.readFileSync(path.join(__dirname, '../utils/public.pem'), 'utf8');
  res.send({ secLog: pubKey });
});

router.route("/login").post(paramsDecryptionMiddleware, loginUser);
router.route("/refresh-token").post(refreshTokenHandler);
router.route("/google/token").post(googleAuth);

module.exports = router;
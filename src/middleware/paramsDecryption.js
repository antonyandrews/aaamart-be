const { decryptAES, decryptRSA } = require('../utils/crypto');

function paramsDecryptionMiddleware(req, res, next) {
  try {
    const encryptedFields = ['email', 'password'];

    // Handle query param decryption (optional usage)
    if (req.query) {
      encryptedFields.forEach((field) => {
        if (req.query[field] && req.query[`${field}Iv`] && req.query['encryptedKey']) {
          const aesKey = decryptRSA(req.query['encryptedKey']);
          const iv = decryptRSA(req.query[`${field}Iv`]);
          req.query[field] = decryptAES(req.query[field], aesKey, iv);
        }
      });
    }

    // Handle body decryption
    if (req.body && req.body['encryptedKey'] && req.body['encryptedIv']) {
      const aesKey = decryptRSA(req.body['encryptedKey']);
      const iv = decryptRSA(req.body['encryptedIv']);

      encryptedFields.forEach((field) => {
        if (req.body[field]) {
          req.body[field] = decryptAES(req.body[field], aesKey, iv);
        }
      });
    }
console.log('req.body', req.body);
    next(); // Ensure this is called only once after all decryption
  } catch (error) {
    console.error('Decryption middleware error:', error);
    res.status(400).json({ message: 'Invalid encrypted data', error: error.message });
  }
}

module.exports = { paramsDecryptionMiddleware };

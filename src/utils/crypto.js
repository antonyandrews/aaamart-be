const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const algorithm = 'aes-256-cbc';

function generateAESKeyIV() {
  const key = crypto.randomBytes(32); // 256-bit
  const iv = crypto.randomBytes(16);  // 128-bit
  return { key, iv };
}

function encryptAES(data, key, iv) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptAES(ciphertextHex, key, iv) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(ciphertextHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function decryptRSA(encryptedHex) {
  const privateKey = fs.readFileSync(path.join(__dirname, 'private.pem'), 'utf8');
  const buffer = Buffer.from(encryptedHex, 'hex');
  return crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256", // This must match Angular
    },
    buffer
  );
}

module.exports = {
  generateAESKeyIV,
  encryptAES,
  decryptAES,
  decryptRSA,
};

# 🔐 AAA Secure Backend (Express.js)

This backend powers the **AAA E-Commerce Application**, developed using **Express.js**. It securely handles sensitive operations like **Login** and **Signup** by leveraging **AES + RSA encryption**, modular middleware, and secure request parsing.

---

## 🚀 Features

- ✅ Express 5 with modern routing
- 🔐 AES + RSA hybrid encryption for secure communication
- 🧱 Modular middleware for decryption and logging
- 📜 Request validation and error handling
- 📁 Clean and scalable folder structure
- 📄 Logs API failures from Angular frontend
- 🔒 RSA PEM key management

---

## 📁 Project Structure

express-backend/
├── middleware/
│ └── decryption.middleware.js # Decrypt AES-encrypted payloads
├── routes/
│ └── auth.route.js # Handles login/signup APIs
├── utils/
│ └── crypto.js # AES + RSA helper functions
├── logs/
│ └── frontend-error.log # Captures frontend error logs
├── keys/
│ ├── private.pem # RSA private key
│ └── public.pem # RSA public key
├── server.js # Entry point
└── package.json


---

## 🔑 Setting up RSA PEM Keys

> Required for hybrid AES+RSA encryption

# **Generate RSA Keys**:

openssl genrsa -out keys/private.pem 2048
openssl rsa -in keys/private.pem -outform PEM -pubout -out keys/public.pem

# 🧠 Encryption Logic

🔐 Hybrid Encryption (AES + RSA)
 - Frontend encrypts email and password using AES.
 - The AES key and IV are encrypted using RSA public key.
 - Backend decrypts using RSA private key, then decodes actual data via AES.
 
## 🧩 Middleware

# 🛡️ paramsDecryptionMiddleware
 - Automatically decrypts specific fields from query or body before reaching the controller.
 - In this middleware we need to add the encrypted key name in an array which decrypts whenever the endpoint hits the backend.

## 🐞 Frontend Log Collection API
 - Added api to log issues raised in FE for quick review and issue fixing.

## ⚙️ Running the App
# Install dependencies
   npm install

# Start the server
   npm start

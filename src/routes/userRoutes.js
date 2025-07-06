const express = require("express");
const { getAllUsers, createUser, getUserById } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const { paramsDecryptionMiddleware } = require("../middleware/paramsDecryption");

const router = express.Router();

router.route("/").get(authMiddleware, getAllUsers).post(paramsDecryptionMiddleware, createUser);
router.route("/find-by-email").post(authMiddleware, getUserById);

module.exports = router;

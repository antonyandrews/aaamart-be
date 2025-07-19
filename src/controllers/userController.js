const { STATIC_TEXTS } = require("../constants/emailConstants");
const {
  fetchAllUsers,
  addUser,
  fetchUserById,
} = require("../services/userService");
const { sendEmail } = require("../utils/emailUtils");
const { generateRandomPassword, hashPassword } = require("../utils/token");
const fs = require("fs");
const path = require("path");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, firstName, lastName, type } = req.body;

    // Generate and hash password
    const randomPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(randomPassword);

    // Create new user
    await addUser({ email, firstName, lastName, password: hashedPassword, type });

    // Load the HTML template
    const templatePath = path.join(__dirname, "../templates/registerSuccess.html");
    let emailContent = fs.readFileSync(templatePath, "utf8");
    // Replace placeholders with dynamic values
    emailContent = emailContent.replace(
      "&lt;random password&gt;",
      randomPassword
    );
    
    await sendEmail(
      email,
      STATIC_TEXTS.registerSuccessMessage,
      emailContent
    );
    res.status(201).json({ message: "User Created Successfuly" });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await fetchUserById(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, createUser, getUserById };

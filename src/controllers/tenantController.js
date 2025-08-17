const fs = require("fs");
const path = require("path");
const { generateRandomPassword, hashPassword } = require("../utils/token");
const { addUser } = require("../services/userService");


const createTenant = async (req, res, next) => {
  try {
    const { email, firstName, lastName, type } = req.body;

    // Generate and hash password
    const randomPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(randomPassword);

    // Create new user
    const tenantUser = await addUser({ email, firstName, lastName, password: hashedPassword, type });

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
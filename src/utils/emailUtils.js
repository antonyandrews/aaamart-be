const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or your email service (e.g., Outlook, Yahoo, etc.)
  auth: {
    user: "aaagroupsinfra@gmail.com", // Your email address
    pass: "whyiuovrtlibesvs", // Your email password or app password
  },
});

// Send email function
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "aaagroupsinfra@gmail.com", // Sender's email address
      to, // Receiver's email address
      subject, // Email subject
      html: text, // Email content
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Email could not be sent');
  }
};

module.exports = { sendEmail };

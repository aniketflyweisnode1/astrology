require('dotenv').config();

module.exports = {
  allowedOrigins: ['http://localhost:3000/'],
  JWT_SECRET: 'thisIskey',
  OTP_LENGTH: 5,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
  },
  MAIL_SETTINGS: {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    // service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};

const nodemailer = require('nodemailer');
const { MAIL_SETTINGS } = require('../constants/constants');
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

module.exports.sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to, // list of receivers
      subject: 'Welcome', // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome Please verify.</h2>
        <p style="margin-bottom: 30px;">Here is your OTP</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};


module.exports.forgotPassword = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to, // list of receivers
      subject: 'Forgot Password', // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Here is your reset link.</h2>
        <p style="margin-bottom: 30px;">Here is your OTP</p>
        <a href="http://localhost:5000/auth/reset/${params.OTP}" style="font-size: 20px; letter-spacing: 2px; text-align:center;">Reset Link</a>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};

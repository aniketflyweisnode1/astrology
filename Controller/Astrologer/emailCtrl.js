const nodemailer = require("nodemailer");

function sendEmail(data) {
  // Create a new SMTP transport object.
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "darryl.ryan9@ethereal.email",
      pass: "J1Rx6uFcCh5jHFYDSd",
    },
  });

  // Send the email.
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

/////////////////////////////////////////////// Send OTP ON NUMBER //////////////////////////////////

const sendOTP = (phoneNumber, otp) => {
  const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
  const authToken = "YOUR_TWILIO_AUTH_TOKEN";
  const twilioPhoneNumber = "YOUR_TWILIO_PHONE_NUMBER";

  const client = twilio(accountSid, authToken);
  return client.messages.create({
    body: `Your OTP is ${otp}`,
    from: twilioPhoneNumber,
    to: phoneNumber,
  });
};

module.exports = { sendEmail, sendOTP };

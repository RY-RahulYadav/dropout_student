const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require("dotenv").config();

// OAuth2 setup
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // ClientID
  process.env.CLIENT_SECRET, // Client Secret
  process.env.REDIRECT_URI // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN // Refresh Token
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL, // Your email address
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token, // Access token from OAuth2 client
      },
    });

    const mailOptions = {
      from: `no.reply@gmail.com`,
      to: to,
      subject: subject,
      text: text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
const nodemailer = require('nodemailer');

const config = require('../config');

/**
 * Function to send emails
 * @param {string} to destinatary
 * @param {string} subject message subject
 * @param {string} text message
 * @return {funtciont} callback
 */
const sendEmail = (to, subject, text) => {
  const client = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: config.mailer.auth.user,
      pass: config.mailer.auth.pass,
    },
  });

  // Email options
  const mailOptions = {
    from: config.mailer.from, to, subject, text,
  };

  // Sending email
  return client.sendMail(mailOptions, ((err) => {
    if (err) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }));
};

module.exports = {
  sendEmail,
};

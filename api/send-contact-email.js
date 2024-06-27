const nodemailer = require("nodemailer");
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASS = process.env.EMAIL_PASS;
const WEBSITE_URL = process.env.LOCAL_DOMAIN;
const THEME_COLOR = process.env.THEME_MAIN;

module.exports = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const subject = "AG Mastering Contact Submission";
    const userHTML = `
    <p>Hi ${name},</p>
    <p>Your message below has been submitted and I will get back to you with a response soon :)</p>
    <p><i>${message}</i></p>
    <a href="${WEBSITE_URL}"
    style="background-color: ${THEME_COLOR};
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;">Back to Website</a>
  `;
    const agMasteringHTML = `
    <p>${name}, with the email, ${email} has messaged you saying:</p>
    <p><i>${message}</i></p>
  `;

    await sendEmail(email, subject, userHTML); // Email to client
    await sendEmail(EMAIL_ADDRESS, subject, agMasteringHTML); // Email to AG Mastering

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendEmail = async (email, subject, htmlContent) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL_ADDRESS, // your email address
      pass: EMAIL_PASS, // your email password
    },
  });

  // Define email options
  const mailOptions = {
    from: EMAIL_ADDRESS,
    to: email,
    subject: subject,
    html: htmlContent,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send email", error);
  }
};

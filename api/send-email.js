// api/send-email.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { to, subject, text } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail", // use your email service
      auth: {
        user: process.env.REACT_APP_EMAIL_ADDRESS, // your email address
        pass: process.env.EMAIL_PASS, // your email password
      },
    });

    // Define email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to send email", details: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

// api/send-email.js
const nodemailer = require("nodemailer");
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASS = process.env.EMAIL_PASS;

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { to, subject, text } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: EMAIL_ADDRESS, // your email address
        pass: EMAIL_PASS, // your email password
      },
    });

    // Define email options
    let mailOptions = {
      from: EMAIL_ADDRESS,
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

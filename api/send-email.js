// api/send-email.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { to, subject, text } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.REACT_APP_EMAIL_ADDRESS, // your email address
        pass: process.env.EMAIL_PASS, // your email password
      },
    });

    // Define email options
    let mailOptions = {
      from: process.env.REACT_APP_EMAIL_ADDRESS,
      to: to,
      subject: subject,
      text: text,
    };

    // Send the email
    try {
      res.status(201).json({ message: "Start Email send" });
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to send email", details: error.message });
    }

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   auth: {
    //     user: process.env.REACT_APP_EMAIL_ADDRESS,
    //     pass: process.env.EMAIL_PASS,
    //   },
    //   tls: {
    //     rejectUnauthorized: false, // Accept self-signed certificates
    //   },
    // });

    // Email message options
    // const mailOptions = {
    //   from: process.env.REACT_APP_EMAIL_ADDRESS, // Sender address
    //   to: to, // Enquiree email address
    //   subject: subject, // Subject line
    //   html: htmlContent,
    // };

    // try {
    //   const info = await transporter.sendMail(mailOptions);
    //   console.log("Email sent:", info.response);
    // } catch (error) {
    //   console.error("Error occurred while sending email:", error);
    // }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

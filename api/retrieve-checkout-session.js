const stripe = require("stripe")(process.env.STRIPE_SK_TEST);
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASS = process.env.EMAIL_PASS;

module.exports = async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const formData = JSON.parse(session.metadata.formData);
    await sendEmail(formData);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendEmail = async (formData) => {
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
    to: formData.email,
    subject: subject,
    html: htmlContent,
  };

  // Send the email
  try {
    // await transporter.sendMail(mailOptions);
    // res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};

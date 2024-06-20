// api/create-checkout-session.js
// const stripe = require("stripe")(process.env.STRIPE_PK_TEST);s

// Helper function to create a Stripe Checkout Session
const createCheckoutSession = async (paymentMethodId, amount, paymentService) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      payment_intent_data: {
        payment_method: paymentMethodId,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: paymentService,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL}`,
    });
    return session;
  } catch (error) {
    throw new Error(`Error creating Checkout Session: ${error.message}`);
  }
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { paymentMethodId, quote, service } = req.body;
  const amount = quote * 100; // Get amount in cents

  let paymentService = "";
  switch (service) {
    case "mixing":
      paymentService = "Mixing";
      break;
    case "mastering":
      paymentService = "Mastering";
      break;
    case "mix_master":
      paymentService = "Mix & Master";
      break;
    default:
      res.status(400).json({ message: "Invalid service type" });
      return;
  }

  try {
    const session = await createCheckoutSession(paymentMethodId, amount, paymentService);
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Error creating checkout session", error: error.message });
  }
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { paymentMethodId, quote, service, to, formData } = req.body;

  processPayment(paymentMethodId, quote, service);
};


const processPayment = async (paymentMethodId, quote, service) => {
  const amount = quote * 100; // Get amount in cents

  let paymentService = "";
  if (service === "mixing") {
    paymentService = "Mixing";
  } else if (service === "mastering") {
    paymentService = "Mastering";
  } else {
    paymentService = "Mix & Master";
  }

  try {
    // Create a PaymentIntent on the backend
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: amount,
      currency: "usd",
      description: paymentService,
      confirmation_method: "manual",
      confirm: true,
      return_url: `https://agmastering-git-master-alex-gearys-projects.vercel.app/payment-success`,
    });

    // Handle payment success or failure
    if (paymentIntent.status === "succeeded") {
      res.status(200).json({ message: "Payment succeeded" });
    } else {
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Error on process-payment", error: error });
  }
};

const sendEmail = async (toEmail, subject, htmlContent) => {
  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  });

  // Email message options
  const mailOptions = {
    from: websiteEmailAddress, // Sender address
    to: toEmail, // Enquiree email address
    subject: subject, // Subject line
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
  }
};

const sendEmail2 = async () => {
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
      html: htmlContent,
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


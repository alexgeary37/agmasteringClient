const stripe = require("stripe")(process.env.STRIPE_SK_TEST);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { priceId, description, formData } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.YOUR_DOMAIN}/payment-failed`,
      // Pass data through checkout process to retrieve back in app afterwards
      metadata: {
        description: description,
        formData: JSON.stringify(formData),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

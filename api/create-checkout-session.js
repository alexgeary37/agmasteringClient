const stripe = require("stripe")(process.env.STRIPE_SK_LIVE);
const WEBSITE_URL = process.env.LIVE_DOMAIN;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { items, service, formData } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: item.unit_amount,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      customer_email: formData.email,
      success_url: `${WEBSITE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${WEBSITE_URL}/start-a-project/${service}`,
      // Pass data through checkout process to retrieve back in app afterwards
      metadata: {
        service: service,
        formData: JSON.stringify(formData),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

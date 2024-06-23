const stripe = require("stripe")(process.env.STRIPE_SK_TEST);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { items, service, formData } = req.body;

  console.log("BEFORE");

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
      success_url: `${process.env.LOCAL_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.LOCAL_DOMAIN}/payment-failed`,
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

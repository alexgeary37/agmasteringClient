const stripe = require("stripe")(process.env.STRIPE_SK_TEST);

module.exports = async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

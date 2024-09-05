const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  const { sessionId } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    res.status(200).json({
      session,
      lineItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

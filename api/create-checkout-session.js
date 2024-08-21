// File: /api/create-checkout-session.js

const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { items } = req.body; // Assume items array comes from the client
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name + " : " + item.size,
            },
            unit_amount: item.price,
          },
          quantity: 1,
        })),
        mode: "payment",
        success_url: "https://newgenfashion.vercel.app/success",
        cancel_url: "https://newgenfashion.vercel.app/basket",
      });
      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any non-POST requests
    res.status(405).send("Method Not Allowed");
  }
};

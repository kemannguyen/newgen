const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const STRIPE_SECRET = process.env.STRIPE_SECRET;

const stripe = require("stripe")(STRIPE_SECRET);

app.use(express.json());
app.use(cors());
console.log(STRIPE_SECRET);
app.post("/api/create-checkout-session", async (req, res) => {
  const { items } = req.body; // Assume items array comes from the client
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: "https://newgenfashion.vercel.app/success",
      cancel_url: "https://newgenfashion.vercel.app/basket",
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(7000, () => {
  console.log("server starts");
});

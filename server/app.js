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
            name: item.name + " : " + item.size,
          },
          unit_amount: item.price,
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/order/{CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/basket",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"], // Specify allowed countries
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 500,
              currency: "usd",
            },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 2,
              },
            },
          },
        },
      ],
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(7000, () => {
  console.log("server starts");
});

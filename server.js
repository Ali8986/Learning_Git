const stripe = require("stripe")(
  "sk_test_51NaRZrFqCKOUMOaDZTDPAIcGWxXFM1HJpY2mZ4WHh7h8ZFDpwk3jC11DQKbbTqfShr3o5gppOt93HZrrNts3vm6U00LxHZ7kly"
);
const express = require("express");
const app = express();
app.use(express.json());

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  const priceId = "price_1QIVxHFqCKOUMOaDCj6PEdpN";
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });
  res.redirect(303, session.url);
});

app.post("/create-payment-intent", async (req, res) => {
  const domain = "http://localhost:3000/";
  const priceId = "price_1QIVvRFqCKOUMOaDUk7LVDGa"; // Replace this with the desired price ID

  try {
    // Fetch the price details from Stripe
    const price = await stripe.prices.retrieve(priceId);
    const product = await stripe.products.retrieve(price.product);
    const imageUrl = product.images.length > 0 ? product.images[0] : null;

    // Now you can access price and product details
    const amount = price.unit_amount; // Amount is in cents, adjust as needed
    // const currency = price.currency;

    // Create the payment intent with the fetched amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "EUR",
      payment_method_types: [
        "card",
        "ideal",
        "sepa_debit",
        "sofort",
        "bancontact",
      ],
    });

    // Send URLs and product information in response
    res.status(200).json({
      client_secret: paymentIntent.client_secret,
      success_url: `${domain}/success`,
      cancel_url: `${domain}/cancel`,
      product_name: product.name,
      product_description: product.description,
      product_price: amount / 100,
      product_image: imageUrl, // Convert from cents to main currency unit
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send("Error creating payment intent");
  }
});

app.listen(4242, () => console.log("Running on port 4242"));

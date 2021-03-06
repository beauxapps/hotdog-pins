const express = require("express");
const app = require('express')();
var cors = require('cors');
const { resolve } = require("path");
const env = require("dotenv").config({ path: "./.env" })
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(express.static("."));
//app.use(express.json());
app.use(cors());
var morgan = require('morgan')
//const bodyParser = require('body-parser');
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
var fs = require('fs')
var path = require('path')

const port = 4242
const priceInCents = 1200

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

const calculateOrderAmount = (quantity) => {
  const priceInCents = 1200
  var totalAmount = priceInCents * quantity

  return (
    totalAmount
  );

  console.log(totalAmount)
};

app.post("/create-payment-intent", express.json({type: 'application/json'}), async (req, res) => {
  const { items, quantity } = (req.body);
  console.log(req.body)
  console.log(quantity)
  const totalChargePrice = quantity.quantity * priceInCents
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(quantity.quantity),
    currency: "usd",
    metadata: {integration_check: 'accept_a_payment'},
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntentID: paymentIntent.id
  });
  console.log('creating a payment intent')
  console.log('client secret: ' + paymentIntent.client_secret)
  console.log('payment Intent ID: ' + paymentIntent.id)
});

// Match the raw body to content type application/json
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event;

  try {
    event = JSON.parse(request.body);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSuccess = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_intent.created':
      const paymentIntentCreate = event.data.object;
      console.log('PaymentIntent was created!');
      break;
    case 'charge.succeeded':
      const chargeSuccess = event.data.object;
      console.log('Charge succeeded!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});

app.listen(port, () => console.log(`Hotdog pins is listening at http://localhost:${port}`))

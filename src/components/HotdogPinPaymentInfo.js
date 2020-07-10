import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import '../App.css';
import BillingDetailsFields from "./HotdogPinCustomerInfo.js"


export default function HodogPinPaymentInfo({quantity}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentID, setPaymentIntentID] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  // scratch: const stripeChargeTotal = (quantity * 1200)

  const webhookTest = () => {
    fetch("http://localhost:4242/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [{ id: "hotdogpin" }],
        quantity: {quantity},
        paymentIntentID: {paymentIntentID}
      })
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      setClientSecret(data.clientSecret);
      setPaymentIntentID(data.id);
    });
  }

  const updatePaymentIntent = () => {
    fetch("http://localhost:4242/update-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [{ id: "hotdogpin" }],
        quantity: {quantity},
        paymentIntentID: {paymentIntentID}
      })
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      setClientSecret(data.clientSecret);
      setPaymentIntentID(data.id);
    });
}

const createPaymentIntent = () => {
    fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: [{ id: "hotdogpin" }],
          quantity: {quantity},
        })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
        setPaymentIntentID(data.paymentIntentID);
      });
      }


  useEffect(() => {
      fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: [{ id: "hotdogpin" }],
          quantity: {quantity},
          paymentIntentID: {paymentIntentID}

        })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
        setPaymentIntentID(data.paymentIntentID);
      });
  }, [quantity]);






    const cardStyle = {
      iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#5273B1',
        color: '#5273B1',
        fontWeight: 500,
        fontFamily: 'Arial, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {color: '#5273B1'},
        '::placeholder': {color: '#5273B1'},
      },
      invalid: {
        iconColor: '#D17278',
        color: '#D17278',
      },
    },
    };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    //updatePaymentIntent(quantity, paymentIntentID)

  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Elmer Fudd",
        }
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  return (
    <>
    <form id="payment-form" onSubmit={handleSubmit} className="center">
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Let's buy some hotdog pins!"
          )}
        </span>
      </button>

      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}

      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment successful. View the logs in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
        <div>
        <p>I took the liberty of setting up a webhook in the stripe
        dashboard and adding a webhook testing site URL to it. This webhook only handles successful payment intents. </p>
        <p><a href="https://webhook.site/84de61c6-4879-4cef-bac4-dfc2734323f7">View older logs of the webhook and see your webhook work (with the proper stripe keys, of course.)</a> </p>
        </div>
      </p>
    </form>

    </>
  );
}

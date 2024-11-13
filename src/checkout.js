import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ Productdetails }) {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const Domain = "http://localhost:3000/";
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${Domain}success`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/cancel");
      }, 1000);
    } else {
      setMessage("An unexpected error occured.");
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
    }
    setIsLoading(false);
  };

  return (
    <form
      id='payment-form'
      onSubmit={handleSubmit}
      className='product_payment_container p-3'
    >
      <LinkAuthenticationElement
        id='link-authentication-element'
        // Access the email value like so:
        onChange={(event) => {
          setEmail(event.value.email);
        }}
        // Prefill the email field like so:
        options={{ defaultValues: { email: "aliusama.vectorcoder@gmail.com" } }}
      />
      <PaymentElement id='payment-element' />
      <button disabled={isLoading || !stripe || !elements} id='submit'>
        <span id='button-text'>
          {isLoading ? (
            <div className='spinner' id='spinner'></div>
          ) : (
            `Pay now $${Productdetails.product_price}`
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && snackbar && <div id='payment-message'>{message}</div>}
    </form>
  );
}

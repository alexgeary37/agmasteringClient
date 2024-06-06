import { Fragment, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import PaymentFailed from "./PaymentFailed";

export default function PaymentForm({ onSubmit, handleBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [displayFailedPayment, setDisplayFailedPayment] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [declineCode, setDeclineCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Stripe.js has not yet loaded.
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      try {
        setIsLoading(true);
        await onSubmit(paymentMethod.id);
        // console.log("Payment processed successfully:");
      } catch (error) {
        console.error("Error processing payment:", error);

        // Extract errorCode and declineCode from errorMessage
        const errorCode = error.toString().split(",")[0].substring(7);
        const declineCode = error.toString().split(",")[1];
        setErrorCode(errorCode);
        setDeclineCode(declineCode);

        setDisplayFailedPayment(true);
        setIsLoading(false);
      }
    }
  };

  const PaymentFormHtml = () => {
    return (
      <Fragment>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Enter Card Details
          </Typography>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
              onReady={(e) => e.focus()}
            />
          </div>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              BACK
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!stripe || isLoading}
              sx={{ mt: 3, ml: 1 }}
            >
              PAY
            </Button>
          </Box>
        </Box>
      </Fragment>
    );
  };

  return displayFailedPayment ? (
    <PaymentFailed errorCode={errorCode} declineCode={declineCode} />
  ) : (
    <PaymentFormHtml />
  );
}

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm.jsx";

const STRIPE_KEY = process.env.REACT_APP_STRIPE_PK_LIVE;
const stripeTestPromise = loadStripe(STRIPE_KEY);

export default function StripeContainer({ onSubmit, handleBack, handleNext }) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        onSubmit={onSubmit}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </Elements>
  );
}

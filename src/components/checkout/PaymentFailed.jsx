import { useContext, useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const errorMessages = {
  genericDecline:
    "Your card has been declined. Please contact your card issuer for more information.",
  insufficientFunds:
    "Your card has insufficient funds to complete the purchase.",
  expiredCard:
    "Your card has expired. Check the expiration date, or use a different card.",
  incorrectCVC:
    "Your card's 3-digit security code is incorrect. Check the card's security code or use a different card.",
  processingError:
    "An error occurred while processing your card. Please try again later.",
  incorrectNumber:
    "Your card number is incorrect. Check the card's number or use a different card.",
  velocityExceeded:
    "You have exceeded the balance, credit limit, or transaction amount limit available on your card. Please contact your card issuer for more information.",
};

export default function PaymentFailed({ errorCode, declineCode }) {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) navigate("/sign-in");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const setErrorMessage = () => {
      if (declineCode === "generic_decline") {
        setMessage(errorMessages.genericDecline);
      } else if (declineCode === "insufficient_funds") {
        setMessage(errorMessages.insufficientFunds);
      } else if (declineCode === "lost_card") {
        setMessage(errorMessages.genericDecline);
      } else if (declineCode === "stolen_card") {
        setMessage(errorMessages.genericDecline);
      } else if (declineCode === "card_velocity_exceeded") {
        setMessage(errorMessages.velocityExceeded);
      } else if (errorCode === "expired_card") {
        setMessage(errorMessages.expiredCard);
      } else if (errorCode === "incorrect_cvc") {
        setMessage(errorMessages.incorrectCVC);
      } else if (errorCode === "processing_error") {
        setMessage(errorMessages.processingError);
      } else if (errorCode === "incorrect_number") {
        setMessage(errorMessages.incorrectNumber);
      }
    };
    setErrorMessage();
  }, [errorCode, declineCode]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "red", mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Payment Failed
        </Typography>
        <Typography variant="body1" paragraph>
          {message}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/start-a-project")}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
}

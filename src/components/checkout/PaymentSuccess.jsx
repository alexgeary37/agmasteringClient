import { Box, Button, Container, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function PaymentSuccess() {
  let navigate = useNavigate();
  const location = useLocation();
  // const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");

      if (sessionId) {
        await fetch(`/api/retrieve-checkout-session?session_id=${sessionId}`);
        // const session = await response.json();
        // setSessionData(session);
      }
    };

    fetchSessionData();
  }, [location.search]);

  // if (!sessionData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 100, color: "green", mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Payment Successful
        </Typography>
        <Typography variant="body1" paragraph>
          Your payment has been successfully processed. Please check your inbox
          to see confirmation.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/upload")}
        >
          Continue to Upload
        </Button>
      </Box>
    </Container>
  );
}

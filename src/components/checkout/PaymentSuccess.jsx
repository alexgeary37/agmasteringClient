import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  let navigate = useNavigate();

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

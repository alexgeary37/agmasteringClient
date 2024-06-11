import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ForgotPasswordEmailSent from "./ForgotPasswordEmailSent";
import { Backdrop, CircularProgress } from "@mui/material";
// import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export default function ForgotPassword() {
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");

    if (email === "") {
      setEmailError("Please enter your email");
      return;
    }

    try {
      setIsLoading(true);
      // await axios.post(`${apiUrl}/users/forgotPassword`, { email });
      // setTimeout(() => setEmailSent(true), 1000);
    } catch (error) {
      console.error("Error on forgotPassword:", error);
      if (error.response.data.message === `Incorrect email`) {
        setEmailError("Incorrect email");
      }
      setIsLoading(false);
    }
  };

  return emailSent ? (
    <ForgotPasswordEmailSent />
  ) : (
    <Container component="main" maxWidth="xs">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot password
        </Typography>
        <Typography
          component="h2"
          variant="body1"
          textAlign={"center"}
          marginBlock={2}
        >
          Enter your email address and we'll send you a link to reset your
          password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={emailError !== ""}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={() => setEmailError("")}
            helperText={emailError}
          />

          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            EMAIL ME
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

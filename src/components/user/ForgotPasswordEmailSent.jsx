import { useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordEmailSent() {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Please check your email
        </Typography>
        <Typography
          component="h2"
          variant="body1"
          textAlign={"center"}
          marginBlock={2}
        >
          We sent you an email, which contains a link to reset your password.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate("/sign-in")}
        >
          LOG IN
        </Button>
      </Box>
    </Container>
  );
}

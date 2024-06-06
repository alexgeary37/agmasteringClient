import { useEffect } from "react";
import { Container, Box, Avatar, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export default function SessionExpired() {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Session Expired
        </Typography>
        <Typography component="p" variant="body1" align="center" gutterBottom>
          Your session has expired. Please log in again.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/sign-in")}
          sx={{ mt: 3, mb: 2 }}
        >
          SIGN IN
        </Button>
      </Box>
    </Container>
  );
}

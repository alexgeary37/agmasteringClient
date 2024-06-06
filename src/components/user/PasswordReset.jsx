import { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function PasswordReset() {
  let navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      updateUser(null);
    } // eslint-disable-next-line
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password reset
        </Typography>
        <Typography
          component="h2"
          variant="body1"
          textAlign={"center"}
          marginBlock={2}
        >
          Please log in with the new password.
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

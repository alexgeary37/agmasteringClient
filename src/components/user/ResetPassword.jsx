import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PasswordReset from "./PasswordReset";
import validator from "validator";
// import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
// import axios from "axios";
// const apiUrl = process.env.REACT_APP_API_URL;

export default function ResetPassword() {
  // const { userId } = useParams(); // Access the route parameter.
  const [repeatPassword, setRepeatPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [userIdError, setUserIdError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRepeatPasswordChange = (event) => {
    setRepeatPasswordError("");
    setRepeatPassword(event.target.value);
  };

  const validatePassword = (password) => {
    if (password === "") {
      setNewPasswordError("Please enter a password");
      return false;
    } else if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0,
      })
    ) {
      setNewPasswordError("Password is not strong enough");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const password = data.get("newPassword");
    const isValid = validatePassword(password);

    if (!isValid) return;

    if (data.get("repeatPassword") !== password) {
      setRepeatPasswordError("Repeat password is not the same.");
      return;
    }

    try {
      setIsLoading(true);
      // await axios.post(`${apiUrl}/users/resetPassword`, {
      //   userId,
      //   newPassword: password,
      // });
      setTimeout(() => setPasswordReset(true), 1000);
    } catch (error) {
      console.error("Error on resetPassword:", error);
      if (error.response.data.message === `User doesn't exist`) {
        setUserIdError("Invalid url: User unknown");
      }
      setIsLoading(false);
    }
  };

  return passwordReset ? (
    <PasswordReset />
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a new password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={newPasswordError !== ""}
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New password"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            onChange={() => setNewPasswordError("")}
            helperText={newPasswordError}
          />
          <TextField
            error={repeatPasswordError !== ""}
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repeat new password"
            type="password"
            id="repeatPassword"
            autoComplete="repeat-password"
            onChange={handleRepeatPasswordChange}
            value={repeatPassword}
            helperText={repeatPasswordError}
          />

          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            SAVE
          </Button>
          <Typography color={"red"}>{userIdError}</Typography>
        </Box>
      </Box>
    </Container>
  );
}

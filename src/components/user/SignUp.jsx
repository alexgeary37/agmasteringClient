import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import SignUpConfirmation from "./SignUpConfirmation";
import validator from "validator";
import { Backdrop, CircularProgress } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";

export default function SignUp() {
  const { updateUser } = useContext(UserContext);

  const [phone, setPhone] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const handlePhoneChange = (event) => {
    // https://stackoverflow.com/questions/19655202/regex-any-non-digit-with-exception
    const result = event.target.value.replace(/[^+\d]/g, "");
    setPhone(result);
    setPhoneError("");
  };

  const validateInputs = (data) => {
    let areValid = true;
    if (data.get("firstName") === "") {
      setFirstNameError("This is a compulsory field");
      areValid = false;
    }
    if (data.get("lastName") === "") {
      setLastNameError("This is a compulsory field");
      areValid = false;
    }
    if (data.get("email") === "") {
      setEmailError("This is a compulsory field");
      areValid = false;
    }
    if (!validator.isEmail(data.get("email"))) {
      setEmailError("Invalid email");
      areValid = false;
    }
    if (data.get("phone") === "") {
      setPhoneError("This is a compulsory field");
      areValid = false;
    }
    if (data.get("password") === "") {
      setPasswordError("Please enter a password");
      areValid = false;
    }
    if (
      !validator.isStrongPassword(data.get("password"), {
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0,
      })
    ) {
      setPasswordError("Password is not strong enough");
      areValid = false;
    }
    return areValid;
  };

  // Add new session to database.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const areValid = validateInputs(data);
    if (!areValid) return;

    try {
      setIsLoading(true);
      const response = await axios.post("/users/signup", {
        firstName: data.get("firstName").trim(),
        lastName: data.get("lastName").trim(),
        email: data.get("email").trim(),
        phone: phone,
        password: data.get("password"),
      });
      localStorage.setItem("user", JSON.stringify(response.data)); // Store token in local storage
      updateUser(response.data);
      setTimeout(() => setShowConfirmation(true), 1000);
    } catch (error) {
      console.error("Error on signup:", error);
      if (error.response.data.message === `User already exists`) {
        setEmailError("User already exists");
      }
      setIsLoading(false);
    }
  };

  const pageContent = () => {
    return showConfirmation ? (
      <SignUpConfirmation />
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={firstNameError !== ""}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={() => setFirstNameError("")}
                  helperText={firstNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lastNameError !== ""}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={() => setLastNameError("")}
                  helperText={lastNameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={emailError !== ""}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={() => setEmailError("")}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={phoneError !== ""}
                  required
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone (WhatsApp)"
                  type="tel"
                  autoComplete="+64222222222"
                  onChange={handlePhoneChange}
                  value={phone}
                  helperText={phoneError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError !== ""}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={() => setPasswordError("")}
                  helperText={passwordError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SIGN UP
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  };

  return pageContent();
}

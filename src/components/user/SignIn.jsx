import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
// import { UserContext } from "../../contexts/UserContext";
// import axios from "axios";
// const apiUrl = process.env.REACT_APP_API_URL;

export default function SignIn() {
  // const { updateUser } = useContext(UserContext);

  // let navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateInputs = (data) => {
    let areValid = true;
    if (data.get("email") === "") {
      setEmailError("Please enter your email");
      areValid = false;
    }
    if (data.get("password") === "") {
      setPasswordError("Please enter your password");
      areValid = false;
    }
    return areValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const areValid = validateInputs(data);
    if (!areValid) return;

    try {
      setIsLoading(true);
      // const response = await axios.post(`${apiUrl}/users/login`, {
      //   email: data.get("email"),
      //   password: data.get("password"),
      // });
      // localStorage.setItem("user", JSON.stringify(response.data)); // Store token in local storage
      // updateUser(response.data);
      // setTimeout(handleNavigation, 1000);
    } catch (error) {
      console.error("Error on login:", error);
      if (error.response.data.message === `Incorrect email`) {
        setEmailError("Incorrect email");
      }
      if (error.response.data.message === `Incorrect password`) {
        setPasswordError("Incorrect password");
      }
      setIsLoading(false);
    }
  };

  // const handleNavigation = () => {
  //   const signFrom = localStorage.getItem("signFrom");
  //   if (signFrom === "mixing") {
  //     navigate("/start-a-project/mixing");
  //   } else if (signFrom === "mastering") {
  //     navigate("/start-a-project/mastering");
  //   } else if (signFrom === "mix&master") {
  //     navigate("/start-a-project/mix&master");
  //   } else {
  //     navigate("/");
  //   }
  // };

  return (
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
          Sign in
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
          <TextField
            error={passwordError !== ""}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={() => setPasswordError("")}
            helperText={passwordError}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            SIGN IN
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up">Don't have an account? Sign up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

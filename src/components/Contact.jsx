import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import soundboard from "../images/soundboard.png";
import validator from "validator";
import ContactConfirmation from "./contactForm/ContactConfirmation";
import ContactFailed from "./contactForm/ContactFailed";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export default function Contact() {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponsePage, setShowResponsePage] = useState(false);
  const [contactFail, setContactFail] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.removeItem("signFrom");
  }, []);

  const validateInputs = (data) => {
    let areValid = true;
    if (data.get("name") === "") {
      setNameError("This is a compulsory field");
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
    if (data.get("message") === "") {
      setMessageError("This is a compulsory field");
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
      await axios.post(`${apiUrl}/contacts/contact`, {
        name: data.get("name").trim(),
        email: data.get("email").trim(),
        message: data.get("message").trim(),
      });
      // setTimeout(() => setShowResponsePage(true), 1000);
      setShowResponsePage(true);
    } catch (error) {
      console.error("Error on contact:", error, error.response.data);
      setShowResponsePage(true);
      setIsLoading(false);
      setContactFail(true);
    }
  };

  const displayConfirmationOrFailure = () => {
    return contactFail ? <ContactFailed /> : <ContactConfirmation />;
  };

  return showResponsePage ? (
    displayConfirmationOrFailure()
  ) : (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          backgroundImage: `url(${soundboard})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Typography
          variant="h2"
          align="center"
          paddingBlockStart={"5vh"}
          paddingBlockEnd={"5vh"}
          color={"white"}
        >
          GET IN TOUCH
        </Typography>
      </Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginBlock: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  error={nameError !== ""}
                  helperText={nameError}
                  onChange={() => setNameError("")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError !== ""}
                  helperText={emailError}
                  onChange={() => setEmailError("")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="message"
                  label="message"
                  type="message"
                  id="message"
                  autoComplete="message"
                  multiline
                  rows={6}
                  error={messageError !== ""}
                  helperText={messageError}
                  onChange={() => setMessageError("")}
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
              SUBMIT
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

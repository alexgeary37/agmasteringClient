import { useContext, useEffect, useState } from "react";
import soundboard from "../../images/soundboard.png";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Backdrop,
  CircularProgress,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import validator from "validator";
import axios from "axios";

export default function ProfilePage() {
  let navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const [orgUserState, setOrgUserState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [userState, setUserState] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [emailError, setEmailError] = useState("");
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [openUpdateMessage, setOpenUpdateMessage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      fetchUserByEmail();
    }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log(userState);
  // }, [userState]);

  async function fetchUserByEmail() {
    try {
      const response = await axios.get("/users/getUser", {
        params: { email: user.email },
      });
      const responseData = response.data;
      setUserState({
        _id: responseData._id,
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        email: responseData.email,
        phone: responseData.phone,
      });
      setOrgUserState({
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        email: responseData.email,
        phone: responseData.phone,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async function handleUpdateUser() {
    const areValid = validateInputs();
    if (!areValid) return;

    try {
      setIsLoading(true);
      await axios.post("/users/updateUser", {
        userId: userState._id,
        firstName: userState.firstName,
        lastName: userState.lastName,
        email: userState.email,
        phone: userState.phone,
      });
      const token = JSON.parse(localStorage.getItem("user")).token;
      updateUser({
        email: userState.email,
        token,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ email: userState.email, token })
      );
      setTimeout(() => {
        setOpenUpdateMessage(true);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error on updateUser:", error);
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePhoneChange = (event) => {
    // https://stackoverflow.com/questions/19655202/regex-any-non-digit-with-exception
    const result = event.target.value.replace(/[^+\d]/g, "");
    setUserState((prevUser) => ({
      ...prevUser, // eslint-disable-next-line
      ["phone"]: result,
    }));
  };

  const validateInputs = () => {
    if (!validator.isEmail(userState.email)) {
      setEmailError("Invalid email");
      return false;
    }

    setUserState((prevUser) => ({
      ...prevUser, // eslint-disable-next-line
      ["firstName"]:
        userState.firstName === ""
          ? orgUserState.firstName
          : userState.firstName, // eslint-disable-next-line
      ["lastName"]:
        userState.lastName === "" ? orgUserState.lastName : userState.lastName, // eslint-disable-next-line
      ["email"]: userState.email === "" ? orgUserState.email : userState.email, // eslint-disable-next-line
      ["phone"]: userState.phone === "" ? orgUserState.phone : userState.phone,
    }));

    return true;
  };

  const handleUpdateDetails = () => {
    if (fieldsDisabled) {
      setFieldsDisabled(false);
    } else {
      handleUpdateUser();
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        onClose={() => {
          setOpenUpdateMessage(false);
          setFieldsDisabled(true);
        }}
        open={openUpdateMessage}
      >
        <DialogTitle marginInline={3}>Profile updated</DialogTitle>
        <Button
          variant="contained"
          onClick={() => {
            setOpenUpdateMessage(false);
            setFieldsDisabled(true);
          }}
          sx={{ margin: 2 }}
        >
          OK
        </Button>
      </Dialog>
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
          MY PROFILE
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
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={fieldsDisabled}
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  label="First Name"
                  value={userState.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={fieldsDisabled}
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={userState.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={emailError !== ""}
                  disabled={fieldsDisabled}
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userState.email}
                  onChange={(e) => {
                    setEmailError("");
                    handleChange(e);
                  }}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={fieldsDisabled}
                  fullWidth
                  name="phone"
                  label="Phone (WhatsApp)"
                  type="tel"
                  autoComplete="+64222222222"
                  onChange={handlePhoneChange}
                  value={userState.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant={fieldsDisabled ? "text" : "contained"}
                  onClick={handleUpdateDetails}
                >
                  {fieldsDisabled ? "CHANGE DETAILS" : "CONFIRM CHANGES"}
                </Button>
              </Grid>
              {fieldsDisabled && (
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    disabled={!fieldsDisabled}
                    onClick={() => navigate(`/reset-password/${userState._id}`)}
                  >
                    CHANGE PASSWORD
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

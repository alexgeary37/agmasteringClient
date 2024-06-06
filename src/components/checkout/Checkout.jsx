import { Fragment, useContext, useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  AppBar,
  Container,
  Paper,
} from "@mui/material";
import soundboard from "../../images/soundboard.png";
import PersonalInfoForm from "./PersonalInfoForm";
import ProjectInfoForm from "./ProjectInfoForm";
import StripeContainer from "./StripeContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import tokenHasExpired from "../../hooks/tokenHasExpired";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const foundMeOptions = [
  "website",
  "instagram",
  "facebook",
  "spotify",
  "referral",
  "soundBetter",
  "other",
];

const MIX_PRICE = process.env.REACT_APP_MIX_PRICE;
const MASTER_PRICE = process.env.REACT_APP_MASTER_PRICE;
const MIX_MASTER_PRICE = process.env.REACT_APP_MIX_MASTER_PRICE;

export default function Checkout() {
  let navigate = useNavigate();
  const service = useLocation().pathname.substring(17);
  // const isMastering = service !== "mixing";

  const { user, updateUser } = useContext(UserContext);

  const [activeStep, setActiveStep] = useState(0);
  const [quote, setQuote] = useState(0);
  const [formData, setFormData] = useState({
    artistName: "",
    moreAboutYou: "",
    projectTitle: "",
    projectType: "single",
    numberSongs: 1,
    alternateMixes: true,
    songTitles: "",
    // masteringFocus: isMastering ? "balance" : "",
    referenceTrack: "",
    referenceReason: "",
    additionalNotes: "",
    foundMe: "",
    foundMeOther: "",
  });
  const [formErrors, setFormErrors] = useState({
    artistName: "",
    moreAboutYou: "",
    projectTitle: "",
    songTitles: "",
    referenceTrack: "",
    referenceReason: "",
    foundMe: "",
    foundMeOther: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service === "mixing") {
      setQuote(MIX_PRICE);
    } else if (service === "mastering") {
      setQuote(MASTER_PRICE);
    } else {
      setQuote(MIX_MASTER_PRICE);
    }

    const interval = setInterval(() => {
      if (tokenHasExpired()) {
        signUserOut();
      }
    }, 30000); // Check every minute, adjust interval as needed

    return () => clearInterval(interval); // Cleanup function to clear the interval when component unmounts
    // eslint-disable-next-line
  }, []);

  const signUserOut = () => {
    updateUser(null);
    navigate("/session-expired");
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  useEffect(() => {
    let servicePrice = 0;
    if (service === "mixing") servicePrice = MIX_PRICE;
    if (service === "mastering") servicePrice = MASTER_PRICE;
    if (service === "mix&master") servicePrice = MIX_MASTER_PRICE;
    const newQuote = formData.alternateMixes
      ? formData.numberSongs * servicePrice + 10
      : formData.numberSongs * servicePrice;
    setQuote(newQuote);
    // eslint-disable-next-line
  }, [formData.numberSongs, formData.alternateMixes]);

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (!validatePersonalInputs()) return;
        else break;
      case 1:
        if (!validateProjectInputs()) return;
        else break;
      case 2:
        break;
      default:
        throw new Error("Unknown step");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (foundMeOptions.includes(name)) {
      value = formData.foundMe === name ? "" : name;
      name = "foundMe";
    }

    if (
      name !== "projectType" &&
      name !== "numberSongs" &&
      name !== "alternateMixes"
    ) {
      setFormErrors((prevData) => ({
        ...prevData,
        [name]: "",
      }));
    }

    if (name === "numberSongs") value = value >= 1 ? value : 1;
    if (name === "alternateMixes") value = e.target.checked;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePersonalInputs = () => {
    const newArtistName =
      formData.artistName === "" ? "This is a compulsory field" : "";

    const newMoreAboutYou =
      formData.moreAboutYou === "" ? "This is a compulsory field" : "";

    setFormErrors((prevData) => ({
      ...prevData, // eslint-disable-next-line
      ["artistName"]: newArtistName, // eslint-disable-next-line
      ["moreAboutYou"]: newMoreAboutYou,
    }));
    return newArtistName === "" && newMoreAboutYou === "";
  };

  const validateProjectInputs = () => {
    const newProjectTitle =
      formData.projectTitle === "" ? "This is a compulsory field" : "";
    const newSongTitles =
      formData.songTitles === "" ? "This is a compulsory field" : "";
    const newReferenceTrack =
      formData.referenceTrack === "" ? "This is a compulsory field" : "";
    const newReferenceReason =
      formData.referenceReason === "" ? "This is a compulsory field" : "";
    const newFoundMe =
      formData.foundMe === "" ? "This is a compulsory field" : "";
    const newFoundMeOther =
      formData.foundMe === "other" && formData.foundMeOther === ""
        ? "Please fill out this field"
        : "";
    setFormErrors((prevData) => ({
      ...prevData, // eslint-disable-next-line
      ["projectTitle"]: newProjectTitle, // eslint-disable-next-line
      ["songTitles"]: newSongTitles, // eslint-disable-next-line
      ["referenceTrack"]: newReferenceTrack, // eslint-disable-next-line
      ["referenceReason"]: newReferenceReason, // eslint-disable-next-line
      ["foundMe"]: newFoundMe, // eslint-disable-next-line
      ["foundMeOther"]: newFoundMeOther,
    }));

    return (
      newProjectTitle === "" &&
      newSongTitles === "" &&
      newReferenceTrack === "" &&
      newReferenceReason === "" &&
      newFoundMe === "" &&
      newFoundMeOther === ""
    );
  };

  const handleSubmit = async (paymentMethodId) => {
    await processPayment(paymentMethodId);
    await sendEmails();
    navigate("/payment-success");
  };

  const processPayment = async (paymentMethodId) => {
    const paymentService =
      service !== "mix&master"
        ? service.charAt(0).toUpperCase() + service.substring(1)
        : "Mix & Master";

    try {
      // Make a POST request to your backend with the paymentMethodId
      await axios.post(
        `${apiUrl}/bookings/processPayment`,
        {
          paymentMethodId,
          quote,
          service: paymentService,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Handle the response from the backend
      // console.log("Payment processed successfully:");
    } catch (error) {
      console.error("Error processing payment:", error);

      // Extract error code and decline code from the error object
      const errorCode = error.response.data.error.code;
      const declineCode = error.response.data.error.decline_code;

      throw new Error(`${errorCode},${declineCode}`);
    }
  };

  const sendEmails = async () => {
    const paymentService =
      service !== "mix&master"
        ? service.charAt(0).toUpperCase() + service.substring(1)
        : "Mix & Master";
    try {
      // Make a POST request to your backend to send purchase confirmation emails
      await axios.post(
        `${apiUrl}/bookings/sendBookingEmails`,
        {
          userEmail: user.email,
          service: paymentService,
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Handle the response from the backend
      // console.log("Emails sent successfully:");
    } catch (error) {
      console.error("Error sending emails:", error);
      navigate("/payment-failed");
      throw new Error("sendEmails failed");
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <ProjectInfoForm
            formData={formData}
            formErrors={formErrors}
            // isMastering={isMastering}
            handleChange={handleChange}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <StripeContainer
            onSubmit={handleSubmit}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const QuoteDisplay = () => {
    const title =
      service === "mix&master"
        ? `${service.substring(0, 3).toUpperCase()} ${service.substring(
            3,
            4
          )} ${service.substring(4).toUpperCase()} - Quote: $${quote}`
        : `${service.toUpperCase()} - Quote: $${quote}`;
    return (
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          backgroundImage: `url(${soundboard})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            textAlign: "center",
          }}
        >
          <Typography component="h1" variant="h3" mt={5} mb={5}>
            {title}
          </Typography>
        </Container>
      </AppBar>
    );
  };

  return (
    <Fragment>
      <QuoteDisplay />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            mt: { xs: 1, md: 1 },
            mb: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
          }}
        >
          <div>
            <Stepper activeStep={activeStep} alternativeLabel>
              <Step key="Personal Details">
                <StepLabel>Personal Details</StepLabel>
              </Step>
              <Step key="Project Details">
                <StepLabel>Project Details</StepLabel>
              </Step>
              <Step key="Payment">
                <StepLabel>Payment</StepLabel>
              </Step>
            </Stepper>
            <div>{getStepContent(activeStep)}</div>
          </div>
        </Paper>
      </Container>
    </Fragment>
  );
}

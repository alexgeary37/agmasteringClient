import { Fragment, useEffect, useState } from "react";
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
// import StripeContainer from "./StripeContainer";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import validator from "validator";

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

// Load your publishable key from the Stripe Dashboard
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);

export default function Checkout() {
  let navigate = useNavigate();
  const service = useLocation().pathname.substring(17);

  const [activeStep, setActiveStep] = useState(0);
  const [quote, setQuote] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    artistName: "",
    email: "",
    moreAboutYou: "",
    projectTitle: "",
    projectType: "single",
    numberSongs: 1,
    alternateMixes: true,
    songTitles: "",
    referenceTrack: "",
    referenceReason: "",
    additionalNotes: "",
    foundMe: "",
    foundMeOther: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    artistName: "",
    email: "",
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
    // eslint-disable-next-line
  }, []);

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
    if (!validatePersonalInputs()) return;
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
    const newFirstName =
      formData.firstName === "" ? "This is a compulsory field" : "";

    const newLastName =
      formData.lastName === "" ? "This is a compulsory field" : "";

    const newArtistName =
      formData.artistName === "" ? "This is a compulsory field" : "";

    let newEmail = formData.email === "" ? "This is a compulsory field" : "";
    if (!validator.isEmail(formData.email)) newEmail = "Invalid email";

    const newMoreAboutYou =
      formData.moreAboutYou === "" ? "This is a compulsory field" : "";

    setFormErrors((prevData) => ({
      ...prevData, // eslint-disable-next-line
      ["fistName"]: newFirstName, // eslint-disable-next-line
      ["lastName"]: newLastName, // eslint-disable-next-line
      ["artistName"]: newArtistName, // eslint-disable-next-line
      ["email"]: newEmail, // eslint-disable-next-line
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

  const handleSubmit = async () => {
    if (!validateProjectInputs()) {
      return;
    } else {
      const stripe = await stripePromise;

      // Call your backend to create the Checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_1PTG2qJcdCc4Eqz9GxLDslbW", // Replace with your actual price ID
          description: "This is a test description", // Example description
        }),
      });

      const session = await response.json();
      console.log("sessionId:", session);

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
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
            handleChange={handleChange}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
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

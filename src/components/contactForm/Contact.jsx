// import { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import { Backdrop, CircularProgress, Typography } from "@mui/material";
//
// import validator from "validator";
// import ContactConfirmation from "./ContactConfirmation";

// import { Box } from "@mui/material";
// import { useEffect } from "react";

// export default function Contact() {

// const [nameError, setNameError] = useState("");
// const [emailError, setEmailError] = useState("");
// const [messageError, setMessageError] = useState("");
// const [isLoading, setIsLoading] = useState(false);
// const [showResponsePage, setShowResponsePage] = useState(false);

// useEffect(() => {
//   window.scrollTo(0, 0);
// }, []);

// const validateInputs = (data) => {
//   let areValid = true;
//   if (data.get("name") === "") {
//     setNameError("This is a compulsory field");
//     areValid = false;
//   }
//   if (data.get("email") === "") {
//     setEmailError("This is a compulsory field");
//     areValid = false;
//   }
//   if (!validator.isEmail(data.get("email"))) {
//     setEmailError("Invalid email");
//     areValid = false;
//   }
//   if (data.get("message") === "") {
//     setMessageError("This is a compulsory field");
//     areValid = false;
//   }
//   return areValid;
// };

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);

//   const areValid = validateInputs(data);
//   if (!areValid) return;

//   setIsLoading(true);
//   const name = data.get("name").trim();
//   const email = data.get("email").trim();
//   const message = data.get("message").trim();

//   const response = await fetch("/api/send-contact-email", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       email,
//       message,
//     }),
//   });

//   const result = await response.json();

//   if (response.ok) {
//     setShowResponsePage(true);
//   } else {
//     console.error(`Failed to send email: ${result.error}`);
//     setIsLoading(false);
//   }
// };

// return showResponsePage ? (
//   <ContactConfirmation />
// ) : (
//   <div>
//     <Backdrop
//       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       open={isLoading}
//     >
//       <CircularProgress color="inherit" />
//     </Backdrop>
//     <Box
//       sx={{
//         backgroundImage: `url(${soundboard})`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//       }}
//     >
//       <Typography
//         variant="h2"
//         align="center"
//         paddingBlockStart={"5vh"}
//         paddingBlockEnd={"5vh"}
//         color={"white"}
//       >
//         GET IN TOUCH
//       </Typography>
//     </Box>
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginBlock: 3,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Box
//           component="form"
//           noValidate
//           onSubmit={handleSubmit}
//           sx={{ mt: 3 }}
//         >
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 autoComplete="name"
//                 name="name"
//                 required
//                 fullWidth
//                 id="name"
//                 label="Name"
//                 autoFocus
//                 error={nameError !== ""}
//                 helperText={nameError}
//                 onChange={() => setNameError("")}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 error={emailError !== ""}
//                 helperText={emailError}
//                 onChange={() => setEmailError("")}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="message"
//                 label="message"
//                 type="message"
//                 id="message"
//                 autoComplete="message"
//                 multiline
//                 rows={6}
//                 error={messageError !== ""}
//                 helperText={messageError}
//                 onChange={() => setMessageError("")}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             SUBMIT
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   </div>
// );
// }
import { useEffect } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import soundboard from "../../images/soundboard.png";

export default function Contact() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={false}
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
      <Container component="main" maxWidth="xs" sx={{ paddingBlockStart: 6 }}>
        <div style={{ height: "100vh" }}>
          <iframe
            src="https://www.cognitoforms.com/f/U4vz2LbkqUSZjRW89TkxTQ/4"
            width={"100%"}
            style={{ border: 0 }}
            height="651"
          ></iframe>
          <script src="https://www.cognitoforms.com/f/iframe.js"></script>
        </div>
      </Container>
    </div>
  );
}

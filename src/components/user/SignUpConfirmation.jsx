import Typography from "@mui/material/Typography";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignUpConfirmation() {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContinue = () => {
    const signFrom = localStorage.getItem("signFrom");
    if (signFrom === "mixing") {
      navigate("/start-a-project/mixing");
    } else if (signFrom === "mastering") {
      navigate("/start-a-project/mastering");
    } else if (signFrom === "mix&master") {
      navigate("/start-a-project/mix&master");
    } else {
      navigate("/start-a-project");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Thank you for creating an account.
        </Typography>
        <Typography variant="subtitle1" marginBlock={"2vh"}>
          You can now start a project!
        </Typography>
        <Button
          variant="contained"
          onClick={handleContinue}
          sx={{ marginBlockEnd: "2vh" }}
        >
          CONTINUE
        </Button>
      </Box>
    </Container>
  );
}

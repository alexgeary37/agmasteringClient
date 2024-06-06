import Typography from "@mui/material/Typography";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ContactFailed() {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        textAlign={"center"}
        sx={{
          marginTop: "20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Unfortunately there's been an error. Try again later.
        </Typography>
        <Typography variant="subtitle1" marginBlock={"2vh"}>
          {"I will get back to you with a response soon :)"}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ marginBlockEnd: "2vh" }}
        >
          HOME
        </Button>
      </Box>
    </Container>
  );
}

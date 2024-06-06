import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Error404() {
  useEffect(() => window.scrollTo(0, 0), []);

  let navigate = useNavigate();

  const message = (
    <Box
      sx={{ flexGrow: 1, paddingBlockStart: "30vh", paddingBlockEnd: "10vh" }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" align="center">
          404 page not found.
        </Typography>
      </Container>
    </Box>
  );

  return (
    <Box textAlign={"center"}>
      {message}
      <Button
        variant="contained"
        sx={{ mb: "50vh" }}
        onClick={() => navigate("/")}
      >
        HOME
      </Button>
    </Box>
  );
}

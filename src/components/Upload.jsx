import { Box, Button, Container, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import soundboard from "../images/soundboard.png";
import { useEffect } from "react";

const WEBSITE_EMAIL_ADDRESS = process.env.REACT_APP_EMAIL_ADDRESS;

export default function Upload() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div>
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
          UPLOAD
        </Typography>
      </Box>
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <UploadIcon sx={{ fontSize: 100, color: "aquamarine", mt: 3 }} />
        <Typography
          variant="body1"
          marginBlock={3}
          paragraph
        >
          {`Upload a ZIP file of your tracks to me using WeTransfer. Make sure to enter your Project Title as the 'Title', and send to ${REACT_APP_EMAIL_ADDRESS}`}
        </Typography>
        <Typography
          variant="body1"
          marginBlockStart={5}
          marginBlockEnd={5}
          paragraph
        >
          (If you've purchased mastering, feel free to include a rough master
          with your own mixbus processing which I can use as a reference)
        </Typography>
        <div>
          <Button
            variant="contained"
            href="https://wetransfer.com"
            target="_blank"
          >
            UPLOAD NOW
          </Button>
        </div>
      </Container>
    </div>
  );
}

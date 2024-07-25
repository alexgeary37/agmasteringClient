import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Avatar, Button, Container, Divider, Typography } from "@mui/material";
import soundboard from "../images/soundboard.png";
import profilePic from "../images/profile2.jpeg";
import AudioPlayer from "./home/AudioPlayer";
import Pricing from "./home/Pricing";
import Testimonials from "./home/Testimonials";
import { useEffect } from "react";

export default function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const header = (
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
        paddingBlockStart={"20vh"}
        paddingBlockEnd={"5vh"}
        color={"white"}
        fontFamily={"lastica"}
        fontWeight={1000}
        letterSpacing="0.3rem"
      >
        AG MASTERING
      </Typography>
      <Typography
        variant="h4"
        align="center"
        paddingBlockEnd={"5vh"}
        color={"white"}
      >
        MIXING | MASTERING
      </Typography>
      <Box textAlign={"center"} paddingBlockEnd={"15vh"}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/start-a-project")}
        >
          START A PROJECT
        </Button>
      </Box>
    </Box>
  );

  const bio = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingBlock={8}
    >
      <Avatar
        alt="Alex Geary"
        src={profilePic}
        sx={{ width: 150, height: 150, marginBottom: 6 }}
      />
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" paddingBlockEnd={4}>
          Hi, I'm Alex Geary!
        </Typography>
        <Typography variant="h6" align="center">
          I help indie artists get professional, modern mixes ready for release.
        </Typography>
      </Container>
    </Box>
  );

  return (
    <div>
      {header}
      {bio}
      <AudioPlayer />
      <Divider />
      <Testimonials />
      <Divider />
      <Pricing />
      <Divider />
      <Box textAlign={"center"} sx={{ flexGrow: 1, paddingBlock: 10 }}>
        <Container maxWidth="md">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/start-a-project")}
          >
            START A PROJECT
          </Button>
        </Container>
      </Box>
    </div>
  );
}

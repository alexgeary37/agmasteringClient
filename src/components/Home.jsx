import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Avatar, Button, Container, Divider, Typography } from "@mui/material";
import soundboard from "../images/soundboard.png";
import profilePic from "../images/profile2.jpeg";
import AudioPlayer from "./home/AudioPlayer";
import Pricing from "./home/Pricing";
import Testimonials from "./home/Testimonials";
import { useEffect, useState } from "react";

export default function Home() {
  let navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500); // Adjust the width as needed
    };

    // Initial check
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);
    window.scrollTo(0, 0);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const header = (
    <Box
      sx={{
        backgroundImage: `url(${soundboard})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingBlockStart: "10vh",
        paddingBlockEnd: "10vh",
      }}
    >
      <Typography
        variant="h2"
        align="center"
        // paddingBlockStart={"20vh"}
        paddingBlockEnd={"5vh"}
        color={"white"}
        fontFamily={"lastica"}
        fontWeight={1000}
        letterSpacing="0.3rem"
      >
        AG MASTERING
      </Typography>
      <Typography
        variant="h5"
        align="center"
        // paddingBlockEnd={"5vh"}
        color={"white"}
      >
        MIXING | MASTERING
      </Typography>
      {/* <Box textAlign={"center"} paddingBlockEnd={"15vh"}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/start-a-project")}
        >
          START A PROJECT
        </Button>
      </Box> */}
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
        sx={{ width: 100, height: 100, marginBottom: 6 }}
      />
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" paddingBlockEnd={4}>
          Hi, I'm Alex Geary!
        </Typography>
        <Typography variant="h6" align="center" paddingBlockEnd={4}>
          I help electronic producers and indie artists get professional, modern
          mixes ready for release.
        </Typography>
        <Typography variant="h6" align="center">
          Get in touch for inquiries and
          <br /> price quotes &#128071;
        </Typography>
        <Box
          textAlign={"center"}
          sx={{ flexGrow: 1, paddingBlockStart: "4vh" }}
        >
          <Container maxWidth="md">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/contact")}
            >
              GET IN TOUCH
            </Button>
          </Container>
        </Box>
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
          <Typography variant="h6" align="center">
            Get in touch for inquiries and
            <br /> price quotes &#128071;
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/contact")}
          >
            GET IN TOUCH
          </Button>
        </Container>
      </Box>
    </div>
  );
}

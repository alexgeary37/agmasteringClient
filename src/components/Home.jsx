import Box from "@mui/material/Box";
import { Avatar, Button, Container, Divider, Typography } from "@mui/material";
import soundboard from "../images/soundboard.png";
import profilePic from "../images/profile2.jpeg";
import AudioPlayer from "./home/AudioPlayer";
import Testimonials from "./home/Testimonials";
import { useEffect, useRef, useState } from "react";
import ServicesSection from "./home/ServicesSection";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const bottomButtonRef = useRef(null);

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

  const scrollToBottomButton = () => {
    if (bottomButtonRef.current) {
      bottomButtonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const header = (
    <Box
      sx={{
        backgroundImage: `url(${soundboard})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingBlockStart: isMobile ? "15vh" : "20vh",
        paddingBlockEnd: isMobile ? "10vh" : "25vh",
      }}
    >
      <Typography
        variant="h2"
        align="center"
        paddingBlockEnd={"5vh"}
        color={"white"}
        fontFamily={"lastica"}
        fontWeight={1000}
        fontSize={"2rem"}
        letterSpacing={isMobile ? "0.1rem" : "0.3rem"}
      >
        AG MASTERING
      </Typography>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        align="center"
        color={"white"}
        mt={isMobile ? "-2vh" : 0}
      >
        MIXING | MASTERING
      </Typography>
    </Box>
  );

  const bio = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingBlock={"8vh"}
    >
      <Avatar
        alt="Alex Geary"
        src={profilePic}
        sx={{ width: 100, height: 100, marginBottom: 4 }}
      />
      <Container maxWidth="xs">
        <Typography variant="h6" align="center" paddingBlockEnd={2}>
          Hi, I'm Alex Geary!
        </Typography>
        <Typography variant="h6" align="center" paddingBlockEnd={2}>
          I help rising artists get modern, professional sounding mixes ready
          for release.
        </Typography>
        <Typography variant="h6" align="center">
          Get in touch to see what I can do for you &#128071;
        </Typography>
        <Box
          textAlign={"center"}
          sx={{ flexGrow: 1, paddingBlockStart: "4vh" }}
        >
          <Container maxWidth="md">
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollToBottomButton()}
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
      <ServicesSection />
      <Divider />
      <Testimonials />
      {/* <Divider /> */}
      <Box
        ref={bottomButtonRef}
        textAlign={"center"}
        sx={{ flexGrow: 1, paddingBlockStart: "8vh", paddingBlockEnd: "6vh" }}
        bgcolor={"white"}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Get In Touch
        </Typography>
        <Container component="main" maxWidth="xs" sx={{ paddingBlockStart: 3 }}>
          <div>
            <iframe
              title="U4vz2LbkqUSZjRW89TkxTQ/4"
              src="https://www.cognitoforms.com/f/U4vz2LbkqUSZjRW89TkxTQ/4"
              width={"100%"}
              style={{ border: 0 }}
              height="651"
            ></iframe>
            <script src="https://www.cognitoforms.com/f/iframe.js"></script>
          </div>
        </Container>
      </Box>
    </div>
  );
}

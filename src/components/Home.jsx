import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Container, Divider, Typography } from "@mui/material";
import soundboard from "../images/soundboard.png";
import AudioPlayer from "./home/AudioPlayer";
import Pricing from "./home/Pricing";
import Testimonials from "./home/Testimonials";
import { useEffect } from "react";

export default function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.removeItem("signFrom");
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
        MIXING & MASTERING
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

  const about = (
    <Box sx={{ flexGrow: 1, paddingBlock: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" paddingBlockEnd={8}>
          What I'm About
        </Typography>
        <Typography variant="h6" align="center" paddingBlockEnd={6}>
          My name is Alex Geary. I'm a professionally trained mixing and
          mastering engineer. Whether you're an artist, band, producer, or a
          podcaster, my goal is to engineer your audio to bring out its full
          potential so it's ready for release.
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Box
          component="div"
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Box paddingX={"2vw"}>
            <Typography gutterBottom variant="h5" align="center">
              MIXING
            </Typography>
            <Typography variant="body1" align="center">
              Mixing processes and shapes the individual elements (instruments,
              percussion, and vocals) in your music. This makes all the parts
              fit together well, providing a balanced, cohesive sound which will
              translate across all sound systems. Mixing is required before
              mastering.
            </Typography>
          </Box>
          <Box paddingX={"2vw"}>
            <Typography gutterBottom variant="h5" align="center">
              MASTERING
            </Typography>
            <Typography variant="body1" align="center">
              ​Mastering follows the mixing phase, enhancing your music with
              final touches to give it the volume, energy and punch it needs to
              be ready for release. Mastering also ensures consistency and flow
              between tracks on larger projects such as EPs and albums.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );

  return (
    <div>
      {header}
      <AudioPlayer />
      {about}
      <Divider />
      <Pricing />
      <Divider sx={{ mt: 10 }} />
      <Testimonials />

      <Box
        textAlign={"center"}
        sx={{ flexGrow: 1, paddingBlock: "15vh" }}
        boxShadow={4}
      >
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

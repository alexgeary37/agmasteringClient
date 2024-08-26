import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { Tune } from "@mui/icons-material";
import { Icon } from "@iconify/react";

export default function ServicesSection() {
  return (
    <Box sx={{ mt: { xs: "5vh", sm: "8vh" }, mb: "8vh" }}>
      <Container disableGutters maxWidth="md" component="main">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          paddingBlockEnd={"2vh"}
        >
          Services
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              {/* <Tune
                style={{
                  transform: "rotate(90deg)",
                  fontSize: "4rem",
                }}
              /> */}
              <Icon
                icon="simple-line-icons:equalizer"
                style={{ fontSize: "5rem", marginBottom: "3vh" }}
              />
              <Typography
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Mixing
              </Typography>
              <Container>
                <Typography variant="body1" align="center" sx={{ mt: "3vh" }}>
                  I take the raw tracks you recorded at any professional studio
                  or home studio, and turn them into a professional, polished
                  recording.
                </Typography>
              </Container>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              <Icon
                icon="emojione-monotone:headphone"
                style={{ fontSize: "5rem", marginBottom: "3vh" }}
              />
              <Typography
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Mastering
              </Typography>
              <Container>
                <Typography variant="body1" align="center" sx={{ mt: "3vh" }}>
                  I transform your final mixes into loud, punchy masters that
                  translate across all platforms and playback systems.
                </Typography>
              </Container>
            </Box>
          </Grid>
        </Grid>
        <Container maxWidth="xs" sx={{ mt: { xs: "3vh", sm: "5vh" } }}>
          <Typography variant="body1" align="center">
            • Alternate mixes such as instrumental, acapella, etc are available
            for both mixing and mastering
          </Typography>
          <Typography variant="body1" align="center" mt={"3vh"}>
            • Stem mastering is also available
          </Typography>
        </Container>
      </Container>
    </Box>
  );
}

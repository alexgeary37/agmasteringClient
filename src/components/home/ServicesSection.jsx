import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
                  I take your raw tracks recorded at either a professional or
                  home studio, and bring them together to give your music
                  clarity, energy and a balanced sound that translates well
                  across all platforms and playback systems.
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
                  I transform your final mixes into loud masters with character
                  that are ready for release on all major streaming platforms.
                  Stem mastering is also available.
                </Typography>
              </Container>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} mt={"5vh"}>
          <Box textAlign="center">
            <Typography variant="body1" align="center">
              • Alternate mixes such as instrumental, acapella, etc are
              available for both mixing and mastering
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

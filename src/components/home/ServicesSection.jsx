import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { getPriceTiers } from "../../utilities/getPriceTiers";

const tiers = getPriceTiers();

export default function ServicesSection() {
  return (
    <Box sx={{ paddingBlock: 6 }}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Container disableGutters maxWidth="md" component="main" sx={{ pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Services
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} justifyContent="center" mb={8}>
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6}>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  {tier.title}
                </Typography>
                <Typography variant="body1" align="center" mb={1}>
                  {tier.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* <Typography variant="h6" align="center">
          Find out more about each option <Link to="/services">here</Link>
        </Typography> */}
      </Container>
    </Box>
  );
}

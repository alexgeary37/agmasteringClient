import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

const MIX_PRICE = process.env.REACT_APP_MIX_PRICE;
const MASTER_PRICE = process.env.REACT_APP_MASTER_PRICE;
const MIX_MASTER_PRICE = process.env.REACT_APP_MIX_MASTER_PRICE;

const tiers = [
  {
    title: "Mixing",
    price: MIX_PRICE,
    description: [
      "1 Stereo main mix",
      "4 alternate versions included",
      "1 revision set included",
    ],
    buttonText: "START MIXING",
    buttonVariant: "contained",
  },
  {
    title: "Mastering",
    // subheader: "Most popular",
    price: MASTER_PRICE,
    description: [
      "1 Stereo master",
      "Alternate versions (+$10)",
      // "3 day turnaround",
      "2 revision sets included",
    ],
    buttonText: "START MASTERING",
    buttonVariant: "contained",
  },
  {
    title: "Mix & Master",
    price: MIX_MASTER_PRICE,
    description: [
      "1 Stereo main master",
      "4 alternate versions (+$10)",
      "1 mix revision set included",
    ],
    buttonText: "START MIX & MASTER",
    buttonVariant: "contained",
  },
];

// const footers = [
//   {
//     title: "Company",
//     description: ["Team", "History", "Contact us", "Locations"],
//   },
//   {
//     title: "Features",
//     description: [
//       "Cool stuff",
//       "Random feature",
//       "Team feature",
//       "Developer stuff",
//       "Another one",
//     ],
//   },
//   {
//     title: "Resources",
//     description: [
//       "Resource",
//       "Resource name",
//       "Another resource",
//       "Final resource",
//     ],
//   },
//   {
//     title: "Legal",
//     description: ["Privacy policy", "Terms of use"],
//   },
// ];

export default function Pricing() {
  let navigate = useNavigate();

  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        {/* <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Quickly build an effective pricing table for your potential clients
          with this layout. It&apos;s built with default MUI components with
          little customization.
        </Typography> */}
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end" mb={8}>
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /song
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        mb={1}
                        key={line}
                      >
                        &#x2022; {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    onClick={() => {
                      if (tier.buttonText === "START MIXING") {
                        navigate("/start-a-project/mixing");
                      } else if (tier.buttonText === "START MASTERING") {
                        navigate("/start-a-project/mastering");
                      } else {
                        navigate("/start-a-project/mix&master");
                      }
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Find out more about each option{" "}
          <Link to="/start-a-project">here</Link>
        </Typography>
      </Container>

      {/* Footer */}
      {/* <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container> */}
      {/* End footer */}
    </div>
  );
}

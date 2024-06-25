import { useEffect } from "react";
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
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import soundboard from "../images/soundboard.png";
import { getPriceTiers } from "../utilities/getPriceTiers";

const tiers = getPriceTiers();

export default function StartAProject() {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const optionCards = (
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
              // action={tier.title === "Pro" ? <StarIcon /> : null}
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
                <Typography component="h2" variant="h3" color="text.primary">
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
  );

  const mixingDescription = (
    <Box marginBlock={4}>
      <Typography gutterBottom variant="h4">
        Mixing
      </Typography>
      <Typography variant="body1" marginBlockEnd={1}>
        Mixing processes and shapes the individual elements (instruments,
        percussion, and vocals) in your music. This makes all the parts fit
        together well, providing a balanced, cohesive sound which will translate
        across all sound systems. Mixing is required before mastering. Below is
        what is included in mixing:
      </Typography>
      <ul>
        <Typography component="li" variant="body1" mb={1} marginLeft={1}>
          &#x2022; A stereo mix of the main version of the song ready for
          mastering
        </Typography>
        <Typography component="li" variant="body1" mb={1} marginLeft={1}>
          &#x2022; 4 alternate versions of the song which include:
          <ul>
            <Typography
              component="li"
              variant="body1"
              // mb={1}
              marginLeft={2}
            >
              - Clean (explicit lyrics removed)
            </Typography>
            <Typography
              component="li"
              variant="body1"
              // mb={1}
              marginLeft={2}
            >
              - Instrumental (all vocals removed)
            </Typography>
            <Typography
              component="li"
              variant="body1"
              // mb={1}
              marginLeft={2}
            >
              - Acapella (vocals only)
            </Typography>
            <Typography
              component="li"
              variant="body1"
              // mb={1}
              marginLeft={2}
            >
              - Performance (lead vocals removed)
            </Typography>
          </ul>
        </Typography>
        <Typography component="li" variant="body1" mb={1} marginLeft={1}>
          &#x2022; 1 revision of the main mix and alternate versions
        </Typography>
      </ul>
    </Box>
  );

  const masteringDescription = (
    <Box marginBlock={4}>
      <Typography gutterBottom variant="h4">
        Mastering
      </Typography>
      <Typography variant="body1" marginBlockEnd={1}>
        ​Mastering follows the mixing phase, enhancing your music with final
        touches to give it the volume, energy and punch it needs to be ready for
        release. Mastering also ensures consistency and flow between tracks on
        larger projects such as EPs and albums. Below is what is
        included/available in mastering:
      </Typography>
      <ul>
        <Typography component="li" variant="body1" mb={1} marginLeft={1}>
          &#x2022; A stereo master of the main mix of the song ready for release
        </Typography>
        <Typography component="li" variant="body1" mb={1} marginLeft={1}>
          &#x2022; Alternate mix versions of the song can also be mastered for
          an extra $10
        </Typography>
        <Typography component="li" variant="body1" mb={1} marginLeft={1}>
          &#x2022; 2 revisions of the main master and any alternate versions
        </Typography>
      </ul>
    </Box>
  );

  const mixAndMasterDescription = (
    <Box marginBlockStart={4}>
      <Typography gutterBottom variant="h4">
        Mix & Master
      </Typography>
      <Typography variant="body1" marginBlockEnd={1}>
        ​Mix & Master is the whole package including mixing and mastering. By
        the end of it you'll receive:
      </Typography>
      <ul>
        <Typography component="li" variant="body1" mb={1} marginLeft={1}>
          &#x2022; A stereo master of the main mix of the song ready for release
        </Typography>
        <Typography component="li" variant="body1" mb={1} marginLeft={1}>
          &#x2022; 4 alternate (mix) versions of the song are available for an
          extra $10
        </Typography>
        <Typography component="li" variant="body1" mb={1} marginLeft={1}>
          &#x2022; 1 revision of the main mix and any alternate versions
        </Typography>
      </ul>
    </Box>
  );

  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Box
        sx={{
          backgroundImage: `url(${soundboard})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        marginBlockEnd={8}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          paddingBlockStart={"5vh"}
          paddingBlockEnd={"5vh"}
          color={"white"}
        >
          START A PROJECT
        </Typography>
      </Box>

      <Container maxWidth="md" component="main">
        {/* <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          marginBlockEnd={8}
        >
          I provide mixing, mastering or both
        </Typography> */}
        {optionCards}
        <Divider />
        <Box component="div" marginBlock={8}>
          {mixingDescription}
          {masteringDescription}
          {mixAndMasterDescription}
        </Box>
      </Container>
    </div>
  );
}

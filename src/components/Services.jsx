import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  GlobalStyles,
  Container,
  Divider,
  Link,
} from "@mui/material";
import soundboard from "../images/soundboard.png";
// import { getPriceTiers } from "../utilities/getPriceTiers";

// const tiers = getPriceTiers();

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionDescription = (title, description, items) => (
    <Box marginBlock={4}>
      <Typography gutterBottom variant="h4">
        {title}
      </Typography>
      <Typography variant="body1" marginBlockEnd={1}>
        {description}
      </Typography>
      <ul>
        {items.map((item, index) => (
          <Typography
            component="li"
            variant="body1"
            mb={1}
            marginLeft={1}
            key={index}
          >
            &#x2022; {item}
          </Typography>
        ))}
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
          paddingBlock: "5vh",
        }}
        marginBlockEnd={8}
      >
        <Typography component="h1" variant="h2" align="center" color="white">
          SERVICES
        </Typography>
      </Box>

      <Container maxWidth="md" component="main">
        <Divider sx={{ my: 6 }} />
        {sectionDescription(
          "Mixing",
          "Individual and combined processing of all the elements of a song to create a cohesive, balanced sound. Alternate versions such as instrumental, acapella, etc are available."
        )}
        <Divider sx={{ my: 6 }} />
        {sectionDescription(
          "Mastering",
          "Mastering follows the mixing phase, enhancing your music with final touches to give it the volume, energy, and punch it needs to be ready for release. Mastering also ensures consistency and flow between tracks on larger projects such as EPs and albums. Below is what is included / available in mastering:",
          [
            "A stereo master of the main mix of the song ready for release",
            "Alternate mix versions of the song can also be mastered for an extra $10",
            "2 revisions of the main master. The revision will also be applied to any alternate versions",
          ]
        )}
        <Divider sx={{ my: 6 }} />
        {sectionDescription(
          "Mix & Master",
          "Mix & Master is the complete package including mixing and mastering. By the end of it you'll receive:",
          [
            "A stereo master of the main mix of the song ready for release",
            "Alternate (mix) versions of the song are available for an extra $10",
            "1 revision of the main mix, which will also be applied to any alternate versions, and the corresponding masters",
          ]
        )}
        <Typography variant="h6" align="center" sx={{ paddingBlockEnd: 6 }}>
          If you have any questions, please contact me{" "}
          <Link to="/contact">here</Link>
        </Typography>
      </Container>
    </div>
  );
}

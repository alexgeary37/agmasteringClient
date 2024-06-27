import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpotify,
  faSquareFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500); // Adjust the width as needed
    };

    // Initial check
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <Box component="footer" paddingBlock={6}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary" mb={2}>
          {"Copyright © "}
          <Link color="inherit" href="/">
            AG Mastering
          </Link>{" "}
          {new Date().getFullYear()}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link
            href="https://instagram.com/alexgearymastering"
            color="inherit"
            sx={{ px: 1 }}
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon icon={faSquareInstagram} size="xl" />
          </Link>
          <Link
            href="https://www.facebook.com/alexgeary37"
            color="inherit"
            sx={{ px: 1 }}
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon icon={faSquareFacebook} size="xl" />
          </Link>
          <Link
            href="https://open.spotify.com/artist/6ijIDFD0lvzqI3PlqLvfEz"
            color="inherit"
            sx={{ px: 1 }}
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon icon={faSpotify} size="xl" />
          </Link>
        </Box>
      </Container>
    </Box>
  ) : (
    <Box component="footer" paddingBlock={6}>
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="/">
            AG Mastering
          </Link>{" "}
          {new Date().getFullYear()}
        </Typography>
        <Box>
          <Link
            href="https://instagram.com/alexgearymastering"
            color="inherit"
            sx={{ pl: 2 }}
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon icon={faSquareInstagram} size="xl" />
          </Link>
          <Link
            href="https://www.facebook.com/alexgeary37"
            color="inherit"
            sx={{ pl: 2 }}
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon icon={faSquareFacebook} size="xl" />
          </Link>
          <Link
            href="https://open.spotify.com/artist/6ijIDFD0lvzqI3PlqLvfEz"
            color="inherit"
            sx={{ pl: 2 }}
            target="_blank"
            rel="noopener"
          >
            <FontAwesomeIcon icon={faSpotify} size="xl" />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

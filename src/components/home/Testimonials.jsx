import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Masonry from "@mui/lab/Masonry";
import { useMediaQuery } from "@mui/material";

const userTestimonials = [
  {
    name: "SonVanger",
    testimonial:
      "Maaan, they sound fantastic! Thanks so much 🙏🙏 We really like it! sounds full and vibrant, nice work, thanks!",
  },

  {
    name: "Michael Williams",
    testimonial:
      "Thanks so much for this. You have done an excellent job!!!! Really sensitive and a beautiful sound. Very happy with this. Keen to put this on my website.",
  },
  {
    name: "Kris Baines",
    testimonial:
      "That's great thanks Alex - love the mix! A big thanks to Alex Geary for his help with mixing/mastering.",
  },
];

export default function Testimonials() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const columns = isSmallScreen ? 1 : 3;

  return (
    <Container
      id="testimonials"
      maxWidth="md"
      sx={{
        mt: { xs: "5vh", sm: "8vh" },
        mb: "8vh",
        // pb: { xs: 8, sm: 10 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Testimonials
        </Typography>
      </Box>
      <Masonry columns={columns} spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Card key={index} sx={{ p: 1 }}>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                {testimonial.testimonial}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                pr: 2,
              }}
            >
              <CardHeader subheader={testimonial.name} />
            </Box>
          </Card>
        ))}
      </Masonry>
    </Container>
  );
}

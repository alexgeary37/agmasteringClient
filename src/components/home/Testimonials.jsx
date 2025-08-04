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
    name: "George Murrell",
    testimonial:
      "Was great working with Alex. He brought a high degree of intention to the songs and seemed to understand at a deep level what we were trying to achieve on this project. Even though we never met in person he brought a flexibility and adaptability which bred a feeling of familiarity and trust. Wouldn't hesitate to recommend.",
  },
  {
    name: "Michael Williams",
    testimonial:
      "Thanks so much for this. You have done an excellent job!!!! Really sensitive and a beautiful sound. Very happy with this. Keen to put this on my website.",
  },
  {
    name: "Arn Georj",
    testimonial:
      "Alex did a great job at mastering my song, it ended up sounding so professional, and he did it in such a small amount of time, definitely counting on him for future projects.",
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
        paddingBlockStart: { xs: "5vh", sm: "8vh" },
        paddingBlockEnd: "8vh",
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

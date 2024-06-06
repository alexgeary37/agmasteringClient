import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0FA4AF",
      // light: "#43B3AC",
      // dark: "#0F292F",
    },
    secondary: {
      main: "#024950",
      // light: "#D5578B",
      // dark: "#501F3A",
    },
    greys: {
      // main: "#464646",
      main: "#ffffff",
    },
  },
});

export default responsiveFontSizes(theme);

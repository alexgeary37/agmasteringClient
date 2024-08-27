import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0FA4AF", // Bright cyan
      light: "#43B3AC", // Lighter cyan
      dark: "#0F292F", // Darker cyan
      contrastText: "#ffffff", // Text color on primary buttons
    },
    secondary: {
      main: "#024950", // Deep teal
      light: "#03768C", // Lighter teal
      dark: "#002D34", // Darker teal
      contrastText: "#ffffff", // Text color on secondary buttons
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Slightly lighter background for paper elements
    },
    text: {
      primary: "#e0e0e0", // Light text color
      secondary: "#b0b0b0", // Slightly darker text color
    },
    divider: "#333333", // Divider color
    action: {
      active: "#0FA4AF", // Accent color for active state
      hover: "#333333", // Darker shade for hover effects
      selected: "#424242", // Color for selected items
      disabled: "#555555", // Disabled state color
      disabledBackground: "#333333", // Background color for disabled states
    },
    grey: {
      50: "#121212",
      100: "#1e1e1e",
      200: "#333333",
      300: "#424242",
      400: "#555555",
      500: "#666666",
      600: "#777777",
      700: "#888888",
      800: "#999999",
      900: "#aaaaaa",
    },
  },
});

export default responsiveFontSizes(theme);

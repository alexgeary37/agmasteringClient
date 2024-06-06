import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { UserProvider } from "./contexts/UserContext.jsx";
// import { RouteHistoryProvider } from "./contexts/RouteHistoryContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <UserProvider>
        {/* <RouteHistoryProvider> */}
        <CssBaseline />
        <App />
        {/* </RouteHistoryProvider> */}
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

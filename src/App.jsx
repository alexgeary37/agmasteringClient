import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
// import ResponsiveAppBar from "./components/globalLayout/AppBar.jsx";
import Footer from "./components/globalLayout/Footer.jsx";
import Home from "./components/Home.jsx";
import Error404 from "./components/Error404";

export default function App() {
  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <Routes>
        <Route exact path={`/`} element={<Home />} />
        <Route path={`404-error`} element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404-error" />} />
      </Routes>
      <Footer />
    </div>
  );
}

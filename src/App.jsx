import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import StartAProject from "./components/StartAProject";
import Upload from "./components/Upload";
import Contact from "./components/Contact.jsx";
import Checkout from "./components/checkout/Checkout";
import Error404 from "./components/Error404";
import PaymentSuccess from "./components/checkout/PaymentSuccess.jsx";
import PaymentFailed from "./components/checkout/PaymentFailed.jsx";

export default function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route exact path={`/`} element={<Home />} />
        <Route exact path={`/start-a-project`} element={<StartAProject />} />

        <Route path={`/upload`} element={<Upload />} />
        <Route path={`/contact`} element={<Contact />} />

        {/* BOOKING PATHS */}
        <Route exact path={`/start-a-project/mixing`} element={<Checkout />} />
        <Route
          exact
          path={`/start-a-project/mastering`}
          element={<Error404 />}
        />
        <Route
          exact
          path={`/start-a-project/mix&master`}
          element={<Error404 />}
        />

        {/* BOOKING PAYMENT RESULT PATHS */}
        <Route path={`/payment-success`} element={<PaymentSuccess />} />
        <Route path={`/payment-failed`} element={<PaymentFailed />} />
        <Route path={`404-error`} element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404-error" />} />
      </Routes>
      <Footer />
    </div>
  );
}

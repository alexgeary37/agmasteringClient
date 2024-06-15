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
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import ResetPassword from "./components/user/ResetPassword.jsx";
import PaymentSuccess from "./components/checkout/PaymentSuccess.jsx";
import SessionExpired from "./components/user/SessionExpired.jsx";
import SendEmail from "./components/checkout/SendEmail.jsx";

export default function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route exact path={`/`} element={<Home />} />
        <Route exact path={`/start-a-project`} element={<StartAProject />} />

        <Route path={`/upload`} element={<Upload />} />
        <Route path={`/contact`} element={<Contact />} />

        {/* USER PATHS */}
        <Route path={`/sign-in`} element={<SignIn />} />
        <Route path={`/sign-up`} element={<SignUp />} />
        <Route path={`/forgot-password`} element={<ForgotPassword />} />
        <Route path="/reset-password/:userId" element={<ResetPassword />} />
        <Route path={`/session-expired`} element={<SessionExpired />} />

        {/* BOOKING PATHS */}
        <Route exact path={`/start-a-project/mixing`} element={<SendEmail />} />
        <Route
          exact
          path={`/start-a-project/mastering`}
          element={<Checkout />}
        />
        <Route
          exact
          path={`/start-a-project/mix&master`}
          element={<Checkout />}
        />

        {/* BOOKING PAYMENT RESULT PATHS */}
        <Route path={`/payment-success`} element={<PaymentSuccess />} />
        {/* <Route
          path={`/payment-failed`}
          element={user ? <PaymentFailed /> : <Navigate to="/sign-in" />}
        /> */}
        <Route path={`404-error`} element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404-error" />} />
      </Routes>
      <Footer />
    </div>
  );
}

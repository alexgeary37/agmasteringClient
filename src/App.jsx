import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import UserProfile from "./components/user/UserProfile.jsx";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext.jsx";
import PaymentSuccess from "./components/checkout/PaymentSuccess.jsx";
import tokenHasExpired from "./hooks/tokenHasExpired.jsx";
import SessionExpired from "./components/user/SessionExpired.jsx";
// import { useHistory } from "./hooks/useRouteHistory.jsx";

export default function App() {
  const { user, updateUser } = useContext(UserContext);
  // const { addToHistory } = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (tokenHasExpired()) {
      updateUser(null);
    }
    // addToHistory(location.pathname);
    // eslint-disable-next-line
  }, [location]);

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
        <Route
          path={`/user-profile`}
          element={user ? <UserProfile /> : <Navigate to="/sign-in" />}
        />

        {/* BOOKING PATHS */}
        <Route
          exact
          path={`/start-a-project/mixing`}
          element={user ? <Checkout /> : <Navigate to="/sign-in" />}
        />
        <Route
          exact
          path={`/start-a-project/mastering`}
          element={user ? <Checkout /> : <Navigate to="/sign-in" />}
        />
        <Route
          exact
          path={`/start-a-project/mix&master`}
          element={user ? <Checkout /> : <Navigate to="/sign-in" />}
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

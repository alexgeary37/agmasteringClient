import { jwtDecode } from "jwt-decode";

const tokenHasExpired = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const decodedToken = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;

    // Calculate expiration one minute before actual expiration
    const expirationThreshold = decodedToken.exp - 60;

    return expirationThreshold < currentTime;
  }
  return true;
};

export default tokenHasExpired;

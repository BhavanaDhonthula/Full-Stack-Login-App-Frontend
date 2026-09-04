import Cookies from "js-cookie";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get("ACCESS_TOKEN");

  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;

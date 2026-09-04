import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("ACCESS_TOKEN");
    navigate("/login", { replace: true });
  };

  const login = () => {
    navigate("/register");
  };

  return (
    <div className="home-bg-container d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-white text-center pt-4">WelCome To Home Page</h1>
      <div className="d-flex gap-2">
        <button className="btn btn-success" onClick={login}>
          Login
        </button>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

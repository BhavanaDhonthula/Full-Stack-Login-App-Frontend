import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("USERNAME") !== undefined) {
      setUsername(Cookies.get("USERNAME"));
    }
  }, []);

  const logout = () => {
    Cookies.remove("ACCESS_TOKEN");
    navigate("/login", { replace: true });
  };

  return (
    <div className="home-bg-container d-flex flex-column justify-content-center align-items-center">
      <h1 className="greeting">Hello, {username}</h1>
      <h1 className="text-white text-center pt-4 welcome">
        Welcome to Home Page
      </h1>
      <div className="d-flex gap-2">
        <button className="btn btn-danger mt-3" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

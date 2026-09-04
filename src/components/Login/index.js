import "./index.css";
import { Link } from "react-router";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isShowPasswordClicked, setShowPassword] = useState(false);

  const loginSuccess = (jwtToken) => {
    console.log(jwtToken);
    Cookies.set("ACCESS_TOKEN", jwtToken, { expires: 10 });
    navigate("/", { replace: true });
  };

  const loginFailure = (errMsg) => {
    setErrMsg(errMsg);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const userDetails = { username, password };

    const url = "https://full-stack-login-app-backend.onrender.com/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      loginSuccess(data.jwt_token);
    } else {
      loginFailure(data.err_msg);
    }
  };

  const jwtToken = Cookies.get("ACCESS_TOKEN");

  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="login-bg-container d-flex justify-content-center align-items-center">
        <form className="login-form-container p-3" onSubmit={submitForm}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value.trim())}
            className="input-field"
          />
          <input
            type={isShowPasswordClicked ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value.trim())}
            className="input-field"
          />

          <div className="d-flex align-items-center justify-content-center">
            <input
              type="checkbox"
              name="showPassword"
              id="showPasswordBtn"
              className="show-password-checkbox form-check-input"
              onClick={(e) => setShowPassword(e.target.checked)}
            />
            <label
              htmlFor="showPasswordBtn"
              className="text-white form-check-label m-2 pt-1"
            >
              Show Password
            </label>
          </div>
          <br />

          <button type="submit" className="submit-btn btn  btn-outline-success">
            Login
          </button>

          <p className="signup-text mt-2 text-white">
            Don't have account? <Link to="/register">Register</Link>
          </p>
          <p className="err-msg text-danger">{errMsg ? errMsg : ""}</p>
        </form>
      </div>
    );
  }
};

export default Login;

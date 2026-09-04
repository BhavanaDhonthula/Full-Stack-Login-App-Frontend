import "./index.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isShowPasswordClicked, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const RegistrationSuccess = (sucMsg) => {
    console.log(sucMsg);
    navigate("/login");
    setErrMsg("");
  };

  const RegistrationFailure = (errMsg) => {
    setErrMsg(errMsg);
  };

  const sumbitRegisterForm = async (e) => {
    e.preventDefault();

    const newUser = {
      id: uuidv4(),
      username,
      email,
      password,
      mobileNo,
    };

    const url = "http://localhost:5000/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      RegistrationSuccess(data.message);
    } else {
      RegistrationFailure(data.err_msg);
    }
  };

  return (
    <div className="register-bg-container d-flex justify-content-center align-items-center">
      <form
        className="registration-form-container p-3"
        onSubmit={sumbitRegisterForm}
      >
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Enter Username"
          autoComplete="true"
          onChange={(e) => setUsername(e.target.value.trim())}
          className="input-field"
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter Email"
          autoComplete="true"
          onChange={(e) => setEmail(e.target.value.trim())}
          className="input-field"
        />
        <input
          type={isShowPasswordClicked ? "text" : "password"}
          name="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value.trim())}
          className="input-field"
        />
        <input
          type="tel"
          name="mobileNo"
          value={mobileNo}
          placeholder="Enter Mobile No"
          autoComplete="true"
          onChange={(e) => setMobileNo(e.target.value.trim())}
          className="input-field"
        />
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="checkbox"
            id="showPasswordBtn"
            className="form-check-input"
            onClick={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="showPasswordBtn" className=" pt-1 text-white m-2">
            Show Password
          </label>
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-outline-success p-2 text-white submit-btn"
        >
          Register
        </button>
        <p className="text-danger errMsg">{errMsg ? errMsg : ""}</p>
        <p className="login-text mt-3 text-white">
          Already have account?
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

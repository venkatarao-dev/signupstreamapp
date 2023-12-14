import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./logIn.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmitSuccess = (jwtToken) => {
    localStorage.setItem("jwt-token", jwtToken);
    navigate("/home");
  };
  const onSubmitFailure = (errorMsg) => {
    setErrorMsg(errorMsg);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleLogin} className="form-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <p className="error-msg">{errorMsg}</p>
    </div>
  );
}

export default Login;

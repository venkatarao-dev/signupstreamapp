import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    navigate("/login");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        setErrorMsg("Username and password are required");
      }
      const userDetails = { username, password };
      const url = "https://apis.ccbp.in/login";
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="title">Signup</h1>
      <form onSubmit={handleSignup} className="form-container">
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
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
      <p className="error-msg">{errorMsg}</p>
    </div>
  );
}

export default SignUp;

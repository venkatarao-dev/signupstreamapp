import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    navigate("/logout");
  };
  return (
    <div className="home-container">
      <h1>Welcome to Our Website!</h1>
      <p>Enjoy exploring our content.</p>
      <button className="logout-btn" onClick={handleLogout}>
        Click me to logout
      </button>
    </div>
  );
}

export default Home;

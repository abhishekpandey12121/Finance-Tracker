import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    alert("Logged out successfully!");
    navigate("/login"); // Redirect to login
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
          )}
      </ul>
      
    </nav>
  );
};

export default Navbar;

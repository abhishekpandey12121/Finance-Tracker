import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
      console.log("Signup Successful:", data);
  
      if (response.ok) {
        alert("Signup successful!");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('/images/bg.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ 
        padding: "20px", 
        borderRadius: "10px", 
        backgroundColor: "rgba(0, 0, 0, 0.6)", 
        color: "white",
        textAlign: "center",
      }}>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Name:</label>
            <input 
              type="text" 
              name="name"
              value={user.name} 
              onChange={handleChange}
              style={{ marginLeft: "10px", padding: "5px" }} 
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Email:</label>
            <input 
              type="email" 
              name="email"
              value={user.email} 
              onChange={handleChange}
              style={{ marginLeft: "10px", padding: "5px" }} 
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Password:</label>
            <input 
              type="password" 
              name="password"
              value={user.password} 
              onChange={handleChange}
              style={{ marginLeft: "10px", padding: "5px" }} 
            />
          </div>
          <button style={{ 
            padding: "8px 15px", 
            backgroundColor: "#000", 
            color: "white", 
            border: "none", 
            cursor: "pointer" 
          }}>
            Signup
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;

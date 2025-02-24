import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      alert("Login Successful!");
      navigate("/dashboard");  // Redirect after login
    } catch (error) {
      alert("Login Failed: " + error.response.data.message);
    }
  };

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",        
        height: "100vh",
        backgroundImage: "url('img.jpg')", // Replace with your actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ 
        padding: "20px", 
        borderRadius: "10px", 
        backgroundColor: "rgba(0, 0, 0, 0.6)", 
        color: "white",
        textAlign: "center" 
      }}>
      <h2>Login</h2>
      <form style={{ display: "inline-block", textAlign: "left", backgroundColor: "#333", padding: "20px", borderRadius: "10px" }}>
        <div style={{ marginBottom: "10px" }}>
        <label>Email:</label>
          <input type="email" style={{ marginLeft: "10px", padding: "5px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
        <label>Password:</label>
          <input type="password" style={{ marginLeft: "10px", padding: "5px" }} />
        </div>    
        <button style={{ padding: "8px 15px", backgroundColor: "#000", color: "white", border: "none", cursor: "pointer" }}>Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css"; // Import the CSS file

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState("Login");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    try {
      setBtn("Logging in...");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        { email, password }
      );

      console.log(response);

      if (response) {
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        navigate('/home');
      } else {
        alert('No user exists');
      }
    } catch (error) {
      setBtn("Login");
      console.log(error);
      alert(error.response?.data?.msg || "Error while logging in. Please try later.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Enter registered email ID"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">
            {btn}
          </button>
        </form>

        {/* Admin Login */}
        <button className="admin-button" onClick={() => navigate('/Adminlogin')}>
          Admin Login
        </button>

        <p className="login-footer">
          New user?{" "}
          <a onClick={() => navigate('/')}>Create Account</a>
        </p>
      </div>
    </div>
  );
}

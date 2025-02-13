import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Signup.css"; // Import the CSS file

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [btn, setBtn] = useState("Create Account");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    try {
      setBtn("Creating account...");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`,
        { email, password, mobile, firstName, lastName }
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
      setBtn("Create Account");
      console.log(error);
      alert(error.response?.data?.msg || "Error while creating account. Please try later.");
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Sign Up</h1>
        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Enter Email ID"
            className="signup-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="signup-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Mobile"
            className="signup-input"
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter First Name"
            className="signup-input"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            className="signup-input"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <button className="signup-button" type="submit">
            {btn}
          </button>
        </form>
        <p className="signup-footer">
          Already a user?{" "}
          <a onClick={() => navigate('/login')}>Login</a>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./adminlogin.css"; // Import the CSS file

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btn, setBtn] = useState("Login");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setBtn("Logging in...");

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/adminlogin`, {
                email,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setBtn("Login");
            alert(err.response?.data?.msg || "Error logging in. Please try again.");
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter admin email"
                        className="login-input"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        className="login-input"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="login-button admin-button" type="submit">
                        {btn}
                    </button>
                </form>
                <p className="login-footer">
                    Not an admin?{" "}
                    <a onClick={() => navigate('/login')}>Go to User Login</a>
                </p>
            </div>
        </div>
    );
}

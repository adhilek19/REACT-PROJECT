import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/alogin.css';

function ALogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/Admin?email=${email}&password=${password}`
      );

      if (response.data.length === 0) {
        setError("Invalid credentials");
        return;
      }

      const admin = response.data[0];
      if (admin.role !== "admin") {
        setError("You are not an admin");
        return;
      }

      localStorage.setItem("adminId", admin.id);
      localStorage.setItem("adminName", admin.name);

      navigate("/admin/dashboard");
    } catch (err) {
      setError("Server error, try again");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow login-card">
        <h2 className="text-center mb-3">Admin Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ALogin;

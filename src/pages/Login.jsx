import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Login.css";

const API_BASE = "/api";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);

      toast.success("✅ Inloggning lyckades!");

      setTimeout(() => {
        window.location.href = res.data.user.role === "admin" ? "/admin" : "/";
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message || "❌ Inloggning misslyckades";
      toast.error(message);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <form onSubmit={handleLogin} className="login-form" autoComplete="off">
        <h2>🔐 Logga in</h2>

        <input
          name="username"
          type="text"
          placeholder="Användarnamn"
          value={form.username}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          placeholder="Lösenord"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <button type="submit">Logga in</button>

        <div className="login-links">
          <Link to="/forgot-password">Glömt lösenord?</Link>
          <Link to="/register">Skapa konto</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

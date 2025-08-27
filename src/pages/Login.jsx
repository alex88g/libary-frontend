import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; 
import "react-toastify/dist/ReactToastify.css";
import "../Login.css";

const API_BASE = "http://localhost:5000/api";

const Login = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { login } = useAuth(); // <-- sätt/hämta värden via context

  const [form, setForm] = useState({ username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const res = await axios.post(`${API_BASE}/auth/login`, form);

      // Sätt auth-state via context (sparar även i localStorage)
      login({
        token: res.data.token,
        role: res.data.user.role,
        userId: res.data.user.id,
      });

      toast.success("Inloggning lyckades!");

      // Stöd för ?redirect=/något
      const redirect = params.get("redirect");
      const fallback = res.data.user.role === "admin" ? "/admin" : "/";
      navigate(redirect || fallback, { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message || "Inloggning misslyckades";
      toast.error(message);
    } finally {
      setSubmitting(false);
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
          autoComplete="username"
        />
        <input
          name="password"
          type="password"
          placeholder="Lösenord"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Loggar in…" : "Logga in"}
        </button>

        <div className="login-links">
          <Link to="/forgot-password">Glömt lösenord?</Link>
          <Link to="/register">Skapa konto</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

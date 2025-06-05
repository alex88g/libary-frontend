import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Register.css";

// Dynamisk API-url beroende på miljö
const API_BASE = import.meta.env.VITE_API_BASE;

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = form;

    if (password.length < 8) {
      setError("Lösenordet måste vara minst 8 tecken.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/auth/register`, { username, email, password });
      toast.success("🎉 Registrerad! Du kan nu logga in.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Fel vid registrering.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <form onSubmit={handleRegister} className="register-form" autoComplete="off">
        <h2>Skapa konto</h2>
        {error && <p className="error-text">{error}</p>}

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
          name="email"
          type="email"
          placeholder="E-postadress"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          placeholder="Lösenord (minst 8 tecken)"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <button type="submit">Registrera</button>
      </form>
    </div>
  );
};

export default Register;

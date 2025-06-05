import React, { useState } from "react";
import { requestPasswordReset } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await requestPasswordReset(email);
      toast.success(res.data.message || "Återställningslänk skickad!");
      setEmail("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Kunde inte skicka återställningslänk.";
      toast.error(msg);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <ToastContainer position="top-center" autoClose={3000} />
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2>🔑 Glömt lösenord?</h2>
        <p>Fyll i din e-postadress så skickar vi en länk för återställning.</p>
        <input
          type="email"
          placeholder="Din e-postadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Skicka återställningslänk</button>
      </form>
    </div>
  );
};

export default ForgotPassword;

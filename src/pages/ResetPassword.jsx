import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.warning("Lösenordet måste vara minst 8 tecken.");
      return;
    }

    try {
      const res = await resetPassword(token, newPassword);
      toast.success(res.data.message || "Lösenordet har uppdaterats!");
      setNewPassword("");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Ogiltig eller utgången återställningslänk.";
      toast.error(msg);
    }
  };

  return (
    <div className="reset-password-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2>🔐 Återställ lösenord</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nytt lösenord"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Spara nytt lösenord</button>
      </form>
    </div>
  );
};

export default ResetPassword;

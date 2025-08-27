import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { resetPassword } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();                 // <- adressparameter
  const [newPassword, setNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [invalid, setInvalid] = useState(!token); // saknas token -> ogiltig vy

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setInvalid(true);
      toast.error("Ogiltig eller saknad token.");
      return;
    }

    if (newPassword.length < 8) {
      toast.warning("Lösenordet måste vara minst 8 tecken.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await resetPassword(token, newPassword);
      toast.success(res?.data?.message || "Lösenordet har uppdaterats!");
      setNewPassword("");
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Ogiltig eller utgången återställningslänk.";
      setInvalid(true); // visar alternativt UI om backend säger ogiltig
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reset-password-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2>🔐 Återställ lösenord</h2>

      {invalid ? (
        <p>
          Ogiltig eller saknad återställningslänk.{" "}
          <Link to="/forgot-password">Begär en ny länk</Link>.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nytt lösenord (minst 8 tecken)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Sparar…" : "Spara nytt lösenord"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;

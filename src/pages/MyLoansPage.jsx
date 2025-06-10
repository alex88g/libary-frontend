import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../MyLoansPage.css";

const API_BASE = "http://localhost:5000/api";

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get(`${API_BASE}/loans/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLoans(res.data);
        toast.success("Dina lån har hämtats.");
      } catch (err) {
        console.error("Fel vid hämtning av lån:", err);
        toast.error("Kunde inte hämta dina lån.");
      }
    };
    if (userId && token) fetchLoans();
  }, [userId, token]);

  const returnLoan = async (loanId) => {
    try {
      await axios.put(`${API_BASE}/loans/return/${loanId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLoans(loans.filter(loan => loan.id !== loanId));
      toast.info("Boken har lämnats tillbaka.");
    } catch {
      toast.error("Kunde inte lämna tillbaka boken.");
    }
  };

  const renewLoan = async (loanId) => {
    try {
      await axios.put(`${API_BASE}/loans/renew/${loanId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Lånet har förlängts med 14 dagar.");
    } catch {
      toast.error("Fel vid förlängning av lån.");
    }
  };

  const calculateDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="loans-wrapper">
      <ToastContainer position="top-center" autoClose={2500} />
      <h2>📚 Mina Lån</h2>
      {loans.length === 0 ? (
        <p>Du har inga aktiva lån.</p>
      ) : (
        <div className="loan-grid">
          {loans.map((loan) => (
            <div key={loan.id} className="loan-card">
              <img src={loan.coverUrl} alt={loan.title} className="loan-cover" />
              <div className="loan-details">
                <h3>{loan.title}</h3>
                <p><strong>Författare:</strong> {loan.author}</p>
                <p><strong>Genre:</strong> {loan.genre}</p>
                <p><strong>Beskrivning:</strong> {loan.description}</p>
                <p><strong>Pris:</strong> {loan.loanPrice} kr</p>
                <p><strong>Lånad:</strong> {new Date(loan.loanDate).toLocaleDateString()}</p>
                <p><strong>Förfaller:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
                {loan.renewedAt && (
                  <p><strong>Förlängd:</strong> {new Date(loan.renewedAt).toLocaleDateString()}</p>
                )}
                <p className="days-left">
                  ⏳{" "}
                  <strong>
                    {calculateDaysLeft(loan.dueDate) < 0
                      ? "⚠️ Försenad!"
                      : `${calculateDaysLeft(loan.dueDate)} dagar kvar`}
                  </strong>
                </p>
                <div className="loan-buttons">
                  <button className="renew" onClick={() => renewLoan(loan.id)}>Förläng</button>
                  <button className="return" onClick={() => returnLoan(loan.id)}>Lämna tillbaka</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLoans;

import React, { useEffect, useState } from "react";
import { getProfile, deleteAccount } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile(token);
        setUser(res.data.user);
      } catch {
        toast.error("Kunde inte hämta användarinfo");
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Är du säker på att du vill radera ditt konto?");
    if (!confirmDelete) return;

    try {
      await deleteAccount(token);
      toast.success("Ditt konto raderades");
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch {
      toast.error("Kunde inte radera konto");
    }
  };

  if (!user) return <p>Laddar profil...</p>;

  return (
    <div className="profile-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="profile-card">
        <h2>👤 Min profil</h2>
        <div className="profile-info">
          <p><strong>Användarnamn:</strong> {user.username}</p>
          <p><strong>E-post:</strong> {user.email}</p>
        </div>
        <button className="delete-button" onClick={handleDelete}>
          🗑️ Radera konto
        </button>
      </div>
    </div>
  );
};

export default Profile;
